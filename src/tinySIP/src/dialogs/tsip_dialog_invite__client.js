/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
tsip_dialog_invite.prototype.init_client = function(){
    this.o_fsm.set(
			/*=======================
			* === Started === 
			*/
			// Started -> (send INVITE) -> Outgoing
			tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_invite_states_e.STARTED, tsip_dialog_invite_actions_e.O_INVITE, tsip_dialog_invite_states_e.OUTGOING, c0000_Started_2_Outgoing_X_oINVITE, "c0000_Started_2_Outgoing_X_oINVITE"),
			
			/*=======================
			* === Outgoing === 
			*/
			// Outgoing -> (i2xx INVITE) -> Connected
			tsk_fsm_entry.prototype.Create(tsip_dialog_invite_states_e.OUTGOING, tsip_dialog_invite_actions_e.I_2XX, __tsip_dialog_invite_cond_is_resp2invite, tsip_dialog_invite_states_e.CONNECTED, c0000_Outgoing_2_Connected_X_i2xxINVITE, "c0000_Outgoing_2_Connected_X_i2xxINVITE"),
			// Outgoing -> (iINVITE ) -> Outgoing
			tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_invite_states_e.OUTGOING, tsip_dialog_invite_actions_e.I_INVITE, tsip_dialog_invite_states_e.OUTGOING, c0000_Outgoing_2_Outgoing_X_iINVITEorUPDATE, "c0000_Outgoing_2_Outgoing_X_iINVITEorUPDATE"),
			// Outgoing -> (iUPDATE) -> Outgoing
			tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_invite_states_e.OUTGOING, tsip_dialog_invite_actions_e.I_UPDATE, tsip_dialog_invite_states_e.OUTGOING, c0000_Outgoing_2_Outgoing_X_iINVITEorUPDATE, "c0000_Outgoing_2_Outgoing_X_iINVITEorUPDATE"),
			// Outgoing -> (oCANCEL) -> Cancelling
			tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_invite_states_e.OUTGOING, tsip_dialog_invite_actions_e.O_CANCEL, tsip_dialog_invite_states_e.CANCELLING, c0000_Outgoing_2_Cancelling_X_oCANCEL, "c0000_Outgoing_2_Cancelling_X_oCANCEL"),
			// Cancelling -> (any response to cancel CANCEL) -> Cancelling
			tsk_fsm_entry.prototype.Create(tsip_dialog_invite_states_e.CANCELLING, tsip_dialog_invite_actions_e.I_300_to_699, __tsip_dialog_invite_cond_is_resp2cancel, tsip_dialog_invite_states_e.TERMINATED, null, "c0000_Cancelling_2_Terminated_X_i300_to_699"),
			tsk_fsm_entry.prototype.Create(tsip_dialog_invite_states_e.CANCELLING, tsip_dialog_invite_actions_e.I_2XX, __tsip_dialog_invite_cond_is_resp2cancel, tsip_dialog_invite_states_e.CANCELLING, null, "c0000_Cancelling_2_Cancelling_X_i2xx"),			
			// Cancelling -> (i300-699 INVITE) -> Terminated
			tsk_fsm_entry.prototype.Create(tsip_dialog_invite_states_e.CANCELLING, tsip_dialog_invite_actions_e.I_300_to_699, __tsip_dialog_invite_cond_is_resp2invite, tsip_dialog_invite_states_e.TERMINATED, c0000_Cancelling_2_Terminated_X_i300_to_699, "c0000_Cancelling_2_Terminated_X_i300_to_699"),
			// Outgoing -> (300-699 INVITE) -> Terminated
			tsk_fsm_entry.prototype.Create(tsip_dialog_invite_states_e.OUTGOING, tsip_dialog_invite_actions_e.I_300_to_699, __tsip_dialog_invite_cond_is_resp2invite, tsip_dialog_invite_states_e.TERMINATED, c0000_Outgoing_2_Terminated_X_i300_to_i699INVITE, "c0000_Outgoing_2_Terminated_X_i300_to_i699INVITE")

    );
}


//--------------------------------------------------------
//				== STATE MACHINE BEGIN ==
//--------------------------------------------------------

function c0000_Started_2_Outgoing_X_oINVITE(ao_args){
    var i_ret;
	var o_dialog = ao_args[0];
    var o_action = ao_args[2];
	
	/* This is the first FSM transaction when you try to make an audio/video/msrp call */
	if(!o_dialog.o_msession_mgr){
	    o_dialog.o_msession_mgr = o_dialog.new_msession_mgr(o_action ? o_action.media.e_type : tmedia_type_e.AUDIO_VIDEO, o_dialog.get_stack().network.s_local_ip, false/* ipv6 */, true);
	}

	/* We are the client */
	o_dialog.b_is_client = true;
	/* Whether it's a client dialog for call transfer */
	o_dialog.b_is_transf = (o_dialog.get_session().i_id_parent != tsip_session.prototype.__i_session_id_invalid);

	/* Update current action */
    o_dialog.set_action_curr(o_action);

	/* Get Media type from the action */
	o_dialog.get_session().media.e_type = o_action.media.e_type;
	/* Appy media params received from the user */
	if(o_action.media.ao_params.length > 0){
        tsk_utils_log_error("Not implemented");
        return -1;
		// tmedia_session_mgr_set_3(o_dialog.msession_mgr, action->media.params);
	}

	/*  RFC 4028 - 7.1. Generating an Initial Session Refresh Request

		A UAC MAY include a Session-Expires header field in an initial
		session refresh request if it wants a session timer applied to the
		session.  The value of this header field indicates the session
		interval desired by the UAC.  If a Min-SE header is included in the
		initial session refresh request, the value of the Session-Expires
		MUST be greater than or equal to the value in Min-SE.

		The UAC MAY include the refresher parameter with value 'uac' if it
		wants to perform the refreshes.  However, it is RECOMMENDED that the
		parameter be omitted so that it can be selected by the negotiation
		mechanisms described below.
	*/
	if(o_dialog.get_session().media.timers.i_timeout){
		o_dialog.stimers.i_timeout = o_dialog.get_session().media.timers.i_timeout;
		o_dialog.stimers.s_refresher = o_dialog.get_session().media.timers.s_refresher;
		o_dialog.stimers.is_refresher = tsk_stri,g_iequals(o_dialog.stimers.s_refresher, "uac");
		o_dialog.supported.b_timer = true;
	}

	/* send the request */
	i_ret = o_dialog.send_invite(false);

	// alert the user
	o_dialog.signal(tsip_event_code_e.DIALOG_CONNECTING, "Call in progress...");

	return i_ret;
}

function c0000_Outgoing_2_Outgoing_X_iINVITEorUPDATE(ao_args){
    tsk_utils_log_error("Not implemented");
    return 0;
}

function c0000_Outgoing_2_Connected_X_i2xxINVITE(ao_args) {
    var o_dialog = ao_args[0];
    var o_r2xx = ao_args[1];
    var i_ret = 0;

    /* Update the dialog state */
    if ((i_ret = o_dialog.update_with_response(o_r2xx))) {
        return ret;
    }

    /* Process remote offer */
    var b_is_offer = o_dialog.o_msession_mgr && !o_dialog.o_msession_mgr.has_lo();
    if ((i_ret = o_dialog.process_ro(o_r2xx, b_is_offer))) {
        return i_ret;
    }
    else {
        /* send ACK */
        i_ret = o_dialog.send_ack(o_r2xx);
    }

    /* Determine whether the remote party support UPDATE */
    o_dialog.b_support_update = o_r2xx.is_allowed("UPDATE");

    /* Session Timers */
    if (o_dialog.stimers.i_timeout) {
        o_dialog.stimers_handle(o_r2xx);
    }

    // alert user
    o_dialog.signal_invite(tsip_event_invite_type_e.M_EARLY_MEDIA, o_r2xx.get_response_code(), o_r2xx.get_response_phrase(), o_r2xx);
    o_dialog.signal(tsip_event_code_e.DIALOG_CONNECTED, "In Call");

    if (o_dialog.b_is_transf) {
        i_ret = o_dialog.notify_parent(o_r2xx);
        o_dialog.b_is_transf = false; //final response -> no longer need to notify the parent
    }

    return i_ret;
}

function c0000_Outgoing_2_Terminated_X_i300_to_i699INVITE(ao_args) {
    var o_dialog = ao_args[0];
    var o_response = ao_args[1];
    var i_ret = 0;

    // save last error
    o_dialog.set_last_error(o_response.get_response_code(), o_response.get_response_phrase(), o_response);

    // alert user
    i_ret = o_dialog.signal_invite(tsip_event_invite_type_e.I_AO_REQUEST, o_response.get_response_code(), o_response.get_response_phrase(), o_response);

    if (o_dialog.b_is_transf) {
        i_ret = o_dialog.notify_parent(o_response);
        o_dialog.b_is_transf = false; // final response -> no longer need to notify the parent
    }

    return i_ret;
}

function c0000_Outgoing_2_Cancelling_X_oCANCEL(ao_args) {
    var o_dialog = ao_args[0];

    // close PeerConnection
    if (o_dialog.o_msession_mgr) {
        i_ret = o_dialog.o_msession_mgr.stop();
    }

	/* Alert the user */
    o_dialog.signal(tsip_event_code_e.DIALOG_TERMINATING, "Call terminating...");

    return o_dialog.send_cancel();
}

/* 487 INVITE (To have more chances, any 300-699) */
function c0000_Cancelling_2_Terminated_X_i300_to_699(ao_args){
    var o_dialog = ao_args[0];
    var o_response = ao_args[1];

    /* set last error (or info) */
    o_dialog.set_last_error(o_response.get_response_code(), o_response.get_response_phrase(), o_response);

	return 0;
}
