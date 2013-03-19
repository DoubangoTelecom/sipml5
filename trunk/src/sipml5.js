/*
* Copyright (C) 2012 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
/** @mainpage Foreword
<p>This is the world's first open source HTML5 SIP client entirely written in javascript for integration in social networks (FaceBook, Twitter, Google+), online games, e-commerce sites... No extension, plugin or gateway is needed.<br />
         The client can be used to connect to any SIP or IMS network from your preferred browser to make and receive audio/video calls and instant messages.<br />
         The protocol parsers (SIP, SDP...) are highly optimized using <a href="http://www.complang.org/ragel/">Ragel</a> lookup tables and is suitable for embedded systems with limited memory and low computing power.
</p>

@image html architecture.png "sipML5 solution architecture"
<br />
This document has been written by us (<a href="http://www.doubango.org">Doubango Telecom</a>) to help developers to quickly create innovative multimedia applications
for the Windows, MAC OS X, Linux, iOS and Android platforms. If you are a developer and is looking for the best way to develop a NGN (VoIP, Messaging, Video Conferencing, ...) or rich application for these platforms
then your are at the right place. <br />
If you want to get help or have some feedbacks then please visit our website: <a href="http://code.google.com/p/sipml5/">http://code.google.com/p/sipml5/</a> or subscribe to our <a href="http://groups.google.com/group/doubango/"> developer mailing list</a>.

<h3>Quick start </h3>
 - @ref page_create_sip_stack
 - @ref page_login
 - @ref page_sms_like
 - @ref page_avcalls
 - Presence

<br />
<h3>Checking out the source code</h3>
<br />
To check out the source code of the NGN library you will need a SVN client.<br />
Use this command to anonymously check out the last project source:
@code
svn checkout http://sipml5.googlecode.com/svn sipml5
@endcode
The source code of the library is under:
@code
sipml5/trunk/src
@endcode
the main page for testing is at:
@code
sipml5/trunk/src/call.htm
@endcode
you don't need to change anything in the code to start testing. Just drag and drop <b>call.htm</b> to your web browser and start enjoying.

@page Conding convention
As you probably now javascript is not a strongly typed language and it's bit hard to get the type of an object while programing. To make your life easier we adopted a convention in 
the naming of the variables and functions.
<h2>Prefixes</h2>
 - <b>e_</b>: Enumeration  @code var e_state = states_e.START; @endcode
 - <b>f_</b>: Floating point number @code f_density = 0.5; @endcode
 - <b>i_</b>: Integer number @code var i_index = 1; @endcode
 - <b>o_</b>: Object created using new() @code var o_stack = new tsip_stack_t(...); @endcode
 - <b>ao_</b>: Array of Objects @code var ao_stacks = new Array(); @endcode
 - <b>on_</b>: Callback function pointer @code o_stack.on_event = function(e){}; @endcode
 - <b>s_</b>: String @code var s_uri = 'sip:alice@doubango.org'; @endcode
 - <b>as_</b>: Array of strings @code var ao_uris = new Array();
Please note that static variables are prefixes by "__" followed by the type e.g. @code var __i_timeout = 1800; @endcode
<h2>Sufixes</h2>
 - <b>_t</b>: An object type which could be created using 'new' keyword.
 - <b>_e</b>: Enumeration type.
 - <b>_f</b>: Variable defining a function (like C/C++ function pointers or CSharp delegates)
*/

/**
@page page_create_sip_stack Create SIP Stack
In order to make and receive calls you need to create a SIP stack object. This page explain how to create such object and how to register for events.

@code
var s_realm = "doubango.org"; // your domain name
var s_impi = "alice"; // your authentication name
var s_impu = "sip:alice@doubango.org"; // your SIP public address where to receive calls
var s_webrtc2sip_host = "sipml5.org"; // Proxy host or IP address of the WebRTC gateway used to convert WebSocket transport to UDP/TCP/TLS. You can use ours or replace it by yours if you're hosting your own Gateway.
var i_webrtc2sip_port = 4062; // WebRTC gateway port

// create the SIP stack
o_stack = new tsip_stack(s_realm, s_impi, s_impu, s_webrtc2sip_host, i_webrtc2sip_port,
                tsip_stack.prototype.SetPassword("mysecret"),
                tsip_stack.prototype.SetDisplayName("Alice"),
                tsip_stack.prototype.SetHeader('User-Agent', 'MyUserAgent'),
                tsip_stack.prototype.SetHeader('Organization', 'MyOrganization'));

// listen for events
o_stack.on_event_stack = function(evt){
    // your code here
};
o_stack.on_event_dialog = function(evt){
    // your code here
};
o_stack.on_event_invite = function(evt){
    // your code here
};
o_stack.on_event_message = function(evt){
    // your code here
};

// start the stack
var i_ret = o_stack.stop();
if(i_ret == 0){
    tsk_utils_log_info('Stack starting');
    // not that success case doesn't mean that the stack started. You have to listen for  @b on_event_stack to get notified when the stack finish starting.
}
else{
    tsk_utils_log_error('Failed to start the stack');
}

@endcode

<h4>Adding SIP outbound proxy</h4>
<br />
The SIP destination address is generated like this:
 - The gateway performs a DNS <i>NAPTR</i> then <i>SRV</i> on the domain name ('doubango.org' in the above case) and try all records from the highest to the lowest priority
 - If all records fails then, it tries to send the message directly to the domain name (DNS <i>A</i> and <i>AAAA</i>)

If you want to send the SIP messages to a fixed IP address or host name and bypass the process described above then, you can add an outbound proxy like this:
@code
o_stack.set(
    tsip_stack.prototype.SetProxyOutBound('192.168.0.12', 5060, tsip_transport_type_e.UDP)
);
@endcode

<br />
Next Step: @ref page_login

*/

/**
@page page_login LogIn / LogOut

Before connecting to your SIP network (SIP REGISTER) you have to create a SIP stack as explained in @ref page_create_sip_stack section.

<h4>LogIn</h4>
@code
// Sends SIP REGISTER for connection as soon as the stack finish starting
var o_session_reg = null;
o_stack.on_event_stack = function(evt) {
        tsk_utils_log_info(evt.s_phrase);
        switch (evt.i_code) {
            case tsip_event_code_e.STACK_STARTED:
                {
                    // creates the session
                    o_session_reg = new tsip_session_register(o_stack,
                                            tsip_session.prototype.SetExpires(200),
                                            tsip_session.prototype.SetCaps("+g.oma.sip-im"));
                    // sends SIP REGISTER request
                    o_session_reg.register();
                    break;
                }
            case tsip_event_code_e.STACK_STOPPING:
            case tsip_event_code_e.STACK_STOPPED:
            case tsip_event_code_e.STACK_STARTING:
            case tsip_event_code_e.STACK_FAILED_TO_START:
            case tsip_event_code_e.STACK_FAILED_TO_STOP:
            default:
                {
                    break;
                }
        }
    };
@endcode

<h4>LogOut</h4>
To disconnect from the SIP server:

@code
o_session_reg.unregister(); // not recommended
// or
o_stack.stop(); // recommended: hangup all calls, unpublish, unsubscribe... then unregister
@endcode

Disconnection events (Success, Failure...) will be reported to @ref tsip_stack::on_event_dialog.

*/

/**
@page page_sms_like Instant messaging (SMS-like)
Before sending or receiving SMS messages (SIP @b MESSAGE) you have to create a SIP stack as explained in @ref page_create_sip_stack section. <br />
To listen to the messaging events:
@code
o_stack.on_event_message = function (evt) {
    tsk_utils_log_info(evt.s_phrase);
    switch (evt.e_message_type) {
        case tsip_event_message_type_e.I_MESSAGE:
            {
                evt.get_session().accept();
                tsk_utils_log_info("Incoming message. content=%s from=" + evt.get_message().get_content_as_string(), evt.get_session().o_uri_from);
                break;
            }
        case tsip_event_message_type_e.AO_MESSAGE:
            {
                if (evt.i_code >= 200 && evt.i_code <= 299) {
                    tsk_utils_log_info("sent");
                }
                else if (evt.i_code >= 300) {
                    tsk_utils_log_info("not sent (%d)", evt.i_code);
                }
                break;
            }
    }
}
@endcode

To send a message to @b 006:
@code
// creates an IM session
var o_session_im = new tsip_session_message(o_stack,
        tsip_session.prototype.SetToStr("006"),
        tsip_session.prototype.SetHeader("What", "IM"));
// sends a message
o_session_im.send(new String("Pêche à la moule"), "text/plain; charset=utf8");

@endcode

*/

/**
@page page_avcalls Audio/Video calls
Before making audio/video calls (SIP @b INVITE) you have to create a SIP stack as explained in @ref page_create_sip_stack section. <br />
To get notified for incoming calls and any event related to the @b INVITE dialog you should listen to @ref tsip_stack::on_event_invite callback.

To call @b bob:

@code
// create the session
o_session = new tsip_session_invite(oSipStack,
                         tsip_session.prototype.SetToStr('bob'),
                         tsip_session.prototype.SetHeader('MyHeader', 'My Header Value'),
                      );

// make the call
if (o_session.call(tmedia_type_e.AUDIO_VIDEO) != 0) {
    tsk_utils_log_error('Failed to make call');
}
@endcode

To hangup the call:
@code
o_session.hangup();
@endcode

To transfer the call to @b alice:
@code
if (o_session.transfer('alice') != 0) {
    tsk_utils_log_error('Failed to transfer the call');
}
@endcode

To hold the call:
@code
if(o_session.hold() != 0){
    tsk_utils_log_error('Failed to hold the call');
}
@endcode

To resume the call:
@code
if(o_session.resume() != 0){
    tsk_utils_log_error('Failed to resume the call');
}
@endcode

To send DTMF digit @b '#':
@code
if(o_session.dtmf('#') != 0){
    tsk_utils_log_error('Failed to send DTMF');
}
@endcode

*/