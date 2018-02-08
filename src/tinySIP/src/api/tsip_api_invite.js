/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
tsip_session_invite.prototype = Object.create(tsip_session.prototype);
tsip_event_invite.prototype = Object.create(tsip_event.prototype);

tsip_session_invite.prototype.o_stream_local = null;
tsip_session_invite.prototype.o_stream_remote = null;

/**
* SIP <b>INVITE</b> event types
*/
var tsip_event_invite_type_e = 
{
	// ============================
	//	Sip Events
	//
	I_NEW_CALL: 0,
	
	// in-dialog requests/reponses
	I_REQUEST: 100,
	I_AO_REQUEST: 101,
	
	// 3GPP TS 24.629: Explicit Call Transfer (ECT)
	O_ECT_TRYING: 200,
	O_ECT_ACCEPTED: 201,
	O_ECT_COMPLETED: 202,
	O_ECT_FAILED: 203,
	O_ECT_NOTIFY: 204,
	I_ECT_REQUESTED: 205,
	I_ECT_NEW_CALL: 206,
	I_ECT_COMPLETED: 207,
	I_ECT_FAILED: 208,
	I_ECT_NOTIFY: 209,

    /* BFCP (rfc4582) */
    M_BFCP_INFO: 300,
	
	// ============================
	//	Media Events
	//

	M_EARLY_MEDIA: 400,
	M_UPDATING: 401, // Trying to update from Audio -> Video for example
	M_UPDATED: 402, // succeed to update
	M_STREAM_CONNECTING: 403,
	M_STREAM_CONNECTED: 404,
    M_STREAM_LOCAL_REQUESTED: 405,
    M_STREAM_LOCAL_ACCEPTED: 406,
    M_STREAM_LOCAL_REFUSED: 407,
    M_STREAM_LOCAL_ADDED: 408,
    M_STREAM_LOCAL_REMOVED: 409,
    M_STREAM_REMOTE_ADDED: 410,
    M_STREAM_REMOTE_REMOVED: 411,
	
	/* 3GPP TS 24.610: Communication Hold */
	M_LOCAL_HOLD_OK: 500,
	M_LOCAL_HOLD_NOK: 501,
	M_LOCAL_RESUME_OK: 502,
	M_LOCAL_RESUME_NOK: 503,
	M_REMOTE_HOLD: 504,
	M_REMOTE_RESUME:505
        
};

/**
* SIP <b>INVITE</b> session
* @ctor
* Signature: tsip_session_invite(o_stack, ...set())
* @tparam tsip_stack o_stack SIP stack to use to create the session
*
@code
// creates a session to call 'alice'
var o_session = new tsip_session_invite(o_stack,
    tsip_session.prototype.SetToStr("alice"),
    tsip_session.prototype.SetCaps("+sip.ice"),
    tsip_session.prototype.SetHeader("Purpose", "Calling 'alice'")
);
@endcode
*/
function tsip_session_invite(o_stack) {
    tsip_session.call(this, o_stack);
    this.__set(Array.prototype.slice.call(arguments, 1));
}

/**
* SIP <b>INVITE</b> event. <br />
* Used to report <b>INVITE</b> events via @ref tsip_stack::on_event_invite and @ref tsip_stack::on_event_dialog
* @ctor
* @tparam tsip_session_invite o_session SIP session
* @tparam int i_code Event code
* @tparam String s_phrase Event description
* @tparam tsip_message o_sip_message SIP message
* @tparam tsip_event_invite_type_e e_invite_type <b>INVITE</b> event type
*/
function tsip_event_invite(o_session, i_code, s_phrase, o_sip_message, e_invite_type) {
    tsip_event.call(this, o_session, i_code, s_phrase, o_sip_message, tsip_event_type_e.INVITE);
    this.e_invite_type = e_invite_type;
}

tsip_session_invite.prototype.get_stream_local = function () {
    return this.o_stream_local;
}

tsip_session_invite.prototype.get_stream_remote = function () {
    return this.o_stream_remote;
}

/*
 Internal function
*/
tsip_session_invite.prototype.__set_stream_local = function (o_stream) {
    this.o_stream_local = o_stream;
}

/*
Internal function
*/
tsip_session_invite.prototype.__set_stream_remote = function (o_stream) {
    this.o_stream_remote = o_stream;
}

/**
* Makes and audio/video call.<br /> Sends SIP <b>INVITE</b> request.<br /> The session state will be reported through @ref tsip_stack::on_event_dialog and @ref tsip_stack::on_event_invite.
*
* Signature: call(e_media_type, ...set())
* @tparam tmedia_type_e e_media_type media type. For now, only tmedia_type_e.AUDIO and tmedia_type_e.AUDIO_VIDEO are supported.
* @treturn int zero if succeed and non-zero otherwise
* @sa @ref hold() <br /> @ref resume()
*
@code
o_session.call(tmedia_type_e.AUDIO_VIDEO,
    tsip_session.prototype.SetHeader("Purpose", "Calling someone")
);
@endcode
*/
tsip_session_invite.prototype.call = function(e_media_type){
    if (this.o_stack.e_state != tsip_transport_state_e.STARTED) {
        tsk_utils_log_error("Stack not started");
        return -2;
    }
    
    var i_ret = -1;
    var o_action = new tsip_action(tsip_action_type_e.INVITE);
    if(o_action){
        var b_new_dialog = false;
        o_action.media.e_type = e_media_type;
        var o_dialog = this.o_stack.o_layer_dialog.find_by_ss(this);
        if (!o_dialog) {
            b_new_dialog = true;
            o_dialog = this.o_stack.o_layer_dialog.dialog_new(tsip_dialog_type_e.INVITE, this);
        }
        if((i_ret = o_dialog.fsm_act(o_action.e_type, null, o_action)) == 0){
            if(b_new_dialog){ // otherwise we are trying to refresh the media type and the type will be updated if 200 OK
                this.media.e_type = e_media_type;
            }
        }
    }

	return i_ret;
}

/**
* Puts the call on hold.<br /> The hold/resume state will be reported through @ref tsip_stack::on_event_invite.
*
* Signature: hold(e_media_type, ...set())
* @tparam tmedia_type_e e_media_type media type to hold. Should be the same media type used to make the call.
* @treturn int zero if succeed and non-zero otherwise
* @sa @ref call() <br /> @ref resume()
*
@code
o_session.hold(tmedia_type_e.AUDIO_VIDEO,
    tsip_session.prototype.SetHeader("Purpose", "Holding the call")
);
@endcode
*/
tsip_session_invite.prototype.hold = function(e_media_type){
    if (this.o_stack.e_state != tsip_transport_state_e.STARTED) {
        tsk_utils_log_error("Stack not started");
        return -2;
    }

    var i_ret = -1;
    var o_action = new tsip_action(tsip_action_type_e.HOLD);
    if(o_action){
        o_action.media.e_type = e_media_type;
        i_ret = this.__action_handle(o_action);
    }

	return i_ret;
}

/**
* Resumes the call.<br /> The hold/resume state will be reported through @ref tsip_stack::on_event_invite.
*
* Signature: resume(e_media_type, ...set())
* @tparam tmedia_type_e e_media_type media type to resume. Should be the same media type used to make the call.
* @treturn int zero if succeed and non-zero otherwise
* @sa @ref call() <br /> @ref hold()
*
@code
o_session.resume(tmedia_type_e.AUDIO_VIDEO,
    tsip_session.prototype.SetHeader("Purpose", "Resuming the call")
);
@endcode
*/
tsip_session_invite.prototype.resume = function(e_media_type){
    if (this.o_stack.e_state != tsip_transport_state_e.STARTED) {
        tsk_utils_log_error("Stack not started");
        return -2;
    }

    var i_ret = -1;
    var o_action = new tsip_action(tsip_action_type_e.RESUME);
    if(o_action){
        o_action.media.e_type = e_media_type;
        i_ret = this.__action_handle(o_action);
    }

	return i_ret;
}

/**
* Sends SIP INFO message. The session must be connected or in early-media state.<br />
* Signature: info(o_content, s_content_type, ...set())
* @tparam Object o_content Message content. Could be a String or ArrayBuffer
* @tparam String s_content_type Message content type
* @treturn int zero if succeed and non-zero otherwise
*
@code
o_session.info("Hello world!", "text/plain");
@endcode
*/
tsip_session_invite.prototype.info = function (o_content, s_content_type) {
    if (this.o_stack.e_state != tsip_transport_state_e.STARTED) {
        tsk_utils_log_error("Stack not started");
        return -2;
    }

    var i_ret = -1;
    var o_action = new tsip_action(tsip_action_type_e.INFO);
    if (o_action) {
        if (s_content_type) {
            o_action.add_headers(new tsip_header_Content_Type(s_content_type));
        }
        o_action.set_content(o_content);
        i_ret = this.__action_handle(o_action);
    }

    return i_ret;
}

/**
* Sends DTMF digit using SIP INFO. The session must be connected or in early-media state.<br />
* Signature: dtmf(...set())
* @tparam char c_digit Digit to send
* @treturn int zero if succeed and non-zero otherwise
*
@code
// sends sharp digit
o_session.dtmf('#');
@endcode
*/
tsip_session_invite.prototype.dtmf = function (c_digit) {
    if (this.o_stack.e_state != tsip_transport_state_e.STARTED) {
        tsk_utils_log_error("Stack not started");
        return -2;
    }

    if (!c_digit) {
        tsk_utils_log_error("Invalid parameter");
        return -1;
    }
    var o_action = new tsip_action(tsip_action_type_e.DTMF_SEND);
    if (o_action) {
        o_action.add_headers(new tsip_header_Content_Type("application/dtmf-relay"));
        o_action.set_content(tsk_string_format("Signal={0}\r\nDuration={1}", c_digit, 120));
        return this.__action_handle(o_action);
    }
    return -3;
}


/**
* Transfers the call using SIP REFER. The session must be connected or in early-media state.<br />
* Signature: dtmf(...set())
* @tparam String s_to Transfer destination uri or phone number
* @treturn int zero if succeed and non-zero otherwise
*
@code
o_session.transfer('alice');
// or
o_session.transfer('sip:alice@doubango.org');
@endcode
*/
tsip_session_invite.prototype.transfer = function (s_to) {
    if (!s_to) {
        tsk_utils_log_error('Invalid parameter');
        return -1;
    }
    if (this.o_stack.e_state != tsip_transport_state_e.STARTED) {
        tsk_utils_log_error("Stack not started");
        return -2;
    }
    var o_uri_to = tsip_uri_make_valid(s_to, this.o_stack.network.o_uri_realm.s_host);
    if (!o_uri_to) {
        tsk_utils_log_error("%s is not a valid SIP Uri", s_to);
        return -3;
    }

    var i_ret = -1;
    var o_action = new tsip_action(tsip_action_type_e.ECT);
    if (o_action) {
        o_action.ect.s_to = tsip_uri_tostring(o_uri_to, false, false);
        i_ret = this.__action_handle(o_action);
    }

    return i_ret;
}

/**
* Accepts incoming tgransfer request
* @treturn int zero if succeed and non-zero otherwise
*/
tsip_session_invite.prototype.transfer_accept = function () {
    return this.__action_any(tsip_action_type_e.ECT_ACCEPT);
}

/**
* Rejects incoming tgransfer request
* @treturn int zero if succeed and non-zero otherwise
*/
tsip_session_invite.prototype.transfer_reject = function () {
    return this.__action_any(tsip_action_type_e.ECT_REJECT);
}

/**
Starts sharing your entire desktop or an App using BFCP(<a href="https://tools.ietf.org/html/rfc4582">rfc4582</a>). Requires webrt4all plugin.
* @treturn int zero if succeed and non-zero otherwise
*/
tsip_session_invite.prototype.start_bfcp_share = function () {
    var e_new_media = this.media.e_type;
    switch (this.media.e_type) {
        case tmedia_type_e.AUDIO: e_new_media = tmedia_type_e.AUDIO_BFCPVIDEO; break;
        case tmedia_type_e.VIDEO: e_new_media = tmedia_type_e.VIDEO_BFCPVIDEO; break;
        default: e_new_media = tmedia_type_e.AUDIO_VIDEO_BFCPVIDEO; break;
    }
    return this.call(e_new_media);
}

/**
Stops sharing your entire desktop or an App using BFCP(<a href="https://tools.ietf.org/html/rfc4582">rfc4582</a>). Requires webrt4all plugin.
* @treturn int zero if succeed and non-zero otherwise
*/
tsip_session_invite.prototype.stop_bfcp_share = function () {
    var e_new_media = this.media.e_type;
    switch (this.media.e_type) {
        case tmedia_type_e.AUDIO_BFCPVIDEO: e_new_media = tmedia_type_e.AUDIO; break;
        case tmedia_type_e.VIDEO_BFCPVIDEO: e_new_media = tmedia_type_e.VIDEO; break;
        default: e_new_media = tmedia_type_e.AUDIO_VIDEO; break;
    }
    return this.call(e_new_media);
}

/** mutes/unmutes session
* @treturn int zero if succeed and non-zero otherwise
*/
tsip_session_invite.prototype.set_mute = function (s_media, b_mute) {
    var o_action = new tsip_action(tsip_action_type_e.MUTE);
    if (o_action) {
        o_action.mute.b_muted = b_mute;
        o_action.mute.s_media = s_media;
        return this.__action_handle(o_action);
    }
    return -3;
}