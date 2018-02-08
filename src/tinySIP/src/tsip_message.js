/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
tsip_response.prototype = Object.create(tsip_message.prototype);
tsip_request.prototype = Object.create(tsip_message.prototype);

tsip_message.prototype.__s_version_10 = "SIP/1.0";
tsip_message.prototype.__s_version_20 = "SIP/2.0";
tsip_message.prototype.__s_version_default = tsip_message.prototype.__s_version_20;

var tsip_message_type_e =
{
    UNKNOWN: 0, 
    REQUEST: 1,
    RESPONSE: 2
};

var tsip_request_type_e =
{
    NONE: { i_id: -1, s_name: "NONE" },

    ACK: { i_id: 0, s_name: "ACK" },
    BYE: { i_id: 1, s_name: "BYE" },
    CANCEL: { i_id: 2, s_name: "CANCEL" },
    INVITE: { i_id: 3, s_name: "INVITE" },
    OPTIONS: { i_id: 4, s_name: "OPTIONS" },
    REGISTER: { i_id: 5, s_name: "REGISTER" },
    SUBSCRIBE: { i_id: 6, s_name: "SUBSCRIBE" },
    NOTIFY: { i_id: 7, s_name: "NOTIFY" },
    REFER: { i_id: 8, s_name: "REFER" },
    INFO: { i_id: 9, s_name: "INFO" },
    UPDATE: { i_id: 10, s_name: "UPDATE" },
    MESSAGE: { i_id: 11, s_name: "MESSAGE" },
    PUBLISH: { i_id: 12, s_name: "PUBLISH" },
    PRACK: { i_id: 13, s_name: "PRACK" }
};


function tsip_message(e_type) {
    this.s_version = tsip_message.prototype.__s_version_default; // The SIP version. Only 'SIP/2.0' is supported
    this.e_type = e_type;

    // Request-Line / Response-Line
    this.line = {
        request: {}, // s_method, o_uri
        response: {} // i_status_code, s_reason_phrase
    };

    // Most common headers
    this.o_hdr_firstVia = null;
    this.o_hdr_From = null;
    this.o_hdr_To = null;
    this.o_hdr_Contact = null;
    this.o_hdr_Call_ID = null;
    this.o_hdr_CSeq = null;
    this.o_hdr_Expires = null;

    this.o_hdr_Content_Type = null;
    this.o_hdr_Content_Length = null;

    this.o_content = null;

    // Other headers
    this.ao_headers = new Array();

    // To hack the message
    this.s_sigcomp_id = null;
    this.o_socket = null;
    this.o_remote_addr = null;
    this.b_update = false;
}

function tsip_response(i_status_code, s_reason_phrase, o_request) {
    if(!s_reason_phrase || !o_request){
        tsk_utils_log_error("Invalid argument");
        return null;
    }
    tsip_message.call(this, tsip_message_type_e.RESPONSE);
	this.line.response.i_status_code = i_status_code;
	this.line.response.s_reason_phrase = s_reason_phrase; 
				
	/* Copy network information */
	this.o_socket = o_request.o_socket;
	this.o_remote_addr = o_request.o_remote_addr;

	/*
	RFC 3261 - 8.2.6.2 Headers and Tags

	The From field of the response MUST equal the From header field of
	the request.  The Call-ID header field of the response MUST equal the
	Call-ID header field of the request.  The CSeq header field of the
	response MUST equal the CSeq field of the request.  The Via header
	field values in the response MUST equal the Via header field values
	in the request and MUST maintain the same ordering.

	If a request contained a To tag in the request, the To header field
	in the response MUST equal that of the request.  However, if the To
	header field in the request did not contain a tag, the URI in the To
	header field in the response MUST equal the URI in the To header
	field; additionally, the UAS MUST add a tag to the To header field in
	the response (with the exception of the 100 (Trying) response, in
	which a tag MAY be present).  This serves to identify the UAS that is
	responding, possibly resulting in a component of a dialog ID.  The
	same tag MUST be used for all responses to that request, both final
	and provisional (again excepting the 100 (Trying)).  Procedures for
	the generation of tags are defined in Section 19.3.
	*/
	this.o_hdr_From = o_request.o_hdr_From;
	this.o_hdr_Call_ID = o_request.o_hdr_Call_ID;
	this.o_hdr_CSeq = o_request.o_hdr_CSeq;
	this.o_hdr_firstVia = o_request.o_hdr_firstVia;
	/* All other VIAs */
	if(this.o_hdr_firstVia){
		var i_index = 1;
		var o_hdr_via;
		while ((o_hdr_via = o_request.get_header_at(tsip_header_type_e.Via, i_index++))) {
			this.add_header(o_hdr_via);
		}
	}
	/* Record routes */
	{
		var i_index = 0;
		var o_hdr_record_route;
		while((o_hdr_record_route = o_request.get_header_at(tsip_header_type_e.Record_Route, i_index++))){
			this.add_header(o_hdr_record_route);
		}
	}
	this.o_hdr_To = o_request.o_hdr_To;
	this.add_header(new tsip_header_Content_Length(0));
}

function tsip_request(s_method, o_uri_request, o_uri_from, o_uri_to, s_call_id, i_cseq){
    if(!s_method || !o_uri_request || !s_call_id){
        tsk_utils_log_error("Invalid argument");
        return null;
    }

    tsip_message.call(this, tsip_message_type_e.REQUEST);
    this.line.request.s_method = s_method;
    this.line.request.o_uri = o_uri_request;
    this.line.request.e_type = tsip_message.prototype.GetRequestType(s_method);

	/* RFC 3261 8.1.1 Generating the Request
		A valid SIP request formulated by a UAC MUST, at a minimum, contain
		the following header fields: To, From, CSeq, Call-ID, Max-Forwards,
		and Via; all of these header fields are mandatory in all SIP
		requests.  These six header fields are the fundamental building
		blocks of a SIP message, as they jointly provide for most of the
		critical message routing services including the addressing of
		messages, the routing of responses, limiting message propagation,
		ordering of messages, and the unique identification of transactions.
		These header fields are in addition to the mandatory request line,
		which contains the method, Request-URI, and SIP version.
	*/
    this.add_headers( 
        new tsip_header_CSeq(i_cseq, s_method),
        new tsip_header_Call_ID(s_call_id),
        new tsip_header_Max_Forwards(TSIP_HEADER_MAX_FORWARDS_DEFAULT),
        /* Via will be added by the transport layer */
		new tsip_header_Content_Length(0));
    if (o_uri_to) {
        this.add_headers(new tsip_header_To(o_uri_to, null));
    }
    if (o_uri_from) {
        this.add_headers(new tsip_header_From(o_uri_from, null));
    }
}

// b_top: optional
tsip_message.prototype.add_header = function (o_hdr, b_top) {
    if (!o_hdr) {
        tsk_utils_log_error("Invalid argument");
        return -1;
    }

    switch (o_hdr.e_type) {
        case tsip_header_type_e.Via:
            {
                if (!this.o_hdr_firstVia) {
                    this.o_hdr_firstVia = o_hdr;
                    return 0;
                }
                break;
            }
        case tsip_header_type_e.From:
            {
                if (!this.o_hdr_From) {
                    this.o_hdr_From = o_hdr;
                    return 0;
                }
                break;
            }
        case tsip_header_type_e.To:
            {
                if (!this.o_hdr_To) {
                    this.o_hdr_To = o_hdr;
                    return 0;
                }
                break;
            }
        case tsip_header_type_e.Contact:
            {
                if (!this.o_hdr_Contact) {
                    this.o_hdr_Contact = o_hdr;
                    return 0;
                }
                break;
            }
        case tsip_header_type_e.Call_ID:
            {
                if (!this.o_hdr_Call_ID) {
                    this.o_hdr_Call_ID = o_hdr;
                    return 0;
                }
                break;
            }
        case tsip_header_type_e.CSeq:
            {
                if (!this.o_hdr_CSeq) {
                    this.o_hdr_CSeq = o_hdr;
                    return 0;
                }
                break;
            }
        case tsip_header_type_e.Expires:
            {
                if (!this.o_hdr_Expires) {
                    this.o_hdr_Expires = o_hdr;
                    return 0;
                }
                break;
            }
        case tsip_header_type_e.Content_Type:
            {
                if (!this.o_hdr_Content_Type) {
                    this.o_hdr_Content_Type = o_hdr;
                    return 0;
                }
                break;
            }
        case tsip_header_type_e.Content_Length:
            {
                if (!this.o_hdr_Content_Length) {
                    this.o_hdr_Content_Length = o_hdr;
                    return 0;
                }
                break;
            }
    }

    if (b_top) {
        this.ao_headers.unshift(o_hdr);
    }
    else {
        this.ao_headers.push(o_hdr);
    }

    return 0;
}

// add_headers(...);
tsip_message.prototype.add_headers = function() {
    for (var i = 0; i < arguments.length; ++i) {
        if (arguments[i]) {
            this.add_header(arguments[i]);
        }
    }
    return 0;
}

tsip_message.prototype.get_header_at = function (e_hdr_type, i_index) {
    var i_pos = 0;

    switch (e_hdr_type) {
        case tsip_header_type_e.Via:
            {
                if (i_index == 0) {
                    return this.o_hdr_firstVia;
                }
                ++i_pos;
                break;
            }
        case tsip_header_type_e.From:
            {
                if (i_index == 0) {
                    return this.o_hdr_From;
                }
                ++i_pos;
                break;
            }
        case tsip_header_type_e.To:
            {
                if (i_index == 0) {
                    return this.o_hdr_To;
                }
                ++i_pos;
                break;
            }
        case tsip_header_type_e.Contact:
            {
                if (i_index == 0) {
                    return this.o_hdr_Contact;
                }
                ++i_pos;
                break;
            }
        case tsip_header_type_e.Call_ID:
            {
                if (i_index == 0) {
                    return this.o_hdr_Call_ID;
                }
                ++i_pos;
                break;
            }
        case tsip_header_type_e.CSeq:
            {
                if (i_index == 0) {
                    return this.o_hdr_CSeq;
                }
                ++i_pos;
                break;
            }
        case tsip_header_type_e.Expires:
            {
                if (i_index == 0) {
                    return this.o_hdr_Expires;
                }
                ++i_pos;
                break;
            }
        case tsip_header_type_e.Content_Type:
            {
                if (i_index == 0) {
                    return this.o_hdr_Content_Type;
                }
                ++i_pos;
                break;
            }
        case tsip_header_type_e.Content_Length:
            {
                if (i_index == 0) {
                    return this.o_hdr_Content_Length;
                }
                ++i_pos;
                break;
            }
    }

    for (var i = 0; i < this.ao_headers.length; ++i) {
        if (this.ao_headers[i].e_type == e_hdr_type) {
            if (i_pos++ >= i_index) {
                return this.ao_headers[i];
            }
        }
    }

    return null;
}

tsip_message.prototype.get_header = function (e_hdr_type) {
    return this.get_header_at(e_hdr_type, 0);
}

tsip_message.prototype.get_response_code = function(){
    return this.is_response() ? this.line.response.i_status_code : 0;
}

tsip_message.prototype.get_response_phrase = function () {
    return this.is_response() ? this.line.response.s_reason_phrase : null;
}

tsip_message.prototype.is_allowed = function (s_method) {
    if (!s_method) {
        tsk_utils_log_error("Invalid argument");
        return false;
    }

    var o_hdr_allow;
    var i_index = 0;

    while ((o_hdr_allow = this.get_header_at(tsip_header_type_e.Allow, i_index++))) {
        if (o_hdr_allow.has_value(s_method)) {
            return true;
        }
    }
    return false;
}

tsip_message.prototype.is_supported = function (s_option) {
    if (!s_option) {
        tsk_utils_log_error("Invalid argument");
        return false;
    }

    var o_hdr_supported;
    var i_index = 0;

    while ((o_hdr_supported = this.get_header_at(tsip_header_type_e.Supported, i_index++))) {
        if (o_hdr_supported.has_value(s_option)) {
            return true;
        }
    }
    return false;
}

tsip_message.prototype.is_required = function (s_option) {
    if (!s_option) {
        tsk_utils_log_error("Invalid argument");
        return false;
    }

    var o_hdr_require;
    var i_index = 0;

    while ((o_hdr_require = this.get_header_at(tsip_header_type_e.Require, i_index++))) {
        if (o_hdr_require.has_value(s_option)) {
            return true;
        }
    }
    return false;
}

tsip_message.prototype.get_expires = function () {
    if (this.o_hdr_Expires) {
        return this.o_hdr_Expires.i_value;
    }
    if (this.o_hdr_Contact) {
        return this.o_hdr_Contact.i_expires;
    }
    return -1;
}

tsip_message.prototype.has_content = function () {
    return this.get_content_length() > 0 && this.o_content;
}

tsip_message.prototype.get_content_length = function () {
    return this.o_hdr_Content_Length ? this.o_hdr_Content_Length.i_value : 0;
}

tsip_message.prototype.get_content_type = function () {
    return (this.o_hdr_Content_Type) ? this.o_hdr_Content_Type.s_type : null;
}

tsip_message.prototype.get_content = function () {
    return this.o_content;
}

tsip_message.prototype.get_content_as_string = function () {
    if (this.o_content) {
        /*if (this.o_content instanceof String) {
            this.o_content;
        }
        else */if (this.o_content instanceof Array) {
            return tsk_buff_u8b2utf8(this.o_content);
        }
    }
    return this.o_content ? this.o_content.toString() : null;
}

// s_content_type is optional
// i_length is optional
tsip_message.prototype.add_content = function (o_content, s_content_type, i_length) {
    if (s_content_type) {
        this.o_hdr_Content_Type = new tsip_header_Content_Type(s_content_type);
    }

    if (o_content && typeof i_length == "undefined") {
        if (o_content instanceof String || typeof o_content == "string") {
            i_length = unescape(encodeURIComponent(o_content)).length;
        }
        else if (o_content.byteLength) {
            i_length = o_content.byteLength;
        }
        else if (o_content.length) {
            i_length = o_content.length;
        }
        else {
            tsk_utils_log_error("cannot stat content-length");
            i_length = 0;
        }
    }


    this.o_hdr_Content_Length = new tsip_header_Content_Length(i_length);
    this.o_content = o_content;
}

tsip_message.prototype.toString = function () {
    var s_str = null;

    if (this.e_type == tsip_message_type_e.REQUEST) {
        s_str = tsk_string_format("{0} {1} {2}\r\n",
                    this.line.request.s_method, tsip_uri_tostring(this.line.request.o_uri, true, false), this.s_version);
    }
    else {
        s_str = tsk_string_format("{0} {1} {2}\r\n", this.s_version, this.line.response.i_status_code, this.line.response.s_reason_phrase);
    }

    /* First Via */
    if (this.o_hdr_firstVia) {
        s_str += this.o_hdr_firstVia.tostring_full();
    }
    /* From */
    if (this.o_hdr_From) {
        s_str += this.o_hdr_From.tostring_full();
    }
    /* To */
    if (this.o_hdr_To) {
        s_str += this.o_hdr_To.tostring_full();
    }
    /* Contact */
    if (this.o_hdr_Contact) {
        s_str += this.o_hdr_Contact.tostring_full();
    }
    /* Call_id */
    if (this.o_hdr_Call_ID) {
        s_str += this.o_hdr_Call_ID.tostring_full();
    }
    /* CSeq */
    if (this.o_hdr_CSeq) {
        s_str += this.o_hdr_CSeq.tostring_full();
    }
    /* Expires */
    if (this.o_hdr_Expires) {
        s_str += this.o_hdr_Expires.tostring_full();
    }
    /* Content-Type */
    if (this.o_hdr_Content_Type) {
        s_str += this.o_hdr_Content_Type.tostring_full();
    }
    /* Content-Length*/
    if (this.o_hdr_Content_Length) {
        s_str += this.o_hdr_Content_Length.tostring_full();
    }

    /* All other headers */
    for (var i = 0; i < this.ao_headers.length; ++i) {
        s_str += this.ao_headers[i].tostring_full();
    }

    /* EMPTY LINE */
    s_str += "\r\n";

    /* CONTENT */
    if (this.has_content()) {
        s_str += this.get_content_as_string();
    }

    return s_str;
}

tsip_message.prototype.is_request = function () {
    return this.e_type == tsip_message_type_e.REQUEST;
}

tsip_message.prototype.is_response = function () {
    return this.e_type == tsip_message_type_e.RESPONSE;
}

tsip_message.prototype.is_req_type = function (e_type) {
    return this.is_request() && this.line.request.e_type == e_type;
};
tsip_message.prototype.is_ack = function () { return this.is_req_type(tsip_request_type_e.ACK); }
tsip_message.prototype.is_bye = function () { return this.is_req_type(tsip_request_type_e.BYE); }
tsip_message.prototype.is_cancel = function () { return this.is_req_type(tsip_request_type_e.CANCEL); }
tsip_message.prototype.is_invite = function () { return this.is_req_type(tsip_request_type_e.INVITE); }
tsip_message.prototype.is_options = function () { return this.is_req_type(tsip_request_type_e.OPTIONS); }
tsip_message.prototype.is_register = function () { return this.is_req_type(tsip_request_type_e.REGISTER); }
tsip_message.prototype.is_subscribe = function () { return this.is_req_type(tsip_request_type_e.SUBSCRIBE); }
tsip_message.prototype.is_notify = function () { return this.is_req_type(tsip_request_type_e.NOTIFY); }
tsip_message.prototype.is_update = function () { return this.is_req_type(tsip_request_type_e.UPDATE); }
tsip_message.prototype.is_message = function () { return this.is_req_type(tsip_request_type_e.MESSAGE); }
tsip_message.prototype.is_publish = function () { return this.is_req_type(tsip_request_type_e.PUBLISH); }
tsip_message.prototype.is_prack = function () { return this.is_req_type(tsip_request_type_e.PRACK); }
tsip_message.prototype.is_refer = function () { return this.is_req_type(tsip_request_type_e.REFER); }
tsip_message.prototype.is_info = function () { return this.is_req_type(tsip_request_type_e.INFO); }

tsip_message.prototype.is_response_to = function (e_req_type) {
     return this.is_response() && this.o_hdr_CSeq && this.o_hdr_CSeq.e_req_type == e_req_type;
};
tsip_message.prototype.is_response_to_ack = function () { return this.is_response_to(tsip_request_type_e.ACK); }
tsip_message.prototype.is_response_to_bye = function () { return this.is_response_to(tsip_request_type_e.BYE); }
tsip_message.prototype.is_response_to_cancel = function () { return this.is_response_to(tsip_request_type_e.CANCEL); }
tsip_message.prototype.is_response_to_invite = function () { return this.is_response_to(tsip_request_type_e.INVITE); }
tsip_message.prototype.is_response_to_options = function () { return this.is_response_to(tsip_request_type_e.OPTIONS); }
tsip_message.prototype.is_response_to_register = function () { return this.is_response_to(tsip_request_type_e.REGISTER); }
tsip_message.prototype.is_response_to_subscribe = function () { return this.is_response_to(tsip_request_type_e.SUBSCRIBE); }
tsip_message.prototype.is_response_to_notify = function () { return this.is_response_to(tsip_request_type_e.NOTIFY); }
tsip_message.prototype.is_response_to_update = function () { return this.is_response_to(tsip_request_type_e.UPDATE); }
tsip_message.prototype.is_response_to_message = function () { return this.is_response_to(tsip_request_type_e.MESSAGE); }
tsip_message.prototype.is_response_to_publish = function () { return this.is_response_to(tsip_request_type_e.PUBLISH); }
tsip_message.prototype.is_response_to_prack = function () { return this.is_response_to(tsip_request_type_e.PRACK); }
tsip_message.prototype.is_response_to_refer = function () { return this.is_response_to(tsip_request_type_e.REFER); }
tsip_message.prototype.is_response_to_info = function () { return this.is_response_to(tsip_request_type_e.INFO); }

tsip_message.prototype.is_response_nxx = function (i_n) {
    return this.is_response() && ((i_n * 100) <= this.get_response_code() && this.get_response_code() <= ((i_n * 100) + 99));
}
tsip_message.prototype.is_response_xxx = function (i_xxx) {
    return this.is_response() && (this.get_response_code() == i_xxx);
}
tsip_message.prototype.is_1xx = function () { return this.is_response_nxx(1); }
tsip_message.prototype.is_2xx = function () { return this.is_response_nxx(2); }
tsip_message.prototype.is_3xx = function () { return this.is_response_nxx(3); }
tsip_message.prototype.is_4xx = function () { return this.is_response_nxx(4); }
tsip_message.prototype.is_5xx = function () { return this.is_response_nxx(5); }
tsip_message.prototype.is_6xx = function () { return this.is_response_nxx(6); }
tsip_message.prototype.is_23456 = function () {
    return this.is_response() && (200 <= this.get_response_code() && this.get_response_code() <= 699);
}
tsip_message.prototype.is_3456 = function () {
    return this.is_response() && (300 <= this.get_response_code() && this.get_response_code() <= 699);
}

tsip_message.prototype.GetRequestType = function(s_method) {
    if (s_method) {
        var s_method_i = s_method.toUpperCase();
        if ((s_method_i == tsip_request_type_e.ACK.s_name)) {
            return tsip_request_type_e.ACK;
        } else if ((s_method_i == tsip_request_type_e.BYE.s_name)) {
            return tsip_request_type_e.BYE;
        } else if ((s_method_i == tsip_request_type_e.CANCEL.s_name)) {
            return tsip_request_type_e.CANCEL;
        } else if ((s_method_i == tsip_request_type_e.INVITE.s_name)) {
            return tsip_request_type_e.INVITE;
        } else if ((s_method_i == tsip_request_type_e.OPTIONS.s_name)) {
            return tsip_request_type_e.OPTIONS;
        } else if ((s_method_i == tsip_request_type_e.REGISTER.s_name)) {
            return tsip_request_type_e.REGISTER;
        } else if ((s_method_i == tsip_request_type_e.SUBSCRIBE.s_name)) {
            return tsip_request_type_e.SUBSCRIBE;
        } else if ((s_method_i == tsip_request_type_e.NOTIFY.s_name)) {
            return tsip_request_type_e.NOTIFY;
        } else if ((s_method_i == tsip_request_type_e.REFER.s_name)) {
            return tsip_request_type_e.REFER;
        } else if ((s_method_i == tsip_request_type_e.INFO.s_name)) {
            return tsip_request_type_e.INFO;
        } else if ((s_method_i == tsip_request_type_e.UPDATE.s_name)) {
            return tsip_request_type_e.UPDATE;
        } else if ((s_method_i == tsip_request_type_e.MESSAGE.s_name)) {
            return tsip_request_type_e.MESSAGE;
        } else if ((s_method_i == tsip_request_type_e.PUBLISH.s_name)) {
            return tsip_request_type_e.PUBLISH;
        } else if ((s_method_i == tsip_request_type_e.PRACK.s_name)) {
            return tsip_request_type_e.PRACK;
        }
    }
    return tsip_request_type_e.NONE;
}

if(!window.__b_release_mode){
    tsip_api_add_js_scripts('head',
    'src/tinySIP/src/parsers/tsip_parser_message.js'
    );
}