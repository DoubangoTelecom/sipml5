

## Where to get help? ##
For any technical issue, please connect to our developer group: [https://groups.google.com/group/doubango](https://groups.google.com/group/doubango).

## How to use sipML5 API in my project ##
The API is a single file and could be downloaded at [http://code.google.com/p/sipml5/wiki/Downloads](http://code.google.com/p/sipml5/wiki/Downloads). To get started, please check the [programmer's guide](http://sipml5.org/docgen/index.htmlsvn=236) and [API](http://sipml5.org/docgen/symbols/SIPml.html).

## How to get notified for new updates? ##
To get notified, please subscribe to our mailing list at [http://doubango.org/contact.html](http://doubango.org/contact.html)

## Which operating systems are supported? ##
Any System supporting a web browser (Chrome, firefox, Safari or IE) built with <a href='http://en.wikipedia.org/wiki/WebRTC'>WebRTC</a> features.
We highly recommend using <a href='https://www.google.com/intl/en/chrome/browser/'>Google Chrome</a>

## Is it possible to call another HTML5 SIP client ##
Yes

## I get "SIP/2.0 488 Not acceptable here" response when I try to make calls from sipml5.org to a softphone or PSTN. How can I fix this? ##
This means the remote endpoint doesn't support all WebRTC features.
  * Go to http://sipml5.org/expert.htm
  * Check "Enable RTCWeb Breaker" then click on "save" button
  * LogIn again and try to make calls... all should work as expected :)

## Is it possible to call any SIP client? ##
Yes... but the client must support all standards defined by the <a href='http://tools.ietf.org/wg/rtcweb/'>RTCWeb</a> working group. We recommend these clients:
  * <a href='http://code.google.com/p/boghe/'>Boghe</a> _2.0.100.701_ or later : Windows XP, Vista and 7
  * <a href='http://code.google.com/p/imsdroid/'>IMSDroid</a> _2.0.491_ or later: Android
  * <a href='http://code.google.com/p/idoubs/'>iDoubs</a>: iOS (iPad, iPhone, iPod Touch) and MAC OSX
...off course you don't need to install these applications if you are calling another HTML5 SIP client. <br />
For more information on how to configure these clients, please [click here](Calling_SIP_clients.md). <br />
We recommend checking the non-exhaustive list of [Public SIP Servers](Public_SIP_Servers.md) known to work with sipML5.

## Is it possible to use Asterisk 11 to make/receive calls? ##
~~More info at [https://wiki.asterisk.org/wiki/display/AST/Asterisk+WebRTC+Support](https://wiki.asterisk.org/wiki/display/AST/Asterisk+WebRTC+Support)~~ <br />
~~Yes. Please check wiki page at [http://code.google.com/p/sipml5/wiki/Asterisk](http://code.google.com/p/sipml5/wiki/Asterisk)~~<br />
Yes. You have to enable the _RTCWeb Breaker_ on the [expert window](http://sipml5.org/expert.htm).

## Is it possible to use FreeSWITCH to make/receive calls? ##
Yes. You have to enable the _RTCWeb Breaker_ on the [expert window](http://sipml5.org/expert.htm).

## Is it possible to run use sipml5 on Android and iOS? ##
Yes but it requires a browser with support for WebRTC and WebSocket. For now only Ericsson WebRTC implementation (https://labs.ericsson.com/blog/bowser-the-world-s-first-webrtc-enabled-mobile-browser) runs on these systems.
Issues on Ericsson WebRTC implementation: https://groups.google.com/group/ericsson-labs-web-rtc/browse_thread/thread/4acadd0da3fce37c

## How to reduce the size of the scripts before deploying ##
To compress the scripts (css and javascript) you have to execute:
```
 ./release.sh
```
the compressed files will be generated inside **release** directory.