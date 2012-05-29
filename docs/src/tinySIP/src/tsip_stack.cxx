
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

class tsip_stack;
int tsip_transport_state_e;

/**
* Signature: tsip_stack_create(s_realm, s_impi, s_impu_uri, s_proxy_cscf_host, i_proxy_cscf_port, ...set())
* */
class tsip_stack
{
public:

/**
* This is the main function (constructor) used to create a SIP/IMS stack and it <b>takes variable arguments</b>.
* @param s_realm the SIP domain name. e.g. 'doubango.org'
* @param s_impi the IMS Private identity. e.g. 'alice'
* @param s_impu_uri the IMS public identity wich must be a valid SIP Uri. e.g. 'sip:alice@doubango.org'
* @param s_proxy_cscf_host the Proxy domain name or IP address. e.g. '192.168.0.1' or 'example.org'.
* @param i_proxy_cscf_port the proxy port.
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
	void tsip_stack(String s_realm, String s_impi, String s_impu_uri, String s_proxy_cscf_host, int i_proxy_cscf_port) { }
	void __set(void ao_params) { }
	int network;

/**
* Static parameter function used to set the SIP outbound proxy. This function is only needed if there is no DNS entries for the @b realm defined in the SIP stack creation.
* @param s_proxy_host Outbound proxy host IP address or domain name. e.g. '192.168.0.10' or 'example.com'
* @param i_proxy_port Outbound proxy port. e.g. 5060
* @param e_proxy_type Transport protocol type
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
*/
	void SetProxyOutBound(String s_proxy_host, int i_proxy_port, tsip_transport_type_e e_proxy_type) { }
	int e_state;
	int ao_uri_paths;

/**
* Updates SIP Proxy host, port and type. Using version 1.0 of sipML5 only WebSocket type is supported.
* @param s_proxy_host Proxy IP address or hostname
* @param i_proxy_port Proxy port
* @param e_proxy_type Network type. For now only @b WS and @b WSS are supported.
* @return  Parameter object
*
@code
o_stack.set(tsip_stack.prototype.SetProxyCSCF("192.168.0.10", 5060, tsip_transport_type_e.UDP));
@endcode
*/
	Object SetProxyCSCF(String s_proxy_host, int i_proxy_port, tsip_transport_type_e e_proxy_type) { return (Object)0; }
	int ao_sessions;

/**
* Sets SIP password for authentication
* @param s_password SIP password for authentication
* @return  Parameter object
*
@code
o_stack.set(tsip_stack.prototype.SetPassword('mysecret'));
@endcode
*/
	Object SetPassword(String s_password) { return (Object)0; }
	int natt;

/**
* Callback function used to report audio/video call (SIP INVITE) session events. Note that this callback won't report connection state. To get connection state, you should use @ref on_event_dialog event.
*
@code
o_stack.on_event_invite = function (evt: tsip_event_invite) {
    console.debug("phrase=" + evt.s_phrase);
    console.debug("sesssion id=%d", evt.get_session().get_id());
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
        case tsip_event_invite_type_e.M_STREAM_VIDEO_LOCAL_ADDED:
        case tsip_event_invite_type_e.M_STREAM_VIDEO_LOCAL_REMOVED:
        case tsip_event_invite_type_e.M_STREAM_VIDEO_REMOTE_ADDED:
        case tsip_event_invite_type_e.M_STREAM_VIDEO_REMOTE_REMOVED:
	
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
	static int on_event_invite;
	int ao_uri_associated_uris;

/**
* Adds SIP header to all sessions created using this stack
* @param s_name SIP header name
* @param s_value SIP valaue
* @return  Parameter object
*
@code
o_stack.set(
    tsip_stack.prototype.SetHeader('User-Agent', 'sipML5 client'),
    tsip_stack.prototype.SetHeader('Organization', 'Doubango Telecom')
);
@endcode
*/
	Object SetHeader(String s_name, String s_value) { return (Object)0; }
	int security;
	int o_layer_transport;

/**
* Starts the SIP stack. This function must be the first one to be called. This function is asynchronous which means that the stack will not be immediately started after the call.
* To get feedbacks about the status (success or error), you must subscribe to @ref on_event_stack.
* @return  0 if succeed and non-zero value otherwise
*/
	int start() { return (int)0; }

/**
* Callback function called to report Stack related events.
*
@code
o_stack.on_event_stack = function (evt: tsip_event) {
console.debug(evt.s_phrase);
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
	static int on_event_stack;

/**
* Callback function called to report dialog events. This event is common to all sessions (INVITE, REGISTER, PUBLISH, INFO...) and used to report connection states (CONNECTED, CONNECTING, TERMINATING, TERMINATED....)
and errors.
*
@code
o_stack.on_event_dialog = function (evt: tsip_event) {
    console.debug("phrase=" + evt.s_phrase);
    console.debug("sesssion id=%d", evt.get_session().get_id());
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
	static int on_event_dialog;

/**
* Sets SIP Display Name
* @param s_display_name New SIP Display Name value
* @return  Parameter object
*
@code
o_stack.set(tsip_stack.prototype.SetDisplayName('alice'));
@endcode
*/
	Object SetDisplayName(String s_display_name) { return (Object)0; }
	int o_timers;
	int ao_headers;
	int o_usr_data;

/**
* Sets static parameters.
* The function takes parameters created using static functions @b tsip_stack.prototype.Set*
* @sa @ref SetDisplayName
*/
	void set() { }
	int o_layer_dialog;
	int o_layer_transac;

/**
* Stops the SIP stack. Feedbacks will be reported to @ref on_event_stack callback function
* @param i_timeout Optional parameter used to defined maximum time in milliseconds to take to stop the stack. 
* Default value: 2000 millis
* @return  0 if succeed and non-zero value otherwise
*/
	int stop(int i_timeout) { return (int)0; }
	int ao_uri_service_routes;
	void __get_proxy_outbound_uri_string() { }
	void signal(void i_code, void s_phrase) { }
	int identity;

/**
* Callback function used to report messaging (SIP MESSAGE) session events.
*
@code
o_stack.on_event_message = function (evt: tsip_event_message) {
    console.debug("phrase=" + evt.s_phrase);
    console.debug("sesssion id=%d", evt.get_session().get_id());
    switch (evt.e_message_type) {
        case tsip_event_message_type_e.I_MESSAGE:
        case tsip_event_message_type_e.AO_MESSAGE:
        default: break;
    }
};
@endcode
*/
	static int on_event_message;
	void __get_contact_uri(void s_protocol) { }
	void SetAny(void e_type) { }
};

void __tsip_stack_transport_callback(void evt) { }
int tsip_stack_param_type_e;

