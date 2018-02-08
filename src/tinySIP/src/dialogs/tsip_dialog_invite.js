/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
// http://cdnet.stpi.org.tw/techroom/market/_pdf/2009/eetelecomm_09_009_OneVoiceProfile.pdf
// 3GPP TS 26.114 (MMTel): Media handling and interaction
// 3GPP TS 24.173 (MMTel): Supplementary Services
//
/* ======================== MMTel Supplementary Services ======================== 
3GPP TS 24.607 : Originating Identification Presentation
3GPP TS 24.608 : Terminating Identification Presentation
3GPP TS 24.607 : Originating Identification Restriction
3GPP TS 24.608 : Terminating Identification Restriction

3GPP TS 24.604 : Communication Diversion Unconditional
3GPP TS 24.604 : Communication Diversion on not Logged
3GPP TS 24.604 : Communication Diversion on Busy 
3GPP TS 24.604 : Communication Diversion on not Reachable
3GPP TS 24.604 : Communication Diversion on No Reply
3GPP TS 24.611 : Barring of All Incoming Calls
3GPP TS 24.611 : Barring of All Outgoing Calls
3GPP TS 24.611 : Barring of Outgoing International Calls
3GPP TS 24.611 : Barring of Incoming Calls - When Roaming
3GPP TS 24.610 : Communication Hold 
3GPP TS 24.606 : Message Waiting Indication
3GPP TS 24.615 : Communication Waiting
3GPP TS 24.605 : Ad-Hoc Multi Party Conference
*/
tsip_dialog_invite.prototype = Object.create(tsip_dialog.prototype);
tsip_dialog_invite.prototype.__b_debug_state_machine = true;
tsip_dialog_invite.prototype.__i_lo_sdp_request_timeout = 50000000; //FIXME

var tsip_dialog_invite_next_offer_type_e =
{
    NONE: 0,
    INVITE: 1,
    UPDATE: 2,
    SUCCESS: 3
};

var tsip_dialog_invite_actions_e = 
{
	ACCEPT: tsip_action_type_e.ACCEPT,
	REJECT: tsip_action_type_e.HANGUP,
	DTMF_SEND: tsip_action_type_e.DTMF_SEND,
    MUTE: tsip_action_type_e.MUTE, 
	MSRP_SEND_MSG: tsip_action_type_e.LARGE_MESSAGE,
	O_INVITE: tsip_action_type_e.INVITE,
	O_CANCEL: tsip_action_type_e.CANCEL,
	O_HOLD: tsip_action_type_e.HOLD,
	O_RESUME: tsip_action_type_e.RESUME,
	O_ECT: tsip_action_type_e.ECT,
	I_ECT_ACCEPT: tsip_action_type_e.ECT_ACCEPT,
	I_ECT_REJECT: tsip_action_type_e.ECT_REJECT,
	I_ECT_LNOTIFY: tsip_action_type_e.ECT_NOTIFY,
	O_INFO: tsip_action_type_e.INFO,
	O_BYE: tsip_action_type_e.HANGUP,
	O_SHUTDOWN: tsip_action_type_e.SHUTDOWN,

	I_INVITE: 10001,
	O_UPDATE: 10002,
	I_UPDATE: 10003,
	I_CANCEL: 10004,
	I_PRACK: 10005,
	O_PRACK: 10006,
	I_ACK: 10007,
	O_ACK: 10008,
	I_OPTIONS: 10009,
	O_OPTIONS: 10010,
	I_BYE: 10011,
	I_REFER: 10012,
	I_INFO: 10013,
	I_NOTIFY: 10014,

	TIMER_100REL: 20001,
	TIMER_REFRESH: 20002,
	TIMER_RSVP: 20003,
    TIMER_LO_SDP_REQUEST: 20004,

	I_1XX: 30001,
	I_2XX: 30002,
	I_300_to_699: 30003,
	I_401_407: 30004,
	i_422: 30005,

	SHUTDOWN_TIMEDOUT: 40001, /* Any -> Terminated */
	TRANSPORT_ERROR: 40002,
	ERROR: 40003
};

var tsip_dialog_invite_states_e =
{
	STARTED: 1,
	OUTGOING: 2,
	INCOMING: 3,
	TRYING: 4,
	RINGING: 5,
	CANCELLING: 6,
	INPROGRESS: 7,

	HOLDING: 20,
	RESUMING: 21,

	O_ECT_INPROGRESS: 40,
	I_ECT_INPROGRESS: 41,
	I_ECT_REQUESTED: 42,

	CONNECTED: 60,
	TERMINATED: 61
};

function tsip_dialog_invite(o_session, s_call_id) {
    tsip_dialog.call(this);

    // default values
    this.o_last_oInvite = null;
    this.o_wait_oMessage = null;

    this.o_last_iOffer = null;
    this.o_last_iRefer = null;
    this.o_ss_transf = null;
    this.e_next_offer_type = tsip_dialog_invite_next_offer_type_e.NONE;

    this.i_rseq = 0;
    this.b_support_update = false;

    this.supported = {};
    this.supported.b_100rel = o_session.media.b_100rel;
    this.supported.b_norefsub = true;
    this.supported.b_refer_sub = true;
    this.supported.b_timer = (o_session.media.timers.i_timeout > 0);

    this.require = {};
    this.require.b_100rel = false;
    this.require.b_norefsub = false;
    this.require.b_timer = false;

    this.hold = {};
    this.hold.b_local = false;
    this.hold.b_remote = false;

    this.init(tsip_dialog_type_e.INVITE, s_call_id, o_session, tsip_dialog_invite_states_e.STARTED, tsip_dialog_invite_states_e.TERMINATED);
    this.set_callback(__tsip_dialog_invite_event_callback);
    this.o_fsm.set_debug_enabled(tsip_dialog_invite.prototype.__b_debug_state_machine);
    this.o_fsm.set_onterm_callback(__tsip_dialog_invite_onterm, this);

    this.o_msession_mgr = null;
    this.b_is_client = false;
    this.b_is_transf = false;

    this.o_timerShutdown = null;
    this.i_timerShutdown = (tsip_dialog.prototype.__i_timer_shutdown >> 1);

    this.stimers = {};
    this.stimers.i_timeout = o_session.media.timers.i_timeout;
    this.stimers.s_refresher = null;
    this.stimers.i_minse = 0;
    this.stimers.b_is_refresher = false;

    this.o_timer100Rel = null;
    this.i_timer100Rel = 0;
    this.o_timerSession = null;
    this.o_timerShutdown = null;
    this.i_timerShutdown = tsip_dialog.prototype.__i_timer_shutdown;
    this.o_timerLoSdpRequest = null;
    this.i_timerLoSdpRequest = tsip_dialog_invite.prototype.__i_lo_sdp_request_timeout;

    // initialize "common" state machine
    this.o_fsm.set(
        /*=======================
        * === Started === 
        */
        // Started -> (Any) -> Started
        tsk_fsm_entry.prototype.CreateAlwaysNothing(tsip_dialog_invite_states_e.STARTED, "tsip_dialog_invite_Started_2_Started_X_any"),

        /*=======================
        * === Connected === 
        */
        // Connected -> (Send DTMF) -> Connected
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_invite_states_e.CONNECTED, tsip_dialog_invite_actions_e.DTMF_SEND, tsip_dialog_invite_states_e.CONNECTED, x0000_Connected_2_Connected_X_oDTMF, "x0000_Connected_2_Connected_X_oDTMF"),
        // Connected -> (Send MSRP message) -> Connected
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_invite_states_e.CONNECTED, tsip_dialog_invite_actions_e.MSRP_SEND_MSG, tsip_dialog_invite_states_e.CONNECTED, x0000_Connected_2_Connected_X_oLMessage, "x0000_Connected_2_Connected_X_oLMessage"),
        // Connected -> (iACK) -> Connected
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_invite_states_e.CONNECTED, tsip_dialog_invite_actions_e.I_ACK, tsip_dialog_invite_states_e.CONNECTED, x0000_Connected_2_Connected_X_iACK, "x0000_Connected_2_Connected_X_iACK"),
        // Connected -> (iINVITE) -> Connected
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_invite_states_e.CONNECTED, tsip_dialog_invite_actions_e.I_INVITE, tsip_dialog_invite_states_e.CONNECTED, x0000_Connected_2_Connected_X_iINVITEorUPDATE, "x0000_Connected_2_Connected_X_iINVITE"),
        // Connected -> (iUPDATE) -> Connected
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_invite_states_e.CONNECTED, tsip_dialog_invite_actions_e.I_UPDATE, tsip_dialog_invite_states_e.CONNECTED, x0000_Connected_2_Connected_X_iINVITEorUPDATE, "x0000_Connected_2_Connected_X_iUPDATE"),
        // Connected -> (send reINVITE) -> Connected
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_invite_states_e.CONNECTED, tsip_dialog_invite_actions_e.O_INVITE, tsip_dialog_invite_states_e.CONNECTED, x0000_Connected_2_Connected_X_oINVITE, "x0000_Connected_2_Connected_X_oINVITE"),

        /*=======================
        * === BYE/SHUTDOWN === 
        */
        // Any -> (oBYE) -> Trying
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.O_BYE, tsip_dialog_invite_states_e.TRYING, x0000_Any_2_Trying_X_oBYE, "x0000_Any_2_Trying_X_oBYE"),
        // Any -> (iBYE) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.I_BYE, tsip_dialog_invite_states_e.TERMINATED, x0000_Any_2_Terminated_X_iBYE, "x0000_Any_2_Terminated_X_iBYE"),
        // Any -> (i3xx-i6xx BYE) -> Terminated
        tsk_fsm_entry.prototype.Create(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.I_300_to_699, __tsip_dialog_invite_cond_is_resp2bye, tsip_dialog_invite_states_e.TERMINATED, null, "x0000_Any_2_Terminated_X_i3xxTOi6xxBYE"),
        // Any -> (i2xxx BYE) -> Terminated
        tsk_fsm_entry.prototype.Create(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.I_2XX, __tsip_dialog_invite_cond_is_resp2bye, tsip_dialog_invite_states_e.TERMINATED, null, "x0000_Any_2_Terminated_X_i2xxBYE"),
        // Any -> (Shutdown) -> Trying
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.O_SHUTDOWN, tsip_dialog_invite_states_e.TRYING, x0000_Any_2_Trying_X_shutdown, "x0000_Any_2_Trying_X_shutdown"),
        // Any -> (shutdown timedout) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.SHUTDOWN_TIMEDOUT, tsip_dialog_invite_states_e.TERMINATED, null, "tsip_dialog_invite_shutdown_timedout"),


        /*=======================
        * === Any === 
        */
         // Any -> (NoOps) -> Any
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.MUTE, tsk_fsm.prototype.__i_state_any, x0000_Any_2_Any_X_noOps, "x0000_Any_2_Any_X_noOps"),
        // Any -> (i1xx) -> Any
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.I_1XX, tsk_fsm.prototype.__i_state_any, x0000_Any_2_Any_X_i1xx, "x0000_Any_2_Any_X_i1xx"),
        // Any -> (oINFO) -> Any
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.O_INFO, tsk_fsm.prototype.__i_state_any, x0000_Any_2_Any_X_oINFO, "x0000_Any_2_Any_X_oINFO"),
        // Any -> (iINFO) -> Any
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.I_INFO, tsk_fsm.prototype.__i_state_any, x0000_Any_2_Any_X_iINFO, "x0000_Any_2_Any_X_iINFO"),
        // Any -> (i401/407)
        //
        // Any -> (iPRACK) -> Any
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.I_PRACK, tsk_fsm.prototype.__i_state_any, x0000_Any_2_Any_X_iPRACK, "x0000_Any_2_Any_X_iPRACK"),
        // Any -> (iOPTIONS) -> Any
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.I_OPTIONS, tsk_fsm.prototype.__i_state_any, x0000_Any_2_Any_X_iOPTIONS, "x0000_Any_2_Any_X_iOPTIONS"),
        // Any -> (i2xx INVITE) -> Any
        tsk_fsm_entry.prototype.Create(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.I_2XX, __tsip_dialog_invite_cond_is_resp2invite, tsk_fsm.prototype.__i_state_any, x0000_Any_2_Any_X_i2xxINVITEorUPDATE, "x0000_Any_2_Any_X_i2xxINVITE"),
        // Any -> (i2xx UPDATE) -> Any
        tsk_fsm_entry.prototype.Create(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.I_2XX, __tsip_dialog_invite_cond_is_resp2update, tsk_fsm.prototype.__i_state_any, x0000_Any_2_Any_X_i2xxINVITEorUPDATE, "x0000_Any_2_Any_X_i2xxUPDATE"),
        // Any -> (i401/407 INVITE) -> Any
        tsk_fsm_entry.prototype.Create(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.I_401_407, __tsip_dialog_invite_cond_is_resp2invite, tsk_fsm.prototype.__i_state_any, x0000_Any_2_Any_X_i401_407_INVITEorUPDATE, "x0000_Any_2_Any_X_i401_407_INVITE"),
        // Any -> (i401/407  UPDATE) -> Any
        tsk_fsm_entry.prototype.Create(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.I_401_407, __tsip_dialog_invite_cond_is_resp2update, tsk_fsm.prototype.__i_state_any, x0000_Any_2_Any_X_i401_407_INVITEorUPDATE, "x0000_Any_2_Any_X_i401_407_UPDATE"),
        // Any -> (i2xx PRACK) -> Any
        tsk_fsm_entry.prototype.Create(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.I_2XX, __tsip_dialog_invite_cond_is_resp2prack, tsk_fsm.prototype.__i_state_any, null, "x0000_Any_2_Any_X_i2xxPRACK"),
        // Any -> (i2xx INFO) -> Any
        tsk_fsm_entry.prototype.Create(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.I_2XX, __tsip_dialog_invite_cond_is_resp2info, tsk_fsm.prototype.__i_state_any, null, "x0000_Any_2_Any_X_i2xxINFO"),
        // Any -> (local sdp request timeout) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.TIMER_LO_SDP_REQUEST, tsip_dialog_invite_states_e.TERMINATED, x9997_Any_2_Any_X_LoSdpRequestTimeout, "x9997_Any_2_Any_X_LoSdpRequestTimeout"),
        // Any -> (transport error) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.TRANSPORT_ERROR, tsip_dialog_invite_states_e.TERMINATED, x9998_Any_2_Terminated_X_transportError, "x9998_Any_2_Terminated_X_transportError"),
        // Any -> (error) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.ERROR, tsip_dialog_invite_states_e.TERMINATED, x9999_Any_2_Terminated_X_Error, "x9999_Any_2_Terminated_X_Error")
    );

    // initialize "client" state machine
    this.init_client();
    // initialize "server" state machine
    this.init_server();
    /* 3GPP TS 24.610: Communication Hold  */
    this.init_hold();
    /* 3GPP TS 24.629: Explicit Communication Transfer (ECT) using IP Multimedia (IM) Core Network (CN) subsystem */
    this.init_ect();
}

tsip_dialog_invite.prototype.signal_invite = function (e_invite_type, i_code, s_phrase, o_message) {
    var o_event = new tsip_event_invite(this.get_session(), i_code, s_phrase, o_message, e_invite_type);
    return o_event.signal();
}

tsip_dialog_invite.prototype.send_invite = function (b_force_sdp) {
    return this.send_offer(true, b_force_sdp);
}

tsip_dialog_invite.prototype.send_update = function (b_force_sdp) {
    return this.send_offer(false, b_force_sdp);
}

tsip_dialog_invite.prototype.send_offer = function (b_is_invite, b_force_sdp) {
    var i_ret = -1;
    var o_request = null;
    var b_wait4lo = false;

    if (!b_is_invite && b_force_sdp) {
        tsk_utils_log_warn("ACK is need to ensure the media session");
    }

    if ((o_request = this.request_new(b_is_invite ? "INVITE" : "UPDATE"))) {
        /* apply action params to the request (will add a content if the action contains one) */
        if (this.o_action_curr) {
            tsip_dialog.prototype.ApplyAction(o_request, this.o_action_curr);
        }

        /* add our payload if current action does not have one */
        if ((b_force_sdp || b_is_invite) || ((this.o_msession_mgr && this.o_msession_mgr.b_state_changed) || (this.e_state == tsip_dialog_state_e.INITIAL))) {
            if (!this.o_action_curr || !this.o_action_curr.o_payload) {
                var o_sdp_lo = this.o_msession_mgr.get_lo();
                b_wait4lo = (o_sdp_lo == null);
                if (o_sdp_lo) {
                    var s_sdp_lo = o_sdp_lo.toString();
                    o_request.add_content(new String(s_sdp_lo), "application/sdp");
                }
            }
        }


        /* Session timers */
        if (this.stimers.i_timeout) {
            if (this.require.b_timer) {
                o_request.add_headers(
						new tsip_header_Session_Expires(this.stimers.i_timeout, !this.stimers.b_is_refresher),
						new tsip_header_Require("timer"));
            }
            else if (this.supported.b_timer) {
                o_request.add_headers(
						new tsip_header_Session_Expires(this.stimers.i_timeout, !this.stimers.b_is_refresher),
						new tsip_header_Supported("timer"));
            }

        }

        if (this.stimers.i_minse) {
            o_request.add_headers(new tsip_header_Min_SE(this.stimers.i_minse));
        }

        /* 100rel */
        if (this.require.b_100rel) {
            o_request.add_headers(new tsip_header_Require("100rel"));
        }
        else if (this.supported.b_100rel) {
            o_request.add_headers(new tsip_header_Supported("100rel"));
        }

        /* send the request */
        if (b_wait4lo) {
            i_ret = 0;
            this.o_wait_oMessage = o_request;
            this.timer_schedule('invite', 'LoSdpRequest');
        }
        else {
            i_ret = this.request_send(o_request);
            if (b_is_invite && i_ret == 0) {
                this.o_last_oInvite = o_request;
            }
        }
    }

    return i_ret;
}

tsip_dialog_invite.prototype.send_ack = function (o_response) {
    var i_ret = -1;
    var o_request = null;
    var b_wait4lo = false;

    if ((o_request = this.request_new("ACK"))) {
        /* The initial INVITE sent by us was a bodiless request and we don't support 100rel (We are Alice)
        1. Alice sends initial INVITE without offer
        2. Bob's offer is sent in the 2xx INVITE response
        3. Alice's answer is sent in the ACK request
        */
        if (this.b_is_client && (this.o_last_oInvite && !this.o_last_oInvite.has_content())) {
            var o_sdp_lo = this.o_msession_mgr.get_lo();
            b_wait4lo = (o_sdp_lo == null);
            if (o_sdp_lo) {
                var s_sdp_lo = o_sdp_lo.toString();
                o_request.add_content(new String(s_sdp_lo), "application/sdp");
            }

            // Start media session if not done
            if (!this.o_msession_mgr.is_started() && (this.o_msession_mgr.has_lo() && this.o_msession_mgr.has_ro())) {
                i_ret = this.o_msession_mgr.start();
            }
        }

        /*	RFC 3261 - 13.2.2.4 2xx Responses
        The UAC core MUST generate an ACK request for each 2xx received from
        the transaction layer.  The header fields of the ACK are constructed
        in the same way as for any request sent within a dialog (see Section
        12) with the exception of the CSeq and the header fields related to
        authentication.  The sequence number of the CSeq header field MUST be
        the same as the INVITE being acknowledged, but the CSeq method MUST
        be ACK.  The ACK MUST contain the same credentials as the INVITE.  If
        the 2xx contains an offer (based on the rules above), the ACK MUST
        carry an answer in its body.  If the offer in the 2xx response is not
        acceptable, the UAC core MUST generate a valid answer in the ACK and
        then send a BYE immediately.
        ==> Credentials will be added by tsip_dialog_request_new() because they are
        associated to the dialog itself.
        ==> It's up to us to add/update the CSeq number.
        ==> ACK requests sent here will create new client transactions, which means that
        they will have there own branches. This is not the case for ACK requests sent from
        the transaction layer.
        */
        o_request.o_hdr_CSeq.i_seq = o_response.o_hdr_CSeq.i_seq; /* As the 2xx has the same CSeq than the INVITE */

        /* send the request */
        if (b_wait4lo) {
            this.o_wait_oMessage = o_request;
            this.timer_schedule('invite', 'LoSdpRequest');
            return 0;
        }
        else {
            return this.request_send(o_request);
        }
    }
    return i_ret;
}

// "Require: 100rel\r\n" should be checked by the caller of this function
tsip_dialog_invite.prototype.send_prack = function (o_r1xx) {
    if (!o_r1xx || !o_r1xx.o_hdr_CSeq) {
        tsk_utils_log_error("Invalid parameter");
        return -1;
    }

    var i_ret = -1;
    var o_request = null;
    var o_hdr_RSeq;
    var b_wait4lo = false;


    /*	RFC 3262 - 4 UAC Behavior
    The UAC MUST maintain a sequence number that indicates the most recently
    received in-order reliable provisional response for the initial request.
    */
    if ((o_hdr_RSeq = o_r1xx.get_header(tsip_header_type_e.RSeq))) {

        /*	RFC 3262 - 4 UAC Behavior
        If the UAC receives another reliable provisional
        response to the same request, and its RSeq value is not one higher
        than the value of the sequence number, that response MUST NOT be
        acknowledged with a PRACK, and MUST NOT be processed further by the
        UAC.  An implementation MAY discard the response, or MAY cache the
        response in the hopes of receiving the missing responses.
        */
        if (self.i_rseq && (o_hdr_RSeq.i_value <= this.i_rseq)) {
            tsk_utils_log_warn("1xx.RSeq value is not one higher than lastINVITE.RSeq");
            return 0; /* Not error */
        }
        this.i_rseq = o_hdr_RSeq.i_value;
    }

    /* RFC 3262 - 4 UAC Behavior
    Assuming the response is to be transmitted reliably, the UAC MUST
    create a new request with method PRACK.
    */
    if (!(o_request = this.request_new("PRACK"))) {
        tsk_utils_log_error("Failed to create PRACK request");
        return -2;
    }

    /* RFC 3262 - 7.2 RAck
    The first number is the value from the RSeq header in the provisional
    response that is being acknowledged.  The next number, and the
    method, are copied from the CSeq in the response that is being
    acknowledged.  The method name in the RAck header is case sensitive.
    */
    o_request.add_header(new tsip_header_RAck(this.i_rseq, o_r1xx.o_hdr_CSeq.i_seq, o_r1xx.o_hdr_CSeq.s_method));

    /*	Initial INVITE was a bodiless request and 100rel is supported (I'm Alice)
    1. Alice sends an initial INVITE without offer
    2. Bob's answer is sent in the first reliable provisional response, in this case it's a 1xx INVITE response
    3. Alice's answer is sent in the PRACK response
    */
    if (this.b_is_client && (this.o_last_oInvite && !this.o_last_oInvite.has_content())) {
        var o_sdp_lo = this.o_msession_mgr.get_lo();
        b_wait4lo = (o_sdp_lo == null);
        if (o_sdp_lo) {
            var s_sdp_lo = o_sdp_lo.toString();
            o_request.add_content(new String(s_sdp_lo), "application/sdp");
        }
    }

    /* send the request */
    if (b_wait4lo) {
        this.o_wait_oMessage = o_request;
        this.timer_schedule('invite', 'LoSdpRequest');
        return 0;
    }
    else {
        return this.request_send(o_request);
    }
}


// Send any response
tsip_dialog_invite.prototype.send_response = function (o_request, i_code, s_phrase, b_force_sdp) {
    var o_response;
    var i_ret = -1;
    var b_wait4lo = false;

    if ((o_response = this.response_new(i_code, s_phrase, o_request))) {
        if (o_request.is_invite() || o_request.is_update()) {
            /* Session timers (for 2xx to INVITE or UPDATE) */
            if (this.require.b_timer) {
                o_response.add_headers(
                    new tsip_header_Require("timer"),
                    new tsip_header_Session_Expires(this.stimers.i_timeout, tsk_string_iequals(this.stimers.s_refresher, "uas"))
                );
            }
            else if (this.supported.b_timer) {
                o_response.add_headers(
                    new tsip_header_Supported("timer"),
                    new tsip_header_Session_Expires(this.stimers.i_timeout, tsk_string_iequals(this.stimers.s_refresher, "uas"))
                );
            }
            if (this.stimers.i_minse) {
                o_response.add_headers(
                    new tsip_header_Min_SE(this.stimers.i_minse)
                );
            }
            if (i_code == 422) {
                o_response.add_headers(
                    new tsip_header_Dummy("Reason", "SIP; cause=422; text=\"Session Interval Too Small\"")
                );
            }

            /* 180 Ringing */
            /* 183 Session in Progress */
            if (i_code == 180 || i_code == 183) {
                if (this.require.b_100rel) {
                    if (this.i_rseq == 0) {
                        this.i_rseq = Math.abs((rand() ^ rand()) + 1);
                    }
                    o_response.add_headers(
                        new tsip_header_Require("100rel"),
                        new tsip_header_RSeq(this.i_rseq)
                    );

                    this.o_last_o1xxrel = o_response;

                    /* No-Initial reliable 1xx will use tsip_dialog_response_send() instead of this function
                    * ==> can reseset timeout value and make initial schedule */
                    this.timer_cancel('100Rel');
                    this.i_timer100Rel = this.get_stack().o_timers.getA();
                    this.timer_schedule('invite', '100Rel');
                }
            }


            /* SDP content */
            if (this.o_msession_mgr && b_force_sdp) {
                var o_sdp_lo = this.o_msession_mgr.get_lo();
                b_wait4lo = (o_sdp_lo == null);
                if (o_sdp_lo) {
                    var s_sdp_lo = o_sdp_lo.toString();
                    o_response.add_content(new String(s_sdp_lo), "application/sdp");
                }
            }

            /* Add Allow header */
            o_response.add_headers(new tsip_header_Dummy("Allow", TSIP_HEADER_ALLOW_DEFAULT));
        }
        else if (o_request.is_refer()) {
            if (this.require.b_norefersub) {
                o_response.add_headers(new tsip_header_Require("norefersub"));
                
            }
            if (this.supported.b_norefersub) {
                o_response.add_headers(new tsip_header_Supported("norefersub"));
            }
        }

        /* send the request */
        if (b_wait4lo) {
            this.o_wait_oMessage = o_response;
            this.timer_schedule('invite', 'LoSdpRequest');
            return 0;
        }
        else {
            return this.response_send(o_response);
        }
    }
    return i_ret;
}

tsip_dialog_invite.prototype.send_error = function (o_request, i_code, s_phrase, s_reason) {
    var o_response;

    if ((o_response = this.response_new(i_code, s_phrase, o_request))) {
        o_response.add_headers(new tsip_header_Dummy("Reason", s_reason));

        return this.response_send(o_response);
    }
    else {
        tsk_utils_log_error("Failed to create new message");
        return -1;
    }
}

tsip_dialog_invite.prototype.send_bye = function(){
	var i_ret = -1;
	var o_bye;
	
	/* RFC 3261 - 15.1.1 UAC Behavior
		A BYE request is constructed as would any other request within a
		dialog, as described in Section 12.

		Once the BYE is constructed, the UAC core creates a new non-INVITE
		client transaction, and passes it the BYE request.  The UAC MUST
		consider the session terminated (and therefore stop sending or
		listening for media) as soon as the BYE request is passed to the
		client transaction.  If the response for the BYE is a 481
		(Call/Transaction Does Not Exist) or a 408 (Request Timeout) or no

		response at all is received for the BYE (that is, a timeout is
		returned by the client transaction), the UAC MUST consider the
		session and the dialog terminated.
	*/
	if ((o_bye = this.request_new("BYE"))) {
	    i_ret = this.request_send(o_bye);
	}

	return i_ret;
}

tsip_dialog_invite.prototype.send_info = function(s_content, s_content_type){
    var i_ret = -1;
	var o_info;

    if ((o_info = this.request_new("INFO"))) {
        if (s_content && s_content_type) {
            o_info.add_content(new String(s_content), s_content_type);
        }
	    i_ret = this.request_send(o_info);
	}
    return i_ret;
}

tsip_dialog_invite.prototype.send_cancel = function () {
    /* RFC 3261 - 9 Canceling a Request
    If the request being cancelled contains a Route header field, the
    CANCEL request MUST include that Route header field's values.
    ==> up to tsip_dialog_request_new()
    */

    /*	RFC 3261 - 9 Canceling a Request
    Once the CANCEL is constructed, the client SHOULD check whether it
    has received any response (provisional or final) for the request
    being cancelled (herein referred to as the "original request").

    If no provisional response has been received, the CANCEL request MUST
    NOT be sent; rather, the client MUST wait for the arrival of a
    provisional response before sending the request.
    ==> up to the caller to check that we are not in the initial state and the FSM
    is in Trying state.
    */

    /*	RFC 3261 - 9 Canceling a Request
    The following procedures are used to construct a CANCEL request.  The
    Request-URI, Call-ID, To, the numeric part of CSeq, and From header
    fields in the CANCEL request MUST be identical to those in the
    request being cancelled, including tags.  A CANCEL constructed by a
    client MUST have only a single Via header field value matching the
    top Via value in the request being cancelled.  Using the same values
    for these header fields allows the CANCEL to be matched with the
    request it cancels (Section 9.2 indicates how such matching occurs).
    However, the method part of the CSeq header field MUST have a value
    of CANCEL.  This allows it to be identified and processed as a
    transaction in its own right (See Section 17)
    */
    if (this.o_last_oInvite) {
        /* to avoid concurrent access, take a reference to the request */
        var o_request;
        var i_index;

        if ((o_request = new tsip_request("CANCEL", this.o_last_oInvite.line.request.o_uri, null, null, this.o_last_oInvite.o_hdr_Call_ID.s_value, this.o_last_oInvite.o_hdr_CSeq.i_seq))) {
            o_request.o_hdr_firstVia = this.o_last_oInvite.o_hdr_firstVia;
            o_request.o_hdr_From = this.o_last_oInvite.o_hdr_From;
            o_request.o_hdr_To = this.o_last_oInvite.o_hdr_To;

            // Copy Authorizations, Routes and Proxy-Auth
            for (i_index = 0; i_index < this.o_last_oInvite.ao_headers.length; ++i_index) {
                switch (this.o_last_oInvite.ao_headers[i_index].e_type) {
                    case tsip_header_type_e.Route:
                    case tsip_header_type_e.Proxy_Authorization:
                    case tsip_header_type_e.Authorization:
                        o_request.ao_headers.push(this.o_last_oInvite.ao_headers[i_index]);
                        break;
                }
            }
            /* Add outbound proxy */
            // The outbound proxy is added as Route header only if the transport is WS/WSS to allow webrtc2sip to forward the request
            // For all other protocols (e.g UDP) the request will already be sent to the outbound proxy address
            if (this.get_stack().network.e_proxy_cscf_type == tsip_transport_type_e.WS || this.get_stack().network.e_proxy_cscf_type == tsip_transport_type_e.WSS) {
                var s_proxy_outbound = this.get_stack().__get_proxy_outbound_uri_string();
                if (s_proxy_outbound) {
                    o_request.add_header(new tsip_header_Dummy("Route", s_proxy_outbound), true/*true*/);
                }
            }

            return this.request_send(o_request);
        }
        else {
            tsk_utils_log_error("Failed to create CANCEL request");
            return -2;
        }
    }
    else {
        tsk_utils_log_warn("There is no INVITE request to cancel");
        return 0;
    }
}

tsip_dialog_invite.prototype.notify_parent = function (o_response) {
    var o_dlg_parent = this.get_layer_dialog().find_by_ssid(this.get_session().i_id_parent);
    if (o_dlg_parent) {
        var o_action = new tsip_action(tsip_action_type_e.ECT_NOTIFY);
        if (o_action) {
            return o_dlg_parent.fsm_act(o_action.e_type, o_response, o_action);
        }
    }
    else {
        tsk_utils_log_error("Failed to find parent with id=" + this.get_session().i_id_parent + "");
    }
    return -1;
}

tsip_dialog_invite.prototype.config_msession_mgr = function(o_msession_mgr) {
    if (o_msession_mgr) {
        o_msession_mgr.set(
            tmedia_session_mgr.prototype.SetParamSession(o_msession_mgr.e_type, "ice-servers", this.get_stack().network.ao_ice_servers),
            tmedia_session_mgr.prototype.SetParamSession(o_msession_mgr.e_type, "cache-stream", this.get_stack().network.b_cache_stream),
            tmedia_session_mgr.prototype.SetParamSession(o_msession_mgr.e_type, "bandwidth", this.get_session().media.o_bandwidth),
            tmedia_session_mgr.prototype.SetParamSession(o_msession_mgr.e_type, "video-size", this.get_session().media.o_video_size),
            tmedia_session_mgr.prototype.SetParamSession(o_msession_mgr.e_type, "screencast-windowid", this.get_session().media.screencast.d_window_id)
			// ... more media parameters to be added later
        );
    }
}

tsip_dialog_invite.prototype.new_msession_mgr = function(e_type, s_addr, b_ipv6, b_offerer) {
    var o_msession_mgr = new tmedia_session_mgr(e_type, s_addr, b_ipv6, b_offerer, __tsip_dialog_invite_media_callback, this);
    this.config_msession_mgr(o_msession_mgr);
    return o_msession_mgr;
}

tsip_dialog_invite.prototype.process_ro = function(o_message, b_is_offer){
	var o_sdp_ro = null;
	var e_old_media_type;
	var e_new_media_type;
	var b_media_session_was_null;
	var i_ret = 0;

	if(!o_message){
		tsk_utils_log_error("Invalid parameter");
		return -1;
	}

	/* Parse SDP content */
	if(o_message.has_content()){
		if(tsk_string_iequals("application/sdp", o_message.get_content_type())){
			if(!(o_sdp_ro = tsdp_message.prototype.Parse(o_message.get_content_as_string()))){
				tsk_utils_log_error("Failed to parse remote sdp message");
				return -2;
			}
		}
		else{
		    tsk_utils_log_error("[" + o_message.get_content_type() + "] content-type is not supportted");
			return -3;
		}
	}
	else{
		if(this.e_state == tsip_dialog_state_e.INITIAL && o_message.is_invite()){ /* Bodiless initial INVITE */
			this.get_session().media.e_type = tmedia_defaults_get_media_type(); // Default media for initial INVITE to send with the first reliable answer
		}
		else{
			return 0;
		}
	}
	
	b_media_session_was_null = (this.o_msession_mgr == null);
	e_old_media_type = this.get_session().media.e_type;
	e_new_media_type = o_sdp_ro ? o_sdp_ro.get_media_type() : e_old_media_type;

	/* Create session Manager if not already done */
	if(!this.o_msession_mgr){
		this.get_session().media.e_type = e_new_media_type;
		this.o_msession_mgr = this.new_msession_mgr(e_new_media_type, this.get_stack().network.s_local_ip, false/* ipv6 */, (o_sdp_ro == null));
	}
	
	if(o_sdp_ro){
	    if ((i_ret = this.o_msession_mgr.set_ro(o_sdp_ro, b_is_offer))) {
			tsk_utils_log_error("Failed to set remote offer");
			return i_ret;
		}
	}
	
	// is media update?
	if(!b_media_session_was_null && (e_old_media_type != e_new_media_type) && (this.o_msession_mgr.sdp.o_lo && this.o_msession_mgr.sdp.o_ro)){
		// at this point the media session manager has been succeffuly started and all is ok
		this.get_session().media.e_type = e_new_media_type;
        this.signal_invite(tsip_event_invite_type_e.M_UPDATED, o_message.get_response_code(), o_message.get_response_phrase(), o_message);
	}
	
	/* start session manager */
	if(!this.o_msession_mgr.is_started() && (this.o_msession_mgr.has_lo() && this.o_msession_mgr.has_ro())){
		/* starts */
		i_ret = this.o_msession_mgr.start();
		if(i_ret == 0 && this.e_state == tsip_dialog_state_e.EARLY){
            this.signal_invite(tsip_event_invite_type_e.M_EARLY_MEDIA, o_message.get_response_code(), o_message.get_response_phrase(), o_message);
		}
	}

	return i_ret;
}

function __tsip_dialog_invite_timer_callback(o_self, o_timer) {
    var i_ret = -1;
    if (o_self) {
        if (o_self.o_timerSession == o_timer) {
            i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.TIMER_REFRESH, null, null);
        }
        else if (o_self.o_timer100Rel == o_timer) {
            i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.TIMER_100REL, null, null);
        }
        else if (o_self.o_timerShutdown == o_timer) {
            i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.SHUTDOWN_TIMEDOUT, null, null);
        }
        else if (o_self.o_timerLoSdpRequest == o_timer) {
            i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.TIMER_LO_SDP_REQUEST, null, null);
        }
    }
    return i_ret;
}

function __tsip_dialog_invite_media_callback(o_self, e_event_type, e_media_type, s_decription/*optional*/) {
    var i_ret;

    switch (e_event_type) {
        case tmedia_session_events_e.GET_LO_SUCCESS:
            {
                o_self.timer_cancel('LoSdpRequest');
                if (o_self.o_wait_oMessage) {
                    var o_sdp_lo = o_self.o_msession_mgr.get_lo();
                    var s_sdp_lo = null;
                    if (o_sdp_lo && (s_sdp_lo = o_sdp_lo.toString())) {
                        o_self.o_wait_oMessage.add_content(new String(s_sdp_lo), "application/sdp");
                        // tsk_utils_log_info("sending=" + o_self.o_wait_oMessage.toString());
                        if (o_self.o_wait_oMessage.is_request()) {
                            if (o_self.o_wait_oMessage.is_ack()) {
                                i_ret = o_self.get_stack().o_layer_transport.send(null, o_self.o_wait_oMessage);
                            }
                            else {
                                i_ret = o_self.request_send(o_self.o_wait_oMessage);
                                if (i_ret == 0 && o_self.o_wait_oMessage.is_invite()) {
                                    o_self.o_last_oInvite = o_self.o_wait_oMessage;
                                }
                            }
                        }
                        else {
                            i_ret = o_self.response_send(o_self.o_wait_oMessage);
                        }
                    }
                    o_self.o_wait_oMessage = null;
                }
                else {
                    // /!\do not send early media (18x with SDP)
                    if (/*o_self.e_state == tsip_dialog_state_e.EARLY ||*/ o_self.e_state == tsip_dialog_state_e.ESTABLISHED) {
                        if (o_self.e_next_offer_type == tsip_dialog_invite_next_offer_type_e.SUCCESS && o_self.o_last_iOffer) {
                            i_ret = o_self.send_response(o_self.o_last_iOffer, 200, "OK", true);
                        }
                        else {
                            i_ret = o_self.send_offer(true, true); // always send INVITE because we use the ACK to ensure the media
                        }
                    }
                }
                if (o_self.o_msession_mgr && !o_self.o_msession_mgr.is_started() && (o_self.o_msession_mgr.has_lo() && o_self.o_msession_mgr.has_ro())) {
                    i_ret = o_self.o_msession_mgr.start();
                }

                o_self.e_next_offer_type = tsip_dialog_invite_next_offer_type_e.NONE;
                break;
            }
        case tmedia_session_events_e.GET_LO_FAILED:
            {
                o_self.timer_cancel('LoSdpRequest');
                o_self.set_last_error(tsip_event_code_e.DIALOG_WEBRTC_ERROR, "Failed to get local SDP offer");
                o_self.e_next_offer_type = tsip_dialog_invite_next_offer_type_e.NONE;

                var o_action = new tsip_action(tsip_action_type_e.HANGUP);
                o_action.set_line_resp(603, "Failed to get local SDP");
                o_self.hangup(o_action);
                break;
            }

        case tmedia_session_events_e.STREAM_LOCAL_REQUESTED:
            {
                o_self.signal_invite(tsip_event_invite_type_e.M_STREAM_LOCAL_REQUESTED, tsip_event_code_e.DIALOG_MEDIA_LOCAL_REQUESTED, "Media Requested", null);
                break;
            }
        case tmedia_session_events_e.STREAM_LOCAL_ACCEPTED:
            {
                o_self.signal_invite(tsip_event_invite_type_e.M_STREAM_LOCAL_ACCEPTED, tsip_event_code_e.DIALOG_MEDIA_LOCAL_ACCEPTED, "Media Accepted", null);
                break;
            }
        case tmedia_session_events_e.STREAM_LOCAL_REFUSED:
            {
                o_self.signal_invite(tsip_event_invite_type_e.M_STREAM_LOCAL_REFUSED, tsip_event_code_e.DIALOG_MEDIA_LOCAL_REFUSED, "Media Refused", null);
                var o_action = new tsip_action(tsip_action_type_e.HANGUP);
                o_action.set_line_resp(603, "Media stream permission denied");
                o_self.hangup(o_action);
                break;
            }
        case tmedia_session_events_e.STREAM_LOCAL_ADDED:
            {
                o_self.get_session().__set_stream_local(o_self.o_msession_mgr.get_stream_local());
                o_self.signal_invite(tsip_event_invite_type_e.M_STREAM_LOCAL_ADDED, tsip_event_code_e.DIALOG_MEDIA_ADDED, "Media Added", null);
                break;
            }
        case tmedia_session_events_e.STREAM_LOCAL_REMOVED:
            {
                o_self.get_session().__set_stream_local(null);
                o_self.signal_invite(tsip_event_invite_type_e.M_STREAM_LOCAL_REMOVED, tsip_event_code_e.DIALOG_MEDIA_REMOVED, "Media Removed", null);
                break;
            }
        case tmedia_session_events_e.STREAM_REMOTE_ADDED:
            {
                o_self.get_session().__set_stream_remote(o_self.o_msession_mgr.get_stream_remote());
                o_self.signal_invite(tsip_event_invite_type_e.M_STREAM_REMOTE_ADDED, tsip_event_code_e.DIALOG_MEDIA_ADDED, "Media Added", null);
                break;
            }
        case tmedia_session_events_e.STREAM_REMOTE_REMOVED:
            {
                o_self.get_session().__set_stream_remote(null);
                o_self.signal_invite(tsip_event_invite_type_e.M_STREAM_REMOTE_REMOVED, tsip_event_code_e.DIALOG_MEDIA_REMOVED, "Media Removed", null);
                break;
            }
        case tmedia_session_events_e.RFC5168_REQUEST_IDR:
            {
                o_self.send_info("<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n" +
				" <media_control>\r\n" +
				"   <vc_primitive>\r\n" +
				"     <to_encoder>\r\n" +
				"       <picture_fast_update>\r\n" +
				"       </picture_fast_update>\r\n" +
				"     </to_encoder>\r\n" +
				"   </vc_primitive>\r\n" +
				" </media_control>\r\n", "application/media_control+xml");
                break;
            }
        case tmedia_session_events_e.BFCP_INFO:
            {
                o_self.signal_invite(tsip_event_invite_type_e.M_BFCP_INFO, tsip_event_code_e.DIALOG_BFCP_INFO, s_decription ? s_decription : "BFCP INFO", null);
                break;
            }
    }
}

function __tsip_dialog_invite_event_callback(o_self, e_type, o_message){
	var i_ret = -1;

	switch(e_type){
	    case tsip_dialog_event_type_e.I_MSG:
		    {
		        if (o_message) {
		            if (o_message.is_response()) { /* Response */
		                if (o_message.is_1xx()) { // 100-199
		                    i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.I_1XX, o_message, null);
					    }
						else if (o_message.is_2xx()) { // 200-299
						    i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.I_2XX, o_message, null);
					    }
						else if (o_message.is_response_xxx(401) || o_message.is_response_xxx(407)) { // 401,407
						    i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.I_401_407, o_message, null);
					    }
						else if (o_message.is_response_xxx(422)) { // 422
						    i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.I_422, o_message, null);
					    }
						else if (o_message.is_3456()) { // 300-699
						    i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.I_300_to_699, o_message, null);
					    }
					    //else; // Ignore
				    }
				    else{ /* Request */
				        if (o_message.is_invite()) { // INVITE
				            i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.I_INVITE, o_message, null);
					    }
					    else if (o_message.is_update()) { // UPDATE
					        i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.I_UPDATE, o_message, null);
					    }
					    else if (o_message.is_prack()) { // PRACK
					        i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.I_PRACK, o_message, null);
					    }
					    else if (o_message.is_ack()) { // ACK
					        i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.I_ACK, o_message, null);
					    }
					    else if (o_message.is_options()) { // OPTIONS
					        i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.I_OPTIONS, o_message, null);
					    }
					    else if (o_message.is_bye()) { // BYE
					        i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.I_BYE, o_message, null);
					    }
					    else if (o_message.is_cancel()) { // CANCEL
					        i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.I_CANCEL, o_message, null);
					    }
					    else if (o_message.is_info()) { // INFO
					        i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.I_INFO, o_message, null);
					    }
					    else if (o_message.is_notify()) { // NOTIFY
					        i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.I_NOTIFY, o_message, null);
					    }
					    else if (o_message.is_refer()) { // REFER
					        i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.I_REFER, o_message, null);
					    }
				    }
			    }
			    break;
		    }

        case tsip_dialog_event_type_e.CANCELED:
		    {
		        i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.O_CANCEL, o_message, null);
			    break;
		    }

        case tsip_dialog_event_type_e.TIMEDOUT:
		    {
			    // Do nothing if request type is "INFO"
		        if (!o_message || (!o_message.is_request() || !o_message.is_info())) {
			        i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.TRANSPORT_ERROR, o_message, null);
			    }
			    break;
		    }
        case tsip_dialog_event_type_e.TERMINATED:
        case tsip_dialog_event_type_e.ERROR:
        case tsip_dialog_event_type_e.TRANSPORT_ERROR:
		    {
		        i_ret = o_self.fsm_act(tsip_dialog_invite_actions_e.TRANSPORT_ERROR, o_message, null);
			    break;
		    }
	}

    return i_ret;
}

/* ======================== conds ======================== */
function __tsip_dialog_invite_cond_is_resp2invite(o_dialog, o_message){
	return o_message.is_response_to_invite();
}
function __tsip_dialog_invite_cond_is_resp2update(o_dialog, o_message){
    return o_message.is_response_to_update();
}
function __tsip_dialog_invite_cond_is_resp2invite_or_update(o_dialog, o_message) {
    return __tsip_dialog_invite_cond_is_resp2invite(o_dialog, o_message) || __tsip_dialog_invite_cond_is_resp2update(o_dialog, o_message);
}
function __tsip_dialog_invite_cond_is_resp2bye(o_dialog, o_message){
    return o_message.is_response_to_bye();
}
function __tsip_dialog_invite_cond_is_resp2prack(o_dialog, o_message){
    return o_message.is_response_to_prack();
}
function __tsip_dialog_invite_cond_is_resp2info(o_dialog, o_message){
    return o_message.is_response_to_info();
}
function __tsip_dialog_invite_cond_is_resp2cancel(o_dialog, o_message) {
    return o_message.is_response_to_cancel();
}
function __tsip_dialog_invite_cond_is_resp2refer(o_dialog, o_message) {
    return o_message.is_response_to_refer();
}
function __tsip_dialog_invite_cond_is_1xx_notify(o_dialog, o_message){
	var i_code = __tsip_dialog_invite_get_sip_frag_respcode(o_message);
	return (i_code >= 100 && i_code <= 199);
}
function __tsip_dialog_invite_cond_is_23456_notify(o_dialog, o_message){
	var i_code = __tsip_dialog_invite_get_sip_frag_respcode(o_message);
	return (i_code >= 200 && i_code <= 699);
}
function __tsip_dialog_invite_cond_is_f_refer(o_dialog, o_message){
    var o_hdr_Refer_To = o_message.get_header(tsip_header_type_e.Refer_To);
    return (!o_hdr_Refer_To || !o_hdr_Refer_To.o_uri);
}
function __tsip_dialog_invite_cond_is_1xx_f_notify(o_dialog, o_message){
    return o_message.is_1xx();
}
function __tsip_dialog_invite_cond_is_23456_f_notify(o_dialog, o_message){
    return o_message.is_23456();
}


//--------------------------------------------------------
//				== STATE MACHINE BEGIN ==
//--------------------------------------------------------

function x0000_Connected_2_Connected_X_oDTMF(ao_args) {
    if (ao_args[0].o_msession_mgr && (WebRtc4all_GetType() == WebRtcType_e.W4A || WebRtc4all_GetType() == WebRtcType_e.IE || WebRtc4all_GetType() == WebRtcType_e.NPAPI)) {
        var o_action = ao_args[2];
        return ao_args[0].o_msession_mgr.send_dtmf(o_action.o_content.toString());
    }
    else {
        return x0000_Any_2_Any_X_oINFO(ao_args);
    }
}

function x0000_Connected_2_Connected_X_oLMessage(ao_args) {
    tsk_utils_log_error("Not implemented");
    return 0;
}

function x0000_Connected_2_Connected_X_iACK(ao_args) {
    var o_dialog = ao_args[0];
    var o_request = ao_args[1];
    var i_ret = 0;

    /* Process remote offer (ACK could carry SDP) */
    var b_is_offer = o_dialog.o_msession_mgr && !o_dialog.o_msession_mgr.has_ro();
    if ((i_ret = o_dialog.process_ro(o_request, b_is_offer))) {
        return i_ret;
    }

    /* Ensure media session */
    if (o_dialog.o_msession_mgr) {
        i_ret = o_dialog.o_msession_mgr.acked();
    }

    /* alert the user */
    o_dialog.signal_invite(tsip_event_invite_type_e.DIALOG_REQUEST_INCOMING, tsip_event_code_e.DIALOG_REQUEST_INCOMING, "Incoming Request", o_request);

	return i_ret;
}

function x0000_Connected_2_Connected_X_iINVITEorUPDATE(ao_args) {
    var o_dialog = ao_args[0];
    var o_request = ao_args[1];
    var i_ret;
	
	var b_bodiless_invite;
	var e_old_media_type = o_dialog.o_msession_mgr ? o_dialog.o_msession_mgr.get_media_type() : tmedia_type_e.NONE;
    var b_is_roap = o_dialog.o_msession_mgr ? o_dialog.o_msession_mgr.is_roap() : false;
	var e_new_media_type;
	var b_force_sdp;

    o_dialog.o_last_iOffer = o_request;

     // swictch before calling process_ro()
    if(b_is_roap){
        o_dialog.e_next_offer_type = tsip_dialog_invite_next_offer_type_e.SUCCESS;
    }

	/* process remote offer */
	if ((i_ret = o_dialog.process_ro(o_request, true))) {
        return i_ret;
    }

	// force SDP in 200 OK even if the request has the same SDP version
	b_force_sdp = o_request.has_content();
	
	// get new media_type after processing the remote offer
	e_new_media_type = o_dialog.o_msession_mgr ? o_dialog.o_msession_mgr.get_media_type() : tmedia_type_e.NONE;
	
	/** response to bodiless iINVITE always contains SDP as explained below
		RFC3261 - 14.1 UAC Behavior 
		   The same offer-answer model that applies to session descriptions in 
		   INVITEs (Section 13.2.1) applies to re-INVITEs.  As a result, a UAC 
		   that wants to add a media stream, for example, will create a new 
		   offer that contains this media stream, and send that in an INVITE 
		   request to its peer.  It is important to note that the full 
		   description of the session, not just the change, is sent.  This 
		   supports stateless session processing in various elements, and 
		   supports failover and recovery capabilities.  Of course, a UAC MAY 
		   send a re-INVITE with no session description, in which case the first 
		   reliable non-failure response to the re-INVITE will contain the offer 
		   (in this specification, that is a 2xx response).
	*/
	b_bodiless_invite = !o_request.has_content() && o_request.is_invite();

	/* session timers (must be before sending response) */
    // FIXME: session-timers
	//if(self->stimers.timer.timeout){
	//	tsip_dialog_invite_stimers_handle(self, rINVITEorUPDATE);
	//}

	/* hold/resume */
    i_ret = o_dialog.hold_handle (o_request);

	// send the response
    if(!b_is_roap){
	    i_ret = o_dialog.send_response(o_request, 200, "OK",
		    (o_dialog.o_msession_mgr && (b_force_sdp || b_bodiless_invite || o_dialog.o_msession_mgr.has_ro_changed() || o_dialog.o_msession_mgr.has_state_changed() || (e_old_media_type != e_new_media_type))));
    }

	/* alert the user */
	o_dialog.signal_invite(tsip_event_invite_type_e.DIALOG_REQUEST_INCOMING, tsip_event_code_e.DIALOG_REQUEST_INCOMING, "Incoming Request", o_request);
	

	return i_ret;
}

function x0000_Connected_2_Connected_X_oINVITE(ao_args) {
    var i_ret;
	var o_dialog = ao_args[0];
    var o_action = ao_args[2];

	if (!o_dialog.o_msession_mgr) {
		tsk_utils_log_warn("Media Session manager is Null");
		return 0;
	}

	/* change media type */
    i_ret = o_dialog.o_msession_mgr.set_media_type(o_action.media.e_type);

	/* Update current action */
    o_dialog.set_action_curr(o_action);

    /* Update media session manager paramters */
    o_dialog.config_msession_mgr(o_dialog.o_msession_mgr);

	/* send the request */
	if ((iret = o_dialog.send_invite(true))) {
		// signal error without breaking the state machine
	}

	return 0;
}

function x0000_Any_2_Any_X_noOps(ao_args) {
    var o_dialog = ao_args[0];
    var o_action = ao_args[2];
    switch(o_action.e_type) {
        case tsip_action_type_e.MUTE:
            {
                if (o_dialog.o_msession_mgr) {
                    o_dialog.o_msession_mgr.set(tmedia_session_mgr.prototype.SetParamSession(o_dialog.o_msession_mgr.e_type, "mute-" + o_action.mute.s_media, o_action.mute.b_muted));
                }
                break;
            }
        default:
            {
                tsk_utils_log_error("Not implemented");
                return -1;
            }
    }
    return 0;
}

function x0000_Any_2_Any_X_i1xx(ao_args) {
    var o_dialog = ao_args[0];
    var o_r1xx = ao_args[1];
    var i_ret = 0;

    /* Update the dialog state */
    if ((i_ret = o_dialog.update_with_response(o_r1xx))) {
        return i_ret;
    }

    /* RFC 3262 - 4 UAC Behavior
    If a provisional response is received for an initial request, and
    that response contains a Require header field containing the option
    tag 100rel, the response is to be sent reliably.  If the response is
    a 100 (Trying) (as opposed to 101 to 199), this option tag MUST be
    ignored, and the procedures below MUST NOT be used.

    Assuming the response is to be transmitted reliably, the UAC MUST
    create a new request with method PRACK.  This request is sent within
    the dialog associated with the provisional response (indeed, the
    provisional response may have created the dialog).  PRACK requests
    MAY contain bodies, which are interpreted according to their type and
    disposition.

    Note that the PRACK is like any other non-INVITE request within a
    dialog.  In particular, a UAC SHOULD NOT retransmit the PRACK request
    when it receives a retransmission of the provisional response being
    acknowledged, although doing so does not create a protocol error.
	 
    Additional information: We should only process the SDP from reliable responses (require:100rel)
    but there was many problem with some clients sending SDP with this tag: tiscali, DTAG, samsung, ...
    */
    
    if ((o_r1xx.get_response_code() >= 101 && o_r1xx.get_response_code() <= 199)) {
        /* Process Remote offer */
        var b_is_offer = o_dialog.o_msession_mgr && !o_dialog.o_msession_mgr.has_lo();
        if (o_r1xx.has_content() && (i_ret = o_dialog.process_ro(o_r1xx, b_is_offer))) {
            /* FIXME: Send Error */
            return i_ret;
        }
        // don't send PRACK if 100rel is only inside "supported" header
        if (o_r1xx.is_required("100rel") && (i_ret = o_dialog.send_prack(o_r1xx))) {
            return i_ret;
        }
    }

    // alert user
    i_ret = o_dialog.signal_invite(tsip_event_invite_type_e.I_AO_REQUEST, o_r1xx.get_response_code(), o_r1xx.get_response_phrase(), o_r1xx);

    if (o_dialog.b_is_transf) {
        i_ret = o_dialog.notify_parent(o_r1xx);
    }

    return i_ret;
}

function x0000_Any_2_Any_X_oINFO(ao_args) {
    var o_dialog = ao_args[0];
    var o_action = ao_args[2];
    var o_request;

    o_dialog.b_running = true;
    o_dialog.set_action_curr(o_action);

    if ((o_request = o_dialog.request_new("INFO"))) {
        var i_ret;
        if ((i_ret = tsip_dialog.prototype.ApplyAction(o_request, o_action)) == 0) {
            i_ret = o_dialog.request_send(o_request);
        }
        return i_ret;
	}
	else{
		tsk_utils_log_error("Failed to create new INFO request");
		return -1;
	}
}

function x0000_Any_2_Any_X_iINFO(ao_args) {
    var o_dialog = ao_args[0];
    var o_request = ao_args[1];

    var i_ret = o_dialog.send_response(o_request, 200, "OK");
    /*i_ret =*/ o_dialog.signal_invite(tsip_event_invite_type_e.DIALOG_REQUEST_INCOMING, tsip_event_code_e.DIALOG_REQUEST_INCOMING, "Incoming Request", o_request);

    // Forward the content to the media stack (e.g. rfc5168("picture_fast_update") to request IDR)
    if (o_dialog.o_msession_mgr && o_request.has_content()) {
        var s_content_as_string = o_request.get_content_as_string();
        if (!tsk_string_is_null_or_empty(s_content_as_string)) {
            o_dialog.o_msession_mgr.processContent("INFO", o_request.get_content_type(), s_content_as_string, s_content_as_string.length);
        }
    }

    return i_ret;
}

function x0000_Any_2_Any_X_i401_407_INVITEorUPDATE(ao_args) {
    var o_dialog = ao_args[0];
    var o_response = ao_args[1];
    var i_ret = 0;

    if ((i_ret = o_dialog.update_with_response(o_response))) {
        // alert user
        o_dialog.signal_invite(tsip_event_invite_type_e.I_AO_REQUEST, o_response.get_response_code(), o_response.get_response_phrase(), o_response);		
		return i_ret;
	}

    return o_dialog.send_offer(o_response.is_response_to_invite(), false);
}

function x0000_Any_2_Any_X_i2xxINVITEorUPDATE(ao_args) {
    var o_dialog = ao_args[0];
    var o_response = ao_args[1];
    var i_ret = 0;

    // ICT will always retransmit the 2xx (draft-sparks-sip-invfix-03 - 7.2. UAC Impacts)
    if (this.o_last_oInvite && this.o_last_oInvite.o_hdr_CSeq.i_seq == o_response.o_hdr_CSeq.i_seq) {
        if (o_response.is_response_to_invite()) {
            return o_dialog.send_ack(o_response);
        }
    }

	/* Update the dialog state */
	if((i_ret = o_dialog.update_with_response(o_response))){
		return i_ret;
	}

    /* session timers */
    // FIXME
	//if(self->stimers.timer.timeout){
	//	tsip_dialog_invite_stimers_handle(self, r2xx);
	//}

    /* Process remote offer */
    var b_is_offer = o_dialog.o_msession_mgr && !o_dialog.o_msession_mgr.has_lo();
    if ((i_ret = o_dialog.process_ro(o_response, b_is_offer))) {
        return i_ret;
    }

	/* send ACK */
    if (o_response.is_response_to_invite()) {
        i_ret = o_dialog.send_ack(o_response);
    }
	
	return i_ret;
}

function x0000_Any_2_Any_X_iPRACK(ao_args) {
    tsk_utils_log_error("Not implemented");
    return 0;
}

function x0000_Any_2_Any_X_iOPTIONS(ao_args) {
    var o_dialog = ao_args[0];
    var o_request = ao_args[1];

    /* Alert user */
    o_dialog.signal_invite(tsip_event_invite_type_e.DIALOG_REQUEST_INCOMING, tsip_event_code_e.DIALOG_REQUEST_INCOMING, "Incoming Request", o_request);

	/* Send 2xx */
    return o_dialog.send_response(o_request, 200, "OK", false);
}

// If not Connected => Cancel will be called instead. See tsip_dialog_hangup()
function x0000_Any_2_Trying_X_oBYE(ao_args) {
    var o_dialog = ao_args[0];
    var i_ret;

	/* Alert the user */
    o_dialog.signal(tsip_event_code_e.DIALOG_TERMINATING, "Call terminating...");

	/* send BYE */
	if((i_ret = o_dialog.send_bye()) == 0){
		// stop session manager
		if(o_dialog.o_msession_mgr && o_dialog.o_msession_mgr.is_started()){
			i_ret = o_dialog.o_msession_mgr.stop();
		}
	}
	return i_ret;
}

function x0000_Any_2_Terminated_X_iBYE(ao_args) {
    var o_dialog = ao_args[0];
    var o_request = ao_args[1];

    /* set last error (or info) */
    o_dialog.set_last_error(tsip_event_code_e.DIALOG_TERMINATED, "Call terminated");

	/* send 200 OK */
	return o_dialog.send_response(o_request, 200, "OK", false);
}

function x0000_Any_2_Trying_X_shutdown(ao_args) {
    var o_dialog = ao_args[0];

    // schedule shutdow timer
    o_dialog.timer_schedule('invite', 'Shutdown');

    // alert user
    o_dialog.signal(tsip_event_code_e.DIALOG_TERMINATING, "Call terminating...");

    if (o_dialog.e_state == tsip_dialog_state_e.ESTABLISHED) {
        return o_dialog.send_bye();
	}
    else if (o_dialog.e_state == tsip_dialog_state_e.EARLY) {
        return o_dialog.send_cancel();
	}
}

function x9997_Any_2_Any_X_LoSdpRequestTimeout(ao_args) {
    tsk_utils_log_error("Not implemented");
    return 0;
}

function x9998_Any_2_Terminated_X_transportError(ao_args) {
    var o_dialog = ao_args[0];
    o_dialog.set_last_error(tsip_event_code_e.DIALOG_TRANSPORT_ERROR, "Transport error");
    return 0;
}

function x9999_Any_2_Terminated_X_Error(ao_args) {
    var o_dialog = ao_args[0];
    
    return 0;
}


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//				== STATE MACHINE END ==
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++


function __tsip_dialog_invite_onterm(o_self) {
    tsk_utils_log_info("=== INVITE Dialog terminated ===");

    o_self.timer_cancel('100Rel');
    o_self.timer_cancel('Session');
    o_self.timer_cancel('Shutdown');
    o_self.timer_cancel('LoSdpRequest');

    // stops session if not already done
    // do not check if manager is started because peerconnection state must be closed in all cases
    if (o_self.o_msession_mgr) {
        i_ret = o_self.o_msession_mgr.stop();
    }
    
    // signal to the user must be done after the media session is stopped to be sure that all events (e.g. media_removed) will be notified
    o_self.signal(tsip_event_code_e.DIALOG_TERMINATED,
            o_self.last_error.s_phrase ? o_self.last_error.s_phrase : "Call terminated",
            o_self.last_error.o_message);

    // deinit
    return o_self.deinit();
}


if(!window.__b_release_mode){
    tsip_api_add_js_scripts('head',
    'src/tinySIP/src/dialogs/tsip_dialog_invite__client.js',
    'src/tinySIP/src/dialogs/tsip_dialog_invite__ect.js',
    'src/tinySIP/src/dialogs/tsip_dialog_invite__hold.js',
    'src/tinySIP/src/dialogs/tsip_dialog_invite__server.js',
    'src/tinySIP/src/dialogs/tsip_dialog_invite__timers.js'
    );
}
