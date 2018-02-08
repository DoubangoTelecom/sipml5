/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
tsip_dialog_invite.prototype.__ao_supported_options = ["100rel", "timer"];

tsip_dialog_invite.prototype.init_server = function () {
    this.o_fsm.set(
        /*=======================
        * === Started === 
        */
        // Started -> (Bad Extendion) -> Terminated 
        tsk_fsm_entry.prototype.Create(tsip_dialog_invite_states_e.STARTED, tsip_dialog_invite_actions_e.I_INVITE, __tsip_dialog_invite_cond_is_bad_extension, tsip_dialog_invite_states_e.TERMINATED, s0000_Started_2_Terminated_X_iINVITE, "s0000_Started_2_Terminated_X_iINVITE"),
        // Started -> (Bad content) -> Terminated
        tsk_fsm_entry.prototype.Create(tsip_dialog_invite_states_e.STARTED, tsip_dialog_invite_actions_e.I_INVITE, __tsip_dialog_invite_cond_is_bad_content, tsip_dialog_invite_states_e.TERMINATED, s0000_Started_2_Terminated_X_iINVITE, "s0000_Started_2_Terminated_X_iINVITE"),
        // Started -> (Session Interval Too Small) -> Started
        tsk_fsm_entry.prototype.Create(tsip_dialog_invite_states_e.STARTED, tsip_dialog_invite_actions_e.I_INVITE, __tsip_dialog_invite_cond_is_toosmall, tsip_dialog_invite_states_e.STARTED, s0000_Started_2_Started_X_iINVITE, "s0000_Started_2_Started_X_iINVITE"),
        // Started -> (100rel) -> InProgress
        tsk_fsm_entry.prototype.Create(tsip_dialog_invite_states_e.STARTED, tsip_dialog_invite_actions_e.I_INVITE, __tsip_dialog_invite_cond_enable_100rel, tsip_dialog_invite_states_e.INPROGRESS, s0000_Started_2_InProgress_X_iINVITE, "s0000_Started_2_InProgress_X_iINVITE"),
        // Started -> (non-100rel and non-QoS, referred to as "basic") -> Ringing
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_invite_states_e.STARTED, tsip_dialog_invite_actions_e.I_INVITE, tsip_dialog_invite_states_e.RINGING, s0000_Started_2_Ringing_X_iINVITE, "s0000_Started_2_Ringing_X_iINVITE"),
        

        /*=======================
        * === InProgress === 
        */
        // InProgress ->(iPRACK) -> Ringing
        tsk_fsm_entry.prototype.Create(tsip_dialog_invite_states_e.INPROGRESS, tsip_dialog_invite_actions_e.I_PRACK, __tsip_dialog_invite_cond_prack_matched, tsip_dialog_invite_states_e.RINGING, s0000_InProgress_2_Ringing_X_iPRACK, "s0000_InProgress_2_Ringing_X_iPRACK"),
        // InProgress ->(iUPDATE) -> InProgress
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_invite_states_e.INPROGRESS, tsip_dialog_invite_actions_e.I_UPDATE, tsip_dialog_invite_states_e.INPROGRESS, s0000_InProgress_2_InProgress_X_iUPDATE, "s0000_InProgress_2_InProgress_X_iUPDATE"),
        // InProgress ->(iCANCEL) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_invite_states_e.INPROGRESS, tsip_dialog_invite_actions_e.I_CANCEL, tsip_dialog_invite_states_e.TERMINATED, s0000_Inprogress_2_Terminated_X_iCANCEL, "s0000_Inprogress_2_Terminated_X_iCANCEL"),


        /*=======================
        * === Ringing === 
        */
        // Ringing -> (iPRACK) -> Ringing
        tsk_fsm_entry.prototype.Create(tsip_dialog_invite_states_e.RINGING, tsip_dialog_invite_actions_e.I_PRACK, __tsip_dialog_invite_cond_prack_matched, tsip_dialog_invite_states_e.RINGING, s0000_Ringing_2_Ringing_X_iPRACK, "s0000_Ringing_2_Ringing_X_iPRACK"),
        // Ringing -> (oAccept) -> Connected
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_invite_states_e.RINGING, tsip_dialog_invite_actions_e.ACCEPT, tsip_dialog_invite_states_e.CONNECTED, s0000_Ringing_2_Connected_X_Accept, "s0000_Ringing_2_Connected_X_Accept"),
        // Ringing -> (oReject) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_invite_states_e.RINGING, tsip_dialog_invite_actions_e.REJECT, tsip_dialog_invite_states_e.TERMINATED, s0000_Ringing_2_Terminated_X_Reject, "s0000_Ringing_2_Terminated_X_Reject"),
        // Ringing ->(iCANCEL) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_invite_states_e.RINGING, tsip_dialog_invite_actions_e.I_CANCEL, tsip_dialog_invite_states_e.TERMINATED, s0000_Ringing_2_Terminated_X_iCANCEL, "s0000_Ringing_2_Terminated_X_iCANCEL"),

        /*=======================
        * === ANY === 
        */
        // Any ->(timer100rel) -> Any
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_invite_actions_e.TIMER_100REL, tsk_fsm.prototype.__i_state_any, s0000_Any_2_Any_X_timer100rel, "s0000_Any_2_Any_X_timer100rel")
    );


}

/* ======================== conds ======================== */
function __tsip_dialog_invite_cond_is_bad_extension(o_dialog, o_message) {
    var o_hdr_require;
	var i, j, k;

	/* Check if we support all extensions */
	for(i = 0; (o_hdr_require = o_message.get_header_at(tsip_header_type_e.Require, i)); ++i){
		var b_bad_extension = false;
		var s_option = null;
		for(k = 0; k < o_hdr_require.as_options.length; ++k){
			b_bad_extension = true;
            s_option = o_hdr_require.as_options[k];
			for(j = 0; s_option && j < tsip_dialog_invite.prototype.__ao_supported_options.length; ++j){
				if(tsk_string_iequals(s_option, tsip_dialog_invite.prototype.__ao_supported_options[j])){
					b_bad_extension = false;
					break;
				}
			}
			if(b_bad_extension){
				break;
			}
		}
		if(b_bad_extension && s_option){
		    o_dialog.send_unsupported(o_message, s_option);
			return true;
		}
	}

	return false;
}

function __tsip_dialog_invite_cond_is_bad_content(o_dialog, o_message) {
    var i_ret;
    var o_sdp_lo;
    var b_bodiless_INVITE = (o_dialog.e_state == tsip_dialog_state_e.initial && !o_message.has_content()); // Initial Bodiless INVITE

    // Check remote offer
    var b_is_offer = o_dialog.o_msession_mgr && !o_dialog.o_msession_mgr.has_ro();
    if ((i_ret = o_dialog.process_ro(o_message, b_is_offer))) {
        i_ret = o_dialog.send_error(o_message, 488, "Not Acceptable", "SIP; cause=488; text=\"Bad content\"");
        return true;
    }
    // generate local offer and check it's validity
    /*if (false) { // FIXME: get_lo() is asynchronous
        if (o_dialog.o_msession_mgr && (o_sdp_lo = o_dialog.o_msession_mgr.get_lo())) {
            // check that we have at least one valid session (Only if no bodiless initial INVITE)
            if (!b_bodiless_INVITE && !o_dialog.o_msession_mgr.has_active_session()) {
                i_ret = o_dialog.send_error(o_message, 488, "Not Acceptable", "SIP; cause=488; text=\"No common codecs\"");
                return true;
            }
        }
        else {
            i_ret = o_dialog.send_error(o_message, 488, "Not Acceptable", "SIP; cause=488; text=\"Bad content\"");
            return true;
        }
    }*/

    return false;
}

function __tsip_dialog_invite_cond_is_toosmall(o_dialog, o_message){
	if(o_dialog.get_session().media.timers.i_timeout && (o_message.is_supported("timer") || o_message.is_required("timer"))){
		var o_hdr_Session_Expires;
		if((o_hdr_Session_Expires = o_message.get_header(tsip_header_type_e.Session_Expires))){
			if(o_hdr_Session_Expires.i_delta_seconds < TSIP_SESSION_EXPIRES_MIN_VALUE){
				o_dialog.stimers.i_minse = TSIP_SESSION_EXPIRES_MIN_VALUE;
				o_dialog.send_response(o_message, 422, "Session Interval Too Small", false);
				return true;
			}
			else{
				var o_hdr_Min_SE;
				o_dialog.stimers.i_timeout = o_hdr_Session_Expires.i_delta_seconds;
				o_dialog.stimers.s_refresher = o_hdr_Session_Expires.b_refresher_uas ? "uas" : "uac";
				o_dialog.stimers.b_is_refresher = tsk_string_iequals(o_dialog.stimers.s_refresher, "uas");
				if((o_hdr_Min_SE = o_message.get_header(tsip_header_type_e.Min_SE))){
					o_dialog.stimers.i_minse = o_hdr_Min_SE.i_value;
				}
			}
		}
	}
	return false;
}

function __tsip_dialog_invite_cond_enable_100rel(o_dialog, o_message){
	return ((o_message.is_supported("100rel") && o_dialog.supported.b_100rel) || o_message.is_required("100rel"))
}

function __tsip_dialog_invite_cond_prack_matched(o_dialog, o_message){
	var o_hdr_RAck;

	if(!o_dialog.o_last_o1xxrel){
		return false;
	}

	if((o_hdr_RAck = o_message.get_header(tsip_header_type_e.RAck))){
	    if ((o_hdr_RAck.i_seq == o_dialog.i_rseq) &&
			(tsk_string_iequals(o_hdr_RAck.s_method, o_dialog.o_last_o1xxrel.o_hdr_CSeq.s_method)) &&
			(o_hdr_RAck.i_cseq == o_dialog.o_last_o1xxrel.o_hdr_CSeq.i_seq)) {
				o_dialog.i_rseq++;
				return true;
		}
		else{
			tsk_utils_log_warn("Failed to match PRACK request");
		}
	}
	
	return false;
}

//--------------------------------------------------------
//				== STATE MACHINE BEGIN ==
//--------------------------------------------------------


 // Failure
function s0000_Started_2_Terminated_X_iINVITE(ao_args){
	return 0;
}

// Session Interval Too Small
function s0000_Started_2_Started_X_iINVITE(ao_args){
    var o_dialog = ao_args[0];
    o_dialog.b_is_client = false;
    return 0;
}

// 100rel supported
function s0000_Started_2_InProgress_X_iINVITE(ao_args){
    var o_dialog = ao_args[0];
    var o_request = ao_args[1];
	
	o_dialog.b_is_client = false;
	o_dialog.o_last_iInvite = o_request;
	o_dialog.b_support_update = o_request.is_allowed("UPDATE");

	/* Update state */
	o_dialog.update_with_invite(o_request);

	/* Send In Progress 
		RFC 3262 - 3 UAS Behavior
		
		The provisional response to be sent reliably is constructed by the
		UAS core according to the procedures of Section 8.2.6 of RFC 3261.
		In addition, it MUST contain a Require header field containing the
		option tag 100rel, and MUST include an RSeq header field.  The value
		of the header field for the first reliable provisional response in a
		transaction MUST be between 1 and 2**31 - 1.
	*/
	o_dialog.i_rseq = Math.floor((Math.random() * 0x0000FFFF));
	o_dialog.require.b_100rel = true;
	return o_dialog.send_response(o_request, 183, "Session in Progress", true);
}

// Neither 100rel nor QoS
function s0000_Started_2_Ringing_X_iINVITE(ao_args){
    var o_dialog = ao_args[0];
    var o_request = ao_args[1];
	var o_hdr_SessionExpires;
	
	o_dialog.b_is_client = false;
	o_dialog.o_last_iInvite = o_request;
	o_dialog.b_support_update = o_request.is_allowed("UPDATE");

	// add "require:100rel" tag if the incoming INVITE contains "100rel" tag in "supported" header
	if(o_dialog.o_last_iInvite && (o_dialog.o_last_iInvite.is_supported("100rel") || o_dialog.o_last_iInvite.is_required("100rel")) && o_dialog.supported.b_100rel){
		o_dialog.require.b_100rel = true;
	}

	// add "require:timer" tag if incoming INVITE contains "timer" tag in "supported" header and session timers is enabled
	if(o_dialog.get_session().media.timers.i_timeout){
		if((o_hdr_SessionExpires = o_request.get_header(tsip_header_type_e.Session_Expires))){
			// "hdr_SessionExpires->delta_seconds" smallnest already checked
			o_dialog.stimers.timer.i_timeout = o_hdr_SessionExpires.i_delta_seconds;
			o_dialog.stimers.s_refresher = o_hdr_SessionExpires.s_refresher_uas ? "uas" : "uac";
			o_dialog.stimers.b_is_refresher = o_hdr_SessionExpires.s_refresher_uas;
			o_dialog.require.b_timer = true;
		}
	}

    /* update state */
	o_dialog.update_with_invite(o_request);

	/* send Ringing */
	o_dialog.send_response(o_request, 180, "Ringing", false);

	/* alert the user */
	o_dialog.signal_invite(tsip_event_invite_type_e.I_NEW_CALL, tsip_event_code_e.DIALOG_REQUEST_INCOMING, "Incoming Call", o_request);

	return 0;
}

// PRACK for our 18x response (without QoS)
function s0000_InProgress_2_Ringing_X_iPRACK(ao_args){
    var o_dialog = ao_args[0];
    var o_request = ao_args[1];
    var i_ret;

	/* Cancel 100rel timer */
    o_dialog.timer_cancel('100Rel');

	/* In all cases: Send 2xx PRACK */
	if((i_ret = o_dialog.send_response(o_request, 200, "OK", false)) == 0){
		++o_dialog.i_rseq;
	}

	/*
		1. Alice sends an initial INVITE without offer
		2. Bob's answer is sent in the first reliable provisional response, in this case it's a 1xx INVITE response
		3. Alice's answer is sent in the PRACK response
	*/
	if(o_dialog.o_msession_mgr && !o_dialog.o_msession_mgr.sdp.o_ro){
	    if (o_request.has_content()) {
	        var b_is_offer = o_dialog.o_msession_mgr && !o_dialog.o_msession_mgr.has_ro();
		    if ((i_ret = o_dialog.process_ro(o_request, b_is_offer))) {
				/* Send Error and break the FSM */
		        i_ret = o_dialog.send_error(o_dialog.o_last_iInvite, 488, "Not Acceptable", "SIP; cause=488; text=\"Bad content\"");
				return -4;
			}
		}
		else{
			/* 488 INVITE */
		    i_ret = o_dialog.send_error(o_dialog.o_last_iInvite, 488, "Not Acceptable", "SIP; cause=488; text=\"Offer expected in the PRACK\"");
			return -3;
		}
	}

	/* Send Ringing */
    i_ret = o_dialog.send_response(o_dialog.o_last_iInvite, 180, "Ringing", false);

    /* Alert the user (session) */
    o_dialog.signal_invite(tsip_event_invite_type_e.I_NEW_CALL, tsip_event_code_e.DIALOG_REQUEST_INCOMING, "Incoming Call", o_request);

    return i_ret;
}

function s0000_InProgress_2_InProgress_X_iUPDATE(ao_args){
    tsk_utils_log_error("Not implemented");
    return 0;
}

function s0000_Inprogress_2_Terminated_X_iCANCEL(ao_args){
    tsk_utils_log_error("Not implemented");
    return 0;
}

function s0000_Ringing_2_Ringing_X_iPRACK(ao_args){
    var o_dialog = ao_args[0];
    var o_request = ao_args[1];
    var i_ret;

	if(!o_dialog.o_last_iInvite){
		/* silently ignore */
		return 0;
	}

	/* Cancel 100rel timer */
    o_dialog.timer_cancel('100Rel');

	/* Send 2xx PRACK */
    i_ret = o_dialog.send_response(o_request, 200, "OK", false);

    /* alert the user */
    o_dialog.signal_invite(tsip_event_invite_type_e.I_REQUEST, tsip_event_code_e.DIALOG_REQUEST_INCOMING, "Incoming Request", o_request);

	return i_ret;
}

function s0000_Ringing_2_Connected_X_Accept(ao_args) {
    var o_dialog = ao_args[0];
    var o_action = ao_args[2];
    var i_ret;

    // hack: not part of Doubango ANSI-C
    o_dialog.e_state = tsip_dialog_state_e.ESTABLISHED;

    /* Update current action */
    o_dialog.set_action_curr(o_action);

    /* FIXME: Appy media params received from the user */
    //if(!TSK_LIST_IS_EMPTY(action->media.params)){
    //	tmedia_session_mgr_set_3(o_dialog.msession_mgr, action->media.params);
    //}

    /* start session manager */
    if (o_dialog.o_msession_mgr && !o_dialog.o_msession_mgr.is_started() && (o_dialog.o_msession_mgr.has_lo() && o_dialog.o_msession_mgr.has_ro())) {
        /* Set MSRP Callback */
        //if((o_dialog.msession_mgr->type & tmedia_msrp) == tmedia_msrp){
        //	tmedia_session_mgr_set_msrp_cb(o_dialog.msession_mgr, TSIP_DIALOG_GET_SS(self)->userdata, TSIP_DIALOG_GET_SS(self)->media.msrp.callback);
        //}
        i_ret = o_dialog.o_msession_mgr.start();
    }    

    /* Cancel 100rel timer */
    o_dialog.timer_cancel('100Rel');

    /* send 2xx OK */
    i_ret = o_dialog.send_response(o_dialog.o_last_iInvite, 200, "OK", true);

    /* Session Timers */
    if (o_dialog.stimers.i_timeout) {
        if (o_dialog.stimers.b_is_refresher) {
            /* RFC 4028 - 9. UAS Behavior
            It is RECOMMENDED that this refresh be sent oncehalf the session interval has elapsed. 
            Additional procedures for this refresh are described in Section 10.
            */
            // tsip_dialog_invite_stimers_schedule(self, (o_dialog.stimers.timer.timeout*1000)/2);
            tsk_utils_log_error("Not implemented");
        }
        else {
            // tsip_dialog_invite_stimers_schedule(self, (o_dialog.stimers.timer.timeout*1000));
            tsk_utils_log_error("Not implemented");
        }
    }

    /* alert the user (dialog) */
    o_dialog.signal(tsip_event_code_e.DIALOG_CONNECTED, "In call");

    if (!o_dialog.o_msession_mgr.has_lo()) {
        // M_STREAM_CONNECTING
    }

    return i_ret;
}

function s0000_Ringing_2_Terminated_X_Reject(ao_args){
    var i_ret;
	var i_code;
	var s_phrase;
	var s_reason;

    var o_dialog = ao_args[0];
    var o_action = ao_args[2];

	/* Update current action */
    o_dialog.set_action_curr(o_action);

	/* Cancel 100rel timer */
	o_dialog.timer_cancel('100Rel');

	/* Send Reject */
	i_code = (o_action && o_action.line_resp.i_code >= 300) ? o_action.line_resp.i_code : 603;
	s_phrase = (o_action && o_action.line_resp.s_phrase) ? o_action.line_resp.s_phrase : "Decline";
	s_reason = tsk_string_format("SIP; cause={0}; text=\"{1}\"", i_code, s_phrase);
	i_ret = o_dialog.send_error(o_dialog.o_last_iInvite, i_code, s_phrase, s_reason);

	/* set last error (or info) */
	o_dialog.set_last_error(i_code, "Call Rejected");

	return i_ret;
}

function s0000_Ringing_2_Terminated_X_iCANCEL(ao_args){
    var o_dialog = ao_args[0];
    var o_request = ao_args[1];
    var o_response;
    var i_ret;

	/* Send 2xx for the CANCEL (Direct to Transport layer beacause CANCEL is a special case) */
	if((o_response = o_dialog.response_new(200, "OK", o_request))){
        i_ret = o_dialog.get_stack().o_layer_transport.send(null, o_response);
	}

	/* Send Request Cancelled */
    i_ret = o_dialog.send_error(o_dialog.o_last_iInvite, 487, "Request Cancelled", "SIP; cause=487; text=\"Request Cancelled\"");

	/* set last error (or info) */
	o_dialog.set_last_error(487, "Request Cancelled");

	/* alert the user */
	o_dialog.signal_invite(tsip_event_invite_type_e.I_REQUEST, tsip_event_code_e.DIALOG_REQUEST_INCOMING, "Incoming Request", o_request);

	return i_ret;
}

function s0000_Any_2_Any_X_timer100rel(ao_args) {
    var o_dialog = ao_args[0];
	var i_ret;

	if(!o_dialog.o_last_o1xxrel){
		/* silently ignore */
		return 0;
	}

	/* resync timer */
	if((o_dialog.i_timer100Rel <<= 1) >= (o_dialog.get_stack().o_timers.getA() << 6)){
		tsk_utils_log_error("Sending reliable 1xx failed");
		return -2;
	}

	/* resend reliable 1xx */
	if((i_ret = o_dialog.response_send(o_dialog.o_last_o1xxrel))){
		return i_ret;
	}
	else{
		/* schedule timer */
	    o_dialog.timer_schedule('invite', '100Rel');
	}

	return i_ret;
}


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//				== STATE MACHINE END ==
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
