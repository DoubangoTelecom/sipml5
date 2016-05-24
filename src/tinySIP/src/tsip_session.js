/*
* Copyright (C) 2012-2016 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
/**
* Default SIP session expires timeout
*/
tsip_session.prototype.__i_expires_default = 1800000; /* milliseconds */
tsip_session.prototype.__i_session_id = 0;
tsip_session.prototype.__i_session_id_invalid = -1;
tsip_session.prototype.on_event = null;

var tsip_session_param_type_e =
{
    HEADER: 0,
    CAPS: 1,
    USR_DATA: 2,
    TO_STR: 3,
    from_STR: 3,
    TO_URI: 4,
    FROM_URI: 5,
    NO_CONTACT: 6,
    EXPIRES: 7,
    SILENT_HANGUP: 8,
    SIGCOMP_ID: 9,
    PARENT_ID: 10,

    BANDWIDTH: 20,
    VIDEO_SIZE: 21,
    SCREENCAST_WINDOWID:22,

    INITIAL_MSG: 50,

    MEDIA: 100
};

/**
* Base SIP session
* @ctor
* @tparam tsip_stack o_stack SIP stack used to create the session
*/
function tsip_session(o_stack) {
    if (!o_stack) {
        tsk_utils_log_error("Invalid argument");
        return null;
    }

    this.i_id = ++tsip_session.prototype.__i_session_id;
    this.i_id_parent = tsip_session.prototype.__i_session_id_invalid; // for call transfer
    this.b_server = false;

    this.o_stack = o_stack;
    this.o_usr_data = null;

    //=======
	// SIP
    //=======
    this.ao_caps = new Array();
    this.ao_headers = new Array();

    this.o_uri_from = o_stack.identity.o_uri_impu;
    this.o_uri_to = null; // will be set by the dialog
    this.i_expires = tsip_session.prototype.__i_expires_default;
    this.b_silent_hangup = false;
    this.b_no_contact = false;

    //=======
    // Media
    //=======
    this.media = {};
    this.media.e_type = tmedia_type_e.NONE;
    this.media.b_100rel = false;
    this.media.o_bandwidth = o_stack.media.o_bandwidth;
    this.media.o_video_size = o_stack.media.o_video_size;

    this.media.screencast = {};
    this.media.screencast.d_window_id = 0; // Entire desktop

    this.media.timers = {};
    this.media.timers.s_refresher = null;
    this.media.timers.i_timeout = 0;

    this.media.qos = {};
    this.media.qos.e_type = tmedia_qos_stype_e.NONE;
    this.media.qos.e_strength = tmedia_qos_strength_e.NONE;

    this.media.msrp = {};
    this.media.msrp.fn_callback = null;    
}

/**
* Gets session id
* @treturn int session id
*/
tsip_session.prototype.get_id = function () {
    return this.i_id;
}

/**
* Sets parameters
*/
tsip_session.prototype.set = function () {
    return this.__set(arguments);
}

/**
* Gets SIP stack used to create this session
*/
tsip_session.prototype.get_stack = function(){
    return this.o_stack;
}

/**
* Checks whether the session is connected or not
* @treturn bool true if connected and false otherwise
*/
tsip_session.prototype.is_connected = function () {
    var o_dialog;
    if ((o_dialog = this.o_stack.o_layer_dialog.find_by_ss(this))) {
        return (o_dialog.e_state == tsip_dialog_state_e.ESTABLISHED);
    }
    return false;
}

/*
Internal function
set(...)
*/
tsip_session.prototype.__set = function (ao_params) {
    var o_curr;
    for (var i = 0; i < ao_params.length; ++i) {
        o_curr = ao_params[i];
        if (!o_curr) {
            continue;
        }

        switch (o_curr.e_type) {
            case tsip_session_param_type_e.HEADER:
                {
                    this.ao_headers.push(new tsip_header_Dummy(o_curr.ao_values[0], o_curr.ao_values[1]));
                    break;
                }
            case tsip_session_param_type_e.CAPS:
                {
                    this.ao_caps.push(tsk_param_create(o_curr.ao_values[0], o_curr.ao_values[1]));
                    break;
                }
            case tsip_session_param_type_e.USR_DATA:
                {
                    this.o_usr_data = o_curr.ao_values[0];
                    break;
                }
            case tsip_session_param_type_e.TO_STR:
                {
                    this.o_uri_to = tsip_uri_make_valid(o_curr.ao_values[0], this.o_stack.network.o_uri_realm.s_host);
                    break;
                }
            case tsip_session_param_type_e.FROM_STR:
                {
                    this.o_uri_from = tsip_uri_make_valid(o_curr.ao_values[0], this.o_stack.network.o_uri_realm.s_host);
                    break;
                }
            case tsip_session_param_type_e.TO_URI:
                {
                    if(!o_curr.ao_values[0] || o_curr.ao_values[0] instanceof tsip_uri) { 
                        this.o_uri_to = o_curr.ao_values[0];
                    }
                    else {
                        tsk_utils_log_error("Not a valid uri object");
                    }
                    break;
                }
            case tsip_session_param_type_e.FROM_URI:
                {
                    if(!o_curr.ao_values[0] || o_curr.ao_values[0] instanceof tsip_uri) { 
                        this.o_uri_from = o_curr.ao_values[0];
                    }
                    else {
                        tsk_utils_log_error("Not a valid uri object");
                    }
                    break;
                }
            case tsip_session_param_type_e.NO_CONTACT:
                {
                    this.b_no_contact = o_curr.ao_values[0];
                    break;
                }
            case tsip_session_param_type_e.EXPIRES:
                {
                    this.i_expires = (o_curr.ao_values[0] * 1000); // to milliseconds
                    break;
                }
            case tsip_session_param_type_e.SILENT_HANGUP:
                {
                    break;
                }
            case tsip_session_param_type_e.SIGCOMP_ID:
                {
                    break;
                }
            case tsip_session_param_type_e.PARENT_ID:
                {
                    break;
                }

            case tsip_session_param_type_e.BANDWIDTH:
                {
                    this.media.o_bandwidth = o_curr.ao_values[0];
                    break;
                }
            case tsip_session_param_type_e.VIDEO_SIZE:
                {  
                    this.media.o_video_size = o_curr.ao_values[0];
                    break;
                }
            case tsip_session_param_type_e.SCREENCAST_WINDOWID:
                {
                    this.media.screencast.d_window_id = parseFloat(o_curr.ao_values[0].toString());
                    break;
                }

            case tsip_session_param_type_e.INITIAL_MSG:
                {
                    var o_message;
                    if ((o_message = o_curr.ao_values[0])) {
                        if (o_message.o_hdr_From && o_message.o_hdr_From.o_uri) {
                            this.o_uri_from = o_message.o_hdr_From.o_uri.clone(false, false);
                            this.o_uri_from.s_display_name = o_message.o_hdr_From.s_display_name;
                        }
                        if (o_message.o_hdr_To && o_message.o_hdr_To.o_uri) {
                            this.o_uri_to = o_message.o_hdr_To.o_uri.clone(false, false);
                        }
                        this.b_server = true;
                    }
                    break;
                }
        }
    }
}

/**
* Adds session-level header
* @tparam String s_name SIP header name
* @tparam String s_value Header value
* @treturn Object Parameter object
*
@code
o_session.set(
    tsip_session.prototype.SetHeader("P-Preferred-Identity", "<sip:alice@doubango.org>"),
    tsip_session.prototype.SetHeader("Date", "Wed, 28 Apr 2010 23:42:50 GMT")
);
@endcode
*/
tsip_session.prototype.SetHeader = function (s_name, s_value) {
    return tsip_session.prototype.SetAny(tsip_session_param_type_e.HEADER, s_name, s_value);
}

/**
* Sets expires timeout
* @tparam int i_expires Session expires timeout in seconds
* @treturn Object Parameter object
*
@code
o_session.set(tsip_session.prototype.SetExpires(1800));
@endcode
*/
tsip_session.prototype.SetExpires = function (i_expires) {
    return tsip_session.prototype.SetAny(tsip_session_param_type_e.EXPIRES, i_expires);
}

/*
* Internal function
*/
tsip_session.prototype.SetUsrData = function (o_usr_data) {
    return tsip_session.prototype.SetAny(tsip_session_param_type_e.USR_DATA, o_usr_data);
}

/**
* Adds session capabilities
* @tparam String s_name Capiblity name
* @tparam String s_value Capability value (optional)
* @treturn Object Parameter object
*
@code
o_session.set(
    tsip_session.prototype.SetCaps("+g.oma.sip-im"),
    tsip_session.prototype.SetCaps("+audio"),
    tsip_session.prototype.SetCaps("language", "\"en,fr\"")
);
@endcode
*/
tsip_session.prototype.SetCaps = function (s_name, s_value) {
    return tsip_session.prototype.SetAny(tsip_session_param_type_e.CAPS, s_name, s_value);
}

/**
* Sets destination uri
* @tparam String s_to Destination Uri
* @treturn Object Parameter object
*
@code
o_session.set(
    tsip_session.prototype.SetToStr("sip:alice@doubango.org")
);
// or
o_session.set(
    tsip_session.prototype.SetToStr("alice")
); // the SIP Uri will be built using domain name (realm)
@endcode
*/
tsip_session.prototype.SetToStr = function (s_to) {
    return tsip_session.prototype.SetAny(tsip_session_param_type_e.TO_STR, s_to);
}

tsip_session.prototype.SetToUri = function (o_to) {
    return tsip_session.prototype.SetAny(tsip_session_param_type_e.TO_URI, o_to);
}

tsip_session.prototype.SetFromStr = function (s_from) {
    return tsip_session.prototype.SetAny(tsip_session_param_type_e.FROM_STR, s_from);
}

tsip_session.prototype.SetInitialMessage = function (o_sip_message) {
    return tsip_session.prototype.SetAny(tsip_session_param_type_e.INITIAL_MSG, o_sip_message);
}

tsip_session.prototype.SetBandwidth = function (o_bandwidth) {
    return tsip_session.prototype.SetAny(tsip_session_param_type_e.BANDWIDTH, o_bandwidth);
}

tsip_session.prototype.SetVideoSize = function (o_video_size) {
    return tsip_session.prototype.SetAny(tsip_session_param_type_e.VIDEO_SIZE, o_video_size);
}

tsip_session.prototype.SetScreencastWindowID = function (d_window_id) {
    return tsip_session.prototype.SetAny(tsip_session_param_type_e.SCREENCAST_WINDOWID, d_window_id);
}

tsip_session.prototype.SetInitialMessage = function (o_sip_message) {
    return tsip_session.prototype.SetAny(tsip_session_param_type_e.INITIAL_MSG, o_sip_message);
}


/*
* Internal function
*/
tsip_session.prototype.SetAny = function (e_type) {
    var obj = new Object();
    obj.e_type = e_type;
    obj.ao_values = Array.prototype.slice.call(arguments, 1);
    return obj;
}



if(!window.__b_release_mode){
    tsip_api_add_js_scripts('head',
    'src/tinySIP/src/api/tsip_api_common.js',
    'src/tinySIP/src/api/tsip_api_info.js',
    'src/tinySIP/src/api/tsip_api_invite.js',
    'src/tinySIP/src/api/tsip_api_message.js',
    'src/tinySIP/src/api/tsip_api_options.js',
    'src/tinySIP/src/api/tsip_api_publish.js',
    'src/tinySIP/src/api/tsip_api_register.js',
    'src/tinySIP/src/api/tsip_api_subscribe.js'
    );
}