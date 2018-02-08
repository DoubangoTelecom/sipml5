/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
/*
* SIP Non-INVITE Client Transaction as per RFC 3261 subcaluse 17.1.2.
*/
tsip_transac_nict.prototype = Object.create(tsip_transac.prototype);
tsip_transac_nict.prototype.__b_debug_state_machine = false;

var tsip_transac_nict_actions_e = 
{
	CANCEL: tsip_action_type_e.CANCEL,

	SEND: 10001,
	TIMER_E: 10002,
	TIMER_F: 10003,
	TIMER_K: 10004,
	I_1xx: 10005,
	I_200_to_699: 10006,
	TRANSPORT_ERROR: 10007,
	ERROR: 10008
};

var tsip_transac_nict_states_e = 
{
	STARTED: 0,
	TRYING: 1,
	PROCEEDING: 2,
	COMPLETED: 3,
	TERMINATED: 4
};

function tsip_transac_nict(b_reliable, i_cseq_value, s_cseq_method, s_callid, o_dialog) {
    var o_stack;
    if(!o_dialog || !(o_stack = o_dialog.get_stack())){
        tsk_utils_log_error("Invalid argument");
        return null;
    }
    tsip_transac.call(this);
    this.o_request = null;

    this.init(tsip_transac_type_e.NICT, b_reliable, i_cseq_value, s_cseq_method, s_callid, o_dialog, tsip_transac_nict_states_e.STARTED, tsip_transac_nict_states_e.TERMINATED);
    this.set_callback(__tsip_transac_nict_event_callback);
    this.o_fsm.set_debug_enabled(tsip_transac_nict.prototype.__b_debug_state_machine);
    this.o_fsm.set_onterm_callback(__tsip_transac_nict_onterm, this);

    /* Timers */
	this.o_timerE = null;
	this.o_timerF = null;
	this.o_timerK = null;

	this.i_timerE = o_stack.o_timers.getE();
	this.i_timerF = o_stack.o_timers.getF();
	this.i_timerK = b_reliable ? 0 : o_stack.o_timers.getK(); /* RFC 3261 - 17.1.2.2*/

	// initialize the state machine
	this.o_fsm.set(
	    /*=======================
	    * === Started === 
	    */
	    // Started -> (Send) -> Trying
	    tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nict_states_e.STARTED, tsip_transac_nict_actions_e.SEND, tsip_transac_nict_states_e.TRYING, __tsip_transac_nict_Started_2_Trying_X_send, "__tsip_transac_nict_Started_2_Trying_X_send"),
	    // Started -> (Any) -> Started
	    tsk_fsm_entry.prototype.CreateAlwaysNothing(tsip_transac_nict_states_e.STARTED, "tsip_transac_nict_Started_2_Started_X_any"),

	    /*=======================
	    * === Trying === 
	    */
	    // Trying -> (timerE) -> Trying
	    tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nict_states_e.TRYING, tsip_transac_nict_actions_e.TIMER_E, tsip_transac_nict_states_e.TRYING, __tsip_transac_nict_Trying_2_Trying_X_timerE, "__tsip_transac_nict_Trying_2_Trying_X_timerE"),
	    // Trying -> (timerF) -> Terminated
	    tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nict_states_e.TRYING, tsip_transac_nict_actions_e.TIMER_F, tsip_transac_nict_states_e.TERMINATED, __tsip_transac_nict_Trying_2_Terminated_X_timerF, "__tsip_transac_nict_Trying_2_Terminated_X_timerF"),
	    // Trying -> (transport error) -> Terminated
	    tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nict_states_e.TRYING, tsip_transac_nict_actions_e.TRANSPORT_ERROR, tsip_transac_nict_states_e.TERMINATED, __tsip_transac_nict_Trying_2_Terminated_X_transportError, "__tsip_transac_nict_Trying_2_Terminated_X_transportError"),
	    // Trying  -> (1xx) -> Proceeding
	    tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nict_states_e.TRYING, tsip_transac_nict_actions_e.I_1xx, tsip_transac_nict_states_e.PROCEEDING, __tsip_transac_nict_Trying_2_Proceedding_X_1xx, "__tsip_transac_nict_Trying_2_Proceedding_X_1xx"),
	    // Trying  -> (200 to 699) -> Completed
	    tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nict_states_e.TRYING, tsip_transac_nict_actions_e.I_200_to_699, tsip_transac_nict_states_e.COMPLETED, __tsip_transac_nict_Trying_2_Completed_X_200_to_699, "__tsip_transac_nict_Trying_2_Completed_X_200_to_699"),

	    /*=======================
	    * === Proceeding === 
	    */
	    // Proceeding -> (timerE) -> Proceeding
	    tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nict_states_e.PROCEEDING, tsip_transac_nict_actions_e.TIMER_E, tsip_transac_nict_states_e.PROCEEDING, __tsip_transac_nict_Proceeding_2_Proceeding_X_timerE, "__tsip_transac_nict_Proceeding_2_Proceeding_X_timerE"),
	    // Proceeding -> (timerF) -> Terminated
	    tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nict_states_e.PROCEEDING, tsip_transac_nict_actions_e.TIMER_F, tsip_transac_nict_states_e.TERMINATED, __tsip_transac_nict_Proceeding_2_Terminated_X_timerF, "__tsip_transac_nict_Proceeding_2_Terminated_X_timerF"),
	    // Proceeding -> (transport error) -> Terminated
	    tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nict_states_e.PROCEEDING, tsip_transac_nict_actions_e.TRANSPORT_ERROR, tsip_transac_nict_states_e.TERMINATED, __tsip_transac_nict_Proceeding_2_Terminated_X_transportError, "__tsip_transac_nict_Proceeding_2_Terminated_X_transportError"),
	    // Proceeding -> (1xx) -> Proceeding
	    tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nict_states_e.PROCEEDING, tsip_transac_nict_actions_e.I_1xx, tsip_transac_nict_states_e.PROCEEDING, __tsip_transac_nict_Proceeding_2_Proceeding_X_1xx, "__tsip_transac_nict_Proceeding_2_Proceeding_X_1xx"),
	    // Proceeding -> (200 to 699) -> Completed
	    tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nict_states_e.PROCEEDING, tsip_transac_nict_actions_e.I_200_to_699, tsip_transac_nict_states_e.COMPLETED, __tsip_transac_nict_Proceeding_2_Completed_X_200_to_699, "__tsip_transac_nict_Proceeding_2_Completed_X_200_to_699"),

	    /*=======================
	    * === Completed === 
	    */
	    // Completed -> (timer K) -> Terminated
	    tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nict_states_e.COMPLETED, tsip_transac_nict_actions_e.TIMER_K, tsip_transac_nict_states_e.TERMINATED, __tsip_transac_nict_Completed_2_Terminated_X_timerK, "__tsip_transac_nict_Completed_2_Terminated_X_timerK"),

	    /*=======================
	    * === Any === 
	    */
	    // Any -> (transport error) -> Terminated
	    tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_transac_nict_actions_e.TRANSPORT_ERROR, tsip_transac_nict_states_e.TERMINATED, __tsip_transac_nict_Any_2_Terminated_X_transportError, "__tsip_transac_nict_Any_2_Terminated_X_transportError"),
	    // Any -> (error) -> Terminated
	    tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_transac_nict_actions_e.ERROR, tsip_transac_nict_states_e.TERMINATED, __tsip_transac_nict_Any_2_Terminated_X_Error, "__tsip_transac_nict_Any_2_Terminated_X_Error"),
	    // Any -> (cancel) -> Terminated
	    tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_transac_nict_actions_e.CANCEL, tsip_transac_nict_states_e.TERMINATED, __tsip_transac_nict_Any_2_Terminated_X_cancel, "__tsip_transac_nict_Any_2_Terminated_X_cancel")

	);
}

tsip_transac_nict.prototype.start = function (o_request) {
    var i_ret = -1;
	if(o_request && !this.b_running){
		/* Add branch to the new client transaction
		* IMPORTANT: CANCEL will have the same Via and Contact headers as the request it cancel
		*/
		if(o_request.is_cancel()){
			this.s_branch = o_request.o_hdr_firstVia ? o_request.o_hdr_firstVia.s_branch : "doubango";
		}
        else{
            this.s_branch = tsk_string_format("{0}{1}", tsip_transac.prototype.__magic_cookie, tsk_string_random(32));
        }

		this.b_running = true;
		this.o_request = o_request;

		i_ret = this.fsm_act(tsip_transac_nict_actions_e.SEND, o_request);
	}
    return i_ret;
};

/* ======================== transitions ======================== */
function __tsip_transac_nict_Started_2_Trying_X_send(ao_args) {
    var o_transac = ao_args[0];
    var o_request = ao_args[1];

	//== Send the request
    o_transac.send(o_transac.s_branch, o_request);

	/*	RFC 3261 - 17.1.2.2
		The "Trying" state is entered when the TU initiates a new client
		transaction with a request.  When entering this state, the client
		transaction SHOULD set timer F to fire in 64*T1 seconds.
	*/
    o_transac.timer_schedule('nict', 'F');
		
	/*	RFC 3261 - 17.1.2.2
		If an  unreliable transport is in use, the client transaction MUST set timer
		E to fire in T1 seconds.
	*/
	if (!o_transac.b_reliable) {
	    o_transac.timer_schedule('nict', 'E');
	}

    return 0;
}

function __tsip_transac_nict_Trying_2_Trying_X_timerE(ao_args) {
    var o_transac = ao_args[0];

	//== Send the request
    o_transac.send(o_transac.s_branch, o_transac.o_request);

	/*	RFC 3261 - 17.1.2.2
		If timer E fires while still in this (Trying) state, the timer is reset, but this time with a value of MIN(2*T1, T2).
		When the timer fires again, it is reset to a MIN(4*T1, T2).  This process continues so that retransmissions occur with an exponentially
	    increasing interval that caps at T2.  The default value of T2 is 4s, and it represents the amount of time a non-INVITE server transaction
	    will take to respond to a request, if it does not respond immediately.  For the default values of T1 and T2, this results in
	    intervals of 500 ms, 1 s, 2 s, 4 s, 4 s, 4 s, etc.
	*/
    o_transac.i_timerE = Math.min(o_transac.i_timerE << 1, o_transac.get_stack().o_timers.getT2());
    o_transac.timer_schedule('nict', 'E');

	return 0;
}

function __tsip_transac_nict_Trying_2_Terminated_X_timerF(ao_args) {
    var o_transac = ao_args[0];
    
	/*	RFC 3261 - 17.1.2.2
		If Timer F fires while the client transaction is still in the
		"Trying" state, the client transaction SHOULD inform the TU about the
		timeout, and then it SHOULD enter the "Terminated" state.
	*/

	/* Timers will be canceled by "tsip_transac_nict_OnTerminated" */
	
    o_transac.get_dialog().callback(tsip_dialog_event_type_e.TIMEDOUT, o_transac.o_request);

	return 0;
}

function __tsip_transac_nict_Trying_2_Terminated_X_transportError(ao_args) {
    var o_transac = ao_args[0];

	/* Timers will be canceled by "tsip_transac_nict_OnTerminated" */

    o_transac.get_dialog().callback(tsip_dialog_event_type_e.TRANSPORT_ERROR, o_transac.o_request);

    return 0;
}

function __tsip_transac_nict_Trying_2_Proceedding_X_1xx(ao_args) {
    var o_transac = ao_args[0];
    var o_message1xx = ao_args[1];

	/*	RFC 3261 - 17.1.2.2
		If a provisional response is received while in the "Trying" state, the
		response MUST be passed to the TU, and then the client transaction
		SHOULD move to the "Proceeding" state.
	*/

	/* Cancel timers */
	if(!o_transac.b_reliable){
		o_transac.timer_cancel('E');
	}
	o_transac.timer_cancel('F'); /* Now it's up to the UAS to update the FSM. */
	
	/* Pass the provisional response to the dialog */
	o_transac.get_dialog().callback(tsip_dialog_event_type_e.I_MSG, o_message1xx);

	return 0;
}

function __tsip_transac_nict_Trying_2_Completed_X_200_to_699(ao_args) {
    var o_transac = ao_args[0];
    var o_message = ao_args[1];

	/*	RFC 3261 - 17.1.2.2
		If a final response (status codes 200-699) is received while in the "Trying" state, the response
		MUST be passed to the TU, and the client transaction MUST transition
		to the "Completed" state.

		If Timer K fires while in this state (Completed), the client transaction MUST transition to the "Terminated" state.
	*/

	if(!o_transac.b_reliable){
		o_transac.timer_cancel('E');
	}
	o_transac.timer_cancel('F');

    /* Pass the final response to the dialog */
    o_transac.get_dialog().callback(tsip_dialog_event_type_e.I_MSG, o_message);

    /* SCHEDULE timer K */
    o_transac.timer_schedule('nict', 'K');

	return 0;
}

function __tsip_transac_nict_Proceeding_2_Proceeding_X_timerE(ao_args) {
    var o_transac = ao_args[0];

	//== Send the request
    o_transac.send(o_transac.s_branch, o_transac.o_request);

	/*	RFC 3261 - 17.1.2.2
		If Timer E fires while in the "Proceeding" state, the request MUST be
		passed to the transport layer for retransmission, and Timer E MUST be
		reset with a value of T2 seconds.
	*/
    o_transac.i_timerE = Math.min(o_transac.i_timerE << 1, o_transac.get_stack().o_timers.getT2());
    o_transac.timer_schedule('nict', 'E');

	return 0;
}

function __tsip_transac_nict_Proceeding_2_Terminated_X_timerF(ao_args) {
    var o_transac = ao_args[0];
    
	/*	RFC 3261 - 17.1.2.2
		If timer F fires while in the "Proceeding" state, the TU MUST be informed of a timeout, and the
		client transaction MUST transition to the terminated state.
	*/

	/* Timers will be canceled by "tsip_transac_nict_OnTerminated" */
    o_transac.get_dialog().callback(tsip_dialog_event_type_e.TRANSPORT_ERROR, null);

	return 0;
}

function __tsip_transac_nict_Proceeding_2_Terminated_X_transportError(ao_args) {
    var o_transac = ao_args[0];

	/* Timers will be canceles by On */
    o_transac.get_dialog().callback(tsip_dialog_event_type_e.TRANSPORT_ERROR, null);

	return 0;
}

function __tsip_transac_nict_Proceeding_2_Proceeding_X_1xx(ao_args) {
    var o_transac = ao_args[0];
    var o_message1xx = ao_args[1];

	if(!o_transac.b_reliable){
		o_transac.timer_cancel('E');
	}
    o_transac.get_dialog().callback(tsip_dialog_event_type_e.I_MSG, o_message1xx);

	return 0;
}

function __tsip_transac_nict_Proceeding_2_Completed_X_200_to_699(ao_args) {
    var o_transac = ao_args[0];
    var o_message = ao_args[1];

	/*	RFC 3261 - 17.1.2.2
		If a final response (status codes 200-699) is received while in the
		"Proceeding" state, the response MUST be passed to the TU, and the
		client transaction MUST transition to the "Completed" state.
	*/

	/*	RFC 3261 - 17.1.2.2
		Once the client transaction enters the "Completed" state, it MUST set
		Timer K to fire in T4 seconds for unreliable transports, and zero
		seconds for reliable transports.  The "Completed" state exists to
		buffer any additional response retransmissions that may be received
		(which is why the client transaction remains there only for

		unreliable transports).  T4 represents the amount of time the network
		will take to clear messages between client and server transactions.
		The default value of T4 is 5s.
	*/

	if(!o_transac.b_reliable){
		o_transac.timer_cancel('E');
	}

    o_transac.get_dialog().callback(tsip_dialog_event_type_e.I_MSG, o_message);
	
	/* SCHEDULE timer K */
    o_transac.timer_schedule('nict', 'K');

	return 0;
}

function __tsip_transac_nict_Completed_2_Terminated_X_timerK(ao_args) {
    /*	RFC 3261 - 17.1.2.2
    If Timer K fires while in this state (Completed), the client transaction
    MUST transition to the "Terminated" state.
    */

    /*	RFC 3261 - 17.1.2.2
    ONCE THE TRANSACTION IS IN THE TERMINATED STATE, IT MUST BE DESTROYED IMMEDIATELY.
    */

    /* Timers will be canceled by "tsip_transac_nict_OnTerminated" */

    //TSIP_TRANSAC(self)->dialog->callback(TSIP_TRANSAC(self)->dialog, tsip_dialog_transac_ok, 0);

    return 0;
}

function __tsip_transac_nict_Any_2_Terminated_X_transportError(ao_args) {
    var o_transac = ao_args[0];

	/* Timers will be canceled by "tsip_transac_nict_OnTerminated" */

    return o_transac.get_dialog().callback(tsip_dialog_event_type_e.TRANSPORT_ERROR, null);
}

function __tsip_transac_nict_Any_2_Terminated_X_Error(ao_args) {
    var o_transac = ao_args[0];

	/* Timers will be canceled by "tsip_transac_nict_OnTerminated" */

    return o_transac.get_dialog().callback(tsip_dialog_event_type_e.ERROR, null);
}

/* doubango-specific */
function __tsip_transac_nict_Any_2_Terminated_X_cancel(ao_args) {
    /* doubango-specific */
    return 0;
}


function __tsip_transac_nict_onterm(o_self) {
    o_self.timer_cancel('E');
    o_self.timer_cancel('F');
    o_self.timer_cancel('K');

    return o_self.deinit();
}

function __tsip_transac_nict_event_callback(o_self, e_event_type, o_message) {
    if (!o_self) {
        tsk_utils_log_error("Invalid argument");
        return -1;
    }
	var i_ret = 0;

	switch (e_event_type){
	    case tsip_transac_event_type_e.INCOMING_MSG:
		    {
		        if (o_message && o_message.is_response()) {
		            if (o_message.is_1xx()) {
		                i_ret = o_self.fsm_act(tsip_transac_nict_actions_e.I_1xx, o_message);
				    }
					else if (o_message.is_23456()) {
					    i_ret = o_self.fsm_act(tsip_transac_nict_actions_e.I_200_to_699, o_message);
				    }
				    else{
				        tsk_utils_log_warn("Not supported status code: " + o_message.get_response_code());
				    }
			    }
			    break;
		    }

        case tsip_transac_event_type_e.CANCELED:
        case tsip_transac_event_type_e.TERMINATED:
        case tsip_transac_event_type_e.TIMEDOUT:
		    break;

		case tsip_transac_event_type_e.ERROR:
		    {
		        i_ret = o_self.fsm_act(tsip_transac_nict_actions_e.ERROR, o_message);
			    break;
		    }

        case tsip_transac_event_type_e.TRANSPORT_ERROR:
		    {
		        i_ret = o_self.fsm_act(tsip_transac_nict_actions_e.TRANSPORT_ERROR, o_message);
			    break;
		    }
	}

    return i_ret;
}

function __tsip_transac_nict_timer_callback(o_self, o_timer){
	if(o_self){
		if(o_timer == o_self.o_timerE){
			o_self.fsm_act(tsip_transac_nict_actions_e.TIMER_E, null);
		}
		else if(o_timer == o_self.o_timerF){
			o_self.fsm_act(tsip_transac_nict_actions_e.TIMER_F, null);
		}
		else if(o_timer == o_self.o_timerK){
			o_self.fsm_act(tsip_transac_nict_actions_e.TIMER_K, null);
		}
	}
}
