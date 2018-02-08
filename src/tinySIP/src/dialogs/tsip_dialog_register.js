/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
tsip_dialog_register.prototype = Object.create(tsip_dialog.prototype);
tsip_dialog_register.prototype.__b_debug_state_machine = true;

var tsip_dialog_register_actions_e =
{
    ACCEPT: tsip_action_type_e.ACCEPT,
    REJECT: tsip_action_type_e.REJECT,
    HANGUP: tsip_action_type_e.HANGUP,
    O_REGISTER: tsip_action_type_e.REGISTER,
    CANCEL: tsip_action_type_e.CANCEL,
    SHUTDOWN: tsip_action_type_e.SHUTDOWN,

    I_1XX: 10001,
    I_2XX: 10002,
    I_401_407_421_494: 10003,
    I_423: 10004,
    I_300_to_699: 10005,

    I_REGISTER: 20000,

    SHUTDOWN_TIMEDOUT: 30000,
    TRANSPORT_ERROR: 30001,
    ERROR: 30002
};

var tsip_dialog_register_states_e =
{
    STARTED: 0,
    INPROGRESS: 1, // outgoing(client)
    INCOMING: 2, // incoming (server)
    CONNECTED: 3,
    TERMINATED: 4
};

function tsip_dialog_register(o_session, s_call_id) {
    tsip_dialog.call(this);
    this.o_last_iRegister = null;
    this.b_unregistering = false;
    this.b_is_server = false;

    this.o_timerRefresh = null;
    this.o_timerShutdown = null;
    this.i_timerShutdown = (tsip_dialog.prototype.__i_timer_shutdown << 1) / 3;

    this.init(tsip_dialog_type_e.REGISTER, s_call_id, o_session, tsip_dialog_register_states_e.STARTED, tsip_dialog_register_states_e.TERMINATED);
    this.set_callback(__tsip_dialog_register_event_callback);
    this.o_fsm.set_debug_enabled(tsip_dialog_register.prototype.__b_debug_state_machine);
    this.o_fsm.set_onterm_callback(__tsip_dialog_register_onterm, this);

    // initialize state machine
    this.o_fsm.set(
            /*=======================
			* === Started === 
			*/
			// Started -> (REGISTER) -> InProgress
			tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_register_states_e.STARTED, tsip_dialog_register_actions_e.O_REGISTER, tsip_dialog_register_states_e.INPROGRESS, __tsip_dialog_register_Started_2_InProgress_X_oRegister, "tsip_dialog_register_Started_2_InProgress_X_oRegister"),

			/*=======================
			* === InProgress === 
			*/
			// InProgress -> (1xx) -> InProgress
			tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_register_states_e.INPROGRESS, tsip_dialog_register_actions_e.I_1XX, tsip_dialog_register_states_e.INPROGRESS, __tsip_dialog_register_InProgress_2_InProgress_X_1xx, "tsip_dialog_register_InProgress_2_InProgress_X_1xx"),
			// InProgress -> (2xx) -> Terminated
			tsk_fsm_entry.prototype.Create(tsip_dialog_register_states_e.INPROGRESS, tsip_dialog_register_actions_e.I_2XX, __tsip_dialog_register_cond_client_unregistering, tsip_dialog_register_states_e.TERMINATED, __tsip_dialog_register_InProgress_2_Terminated_X_2xx, "tsip_dialog_register_InProgress_2_Terminated_X_2xx"),
            // InProgress -> (2xx) -> Connected
			tsk_fsm_entry.prototype.Create(tsip_dialog_register_states_e.INPROGRESS, tsip_dialog_register_actions_e.I_2XX, __tsip_dialog_register_cond_client_registering, tsip_dialog_register_states_e.CONNECTED, __tsip_dialog_register_InProgress_2_Connected_X_2xx, "tsip_dialog_register_InProgress_2_Connected_X_2xx"),
			// InProgress -> (401/407/421/494) -> InProgress
			tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_register_states_e.INPROGRESS, tsip_dialog_register_actions_e.I_401_407_421_494, tsip_dialog_register_states_e.INPROGRESS, __tsip_dialog_register_InProgress_2_InProgress_X_401_407_421_494, "tsip_dialog_register_InProgress_2_InProgress_X_401_407_421_494"),
			// InProgress -> (423) -> InProgress
			tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_register_states_e.INPROGRESS, tsip_dialog_register_actions_e.I_423, tsip_dialog_register_states_e.INPROGRESS, __tsip_dialog_register_InProgress_2_InProgress_X_423, "tsip_dialog_register_InProgress_2_InProgress_X_423"),
			// InProgress -> (300_to_699) -> Terminated
			tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_register_states_e.INPROGRESS, tsip_dialog_register_actions_e.I_300_to_699, tsip_dialog_register_states_e.TERMINATED, __tsip_dialog_register_InProgress_2_Terminated_X_300_to_699, "tsip_dialog_register_InProgress_2_Terminated_X_300_to_699"),
			// InProgress -> (cancel) -> Terminated
			tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_register_states_e.INPROGRESS, tsip_dialog_register_actions_e.CANCEL, tsip_dialog_register_states_e.TERMINATED, __tsip_dialog_register_InProgress_2_Terminated_X_cancel, "tsip_dialog_register_InProgress_2_Terminated_X_cancel"),
			// InProgress -> (hangup) -> Terminated
			tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_register_states_e.INPROGRESS, tsip_dialog_register_actions_e.HANGUP, tsip_dialog_register_states_e.TERMINATED, null, "tsip_dialog_register_InProgress_2_Terminated_X_hangup"),
			// InProgress -> (shutdown) -> Terminated
			tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_register_states_e.INPROGRESS, tsip_dialog_register_actions_e.SHUTDOWN, tsip_dialog_register_states_e.TERMINATED, null, "tsip_dialog_register_InProgress_2_Terminated_X_shutdown"),

            
			/*=======================
			* === Connected === 
			*/
			// Connected -> (register) -> InProgress [refresh case]
			tsk_fsm_entry.prototype.CreateAlways(tsip_dialog_register_states_e.CONNECTED, tsip_dialog_register_actions_e.O_REGISTER, tsip_dialog_register_states_e.INPROGRESS, __tsip_dialog_register_Connected_2_InProgress_X_oRegister, "tsip_dialog_register_Connected_2_InProgress_X_oRegister"),

            /*=======================
			* === Any === 
			*/
			// Any -> (hangup) -> InProgress
			tsk_fsm_entry.prototype.Create(tsk_fsm.prototype.__i_state_any, tsip_dialog_register_actions_e.HANGUP, __tsip_dialog_register_cond_not_silent_hangup, tsip_dialog_register_states_e.INPROGRESS, __tsip_dialog_register_Any_2_InProgress_X_hangup, "tsip_dialog_register_Any_2_InProgress_X_hangup"),
			// Any -> (silenthangup) -> Terminated
			tsk_fsm_entry.prototype.Create(tsk_fsm.prototype.__i_state_any, tsip_dialog_register_actions_e.HANGUP, __tsip_dialog_register_cond_silent_hangup, tsip_dialog_register_states_e.TERMINATED, null, "tsip_dialog_register_Any_2_InProgress_X_silenthangup"),
			// Any -> (shutdown) -> InProgress
			tsk_fsm_entry.prototype.Create(tsk_fsm.prototype.__i_state_any, tsip_dialog_register_actions_e.SHUTDOWN, __tsip_dialog_register_cond_not_silent_shutdown, tsip_dialog_register_states_e.INPROGRESS, __tsip_dialog_register_Any_2_InProgress_X_shutdown, "tsip_dialog_register_Any_2_InProgress_X_shutdown"),
			// Any -> (silentshutdown) -> Terminated
			tsk_fsm_entry.prototype.Create(tsk_fsm.prototype.__i_state_any, tsip_dialog_register_actions_e.SHUTDOWN, __tsip_dialog_register_cond_silent_shutdown, tsip_dialog_register_states_e.TERMINATED, null, "tsip_dialog_register_Any_2_InProgress_X_silentshutdown"),
			// Any -> (shutdown timedout) -> Terminated
			tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_register_actions_e.SHUTDOWN_TIMEDOUT, tsip_dialog_register_states_e.TERMINATED, null, "tsip_dialog_register_shutdown_timedout"),			
			// Any -> (transport error) -> Terminated
			tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_register_actions_e.TRANSPORT_ERROR, tsip_dialog_register_states_e.TERMINATED, __tsip_dialog_register_Any_2_Terminated_X_transportError, "tsip_dialog_register_Any_2_Terminated_X_transportError"),
			// Any -> (error) -> Terminated
			tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_register_actions_e.ERROR, tsip_dialog_register_states_e.TERMINATED, __tsip_dialog_register_Any_2_Terminated_X_Error, "tsip_dialog_register_Any_2_Terminated_X_Error")
    );
}

tsip_dialog_register.prototype.signal_register = function (e_register_type, i_code, s_phrase, o_message) {
    var o_event = new tsip_event_register(this.get_session(), i_code, s_phrase, o_message, e_register_type);
    return o_event.signal();
}

tsip_dialog_register.prototype.send_register = function(b_initial) {
    var o_request = null;
    var i_ret = -1;

    /* whether we are unregistering */
    if (this.b_unregistering) {
        this.i_expires = 0;
    }

    /* creates REGISTER request */
    if ((o_request = this.request_new("REGISTER"))) {
        /* 3GPP TS 24.229 - 5.1.1.2 Initial registration */
        if (this.e_state == tsip_dialog_state_e.INITIAL) {
            /*
            g) the Supported header field containing the option-tag "path", and
            1) if GRUU is supported, the option-tag "gruu"; and
            2) if multiple registrations is supported, the option-tag "outbound".
            */
            o_request.add_header(new tsip_header_Supported("path"));
        }

        /* action parameters and payload */
        if (this.o_action_curr) {
            tsip_dialog.prototype.ApplyAction(o_request, this.o_action_curr);
        }

        if ((i_ret = this.request_send(o_request)) == 0) {
            this.signal(tsip_event_code_e.DIALOG_REQUEST_SENT, tsk_string_format("{0}REGISTER request successfully sent", this.b_unregistering ? "un" : ""));
        }
        else {
            this.signal(tsip_event_code_e.DIALOG_TRANSPORT_ERROR, "Transport error");
        }
    }

    return i_ret;
};

function __tsip_dialog_register_timer_callback(o_self, o_timer) {
    var i_ret = -1;
    if (o_self) {
        if (o_self.o_timerRefresh == o_timer) {
            i_ret = o_self.fsm_act(tsip_dialog_register_actions_e.O_REGISTER, null, null);
        }
        else if (o_self.o_timerShutdown == o_timer) {
            i_ret = o_self.fsm_act(tsip_dialog_register_actions_e.SHUTDOWN, null, null);
        }
    }
    return i_ret;
}

function __tsip_dialog_register_event_callback(o_self, e_type, o_message){
	var i_ret = -1;

	switch(e_type){
	    case tsip_dialog_event_type_e.I_MSG:
			{
			    if (o_message) {
			        if (o_message.is_response()) {
						//	RESPONSE
						if(o_message.is_1xx()){
						    i_ret = o_self.fsm_act(tsip_dialog_register_actions_e.I_1XX, o_message, null);
						}
			            else if (o_message.is_2xx()) {
			                i_ret = o_self.fsm_act(tsip_dialog_register_actions_e.I_2XX, o_message, null);
						}
			            else if (o_message.is_response_xxx(401) || o_message.is_response_xxx(407) || o_message.is_response_xxx(421) || o_message.is_response_xxx(494)) {
			                i_ret = o_self.fsm_act(tsip_dialog_register_actions_e.I_401_407_421_494, o_message, null);
						}
						else if (o_message.is_response_xxx(423)) {
						    i_ret = o_self.fsm_act(tsip_dialog_register_actions_e.I_423, o_message, null);
						}
						else{
						    i_ret = o_self.fsm_act(tsip_dialog_register_actions_e.ERROR, o_message, null);
						}
					}
					else{
						//	REQUEST
					    if (o_message.is_register()) {
						    i_ret = o_self.fsm_act(tsip_dialog_register_actions_e.I_REGISTER, o_message, null);
						}
					}
				}
				break;
			}

        case tsip_dialog_event_type_e.CANCELED:
			{
			    i_ret = o_self.fsm_act(tsip_dialog_register_actions_e.CANCEL, o_message, null);
				break;
			}

        case tsip_dialog_event_type_e.TERMINATED:
        case tsip_dialog_event_type_e.TIMEDOUT:
        case tsip_dialog_event_type_e.ERROR:
        case tsip_dialog_event_type_e.TRANSPORT_ERROR:
			{
			    i_ret = o_self.fsm_act(tsip_dialog_register_actions_e.TRANSPORT_ERROR, o_message, null);
				break;
			}
	}

	return i_ret;
}

/* ======================== conds ======================== */
function __tsip_dialog_register_cond_client_unregistering(o_dialog, o_message) {
    return !o_dialog.b_is_server && o_dialog.b_unregistering;
}
function __tsip_dialog_register_cond_client_registering(o_dialog, o_message) {
    return !__tsip_dialog_register_cond_client_unregistering(o_dialog, o_message);
}
function __tsip_dialog_register_cond_silent_hangup(o_dialog, o_message){
	return o_dialog.o_session.b_silent_hangup;
}
function __tsip_dialog_register_cond_not_silent_hangup(o_dialog, o_message){
    return !__tsip_dialog_register_cond_silent_hangup(o_dialog, o_message);
}
function __tsip_dialog_register_cond_silent_shutdown(o_dialog, o_message) {
    return __tsip_dialog_register_cond_silent_hangup(o_dialog, o_message);
}
function __tsip_dialog_register_cond_not_silent_shutdown(o_dialog, o_message) {
    return !__tsip_dialog_register_cond_silent_shutdown(o_dialog, o_message);
}

//--------------------------------------------------------
//				== STATE MACHINE BEGIN ==
//--------------------------------------------------------

function __tsip_dialog_register_Started_2_InProgress_X_oRegister(ao_args) {
    var o_dialog = ao_args[0];
    var o_action = ao_args[2];

    o_dialog.b_running = true;
    o_dialog.set_action_curr(o_action);

    // alert user
    o_dialog.signal(tsip_event_code_e.DIALOG_CONNECTING, "Connecting...");

    // send register
    return o_dialog.send_register(true);
}

function __tsip_dialog_register_InProgress_2_InProgress_X_1xx(ao_args) {
    var o_dialog = ao_args[0];
    var o_message1xx = ao_args[1];

    // alert user
    o_dialog.signal_register(tsip_event_register_type_e.AO_REGISTER, o_message1xx.get_response_code(), o_message1xx.get_response_phrase(), o_message1xx);

    return o_dialog.update_with_response(o_message1xx);
}

function __tsip_dialog_register_InProgress_2_Terminated_X_2xx(ao_args) {
    var o_dialog = ao_args[0];
    var o_response = ao_args[1];

	// save last error
    o_dialog.set_last_error(o_response.get_response_code(), o_response.get_response_phrase(), o_response);

    // alert user
    o_dialog.signal_register(tsip_event_register_type_e.AO_UNREGISTER, o_response.get_response_code(), o_response.get_response_phrase(), o_response);

	return 0;
}

function __tsip_dialog_register_InProgress_2_Connected_X_2xx(ao_args) {
	var o_dialog = ao_args[0];
    var o_response = ao_args[1];

    var i_ret;
	var b_first_time_to_connect = (o_dialog.e_state == tsip_dialog_state_e.INITIAL);
    var o_stack = o_dialog.get_stack();

	/*	- Set P-associated-uriS
	*	- Update service-routes
	*	- Update Pats
	*/
	{
		var i_index;
		var o_hdr_Path;
		var o_hdr_Service_Route;
		var o_hdr_P_Associated_URI;
		
        o_stack.ao_uri_associated_uris.splice(0, o_stack.ao_uri_associated_uris.length);
        o_stack.ao_uri_service_routes.splice(0, o_stack.ao_uri_service_routes.length);
        o_stack.ao_uri_paths.splice(0, o_stack.ao_uri_paths.length);

		/* Associated URIs */
		for(i_index = 0; (o_hdr_P_Associated_URI = o_response.get_header_at(tsip_header_type_e.P_Associated_URI, i_index)); ++i_index){
            if(o_hdr_P_Associated_URI.o_uri){
                o_stack.ao_uri_associated_uris.push(o_hdr_P_Associated_URI.o_uri);
            }
		}

		/*	Service-Route (3GPP TS 24.229)
			store the list of service route values contained in the Service-Route header field and bind the list to the contact
			address used in registration, in order to build a proper preloaded Route header field value for new dialogs and
			standalone transactions when using the respective contact address.
		*/
		for(i_index = 0; (o_hdr_Service_Route = o_response.get_header_at(tsip_header_type_e.Service_Route, i_index)); ++i_index){
            if(o_hdr_Service_Route.o_uri){
                o_stack.ao_uri_service_routes.push(o_hdr_Service_Route.o_uri);
            }
		}

		/* Paths */
		for(i_index = 0; (o_hdr_Path = o_response.get_header_at(tsip_header_type_e.Path, i_index)); ++i_index){
			if(o_hdr_Path.o_uri){
                o_stack.ao_uri_paths.push(o_hdr_Path.o_uri);
            }
		}
	}

	/* 3GPP TS 24.229 - 5.1.1.2 Initial registration */
	if(b_first_time_to_connect){
		var b_barred = true;
		var o_uri;
		var o_uri_first = null;

	/*	
		b) store as the default public user identity the first URI on the list of URIs present in the P-Associated-URI header
		field and bind it to the respective contact address of the UE and the associated set of security associations or TLS
		session;
		NOTE 4: When using the respective contact address and associated set of security associations or TLS session, the
		UE can utilize additional URIs contained in the P-Associated-URI header field and bound it to the
		respective contact address of the UE and the associated set of security associations or TLS session, e.g. for
		application purposes.
		c) treat the identity under registration as a barred public user identity, if it is not included in the P-Associated-URI
		header field;
	*/
		for(i_index = 0; i_index < o_stack.ao_uri_associated_uris.length; ++i_index){
            if(!(o_uri = o_stack.ao_uri_associated_uris[i_index].o_uri)){
                continue;
            }
			if(i_index == 0){
				o_uri_first = o_stack.ao_uri_associated_uris[i_index].o_uri;
			}
            if (o_stack.identity.o_uri_pref.compare(o_uri) == 0) {
				b_barred = false;
				break;
			}
		}

		if(b_barred && o_uri_first){
            o_stack.identity.o_uri_pref = o_uri_first;
		}
	}
	
	// Update the dialog state
	if((i_ret = o_dialog.update_with_response(o_response)) != 0){
		return i_ret;
	}
	
	// Reset current action */
	o_dialog.set_action_curr(null);
	
	// Request timeout for dialog refresh (re-registration)
	o_dialog.i_timerRefresh = o_dialog.get_newdelay(o_response);
	o_dialog.timer_schedule('register', 'Refresh');

	// alert user
	o_dialog.signal_register(tsip_event_register_type_e.AO_REGISTER, o_response.get_response_code(), o_response.get_response_phrase(), o_response);
	if (b_first_time_to_connect) {
	    o_dialog.signal(tsip_event_code_e.DIALOG_CONNECTED, "Connected");
	}
	
	return i_ret;
}

function __tsip_dialog_register_InProgress_2_InProgress_X_401_407_421_494(ao_args) {
    var o_dialog = ao_args[0];
    var o_response = ao_args[1];
	var i_ret;

	if((i_ret = o_dialog.update_with_response(o_response))){
		// alert user
		o_dialog.signal_register(tsip_event_register_type_e.AO_REGISTER, o_response.get_response_code(), o_response.get_response_phrase(), o_response);
		
		// set last error
		o_dialog.set_last_error(o_response.get_response_code(), o_response.get_response_phrase(), o_response);
		
		return i_ret;
	}

    return o_dialog.send_register(false);
}

function __tsip_dialog_register_InProgress_2_InProgress_X_423(ao_args) {
    var o_dialog = ao_args[0];
    var o_response = ao_args[1];

	var o_hdr_Min_Expires;
	var i_ret = 0;

	/*
	RFC 3261 - 10.2.8 Error Responses

	If a UA receives a 423 (Interval Too Brief) response, it MAY retry
	the registration after making the expiration interval of all contact
	addresses in the REGISTER request equal to or greater than the
	expiration interval within the Min-Expires header field of the 423
	(Interval Too Brief) response.
	*/
	o_hdr_Min_Expires = o_response.get_header(tsip_header_type_e.Min_Expires);
	if(o_hdr_Min_Expires){
	    o_dialog.i_expires = (o_hdr_Min_Expires.i_value * 1000); // to milliseconds
		i_ret = o_dialog.send_register(false);
	}
    else {
        tsk_utils_log_error("Missing header: Min_Expires");
		i_ret = -1;
	}

	return i_ret;
}

function __tsip_dialog_register_InProgress_2_Terminated_X_300_to_699(ao_args) {
    var o_dialog = ao_args[0];
    var o_response = ao_args[1];

	// save last error
	o_dialog.set_last_error(o_response.get_response_code(), o_response.get_response_phrase(), o_response);
	
	// alert user
    o_dialog.signal_register(o_dialog.b_unregistering ? tsip_event_register_type_e.AO_UNREGISTER : tsip_event_register_type_e.AO_REGISTER, 
                o_response.get_response_code(), o_response.get_response_phrase(), o_response);
	
	return 0;
}

function __tsip_dialog_register_InProgress_2_Terminated_X_cancel(ao_args) {
    var o_dialog = ao_args[0];
	var o_action = ao_args[3];
    var i_ret;

    // set  current action
	o_dialog.set_action_curr(o_action);

	// Cancel all transactions associated to this dialog (will also be done when the dialog is destroyed (worth nothing))
	i_ret = o_dialog.get_layer_transac().cancel_by_dialog(o_dialog);

	/* RFC 3261 - 9.1 Client Behavior
	   A CANCEL request SHOULD NOT be sent to cancel a request other than INVITE.
	*/

	// alert the user
    o_dialog.signal(tsip_event_code_e.DIALOG_CANCELLED, "Registration cancelled");

	return i_ret;
}

function __tsip_dialog_register_Connected_2_InProgress_X_oRegister(ao_args) {
    var o_dialog = ao_args[0];
	var o_action = ao_args[3];

	// set  current action
	o_dialog.set_action_curr(o_action);

	return o_dialog.send_register(true);
}

function __tsip_dialog_register_Any_2_InProgress_X_hangup(ao_args) {
    var o_dialog = ao_args[0];
	var o_action = ao_args[3];

	// set  current action
    o_dialog.set_action_curr(o_action);

	// alert the user
    o_dialog.signal(tsip_event_code_e.DIALOG_TERMINATING, "Disconnecting...");

    o_dialog.b_unregistering = true;
	return o_dialog.send_register(true);
}

function __tsip_dialog_register_Any_2_InProgress_X_shutdown(ao_args) {
    var o_dialog = ao_args[0];
	
	// schedule shutdow timer
    o_dialog.timer_schedule('register', 'Shutdown');

	// alert user
    o_dialog.signal(tsip_event_code_e.DIALOG_TERMINATING, "Disconnecting...");

	o_dialog.b_unregistering = true;
	return o_dialog.send_register(true);
}

function __tsip_dialog_register_Any_2_Terminated_X_transportError(ao_args) {
    var o_dialog = ao_args[0];
    o_dialog.signal(tsip_event_code_e.DIALOG_TRANSPORT_ERROR, "Transport error");
    return 0;
}

function __tsip_dialog_register_Any_2_Terminated_X_Error(ao_args) {
    var o_dialog = ao_args[0];
    var o_response = ao_args[1];

	// save last error
    if(o_response){
	    o_dialog.set_last_error(o_response.get_response_code(), o_response.get_response_phrase(), o_response);
        o_dialog.signal_register(o_dialog.b_unregistering ? tsip_event_register_type_e.AO_UNREGISTER : tsip_event_register_type_e.AO_REGISTER, 
                o_response.get_response_code(), o_response.get_response_phrase(), o_response);
    }
    else{
        o_dialog.signal(tsip_event_code_e.DIALOG_GLOBAL_ERROR, "Global error");
    }

	return 0;
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//				== STATE MACHINE END ==
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function __tsip_dialog_register_onterm(o_self) {
    tsk_utils_log_info("=== REGISTER Dialog terminated ===");

    o_self.timer_cancel('Refresh');
    o_self.timer_cancel('Shutdown');

    o_self.signal(tsip_event_code_e.DIALOG_TERMINATED,
            o_self.last_error.s_phrase ? o_self.last_error.s_phrase : "Disconnected",
            o_self.last_error.o_message);

    // deinit
    return o_self.deinit();
}

