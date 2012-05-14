
/** @mainpage Foreword
<h1> Foreword </h1>
<p>This is the world's first open source HTML5 SIP client entirely written in javascript for integration in social networks (FaceBook, Twitter, Google+), online games, e-commerce sites... No extension, plugin or gateway is needed.<br />
         The client can be used to connect to any SIP or IMS network from your preferred browser to make and receive audio/video calls and instant messages.<br />
         The protocol parsers (SIP, SDP...) are highly optimized using <a href="http://www.complang.org/ragel/">Ragel</a> lookup tables and is suitable for embedded systems with limited memory and low computing power.
</p>

@page Introduction
This document has been written by us (<a href="http://www.doubango.org">Doubango Telecom</a>) to help developers to quickly create innovative multimedia applications
for the Windows, MAC OS X, Linux, iOS and Android platforms. If you are a developer and is looking for the best way to develop a NGN (VoIP, Messaging, Video Conferencing, ...) or rich application for these platforms
then your are at the right place. <br />
If you want to get help or have some feedbacks then please visit our website: <a href="http://code.google.com/p/sipml5/">http://code.google.com/p/sipml5/</a> or subscribe to our <a href="http://groups.google.com/group/doubango/"> developer mailing list</a>.

<h2>Doubango Solution</h2>
<b>android-ngn-stack</b> is part of Doubango Solution which include many components such as:

<h3>Client-side components</h3>
- <a href="http://code.google.com/p/boghe/">Boghe</a>: IMS/RCS Client for Windows
- <a href="http://code.google.com/p/imsdroid/">IMSDroid</a>: IMS/RCS Client for Android using <b>android-ngn-stack</b>
- <a href="http://code.google.com/p/idoubs/">iDoubs</a>: IMS/RCS Client for iOS (iPhone, iPad and iPod Touch) and MAC OS X

<h3>Server-side components</h3>
- <a href="http://code.google.com/p/openvcs/">OpenVCS</a>: OpenVCS stands for Open Source Video Conferencing Server and is used to manage Multipoint Control Units (MCU). Each MCU (a.k.a Bridge) can handle up to 64 participants
- <a href="http://code.google.com/p/flash2ims/">Flash2IMS</a>: Adobe® Flash® to SIP/IMS Gateway.

@page page__Setting_Up_sipML5_project Setting up sipML5 project
@anchor page__Setting_Up_sipML5_project
This section explain how to setup a sipML5 project using Eclipse.<br />

<h2>Checking out the source code</h2>
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
sipml5/trunk/src/index.htm
@endcode
you don't need to change anything in the code to start testing. Just drag and drop <b>index.htm</b> to your web browser and start enjoying.

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


