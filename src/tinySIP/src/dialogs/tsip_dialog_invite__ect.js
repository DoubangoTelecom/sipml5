/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
/**
* Explicit Communication Transfer (ECT) using IP Multimedia (IM) Core Network (CN) subsystem (3GPP TS 24.629)
* The Explicit Communication transfer (ECT) service provides a party involved in a communication to transfer that
* communication to a third party.
* This code implements Consultative transfer mode (A.2).
*/

var x0400_Connected_2_Connected_X_fREFER = null;

tsip_dialog_invite.prototype.init_ect = function () {
    this.o_fsm.set(
        /*=======================
        * === Outgoing Transfer === 
        */
        // Connected -> (oREFER) -> oECTing
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_invite_states_e.CONNECTED, tsip_dialog_invite_actions_e.O_ECT, tsip_dialog_invite_states_e.O_ECT_INPROGRESS, x0400_Connected_2_oECTing_X_oECT, "x0400_Connected_2_oECTing_X_oECT"),
        // oECTing -> (i2xx REFER) -> oECTing
        tsk_fsm_entry.prototype.Create(tsip_dialog_invite_states_e.O_ECT_INPROGRESS, tsip_dialog_invite_actions_e.I_2XX, __tsip_dialog_invite_cond_is_resp2refer, tsip_dialog_invite_states_e.O_ECT_INPROGRESS, x0400_oECTing_2_oECTing_X_i2xx, "x0400_oECTing_2_oECTing_X_i2xx"),
        // oECTing -> (i300-699 REFER) -> Connected
        tsk_fsm_entry.prototype.Create(tsip_dialog_invite_states_e.O_ECT_INPROGRESS, tsip_dialog_invite_actions_e.I_300_to_699, __tsip_dialog_invite_cond_is_resp2refer, tsip_dialog_invite_states_e.CONNECTED, x0400_oECTing_2_Connected_X_i3456, "x0400_ECTing_2_Connected_X_i36"),
        // oECTing -> (iNotify 1xx sipfrag) -> oECTing
        tsk_fsm_entry.prototype.Create(tsip_dialog_invite_states_e.O_ECT_INPROGRESS, tsip_dialog_invite_actions_e.I_NOTIFY, __tsip_dialog_invite_cond_is_1xx_notify, tsip_dialog_invite_states_e.O_ECT_INPROGRESS, x0400_oECTing_2_oECTing_X_iNOTIFY, "x0400_oECTing_2_oECTing_X_iNOTIFY"),
        // oECTing -> (iNotify 23456 sipfrag) -> Connected
        tsk_fsm_entry.prototype.Create(tsip_dialog_invite_states_e.O_ECT_INPROGRESS, tsip_dialog_invite_actions_e.I_NOTIFY, __tsip_dialog_invite_cond_is_23456_notify, tsip_dialog_invite_states_e.CONNECTED, x0400_oECTing_2_Connected_X_iNOTIFY, "x0400_oECTing_2_Connected_X_iNOTIFY"),

        /*=======================
        * === Incoming Transfer === 
        */
        // Connected -> (iREFER invalid) -> Connected
        tsk_fsm_entry.prototype.Create(tsip_dialog_invite_states_e.CONNECTED, tsip_dialog_invite_actions_e.I_REFER, __tsip_dialog_invite_cond_is_f_refer, tsip_dialog_invite_states_e.CONNECTED, x0400_Connected_2_Connected_X_fREFER, "x0400_Connected_2_Connected_X_fREFER"),
        // Connected -> (iREFER) -> iECTreq
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_invite_states_e.CONNECTED, tsip_dialog_invite_actions_e.I_REFER, tsip_dialog_invite_states_e.I_ECT_REQUESTED, x0400_Connected_2_iECTreq_X_iREFER, "x0400_Connected_2_iECTreq_X_iREFER"),
        // iECTreq -> (reject) -> Connected
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_invite_states_e.I_ECT_REQUESTED, tsip_dialog_invite_actions_e.I_ECT_REJECT, tsip_dialog_invite_states_e.CONNECTED, x0400_iECTreq_2_Connected_X_reject, "x0400_iECTreq_2_Connected_X_reject"),
        // iECTreq -> (accept) -> iECTing
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_invite_states_e.I_ECT_REQUESTED, tsip_dialog_invite_actions_e.I_ECT_ACCEPT, tsip_dialog_invite_states_e.I_ECT_INPROGRESS, x0400_iECTreq_2_iECTing_X_accept, "x0400_iECTreq_2_iECTing_X_accept"),
        // iECTing -> (1xx lnotify) -> iECTing
        tsk_fsm_entry.prototype.Create(tsip_dialog_invite_states_e.I_ECT_INPROGRESS, tsip_dialog_invite_actions_e.I_ECT_LNOTIFY, __tsip_dialog_invite_cond_is_1xx_f_notify, tsip_dialog_invite_states_e.I_ECT_INPROGRESS, x0400_iECTing_2_iECTing_X_1xxfNOTIFY, "x0400_iECTing_2_iECTing_X_1xxfNOTIFY"),
        // iECTing -> (23456 lnotify) -> Connected
        tsk_fsm_entry.prototype.Create(tsip_dialog_invite_states_e.I_ECT_INPROGRESS, tsip_dialog_invite_actions_e.I_ECT_LNOTIFY, __tsip_dialog_invite_cond_is_23456_f_notify, tsip_dialog_invite_states_e.CONNECTED, x0400_iECTing_2_Connected_X_23456fNOTIFY, "x0400_iECTing_2_Connected_X_23456fNOTIFY")

    );
};

tsip_dialog_invite.prototype.ect_send_notify = function(i_code, s_phrase){
	var o_notify;
	var i_ret = -1;

	if((o_notify = this.request_new("NOTIFY"))){
		var s_sipfrag = tsk_string_format("{0} {1} {2}\r\n", tsip_message.prototype.__s_version_default, i_code, s_phrase);
        o_notify.add_content(s_sipfrag, "message/sipfrag");
		i_ret = this.request_send(o_notify);
		if(i_ret == 0){
            this.signal_invite(tsip_event_invite_type_e.O_ECT_NOTIFY, i_code, s_phrase, o_notify);
		}
	}
	else{
		tsk_utils_log_error("Failed to create request");
	}
	return i_ret;
}

tsip_dialog_invite.prototype.ect_send_refer = function(s_to){
	var i_ret = 0;
	var o_refer;
	var o_toUri;

	if(!s_to){
		tsk_utils_log_error("Invalid parameter");
		return -1;
	}

	if(!(o_toUri = tsip_uri.prototype.Parse(s_to))){
		tsk_utils_log_error("Failed to parse " + s_to);
		return -1;
	}

	if((o_refer = this.request_new("REFER"))){
	    var o_hdr_Referred_By = new tsip_header_Referred_By(this.get_stack().identity.o_uri_impu);
        o_hdr_Referred_By.add_param("cid", tsk_string_random(11));
                
        o_refer.add_headers(
            new tsip_header_Refer_To(o_toUri),
            o_hdr_Referred_By,
            new tsip_header_Refer_Sub(this.supported.b_refer_sub)
        );
		if(this.supported.b_norefsub){
            o_refer.add_headers(new tsip_header_Supported("norefersub"));
		}
        i_ret = this.request_send(o_refer);
	}
	
	return i_ret;
}


//--------------------------------------------------------
//				== STATE MACHINE BEGIN ==
//--------------------------------------------------------

// Connected -> (oREFER) -> oECTing
function x0400_Connected_2_oECTing_X_oECT(ao_args){
	var i_ret;
	var o_dialog = ao_args[0];
    var o_action = ao_args[2];

	i_ret = o_dialog.ect_send_refer(o_action.ect.s_to);
	if(i_ret == 0){
        o_dialog.signal_invite(tsip_event_invite_type_e.O_ECT_TRYING, tsip_event_code_e.DIALOG_REQUEST_SENT, "Call Transfer Initiated", null);
	}
	//else; //Must never happen

	return i_ret;
}

// ECTing -> (i2xx REFER) -> oECTing
function x0400_oECTing_2_oECTing_X_i2xx(ao_args){
	var o_dialog = ao_args[0];
    var o_response = ao_args[1];
	var o_hdr_Refer_Sub;

	
	o_hdr_Refer_Sub = o_response.get_header(tsip_header_type_e.Refer_Sub);
	if(o_hdr_Refer_Sub){
		this.supported.b_refer_sub = o_hdr_Refer_Sub.b_sub;
	}
	if(o_response.is_required("norefersub")){
		this.require.b_norefsub = true;
	}

    o_dialog.signal_invite(tsip_event_invite_type_e.O_ECT_ACCEPTED, o_response.get_response_code(), o_response.get_response_phrase(), o_response);
    return 0;
}

// oECTing -> (i300-699 REFER) -> Connected
function x0400_oECTing_2_Connected_X_i3456(ao_args){
    var o_dialog = ao_args[0];
    var o_response = ao_args[1];

    o_dialog.signal_invite(tsip_event_invite_type_e.O_ECT_FAILED, o_response.get_response_code(), o_response.get_response_phrase(), o_response);
    return 0;
}

// oECTing -> (iNotify 1xx sipfrag) -> oECTing
function x0400_oECTing_2_oECTing_X_iNOTIFY(ao_args){
    var o_dialog = ao_args[0];
    var o_notify = ao_args[1];
    var o_sipfrag;

    if ((o_sipfrag = __tsip_dialog_invite_get_sip_frag_msg(o_notify))) {
        var i_ret = o_dialog.send_response(o_notify, 200, "OK", false);
        o_dialog.signal_invite(tsip_event_invite_type_e.O_ECT_NOTIFY, o_sipfrag.get_response_code(), o_sipfrag.get_response_phrase(), o_sipfrag);
        return i_ret;
    }
    return 0;
}

// oECTing -> (iNotify 23456 sipfrag) -> Connected
var x0400_oECTing_2_Connected_X_iNOTIFY = x0400_oECTing_2_oECTing_X_iNOTIFY;


// Connected -> (iREFER) -> iECTreq
function x0400_Connected_2_iECTreq_X_iREFER(ao_args){
    var o_dialog = ao_args[0];
    o_dialog.o_last_iRefer = ao_args[1];

    o_dialog.send_response(o_dialog.o_last_iRefer, 100, "Asking for Transfer", false);
    o_dialog.signal_invite(tsip_event_invite_type_e.I_ECT_REQUESTED, tsip_event_code_e.DIALOG_REQUEST_INCOMING, "Incoming Request", o_dialog.o_last_iRefer);
    return 0;
}

// iECTreq -> (reject) -> Connected
function x0400_iECTreq_2_Connected_X_reject(ao_args){
    var o_dialog = ao_args[0];
    var o_action = ao_args[2];


    /* Send Reject */
    var i_code = o_action.line_resp.i_code >= 300 ? o_action.line_resp.i_code : 603;
    var s_phrase = o_action.line_resp.s_phrase ? o_action.line_resp.s_phrase : "Decline";
    var s_reason = tsk_string_format("SIP; cause={0}; text=\"{1}\"", i_code, s_phrase);
    return o_dialog.send_error(o_dialog.o_last_iRefer, i_code, s_phrase, s_reason);
}

// iECTreq -> (accept) -> iECTing
function x0400_iECTreq_2_iECTing_X_accept(ao_args) {
    var i_ret;
    var o_dialog = ao_args[0];
    var o_action = ao_args[2];

    i_ret = o_dialog.send_response(o_dialog.o_last_iRefer, 202, "Transfering...", false);
    var o_hdr_Refer_To = o_dialog.o_last_iRefer.get_header(tsip_header_type_e.Refer_To); // Not null: already checked
    // Make call to the referToUri
    this.o_ss_transf = new tsip_session_invite(o_dialog.get_stack(),
                                tsip_session.prototype.SetToStr(o_hdr_Refer_To.o_uri.tostring(false, false)),
                                tsip_session.prototype.SetCaps("+sip.ice")
                            );
    this.o_ss_transf.media.e_type = o_dialog.get_session().media.e_type;
    this.o_ss_transf.i_id_parent = o_dialog.get_session().get_id();

    tsip_event.prototype.Signal(tsip_event_invite_type_e.I_ECT_NEW_CALL, this.o_ss_transf, tsip_event_code_e.DIALOG_REQUEST_OUTGOING, "ECTing", o_dialog.o_last_iRefer);
    return this.o_ss_transf.call(this.o_ss_transf.media.e_type);
}


// iECTing -> (1xx lnotify) -> iECTing
function x0400_iECTing_2_iECTing_X_1xxfNOTIFY(ao_args){
    var o_dialog = ao_args[0];
    var o_response = ao_args[1];

    return o_dialog.ect_send_notify(o_response.get_response_code(), o_response.get_response_phrase());
}

// iECTing -> (23456 lnotify) -> Connected
function x0400_iECTing_2_Connected_X_23456fNOTIFY(ao_args) {
    var o_dialog = ao_args[0];
    var o_response = ao_args[1];
    var i_code = o_response.get_response_code();

    o_dialog.ect_send_notify(i_code, o_response.get_response_phrase());
    if (i_code >= 200 && i_code <= 299) {
        o_dialog.signal_invite(tsip_event_invite_type_e.I_ECT_COMPLETED, o_response.get_response_code(), o_response.get_response_phrase(), o_dialog.o_last_iRefer);
        return o_dialog.send_bye();
    }
    else {
        o_dialog.signal_invite(tsip_event_invite_type_e.I_ECT_FAILED, o_response.get_response_code(), o_response.get_response_phrase(), o_dialog.o_last_iRefer);
        return 0;
    }
}


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//				== STATE MACHINE END ==
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function __tsip_dialog_invite_get_sip_frag_respcode(o_notify) {
    var o_sipfrag = __tsip_dialog_invite_get_sip_frag_msg(o_notify);
    return o_sipfrag ? o_sipfrag.get_response_code() : 0;
}

// returns 'tsip_response_t' contained in the NOTIFY body
function __tsip_dialog_invite_get_sip_frag_msg(o_notify){
    if(!o_notify){
        tsk_utils_log_error('Invalid parameter');
        return null;
    }
	var o_sipfrag;
    if(o_notify.has_content() && tsk_string_iequals(o_notify.get_content_type(), "message/sipfrag")){
		// sipfrag is a "tsip_message_t" with an extra \r\n
        var s_content = o_notify.get_content_as_string();
        if (s_content) {
            if (s_content.lastIndexOf('\r\n') != (s_content.length - 2)) {//Hack for XXX buggy client
                s_content += "\r\n";
            }
            s_content += "\r\n";

            var o_ragel_state = tsk_ragel_state_create();
            tsk_ragel_state_init_str(o_ragel_state, s_content);
            o_sipfrag = tsip_message.prototype.Parse(o_ragel_state, false);
            if (o_sipfrag && !o_sipfrag.is_response()) {
                tsk_utils_log_error("SipFrag doesn't contain response");
                return null;
            }
        }
	}
    return o_sipfrag;
}
