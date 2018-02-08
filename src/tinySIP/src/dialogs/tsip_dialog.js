/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
tsip_dialog.prototype.__i_timer_shutdown = 3000; // milliseconds

var tsip_dialog_type_e =
{
    UNKNOWN: { i_id: 0, s_name: "Unknown" },
    INVITE: { i_id: 1, s_name: "INVITE" },
    MESSAGE: { i_id: 2, s_name: "MESSAGE" },
    INFO: { i_id: 3, s_name: "INFO" },
    OPTIONS: { i_id: 4, s_name: "OPTIONS" },
    PUBLISH: { i_id: 5, s_name: "PUBLISH" },
    REGISTER: { i_id: 6, s_name: "REGISTER" },
    SUBSCRIBE: { i_id: 7, s_name: "SUBSCRIBE" }
};

var tsip_dialog_state_e =
{
    INITIAL: { i_id: 0, s_name: "Initial" },
    EARLY: { i_id: 1, s_name: "Early" },
    ESTABLISHED: { i_id: 2, s_name: "Established" },
    TERMINATED: { i_id: 3, s_name: "Terminated" }
};

var tsip_dialog_event_type_e =
{
    I_MSG: { i_id: 0, s_name: "I_MSG" },
    O_MSG: { i_id: 1, s_name: "O_MSG" },
    TRANSAC_OK: { i_id: 2, s_name: "TRANSAC_OK" },
    CANCELED: { i_id: 3, s_name: "CANCELED" },
    TERMINATED: { i_id: 4, s_name: "TERMINATED" },
    TIMEDOUT: { i_id: 5, s_name: "TIMEDOUT" },
    ERROR: { i_id: 6, s_name: "ERROR" },
    TRANSPORT_ERROR: { i_id: 7, s_name: "TRANSPORT_ERROR" }
};

function tsip_dialog() {
    this.e_type = tsip_dialog_type_e.UNKNOWN;

    this.o_fsm = null;

    this.o_session = null;
    this.o_action_curr = null;

    this.e_state = tsip_dialog_state_e.INITIAL;
    this.b_initialized = false;
    this.b_running = false;

    this.last_error = {};
    this.last_error.s_phrase = null;
    this.last_error.i_code = 0;
    this.last_error.o_message = null;

    this.s_tag_local = null;
    this.o_uri_local = null;
    this.s_tag_remote = null;
    this.o_uri_remote = null;
    this.o_uri_remote_target = null;

    this.i_cseq_value = 0;
    this.s_cseq_method = null;

    this.i_expires = 0; // in milliseconds

    this.s_callid = null;

    this.ao_hdr_record_routes = null;
    this.ao_challenges = null;

    this.fn_callback = null;
}

tsip_dialog.prototype.init = function (e_type, s_callid, o_session, i_fsm_state_curr, i_fsm_state_term) {
    if (this.b_initialized) {
        tsk_utils_log_error("Dialog already initialized");
        return -2;
    }

    this.e_state = tsip_dialog_state_e.INITIAL;
    this.e_type = e_type;

    this.ao_hdr_record_routes = new Array();
    this.ao_challenges = new Array();

    this.i_expires = tsip_session.prototype.__i_expires_default;

    var b_svr_side = !tsk_string_is_null_or_empty(s_callid);
    this.s_callid = b_svr_side ? s_callid : tsk_string_random_uuid();

    if ((this.o_session = o_session)) {
        // expires
        this.i_expires = o_session.i_expires;
        // From
        this.o_uri_local = b_svr_side ? o_session.o_uri_to : o_session.o_uri_from;
        // To
        if (o_session.o_uri_to) {
            this.o_uri_remote = o_session.o_uri_to;
            this.o_uri_remote_target = o_session.o_uri_to; // request-uri
        }
        else {
            this.o_uri_remote = o_session.o_uri_from;
            this.o_uri_remote_target = o_session.o_stack.network.o_uri_realm; // request-uri
        }
    }

    // tags
    this.s_tag_local = tsk_string_random(20);
    this.s_tag_remote = null;

    // CSeq
    this.i_cseq_value = Math.floor((Math.random() * 0x0000FFFF));

    // FSM
    this.o_fsm = new tsk_fsm(i_fsm_state_curr, i_fsm_state_term, null, this);

    this.b_initialized = true;

    return 0;
}

tsip_dialog.prototype.deinit = function () {
    this.get_layer_dialog().dialog_remove(this);
    this.get_layer_transac().cancel_by_dialog(this);
    this.b_initialized = false;

    return 0;
}

tsip_dialog.prototype.compare = function (o_dialog) {
    return tsip_dialog_compare(this, o_dialog);
};

tsip_dialog.prototype.request_new = function (s_method) {
    if (!this.o_session || !this.o_session.o_stack || !s_method) {
        tsk_utils_log_error("Invalid argument");
        return null;
    }
    var o_request = null;
    var o_uri_to = null;
    var o_uri_from = null;
    var o_uri_request = null;
    var i_copy_routes_start = -1; //none
    var s_callid = null;
    var o_session = this.o_session;
    var o_stack = o_session.o_stack;


    /*
    RFC 3261 - 12.2.1.1 Generating the Request

    The Call-ID of the request MUST be set to the Call-ID of the dialog.
    */
    s_callid = this.s_callid;

    /*
    RFC 3261 - 12.2.1.1 Generating the Request

    Requests within a dialog MUST contain strictly monotonically
    increasing and contiguous CSeq sequence numbers (increasing-by-one)
    in each direction (excepting ACK and CANCEL of course, whose numbers
    equal the requests being acknowledged or cancelled).  Therefore, if
    the local sequence number is not empty, the value of the local
    sequence number MUST be incremented by one, and this value MUST be
    placed into the CSeq header field.
    */
    /*if(!tsk_striequals(method, "ACK") && !tsk_striequals(method, "CANCEL"))
    {
    this.cseq_value +=1;
    }
    ===> See send method (cseq will be incremented before sending the request)
    */


    /*
    RFC 3261 - 12.2.1.1 Generating the Request

    The URI in the To field of the request MUST be set to the remote URI
    from the dialog state.  The tag in the To header field of the request
    MUST be set to the remote tag of the dialog ID.  The From URI of the
    request MUST be set to the local URI from the dialog state.  The tag
    in the From header field of the request MUST be set to the local tag
    of the dialog ID.  If the value of the remote or local tags is null,
    the tag parameter MUST be omitted from the To or From header fields,
    respectively.
    */
    o_uri_to = this.o_uri_remote;
    o_uri_from = this.o_uri_local;


    /*
    RFC 3261 - 12.2.1.1 Generating the Request

    If the route set is empty, the UAC MUST place the remote target URI
    into the Request-URI.  The UAC MUST NOT add a Route header field to
    the request.
    */
    if (!this.ao_hdr_record_routes || this.ao_hdr_record_routes.length == 0) {
        o_uri_request = this.o_uri_remote_target;
    }

    /*
    RFC 3261 - 12.2.1.1 Generating the Request

    If the route set is not empty, and the first URI in the route set
    contains the lr parameter (see Section 19.1.1), the UAC MUST place
    the remote target URI into the Request-URI and MUST include a Route
    header field containing the route set values in order, including all
    parameters.

    If the route set is not empty, and its first URI does not contain the
    lr parameter, the UAC MUST place the first URI from the route set
    into the Request-URI, stripping any parameters that are not allowed
    in a Request-URI.  The UAC MUST add a Route header field containing
    the remainder of the route set values in order, including all
    parameters.  The UAC MUST then place the remote target URI into the
    Route header field as the last value.

    For example, if the remote target is sip:user@remoteua and the route
    set contains:

    <sip:proxy1>,<sip:proxy2>,<sip:proxy3;lr>,<sip:proxy4>
    */
    else {
        o_uri_first_route = this.ao_hdr_record_routes[0].o_uri;
        if (tsk_params_have_param(o_uri_first_route.ao_params, "lr")) {
            o_uri_request = this.o_uri_remote_target;
            i_copy_routes_start = 0;
        }
        else {
            o_uri_request = o_uri_first_route;
            i_copy_routes_start = 1;
        }
    }

    /*=====================================================================
    */
    o_request = new tsip_request(s_method, o_uri_request, o_uri_from, o_uri_to, s_callid, this.i_cseq_value);
    o_request.o_hdr_To.s_tag = this.s_tag_remote;
    o_request.o_hdr_From.s_tag = this.s_tag_local;
    o_request.b_update = true; /* Now signal that the message should be updated by the transport layer (e.g. Contact, SigComp, IPSec, ...) */

    /*
    RFC 3261 - 12.2.1.1 Generating the Request

    A UAC SHOULD include a Contact header field in any target refresh
    requests within a dialog, and unless there is a need to change it,
    the URI SHOULD be the same as used in previous requests within the
    dialog.  If the "secure" flag is true, that URI MUST be a SIPS URI.
    As discussed in Section 12.2.2, a Contact header field in a target
    refresh request updates the remote target URI.  This allows a UA to
    provide a new contact address, should its address change during the
    duration of the dialog.
    */
    switch (o_request.line.request.e_type) {
        case tsip_request_type_e.MESSAGE:
        case tsip_request_type_e.PUBLISH:
        case tsip_request_type_e.BYE:
            {
                if (o_request.line.request.e_type == tsip_request_type_e.PUBLISH) {
                    o_request.add_header(new tsip_header_Expires(this.i_expires / 1000));
                }
                /* add caps in "Accept-Contact" headers */
                for (var i = 0; i < this.o_session.ao_caps.length; ++i) {
                    var s_value = tsk_string_format("*;{0}", tsk_param_tostring(this.o_session.ao_caps[i]));
                    if (s_value) {
                        o_request.add_header(new tsip_header_Dummy("Accept-Contact", s_value));
                    }
                }
                break;
            }

        default:
            {
                var s_contact = null;
                var ao_hdr_contacts = null;

                if (o_request.line.request.e_type == tsip_request_type_e.OPTIONS ||
					o_request.line.request.e_type == tsip_request_type_e.PUBLISH ||
					o_request.line.request.e_type == tsip_request_type_e.REGISTER) {
                    /**** with expires */
                    s_contact = tsk_string_format("m: \"{1}\"<{0}:{2}@{3}:{4};rtcweb-breaker={5}>;click2call={6};expires={7}\r\n",
                        "sip",
                        o_stack.identity.s_display_name,
                        o_uri_from.s_user_name,
                        "127.0.0.1",
                        5060,
                        o_stack.network.b_rtcweb_enabled ? "yes" : "no",
                        o_stack.network.b_click2call_enabled ? "yes" : "no",
                        Math.floor(this.i_expires / 1000));
                }
                else {
                    /**** without expires */
                    if (o_request.line.request.e_type == tsip_request_type_e.SUBSCRIBE) {
                        /* RFC 3265 - 3.1.1. Subscription Duration
                        An "expires" parameter on the "Contact" header has no semantics for SUBSCRIBE and is explicitly 
                        not equivalent to an "Expires" header in a SUBSCRIBE request or response.
                        */
                        o_request.add_header(new tsip_header_Expires(this.i_expires / 1000));
                    }
                    s_contact = tsk_string_format("m: \"{1}\"<{0}:{2}@{3}:{4};rtcweb-breaker={5};click2call={6}>",
                        "sip",
                        o_stack.identity.s_display_name,
                        o_uri_from.s_user_name,
                        "127.0.0.1",
                        5060,
                        o_stack.network.b_rtcweb_enabled ? "yes" : "no",
                        o_stack.network.b_click2call_enabled ? "yes" : "no");

                    if (o_request.line.request.e_type == tsip_request_type_e.INVITE && o_stack.network.b_rtcweb_enabled) {
                        // contact parameters must be encoded as the ABNF is:
                        // gen_value = token | host | quoted_string;
	                    // generic_param = token ( EQUAL gen_value )?;
                        // for example, impi with value equal to "mamadou@example.org" whill be encoded as "mamadou%40example.org"
                        s_contact += ";impi=" + encodeURIComponent(o_stack.identity.s_impi);
                        s_contact += ";ha1=" + tsip_auth_digest_HA1(o_stack.identity.s_impi, o_stack.network.o_uri_realm.s_host, o_stack.identity.s_password);
                    }
                    s_contact += "\r\n";
                }
                ao_hdr_contacts = tsip_header_Contact.prototype.Parse(s_contact);
                if (ao_hdr_contacts && ao_hdr_contacts.length > 0) {
                    o_request.o_hdr_Contact = ao_hdr_contacts[0];
                }

                /* Add capabilities as per RFC 3840 */
                if (o_request.o_hdr_Contact) {
                    for (var i = 0; i < this.o_session.ao_caps.length; ++i) {
                        tsk_params_add_param(o_request.o_hdr_Contact.ao_params, this.o_session.ao_caps[i]);
                    }
                }

                break;
            }
    }

    /* Update authorizations */
    if (this.e_state == tsip_dialog_state_e.INITIAL && this.ao_challenges.length == 0) {
        /* 3GPP TS 33.978 6.2.3.1 Procedures at the UE
        On sending a REGISTER request in order to indicate support for early IMS security procedures, the UE shall not
        include an Authorization header field and not include header fields or header field values as required by RFC3329.
        */
        if (o_request.is_register() && !o_stack.security.b_earlyIMS) {
            /*	3GPP TS 24.229 - 5.1.1.2.2 Initial registration using IMS AKA
            On sending a REGISTER request, the UE shall populate the header fields as follows:
            a) an Authorization header field, with:
            - the "username" header field parameter, set to the value of the private user identity;
            - the "realm" header field parameter, set to the domain name of the home network;
            - the "uri" header field parameter, set to the SIP URI of the domain name of the home network;
            - the "nonce" header field parameter, set to an empty value; and
            - the "response" header field parameter, set to an empty value;
            */
            var s_realm = o_stack.network.o_uri_realm ? o_stack.network.o_uri_realm.s_host : "(null)";
            var s_uri_request = tsip_uri_tostring(o_request.line.request.o_uri, false, false);
            var hdr_auth = tsip_challenge.prototype.CreateEmptyHeaderAuthorization(o_stack.identity.s_impi, s_realm, s_uri_request);
            o_request.add_header(hdr_auth);
        }
    }
    else if (this.ao_challenges.length > 0) {
        for (var i = 0; i < this.ao_challenges.length; ++i) {
            var o_hdr_auth = this.ao_challenges[i].create_header_authorization(o_request);
            if (o_hdr_auth) {
                o_request.add_header(o_hdr_auth);
            }
        }
    }

    /* Update CSeq */
    /*	RFC 3261 - 13.2.2.4 2xx Responses
    Generating ACK: The sequence number of the CSeq header field MUST be
    the same as the INVITE being acknowledged, but the CSeq method MUST
    be ACK.  The ACK MUST contain the same credentials as the INVITE.  If
    the 2xx contains an offer (based on the rules above), the ACK MUST
    carry an answer in its body.
    ==> CSeq number will be added/updated by the caller of this function,
    credentials were added above.
    */
    if (!o_request.is_ack() && !o_request.is_cancel()) {
        o_request.o_hdr_CSeq.i_seq = ++(this.i_cseq_value);
    }

    /* Route generation 
    *	==> http://betelco.blogspot.com/2008/11/proxy-and-service-route-discovery-in.html
    * The dialog Routes have been copied above.

    3GPP TS 24.229 - 5.1.2A.1 UE-originating case

    The UE shall build a proper preloaded Route header field value for all new dialogs and standalone transactions. The UE
    shall build a list of Route header field values made out of the following, in this order:
    a) the P-CSCF URI containing the IP address or the FQDN learnt through the P-CSCF discovery procedures; and
    b) the P-CSCF port based on the security mechanism in use:

    - if IMS AKA or SIP digest with TLS is in use as a security mechanism, the protected server port learnt during
    the registration procedure;
    - if SIP digest without TLS, NASS-IMS bundled authentciation or GPRS-IMS-Bundled authentication is in
    use as a security mechanism, the unprotected server port used during the registration procedure;
    c) and the values received in the Service-Route header field saved from the 200 (OK) response to the last
    registration or re-registration of the public user identity with associated contact address.
    */
    if (!o_request.is_register()) {	// According to the above link ==> Initial/Re/De registration do not have routes.
        if (i_copy_routes_start != -1) {	/* The dialog already have routes ==> copy them. */
            if (this.e_state == tsip_dialog_state_e.EARLY || this.e_state == tsip_dialog_state_e.ESTABLISHED) {
                var i_index = -1;
                for (var i = 0; i < this.ao_hdr_record_routes.length; ++i) {
                    var o_uri = this.ao_hdr_record_routes[i].o_uri;
                    var hdr_route = null;
                    if (++i_index < i_copy_routes_start || !o_uri) {
                        continue;
                    }

                    if ((hdr_route = new tsip_header_Route(o_uri))) {
                        // copy parameters: see http://code.google.com/p/imsdroid/issues/detail?id=52
                        for (var j = 0; j < this.ao_hdr_record_routes[i].ao_params.length; ++j) {
                            hdr_route.ao_params.push(this.ao_hdr_record_routes[i].ao_params[j]);
                        }

                        o_request.add_header(hdr_route);
                    }
                }
            }
        }
        else {	/* No routes associated to this dialog. */
            if (this.e_state == tsip_dialog_state_e.INITIAL || this.e_state == tsip_dialog_state_e.EARLY) {
                /*	GPP TS 24.229 section 5.1.2A [Generic procedures applicable to all methods excluding the REGISTER method]:
                The UE shall build a proper preloaded Route header field value for all new dialogs and standalone transactions. The UE
                shall build a list of Route header field values made out of the following, in this order:
                a) the P-CSCF URI containing the IP address or the FQDN learnt through the P-CSCF discovery procedures; and
                b) the P-CSCF port based on the security mechanism in use:
                - if IMS AKA or SIP digest with TLS is in use as a security mechanism, the protected server port learnt during
                the registration procedure;
                - if SIP digest without TLS, NASS-IMS bundled authentciation or GPRS-IMS-Bundled authentication is in
                use as a security mechanism, the unprotected server port used during the registration procedure;
                c) and the values received in the Service-Route header field saved from the 200 (OK) response to the last
                registration or re-registration of the public user identity with associated contact address.
                */

                //var o_uri = o_stack.get_pcscf_uri(true);
                // Proxy-CSCF as first route
                //if(o_uri){
                //    o_request.add_header(new tsip_header_Route(o_uri));
                //}

                // Service routes
                for (var i = 0; i < o_stack.ao_uri_service_routes.length; ++i) {
                    o_request.add_header(new tsip_header_Service_Route(o_stack.ao_uri_service_routes[i]));
                }
            }
        }
    }

    /* Add outbound proxy */
    // The outbound proxy is added as Route header only if the transport is WS/WSS to allow webrtc2sip to forward the request to the right destination
    // For all other protocols (e.g UDP) the request will already be sent to the outbound proxy address
    if (o_stack.network.e_proxy_cscf_type == tsip_transport_type_e.WS || o_stack.network.e_proxy_cscf_type == tsip_transport_type_e.WSS) {
        var s_proxy_outbound = o_stack.__get_proxy_outbound_uri_string();
        if (s_proxy_outbound) {
            o_request.add_header(new tsip_header_Dummy("Route", s_proxy_outbound), true/*top*/);
        }
    }

    /* Add headers associated to the dialog's session */
    for (var i = 0; i < o_session.ao_headers.length; ++i) {
        o_request.add_header(o_session.ao_headers[i]);
    }

    /* Add headers associated to the dialog's stack */
    for (var i = 0; i < o_stack.ao_headers.length; ++i) {
        o_request.add_header(o_stack.ao_headers[i]);
    }

    /* Add common headers */
    this.add_common_headers(o_request);

    /* SigComp */
    if (o_session.s_sigcomp_id) {
        /* should be added in this field instead of 'Contact' or 'Via' headers
        * it's up to the transport layer to copy it to these headers */
        o_request.s_sigcomp_id = o_session.s_sigcomp_id;
    }

    return o_request;
}

tsip_dialog.prototype.response_new = function (i_status, s_phrase, o_request) {
    /* Reponse is created as per RFC 3261 subclause 8.2.6 and (headers+tags) are copied
    * as per subclause 8.2.6.2.
    */
    var o_response;
    if ((o_response = new tsip_response(i_status, s_phrase, o_request))) {
        switch (o_request.line.request.e_type) {
            case tsip_request_type_e.MESSAGE:
            case tsip_request_type_e.PUBLISH:
                break;
            default:
                /* Is there a To tag?  */
                if (o_response.o_hdr_To && !o_response.o_hdr_To.s_tag) {
                    o_response.o_hdr_To.s_tag = this.s_tag_local;
                }
                /* Contact Header (for 101-299 reponses) */
                if (this.o_uri_local && i_status >= 101 && i_status <= 299) {
                    var ao_hdr_contacts;

                    var s_contact = tsk_string_format("m: <{0}:{1}@{2}:{3}>\r\n", "sip", this.o_uri_local.s_user_name, "127.0.0.1", 5060);
                    var ao_hdr_contacts = tsip_header_Contact.prototype.Parse(s_contact);
                    if (ao_hdr_contacts != null && ao_hdr_contacts.length > 0) {
                        o_response.o_hdr_Contact = ao_hdr_contacts[0];
                        o_response.b_update = true; /* Now signal that the message should be updated by the transport layer (e.g. Contact, SigComp, IPSec, ...) */
                    }
                }
                break;
        }

        /* SigComp */
        if (this.get_session().s_sigcomp_id) {
            /* should be added in this field instead of 'Contact' or 'Via' headers
            * it's up to the transport layer to copy it to these headers */
            o_response.s_sigcomp_id = this.get_session().s_sigcomp_id;
        }
    }
    return o_response;
}

tsip_dialog.prototype.response_send = function (o_response) {
    var i_ret = -1;
    var o_layer_transac = this.get_layer_transac();

    if (o_layer_transac) {
        /* As this is a response ...then use the associate server transaction */
        var o_transac = o_layer_transac.find_server(o_response);
        if (o_transac) {
            setTimeout(function () { o_transac.callback(tsip_transac_event_type_e.OUTGOING_MSG, o_response); }, 1);
            i_ret = 0;
        }
        else {
            tsk_utils_log_error("Failed to find associated server transaction.");
            // Send "408 Request Timeout" (should be done by the transaction layer)?
        }
    }
    else {
        tsk_utils_log_error("Invalid parameter");
    }
    return i_ret;
}

tsip_dialog.prototype.get_session = function () {
    return this.o_session;
}

tsip_dialog.prototype.get_stack = function () {
    if (this.o_session) {
        return this.o_session.o_stack;
    }
    return null;
}

tsip_dialog.prototype.get_layer_transac = function () {
    var o_stack = this.get_stack();
    if (o_stack) {
        return o_stack.o_layer_transac;
    }
    return null;
}

tsip_dialog.prototype.get_layer_dialog = function () {
    var o_stack = this.get_stack();
    if (o_stack) {
        return o_stack.o_layer_dialog;
    }
    return null;
}

tsip_dialog.prototype.get_layer_transport = function () {
    var o_stack = this.get_stack();
    if (o_stack) {
        return o_stack.o_layer_transport;
    }
    return null;
}

tsip_dialog.prototype.request_send = function (o_request) {
    if (!o_request) {
        tsk_utils_log_error("Invalid argument");
        return -1;
    }

    /*	RFC 3261 - 13.2.2.4 2xx Responses
    Once the ACK has been constructed, the procedures of [4] are used to
    determine the destination address, port and transport.  However, the
    request is passed to the transport layer directly for transmission,
    rather than a client transaction.  This is because the UAC core
    handles retransmissions of the ACK, not the transaction layer.  The
    ACK MUST be passed to the client transport every time a
    retransmission of the 2xx final response that triggered the ACK
    arrives.
    */
    if (o_request.is_ack()) {
        if (this.get_layer_transport().send(null, o_request) > 0) {
            return 0;
        }
        return -2;
    }

    var o_layer_transac = this.get_layer_transac();
    if (!o_layer_transac) {
        tsk_utils_log_error("Invalid transac layer");
        return -1;
    }

    var i_ret = -1;

    /*	Create new transaction. The new transaction will be added to the transaction layer. 
    The transaction has all information to create the right transaction type (NICT or ICT).
    As this is an outgoing request ==> It shall be a client transaction (NICT or ICT).
    For server transactions creation see "tsip_dialog_response_send()".
    */
    var o_transac = o_layer_transac.transac_new(true, o_request, this);

    /* Set the transaction's dialog. All events comming from the transaction (timeouts, errors ...) will be signaled to this dialog. */
    if (o_transac) {
        switch (o_transac.e_type) {
            case tsip_transac_type_e.ICT:
            case tsip_transac_type_e.NICT:
                {
                    /* Start the newly create IC/NIC transaction */
                    i_ret = o_transac.start(o_request);
                    break;
                }
        }
    }

    return i_ret;
};

tsip_dialog.prototype.add_common_headers = function (o_request) {
    var b_earlyIMS = false;
    var o_uri_preferred_identity = null;
    var s_netinfo = null;
    var o_stack = this.get_stack();

    if (!o_request || !o_stack) {
        tsk_utils_log_error("Invalid argument");
        return -1;
    }

    b_earlyIMS = o_stack.security.b_earlyIMS;
    o_uri_preferred_identity = o_stack.identity.o_uri_pref;

    //	P-Preferred-Identity
    if (o_uri_preferred_identity) {
        /*	3GPP TS 33.978 6.2.3.1 Procedures at the UE
        The UE shall use the temporary public user identity (IMSI-derived IMPU, cf. section 6.1.2) only in registration
        messages (i.e. initial registration, re-registration or de-registration), but not in any other type of SIP requests.
        */
        switch (o_request.line.request.e_type) {
            case tsip_request_type_e.BYE:
            case tsip_request_type_e.INVITE:
            case tsip_request_type_e.OPTIONS:
            case tsip_request_type_e.SUBSCRIBE:
            case tsip_request_type_e.NOTIFY:
            case tsip_request_type_e.REFER:
            case tsip_request_type_e.MESSAGE:
            case tsip_request_type_e.PUBLISH:
            case tsip_request_type_e.REGISTER:
                {
                    if (!b_earlyIMS || (b_earlyIMS && o_request.is_register())) {
                        o_request.add_header(new tsip_header_P_Preferred_Identity(o_uri_preferred_identity));
                    }
                    break;
                }
        }
    }

    //	P-Access-Network-Info
    if (s_netinfo) {
        switch (o_request.line.request.e_type) {
            case tsip_request_type_e.BYE:
            case tsip_request_type_e.INVITE:
            case tsip_request_type_e.OPTIONS:
            case tsip_request_type_e.REGISTER:
            case tsip_request_type_e.SUBSCRIBE:
            case tsip_request_type_e.NOTIFY:
            case tsip_request_type_e.PRACK:
            case tsip_request_type_e.INFO:
            case tsip_request_type_e.UPDATE:
            case tsip_request_type_e.REFER:
            case tsip_request_type_e.MESSAGE:
            case tsip_request_type_e.PUBLISH:
                {
                    o_request.add_header(new tsip_header_P_Access_Network_Info(s_netinfo));
                    break;
                }
        }
    }

    return 0;
}

tsip_dialog.prototype.get_action_curr = function () {
    return this.o_action_curr;
}

tsip_dialog.prototype.set_action_curr = function (o_action) {
    this.o_action_curr = o_action;
    return 0;
}

// o_message: optional
tsip_dialog.prototype.set_last_error = function (i_code, s_phrase, o_message) {
    this.last_error.i_code = i_code;
    this.last_error.s_phrase = s_phrase;
    this.last_error.o_message = o_message;
    return 0;
}

// o_message: optional
tsip_dialog.prototype.signal = function (i_code, s_phrase, o_message) {
    return tsip_event.prototype.Signal(tsip_event_type_e.DIALOG, this.o_session, i_code, s_phrase, o_message);
}

tsip_dialog.prototype.timer_schedule = function (T, N) {
    this.timer_cancel(N);
    var This = this;
    var s_code = tsk_string_format("This.o_timer{1} = setTimeout(function(){ __tsip_dialog_{0}_timer_callback(This, This.o_timer{1})}, This.i_timer{1});", T, N);
    eval(s_code);
}

tsip_dialog.prototype.timer_cancel = function (N) {
    var s_code = tsk_string_format("if(this.o_timer{0}) { clearTimeout(this.o_timer{0}); this.o_timer{0} = null; }", N);
    eval(s_code);
}

tsip_dialog.prototype.callback = function (e_event_type, o_message) {
    if (this.fn_callback) {
        return this.fn_callback(this, e_event_type, o_message);
    }
    tsk_utils_log_error("Invalid callback function");
    return -1;
}

tsip_dialog.prototype.set_callback = function (fn_callback) {
    this.fn_callback = fn_callback;
}

tsip_dialog.prototype.fsm_act = function (i_action, o_message, o_action) {
    if (!this.o_fsm) {
        tsk_utils_log_error("Invalid argument");
        return -1;
    }
    return this.o_fsm.act(i_action, this.o_fsm.get_usr_data(), o_message, this.o_fsm.get_usr_data(), o_message, o_action);
}

tsip_dialog.prototype.hangup = function (o_action) {
    if (this.e_state == tsip_dialog_state_e.ESTABLISHED || (this.o_session && this.o_session.b_server && this.e_state == tsip_dialog_state_e.EARLY) || this.e_type != tsip_dialog_type_e.INVITE) {
        return this.fsm_act(tsip_action_type_e.HANGUP, null, o_action); // 603 Decline or BYE
    }
    else {
        return this.fsm_act(tsip_action_type_e.CANCEL, null, o_action); // CANCEL -> only for INVITE dialog
    }
}

// o_action is optional
tsip_dialog.prototype.shutdown = function (o_action) {
    return this.fsm_act(tsip_action_type_e.SHUTDOWN, null, o_action);
}

tsip_dialog.prototype.update_with_response = function (o_response) {
    if (!o_response || !o_response.is_response() || !o_response.o_hdr_To) {
        tsk_utils_log_error("Invalid argument");
        return -1;
    }

    var i_code = o_response.get_response_code();
    var s_tag = o_response.o_hdr_To.s_tag;

    /* 	1xx (!100) or 2xx  */
    /*	401 or 407 or 421 or 494 */
    if (i_code == 401 || i_code == 407 || i_code == 421 || i_code == 494) {
        var b_acceptNewVector;

        /* 3GPP IMS - Each authentication vector is used only once.
        *	==> Re-registration/De-registration ==> Allow 401/407 challenge.
        */
        b_acceptNewVector = (o_response.is_response_to_register() && this.e_state == tsip_dialog_state_e.ESTABLISHED);
        return this.update_challenges(o_response, b_acceptNewVector);
    }
    else if (100 < i_code && i_code < 300) {
        var e_state = this.e_state;

        /* 1xx */
        if (i_code <= 199) {
            if (tsk_string_is_null_or_empty(o_response.o_hdr_To.s_tag)) {
                tsk_utils_log_error("Invalid tag  parameter");
                return -1;
            }
            e_state = tsip_dialog_state_e.EARLY;
        }
        /* 2xx */
        else {
            e_state = tsip_dialog_state_e.ESTABLISHED;
        }

        /* Remote target */
        {
            /*	RFC 3261 12.2.1.2 Processing the Responses
            When a UAC receives a 2xx response to a target refresh request, it
            MUST replace the dialog's remote target URI with the URI from the
            Contact header field in that response, if present.

            FIXME: Because PRACK/UPDATE sent before the session is established MUST have
            the rigth target URI to be delivered to the UAS ==> Do not not check that we are connected
            */
            if (!o_response.is_response_to_register() && o_response.o_hdr_Contact && o_response.o_hdr_Contact.o_uri) {
                this.o_uri_remote_target = tsip_uri.prototype.Parse(tsip_uri_tostring(o_response.o_hdr_Contact.o_uri, true, false));
            }
        }

        /* Route sets */
        {
            var i_index;
            var o_hdr_recordRoute;
            this.ao_hdr_record_routes.splice(0, this.ao_hdr_record_routes.length);
            for (i_index = 0; (o_hdr_recordRoute = o_response.get_header_at(tsip_header_type_e.Record_Route, i_index)); ++i_index) {
                this.ao_hdr_record_routes.push(o_hdr_recordRoute);
            }
            this.ao_hdr_record_routes.reverse();
        }


        /* cseq + tags + ... */
        if (this.e_state == tsip_dialog_state_e.ESTABLISHED && tsk_string_iequals(this.s_tag_remote, s_tag)) {
            return 0;
        }
        else {
            if (!o_response.is_response_to_register() && !o_response.is_response_to_publish()) { /* REGISTER and PUBLISH don't establish dialog */
                this.s_tag_remote = s_tag
            }
            // PRACK and BYE will have same CSeq value ==> Let CSeq value to be incremented by "tsip_dialog_request_new()"
            //if (false) {
            //    this.i_cseq_value = o_response.o_hdr_CSeq ? o_response.o_hdr_CSeq.i_seq : this.i_cseq_value;
            //}

        }

        this.e_state = e_state;

        return 0;
    }

    return 0;
}

tsip_dialog.prototype.update_with_invite = function (o_invite) {
    if (!o_invite) {
        tsk_utils_log_error("Invalid parameter");
        return -1;
    }

    /* Remote target */
    if (o_invite.o_hdr_Contact && o_invite.o_hdr_Contact.o_uri) {
        this.o_uri_remote_target = tsip_uri.prototype.Parse(tsip_uri_tostring(o_invite.o_hdr_Contact.o_uri, true, false));
    }

    /* cseq + tags + remote-uri */
    this.s_tag_remote = o_invite.o_hdr_From ? o_invite.o_hdr_From.s_tag : "tag_doubango";
    /* self->cseq_value = invite->CSeq ? invite->CSeq->seq : self->cseq_value; */
    if (o_invite.o_hdr_From && o_invite.o_hdr_From.o_uri) {
        this.o_uri_remote = o_invite.o_hdr_From.o_uri;
    }

    /* Route sets */
    {
        var i_index;
        var o_hdr_recordRoute;
        this.ao_hdr_record_routes.splice(0, this.ao_hdr_record_routes.length);
        for (i_index = 0; (o_hdr_recordRoute = o_invite.get_header_at(tsip_header_type_e.Record_Route, i_index)); ++i_index) {
            this.ao_hdr_record_routes.push(o_hdr_recordRoute);
        }
    }

    this.e_state = tsip_dialog_state_e.EARLY;

    return 0;
}

tsip_dialog.prototype.update_challenges = function (o_response, b_acceptNewVector) {
    var i_ret = -1;
    var o_challenge;

    var o_hdr_WWW_Authenticate;
    var o_hdr_Proxy_Authenticate;

    /* RFC 2617 - HTTP Digest Session

    *	(A) The client response to a WWW-Authenticate challenge for a protection
    space starts an authentication session with that protection space.
    The authentication session lasts until the client receives another
    WWW-Authenticate challenge from any server in the protection space.

    (B) The server may return a 401 response with a new nonce value, causing the client
    to retry the request; by specifying stale=TRUE with this response,
    the server tells the client to retry with the new nonce, but without
    prompting for a new username and password.
    */
    /* RFC 2617 - 1.2 Access Authentication Framework
    The realm directive (case-insensitive) is required for all authentication schemes that issue a challenge.
    */

    /* FIXME: As we perform the same task ==> Use only one loop */

    for (var i = 0; (o_hdr_WWW_Authenticate = o_response.get_header_at(tsip_header_type_e.WWW_Authenticate, i)); i++) {
        var b_isnew = true;

        for (var j = 0; j < this.ao_challenges.length; ++j) {
            o_challenge = this.ao_challenges[j];
            if (o_challenge.b_isproxy) continue;

            if (tsk_string_iequals(o_challenge.s_realm, o_hdr_WWW_Authenticate.s_realm) && (o_hdr_WWW_Authenticate.b_stale || b_acceptNewVector)) {
                /*== (B) ==*/
                if ((i_ret = o_challenge.update(
					o_hdr_WWW_Authenticate.s_scheme,
					o_hdr_WWW_Authenticate.s_realm,
					o_hdr_WWW_Authenticate.s_nonce,
					o_hdr_WWW_Authenticate.s_opaque,
					o_hdr_WWW_Authenticate.s_algorithm,
					o_hdr_WWW_Authenticate.s_qop))) {
                    return i_ret;
                }
                else {
                    b_isnew = false;
                    continue;
                }
            }
            else {
                tsk_utils_log_error("Failed to handle new challenge");
                return -1;
            }
        }

        if (b_isnew) {
            if ((o_challenge = new tsip_challenge(this.get_stack(),
					false,
					o_hdr_WWW_Authenticate.s_scheme,
					o_hdr_WWW_Authenticate.s_realm,
					o_hdr_WWW_Authenticate.s_nonce,
					o_hdr_WWW_Authenticate.s_opaque,
					o_hdr_WWW_Authenticate.s_algorithm,
					o_hdr_WWW_Authenticate.s_qop))) {
                this.ao_challenges.push(o_challenge);
            }
            else {
                tsk_utils_log_error("Failed to handle new challenge");
                return -1;
            }
        }
    }

    for (var i = 0; (o_hdr_Proxy_Authenticate = o_response.get_header_at(tsip_header_type_e.Proxy_Authenticate, i)); i++) {
        var b_isnew = true;

        for (var j = 0; j < this.ao_challenges.length; ++j) {
            o_challenge = this.ao_challenges[j];
            if (!o_challenge.b_isproxy) continue;

            if (tsk_string_iequals(o_challenge.s_realm, o_hdr_Proxy_Authenticate.s_realm) && (o_hdr_Proxy_Authenticate.b_stale || b_acceptNewVector)) {
                /*== (B) ==*/
                if ((i_ret = o_challenge.update(
					o_hdr_Proxy_Authenticate.s_scheme,
					o_hdr_Proxy_Authenticate.s_realm,
					o_hdr_Proxy_Authenticate.s_nonce,
					o_hdr_Proxy_Authenticate.s_opaque,
					o_hdr_Proxy_Authenticate.s_algorithm,
					o_hdr_Proxy_Authenticate.s_qop))) {
                    return i_ret;
                }
                else {
                    b_isnew = false;
                    continue;
                }
            }
            else {
                tsk_utils_log_error("Failed to handle new challenge");
                return -1;
            }
        }

        if (b_isnew) {
            if ((o_challenge = new tsip_challenge(this.get_stack(),
					true,
					o_hdr_Proxy_Authenticate.s_scheme,
					o_hdr_Proxy_Authenticate.s_realm,
					o_hdr_Proxy_Authenticate.s_nonce,
					o_hdr_Proxy_Authenticate.s_opaque,
					o_hdr_Proxy_Authenticate.s_algorithm,
					o_hdr_Proxy_Authenticate.s_qop))) {
                this.ao_challenges.push(o_challenge);
            }
            else {
                tsk_utils_log_error("Failed to handle new challenge");
                return -1;
            }
        }
    }
    return 0;
}

tsip_dialog.prototype.get_newdelay = function (o_message) {
    var i_expires = this.i_expires / 1000; // in seconds
    var i_newdelay = i_expires; /* default value */
    var o_hdr;
    var i_index;
    var b_found = false;

    /* NOTIFY with subscription-state header with expires parameter */
    if (o_message.is_notify()) {
        var o_hdr_state;
        if ((o_hdr_state = o_message.get_header(tsip_header_type_e.Subscription_State))) {
            if (o_hdr_state.i_expires > 0) {
                i_expires = o_hdr_state.i_expires;
                b_found = true;
            }
        }
    }

    /* Expires header */
    if (!b_found && (o_hdr = o_message.get_header(tsip_header_type_e.Expires))) {
        i_expires = o_hdr.i_value;
        b_found = true;
    }

    /* Contact header */
    for (i_index = 0; !b_found && (o_hdr = o_message.get_header_at(tsip_header_type_e.Contact, i_index)); ++i_index) {
        var o_hdr_contact = o_hdr;
        if (o_hdr_contact.o_uri) {
            var s_transport = tsk_param_get_value_by_name(o_hdr_contact.o_uri.ao_params, "transport");
            var o_contactUri = this.get_stack().__get_contact_uri(s_transport ? s_transport : "udp");
            if (o_contactUri) {
                if (tsk_string_equals(o_hdr_contact.o_uri.s_user_name, o_contactUri.s_user_name)
					&& tsk_string_equals(o_hdr_contact.o_uri.s_host, o_contactUri.s_host)
					&& o_hdr_contact.o_uri.i_port == o_contactUri.i_port) {
                    if (o_hdr_contact.i_expires >= 0) { /* No expires parameter ==> -1*/
                        i_expires = o_hdr_contact.i_expires;

                        b_found = false;
                        break;
                    }
                }
            }
        }
    }

    /* 3GPP TS 24.229 - 
    *	The UE shall reregister the public user identity either 600 seconds before the expiration time if the initial 
    *	registration was for greater than 1200 seconds, or when half of the time has expired if the initial registration 
    *	was for 1200 seconds or less.
    */
    i_newdelay = (i_expires > 1200) ? (i_expires - 600) : (i_expires >> 1);

    return (i_newdelay * 1000); // milliseconds
}


tsip_dialog.prototype.ApplyAction = function (o_message, o_action) {
    if (!o_message || !o_action) {
        tsk_utils_log_error("Invalid argument");
        return -1;
    }

    // headers
    for (var i = 0; i < o_action.ao_headers.length; ++i) {
        o_message.add_header(o_action.ao_headers[i]);
    }

    // response line
    if (o_action.line_resp.i_code && o_action.line_resp.s_phrase && o_message.is_response()) {
        o_message.line.response.i_status_code = o_action.line_resp.i_code;
        o_message.line.response.s_reason_phrase = o_action.line_resp.s_phrase; 
    }

    // payload
    if (o_action.o_content) {
        o_message.add_content(o_action.o_content);
    }

    return 0;
}

function tsip_dialog_compare(o_d1, o_d2) {
    if (o_d1 && o_d2) {
        if ((o_d1.s_callid == o_d2.s_callid)
			&& ((o_d1.s_tag_local == o_d2.s_tag_local))
			&& ((o_d1.s_tag_remote == o_d2.s_tag_remote))) {
            return 0;
        }
    }
    return -1;
}

if(!window.__b_release_mode){
    tsip_api_add_js_scripts('head',
        'src/tinySIP/src/dialogs/tsip_dialog_generic.js',
        'src/tinySIP/src/dialogs/tsip_dialog_invite.js',
        'src/tinySIP/src/dialogs/tsip_dialog_register.js'
    );
}
