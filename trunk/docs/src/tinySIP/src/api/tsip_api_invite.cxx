
class tsip_event_invite;
class tsip_session_invite;

/**
* SIP <b>INVITE</b> event. <br />
* Used to report <b>INVITE</b> events via @ref tsip_stack::on_event_invite and @ref tsip_stack::on_event_dialog
* */
class tsip_event_invite
{
public:

/**
* @param o_session SIP session
* @param i_code Event code
* @param s_phrase Event description
* @param o_sip_message SIP message
* @param e_invite_type <b>INVITE</b> event type
*/
	void tsip_event_invite(tsip_session_invite o_session, int i_code, String s_phrase, tsip_message o_sip_message, tsip_event_invite_type_e e_invite_type) { }
	int __proto__;
	int e_invite_type;
};


/**
* SIP <b>INVITE</b> session
* */
class tsip_session_invite
{
public:

/**
* Signature: tsip_session_invite(o_stack, ...set())
* @param o_stack SIP stack to use to create the session
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
	void tsip_session_invite(tsip_stack o_stack) { }

/**
* Sends SIP INFO message. The session must be connected or in early-media state.<br />
* Signature: info(o_content, s_content_type, ...set())
* @param o_content Message content. Could be a String or ArrayBuffer
* @param s_content_type Message content type
* @return  zero if succeed and non-zero otherwise
*
@code
o_session.info("Hello world!", "text/plain");
@endcode
*/
	int info(Object o_content, String s_content_type) { return (int)0; }

/**
* Resumes the call.<br /> The hold/resume state will be reported through @ref tsip_stack::on_event_invite.
*
* Signature: resume(e_media_type, ...set())
* @param e_media_type media type to resume. Should be the same media type used to make the call.
* @return  zero if succeed and non-zero otherwise
* @sa @ref call() <br /> @ref hold()
*
@code
o_session.resume(tmedia_type_e.AUDIO_VIDEO,
    tsip_session.prototype.SetHeader("Purpose", "Resuming the call")
);
@endcode
*/
	int resume(tmedia_type_e e_media_type) { return (int)0; }
	static int o_stream_video_local;
	void __set_stream_video_remote(void o_stream) { }

/**
* Gets the local video url
* @return  valid url object if succeed and null otherwise
* @sa @ref tsip_stack::on_event_invite
*
@code
o_stack.on_event_invite = function (evt) {
     switch (evt.e_invite_type) {
        case tsip_event_invite_type_e.M_STREAM_VIDEO_LOCAL_ADDED:
                {
                    // 'video_local' is a HTML <video> element 
                    document.getElementById("video_local").src = evt.get_session().get_url_video_local();
                    break;
                }
     }
};
* @endcode
*/
	objectURL get_url_video_local() { return (objectURL)0; }

/**
* Sends DTMF digit using SIP INFO. The session must be connected or in early-media state.<br />
* Signature: dtmf(...set())
* @param c_digit Digit to send
* @return  zero if succeed and non-zero otherwise
*
@code
// sends sharp digit
o_session.dtmf('#');
@endcode
*/
	int dtmf(char c_digit) { return (int)0; }
	void __set_stream_video_local(void o_stream) { }
	int o_url_video_local;
	static int o_stream_video_remote;

/**
* Puts the call in hold.<br /> The hold/resume state will be reported through @ref tsip_stack::on_event_invite.
*
* Signature: hold(e_media_type, ...set())
* @param e_media_type media type to hold. Should be the same media type used to make the call.
* @return  zero if succeed and non-zero otherwise
* @sa @ref call() <br /> @ref resume()
*
@code
o_session.hold(tmedia_type_e.AUDIO_VIDEO,
    tsip_session.prototype.SetHeader("Purpose", "Holding the call")
);
@endcode
*/
	int hold(tmedia_type_e e_media_type) { return (int)0; }

/**
* Makes and audio/video call.<br /> Sends SIP <b>INVITE</b> request.<br /> The session state will be reported through @ref tsip_stack::on_event_dialog and @ref tsip_stack::on_event_invite.
*
* Signature: call(e_media_type, ...set())
* @param e_media_type media type. For now, only tmedia_type_e.AUDIO and tmedia_type_e.AUDIO_VIDEO are supported.
* @return  zero if succeed and non-zero otherwise
* @sa @ref hold() <br /> @ref resume()
*
@code
o_session.call(tmedia_type_e.AUDIO_VIDEO,
    tsip_session.prototype.SetHeader("Purpose", "Calling someone")
);
@endcode
*/
	int call(tmedia_type_e e_media_type) { return (int)0; }
	int o_url_video_remote;

/**
* Gets the remote video url
* @return  valid url object if succeed and null otherwise
* @sa @ref tsip_stack::on_event_invite
*
@code
o_stack.on_event_invite = function (evt) {
    switch (evt.e_invite_type) {
        case tsip_event_invite_type_e.M_STREAM_VIDEO_REMOTE_ADDED:
            {
                // 'video_remote' is a HTML <video> element 
                document.getElementById("video_remote").src = evt.get_session().get_url_video_local();
                break;
            }
    }
};
* @endcode
*/
	objectURL get_url_video_remote() { return (objectURL)0; }
};


/**
* SIP <b>INVITE</b> event types
*/
int tsip_event_invite_type_e;

