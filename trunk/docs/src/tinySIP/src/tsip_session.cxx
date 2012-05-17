
class tsip_session;
int tsip_session_param_type_e;

/**
* Base SIP session
* */
class tsip_session
{
public:

/**
* @param o_stack SIP stack used to create the session
*/
	void tsip_session(tsip_stack o_stack) { }
	void __set(void ao_params) { }
	int o_stack;
	static int on_event;

/**
* Sets destination uri
* @param s_to Destination Uri
* @return  Parameter object
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
	Object SetToStr(String s_to) { return (Object)0; }

/**
* Sets expires timeout
* @param i_expires Session expires timeout in seconds
* @return  Parameter object
*
@code
o_session.set(tsip_session.prototype.SetExpires(1800));
@endcode
*/
	Object SetExpires(int i_expires) { return (Object)0; }

/**
* Checks whether the session is connected or not
* @return  true if connected and false otherwise
*/
	bool is_connected() { return (bool)0; }
	void SetUsrData(void USR_DATA) { }

/**
* Gets session id
* @return  session id
*/
	int get_id() { return (int)0; }
	int b_no_contact;
	int b_silent_hangup;

/**
* Default SIP session expires timeout
*/
	static int __i_expires_default;
	int o_uri_to;
	int i_id;

/**
* Gets SIP stack used to create this session
*/
	void get_stack() { }
	void SetInitialMessage(void o_sip_message) { }
	int media;
	int ao_headers;
	int o_usr_data;

/**
* Sets parameters
*/
	void set() { }
	int i_expires;
	static int __i_session_id_invalid;
	int b_server;

/**
* Adds session capabilities
* @param s_name Capiblity name
* @param s_value Capability value (optional)
* @return  Parameter object
*
@code
o_session.set(
    tsip_session.prototype.SetCaps("+g.oma.sip-im"),
    tsip_session.prototype.SetCaps("+audio"),
    tsip_session.prototype.SetCaps("language", "\"en,fr\"")
);
@endcode
*/
	Object SetCaps(String s_name, String s_value) { return (Object)0; }
	int ao_caps;
	int i_id_parent;
	int o_uri_from;

/**
* Adds session-level header
* @param s_name SIP header name
* @param s_value Header value
* @return  Parameter object
*
@code
o_session.set(
    tsip_session.prototype.SetHeader("P-Preferred-Identity", "<sip:alice@doubango.org>"),
    tsip_session.prototype.SetHeader("Date", "Wed, 28 Apr 2010 23:42:50 GMT")
);
@endcode
*/
	Object SetHeader(String s_name, String s_value) { return (Object)0; }
	static int __i_session_id;
	void SetAny(void e_type) { }
};


