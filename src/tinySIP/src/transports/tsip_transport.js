/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
var tsip_transport_type_e = 
{
    WS: 0,
    WSS: 1,
    TCP: 2,
    TLS: 3,
    UDP: 4,
    SCTP: 5,
    DTLS: 6
};

var tsip_transport_event_type_e =
{
    STARTED: 0,
    STOPPED: 1,
    ERROR: 2
};

function tsip_transport(e_type, o_stack, s_host, i_port, s_description, fn_callback) {
    if(!o_stack){
        tsk_utils_log_error("Invalid argument");
        return null;
    }

    switch(e_type){
        case tsip_transport_type_e.WS:
            {
                this.b_reliable = true;
                this.s_scheme = "sip";
                this.s_protocol = "ws";
                this.s_via_protocol = "WS";
                this.s_service = "SIP+D2W";
                this.o_ws = null;
                this.__start = function () { return __tsip_transport_ws_start(this); };
                this.__stop = function () { return __tsip_transport_ws_stop(this); };
                this.__have_socket = function (o_socket) { return __tsip_transport_ws_have_socket(this, o_socket); }
                this.__send = function (o_data, i_length) { return __tsip_transport_ws_send(this, o_data, i_length); }
                break;
            }
        case tsip_transport_type_e.WSS:
            {
                this.b_reliable = true;
                this.s_scheme = "sips";
                this.s_protocol = "wss";
                this.s_via_protocol = "WSS";
                this.s_service = "SIPS+D2W";
                this.o_ws = null;
                this.__start = function () { return __tsip_transport_ws_start(this); };
                this.__stop = function () { return __tsip_transport_ws_stop(this); };
                this.__have_socket = function (o_socket) { return __tsip_transport_ws_have_socket(this, o_socket); }
                this.__send = function (o_data, i_length) { return __tsip_transport_ws_send(this, o_data, i_length); }
                break;
            }

        case tsip_transport_type_e.UDP:
            {
                if(!tsk_utils_have_webrtc4all()){
                    tsk_utils_log_error("Transport not supported");
                    return null;
                }

                this.b_reliable = false;
                this.s_scheme = "sip";
                this.s_protocol = "udp";
                this.s_via_protocol = "UDP";
                this.s_service = "SIP+D2U";
                this.o_transport = null;
                this.__start = function () { return __tsip_transport_webrtc4all_start(this); };
                this.__stop = function () { return __tsip_transport_webrtc4all_stop(this); };
                this.__have_socket = function (o_socket) { return __tsip_transport_webrtc4all_have_socket(this, o_socket); }
                this.__send = function (o_data, i_length) { return __tsip_transport_webrtc4all_send(this, o_data, i_length); }
                break;
            }

        case tsip_transport_type_e.TCP:
        case tsip_transport_type_e.TLS:
        case tsip_transport_type_e.SCTP:
        case tsip_transport_type_e.DTLS:
        default:
            {
                tsk_utils_log_error(e_type + " not supported as a valid SIP transport");
                return null;
            }
    }
    
    this.e_type = e_type;
    this.o_stack = o_stack;
    this.s_host = s_host;
    this.i_port = i_port;
    this.s_description = s_description;
    this.fn_callback = fn_callback;
    this.b_started = false;

    return this;
}

tsip_transport.prototype.get_layer = function () {
    return this.o_stack.o_layer_transport;
}

tsip_transport.prototype.is_reliable = function(){
    return this.b_reliable;
}

tsip_transport.prototype.start = function() {
    if (this.b_started) {
        tsk_utils_log_warn("Already started");
        return 0;
    }

   return this.__start();
}

tsip_transport.prototype.stop = function () {
    if (!this.b_started) {
        tsk_utils_log_warn("Not started");
        return 0;
    }

    return this.__stop();
}

tsip_transport.prototype.get_local_ip = function(){
    if(this.e_type == tsip_transport_type_e.WS || this.e_type == tsip_transport_type_e.WSS){
        return "df7jal23ls0d.invalid";
    }
    else if(this.o_transport && this.o_transport.localIP){
        return this.o_transport.localIP;
    }
    tsk_utils_log_error("Not implemented");
    return "127.0.0.1";
}

tsip_transport.prototype.get_local_port = function(){
    if(this.e_type == tsip_transport_type_e.WS || this.e_type == tsip_transport_type_e.WSS){
        return -1;
    }
    else if(this.o_transport && this.o_transport.localPort){
        return this.o_transport.localPort;
    }
    tsk_utils_log_error("Not implemented");
    return 5060;
}

tsip_transport.prototype.get_uri = function(b_lr){	
	var b_ipv6 = false;
	var s_uristring = tsk_string_format("{0}:{1}{2}{3}:{4};{5};transport={6}",
		this.s_scheme,
		b_ipv6 ? "[" : "",
		this.o_stack.network.aor.s_ip,
		b_ipv6 ? "]" : "",
		this.o_stack.network.aor.i_port,
		b_lr ? "lr" : "",
		this.s_protocol);
	    
    var o_uri = tsip_uri.prototype.Parse(s_uristring);
    if(o_uri){
        o_uri.e_host_type = b_ipv6 ? tsip_host_type_e.ipv6 : tsip_host_type_e.ipv4;
    }
	return o_uri;
}

tsip_transport.prototype.have_socket = function (o_socket) {
    return this.__have_socket(o_socket);
}

tsip_transport.prototype.send = function (s_branch, o_message, s_dest_ip, i_dest_port) {
    var o_data = null;

    /* Add Via and update AOR, IPSec headers, SigComp ...
    * ACK sent from the transaction layer will contains a Via header and should not be updated 
    * CANCEL will have the same Via and Contact headers as the request it cancel */
    if (o_message.is_request() && (!o_message.is_ack() || (o_message.is_ack() && !o_message.o_hdr_firstVia)) && !o_message.is_cancel()) {
        this.message_addvia(s_branch, o_message); /* should be done before tsip_transport_o_message_update() which could use the Via header */
        this.message_update_aor(o_message); /* AoR */
        this.message_update(o_message); /* IPSec, SigComp, ... */
    }
    else if (o_message.is_response()) {
        /* AoR for responses which have a contact header (e.g. 183/200 INVITE) */
        if (o_message.o_hdr_Contact) {
            this.message_update_aor(o_message);
        }
        /*	RFC 3581 - 4.  Server Behavior
        When a server compliant to this specification (which can be a proxy
        or UAS) receives a request, it examines the topmost Via header field
        value.  If this Via header field value contains an "rport" parameter
        with no value, it MUST set the value of the parameter to the source
        port of the request.
        */
        if (o_message.o_hdr_firstVia.i_rport == 0) {
            /* As the response message has been built from the request ...then it's first via is the same as
            the request's first via.
            */
            o_message.o_hdr_firstVia.i_rport = o_message.o_hdr_firstVia.i_port;
        }
    }

    o_data = o_message.toString();

    tsk_utils_log_info("SEND: " + o_data);

    //if (o_data.length > 1300) {
        /*	RFC 3261 - 18.1.1 Sending Requests (FIXME)
        If a request is within 200 bytes of the path MTU, or if it is larger
        than 1300 bytes and the path MTU is unknown, the request MUST be sent
        using an RFC 2914 [43] congestion controlled transport protocol, such
        as TCP. If this causes a change in the transport protocol from the
        one indicated in the top Via, the value in the top Via MUST be
        changed.  This prevents fragmentation of messages over UDP and
        provides congestion control for larger messages.  However,
        implementations MUST be able to handle messages up to the maximum
        datagram packet size.  For UDP, this size is 65,535 bytes, including
        IP and UDP headers.
        */
    //}

    return this.__send(o_data, o_data.length);
}

function tsip_transport_event(o_transport, e_type, s_description, o_data) {
    this.o_transport = o_transport;
    this.e_type = e_type;
    this.s_description = s_description;
    this.o_data = o_data;
    return this;
}

tsip_transport.prototype.signal = function (e_type, s_description, o_data) {
    if (this.fn_callback) {
        var fn_callback = this.fn_callback;
        var o_event = new tsip_transport_event(this, e_type, s_description, o_data);
        setTimeout(function () { fn_callback(o_event) }, 1);
    }
    return 0;
}

tsip_transport.prototype.message_addvia = function(s_branch, o_message){	
	/* is there a Via header? */
	if(!o_message.o_hdr_firstVia){
		/*	RFC 3261 - 18.1.1 Sending Requests
			Before a request is sent, the client transport MUST insert a value of
			the "sent-by" field into the Via header field.  This field contains
			an IP address or host name, and port.  The usage of an FQDN is
			RECOMMENDED.  This field is used for sending responses under certain
			conditions, described below.  If the port is absent, the default
			value depends on the transport.  It is 5060 for UDP, TCP and SCTP,
			5061 for TLS.
		*/
        // FIXME:
		o_message.o_hdr_firstVia = new tsip_header_Via(tsip_header_Via.prototype.__s_proto_name_default, tsip_header_Via.prototype.__s_proto_version_default,
			this.s_via_protocol, this.get_local_ip(), this.get_local_port());
		
        o_message.o_hdr_firstVia.add_param("rport", null);
	}
	
	/* updates the branch */
	if(s_branch){
        o_message.o_hdr_firstVia.s_branch = s_branch;
	}
	else{ /* Probably ACK sent from Dialog Layer */
        o_message.o_hdr_firstVia.s_branch = tsk_string_format("{0}{1}", tsip_transac.prototype.__magic_cookie, tsk_string_random(20));
	}

	/* multicast case */
	//if(false){
		/*	RFC 3261 - 18.1.1 Sending Requests (FIXME)
			A client that sends a request to a multicast address MUST add the
			"maddr" parameter to its Via header field value containing the
			destination multicast address, and for IPv4, SHOULD add the "ttl"
			parameter with a value of 1.  Usage of IPv6 multicast is not defined
			in this specification, and will be a subject of future
			standardization when the need arises.
		*/
	//}

	return 0;
}

tsip_transport.prototype.message_update_aor = function(o_message){
	/* already updtated (e.g. retrans)? */
	if(!o_message.b_update){
		return 0;
	}
	
	/* retrieves the transport ip address and port */
	if(!this.o_stack.network.aor.s_ip && !this.o_stack.network.aor.i_port){
		this.o_stack.network.aor.s_ip = this.get_local_ip();
        this.o_stack.network.aor.i_port = this.get_local_port();
	}

	/* === Host and port === */
	if(o_message.o_hdr_Contact && o_message.o_hdr_Contact.o_uri){
        o_message.o_hdr_Contact.o_uri.s_scheme = this.s_scheme;
        o_message.o_hdr_Contact.o_uri.s_host = this.o_stack.network.aor.s_ip;
        o_message.o_hdr_Contact.o_uri.i_port = this.o_stack.network.aor.i_port;
		tsk_params_add(o_message.o_hdr_Contact.o_uri.ao_params, "transport", this.s_protocol);
	}

	return 0;
}

tsip_transport.prototype.message_update = function(o_message){
	/* already updtated (e.g. retrans)? */
	if(!o_message.b_update){
		return 0;
	}

	/* === SigComp === */
	if(o_message.s_sigcomp_id){
		/* Via */
		if(o_message.o_hdr_firstVia){
            o_message.o_hdr_firstVia.add_param("comp", "sigcomp");
            o_message.o_hdr_firstVia.add_param("sigcomp-id", tsk_string_format("\"{0}\"", o_message.s_sigcomp_id));
		}
		/* Contact */
		if(o_message.o_hdr_Contact && o_message.o_hdr_Contact.o_uri){
		    tsk_params_add(o_message.o_hdr_Contact.o_uri.ao_params, "sigcomp-id", o_message.sigcomp_id);
		}
	}

	o_message.b_update = false; /* To avoid to update retrans. */
	
	return 0;
}



















/******************** WebSocket *******************/
function __tsip_transport_ws_start(o_self) {
    if (!o_self) {
        tsk_utils_log_error("Invalid argument");
        return -1;
    }

    var s_url = tsk_string_is_null_or_empty(o_self.o_stack.network.s_websocket_server_url) ?
             tsk_string_format("{0}://{1}:{2}",o_self.s_protocol, o_self.s_host, o_self.i_port) : o_self.o_stack.network.s_websocket_server_url;
    tsk_utils_log_info("Connecting to '"+s_url+"'");
    o_self.o_ws = new WebSocket(s_url, 'sip');
    o_self.o_ws.binaryType = "arraybuffer";
    o_self.o_ws.o_transport = o_self;
    o_self.o_ws.onopen = __tsip_transport_ws_onopen;
    o_self.o_ws.onclose = __tsip_transport_ws_onclose;
    o_self.o_ws.onmessage = __tsip_transport_ws_onmessage;
    o_self.o_ws.onerror = __tsip_transport_ws_onerror;

    return 0;
}

function __tsip_transport_ws_stop(o_self) {
    if (!o_self) {
        tsk_utils_log_error("Invalid argument");
        return -1;
    }

    if (o_self.o_ws) {
        o_self.o_ws.close();
    }

    return 0;
}

function __tsip_transport_ws_have_socket(o_self, o_socket) {
    return o_self.o_ws == o_socket;
}

function __tsip_transport_ws_send(o_self, o_data, i_length) {

    if (!o_self.o_ws) {
        tsk_utils_log_error("Invalid state");
        return 0;
    }

    o_self.o_ws.send(o_data);
    return i_length;
}

function __tsip_transport_ws_onopen(evt) {
    tsk_utils_log_info("__tsip_transport_ws_onopen");
    this.o_transport.b_started = true;
    this.o_transport.signal(tsip_transport_event_type_e.STARTED, evt.reason, null);
}

function __tsip_transport_ws_onclose(evt) {
    tsk_utils_log_info("__tsip_transport_ws_onclose");
    this.o_transport.b_started = false;
    this.o_transport.signal(tsip_transport_event_type_e.STOPPED, evt.reason, null);
}

function __tsip_transport_ws_onmessage(evt) {
    tsk_utils_log_info("__tsip_transport_ws_onmessage");

    var o_ragel_state = tsk_ragel_state_create();
    if(typeof(evt.data) == 'string'){
        tsk_ragel_state_init_str(o_ragel_state, evt.data);
    }
    else{
        tsk_ragel_state_init_ai(o_ragel_state, evt.data);
    }
    var o_message = tsip_message.prototype.Parse(o_ragel_state, true);

    if (o_message) {
        tsk_utils_log_info("recv=" + o_message);
        o_message.o_socket = this;
        return this.o_transport.get_layer().handle_incoming_message(o_message);
    }
    else {
        tsk_utils_log_error("Failed to parse message: " + evt.data);
        return -1;
    }
}

function __tsip_transport_ws_onerror(evt) {
    tsk_utils_log_info("__tsip_transport_ws_onerror");
    this.o_transport.signal(tsip_transport_event_type_e.ERROR, evt.reason, null);
}


/******************** webrtc4all *******************/
function __tsip_transport_webrtc4all_start(o_self) {
    if (!o_self) {
        tsk_utils_log_error("Invalid argument");
        return -1;
    }

    var b_isInternetExplorer = (WebRtc4all_GetType() == WebRtcType_e.IE);
    var s_url = tsk_string_is_null_or_empty(o_self.o_stack.network.s_proxy_outbound_host) ?
             tsk_string_format("{0}://{1}:{2}", o_self.s_protocol, o_self.s_host, o_self.i_port) : 
             tsk_string_format("{0}://{1}:{2}", o_self.s_protocol, o_self.o_stack.network.s_proxy_outbound_host, o_self.o_stack.network.i_proxy_outbound_port);
    
    tsk_utils_log_info("Connecting to '" + s_url+"'");
    o_self.o_transport = WebRtc4all_GetPlugin().createNetTransport();
    if (b_isInternetExplorer) {
        eval("function o_self.o_transport::OnEvent(i_type, s_data) { return __tsip_transport_webrtc4all_onevent (o_self, i_type, s_data); }");
    }
    else {
        o_self.o_transport.opaque = o_self;
        o_self.o_transport.setCallbackFuncName("__tsip_transport_webrtc4all_onevent");
    }
    
    try{
        // if sip outbound proxy is defined then, use it otherwise perform DNS NAPTR+SRV ("SIP+D2U")
        if(o_self.o_stack.network.s_proxy_outbound_host && o_self.o_stack.network.i_proxy_outbound_port){
            o_self.s_host = o_self.o_stack.network.s_proxy_outbound_host;
            o_self.i_port = o_self.o_stack.network.i_proxy_outbound_port;
        }
        else{
            o_self.o_transport.SetDomain(o_self.o_stack.network.o_uri_realm.s_host); // DNS NAPTR+SRV ("SIP+D2U")
        }

        // IMPORTANT: StartDebug is not implemented in all functions
        //if(o_self.o_transport.StartDebug){
            //o_self.o_transport.StartDebug(); // To debug ATL/COM objects (C/C++)
        //}
        o_self.o_transport.Start(b_isInternetExplorer ? WebRtc4all_GetLooper() : 0);
        if(o_self.o_transport.defaultDestAddr && o_self.o_transport.defaultDestPort){ // use connection info from DNS results
            o_self.s_host = o_self.o_transport.defaultDestAddr;
            o_self.i_port = o_self.o_transport.defaultDestPort;
            tsk_utils_log_info("Transport default destination=" + o_self.s_host + ":" + o_self.i_port);
        }
        o_self.b_started = true;
        o_self.signal(tsip_transport_event_type_e.STARTED, "Network transport started", null);
    }
    catch(e){
        tsk_utils_log_error(e);
        return -1;
    }

    return 0;
}

function __tsip_transport_webrtc4all_stop(o_self) {
    if (!o_self) {
        tsk_utils_log_error("Invalid argument");
        return -1;
    }

    if (o_self.o_transport) {
        o_self.o_transport.Stop();
    }

    return 0;
}

function __tsip_transport_webrtc4all_have_socket(o_self, o_socket) {
    return o_self.o_transport == o_socket;
}

function __tsip_transport_webrtc4all_send(o_self, o_data, i_length) {

    if (!o_self.o_transport) {
        tsk_utils_log_error("Invalid state");
        return 0;
    }
    
    o_self.o_transport.SendTo(o_data, o_self.s_host, o_self.i_port);
    return i_length;
}

function __tsip_transport_webrtc4all_onevent(o_self, i_type, s_data) {
    tsk_utils_log_info("__tsip_transport_webrtc4all_onevent");
    if(s_data){
        var o_ragel_state = tsk_ragel_state_create();
        tsk_ragel_state_init_str(o_ragel_state, s_data);

        var o_message = tsip_message.prototype.Parse(o_ragel_state, true);
        if (o_message) {
            tsk_utils_log_info("RECV=" + o_message.toString());
            o_message.o_socket = o_self.o_transport;
            return o_self.get_layer().handle_incoming_message(o_message);
        }
        else {
            tsk_utils_log_error("Failed to parse message: " + s_data);
            return -1;
        }
    }
}
