
class tsip_session_register;
class tsip_event_register;

/**
* SIP <b>REGISTER</b> session.
* */
class tsip_session_register
{
public:

/**
* Signature: tsip_session_register(o_stack, ...set())
* @param o_stack SIP stack to use to create this session
*/
	void tsip_session_register(tsip_stack o_stack) { }

/**
* UnRegisters (logout) the session. Sends SIP <b>REGISTER</b> message with expires value equal to zero. <br />The registration state will be reported through @ref tsip_stack::on_event_dialog. <br />
* Signature: unregister(...set())
* @return  zero if succeed and non-zero otherwise
*
@code
o_session.unregister();
@endcode
*/
	int unregister() { return (int)0; }

/**
* Registers (login) the session. Sends SIP <b>REGISTER</b> message. <br/>The registration state will be reported through @ref tsip_stack::on_event_dialog. <br />
* Signature: register(...set())
* @return  zero if succeed and non-zero otherwise
*
@code
o_session.register();
@endcode
*/
	int register() { return (int)0; }
};


/**
* SIP <b>REGISTER</b> event types
* @var
*/
int tsip_event_register_type_e;

/**
* SIP <b>REGISTER</b> event. <br /> The registration state will be reported through @ref tsip_stack::on_event_dialog.
* Used to report <b>REGISTER</b> events via @ref tsip_stack::on_event_dialog
* */
class tsip_event_register
{
public:

/**
* @param o_session SIP session
* @param i_code Event code
* @param s_phrase Event description
* @param o_sip_message SIP message
* @param e_register_type <b>REGISTER</b> event type
*
@code
o_session = new tsip_session_register(o_stack,
                tsip_session.prototype.SetExpires(1800),
                tsip_session.prototype.SetHeader("Purpose", "Registering"),
                tsip_session.prototype.SetCaps("+g.oma.sip-im"),
                tsip_session.prototype.SetCaps("+audio"),
                tsip_session.prototype.SetCaps("language", "\"en,fr\"")
 );
@endcode
*/
	void tsip_event_register(tsip_session_register o_session, int i_code, String s_phrase, tsip_message o_sip_message, tsip_event_register_type_e e_register_type) { }
	int e_register_type;
};


