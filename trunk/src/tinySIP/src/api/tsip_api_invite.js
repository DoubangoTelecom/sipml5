/*
* Copyright (C) 2012 Doubango Telecom <http://www.doubango.org>
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
	
	// ============================
	//	Media Events
	//

	M_EARLY_MEDIA: 300,
	M_UPDATING: 301, // Trying to update from Audio -> Video for example
	M_UPDATED: 302, // succeed to update
	M_STREAM_CONNECTING: 303,
	M_STREAM_CONNECTED: 304,
    M_STREAM_LOCAL_REQUESTED: 305,
    M_STREAM_LOCAL_ACCEPTED: 306,
    M_STREAM_LOCAL_REFUSED: 307,
    M_STREAM_LOCAL_ADDED: 308,
    M_STREAM_LOCAL_REMOVED: 309,
    M_STREAM_REMOTE_ADDED: 310,
    M_STREAM_REMOTE_REMOVED: 311,
	
	/* 3GPP TS 24.610: Communication Hold */
	M_LOCAL_HOLD_OK: 400,
	M_LOCAL_HOLD_NOK: 401,
	M_LOCAL_RESUME_OK: 402,
	M_LOCAL_RESUME_NOK: 403,
	M_REMOTE_HOLD: 404,
	M_REMOTE_RESUME:405
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
    
    this.o_url_local = null;
    this.o_url_remote = null;
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

/**
* Gets the local video url
* @treturn objectURL valid url object if succeed and null otherwise
* @sa @ref tsip_stack::on_event_invite
*
@code
o_stack.on_event_invite = function (evt) {
     switch (evt.e_invite_type) {
        case tsip_event_invite_type_e.M_STREAM_LOCAL_ADDED:
                {
                    // 'video_local' is a HTML <video> element 
                    document.getElementById("video_local").src = evt.get_session().get_url_local();
                    break;
                }
     }
};
* @endcode
*/
tsip_session_invite.prototype.get_url_local = function () {
   
    return this.o_url_local;
}

tsip_session_invite.prototype.get_stream_local = function () {
    return this.o_stream_local;
}

/**
* Gets the remote video url
* @treturn objectURL valid url object if succeed and null otherwise
* @sa @ref tsip_stack::on_event_invite
*
@code
o_stack.on_event_invite = function (evt) {
    switch (evt.e_invite_type) {
        case tsip_event_invite_type_e.M_STREAM_REMOTE_ADDED:
            {
                // 'video_remote' is a HTML <video> element 
                document.getElementById("video_remote").src = evt.get_session().get_url_local();
                break;
            }
    }
};
* @endcode
*/
tsip_session_invite.prototype.get_url_remote = function () {
    return this.o_url_remote;
}

tsip_session_invite.prototype.get_stream_remote = function () {
    return this.o_stream_remote;
}

/*
 Internal function
*/
tsip_session_invite.prototype.__set_stream_local = function (o_stream) {
    if (this.o_url_local) {
        window.nativeURL.revokeObjectURL(this.o_url_local);
    }
    this.o_stream_local = o_stream;
    this.o_url_local = o_stream ? window.nativeURL.createObjectURL(o_stream) : undefined;
}

/*
Internal function
*/
tsip_session_invite.prototype.__set_stream_remote = function (o_stream) {
    if (this.o_url_remote) {
        window.nativeURL.revokeObjectURL(this.o_url_remote);
    }
    this.o_stream_remote = o_stream;
    this.o_url_remote = this.o_stream_remote ? window.nativeURL.createObjectURL(this.o_stream_remote) : undefined;
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
    if (!c_digit) {
        tsk_utils_log_error("Invalid parameter");
        return -1;
    }
    return this.info(
        tsk_string_format("Signal={0}\r\nDuration={1}", c_digit, 120),
        "application/dtmf-relay"
    );
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