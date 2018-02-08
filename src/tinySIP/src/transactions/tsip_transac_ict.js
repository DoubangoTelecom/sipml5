/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
/**
* SIP INVITE Client Transaction as per RFC 3261 subclause 17.1.1.
*/

tsip_transac_ict.prototype = Object.create(tsip_transac.prototype);
tsip_transac_ict.prototype.__b_debug_state_machine = false;

var tsip_transac_ict_actions_e =
{
	CANCEL: tsip_action_type_e.CANCEL,

	SEND: 10001,
	TIMER_A: 10002,
	TIMER_B: 10003,
	TIMER_D: 10004,
	TIMER_M: 10005,
	I_1XX: 10006,
	I_2XX: 10007,
	I_300_to_699: 10008,
	TRANSPOR_TERROR: 10009,
	ERROR: 10010
};

var tsip_transac_ict_states_e =
{
    STARTED: 0,
	CALLING: 1,
	PROCEEDING: 2,
	COMPLETED: 3,
	ACCEPTED: 4,
	TERMINATED: 5
};

function tsip_transac_ict(b_reliable, i_cseq_value, s_callid, o_dialog) {
    var o_stack;
    if (!o_dialog || !(o_stack = o_dialog.get_stack())) {
        tsk_utils_log_error("Invalid argument");
        return null;
    }
    tsip_transac.call(this);

    this.init(tsip_transac_type_e.ICT, b_reliable, i_cseq_value, "INVITE", s_callid, o_dialog, tsip_transac_ict_states_e.STARTED, tsip_transac_ict_states_e.TERMINATED);
    this.set_callback(__tsip_transac_ict_event_callback);
    this.o_fsm.set_debug_enabled(tsip_transac_ict.prototype.__b_debug_state_machine);
    this.o_fsm.set_onterm_callback(__tsip_transac_ict_onterm, this);

    /* Timers */
    this.o_timerA = null;
    this.o_timerB = null;
    this.o_timerD = null;
    this.o_timerM = null;

    this.i_timerA = o_stack.o_timers.getA();
    this.i_timerB = o_stack.o_timers.getB();
    this.i_timerD = b_reliable ? 0 : o_stack.o_timers.getD();
    this.i_timerM = o_stack.o_timers.getM();

    // initialize the state machine
    this.o_fsm.set(
        /*=======================
        * === Started === 
        */
        // Started -> (Send) -> Calling
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ict_states_e.STARTED, tsip_transac_ict_actions_e.SEND, tsip_transac_ict_states_e.CALLING, __tsip_transac_ict_Started_2_Calling_X_send, "tsip_transac_ict_Started_2_Calling_X_send"),
        // Started -> (Any) -> Started
        tsk_fsm_entry.prototype.CreateAlwaysNothing(tsip_transac_ict_states_e.STARTED, "tsip_transac_ict_Started_2_Started_X_any"),

        /*=======================
        * === Calling === 
        */
        // Calling -> (timerA) -> Calling
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ict_states_e.CALLING, tsip_transac_ict_actions_e.TIMER_A, tsip_transac_ict_states_e.CALLING, __tsip_transac_ict_Calling_2_Calling_X_timerA, "tsip_transac_ict_Calling_2_Calling_X_timerA"),
        // Calling -> (timerB) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ict_states_e.CALLING, tsip_transac_ict_actions_e.TIMER_B, tsip_transac_ict_states_e.TERMINATED, __tsip_transac_ict_Calling_2_Terminated_X_timerB, "tsip_transac_ict_Calling_2_Terminated_X_timerB"),
        // Calling -> (300-699) -> Completed
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ict_states_e.CALLING, tsip_transac_ict_actions_e.I_300_to_699, tsip_transac_ict_states_e.COMPLETED, __tsip_transac_ict_Calling_2_Completed_X_300_to_699, "tsip_transac_ict_Calling_2_Completed_X_300_to_699"),
        // Calling  -> (1xx) -> Proceeding
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ict_states_e.CALLING, tsip_transac_ict_actions_e.I_1XX, tsip_transac_ict_states_e.PROCEEDING, __tsip_transac_ict_Calling_2_Proceeding_X_1xx, "tsip_transac_ict_Calling_2_Proceeding_X_1xx"),
        // Calling  -> (2xx) -> Accepted
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ict_states_e.CALLING, tsip_transac_ict_actions_e.I_2XX, tsip_transac_ict_states_e.ACCEPTED, __tsip_transac_ict_Calling_2_Accepted_X_2xx, "tsip_transac_ict_Calling_2_Accepted_X_2xx"),

        /*=======================
        * === Proceeding === 
        */
        // Proceeding -> (1xx) -> Proceeding
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ict_states_e.PROCEEDING, tsip_transac_ict_actions_e.I_1XX, tsip_transac_ict_states_e.PROCEEDING, __tsip_transac_ict_Proceeding_2_Proceeding_X_1xx, "tsip_transac_ict_Proceeding_2_Proceeding_X_1xx"),
        // Proceeding -> (300-699) -> Completed
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ict_states_e.PROCEEDING, tsip_transac_ict_actions_e.I_300_to_699, tsip_transac_ict_states_e.COMPLETED, __tsip_transac_ict_Proceeding_2_Completed_X_300_to_699, "tsip_transac_ict_Proceeding_2_Completed_X_300_to_699"),
        // Proceeding -> (2xx) -> Accepted
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ict_states_e.PROCEEDING, tsip_transac_ict_actions_e.I_2XX, tsip_transac_ict_states_e.ACCEPTED, __tsip_transac_ict_Proceeding_2_Accepted_X_2xx, "tsip_transac_ict_Proceeding_2_Accepted_X_2xx"),

        /*=======================
        * === Completed === 
        */
        // Completed -> (300-699) -> Completed
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ict_states_e.COMPLETED, tsip_transac_ict_actions_e.I_300_to_699, tsip_transac_ict_states_e.COMPLETED, __tsip_transac_ict_Completed_2_Completed_X_300_to_699, "tsip_transac_ict_Completed_2_Completed_X_300_to_699"),
        // Completed -> (timerD) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ict_states_e.COMPLETED, tsip_transac_ict_actions_e.TIMER_D, tsip_transac_ict_states_e.TERMINATED, __tsip_transac_ict_Completed_2_Terminated_X_timerD, "tsip_transac_ict_Completed_2_Terminated_X_timerD"),

        /*=======================
        * === Accepted === 
        */
        // Accepted -> (2xx) -> Accepted
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ict_states_e.ACCEPTED, tsip_transac_ict_actions_e.I_2XX, tsip_transac_ict_states_e.ACCEPTED, __tsip_transac_ict_Accepted_2_Accepted_X_2xx, "tsip_transac_ict_Accepted_2_Accepted_X_2xx"),
        // Accepted -> (timerM) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsip_transac_ict_states_e.ACCEPTED, tsip_transac_ict_actions_e.TIMER_M, tsip_transac_ict_states_e.TERMINATED, __tsip_transac_ict_Accepted_2_Terminated_X_timerM, "tsip_transac_ict_Accepted_2_Terminated_X_timerM"),

        /*=======================
        * === Any === 
        */
        // Any -> (transport error) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_transac_ict_actions_e.TRANSPORT_ERROR, tsip_transac_ict_states_e.TERMINATED, __tsip_transac_ict_Any_2_Terminated_X_transportError, "tsip_transac_ict_Any_2_Terminated_X_transportError"),
        // Any -> (transport error) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_transac_ict_actions_e.ERROR, tsip_transac_ict_states_e.TERMINATED, __tsip_transac_ict_Any_2_Terminated_X_Error, "tsip_transac_ict_Any_2_Terminated_X_Error"),
        // Any -> (cancel) -> Terminated
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_transac_ict_actions_e.CANCEL, tsip_transac_ict_states_e.TERMINATED, __tsip_transac_ict_Any_2_Terminated_X_cancel, "tsip_transac_ict_Any_2_Terminated_X_cancel")
    );
}

tsip_transac_ict.prototype.start = function (o_request) {
	var i_ret = -1;
	if(o_request && !this.b_running){
		/* Add branch to the new client transaction */
		this.s_branch = tsk_string_format("{0}{1}", tsip_transac.prototype.__magic_cookie, tsk_string_random(32));

		this.b_running = true;
		this.o_request = o_request;

		i_ret = this.fsm_act(tsip_transac_ict_actions_e.SEND, o_request);
	}
	return i_ret;
}

tsip_transac_ict.prototype.send_ack = function(o_response){
	if(!this.o_request || !o_response){
        tsk_utils_log_error("Invalid state");
		return -1;
	}

	// check lastINVITE
	if(	!this.o_request.o_hdr_firstVia ||
		!this.o_request.o_hdr_From || 
		!this.o_request.line.request.o_uri || 
		!this.o_request.o_hdr_Call_ID || 
		!this.o_request.o_hdr_CSeq)
	{
		tsk_utils_log_error("Invalid INVITE message");
		return -2;
	}

	// check response
	if(!o_response.o_hdr_To){
		tsk_utils_log_error("Invalid response message");
		return -3;
	}

    var i_ret = -1;
	var o_request = null;

	/*	RFC 3261 - 17.1.1.3 Construction of the ACK Request
		
		The ACK request constructed by the client transaction MUST contain
		values for the Call-ID, From, and Request-URI that are equal to the
		values of those header fields in the request passed to the transport
		by the client transaction (call this the "original request").  The To
		header field in the ACK MUST equal the To header field in the
		response being acknowledged, and therefore will usually differ from
		the To header field in the original request by the addition of the
		tag parameter.  The ACK MUST contain a single Via header field, and
		this MUST be equal to the top Via header field of the original
		request.  The CSeq header field in the ACK MUST contain the same
		value for the sequence number as was present in the original request,
		but the method parameter MUST be equal to "ACK".

		If the INVITE request whose response is being acknowledged had Route
		header fields, those header fields MUST appear in the ACK.  This is
		to ensure that the ACK can be routed properly through any downstream
		stateless proxies.

		Although any request MAY contain a body, a body in an ACK is special
		since the request cannot be rejected if the body is not understood.
		Therefore, placement of bodies in ACK for non-2xx is NOT RECOMMENDED,
		but if done, the body types are restricted to any that appeared in
		the INVITE, assuming that the response to the INVITE was not 415.  If
		it was, the body in the ACK MAY be any type listed in the Accept
		header field in the 415.
	*/
	if((o_request = new tsip_request("ACK", this.o_request.line.request.o_uri, this.o_request.o_hdr_From.o_uri, o_response.o_hdr_To.o_uri, this.o_request.o_hdr_Call_ID.s_value, this.o_request.o_hdr_CSeq.i_seq))){
		// Via
		o_request.o_hdr_firstVia = this.o_request.o_hdr_firstVia;
		// tags
		if(o_request.o_hdr_From){
			o_request.o_hdr_From.s_tag = this.o_request.o_hdr_From.s_tag;
		}
		if(o_request.o_hdr_To){
			o_request.o_hdr_To.s_tag = o_response.o_hdr_To.s_tag;
        }

        /* Add outbound proxy */
        // The outbound proxy is added as Route header only if the transport is WS/WSS to allow webrtc2sip to forward the request
        // For all other protocols (e.g UDP) the request will already be sent to the outbound proxy address
        if (this.get_stack().network.e_proxy_cscf_type == tsip_transport_type_e.WS || this.get_stack().network.e_proxy_cscf_type == tsip_transport_type_e.WSS) {
        var s_proxy_outbound = this.get_stack().__get_proxy_outbound_uri_string();
            if (s_proxy_outbound) {
                o_request.add_header(new tsip_header_Dummy("Route", s_proxy_outbound), true/*top*/);
            }
        }
		// Routes
		for(var i = 0; i < this.o_request.ao_headers.length; ++i){
			if(this.o_request.ao_headers[i].e_type == tsip_header_type_e.Route){
                o_request.add_header(this.o_request.ao_headers[i]);
			}
		}

		// SigComp
		o_request.s_sigcomp_id = this.get_session().s_sigcomp_id;

		// send the request
        i_ret = this.send(o_request.o_hdr_firstVia.s_branch, o_request);
	}

	return i_ret;
}

//--------------------------------------------------------
//				== STATE MACHINE BEGIN ==
//--------------------------------------------------------

function __tsip_transac_ict_Started_2_Calling_X_send(ao_args) {
    var o_transac = ao_args[0];

    //== Send the request
    o_transac.send(o_transac.s_branch, o_transac.o_request);

	/* RFC 3261 - 17.1.1.2 Formal Description
		If an unreliable transport is being used, the client transaction MUST 
		start timer A with a value of T1.
		If a reliable transport is being used, the client transaction SHOULD
		NOT start timer A (Timer A controls request retransmissions).  For
		any transport, the client transaction MUST start timer B with a value
		of 64*T1 seconds (Timer B controls transaction timeouts).
	*/
    if (!o_transac.b_reliable) {
        o_transac.timer_schedule('ict', 'A');
    }
	o_transac.timer_schedule('ict', 'B');

	return 0;
}

function __tsip_transac_ict_Calling_2_Calling_X_timerA(ao_args) {
    var o_transac = ao_args[0];

	/*	RFC 3261 - 17.1.1.2 Formal Description
		When timer A fires, the client transaction MUST retransmit the
		request by passing it to the transport layer, and MUST reset the
		timer with a value of 2*T1.  The formal definition of retransmit

		within the context of the transaction layer is to take the message
		previously sent to the transport layer and pass it to the transport
		layer once more.

		When timer A fires 2*T1 seconds later, the request MUST be
		retransmitted again (assuming the client transaction is still in this
		state).  This process MUST continue so that the request is
		retransmitted with intervals that double after each transmission.
		These retransmissions SHOULD only be done while the client
		transaction is in the "calling" state.
	*/

	//== Send the request
	o_transac.send(o_transac.s_branch, o_transac.o_request);
    	
    o_transac.i_timerA <<= 1; /* Will not raise indefinitely ==> see timer B */
	o_transac.timer_schedule('ict', 'A');

	return 0;
}

function __tsip_transac_ict_Calling_2_Terminated_X_timerB(ao_args) {
    var o_transac = ao_args[0];

	/*	RFC 3261 - 17.1.1.2 Formal Description
		If the client transaction is still in the "Calling" state when timer
		B fires, the client transaction SHOULD inform the TU that a timeout
		has occurred.  The client transaction MUST NOT generate an ACK.  The
		value of 64*T1 is equal to the amount of time required to send seven
		requests in the case of an unreliable transport.
	*/
    o_transac.get_dialog().callback(tsip_dialog_event_type_e.TIMEDOUT, null);
	
	return 0;
}

function __tsip_transac_ict_Calling_2_Completed_X_300_to_699(ao_args) {
    var o_transac = ao_args[0];
	var o_response = ao_args[1];
	var i_ret;

	/*	draft-sparks-sip-invfix-03 - 8.4.  Pages 126 through 128
		When in either the "Calling" or "Proceeding" states, reception of
		a response with status code from 300-699 MUST cause the client
		transaction to transition to "Completed".  The client transaction
		MUST pass the received response up to the TU, and the client
		transaction MUST generate an ACK request, even if the transport is
		reliable (guidelines for constructing the ACK from the response
		are given in Section 17.1.1.3) and then pass the ACK to the
		transport layer for transmission.  The ACK MUST be sent to the
		same address, port, and transport to which the original request
		was sent.
	*/
	/* Do not retransmit */
	if(!o_transac.b_reliable){
		o_transac.timer_cancel('A');
	}
	o_transac.timer_cancel('B'); /* Now it's up to the UAS to update the FSM. */

	/*	draft-sparks-sip-invfix-03 - 8.4.  Pages 126 through 128
		The client transaction MUST start timer D when it enters the
		"Completed" state for any reason, with a value of at least 32
		seconds for unreliable transports, and a value of zero seconds for
		reliable transports.  Timer D reflects the amount of time that the
		server transaction can remain in the "Completed" state when
		unreliable transports are used.
   */
	o_transac.timer_schedule('ict', 'D'); /* timerD already have the right value (0 if reliable and non-zero otherwise) */

	/* Send ACK */
	if ((i_ret = o_transac.send_ack(o_response)) <= 0) {
	    return i_ret;
	}

	/* Pass the response to the dialog. */
    return o_transac.get_dialog().callback(tsip_dialog_event_type_e.I_MSG, o_response);
}

function __tsip_transac_ict_Calling_2_Proceeding_X_1xx(ao_args) {
    var o_transac = ao_args[0];
	var o_response = ao_args[1];
	
	/*	RFC 3261 - 17.1.1.2 Formal Description
		If the client transaction receives a provisional response while in
		the "Calling" state, it transitions to the "Proceeding" state. In the
		"Proceeding" state, the client transaction SHOULD NOT retransmit the
		request any longer. Furthermore, the provisional response MUST be
		passed to the TU.  Any further provisional responses MUST be passed
		up to the TU while in the "Proceeding" state.
	*/
	
	/* Do not retransmit */
	if(!o_transac.b_reliable){
		o_transac.timer_cancel('A');
	}
	o_transac.timer_cancel('B'); /* Now it's up to the UAS to update the FSM. */
	
	/* Pass the provisional response to the dialog. */
	return o_transac.get_dialog().callback(tsip_dialog_event_type_e.I_MSG, o_response);
}

function __tsip_transac_ict_Calling_2_Accepted_X_2xx(ao_args) {
    var o_transac = ao_args[0];
	var o_response = ao_args[1];
	
	/*	draft-sparks-sip-invfix-03 - 8.4.  Pages 126 through 128
		When a 2xx response is received while in either the "Calling" or
		"Proceeding" states, the client transaction MUST transition to the
		"Accepted" state, and Timer M MUST be started with a value of
		64*T1.  The 2xx response MUST be passed up to the TU.  The client
		transaction MUST NOT generate an ACK to the 2xx response - its
		handling is delegated to the TU.
	*/
	
	/* Schedule timer M */
	o_transac.timer_schedule('ict', 'M');
	
	/* Cancel timers A and B */
	if(!o_transac.b_reliable){
		o_transac.timer_schedule('ict', 'A');
	}
	o_transac.timer_schedule('ict', 'B');

	/* pass the response to the TU (dialog) */
	return o_transac.get_dialog().callback(tsip_dialog_event_type_e.I_MSG, o_response);
}

function __tsip_transac_ict_Proceeding_2_Proceeding_X_1xx(ao_args) {
    var o_transac = ao_args[0];
	var o_response = ao_args[1];

	/* pass the response to the TU (dialog) */
	return o_transac.get_dialog().callback(tsip_dialog_event_type_e.I_MSG, o_response);
}

function __tsip_transac_ict_Proceeding_2_Completed_X_300_to_699(ao_args) {
    var o_transac = ao_args[0];
	var o_response = ao_args[1];
	var i_ret;

	/*	draft-sparks-sip-invfix-03 - 8.4.  Pages 126 through 128
		When in either the "Calling" or "Proceeding" states, reception of
		a response with status code from 300-699 MUST cause the client
		transaction to transition to "Completed".  The client transaction
		MUST pass the received response up to the TU, and the client
		transaction MUST generate an ACK request, even if the transport is
		reliable (guidelines for constructing the ACK from the response
		are given in Section 17.1.1.3) and then pass the ACK to the
		transport layer for transmission.  The ACK MUST be sent to the
		same address, port, and transport to which the original request
		was sent.
	*/
	/* Do not retransmit */
	if(!o_transac.b_reliable){
		o_transac.timer_cancel('A');
	}
	o_transac.timer_cancel('B'); /* Now it's up to the UAS to update the FSM. */

	/*	draft-sparks-sip-invfix-03 - 8.4.  Pages 126 through 128
		The client transaction MUST start timer D when it enters the
		"Completed" state for any reason, with a value of at least 32
		seconds for unreliable transports, and a value of zero seconds for
		reliable transports.  Timer D reflects the amount of time that the
		server transaction can remain in the "Completed" state when
		unreliable transports are used.
   */
	o_transac.timer_schedule('ict', 'D'); /* timerD already have the right value (0 if reliable and non-zero otherwise) */

	/* Send ACK */
	if((i_ret = o_transac.send_ack(o_response)) <= 0){
		return i_ret;
	}

	/* Pass the response to the dialog */
    return o_transac.get_dialog().callback(tsip_dialog_event_type_e.I_MSG, o_response);
}

function __tsip_transac_ict_Proceeding_2_Accepted_X_2xx(ao_args) {
    var o_transac = ao_args[0];
	var o_response = ao_args[1];

	/*	draft-sparks-sip-invfix-03 - 8.4.  Pages 126 through 128
		When a 2xx response is received while in either the "Calling" or
		"Proceeding" states, the client transaction MUST transition to the
		"Accepted" state, and Timer M MUST be started with a value of
		64*T1.  The 2xx response MUST be passed up to the TU.  The client
		transaction MUST NOT generate an ACK to the 2xx response - its
		handling is delegated to the TU.
	*/

	/* Schedule timer M */
	o_transac.timer_schedule('ict', 'M');

	/* Cancel timers A and B */
	if(!o_transac.b_reliable){
		o_transac.timer_schedule('ict', 'A');
	}
	o_transac.timer_schedule('ict', 'B');

	/* pass the response to the TU (dialog) */
	return o_transac.get_dialog().callback(tsip_dialog_event_type_e.I_MSG, o_response);
}

function __tsip_transac_ict_Completed_2_Completed_X_300_to_699(ao_args) {
    var o_transac = ao_args[0];
    var o_response = ao_args[1];

	/*	draft-sparks-sip-invfix-03 - 8.4.  Pages 126 through 128
		Any retransmissions of a response with status code 300-699 that
		are received while in the "Completed" state MUST cause the ACK to
		be re-passed to the transport layer for retransmission, but the
		newly received response MUST NOT be passed up to the TU.
	*/

    return (o_transac.send_ack(o_response) <= 0 ? -1 : 0);
}

function __tsip_transac_ict_Completed_2_Terminated_X_timerD(ao_args) {
    /*	draft-sparks-sip-invfix-03 - 8.4.  Pages 126 through 128
    If timer D fires while the client transaction is in the
    "Completed" state, the client transaction MUST move to the
    "Terminated" state.
    */

    /* Timers will be canceled by "tsip_transac_ict_OnTerminated" */
    return 0;
}

function __tsip_transac_ict_Accepted_2_Accepted_X_2xx(ao_args) {
    var o_transac = ao_args[0];
    var o_response = ao_args[1];

	/*	draft-sparks-sip-invfix-03 - 7.2. UAC Impacts
		A 2xx response received while in the "Accepted" state MUST be passed to the TU and
		the machine remains in the "Accepted" state.  The client transaction
		MUST NOT generate an ACK to any 2xx response on its own.  The TU
		responsible for the transaction will generate the ACK.
	*/
	
	/* Pass the response to the TU. */
    return o_transac.get_dialog().callback(tsip_dialog_event_type_e.I_MSG, o_response);
}

function __tsip_transac_ict_Accepted_2_Terminated_X_timerM(ao_args) {
    /*	draft-sparks-sip-invfix-03 - 8.4.  Pages 126 through 128
    If timer M fires while the client transaction is in the "Accepted"
    state, the client transaction MUST move to the "Terminated" state.
    */
    return 0;
}

function __tsip_transac_ict_Any_2_Terminated_X_transportError(ao_args) {
    var o_transac = ao_args[0];

	/* Timers will be canceled by "tsip_transac_ict_OnTerminated" */

    return o_transac.get_dialog().callback(tsip_dialog_event_type_e.TRANSPORT_ERROR, null);
}

function __tsip_transac_ict_Any_2_Terminated_X_Error(ao_args) {
    var o_transac = ao_args[0];

	/* Timers will be canceled by "tsip_transac_ict_OnTerminated" */

    return o_transac.get_dialog().callback(tsip_dialog_event_type_e.ERROR, null);
}

function __tsip_transac_ict_Any_2_Terminated_X_cancel(ao_args) {
    /* doubango-specific */
    return 0;
}


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//				== STATE MACHINE END ==
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function __tsip_transac_ict_onterm(o_self) {
    o_self.timer_cancel('A');
    o_self.timer_cancel('B');
    o_self.timer_cancel('D');
    o_self.timer_cancel('M');

    return o_self.deinit();
}

function __tsip_transac_ict_event_callback(o_self, e_event_type, o_message) {
    if (!o_self) {
        tsk_utils_log_error("Invalid argument");
        return -1;
    }
    var i_ret = 0;

    switch (e_event_type) {
        case tsip_transac_event_type_e.INCOMING_MSG:
            {
                if (o_message && o_message.is_response()) {
                    if (o_message.is_1xx()) {
                        i_ret = o_self.fsm_act(tsip_transac_ict_actions_e.I_1XX, o_message);
                    }
                    else if (o_message.is_2xx()) {
                        i_ret = o_self.fsm_act(tsip_transac_ict_actions_e.I_2XX, o_message);
                    }
                    else if (o_message.is_3456()) {
                        i_ret = o_self.fsm_act(tsip_transac_ict_actions_e.I_300_to_699, o_message);
                    }
                    else {
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
                i_ret = o_self.fsm_act(tsip_transac_ict_actions_e.ERROR, o_message);
                break;
            }

        case tsip_transac_event_type_e.TRANSPORT_ERROR:
            {
                i_ret = o_self.fsm_act(tsip_transac_ict_actions_e.TRANSPORT_ERROR, o_message);
                break;
            }
    }

    return i_ret;
}

function __tsip_transac_ict_timer_callback(o_self, o_timer) {
    if (o_self) {
        if (o_timer == o_self.o_timerA) {
            o_self.fsm_act(tsip_transac_ict_actions_e.TIMER_A, null);
        }
        else if (o_timer == o_self.o_timerB) {
            o_self.fsm_act(tsip_transac_ict_actions_e.TIMER_B, null);
        }
        else if (o_timer == o_self.o_timerD) {
            o_self.fsm_act(tsip_transac_ict_actions_e.TIMER_D, null);
        }
        else if (o_timer == o_self.o_timerM) {
            o_self.fsm_act(tsip_transac_ict_actions_e.TIMER_M, null);
        }
    }
}

