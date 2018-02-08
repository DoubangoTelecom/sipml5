/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
function tsip_transport_layer(o_stack) {
    if (!o_stack) {
        tsk_utils_log_error("Invalid argument");
        return null;
    }

    this.o_stack = o_stack;
    this.b_running = false;
    this.ao_transports = new Array();
}

function tsip_transport_layer_find_result(){
    this.o_transport = null;
    this.s_dest_ip = null;
    this.i_dest_port = 0;
}

tsip_transport_layer.prototype.get_layer_transac = function () {
    if (this.o_stack) {
        return this.o_stack.o_layer_transac;
    }
    return null;
}

tsip_transport_layer.prototype.get_layer_dialog = function () {
    if (this.o_stack) {
        return this.o_stack.o_layer_dialog;
    }
    return null;
}

tsip_transport_layer.prototype.stop = function () {
    while (this.b_locked){}

    this.b_locked = true;

    for (var i = 0; i < this.ao_transports.length; ++i) {
        this.ao_transports[i].stop();
    }

    this.b_locked = false;

    return 0;
}

tsip_transport_layer.prototype.send = function (s_branch, o_message) {
    var o_result = this.transport_find(o_message);
    if (!o_result || !o_result.o_transport) {
        tsk_utils_log_error("Failed to find transport");
        return 0;
    }

    return o_result.o_transport.send(s_branch, o_message, o_result.s_dest_ip, o_result.i_dest_port);
}

tsip_transport_layer.prototype.transport_new = function (e_type, s_host, i_port, s_description, fn_callback) {
    var o_transport = null;
    while (this.b_locked){}

    this.b_locked = true;
    o_transport = new tsip_transport(e_type, this.o_stack, s_host, i_port, s_description, fn_callback);
    if (o_transport) {
        this.ao_transports.push(o_transport);
    }
    this.b_locked = false;
    return o_transport;
}

tsip_transport_layer.prototype.transport_remove = function (o_transport) {
    if (o_transport) {
        while (this.b_locked){}

        this.b_locked = true;
        for (var i = 0; i < this.ao_transports.length; ++i) {
            if (this.ao_transports[i] == o_transport) {
                this.ao_transports.splice(i, 1);
                break;
            }
        }
        this.b_locked = false;
    }
}

tsip_transport_layer.prototype.transport_find = function (o_message) {
    if(!o_message){
        tsk_utils_log_error("Invalid argument");
        return null;
    }
    var o_ret = new tsip_transport_layer_find_result();

	o_ret.s_dest_ip = this.o_stack.network.s_proxy_cscf_host;
	o_ret.i_dest_port = this.o_stack.network.i_proxy_cscf_port;

	/* =========== Sending Request ========= */
	if(o_message.is_request()){
		/* Request are always sent to the Proxy-CSCF */
		for(var i = 0; i < this.ao_transports.length; ++i){
			if(this.ao_transports[i].e_type == this.o_stack.network.e_proxy_cscf_type){
				o_ret.o_transport = this.ao_transports[i];
				break;
			}
		}
	}



	/* =========== Sending Response =========
	*
	*/
	else if(o_message.o_hdr_firstVia){
		if(o_message.o_hdr_firstVia.is_transport_reliable()) /*== RELIABLE ===*/
		{
			/*	RFC 3261 - 18.2.2 Sending Responses
				If the "sent-protocol" is a reliable transport protocol such as
				TCP or SCTP, or TLS over those, the response MUST be sent using
				the existing connection to the source of the original request
				that created the transaction, if that connection is still open.
				This requires the server transport to maintain an association
				between server transactions and transport connections.  If that
				connection is no longer open, the server SHOULD open a
				connection to the IP address in the "received" parameter, if
				present, using the port in the "sent-by" value, or the default
				port for that transport, if no port is specified.  If that
				connection attempt fails, the server SHOULD use the procedures
				in [4] for servers in order to determine the IP address and
				port to open the connection and send the response to.
			*/
		}
		else
		{
			if(o_message.o_hdr_firstVia.s_maddr) /*== UNRELIABLE MULTICAST ===*/
			{	
				/*	RFC 3261 - 18.2.2 Sending Responses 
					Otherwise, if the Via header field value contains a "maddr" parameter, the 
					response MUST be forwarded to the address listed there, using 
					the port indicated in "sent-by", or port 5060 if none is present.  
					If the address is a multicast address, the response SHOULD be 
					sent using the TTL indicated in the "ttl" parameter, or with a 
					TTL of 1 if that parameter is not present.
				*/
			}
			else	/*=== UNRELIABLE UNICAST ===*/
			{
				if(o_message.o_hdr_firstVia.s_received)
				{
					if(o_message.o_hdr_firstVia.i_rport > 0)
					{
						/*	RFC 3581 - 4.  Server Behavior
							When a server attempts to send a response, it examines the topmost
							Via header field value of that response.  If the "sent-protocol"
							component indicates an unreliable unicast transport protocol, such as
							UDP, and there is no "maddr" parameter, but there is both a
							"received" parameter and an "rport" parameter, the response MUST be
							sent to the IP address listed in the "received" parameter, and the
							port in the "rport" parameter.  The response MUST be sent from the
							same address and port that the corresponding request was received on.
							This effectively adds a new processing step between bullets two and
							three in Section 18.2.2 of SIP [1].
						*/
						o_ret.s_dest_ip = o_message.o_hdr_firstVia.s_received;
						o_ret.i_dest_port = o_message.o_hdr_firstVia.i_rport;
					}
					else
					{
						/*	RFC 3261 - 18.2.2 Sending Responses
							Otherwise (for unreliable unicast transports), if the top Via
							has a "received" parameter, the response MUST be sent to the
							address in the "received" parameter, using the port indicated
							in the "sent-by" value, or using port 5060 if none is specified
							explicitly.  If this fails, for example, elicits an ICMP "port
							unreachable" response, the procedures of Section 5 of [4]
							SHOULD be used to determine where to send the response.
						*/
						o_ret.s_dest_ip = o_message.o_hdr_firstVia.s_received;
						o_ret.i_dest_port = o_message.o_hdr_firstVia.i_port ? o_message.o_hdr_firstVia.i_port : 5060;
					}
				}
				else if(!o_message.o_hdr_firstVia.s_received)
				{
					/*	RFC 3261 - 18.2.2 Sending Responses
						Otherwise, if it is not receiver-tagged, the response MUST be
						sent to the address indicated by the "sent-by" value, using the
						procedures in Section 5 of [4].
					*/
					o_ret.s_dest_ip = o_message.o_hdr_firstVia.s_host;
					if(o_message.o_hdr_firstVia.i_port > 0)
					{
						o_ret.i_dest_port = o_message.o_hdr_firstVia.i_port;
					}
				}
			}
		}
		
        /* Find the transport */
        while(this.b_locked){}
        this.b_locked = true;
		for(i = 0; i < this.ao_transports.length; ++i){
			 if(this.ao_transports[i].have_socket(o_message.o_socket)){
				o_ret.o_transport = this.ao_transports[i];
				break;
			}
		}
        this.b_locked = false;
	}

    return o_ret;
}

tsip_transport_layer.prototype.handle_incoming_message = function (o_message) {
    if (o_message) {
        var o_layer_transac = this.get_layer_transac();
        if (!o_layer_transac) {
            tsk_utils_log_error("Invalid transaction layer");
            return -1;
        }
        var i_ret;

        if ((i_ret = o_layer_transac.handle_incoming_message(o_message)) != 0) {
            o_layer_dialog = this.get_layer_dialog();
            if (!o_layer_dialog) {
                tsk_utils_log_error("Invalid dialog layer");
                return -1;
            }

            /* NO MATCHING TRANSACTION FOUND ==> LOOK INTO DIALOG LAYER */
            i_ret = o_layer_dialog.handle_incoming_message(o_message);
        }
        return i_ret;
    }
    return 0;
}