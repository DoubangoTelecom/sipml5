/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
/*
* Communication Hold (3GPP TS 24.610)
* The Communication Hold supplementary service enables a user to suspend the reception of media stream(s) of an established IP multimedia session, 
* and resume the media stream(s) at a later time.
*/

tsip_dialog_invite.prototype.init_hold = function(){
    this.o_fsm.set(
        /*=======================
		* === Hold === 
		*/
		// Connected -> (send HOLD) -> Holding 
		tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_invite_states_e.CONNECTED, tsip_dialog_invite_actions_e.O_HOLD, tsip_dialog_invite_states_e.HOLDING, x0100_Connected_2_Holding_X_oHold, "x0100_Connected_2_Holding_X_oHold"),
		// Holding -> (i2xx) -> Connected
		tsk_fsm_entry.prototype.Create(tsip_dialog_invite_states_e.HOLDING, tsip_dialog_invite_actions_e.I_2XX, __tsip_dialog_invite_cond_is_resp2invite_or_update, tsip_dialog_invite_states_e.CONNECTED, x0101_Holding_2_Connected_X_ixxx, "x0101_Holding_2_Connected_X_ixxx"),
		// Holding -> (i300-699) -> Connected
		tsk_fsm_entry.prototype.Create(tsip_dialog_invite_states_e.HOLDING, tsip_dialog_invite_actions_e.I_300_to_699, __tsip_dialog_invite_cond_is_resp2invite_or_update, tsip_dialog_invite_states_e.CONNECTED, x0101_Holding_2_Connected_X_ixxx, "x0101_Holding_2_Connected_X_ixxx"),

		/*=======================
		* === Resume === 
		*/
		// Connected -> (send RESUME) -> Resuming
		tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_invite_states_e.CONNECTED, tsip_dialog_invite_actions_e.O_RESUME, tsip_dialog_invite_states_e.RESUMING, x0102_Connected_2_Resuming_X_oResume, "x0102_Connected_2_Resuming_X_oResume"),
		// Resuming -> (i2xx) -> Connected
		tsk_fsm_entry.prototype.Create(tsip_dialog_invite_states_e.RESUMING, tsip_dialog_invite_actions_e.I_2XX, __tsip_dialog_invite_cond_is_resp2invite_or_update, tsip_dialog_invite_states_e.CONNECTED, x0103_Resuming_2_Connected_X_ixxx, "x0103_Resuming_2_Connected_X_ixxx"),
		// Resuming -> (i300-699) -> Connected
		tsk_fsm_entry.prototype.Create(tsip_dialog_invite_states_e.RESUMING, tsip_dialog_invite_actions_e.I_300_to_699, __tsip_dialog_invite_cond_is_resp2invite_or_update, tsip_dialog_invite_states_e.CONNECTED, x0103_Resuming_2_Connected_X_ixxx, "x0103_Resuming_2_Connected_X_ixxx")

    );

}

/* handle requests/responses (MUST be called after set_ro()) */
tsip_dialog_invite.prototype.hold_handle = function(o_request){
    if (!o_request || !this.o_msession_mgr || (!o_request.is_invite() && !o_request.is_update())) {
		tsk_utils_log_error("Invalid parameter");
		return -1;
	}

    var b_remote_hold;
    var b_bodiless_invite;
	var i_ret = 0;

	b_remote_hold = this.o_msession_mgr.is_held(this.o_msession_mgr.e_type, false);

	// resume the call if we receive bodiless INVITE
	b_bodiless_invite = !o_request.has_content() && o_request.is_invite();
	if(b_bodiless_invite && b_remote_hold){
		// resume remote
		if((i_ret = this.o_msession_mgr.resume(this.o_msession_mgr.e_type, false)) == 0){
			b_remote_hold = false;
		}
	}

	if(i_ret == 0 && (b_remote_hold != this.hold.b_remote)){
		this.hold.b_remote = b_remote_hold;
		this.signal_invite(this.hold.b_remote ? tsip_event_invite_type_e.M_REMOTE_HOLD : tsip_event_invite_type_e.M_REMOTE_RESUME, 
                tsip_event_invite_type_e.DIALOG_REQUEST_INCOMING, "Hold/Resume state changed", o_request);
	}

	return i_ret;
}

//--------------------------------------------------------
//				== STATE MACHINE BEGIN ==
//--------------------------------------------------------

// Connected -> (send HOLD) -> Holding
function x0100_Connected_2_Holding_X_oHold(ao_args){
	var i_ret;
	var o_dialog = ao_args[0];
    var o_action = ao_args[2];

	if(!o_dialog.o_msession_mgr){
		tsk_utils_log_warn("Media Session manager is Null");
		return 0;
	}

	/* put on hold */
    i_ret = o_dialog.o_msession_mgr.hold(o_action.media.e_type);

	/* Update current action */
    o_dialog.set_action_curr(o_action);

	/* send the request */
	if((iret = o_dialog.send_invite(false))){
		// signal error without breaking the state machine
	}

	return 0;
}

// Holding -> (ixxx) -> Connected
function x0101_Holding_2_Connected_X_ixxx(ao_args){
	var i_ret;
	var o_dialog = ao_args[0];
    var o_response = ao_args[1];

	/* reset current action */
	o_dialog.set_action_curr(null);

	/* Process remote offer */
	if((i_ret = o_dialog.process_ro(o_response))){
		return i_ret;
	}
	else if(o_response.is_response_to_invite()){
		i_ret = o_dialog.send_ack(o_response);
	}

	/* alert the user */
	if(o_response.is_2xx()){
        o_dialog.signal_invite(tsip_event_invite_type_e.M_LOCAL_HOLD_OK, o_response.get_response_code(), o_response.get_response_phrase(), o_response);
        o_dialog.hold.b_local = true;
	}
	else{
        o_dialog.signal_invite(tsip_event_invite_type_e.M_LOCAL_HOLD_NOK, o_response.get_response_code(), o_response.get_response_phrase(), o_response);
        o_dialog.hold.b_local = false;
	}
	
	return i_ret;
}

// Connected -> (send RESUME) -> Resuming
function x0102_Connected_2_Resuming_X_oResume(ao_args){
	var i_ret;
	var o_dialog = ao_args[0];
    var o_action = ao_args[2];

    if(!o_dialog.hold.b_local){
        tsk_utils_log_warn("Not on hold state");
		return 0;
    }

	if(!o_dialog.o_msession_mgr){
		tsk_utils_log_warn("Media Session manager is Null");
		return 0;
	}

	/* Resume both */
	i_ret = o_dialog.o_msession_mgr.resume(o_action.media.e_type, true);
	i_ret = o_dialog.o_msession_mgr.resume(o_action.media.e_type, false);

	/* update current action */
    o_dialog.set_action_curr(o_action);

	/* send the request */
	if((i_ret = o_dialog.send_invite(false))){
		// signal error without breaking the state machine
	}

	return 0;
}

// Resuming -> (ixxx) -> Connected
function x0103_Resuming_2_Connected_X_ixxx(ao_args){
	var i_ret;
	var o_dialog = ao_args[0];
    var o_response = ao_args[1];

	/* reset current action */
	o_dialog.set_action_curr(null);

	/* Process remote offer */
	if((i_ret = o_dialog.process_ro(o_response))){
		return i_ret;
	}
	else if(o_response.is_response_to_invite()){
		i_ret = o_dialog.send_ack(o_response);
	}

	/* alert the user */
    if(o_response.is_2xx()){
        o_dialog.signal_invite(tsip_event_invite_type_e.M_LOCAL_RESUME_OK, o_response.get_response_code(), o_response.get_response_phrase(), o_response);
        o_dialog.hold.b_local = false;
	}
	else{
        o_dialog.signal_invite(tsip_event_invite_type_e.M_LOCAL_RESUME_NOK, o_response.get_response_code(), o_response.get_response_phrase(), o_response);
        o_dialog.hold.b_local = true;
	}
	
	return i_ret;
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//				== STATE MACHINE END ==
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
