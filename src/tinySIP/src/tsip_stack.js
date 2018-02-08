/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
/**@page page_tsip_stack SIP Stack
The SIP stack is the base object used to create all sessions (registration, publication, call...). You must create a stack before starting to make or receive calls.
<h2>Creating a SIP Stack</h2>
@code
var o_stack = new tsip_stack("doubango.org", "alice", "sip:alice@doubango.org", "192.168.0.12", 5062,
    tsip_stack.prototype.SetPassword ("mysecret"),
    tsip_stack.prototype.SetDisplayName("alice"),
    tsip_stack.prototype.SetHeader("User-Agent", "IM-client/OMA1.0 sipML5/v0.0.0000.0"),
    tsip_stack.prototype.SetHeader("Organization", "Doubango Telecom")
);
@endcode
 - 'doubango.org': SIP domain name a.k.a. <i>realm</i>
 - 'alice': Your IMS Private Identity a.k.a <i>authentication name</i>
 - 'sip:alice@doubango.org': Your IMS Public Identity a.k.a <i>SIP address</i>
 - '192.168.0.12': WebSocket outbound proxy Host. Must be a SIP server supporting SIP over WebSockets as per <a href="http://tools.ietf.org/html/draft-ibc-sipcore-sip-websocket-02">draft-ibc-sipcore-sip-websocket-02</a>. If
 your SIP server don't support this protocol then replace the host address by <b>simpl5.org</b>. When using <b>sipML5</b> outbound proxy, all crequests will be forward to your SIP server according to the result of DNS NAPTR + SRV (realm).
 - 5062: Websocket outbound proxy port

 In the above example, the SIP stack is created to connect to a SIP server/proxy supporting SIP o/ WebSocket at '192.168.0.12:5062'. All requests received through the WebSocket channel will be forwarded to 'doubango.org' using UDP, TCP or TLS protocol.

 @image html global_view.png "Global View"

<h2>Setting Outbound Proxy</h2>
It could be useful define an outbound proxy if no DNS entries are defined for the defined <i>realm</i>.
Please note that this outbound proxy could be defined at the stack creation like this:
@code
var o_stack = new tsip_stack(....
    tsip_stack.prototype.SetProxyOutBound("192.168.0.10", 5060, tsip_transport_type_e.UDP)
);

@endcode


*/


/**
* Callback function called to report Stack related events.
*
@code
o_stack.on_event_stack = function (evt: tsip_event) {
tsk_utils_log_info(evt.s_phrase);
    switch (evt.i_code) {
        case tsip_event_code_e.STACK_STARTED:
        case tsip_event_code_e.STACK_STOPPING:
        case tsip_event_code_e.STACK_STOPPED:
        case tsip_event_code_e.STACK_STARTING:
        case tsip_event_code_e.STACK_FAILED_TO_START:
        case tsip_event_code_e.STACK_FAILED_TO_STOP:
        default: break;
    }
};
@endcode
*/
tsip_stack.prototype.on_event_stack = null;
/**
* Callback function called to report dialog events. This event is common to all sessions (INVITE, REGISTER, PUBLISH, INFO...) and used to report connection states (CONNECTED, CONNECTING, TERMINATING, TERMINATED....)
and errors.
*
@code
o_stack.on_event_dialog = function (evt: tsip_event) {
    tsk_utils_log_info("phrase=" + evt.s_phrase);
    tsk_utils_log_info("sesssion id=%d", evt.get_session().get_id());
    switch (evt.i_code) {
        case tsip_event_code_e.DIALOG_TRANSPORT_ERROR:
        case tsip_event_code_e.DIALOG_GLOBAL_ERROR:
        case tsip_event_code_e.DIALOG_MESSAGE_ERROR:
        case tsip_event_code_e.DIALOG_WEBRTC_ERROR:

        case tsip_event_code_e.DIALOG_REQUEST_INCOMING:
        case tsip_event_code_e.DIALOG_REQUEST_OUTGOING:
        case tsip_event_code_e.DIALOG_REQUEST_CANCELLED:
        case tsip_event_code_e.DIALOG_REQUEST_SENT:
        case tsip_event_code_e.DIALOG_MEDIA_ADDED:
        case tsip_event_code_e.DIALOG_MEDIA_REMOVED:

        case tsip_event_code_e.DIALOG_CONNECTING:
        case tsip_event_code_e.DIALOG_CONNECTED:

        case tsip_event_code_e.DIALOG_TERMINATING:
        case tsip_event_code_e.DIALOG_TERMINATED:
        
        default: break;
    }
};
@endcode
*/
tsip_stack.prototype.on_event_dialog = null;
/**
* Callback function used to report audio/video call (SIP INVITE) session events. Note that this callback won't report connection state. To get connection state, you should use @ref on_event_dialog event.
*
@code
o_stack.on_event_invite = function (evt: tsip_event_invite) {
    tsk_utils_log_info("phrase=" + evt.s_phrase);
    tsk_utils_log_info("sesssion id=%d", evt.get_session().get_id());
    switch (evt.e_invite_type) {
        case tsip_event_invite_type_e.I_NEW_CALL:
	
	    case tsip_event_invite_type_e.I_REQUEST:
	    case tsip_event_invite_type_e.I_AO_REQUEST:
	
        case tsip_event_invite_type_e.O_ECT_TRYING:
        case tsip_event_invite_type_e.O_ECT_ACCEPTED:
        case tsip_event_invite_type_e.O_ECT_COMPLETED:
        case tsip_event_invite_type_e.O_ECT_FAILED:
        case tsip_event_invite_type_e.O_ECT_NOTIFY:
        case tsip_event_invite_type_e.I_ECT_REQUESTED:
        case tsip_event_invite_type_e.I_ECT_NEW_CALL:
        case tsip_event_invite_type_e.I_ECT_COMPLETED:
        case tsip_event_invite_type_e.I_ECT_FAILED:
        case tsip_event_invite_type_e.I_ECT_NOTIFY:

	    case tsip_event_invite_type_e.M_EARLY_MEDIA:
	    case tsip_event_invite_type_e.M_UPDATING:
	    case tsip_event_invite_type_e.M_UPDATED:
	    case tsip_event_invite_type_e.M_STREAM_CONNECTING:
	    case tsip_event_invite_type_e.M_STREAM_CONNECTED:
        case tsip_event_invite_type_e.M_STREAM_LOCAL_ADDED:
        case tsip_event_invite_type_e.M_STREAM_LOCAL_REMOVED:
        case tsip_event_invite_type_e.M_STREAM_REMOTE_ADDED:
        case tsip_event_invite_type_e.M_STREAM_REMOTE_REMOVED:
	
	    case tsip_event_invite_type_e.M_LOCAL_HOLD_OK:
	    case tsip_event_invite_type_e.M_LOCAL_HOLD_NOK:
	    case tsip_event_invite_type_e.M_LOCAL_RESUME_OK:
	    case tsip_event_invite_type_e.M_LOCAL_RESUME_NOK:
	    case tsip_event_invite_type_e.M_REMOTE_HOLD:
	    case tsip_event_invite_type_e.M_REMOTE_RESUME:

        default: break;
    }
};
@endcode
*/
tsip_stack.prototype.on_event_invite = null;
/**
* Callback function used to report messaging (SIP MESSAGE) session events.
*
@code
o_stack.on_event_message = function (evt: tsip_event_message) {
    tsk_utils_log_info("phrase=" + evt.s_phrase);
    tsk_utils_log_info("sesssion id=%d", evt.get_session().get_id());
    switch (evt.e_message_type) {
        case tsip_event_message_type_e.I_MESSAGE:
        case tsip_event_message_type_e.AO_MESSAGE:
        default: break;
    }
};
@endcode
*/
tsip_stack.prototype.on_event_message = null;

tsip_stack.prototype.on_event_publish = null;
tsip_stack.prototype.on_event_subscribe = null;

/* Parameter type (Internal use) */
var tsip_stack_param_type_e =
{	
	/* === Identity === */
	DISPLAY_NAME : 0,
	IMPU : 1,
	PREFERRED_ID : 2,
	IMPI : 3,
	PASSWORD : 4,

	/* === SigComp === */
	SIGCOMP : 10,
	SIGCOMP_ADD_COMPARTMENT : 11,
	SIGCOMP_REMOVE_COMPARTMENT : 12,

	/* === Network === */
	REALM : 20,
	LOCAL_IP : 21,
	LOCAL_PORT : 22,
	AOR : 23,
	DISCOVERY_NAPTR : 24,
	DISCOVERY_DHCP : 25,
	PROXY_CSCF : 26,
	DNSSERVER : 27,
	MODE_SERVER: 28,
	PROXY_OUTBOUND: 30,
	WEBSOCKET_SERVER_URL: 31,
    ICE_SERVERS: 32,
	ENABLE_RTCWEB_BREAKER: 33,
    ENABLE_CLICK2CALL: 34,
    ENABLE_SECURE_TRANSPORT: 35,
	
	/* === Security === */
	EARLY_IMS : 40,
	SECAGREE_IPSEC : 41,
	SECAGREE_TLS : 42,
	AMF : 43,
	OPERATOR_ID : 44,
	TLS_CERTS : 45,
	IPSEC_PARAMS : 46,

	/* === Dummy Headers === */
	HEADER: 50,

	/* Nat Traversal */
	STUN_SERVER : 60,
	STUN_CRED : 61,

    /* === Media === */
	CACHE_MEDIA_STREAM : 70,
    BANDWIDTH: 71,
    VIDEO_SIZE: 72,

	/* === User Data === */
	USERDATA : 80
};

/* Network transport state (Internal use) */
var tsip_transport_state_e =
{
    NONE: -1,

    STARTING: 0,
    STARTED: 1,
    STOPPING: 3,
    STOPPED: 4
};

/**
* Signature: tsip_stack_create(s_realm, s_impi, s_impu_uri, s_proxy_cscf_host, i_proxy_cscf_port, ...set())
* @ctor
* This is the main function (constructor) used to create a SIP/IMS stack and it <b>takes variable arguments</b>.
* @tparam String s_realm the SIP domain name. e.g. 'doubango.org'
* @tparam String s_impi the IMS Private identity. e.g. 'alice'
* @tparam String s_impu_uri the IMS public identity wich must be a valid SIP Uri. e.g. 'sip:alice@doubango.org'
* @tparam String s_proxy_cscf_host the Proxy domain name or IP address. e.g. '192.168.0.1' or 'example.org'.
* @tparam int i_proxy_cscf_port the proxy port.
*
*@code
* var o_stack = new tsip_stack("doubango.org", "alice", "sip:alice@doubango.org", "192.168.0.12", 5062,
    tsip_stack.prototype.SetPassword ("mypassword"),
    tsip_stack.prototype.SetDisplayName("alice"),
    tsip_stack.prototype.SetHeader("User-Agent", "IM-client/OMA1.0 sipML5/v0.0.0000.0"),
    tsip_stack.prototype.SetHeader("Organization", "Doubango Telecom")
);
@endcode
*/
function tsip_stack(s_realm, s_impi, s_impu_uri, s_proxy_cscf_host, i_proxy_cscf_port) {
    if (!s_realm || !s_impi || !s_impu_uri) {
        tsk_utils_log_error("Invalid argument");
        return null;
    }

    var o_uri_impu = tsip_uri.prototype.Parse(s_impu_uri);
    if (!o_uri_impu) {
        tsk_utils_log_error("'" + s_impu_uri + "' is not a valid IMPU Uri");
        return null;
    }

    if (tsk_string_index_of(s_realm, s_realm.length, "sip:") != 0 && tsk_string_index_of(s_realm, s_realm.length, "sips:") != 0){
        s_realm = tsk_string_format("sip:{0}", s_realm);
    }
    var o_uri_realm = tsip_uri.prototype.Parse(s_realm);
    if(!o_uri_realm){
        tsk_utils_log_error("'" + s_realm + "' is not a valid realm");
        return null;
    }

    this.e_state = tsip_transport_state_e.NONE;

    /* === Identity === */
    this.identity = {};
    this.identity.s_display_name = o_uri_impu.s_user_name;
    this.identity.o_uri_impu = o_uri_impu;
    this.identity.o_uri_pref = null;
    this.identity.s_impi = s_impi;
    this.identity.s_password = null;

    /* === Network === */
    this.network = {};
    this.network.o_transport = null;
    this.network.s_transport = "ws";
    this.network.s_local_ip = null;
    this.network.i_local_port = 0;
    this.network.s_proxy_cscf_host = s_proxy_cscf_host;
    this.network.i_proxy_cscf_port = i_proxy_cscf_port;
    // IMPORTANT: Safari and Opera support WebSocket but they are using the old version
    this.network.e_proxy_cscf_type = tsk_utils_have_webrtc4all() ? tsip_transport_type_e.UDP : tsip_transport_type_e.WS;
    this.network.o_uri_realm = o_uri_realm;
    this.network.s_proxy_outbound_host = null;
    this.network.i_proxy_outbound_port = 5060;
    this.network.e_proxy_outbound_type = this.network.e_proxy_cscf_type;
    this.network.s_websocket_server_url = null;
    this.network.ao_ice_servers = null;
    this.network.b_rtcweb_enabled = false;
    this.network.b_click2call_enabled = false;

    this.network.aor = {};
    this.network.aor.s_ip = null;
    this.network.aor.i_port = 0;

    /* === Security === */
    this.security = {};
    this.security.b_earlyIMS = true;

    this.security.tls = {};
    this.security.tls.s_ca = null;
    this.security.tls.s_pbk = null;
    this.security.tls.s_pvk = null;

    /* NAT Traversal */
    this.natt = {};
    this.natt.stun = {};
    this.natt.stun.s_ip = null;
    this.natt.stun.i_port = 0;
    this.natt.stun.s_login = null;
    this.natt.stun.s_pwd = null;

    /* Media */
    this.media = {};
    this.media.b_cache_stream = false;
    this.media.o_bandwidth = { audio:undefined, video:undefined };
    this.media.o_video_size = { minWidth:undefined, minHeight:undefined, maxWidth:undefined, maxHeight:undefined };

    /* Internals */
    this.o_timers = new tsip_timers();
    this.ao_sessions = new Array();
    this.ao_headers = new Array();
    this.o_usr_data = null;

    this.ao_uri_paths = new Array();
    this.ao_uri_service_routes = new Array();
    this.ao_uri_associated_uris = new Array();

    /* Layers */
    this.o_layer_dialog = new tsip_dialog_layer(this);
    this.o_layer_transac = new tsip_transac_layer(this);
    this.o_layer_transport = new tsip_transport_layer(this);

    this.__set(Array.prototype.slice.call(arguments, 5));
}

/**
* Starts the SIP stack. This function must be the first one to be called. This function is asynchronous which means that the stack will not be immediately started after the call.
* To get feedbacks about the status (success or error), you must subscribe to @ref on_event_stack.
* @treturn int 0 if succeed and non-zero value otherwise
*/
tsip_stack.prototype.start = function () {
    
    if (this.e_state == tsip_transport_state_e.STARTED) {
        tsk_utils_log_warn("Already started");
        return 0;
    }
    else if (this.e_state == tsip_transport_state_e.STARTING) {
        this.stop();
    }

    if (!this.network.s_proxy_cscf_host) {
        tsk_utils_log_error("'" + this.network.s_proxy_cscf_host + "' not valid as proxy host");
        return -2;
    }

    tsk_utils_log_info("SIP stack start: proxy='" + this.network.s_proxy_cscf_host + ":" + this.network.i_proxy_cscf_port + "', realm='" + this.network.o_uri_realm + "', impi='" + this.identity.s_impi + "', impu='" + this.identity.o_uri_impu + "'");

    this.network.o_transport = this.o_layer_transport.transport_new(this.network.e_proxy_cscf_type, this.network.s_proxy_cscf_host, this.network.i_proxy_cscf_port, "SIP Transport", __tsip_stack_transport_callback);
    if (!this.network.o_transport) {
        tsk_utils_log_error("Failed to create transport with type= " + this.network.e_proxy_cscf_type);
        return -2;
    }

    this.e_state = tsip_transport_state_e.STARTING;
    this.signal(tsip_event_code_e.STACK_STARTING, "Stack starting");
    return this.network.o_transport.start();
}

/**
* Stops the SIP stack. Feedbacks will be reported to @ref on_event_stack callback function
* @tparam int i_timeout Optional parameter used to defined maximum time in milliseconds to take to stop the stack. 
* Default value: 2000 millis
* @treturn int 0 if succeed and non-zero value otherwise
*/
tsip_stack.prototype.stop = function (i_timeout) {
    var This = this;
    setTimeout(function () {
        switch (This.e_state) {
            case tsip_transport_state_e.STOPPED:
            case tsip_transport_state_e.STOPPING:
            case tsip_transport_state_e.NONE:
                return 0;
            default:
                break;
        }

        if (typeof i_timeout == "undefined") {
            i_timeout = tsip_dialog.prototype.__i_timer_shutdown;
        }

        var i_register_dialogs_count = 0;
        var b_has_non_register_dialogs = false;
        var b_register_shutdown_sent = false;
        var i_ret;
        var i_timeout_non_register = (i_timeout << 1) / 3;
        var o_date_start = o_date_start = new Date();

        // shutdown all non-REGISTER dialogs
        for (var i = 0; i < This.o_layer_dialog.ao_dialogs.length; ++i) {
            if (This.o_layer_dialog.ao_dialogs[i].e_type == tsip_dialog_type_e.REGISTER) {
                ++i_register_dialogs_count;
                continue;
            }
            if ((i_ret = This.o_layer_dialog.ao_dialogs[i].shutdown()) == 0) {
                b_has_non_register_dialogs = true;
            }
        }

        var func_shutdown_non_register = function () {
            if (b_has_non_register_dialogs) {
                do {
                    if ((This.o_layer_dialog.ao_dialogs.length <= i_register_dialogs_count)) {
                        setTimeout(func_shutdown_register, 1); // success: move to next
                        return;
                    }
                    if ((new Date() - o_date_start) >= i_timeout_non_register) {
                        setTimeout(func_shutdown_register, 1); // timeout: move to next
                        return;
                    }
                }
                while (false);
            }

            setTimeout(func_shutdown_non_register, 1); // again
        }

        var func_shutdown_register = function () {
            // shutdown all REGISTER dialogs
            if (!b_register_shutdown_sent) {
                if (i_register_dialogs_count > 0) {
                    i_register_dialogs_count = 0;
                    for (var i = 0; i < This.o_layer_dialog.ao_dialogs.length; ++i) {
                        if (This.o_layer_dialog.ao_dialogs[i].e_type == tsip_dialog_type_e.REGISTER) {
                            if ((i_ret = This.o_layer_dialog.ao_dialogs[i].shutdown()) == 0) {
                                ++i_register_dialogs_count;
                            }
                        }
                    }
                }
                b_register_shutdown_sent = true;
            }

            do {
                if (This.o_layer_dialog.ao_dialogs.length == 0 || (new Date() - o_date_start) >= i_timeout) {
                    setTimeout(func_shutdown_transport, 1); // timeout/no-dialog-left: move to next
                    return;
                }
            }
            while (false);

            setTimeout(func_shutdown_register, 1); // again
        }

        var func_shutdown_transport = function () {
            if (This.o_layer_transport) {
                This.o_layer_transport.stop();
            }

            This.signal(tsip_event_code_e.STACK_STOPPED, "Stack stopped");
        }


        // Execute
        if (b_has_non_register_dialogs) {
            func_shutdown_non_register();
        }
        else if (i_register_dialogs_count) {
            func_shutdown_register();
        }
        else {
            func_shutdown_transport();
        }

    }, 1);

    return 0;
}

/**
* Sets static parameters.
* The function takes parameters created using static functions @b tsip_stack.prototype.Set*
* @sa @ref SetDisplayName
*/
tsip_stack.prototype.set = function () {
    return this.__set(arguments);
}

/**
* Sets SIP Display Name
* @tparam String s_display_name New SIP Display Name value
* @treturn Object Parameter object
*
@code
o_stack.set(tsip_stack.prototype.SetDisplayName('alice'));
@endcode
*/
tsip_stack.prototype.SetDisplayName = function (s_display_name) {
    return tsip_stack.prototype.SetAny(tsip_stack_param_type_e.DISPLAY_NAME, s_display_name);
}

/**
* Sets SIP password for authentication
* @tparam String s_password SIP password for authentication
* @treturn Object Parameter object
*
@code
o_stack.set(tsip_stack.prototype.SetPassword('mysecret'));
@endcode
*/
tsip_stack.prototype.SetPassword = function (s_password) {
    return tsip_stack.prototype.SetAny(tsip_stack_param_type_e.PASSWORD, s_password);
}

/**
* Updates SIP Proxy host, port and type. Using version 1.0 of sipML5 only WebSocket type is supported.
* @tparam String s_proxy_host Proxy IP address or hostname
* @tparam int i_proxy_port Proxy port
* @tparam tsip_transport_type_e e_proxy_type Network type. For now only @b WS and @b WSS are supported.
* @treturn Object Parameter object
*
@code
o_stack.set(tsip_stack.prototype.SetProxyCSCF("192.168.0.10", 5060, tsip_transport_type_e.UDP));
@endcode
*/
tsip_stack.prototype.SetProxyCSCF = function (s_proxy_host, i_proxy_port, e_proxy_type) {
    return tsip_stack.prototype.SetAny(tsip_stack_param_type_e.PROXY_CSCF, s_proxy_host, i_proxy_port, e_proxy_type);
}

/**
* Static parameter function used to set the SIP outbound proxy. This function is only needed if there is no DNS entries for the @b realm defined in the SIP stack creation.
* @tparam String s_proxy_host Outbound proxy host IP address or domain name. e.g. '192.168.0.10' or 'example.com'
* @tparam int i_proxy_port Outbound proxy port. e.g. 5060
* @tparam tsip_transport_type_e e_proxy_type Transport protocol type
*
@code
var o_stack = new tsip_stack("doubango.org", "alice", "sip:alice@doubango.org", "192.168.0.12", 5062,
tsip_stack.prototype.SetProxyOutBound("192.168.0.10", 5060, tsip_transport_type_e.UDP)
tsip_stack.prototype.SetPassword ("mypassword"),
tsip_stack.prototype.SetDisplayName("alice"),
tsip_stack.prototype.SetHeader("User-Agent", "IM-client/OMA1.0 sipML5/v0.0.0000.0"),
tsip_stack.prototype.SetHeader("Organization", "Doubango Telecom")
);
// or
o_stack.set(tsip_stack.prototype.SetProxyOutBound("192.168.0.10", 5060, tsip_transport_type_e.UDP));
@endcode
@sa @ref SetWebsocketServerUrl
*/
tsip_stack.prototype.SetProxyOutBound = function (s_proxy_host, i_proxy_port, e_proxy_type) {
    return tsip_stack.prototype.SetAny(tsip_stack_param_type_e.PROXY_OUTBOUND, s_proxy_host, i_proxy_port, e_proxy_type);
}

/**
* Static parameter function used to set the SIP outbound proxy url.
@code
var o_stack = new tsip_stack("doubango.org", "alice", "sip:alice@doubango.org", "192.168.0.12", 5062,
tsip_stack.prototype.SetProxyOutBoundUrl("udp://192.168.0.12:5060"),
tsip_stack.prototype.SetPassword ("mypassword"),
tsip_stack.prototype.SetDisplayName("alice"),
tsip_stack.prototype.SetHeader("User-Agent", "IM-client/OMA1.0 sipML5/v0.0.0000.0"),
tsip_stack.prototype.SetHeader("Organization", "Doubango Telecom")
);
// or
o_stack.set(tsip_stack.prototype.SetProxyOutBoundUrl("udp://192.168.0.12:5060"));
@endcode
@sa @ref SetProxyOutBound
*/
tsip_stack.prototype.SetProxyOutBoundUrl = function (s_url) {
    if (!s_url) {
        // restore default values
        return tsip_stack.prototype.SetProxyOutBound(null, 5060, tsip_transport_type_e.UDP);
    }

    var ao_params = tsk_string_parse_url(s_url);
    if (!ao_params || ao_params.length < 3) {
        tsk_utils_log_error(s_url + " not valid as outbound proxy url");
        return null;
    }

    var e_tranport;
    switch (ao_params[0]) {
        case "udp": default: e_tranport = tsip_transport_type_e.UDP; break;
        case "tcp": e_tranport = tsip_transport_type_e.TCP; break;
        case "tls": e_tranport = tsip_transport_type_e.TLS; break;
        case "dtls": e_tranport = tsip_transport_type_e.DTLS; break;
        case "sctp": e_tranport = tsip_transport_type_e.SCTP; break;
        case "ws": e_tranport = tsip_transport_type_e.WS; break;
        case "wss": e_tranport = tsip_transport_type_e.WSS; break;
    }
    return tsip_stack.prototype.SetProxyOutBound(ao_params[1], ao_params[2], e_tranport);
}

tsip_stack.prototype.SetWebsocketServerUrl = function (s_websocket_server_url) {
    return tsip_stack.prototype.SetAny(tsip_stack_param_type_e.WEBSOCKET_SERVER_URL, s_websocket_server_url);
}

// x_ice_server_urls : 'string' or 'array'
tsip_stack.prototype.SetIceServers = function (x_ice_server_urls) {
    return tsip_stack.prototype.SetAny(tsip_stack_param_type_e.ICE_SERVERS, x_ice_server_urls);
}

tsip_stack.prototype.SetMediaStreamCacheEnabled = function (b_cache_media_stream) {
    return tsip_stack.prototype.SetAny(tsip_stack_param_type_e.CACHE_MEDIA_STREAM, b_cache_media_stream);
}

tsip_stack.prototype.SetBandwidth = function (o_bandwidth) {
    return tsip_stack.prototype.SetAny(tsip_stack_param_type_e.BANDWIDTH, o_bandwidth);
}

tsip_stack.prototype.SetVideoSize = function (o_video_size) {
    return tsip_stack.prototype.SetAny(tsip_stack_param_type_e.VIDEO_SIZE, o_video_size);
}

tsip_stack.prototype.SetRTCWebBreakerEnabled = function (b_enabled) {
    return tsip_stack.prototype.SetAny(tsip_stack_param_type_e.ENABLE_RTCWEB_BREAKER, b_enabled);
}

tsip_stack.prototype.SetClick2CallEnabled = function (b_enabled) {
    return tsip_stack.prototype.SetAny(tsip_stack_param_type_e.ENABLE_CLICK2CALL, b_enabled);
}

tsip_stack.prototype.SetSecureTransportEnabled = function (b_enabled) {
    return tsip_stack.prototype.SetAny(tsip_stack_param_type_e.ENABLE_SECURE_TRANSPORT, b_enabled);
}

/**
* Whether to enable EarlyIMS (3GPP TR 33.978).
*/
tsip_stack.prototype.SetEarlyIMSEnabled = function (b_enabled) {
    return tsip_stack.prototype.SetAny(tsip_stack_param_type_e.EARLY_IMS, b_enabled);
}




/**
* Adds SIP header to all sessions created using this stack
* @tparam String s_name SIP header name
* @tparam String s_value SIP valaue
* @treturn Object Parameter object
*
@code
o_stack.set(
    tsip_stack.prototype.SetHeader('User-Agent', 'sipML5 client'),
    tsip_stack.prototype.SetHeader('Organization', 'Doubango Telecom')
);
@endcode
*/
tsip_stack.prototype.SetHeader = function(s_name, s_value) {
    return tsip_stack.prototype.SetAny(tsip_stack_param_type_e.HEADER, s_name, s_value);
}

/*
* Internal function used to set any parameter
*/
tsip_stack.prototype.__set = function (ao_params) {
    var o_curr;
    for (var i = 0; i < ao_params.length; ++i) {
        o_curr = ao_params[i];
        if (!o_curr) {
            continue;
        }

        switch (o_curr.e_type) {

            /* === Identity === */ 
            case tsip_stack_param_type_e.DISPLAY_NAME:
                {
                    this.identity.s_display_name = o_curr.ao_values[0];
                    if(this.identity.o_uri_impu){
                        this.identity.o_uri_impu.s_display_name = this.identity.s_display_name;
                    }
                    break;
                }
            case tsip_stack_param_type_e.PASSWORD:
                {
                    this.identity.s_password = o_curr.ao_values[0];
                    break;
                }


                /* === Network === */
            case tsip_stack_param_type_e.PROXY_CSCF:
                {
                    this.network.s_proxy_cscf_host = o_curr.ao_values[0];
                    this.network.i_proxy_cscf_port = o_curr.ao_values[1];
                    this.network.e_proxy_cscf_type = o_curr.ao_values[2];
                    break;
                }
            case tsip_stack_param_type_e.PROXY_OUTBOUND:
                {
                    this.network.s_proxy_outbound_host = o_curr.ao_values[0];
                    this.network.i_proxy_outbound_port = o_curr.ao_values[1];
                    this.network.e_proxy_outbound_type = o_curr.ao_values[2];
                    break;
                }
            case tsip_stack_param_type_e.WEBSOCKET_SERVER_URL:
                {
                    // e.g. wss://192.168.0.10:5060/myurl
                    this.network.s_websocket_server_url = o_curr.ao_values[0];
                    // the default transport is WS and must be changed if the user provides it's own url
                    if (this.network.s_websocket_server_url) {
                        if (this.network.s_websocket_server_url.indexOf("wss://") == 0) {
                            this.network.e_proxy_cscf_type = tsip_transport_type_e.WSS;
                        }
                        else if (this.network.s_websocket_server_url.indexOf("ws://") == 0) {
                            this.network.e_proxy_cscf_type = tsip_transport_type_e.WS;
                        }
                    }
                    break;
                }
            case tsip_stack_param_type_e.ICE_SERVERS:
                {
                    if(!tsk_string_is_null_or_empty(o_curr.ao_values[0])){
                        try{
                            if (o_curr.ao_values[0] instanceof String || typeof o_curr.ao_values[0] == "string") {
                                eval("this.network.ao_ice_servers = " + o_curr.ao_values[0] + ";");
                            }
                            else if(o_curr.ao_values[0] instanceof Array || typeof o_curr.ao_values[0] == "array"){
                                this.network.ao_ice_servers = o_curr.ao_values[0];
                            }
                            else{
                                tsk_utils_log_warn(o_curr.ao_values[0] + " not valid as ICE servers");
                            }
                        }
                        catch(e){
                            tsk_utils_log_error('Failed to set ICE servers:' + e);
                        }
                    }
                    
                    break;
                }
            case tsip_stack_param_type_e.ENABLE_RTCWEB_BREAKER:
                {
                    this.network.b_rtcweb_enabled = !!o_curr.ao_values[0];
                    break;
                }
            case tsip_stack_param_type_e.ENABLE_CLICK2CALL:
                {
                    this.network.b_click2call_enabled = !!o_curr.ao_values[0];
                    break;
                }

            case tsip_stack_param_type_e.ENABLE_SECURE_TRANSPORT:
                {
                    if (o_curr.ao_values[0] && this.network.e_proxy_cscf_type == tsip_transport_type_e.WS) {
                        this.network.e_proxy_cscf_type = tsip_transport_type_e.WSS;
                    }
                    break;
                }


                /* === Security === */
            case tsip_stack_param_type_e.EARLY_IMS:
                {
                    this.security.b_earlyIMS = !!o_curr.ao_values[0];
                    break;
                }

                /* === Media === */
            case tsip_stack_param_type_e.CACHE_MEDIA_STREAM:
                {
                    this.media.b_cache_stream = !!o_curr.ao_values[0];
                    break;
                }
            case tsip_stack_param_type_e.BANDWIDTH:
                {
                    this.media.o_bandwidth = o_curr.ao_values[0];
                    break;
                }
            case tsip_stack_param_type_e.VIDEO_SIZE:
                {  
                    this.media.o_video_size = o_curr.ao_values[0];
                    break;
                }

                /* === Dummy Headers === */
            case tsip_stack_param_type_e.HEADER:
                {
                    if (o_curr.ao_values[1]) { // add
                        this.ao_headers.push(new tsip_header_Dummy(o_curr.ao_values[0], o_curr.ao_values[1]));
                    }
                    else { // remove
                        var i_index = tsip_header.prototype.IndexOfByName(this.ao_headers, o_curr.ao_values[0]);
                        if (i_index != -1) {
                            this.ao_headers.splice(i_index, 1);
                        }
                    }
                    break;
                }
        }

    }
    return 0;
}

/*
* Internal function
*/
tsip_stack.prototype.__get_contact_uri = function (s_protocol) {
    for (var i = 0; i < this.o_layer_transport.ao_transports.length; ++i) {
        var o_uri = this.o_layer_transport.ao_transports[i].get_uri(false);
        if (o_uri) {
            o_uri.s_user_name = this.identity.o_uri_impu.s_user_name;
            return o_uri;
        }
    }
    return null;
}

/*
* Internal function
*/
tsip_stack.prototype.__get_proxy_outbound_uri_string = function () {
    if (this.network.s_proxy_outbound_host) {
        var s_tansport;
        switch (this.network.e_proxy_outbound_type) {
            case tsip_transport_type_e.TCP: s_tansport= "tcp"; break;
            case tsip_transport_type_e.TLS: s_tansport= "tls"; break;
            case tsip_transport_type_e.SCTP: s_tansport= "sctp"; break;
            case tsip_transport_type_e.DTLS: s_tansport= "dtls"; break;
            case tsip_transport_type_e.WS: s_tansport= "ws"; break;
            case tsip_transport_type_e.WSS: s_tansport= "wss"; break;
            case tsip_transport_type_e.UDP: default: s_tansport= "udp"; break;
        }
        return tsk_string_format("<sip:{0}:{1};lr;sipml5-outbound;transport={2}>", this.network.s_proxy_outbound_host, this.network.i_proxy_outbound_port, s_tansport);
    }
    return null;
}

/*
* Internal function
*/
tsip_stack.prototype.SetAny = function(e_type){
    var obj = new Object();
    obj.e_type = e_type;
    obj.ao_values = Array.prototype.slice.call(arguments, 1);
    return obj;
}

/*
* Internal function
*/
tsip_stack.prototype.signal = function (i_code, s_phrase) {
    if (this.on_event_stack) {
        var on_event = this.on_event_stack;
        var o_event = new tsip_event(null, i_code, s_phrase, null, tsip_event_type_e.STACK);
        o_event.o_stack = this;
        setTimeout(function () { on_event(o_event) }, 1);
    }
    return 0;
}

/*
* Internal function
*/
function __tsip_stack_transport_callback(evt) {
    var o_stack = evt.o_transport.o_stack;

    switch (evt.e_type) {
        case tsip_transport_event_type_e.STARTED:
            {
                o_stack.e_state = tsip_transport_state_e.STARTED;
                o_stack.signal(tsip_event_code_e.STACK_STARTED, "Stack started");
                break;
            }

        case tsip_transport_event_type_e.STOPPED:
            {
                if (o_stack.e_state == tsip_transport_state_e.STARTING) {
                    o_stack.signal(tsip_event_code_e.STACK_FAILED_TO_START, "Failed to connet to the server");
                }
                else {
                    o_stack.signal(tsip_event_code_e.STACK_STOPPED, "Stack stopped");
                }
                o_stack.e_state = tsip_transport_state_e.STOPPED;
                o_stack.o_layer_transport.transport_remove(evt.o_transport);
                break;
            }

        case tsip_transport_event_type_e.ERROR:
            {
                break;
            }
    }
        
    return 0;
}