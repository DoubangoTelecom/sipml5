/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
/*
* SIP INVITE Server Transaction as per RFC 3261 subclause 17.2.1.
*/
tsip_transac_ist.prototype = Object.create(tsip_transac.prototype);
tsip_transac_ist.prototype.__b_debug_state_machine = true;

var tsip_transac_ist_actions_e =
{
	CANCEL: tsip_action_type_e.CANCEL,

	RECV_INVITE: 10001,
	RECV_ACK: 10002,
	SEND_1XX: 10003,
	SEND_2XX: 10004,
	SEND_300_to_699: 10005,
	SEND_NON1XX: 10006,
	TIMER_H: 10007,
	TIMER_I: 10008,
	TIMER_G: 10009,
	TIMER_L: 10010,
    TIMER_X: 10011,
    TRANSPORT_ERROR: 10012,
	ERROR: 10013
};

var tsip_transac_ist_states_e =
{
    STARTED: 0,
	PROCEEDING: 1,
	COMPLETED: 2,
	ACCEPTED: 3,
	CONFIRMED: 4,
	TERMINATED: 5
};


function tsip_transac_ist(b_reliable, i_cseq_value, s_callid, o_dialog) {
    var o_stack;
    if (!o_dialog || !(o_stack = o_dialog.get_stack())) {
        tsk_utils_log_error("Invalid argument");
        return null;
    }
    tsip_transac.call(this);

    this.o_lastResponse = null;

    this.init(tsip_transac_type_e.IST, b_reliable, i_cseq_value, "INVITE", s_callid, o_dialog, tsip_transac_ist_states_e.STARTED, tsip_transac_ist_states_e.TERMINATED);
    this.set_callback(__tsip_transac_ist_event_callback);
    this.o_fsm.set_debug_enabled(tsip_transac_ist.prototype.__b_debug_state_machine);
    this.o_fsm.set_onterm_callback(__tsip_transac_ist_onterm, this);

    /* Timers */
    this.o_timerH = null;
    this.o_timerI = null;
    this.o_timerG = null;
    this.o_timerL = null;
    this.o_timerX = null;

    this.i_timerH = o_stack.o_timers.getH();
    this.i_timerI = b_reliable ? 0 : o_stack.o_timers.getI();
    this.i_timerG = o_stack.o_timers.getG();
    this.i_timerL = o_stack.o_timers.getL();
    this.i_timerX = o_stack.o_timers.getG();

    // initialize the state machine
    this.o_fsm.set(

        /*=======================
		* === Started === 
		*/
		// Started -> (recv INVITE) -> Proceeding
		tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ist_states_e.STARTED, tsip_transac_ist_actions_e.RECV_INVITE, tsip_transac_ist_states_e.PROCEEDING, __tsip_transac_ist_Started_2_Proceeding_X_INVITE, "tsip_transac_ist_Started_2_Proceeding_X_INVITE"),
		// Started -> (Any other) -> Started
		tsk_fsm_entry.prototype.CreateAlwaysNothing(tsip_transac_ist_states_e.STARTED, "tsip_transac_ist_Started_2_Started_X_any"),

		/*=======================
		* === Proceeding === 
		*/
		// Proceeding -> (recv INVITE) -> Proceeding
		tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ist_states_e.PROCEEDING, tsip_transac_ist_actions_e.RECV_INVITE, tsip_transac_ist_states_e.PROCEEDING, __tsip_transac_ist_Proceeding_2_Proceeding_X_INVITE, "tsip_transac_ist_Proceeding_2_Proceeding_X_INVITE"),
		// Proceeding -> (send 1xx) -> Proceeding
		tsk_fsm_entry.prototype.Create(tsip_transac_ist_states_e.PROCEEDING, tsip_transac_ist_actions_e.SEND_1XX, __tsip_transac_ist_cond_is_resp2invite, tsip_transac_ist_states_e.PROCEEDING, __tsip_transac_ist_Proceeding_2_Proceeding_X_1xx, "tsip_transac_ist_Proceeding_2_Proceeding_X_1xx"),
		// Proceeding -> (send 300to699) -> Completed
		tsk_fsm_entry.prototype.Create(tsip_transac_ist_states_e.PROCEEDING, tsip_transac_ist_actions_e.SEND_300_to_699, __tsip_transac_ist_cond_is_resp2invite, tsip_transac_ist_states_e.COMPLETED, __tsip_transac_ist_Proceeding_2_Completed_X_300_to_699, "tsip_transac_ist_Proceeding_2_Completed_X_300_to_699"),
		// Proceeding -> (send 2xx) -> Accepted
		tsk_fsm_entry.prototype.Create(tsip_transac_ist_states_e.PROCEEDING, tsip_transac_ist_actions_e.SEND_2XX, __tsip_transac_ist_cond_is_resp2invite, tsip_transac_ist_states_e.ACCEPTED, __tsip_transac_ist_Proceeding_2_Accepted_X_2xx, "tsip_transac_ist_Proceeding_2_Accepted_X_2xx"),

		/*=======================
		* === Completed === 
		*/
		// Completed -> (recv INVITE) -> Completed
		tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ist_states_e.COMPLETED, tsip_transac_ist_actions_e.RECV_INVITE, tsip_transac_ist_states_e.COMPLETED, __tsip_transac_ist_Completed_2_Completed_INVITE, "tsip_transac_ist_Completed_2_Completed_INVITE"),
		// Completed -> (timer G) -> Completed
		tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ist_states_e.COMPLETED, tsip_transac_ist_actions_e.TIMER_G, tsip_transac_ist_states_e.COMPLETED, __tsip_transac_ist_Completed_2_Completed_timerG, "tsip_transac_ist_Completed_2_Completed_timerG"),
		// Completed -> (timerH) -> Terminated
		tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ist_states_e.COMPLETED, tsip_transac_ist_actions_e.TIMER_H, tsip_transac_ist_states_e.TERMINATED, __tsip_transac_ist_Completed_2_Terminated_timerH, "tsip_transac_ist_Completed_2_Terminated_timerH"),
		// Completed -> (recv ACK) -> Confirmed
		tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ist_states_e.COMPLETED, tsip_transac_ist_actions_e.RECV_ACK, tsip_transac_ist_states_e.CONFIRMED, __tsip_transac_ist_Completed_2_Confirmed_ACK, "tsip_transac_ist_Completed_2_Confirmed_ACK"),
			
		/*=======================
		* === Accepted === 
		*/
		// Accepted -> (recv INVITE) -> Accepted
		tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ist_states_e.ACCEPTED, tsip_transac_ist_actions_e.RECV_INVITE, tsip_transac_ist_states_e.ACCEPTED, __tsip_transac_ist_Accepted_2_Accepted_INVITE, "tsip_transac_ist_Accepted_2_Accepted_INVITE"),
		// Accepted -> (send 2xx) -> Accepted
		tsk_fsm_entry.prototype.Create(tsip_transac_ist_states_e.ACCEPTED, tsip_transac_ist_actions_e.SEND_2XX, __tsip_transac_ist_cond_is_resp2invite, tsip_transac_ist_states_e.ACCEPTED, __tsip_transac_ist_Accepted_2_Accepted_2xx, "tsip_transac_ist_Accepted_2_Accepted_2xx"),
        // Accepted -> (timer X) -> Accepted
		tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ist_states_e.ACCEPTED, tsip_transac_ist_actions_e.TIMER_X, tsip_transac_ist_states_e.ACCEPTED, __tsip_transac_ist_Accepted_2_Accepted_timerX, "tsip_transac_ist_Accepted_2_Accepted_timerX"),
        // Accepted -> (recv ACK) -> Accepted
		tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ist_states_e.ACCEPTED, tsip_transac_ist_actions_e.RECV_ACK, tsip_transac_ist_states_e.ACCEPTED, __tsip_transac_ist_Accepted_2_Accepted_iACK, "tsip_transac_ist_Accepted_2_Accepted_iACK"),
		// Accepted -> (timerL) -> Terminated
		tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ist_states_e.ACCEPTED, tsip_transac_ist_actions_e.TIMER_L, tsip_transac_ist_states_e.TERMINATED, __tsip_transac_ist_Accepted_2_Terminated_timerL, "tsip_transac_ist_Accepted_2_Terminated_timerL"),

		/*=======================
		* === Confirmed === 
		*/
		// Confirmed -> (timerI) -> Terminated
		tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ist_states_e.CONFIRMED, tsip_transac_ist_actions_e.TIMER_I, tsip_transac_ist_states_e.TERMINATED, __tsip_transac_ist_Confirmed_2_Terminated_timerI, "tsip_transac_ist_Confirmed_2_Terminated_timerI"),


		/*=======================
		* === Any === 
		*/
		// Any -> (transport error) -> Terminated
		tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_transac_ist_actions_e.TRANSPORT_ERROR, tsip_transac_ist_states_e.TERMINATED, __tsip_transac_ist_Any_2_Terminated_X_transportError, "tsip_transac_ist_Any_2_Terminated_X_transportError"),
		// Any -> (error) -> Terminated
		tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_transac_ist_actions_e.ERROR, tsip_transac_ist_states_e.TERMINATED, __tsip_transac_ist_Any_2_Terminated_X_Error, "tsip_transac_ist_Any_2_Terminated_X_Error"),
		// Any -> (cancel) -> Terminated
		tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_transac_ist_actions_e.CANCEL, tsip_transac_ist_states_e.TERMINATED, __tsip_transac_ist_Any_2_Terminated_X_cancel, "tsip_transac_ist_Any_2_Terminated_X_cancel")
    );
}

tsip_transac_ist.prototype.start = function (o_request) {
	var i_ret = -1;
	if(o_request && !this.b_running){
		this.b_running = true;
		i_ret = this.fsm_act(tsip_transac_ist_actions_e.RECV_INVITE, o_request);
	}
	return i_ret;
}

tsip_transac_ist.prototype.set_last_response = function(o_response){
    this.o_lastResponse = o_response;
}

/* ======================== conds ======================== */
function __tsip_transac_ist_cond_is_resp2invite(o_transac, o_message) {
    return o_message.is_response_to_invite();
}

//--------------------------------------------------------
//				== STATE MACHINE BEGIN ==
//--------------------------------------------------------


function __tsip_transac_ist_Started_2_Proceeding_X_INVITE(ao_args) {
    var o_transac = ao_args[0];
    var o_request = ao_args[1];
	var i_ret = -1;

	/*	RFC 3261 - 17.2.1 INVITE Server Transaction
		When a server transaction is constructed for a request, it enters the
		"Proceeding" state.  The server transaction MUST generate a 100
		(Trying) response unless it knows that the TU will generate a
		provisional or final response within 200 ms, in which case it MAY
		generate a 100 (Trying) response.

		RFC 3262 - 3. UAS Behavior
		A UAS MUST NOT attempt to send a 100 (Trying) response reliably.
	*/
	if(o_request){
		var o_response;
		if((o_response = new tsip_response(100, "Trying (sent from the Transaction Layer)", o_request))){
			i_ret = (o_transac.send(o_transac.s_branch, o_response) > 0 ? 0 : -1);
            o_transac.set_last_response(o_response);
		}
	}
	if(i_ret == 0){ /* Send "100 Trying" is OK ==> alert dialog for the incoming INVITE */
        i_ret = o_transac.get_dialog().callback(tsip_dialog_event_type_e.I_MSG, o_request);
	}
	return i_ret;
}

function __tsip_transac_ist_Proceeding_2_Proceeding_X_INVITE(ao_args) {
    var o_transac = ao_args[0];
	var i_ret = -1;

	/*	RFC 3261 - 17.2.1 INVITE Server Transaction
		If a request retransmission is received while in the "Proceeding" state, the most
		recent provisional response that was received from the TU MUST be
		passed to the transport layer for retransmission.
	*/
	if(o_transac.o_lastResponse){
        i_ret = (o_transac.send(o_transac.s_branch, o_transac.o_lastResponse) > 0 ? 0 : -1);
	}

	return i_ret;
}

function __tsip_transac_ist_Proceeding_2_Proceeding_X_1xx(ao_args) {
    var o_transac = ao_args[0];
    var o_response = ao_args[1];
	var i_ret;

	/* Send to the transport layer */
    i_ret = (o_transac.send(o_transac.s_branch, o_response) > 0 ? 0 : -1);
	/* Update last response */
	o_transac.set_last_response(o_response);

	return i_ret;
}

function __tsip_transac_ist_Proceeding_2_Completed_X_300_to_699(ao_args) {
    var o_transac = ao_args[0];
    var o_response = ao_args[1];
	var i_ret;

	/*	RFC 3264 17.2.1 INVITE Server Transaction
		While in the "Proceeding" state, if the TU passes a response with
		status code from 300 to 699 to the server transaction, the response
		MUST be passed to the transport layer for transmission, and the state
		machine MUST enter the "Completed" state. For unreliable transports, timer G is set to fire in T1 seconds, 
		and is not set to fire for reliable transports.
	*/
	if(!o_transac.b_reliable){
        o_transac.timer_schedule('ist', 'G');
	}

	/* Send to the transport layer */
    i_ret = (o_transac.send(o_transac.s_branch, o_response) > 0 ? 0 : -1);

	/* Update last response */
    o_transac.set_last_response(o_response);

	/* RFC 3261 - 17.2.1 INVITE Server Transaction
		When the "Completed" state is entered, timer H MUST be set to fire in
		64*T1 seconds for all transports.
	*/
    o_transac.timer_schedule('ist', 'H');

	return i_ret;
}

function __tsip_transac_ist_Proceeding_2_Accepted_X_2xx(ao_args) {
    var o_transac = ao_args[0];
    var o_response = ao_args[1];
	var i_ret;

	/*	draft-sparks-sip-invfix-03 - 8.5. Pages 134 to 135
		If, while in the "Proceeding" state, the TU passes a 2xx response
		to the server transaction, the server transaction MUST pass this
		response to the transport layer for transmission.  It is not
		retransmitted by the server transaction; retransmissions of 2xx
		responses are handled by the TU.  The server transaction MUST then
		transition to the "Accepted" state.
	*/
	i_ret = (o_transac.send(o_transac.s_branch, o_response) > 0 ? 0 : -1);

	/* Update last response */
	o_transac.set_last_response(o_response);

    /* RFC 3261 - 13.3.1.4 The INVITE is Accepted
		Since 2xx is retransmitted end-to-end, there may be hops between
		UAS and UAC that are UDP.  To ensure reliable delivery across
		these hops, the response is retransmitted periodically even if the
		transport at the UAS is reliable.
	*/
    o_transac.timer_schedule('ist', 'X');
    o_transac.i_timerX <<= 1;

	/*	draft-sparks-sip-invfix-03 - 8.7. Page 137
		When the INVITE server transaction enters the "Accepted" state,
		Timer L MUST be set to fire in 64*T1 for all transports.  This
		value matches both Timer B in the next upstream client state
		machine (the amount of time the previous hop will wait for a
		response when no provisionals have been sent) and the amount of
		time this (or any downstream) UAS core might be retransmitting the
		2xx while waiting for an ACK.
	*/
	o_transac.timer_schedule('ist', 'L');

	return i_ret;
}

function __tsip_transac_ist_Completed_2_Completed_INVITE(ao_args) {
    var o_transac = ao_args[0];
	var i_ret;

	/*	RFC 3261 - 17.2.1 INVITE Server Transaction
		Furthermore, while in the "Completed" state, if a request retransmission is
		received, the server SHOULD pass the response to the transport for
		retransmission.
	*/
	if(o_transac.o_lastResponse){
        i_ret = (o_transac.send(o_transac.s_branch, o_transac.o_lastResponse) > 0 ? 0 : -1);
	}

    return i_ret;
}

function __tsip_transac_ist_Completed_2_Completed_timerG(ao_args) {
    var o_transac = ao_args[0];
	var i_ret;
	
	/*	RFC 3261 - 17.2.1 INVITE Server Transaction
		If timer G fires, the response is passed to the transport layer once 
		more for retransmission, and timer G is set to fire in MIN(2*T1, T2) seconds.  
		From then on, when timer G fires, the response is passed to the transport again for
		transmission, and timer G is reset with a value that doubles, unless
		that value exceeds T2, in which case it is reset with the value of T2.
	*/
	if(o_transac.o_lastResponse){
        i_ret = (o_transac.send(o_transac.s_branch, o_transac.o_lastResponse) > 0 ? 0 : -1);
	}
    o_transac.i_timerG = Math.min(o_transac.i_timerG << 1, o_transac.get_stack().o_timers.getT2());
    o_transac.timer_schedule('ist', 'G');

	return i_ret;
}

function __tsip_transac_ist_Completed_2_Terminated_timerH(ao_args) {
    var o_transac = ao_args[0];

	/*	RFC 3261 - 17.2.1 INVITE Server Transaction
		If timer H fires while in the "Completed" state, it implies that the
		ACK was never received.  In this case, the server transaction MUST
		transition to the "Terminated" state, and MUST indicate to the TU
		that a transaction failure has occurred.
	*/
    return o_transac.get_dialog().callback(tsip_dialog_event_type_e.TRANSPORT_ERROR, null);
}

function __tsip_transac_ist_Completed_2_Confirmed_ACK(ao_args) {
    var o_transac = ao_args[0];

	/*	RFC 3261 - 17.2.1 INVITE Server Transaction
		If an ACK is received while the server transaction is in the
		"Completed" state, the server transaction MUST transition to the
		"Confirmed" state.  As Timer G is ignored in this state, any
		retransmissions of the response will cease
	*/
    o_transac.timer_cancel('G'); /* To avoid warnings from FSM manager. */

	/*	RFC 3261 - 17.2.1 INVITE Server Transaction
		The purpose of the "Confirmed" state is to absorb any additional ACK
		messages that arrive, triggered from retransmissions of the final
		response.  When this state is entered, timer I is set to fire in T4
		seconds for unreliable transports, and zero seconds for reliable
		transports.
	*/
    o_transac.timer_schedule('ist', 'I'); /* Has the right value (zero of reliable and ...) */

	return 0;
}

function __tsip_transac_ist_Accepted_2_Accepted_INVITE(ao_args) {
    var o_transac = ao_args[0];
	
	/*	draft-sparks-sip-invfix-03 - 8.7. Page 137
		The purpose of the "Accepted" state is to absorb retransmissions
		of an accepted INVITE request.  Any such retransmissions are
		absorbed entirely within the server transaction.  They are not
		passed up to the TU since any downstream UAS cores that accepted
		the request have taken responsibility for reliability and will
		already retransmit their 2xx responses if neccessary.
	*/

	/*	Do not pass to the TU (see above)
		VERY IMPORTANT: INVITE dialog is responsible for reliability of the 2xx response.
	*/
    if (o_transac.o_lastResponse) {
        return (o_transac.send(o_transac.s_branch, o_transac.o_lastResponse) > 0 ? 0 : -1);
    }
	return 0;
}

function __tsip_transac_ist_Accepted_2_Accepted_2xx(ao_args) {
    var o_transac = ao_args[0];
    var o_response = ao_args[1];
	var i_ret;
	/*	draft-sparks-sip-invfix-03 - 8.7. Page 137
		While in the "Accepted" state, if the TU passes a 2xx response,
		the server transaction MUST pass the response to the transport
		layer for transmission.
	*/
	i_ret = (o_transac.send(o_transac.s_branch, o_response) > 0 ? 0 : -1);

	/* Update last response */
	o_transac.set_last_response(o_response);

	return i_ret;
}

/*	Accepted --> (timer X) --> Accepted
* Doubango specific
*/
function __tsip_transac_ist_Accepted_2_Accepted_timerX(ao_args){
	var o_transac = ao_args[0];
	if(o_transac.o_lastResponse){
		var i_ret = (o_transac.send(o_transac.s_branch, o_transac.o_lastResponse) > 0 ? 0 : -1);
		if (i_ret == 0) {
		    o_transac.i_timerX <<= 1;
		    o_transac.timer_schedule('ist', 'X');
		}
		return i_ret;
	}
	return 0;
}

  /* doubango-specific */
function __tsip_transac_ist_Accepted_2_Accepted_iACK(ao_args) {
    var o_transac = ao_args[0];
    var o_request = ao_args[1];
    o_transac.timer_cancel('X');
    return o_transac.get_dialog().callback(tsip_dialog_event_type_e.I_MSG, o_request);
}

function __tsip_transac_ist_Accepted_2_Terminated_timerL(ao_args) {
    /*	draft-sparks-sip-invfix-03 - 8.7. Page 137
    If Timer L fires while the INVITE server transaction is in the "Accepted" state, the transaction
    MUST transition to the "Terminated" state. Once the transaction is in the "Terminated" state, it MUST be
    destroyed immediately.
    */
    return 0;
}

function __tsip_transac_ist_Confirmed_2_Terminated_timerI(ao_args) {
    /*	RFC 3261 - 17.2.1 INVITE Server Transaction
    Once timer I fires, the server MUST transition to the
    "Terminated" state.

    Once the transaction is in the "Terminated" state, it MUST be
    destroyed immediately.  As with client transactions, this is needed
    to ensure reliability of the 2xx responses to INVITE.
    */
    return 0;
}

function __tsip_transac_ist_Any_2_Terminated_X_transportError(ao_args) {
    var o_transac = ao_args[0];

	/* Timers will be canceled by "tsip_transac_nist_OnTerminated" */

    return o_transac.get_dialog().callback(tsip_dialog_event_type_e.TRANSPORT_ERROR, null);
}

function __tsip_transac_ist_Any_2_Terminated_X_Error(ao_args) {
    var o_transac = ao_args[0];
    return o_transac.get_dialog().callback(tsip_dialog_event_type_e.ERROR, null);
}

/* doubango-specific */
function __tsip_transac_ist_Any_2_Terminated_X_cancel(ao_args) {
    return 0;
}




//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//				== STATE MACHINE END ==
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function __tsip_transac_ist_onterm(o_self) {
    o_self.timer_cancel('H');
    o_self.timer_cancel('I');
    o_self.timer_cancel('G');
    o_self.timer_cancel('L');
    o_self.timer_cancel('X');

    return o_self.deinit();
}

function __tsip_transac_ist_event_callback(o_self, e_event_type, o_message) {
    if (!o_self) {
        tsk_utils_log_error("Invalid argument");
        return -1;
    }
    var i_ret = -1;

    switch (e_event_type) {
        case tsip_transac_event_type_e.INCOMING_MSG: /* From Transport Layer to Transaction Layer */
            {
                if (o_message && o_message.is_request()) {
                    if (o_message.is_invite()) {
                        i_ret = o_self.fsm_act(tsip_transac_ist_actions_e.RECV_INVITE, o_message);
                    }
                    else if (o_message.is_ack()) {
                        i_ret = o_self.fsm_act(tsip_transac_ist_actions_e.RECV_ACK, o_message);
                    }
                }
                break;
            }

        case tsip_transac_event_type_e.OUTGOING_MSG: /* From TU to Transport Layer */
            {
                if (o_message && o_message.is_response()) {
                    if (o_message.is_1xx()) {
                        i_ret = o_self.fsm_act(tsip_transac_ist_actions_e.SEND_1XX, o_message);
                    }
                    else if (o_message.is_2xx()) {
                        i_ret = o_self.fsm_act(tsip_transac_ist_actions_e.SEND_2XX, o_message);
                    }
                    else if (o_message.is_3456()) {
                        i_ret = o_self.fsm_act(tsip_transac_ist_actions_e.SEND_300_to_699, o_message);
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
                i_ret = o_self.fsm_act(tsip_transac_ist_actions_e.ERROR, o_message);
                break;
            }

        case tsip_transac_event_type_e.TRANSPORT_ERROR:
            {
                i_ret = o_self.fsm_act(tsip_transac_ist_actions_e.TRANSPORT_ERROR, o_message);
                break;
            }
    }

    return i_ret;
}

function __tsip_transac_ist_timer_callback(o_self, o_timer) {
    if (o_self) {
        if (o_timer == o_self.o_timerH) {
            o_self.fsm_act(tsip_transac_ist_actions_e.TIMER_H, null);
        }
        else if (o_timer == o_self.o_timerI) {
            o_self.fsm_act(tsip_transac_ist_actions_e.TIMER_I, null);
        }
        else if (o_timer == o_self.o_timerG) {
            o_self.fsm_act(tsip_transac_ist_actions_e.TIMER_G, null);
        }
        else if (o_timer == o_self.o_timerL) {
            o_self.fsm_act(tsip_transac_ist_actions_e.TIMER_L, null);
        }
        else if (o_timer == o_self.o_timerX) {
            o_self.fsm_act(tsip_transac_ist_actions_e.TIMER_X, null);
        }
    }
}
