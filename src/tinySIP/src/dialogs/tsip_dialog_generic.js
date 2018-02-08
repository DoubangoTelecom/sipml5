/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
/* MESSAGE, OPTIONS, INFO, PUBLISH, SUBSCRIBE */

// SIP dialog SUBSCRIBE (Client side) as per RFC 3265
// SIP dialog OPTIONS as per RFC 3261 section 11
// SIP dialog PUBLISH as per RFC 3903
// SIP dialog MESSAGE as per RFC 3428
// SIP dialog INFO as per RFC 6086

tsip_dialog_generic.prototype = Object.create(tsip_dialog.prototype);
tsip_dialog_generic.prototype.__b_debug_state_machine = true;

var tsip_dialog_generic_actions_e =
{
    ACCEPT: tsip_action_type_e.ACCEPT,
    REJECT: tsip_action_type_e.REJECT,
    HANGUP: tsip_action_type_e.HANGUP,
    CANCEL: tsip_action_type_e.CANCEL,
    SHUTDOWN: tsip_action_type_e.SHUTDOWN,

    O_SUBSCRIBE: tsip_action_type_e.SUBSCRIBE,
    O_OPTIONS: tsip_action_type_e.OPTIONS,
    O_MESSAGE: tsip_action_type_e.MESSAGE,
    O_INFO: tsip_action_type_e.INFO,
    O_PUBLISH: tsip_action_type_e.PUBLISH,
    O_UNPUBLISH: tsip_action_type_e.UNPUBLISH,

    I_SUBSCRIBE: 10000,
    I_MESSAGE: 10001,
    I_OPTIONS: 10002,
    I_INFO: 10003,
    I_PUBLISH: 10004,
    I_NOTIFY: 10005,

    I_1XX: 50000,
    I_2XX: 50001,
    I_401_407_421_494: 50002,
    I_423: 50003,
    I_300_to_699: 50004,

    SHUTDOWN_TIMEDOUT: 60000,
    TRANSPORT_ERROR: 60002,
    ERROR: 60003	
};

var tsip_dialog_generic_states_e =
{
    STARTED: 0,
    INPROGRESS: 1, // outgoing(client)
    INCOMING: 2, // incoming (server)
    CONNECTED: 3,
    TERMINATED: 4
};

function tsip_dialog_generic(e_type, o_session, s_call_id) {
    tsip_dialog.call(this);

    this.b_disconnecting = false;
    this.o_last_iMessage = null;

    this.o_timerRefresh = null;
    this.o_timerShutdown = null;
    this.i_timerShutdown = (tsip_dialog.prototype.__i_timer_shutdown << 1) / 3;

    this.init(e_type, s_call_id, o_session, tsip_dialog_generic_states_e.STARTED, tsip_dialog_generic_states_e.TERMINATED);
    this.set_callback(__tsip_dialog_generic_event_callback);
    this.o_fsm.set_debug_enabled(tsip_dialog_generic.prototype.__b_debug_state_machine);
    this.o_fsm.set_onterm_callback(__tsip_dialog_generic_onterm, this);


    // initialize state machines
    this.init_message(); // MESSAGE Dialog
    this.init_publish(); // PUBLISH Dialog
    this.init_subscribe(); // SUBSCRIBE DIALOG
    this.o_fsm.set(
        /*=======================
        * === Started === 
        */
        // Up to each dialog (MESSAGE, PUBLISH, SUBSCRIBE...)


        /*=======================
        * === InProgress === 
        */
        // InProgress -> (1xx) -> InProgress
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_generic_states_e.INPROGRESS, tsip_dialog_generic_actions_e.I_1XX, tsip_dialog_generic_states_e.INPROGRESS, tsip_dialog_generic_InProgress_2_InProgress_X_1xx, "tsip_dialog_generic_InProgress_2_InProgress_X_1xx"),
        
        // InProgress -> (2xx dialogless) -> Terminated
        tsk_fsm_entry.prototype.Create(tsip_dialog_generic_states_e.INPROGRESS, tsip_dialog_generic_actions_e.I_2XX, __tsip_dialog_generic_cond_is_dialogless, tsip_dialog_generic_states_e.TERMINATED, tsip_dialog_generic_InProgress_2_Terminated_X_2xx, "tsip_dialog_generic_InProgress_2_Terminated_X_2xx"),
        // InProgress -> (2xx disconnecting) -> Terminated
        tsk_fsm_entry.prototype.Create(tsip_dialog_generic_states_e.INPROGRESS, tsip_dialog_generic_actions_e.I_2XX, __tsip_dialog_generic_cond_is_disconnecting, tsip_dialog_generic_states_e.TERMINATED, tsip_dialog_generic_InProgress_2_Terminated_X_2xx, "tsip_dialog_generic_InProgress_2_Terminated_X_2xx"),
        // InProgress -> (2xx dialogfull and connecting) -> Connected
        tsk_fsm_entry.prototype.Create(tsip_dialog_generic_states_e.INPROGRESS, tsip_dialog_generic_actions_e.I_2XX, __tsip_dialog_generic_cond_is_dialogfull, tsip_dialog_generic_states_e.CONNECTED, tsip_dialog_generic_InProgress_2_Connected_X_2xx, "tsip_dialog_generic_InProgress_2_Connected_X_2xx"),
        // InProgress -> (401/407/421/494) -> InProgress
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_generic_states_e.INPROGRESS, tsip_dialog_generic_actions_e.I_401_407_421_494, tsip_dialog_generic_states_e.INPROGRESS, tsip_dialog_generic_InProgress_2_InProgress_X_401_407_421_494, "tsip_dialog_generic_InProgress_2_InProgress_X_401_407_421_494"),
        // InProgress -> (300_to_699) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_generic_states_e.INPROGRESS, tsip_dialog_generic_actions_e.I_300_to_699, tsip_dialog_generic_states_e.TERMINATED, tsip_dialog_generic_InProgress_2_Terminated_X_300_to_699, "tsip_dialog_generic_InProgress_2_Terminated_X_300_to_699"),
        // InProgress -> (cancel) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_generic_states_e.INPROGRESS, tsip_dialog_generic_actions_e.CANCEL, tsip_dialog_generic_states_e.TERMINATED, tsip_dialog_generic_InProgress_2_Terminated_X_cancel, "tsip_dialog_generic_InProgress_2_Terminated_X_cancel"),
        // InProgress -> (shutdown) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_generic_states_e.INPROGRESS, tsip_dialog_generic_actions_e.SHUTDOWN, tsip_dialog_generic_states_e.TERMINATED, null, "tsip_dialog_generic_InProgress_2_Terminated_X_shutdown"),
        // InProgress -> (Any) -> InProgress
        // tsk_fsm_entry.prototype.CreateAlwaysNothing(tsip_dialog_generic_states_e.INPROGRESS, "tsip_dialog_generic_InProgress_2_InProgress_X_any"),

        /*=======================
        * === Incoming === 
        */
        // Incoming -> (accept) -> Terminated
        tsk_fsm_entry.prototype.Create(tsip_dialog_generic_states_e.INCOMING, tsip_dialog_generic_actions_e.ACCEPT, __tsip_dialog_generic_cond_is_dialogless, tsip_dialog_generic_states_e.TERMINATED, tsip_dialog_generic_Incoming_2_Terminated_X_accept, "tsip_dialog_generic_Incoming_2_Terminated_X_accept"),
        // Incoming -> (accept) -> Connected
        tsk_fsm_entry.prototype.Create(tsip_dialog_generic_states_e.INCOMING, tsip_dialog_generic_actions_e.ACCEPT, __tsip_dialog_generic_cond_is_dialogfull, tsip_dialog_generic_states_e.CONNECTED, tsip_dialog_generic_Incoming_2_Connected_X_accept, "tsip_dialog_generic_Incoming_2_Connected_X_accept"),
        // Incoming -> (rejected) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_generic_states_e.INCOMING, tsip_dialog_generic_actions_e.REJECT, tsip_dialog_generic_states_e.TERMINATED, tsip_dialog_generic_Incoming_2_Terminated_X_reject, "tsip_dialog_generic_Incoming_2_Terminated_X_reject"),
        // Incoming -> (Any) -> Incoming
        tsk_fsm_entry.prototype.CreateAlwaysNothing(tsip_dialog_generic_states_e.INCOMING, "tsip_dialog_generic_Incoming_2_Incoming_X_any"),

        /*=======================
        * === Any === 
        */
        // Any -> (hangup) -> InProgress
		tsk_fsm_entry.prototype.Create(tsk_fsm.prototype.__i_state_any, tsip_dialog_generic_actions_e.HANGUP, __tsip_dialog_generic_cond_not_silent_hangup, tsip_dialog_generic_states_e.INPROGRESS, __tsip_dialog_generic_Any_2_InProgress_X_hangup, "tsip_dialog_generic_Any_2_InProgress_X_hangup"),
        // Any -> (silenthangup) -> Terminated
		tsk_fsm_entry.prototype.Create(tsk_fsm.prototype.__i_state_any, tsip_dialog_generic_actions_e.HANGUP, __tsip_dialog_generic_cond_silent_hangup, tsip_dialog_generic_states_e.TERMINATED, null, "tsip_dialog_generic_Any_2_InProgress_X_silenthangup"),
        // Any -> (shutdown) -> InProgress
		tsk_fsm_entry.prototype.Create(tsk_fsm.prototype.__i_state_any, tsip_dialog_generic_actions_e.SHUTDOWN, __tsip_dialog_generic_cond_not_silent_shutdown, tsip_dialog_generic_states_e.INPROGRESS, __tsip_dialog_generic_Any_2_InProgress_X_shutdown, "tsip_dialog_generic_Any_2_InProgress_X_shutdown"),
		// Any -> (silentshutdown) -> Terminated
		tsk_fsm_entry.prototype.Create(tsk_fsm.prototype.__i_state_any, tsip_dialog_generic_actions_e.SHUTDOWN, __tsip_dialog_generic_cond_silent_shutdown, tsip_dialog_generic_states_e.TERMINATED, null, "tsip_dialog_generic_Any_2_InProgress_X_silentshutdown"),
		// Any -> (shutdown timedout) -> Terminated
		tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_generic_actions_e.SHUTDOWN_TIMEDOUT, tsip_dialog_generic_states_e.TERMINATED, null, "tsip_dialog_generic_shutdown_timedout"),
        // Any -> (transport error) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_generic_actions_e.TRANSPORT_ERROR, tsip_dialog_generic_states_e.TERMINATED, tsip_dialog_generic_Any_2_Terminated_X_transportError, "tsip_dialog_generic_Any_2_Terminated_X_transportError"),
        // Any -> (error) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_generic_actions_e.ERROR, tsip_dialog_generic_states_e.TERMINATED, tsip_dialog_generic_Any_2_Terminated_X_Error, "tsip_dialog_generic_Any_2_Terminated_X_Error")

    );
}

tsip_dialog_generic.prototype.signal_ao = function (i_code, s_phrase, o_response) {
    var o_event;
    switch (this.e_type) {
        case tsip_dialog_type_e.MESSAGE:
            {
                var o_event = new tsip_event_message(this.get_session(), i_code, s_phrase, o_response, tsip_event_message_type_e.AO_MESSAGE);
                return o_event.signal();
            }
        case tsip_dialog_type_e.PUBLISH:
            {
                var o_event = new tsip_event_publish(this.get_session(), i_code, s_phrase, o_response, tsip_event_publish_type_e.AO_PUBLISH);
                return o_event.signal();
            }
        case tsip_dialog_type_e.SUBSCRIBE:
            {
                var o_event = new tsip_event_subscribe(this.get_session(), i_code, s_phrase, o_response, tsip_event_subscribe_type_e.AO_SUBSCRIBE);
                return o_event.signal();
            }
    }

    tsk_utils_log_error("not implemented");
    return -1;
}

tsip_dialog_generic.prototype.signal_i = function (i_code, s_phrase, o_request) {
    var o_event;
    switch (this.e_type) {
        case tsip_dialog_type_e.MESSAGE:
            {
                if (o_request.is_message()) {
                    var o_event = new tsip_event_message(this.get_session(), i_code, s_phrase, o_request, tsip_event_message_type_e.I_MESSAGE);
                    return o_event.signal();
                }
                break;
            }
        case tsip_dialog_type_e.SUBSCRIBE:
            {
                if (o_request.is_notify()) {
                    var o_event = new tsip_event_subscribe(this.get_session(), i_code, s_phrase, o_request, tsip_event_subscribe_type_e.I_NOTIFY);
                    return o_event.signal();
                }
                break;
            }
    }

    tsk_utils_log_error("not implemented");
    return -1;
}

function __tsip_dialog_generic_timer_callback(o_self, o_timer) {
    var i_ret = -1;
    if (o_self) {
        if (o_self.o_timerRefresh == o_timer) {
            switch (o_self.e_type) {
                case tsip_dialog_type_e.PUBLISH: i_ret = o_self.fsm_act(tsip_dialog_generic_actions_e.O_PUBLISH, null, null); break;
                case tsip_dialog_type_e.SUBSCRIBE: i_ret = o_self.fsm_act(tsip_dialog_generic_actions_e.O_SUBSCRIBE, null, null); break; 
            }
        }
        else if (o_self.o_timerShutdown == o_timer) {
            i_ret = o_self.fsm_act(tsip_dialog_generic_actions_e.SHUTDOWN, null, null);
        }
    }
    return i_ret;
}

function __tsip_dialog_generic_event_callback(o_self, e_type, o_message) {
    var i_ret = -1;

    switch (e_type) {
        case tsip_dialog_event_type_e.I_MSG:
            {
                if (o_message) {
                    if (o_message.is_response()) { //	RESPONSE
                        if (o_message.is_1xx()) {
                            i_ret = o_self.fsm_act(tsip_dialog_generic_actions_e.I_1XX, o_message, null);
                        }
                        else if (o_message.is_2xx()) {
                            i_ret = o_self.fsm_act(tsip_dialog_generic_actions_e.I_2XX, o_message, null);
                        }
                        else if (o_message.is_response_xxx(401) || o_message.is_response_xxx(407) || o_message.is_response_xxx(421) || o_message.is_response_xxx(494)) {
                            i_ret = o_self.fsm_act(tsip_dialog_generic_actions_e.I_401_407_421_494, o_message, null);
                        }
                        else if (o_message.is_response_xxx(423)) {
                            i_ret = o_self.fsm_act(tsip_dialog_generic_actions_e.I_423, o_message, null);
                        }
                        else if (o_message.is_3456()) {
                            i_ret = o_self.fsm_act(tsip_dialog_generic_actions_e.I_300_to_699, o_message, null);
                        }
                        else {
                            i_ret = o_self.fsm_act(tsip_dialog_generic_actions_e.ERROR, o_message, null);
                        }
                    }
                    else { //	REQUEST
                        if (o_message.is_message()) {
                            i_ret = o_self.fsm_act(tsip_dialog_generic_actions_e.I_MESSAGE, o_message, null);
                        }
                        else if (o_message.is_options()) {
                            i_ret = o_self.fsm_act(tsip_dialog_generic_actions_e.I_OPTIONS, o_message, null);
                        }
                        else if (o_message.is_notify()) {
                            i_ret = o_self.fsm_act(tsip_dialog_generic_actions_e.I_NOTIFY, o_message, null);
                        }
                        else if (o_message.is_subscribe()) {
                            i_ret = o_self.fsm_act(tsip_dialog_generic_actions_e.I_SUBSCRIBE, o_message, null);
                        }
                        else if (o_message.is_info()) {
                            i_ret = o_self.fsm_act(tsip_dialog_generic_actions_e.I_INFO, o_message, null);
                        }
                        else if (o_message.is_publish()) {
                            i_ret = o_self.fsm_act(tsip_dialog_generic_actions_e.I_PUBLISH, o_message, null);
                        }
                    }
                }
                break;
            }

        case tsip_dialog_event_type_e.CANCELED:
            {
                i_ret = o_self.fsm_act(tsip_dialog_generic_actions_e.CANCEL, o_message, null);
                break;
            }

        case tsip_dialog_event_type_e.TERMINATED:
        case tsip_dialog_event_type_e.TIMEDOUT:
        case tsip_dialog_event_type_e.ERROR:
        case tsip_dialog_event_type_e.TRANSPORT_ERROR:
            {
                i_ret = o_self.fsm_act(tsip_dialog_generic_actions_e.TRANSPORT_ERROR, o_message, null);
                break;
            }
    }

    return i_ret;
}


/* ======================== conds ======================== */
function __tsip_dialog_generic_cond_is_dialogless(o_dialog, o_message) { // /!\ Not dialogless in SIP meaning but just to say "2xx->Terminated" instead of "2xx->Connected"
    switch(o_dialog.e_type){
        case tsip_dialog_type_e.INFO:
        case tsip_dialog_type_e.MESSAGE:
        case tsip_dialog_type_e.OPTIONS:
            return true;
        default: return false;
    }
}
function __tsip_dialog_generic_cond_is_dialogfull(o_dialog, o_message){
    return !__tsip_dialog_generic_cond_is_dialogless(o_dialog, o_message);
}
function __tsip_dialog_generic_cond_is_resp2message(o_dialog, o_message) {
    return o_message.is_response_to_message();
}
function __tsip_dialog_generic_cond_is_message(o_dialog, o_message) {
    return o_message.is_message();
}
function __tsip_dialog_generic_cond_is_disconnecting(o_dialog, o_message) {
    return o_dialog.b_disconnecting;
}
function __tsip_dialog_generic_cond_is_connecting(o_dialog, o_message) {
    return !__tsip_dialog_generic_cond_is_disconnecting(o_dialog, o_message);
}
function __tsip_dialog_generic_cond_silent_hangup(o_dialog, o_message){
	return o_dialog.o_session.b_silent_hangup;
}
function __tsip_dialog_generic_cond_not_silent_hangup(o_dialog, o_message){
    return !__tsip_dialog_generic_cond_silent_hangup(o_dialog, o_message);
}
function __tsip_dialog_generic_cond_silent_shutdown(o_dialog, o_message) {
    return __tsip_dialog_generic_cond_silent_hangup(o_dialog, o_message);
}
function __tsip_dialog_generic_cond_not_silent_shutdown(o_dialog, o_message) {
    return !__tsip_dialog_generic_cond_silent_shutdown(o_dialog, o_message);
}


//--------------------------------------------------------
//				== STATE MACHINE BEGIN ==
//--------------------------------------------------------


// InProgress -> (1xx) -> InProgress
function tsip_dialog_generic_InProgress_2_InProgress_X_1xx(ao_args) {
    var o_dialog = ao_args[0];
    var o_response = ao_args[1];

    return o_dialog.signal_ao(o_response.get_response_code(), o_response.get_response_phrase(), o_response);
}

// InProgress -> (2xx) -> Terminated
function tsip_dialog_generic_InProgress_2_Terminated_X_2xx(ao_args) {
    var o_dialog = ao_args[0];
    var o_response = ao_args[1];

    return o_dialog.signal_ao(o_response.get_response_code(), o_response.get_response_phrase(), o_response);
}

// InProgress -> (2xx) -> Connected
function tsip_dialog_generic_InProgress_2_Connected_X_2xx(ao_args) {
    var o_dialog = ao_args[0];
    var o_response = ao_args[1];

    var b_first_time_to_connect = (o_dialog.e_state == tsip_dialog_state_e.INITIAL);

    // Update the dialog state
	if((i_ret = o_dialog.update_with_response(o_response)) != 0){
		return i_ret;
	}

    // Etag
    if(o_dialog.e_type == tsip_dialog_type_e.PUBLISH){
        /*	RFC 3903 - 4.1.  Identification of Published Event State
		    For each successful PUBLISH request, the ESC will generate and assign
		    an entity-tag and return it in the SIP-ETag header field of the 2xx
		    response.
	    */
        var o_hdr_etag;
        if ((o_hdr_etag = o_response.get_header(tsip_header_type_e.SIP_ETag))) {
            if(o_hdr_etag.s_value){
                o_dialog.s_etag = o_hdr_etag.s_value;
            }
            else{
                tsk_utils_log_warn("SIP-ETag header without value: Is it a bug?");
            }
        }
    }

    // Reset current action */
	o_dialog.set_action_curr(null);

    // Request timeout for dialog refresh (e.g re-registration)
	o_dialog.i_timerRefresh = o_dialog.get_newdelay(o_response);
	o_dialog.timer_schedule('generic', 'Refresh');

    // alert user
    o_dialog.signal_ao(o_response.get_response_code(), o_response.get_response_phrase(), o_response);
	if (b_first_time_to_connect) {
	    o_dialog.signal(tsip_event_code_e.DIALOG_CONNECTED, "Connected");
	}

    return 0;
}

// InProgress -> (401/407/421/494) -> InProgress
function tsip_dialog_generic_InProgress_2_InProgress_X_401_407_421_494(ao_args) {
    var o_dialog = ao_args[0];
    var o_response = ao_args[1];
    var i_ret;

    if ((i_ret = o_dialog.update_with_response(o_response))) {
        // alert user
        o_dialog.signal_ao(o_response.get_response_code(), o_response.get_response_phrase(), o_response);

        // set last error
        o_dialog.set_last_error(o_response.get_response_code(), o_response.get_response_phrase(), o_response);

        return i_ret;
    }

    switch (o_dialog.e_type) {
        case tsip_dialog_type_e.MESSAGE:
            {
                return o_dialog.send_message();
            }
        case tsip_dialog_type_e.PUBLISH:
            {
                return o_dialog.send_publish();
            }
        case tsip_dialog_type_e.SUBSCRIBE:
            {
                return o_dialog.send_subscribe();
            }
    }
    return 0;
}

// InProgress -> (300_to_699) -> Terminated
function tsip_dialog_generic_InProgress_2_Terminated_X_300_to_699(ao_args) {
    var o_dialog = ao_args[0];
    var o_response = ao_args[1];

    // save last error
	o_dialog.set_last_error(o_response.get_response_code(), o_response.get_response_phrase(), o_response);

    return o_dialog.signal_ao(o_response.get_response_code(), o_response.get_response_phrase(), o_response);
}

// InProgress -> (cancel) -> Terminated
function tsip_dialog_generic_InProgress_2_Terminated_X_cancel(ao_args) {
    tsk_utils_log_error("Not implemented");
    return 0;
}

// Incoming -> (accept) -> Terminated
function tsip_dialog_generic_Incoming_2_Terminated_X_accept(ao_args) {
    var o_dialog = ao_args[0];
    var o_action = ao_args[2];    
	
	if(!o_dialog.o_last_iMessage){
		tsk_utils_log_error("Invalid state");
		/* Not an error ...but do not update current action */
	}
	else{
		var o_response;
		var i_ret = -1;

		o_dialog.set_action_curr(o_action);
		if ((o_response = o_dialog.response_new(200, "OK", o_dialog.o_last_iMessage))) {
		    if ((i_ret = tsip_dialog.prototype.ApplyAction(o_response, o_action)) == 0) {
		        if ((i_ret = o_dialog.response_send(o_response))) {
		            tsk_utils_log_error("Failed to send SIP response.");
		            return i_ret;
		        }
		    }
		}
		else{
			tsk_utils_log_error("Failed to create SIP response.");
			return -1;
		}
	}

	return 0;
}

// Incoming -> (accept) -> Connected
function tsip_dialog_generic_Incoming_2_Connected_X_accept(ao_args) {
    tsk_utils_log_error("Not implemented");
    return 0;
}

// Incoming -> (rejected) -> Terminated
function tsip_dialog_generic_Incoming_2_Terminated_X_reject(ao_args) {
    tsk_utils_log_error("Not implemented");
    return 0;
}

// Any -> (hangup) -> InProgress
function __tsip_dialog_generic_Any_2_InProgress_X_hangup(ao_args){
    var o_dialog = ao_args[0];
	var o_action = ao_args[2];

	// set  current action
    o_dialog.set_action_curr(o_action);

	// alert the user
    o_dialog.signal(tsip_event_code_e.DIALOG_TERMINATING, "Disconnecting...");

    o_dialog.b_disconnecting = true;
    switch (o_dialog.e_type) {
        case tsip_dialog_type_e.PUBLISH:
            {
                return o_dialog.send_publish();
            }
        case tsip_dialog_type_e.SUBSCRIBE:
            {
                return o_dialog.send_subscribe();
            }
    }
	return 0;
}

// Any -> (shutdown) -> InProgress
function __tsip_dialog_generic_Any_2_InProgress_X_shutdown(ao_args) {
    var o_dialog = ao_args[0];
	
	// schedule shutdow timer
    o_dialog.timer_schedule('generic', 'Shutdown');

	// alert user
    o_dialog.signal(tsip_event_code_e.DIALOG_TERMINATING, "Disconnecting...");

	o_dialog.b_disconnecting = true;
	switch (o_dialog.e_type) {
        case tsip_dialog_type_e.PUBLISH:
            {
                return o_dialog.send_publish();
            }
        case tsip_dialog_type_e.SUBSCRIBE:
            {
                return o_dialog.send_subscribe();
            }
    }
    return 0;
}


// Any -> (transport error) -> Terminated
function tsip_dialog_generic_Any_2_Terminated_X_transportError(ao_args) {
    tsk_utils_log_error("Not implemented");
    return 0;
}

// Any -> (transport error) -> Terminated
function tsip_dialog_generic_Any_2_Terminated_X_Error(ao_args) {
    tsk_utils_log_error("Not implemented");
    return 0;
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//				== STATE MACHINE END ==
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++



function __tsip_dialog_generic_onterm(o_self) {
    tsk_utils_log_info("=== " + o_self.e_type.s_name + " Dialog terminated ===");
    
    o_self.timer_cancel('Refresh');
    o_self.timer_cancel('Shutdown');

    o_self.signal(tsip_event_code_e.DIALOG_TERMINATED,
            o_self.last_error.s_phrase ? o_self.last_error.s_phrase : "Disconnected",
            o_self.last_error.o_message);

    // deinit
    return o_self.deinit();
}


if(!window.__b_release_mode){
    tsip_api_add_js_scripts('head',
        'src/tinySIP/src/dialogs/tsip_dialog_generic__message.js',
        'src/tinySIP/src/dialogs/tsip_dialog_generic__publish.js',
        'src/tinySIP/src/dialogs/tsip_dialog_generic__subscribe.js'
    );
}
