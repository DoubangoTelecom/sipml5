/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
/*
* SIP Non-INVITE Server Transaction as per RFC 3261 subclause 17.2.2.
*/
tsip_transac_nist.prototype = Object.create(tsip_transac.prototype);
tsip_transac_nist.prototype.__b_debug_state_machine = false;

var tsip_transac_nist_actions_e = 
{
	CANCEL: tsip_action_type_e.CANCEL,

	RECV_REQUEST: 10001,
	SEND_1XX: 10002,
	SEND_200_to_699: 10003,
	TIMER_J: 10004,
	TRANSPORT_ERROR: 10007,
	ERROR: 10008
};

var tsip_transac_nist_states_e = 
{
	STARTED: 0,
	TRYING: 1,
	PROCEEDING: 2,
	COMPLETED: 3,
	TERMINATED: 4
};

function tsip_transac_nist(b_reliable, i_cseq_value, s_cseq_method, s_callid, o_dialog) {
    var o_stack;
    if (!o_dialog || !(o_stack = o_dialog.get_stack())) {
        tsk_utils_log_error("Invalid argument");
        return null;
    }
    tsip_transac.call(this);

    this.o_lastResponse = null;

    this.init(tsip_transac_type_e.nist, b_reliable, i_cseq_value, s_cseq_method, s_callid, o_dialog, tsip_transac_nist_states_e.STARTED, tsip_transac_nist_states_e.TERMINATED);
    this.set_callback(__tsip_transac_nist_event_callback);
    this.o_fsm.set_debug_enabled(tsip_transac_nist.prototype.__b_debug_state_machine);
    this.o_fsm.set_onterm_callback(__tsip_transac_nist_onterm, this);

    /* Timers */
    this.o_timerJ = null;
    this.i_timerJ = b_reliable ? 0 : o_stack.o_timers.getJ(); /* RFC 3261 - 17.2.2*/


    // initialize the state machine
    this.o_fsm.set(
        /*=======================
        * === Started === 
        */
        // Started -> (receive request) -> Trying
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nist_states_e.STARTED, tsip_transac_nist_actions_e.RECV_REQUEST, tsip_transac_nist_states_e.TRYING, tsip_transac_nist_Started_2_Trying_X_request, "tsip_transac_nist_Started_2_Trying_X_request"),
        // Started -> (Any other) -> Started
        tsk_fsm_entry.prototype.CreateAlwaysNothing(tsip_transac_nist_states_e.STARTED, "tsip_transac_nist_Started_2_Started_X_any"),

        /*=======================
        * === Trying === 
        */
        // Trying -> (send 1xx) -> Proceeding
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nist_states_e.TRYING, tsip_transac_nist_actions_e.SEND_1XX, tsip_transac_nist_states_e.PROCEEDING, tsip_transac_nist_Trying_2_Proceeding_X_send_1xx, "tsip_transac_nist_Trying_2_Proceeding_X_send_1xx"),
        // Trying -> (send 200 to 699) -> Completed
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nist_states_e.TRYING, tsip_transac_nist_actions_e.SEND_200_to_699, tsip_transac_nist_states_e.COMPLETED, tsip_transac_nist_Trying_2_Completed_X_send_200_to_699, "tsip_transac_nist_Trying_2_Completed_X_send_200_to_699"),

        /*=======================
        * === Proceeding === 
        */
        // Proceeding -> (send 1xx) -> Proceeding
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nist_states_e.PROCEEDING, tsip_transac_nist_actions_e.SEND_1XX, tsip_transac_nist_states_e.PROCEEDING, tsip_transac_nist_Proceeding_2_Proceeding_X_send_1xx, "tsip_transac_nist_Proceeding_2_Proceeding_X_send_1xx"),
        // Proceeding -> (send 200 to 699) -> Completed
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nist_states_e.PROCEEDING, tsip_transac_nist_actions_e.SEND_200_to_699, tsip_transac_nist_states_e.COMPLETED, tsip_transac_nist_Proceeding_2_Completed_X_send_200_to_699, "tsip_transac_nist_Proceeding_2_Completed_X_send_200_to_699"),
        // Proceeding -> (receive request) -> Proceeding
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nist_states_e.PROCEEDING, tsip_transac_nist_actions_e.RECV_REQUEST, tsip_transac_nist_states_e.PROCEEDING, tsip_transac_nist_Proceeding_2_Proceeding_X_request, "tsip_transac_nist_Proceeding_2_Proceeding_X_request"),

        /*=======================
        * === Completed === 
        */
        // Completed -> (receive request) -> Completed
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nist_states_e.COMPLETED, tsip_transac_nist_actions_e.RECV_REQUEST, tsip_transac_nist_states_e.COMPLETED, tsip_transac_nist_Completed_2_Completed_X_request, "tsip_transac_nist_Completed_2_Completed_X_request"),
        // Completed -> (timer J) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_nist_states_e.COMPLETED, tsip_transac_nist_actions_e.TIMER_J, tsip_transac_nist_states_e.TERMINATED, tsip_transac_nist_Completed_2_Terminated_X_tirmerJ, "tsip_transac_nist_Completed_2_Terminated_X_tirmerJ"),

        /*=======================
        * === Any === 
        */
        // Any -> (transport error) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_transac_nist_actions_e.TRANSPORT_ERROR, tsip_transac_nist_states_e.TERMINATED, tsip_transac_nist_Any_2_Terminated_X_transportError, "tsip_transac_nist_Any_2_Terminated_X_transportError"),
        // Any -> (transport error) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_transac_nist_actions_e.ERROR, tsip_transac_nist_states_e.TERMINATED, tsip_transac_nist_Any_2_Terminated_X_Error, "tsip_transac_nist_Any_2_Terminated_X_Error"),
        // Any -> (cancel) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_transac_nist_actions_e.CANCEL, tsip_transac_nist_states_e.TERMINATED, tsip_transac_nist_Any_2_Terminated_X_cancel, "tsip_transac_nist_Any_2_Terminated_X_cancel")
    );
}


tsip_transac_nist.prototype.start = function (o_request) {
    var i_ret = -1;
    if (o_request && !this.b_running) {
        this.b_running = true;
        i_ret = this.fsm_act(tsip_transac_nist_actions_e.RECV_REQUEST, o_request);
    }
    return i_ret;
}


//--------------------------------------------------------
//				== STATE MACHINE BEGIN ==
//--------------------------------------------------------

/* Started --> (INCOMING REQUEST) --> Trying
*/
function tsip_transac_nist_Started_2_Trying_X_request(ao_args){
	var o_transac = ao_args[0];
    var o_request = ao_args[1];

	/*	RFC 3261 - 17.2.2
		The state machine is initialized in the "Trying" state and is passed
		a request other than INVITE or ACK when initialized.  This request is
		passed up to the TU.  Once in the "Trying" state, any further request
		retransmissions are discarded.  A request is a retransmission if it
		matches the same server transaction, using the rules specified in
		Section 17.2.3.
	*/
    return o_transac.get_dialog().callback(tsip_dialog_event_type_e.I_MSG, o_request);
}

/* Trying --> (1xx) --> Proceeding
*/
function tsip_transac_nist_Trying_2_Proceeding_X_send_1xx(ao_args){
    var o_transac = ao_args[0];
    var o_response = ao_args[1];
	var i_ret;

	/*	RFC 3261 - 17.2.2
		While in the "Trying" state, if the TU passes a provisional response
		to the server transaction, the server transaction MUST enter the
		"Proceeding" state.  The response MUST be passed to the transport
		layer for transmission.
	*/
	i_ret = o_transac.send(this.s_branch, o_response) > 0 ? 0 : -1;

	/* Update last response */
    o_transac.o_lastResponse = o_response;

	return i_ret;
}

/*	Trying --> (200-699) --> Completed
*/
function tsip_transac_nist_Trying_2_Completed_X_send_200_to_699(ao_args){
	var o_transac = ao_args[0];
    var o_response = ao_args[1];
	var i_ret;

	i_ret = o_transac.send(this.s_branch, o_response) > 0 ? 0 : -1;

	/*	RFC 3261 - 17.2.2
		When the server transaction enters the "Completed" state, it MUST set
		Timer J to fire in 64*T1 seconds for unreliable transports, and zero
		seconds for reliable transports.
	*/
    o_transac.timer_schedule('nist', 'J');

	/* Update last response */
	o_transac.o_lastResponse = o_response;

	return i_ret;
}

/*	Proceeding --> (1xx) --> Proceeding
*/
function tsip_transac_nist_Proceeding_2_Proceeding_X_send_1xx(ao_args){
	var o_transac = ao_args[0];
    var o_response = ao_args[1];

    /* Update last response */
	o_transac.o_lastResponse = o_response;

	/*	RFC 3261 - 17.2.2
		Any further provisional responses that are
		received from the TU while in the "Proceeding" state MUST be passed
		to the transport layer for transmission.
	*/
	return o_transac.send(this.s_branch, o_response) > 0 ? 0 : -1;
}

/* Proceeding -> (INCOMING REQUEST) -> Proceeding
*/
function tsip_transac_nist_Proceeding_2_Proceeding_X_request(ao_args){
	var o_transac = ao_args[0];

	/*	RFC 3261 - 17.2.2
		If a retransmission of the request is received while in the "Proceeding" state, the most
		recently sent provisional response MUST be passed to the transport
		layer for retransmission.
	*/
	if(o_transac.o_lastResponse){
		o_transac.send(this.s_branch, o_transac.o_lastResponse);
	}

	return 0;
}

/*	Proceeding --> (200-699) --> Completed
*/
function tsip_transac_nist_Proceeding_2_Completed_X_send_200_to_699(ao_args){
	var o_transac = ao_args[0];
    var o_response = ao_args[1];
	var i_ret;

	/*	RFC 3261 - 17.2.2
		If the TU passes a final response (status
		codes 200-699) to the server while in the "Proceeding" state, the
		transaction MUST enter the "Completed" state, and the response MUST
		be passed to the transport layer for transmission.
	*/
	i_ret = o_transac.send(this.s_branch, o_response) > 0 ? 0 : -1;

	/*	RFC 3261 - 17.2.2
		When the server transaction enters the "Completed" state, it MUST set
		Timer J to fire in 64*T1 seconds for unreliable transports, and zero
		seconds for reliable transports.
	*/
	o_transac.timer_schedule('nist', 'J');

	/* Update last response */
	o_transac.o_lastResponse = o_response;

	return i_ret;
}

/* Completed --> (INCOMING REQUEST) --> Completed
*/
function tsip_transac_nist_Completed_2_Completed_X_request(ao_args){
	var o_transac = ao_args[0];

	/*	RFC 3261 - 17.2.2
		While in the "Completed" state, the server transaction MUST pass the final response to the transport
		layer for retransmission whenever a retransmission of the request is received.
	*/
	if(o_transac.o_lastResponse){
		o_transac.send(this.s_branch, o_transac.o_lastResponse);
	}

	return 0;
}

/* Complete --> (Timer J) --> Terminated
*/
function tsip_transac_nist_Completed_2_Terminated_X_tirmerJ(ao_args){
	/*	RFC 3261 - 17.2.2
		The server transaction remains in this state (Completed) until Timer J fires, at
	    which pofunction it MUST transition to the "Terminated" state.
	*/

	/*	RFC 3261 - 17.2.2
		THE SERVER TRANSACTION MUST BE DESTROYED THE INSTANT IT ENTERS THE "TERMINATED" STATE.
	*/
	return 0;
}

/* Any -> (Transport Error) -> Terminated
*/
function tsip_transac_nist_Any_2_Terminated_X_transportError(ao_args){
	var o_transac = ao_args[0];

	/* Timers will be canceled by "tsip_transac_nist_OnTerminated" */

	return o_transac.get_dialog().callback(tsip_dialog_event_type_e.TRANSPORT_ERROR, null);
}

/* Any -> (Error) -> Terminated
*/
function tsip_transac_nist_Any_2_Terminated_X_Error(ao_args){
	var o_transac = ao_args[0];

	/* Timers will be canceled by "tsip_transac_nist_OnTerminated" */

	return o_transac.get_dialog().callback(tsip_dialog_event_type_e.ERROR, null);
}

/* Any -> (cancel) -> Terminated
*/
function tsip_transac_nist_Any_2_Terminated_X_cancel(ao_args){
	/* doubango-specific */
	return 0;
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//				== STATE MACHINE END ==
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function __tsip_transac_nist_onterm(o_self) {
    o_self.timer_cancel('J');

    return o_self.deinit();
}

function __tsip_transac_nist_event_callback(o_self, e_event_type, o_message) {
	var i_ret = -1;

	switch(e_event_type){
	    case tsip_transac_event_type_e.INCOMING_MSG: /* From Transport Layer to Transaction Layer */
		    {
			    if(o_message && o_message.is_request()){
                     i_ret = o_self.fsm_act(tsip_transac_nist_actions_e.RECV_REQUEST, o_message);
			    }
			    break;
		    }

	    case tsip_transac_event_type_e.OUTGOING_MSG: /* From TU to Transport Layer */
		    {
			    if(o_message && o_message.is_response()){
				    if(o_message.is_1xx()){
                        i_ret = o_self.fsm_act(tsip_transac_nist_actions_e.SEND_1XX, o_message);
				    }
				    else if(o_message.is_23456()){
                        i_ret = o_self.fsm_act(tsip_transac_nist_actions_e.SEND_200_to_699, o_message);
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
			    i_ret = o_self.fsm_act(tsip_transac_nist_actions_e.ERROR, o_message);
			    break;
		    }

	    case tsip_transac_event_type_e.TRANSPORT_ERROR:
		    {
			    i_ret = o_self.fsm_act(tsip_transac_nist_actions_e.TRANSPORT_ERROR, o_message);
			    break;
		    }
	}

	return i_ret;
}

function __tsip_transac_nist_timer_callback(o_self, o_timer){
	if(o_self){
		if(o_timer == o_self.o_timerJ){
			o_self.fsm_act(tsip_transac_nist_actions_e.TIMER_J, null);
		}
	}
}
