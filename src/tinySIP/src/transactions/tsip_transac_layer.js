/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
function tsip_transac_layer(o_stack) {
    if (!o_stack) {
        tsk_utils_log_error("Invalid argument");
        return null;
    }

    this.o_stack = o_stack;
    this.ao_transacs = new Array();
}

tsip_transac_layer.prototype.transac_new = function (b_is_ct, o_message, o_dialog) {
    if (!o_message || !o_message.o_hdr_CSeq || !o_message.o_hdr_Call_ID) {
        tsk_utils_log_error("Invalid argument");
        return null;
    }

    var o_transac = null;

    while (this.b_locked){}

    this.b_locked = true;

    var b_reliable = true; // WebSockets
    if (this.o_stack.o_layer_transport.ao_transports.length > 0) {
        b_reliable = this.o_stack.o_layer_transport.ao_transports[0].is_reliable();
    }

    if (o_message) {
        if (o_message.is_request()) {
            if (b_is_ct)/* Client transaction */
            {
                if (o_message.is_invite()) {
                    // INVITE Client transaction (ICT)
                    o_transac = new tsip_transac_ict(b_reliable, o_message.o_hdr_CSeq.i_seq, o_message.o_hdr_Call_ID.s_value, o_dialog);
                }
                else {
                    // NON-INVITE Client transaction (NICT)
                    o_transac = new tsip_transac_nict(b_reliable, o_message.o_hdr_CSeq.i_seq, o_message.o_hdr_CSeq.s_method, o_message.o_hdr_Call_ID.s_value, o_dialog);
                }
            }
            else	/* Server transaction */
            {
                if (o_message.is_invite()) {
                    // INVITE Server transaction (IST)
                    o_transac = new tsip_transac_ist(b_reliable, o_message.o_hdr_CSeq.i_seq, o_message.o_hdr_Call_ID.s_value, o_dialog);
                }
                else {
                    // NON-INVITE Server transaction (NIST)
                    o_transac = new tsip_transac_nist(b_reliable, o_message.o_hdr_CSeq.i_seq, o_message.o_hdr_CSeq.s_method, o_message.o_hdr_Call_ID.s_value, o_dialog);
                }

                if (o_transac) { /* Copy branch from the message */
                    o_transac.s_branch = o_message.o_hdr_firstVia.s_branch;
                }
            }

            /* Add new transaction */
            if (o_transac) {
                this.ao_transacs.push(o_transac);
            }
        }
    }

    this.b_locked = false;

    return o_transac;
}

tsip_transac_layer.prototype.indexof = function (o_transac) {
    var i_index = -1;
    if (o_transac) {
        while (this.b_locked){}

        this.b_locked = true;
        for(var i = 0; i < this.ao_transacs.length; ++i){
            if(o_transac == this.ao_transacs[i]){
                i_index = i;
                break;
            }
        }
        this.b_locked = false;
    }
    return i_index;
}

tsip_transac_layer.prototype.remove = function (o_transac) {
    if (o_transac) {
        while (this.b_locked){}

        this.b_locked = true;
        for (var i = 0; i < this.ao_transacs.length; ++i) {
            if (o_transac == this.ao_transacs[i]) {
                this.ao_transacs.splice(i, 1);
                break;
            }
        }
        this.b_locked = false;
    }
};

tsip_transac_layer.prototype.cancel_by_dialog = function (o_dialog) {
    if (!o_dialog) {
        tsk_utils_log_error("Invalid argument");
        return -1;
    }

    var o_transac = null;

    while (this.b_locked){}

    this.b_locked = true;

    for (var i = 0; i < this.ao_transacs.length; ++i) {
        o_transac = this.ao_transacs[i];
        if (o_dialog.compare(o_transac.get_dialog()) == 0) {
            // async call to avoid dealoc
            var _o_transac = o_transac; // https://code.google.com/p/sipml5/issues/detail?id=173
            setTimeout(function () { _o_transac.fsm_act(tsip_action_type_e.CANCEL, null); }, 1);
        }
    }

    this.b_locked = false;

    return 0;
};

tsip_transac_layer.prototype.find_client = function (o_response) {
    if (!o_response) {
        tsk_utils_log_error("Invalid argument");
        return null;
    }

    /*
        RFC 3261 - 17.1.3 Matching Responses to Client Transactions

        When the transport layer in the client receives a response, it has to
        determine which client transaction will handle the response, so that
        the processing of Sections 17.1.1 and 17.1.2 can take place.  The
        branch parameter in the top Via header field is used for this
        purpose.  A response matches a client transaction under two
        conditions:

        1.  If the response has the same value of the branch parameter in
        the top Via header field as the branch parameter in the top
        Via header field of the request that created the transaction.

        2.  If the method parameter in the CSeq header field matches the
        method of the request that created the transaction.  The
        method is needed since a CANCEL request constitutes a
        different transaction, but shares the same value of the branch
        parameter.
    */

    var o_ret = null;
	var o_transac;

	/*	Check first Via/CSeq validity.
	*/
	if(!o_response.o_hdr_firstVia || !o_response.o_hdr_CSeq){
		return null;
	}

    while (this.b_locked){}

	this.b_locked = true;

	for(var i = 0; i < this.ao_transacs.length; ++i){
		o_transac = this.ao_transacs[i];
		if( (o_transac.s_branch == o_response.o_hdr_firstVia.s_branch) 
			&& (o_transac.s_cseq_method == o_response.o_hdr_CSeq.s_method)){
		    o_ret = o_transac;
			break;
		}
	}

	this.b_locked = false;

    return o_ret;
};

tsip_transac_layer.prototype.find_server = function(o_message)
{
	/*
	   RFC 3261 - 17.2.3 Matching Requests to Server Transactions

	   When a request is received from the network by the server, it has to
	   be matched to an existing transaction.  This is accomplished in the
	   following manner.

	   The branch parameter in the topmost Via header field of the request
	   is examined.  If it is present and begins with the magic cookie
	   "z9hG4bK", the request was generated by a client transaction
	   compliant to this specification.  Therefore, the branch parameter
	   will be unique across all transactions sent by that client.  The
	   request matches a transaction if:

		  1. the branch parameter in the request is equal to the one in the
			 top Via header field of the request that created the
			 transaction, and

		  2. the sent-by value in the top Via of the request is equal to the
			 one in the request that created the transaction, and

		  3. the method of the request matches the one that created the
			 transaction, except for ACK, where the method of the request
			 that created the transaction is INVITE.
	*/
	var o_ret = null;
	var o_transac;

	/*	Check first Via/CSeq validity */
	if(!o_message.o_hdr_firstVia || !o_message.o_hdr_CSeq || !o_message.o_hdr_Call_ID){
		return null;
	}

	while (this.b_locked){}

	this.b_locked = true;

	for(var i = 0; i < this.ao_transacs.length; ++i){
		o_transac = this.ao_transacs[i];
		if(o_message.is_ack() && (o_transac.s_callid == o_message.o_hdr_Call_ID.s_value)){ /* 1. ACK branch won't match INVITE's but they MUST have the same CSeq/CallId values */
			if(tsk_string_iequals(o_transac.s_cseq_method, "INVITE") && o_message.o_hdr_CSeq.i_seq == o_transac.i_cseq_value){
				o_ret = o_transac;
				break;
			}
		}
		else if(tsk_string_equals(o_transac.s_branch, o_message.o_hdr_firstVia.s_branch) /* 2. Compare branches*/
			&& (1 == 1) /* FIXME: compare host:ip */){
			if(tsk_string_equals(o_transac.s_cseq_method, o_message.o_hdr_CSeq.s_method)){
				o_ret = o_transac;
				break;
			}
            else if (o_message.is_cancel() || o_message.is_response_to_cancel()) {
                o_ret = o_transac;
				break;
			}
		}
	}

	this.b_locked = false;

	return o_ret;
}

tsip_transac_layer.prototype.handle_incoming_message = function (o_message) {
    if (!o_message) {
        tsk_utils_log_error("Invalid argument");
        return -1;
    }
    var i_ret = -1;
    var o_transac = null;

    if (o_message.is_request()) {
        o_transac = this.find_server(o_message);
    }
    else {
        o_transac = this.find_client(o_message);
    }

    if (o_transac) {
        i_ret = o_transac.callback(tsip_transac_event_type_e.INCOMING_MSG, o_message);
    }

    return i_ret;
}
