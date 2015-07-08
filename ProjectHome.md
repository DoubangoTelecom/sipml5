Source code freely provided to you by <a href='http://www.doubango.org'> Doubango Telecom ®</a> under BSD terms. <br />
Click [here](Downloads.md) to download the API.
<br />



## Foreword ##
This is the world's first open source HTML5 SIP client (_May 12, 2012_) entirely written in javascript for integration in social networks (FaceBook, Twitter, Google+), online games, e-commerce sites... No extension, plugin or gateway is needed. The media stack rely on <a href='http://en.wikipedia.org/wiki/WebRTC'>WebRTC</a>.<br />
The client can be used to connect to any SIP or IMS network from your preferred browser to make and receive audio/video calls and instant messages. It's also possible to make calls to PSTN or any SIP-legacy network using [webrtc2sip.org](http://webrtc2sip.org)<br />
The protocol parsers (SIP, SDP...) are highly optimized using <a href='http://www.complang.org/ragel/'>Ragel</a> lookup tables and is suitable for embedded systems with limited memory and low computing power.

**sipML5** solution also contains [webrtc2sip](http://webrtc2sip.org), [click-to-call](http://click2dial.org), [webrtc4all](http://code.google.com/p/webrtc4all/) and [SIP TelePresence (Video Group chat) client](http://conf-call.org/) components. <br />

![http://webrtc2sip.googlecode.com/svn/trunk/documentation/images/architecture.png](http://webrtc2sip.googlecode.com/svn/trunk/documentation/images/architecture.png) <br />
_sipML5 solution architecture (1)_ <br />

![http://sipml5.googlecode.com/svn/trunk/images/architecture_asterisk.png](http://sipml5.googlecode.com/svn/trunk/images/architecture_asterisk.png) <br />
_sipML5 solution architecture (2)_


&lt;hr /&gt;



## Compatibility ##
| **Windows** | **OS X** | **Linux** | **Android** | **iOS** |
|:------------|:---------|:----------|:------------|:--------|
| Chrome, Firefox Nightly/Aurora , Firefox<sup> stable[1]</sup>, IE<sup>[1]</sup>, Opera<sup>[1]</sup>, Safari<sup>[1]</sup> | Chrome, Firefox Nightly/Aurora | Chrome, Firefox Nightly | Chrome Beta, Firefox Nightly| Bowser<sup>[2]</sup> |

<sup>[1]</sup>: Thanks to [webrtc4all](http://code.google.com/p/webrtc4all/)<br />
<sup>[2]</sup>: http://labs.ericsson.com/blog/bowser-the-world-s-first-webrtc-enabled-mobile-browser

## License ##
The code is released under BSD license. More information at [https://code.google.com/p/sipml5/wiki/License](https://code.google.com/p/sipml5/wiki/License).

## Features ##
Short but not exhaustive list of supported features:
  * Works on Chrome, Firefox, IE, Safari, Opera and Bowser.
  * Audio / Video call
  * [Screen/Desktop sharing from Chrome to \*any\* SIP client](ScreenShare.md)
  * Instant messaging
  * Presence
  * Call Hold / Resume
  * Explicit Call transfer
  * Multi-line and multi-account
  * Dual-tone multi-frequency signaling (DTMF) using SIP INFO
  * [click-to-call](http://click2dial.org)
  * [SIP TelePresence (Video Group chat)](https://code.google.com/p/telepresence/)
  * 3GPP IMS standards

## Getting started ##
<b>sipML5</b> works on any web browser supporting WebRTC but we highly recommend using [Google Chrome](https://www.google.com/intl/en/chrome/browser/) or [Firefox Nightly](http://nightly.mozilla.org/) for testing.
  * [Enable WebRTC on your browser](http://code.google.com/p/sipml5/wiki/Enable_WebRTC)
  * <a href='http://sipml5.org/call.htm'>Live demo</a>
  * [Calling SIP rich clients running on iOS, Android, OS X or Windows](Calling_SIP_clients.md)
  * [Frequently asked questions](FAQ.md)
  * [Screen sharing](ScreenShare.md)
  * Non-exhaustive list of [Public SIP Servers](Public_SIP_Servers.md) known to work with sipML5
  * [Programmer's guide](http://sipml5.org/docgen/index.html)
  * To develop your own SIP phone, download the API [here](Downloads.md).

## Programing with the API ##
The [API](http://sipml5.org/docgen/symbols/SIPml.html) is designed with love to make it easy to develop rich and robust HTML5 applications in few lines of code.
No need to know how SIP work to start writing your code. Using this [API](http://sipml5.org/docgen/symbols/SIPml.html), it will be a piece of cake to write HTML5 VoIP applications.
Below, a very compact code showing how to initialize the engine, start the stack and make video call from _bob_ to _alice_ in **less than 15 lines**:

```javascript

SIPml.init(
function(e){
var stack =  new SIPml.Stack({realm: 'example.org', impi: 'bob', impu: 'sip:bob@example.org', password: 'mysecret',
events_listener: { events: 'started', listener: function(e){
var callSession = stack.newSession('call-audiovideo', {
audio_remote: document.getElementById('audio-remote'),
video_local: document.getElementById('video-local'),
video_remote: document.getElementById('video-remote')
});
callSession.call('alice');
}
}
});
stack.start();
}
);
// <audio id="audio_remote" autoplay="autoplay" />
// <video id="video-remote" autoplay="autoplay" />
// <video id="video-local" autoplay="autoplay" muted="true" />
```

## Technical help ##
**Please don't send me technical questions by mail**. I'll certainly not respond to the mail as I receive more than a hundred messages per day. Sorry :)<br />
To get technical help, please subscribe to our <a href='http://groups.google.com/group/doubango'> developer's group</a> or use the <a href='http://code.google.com/p/sipml5/issues/list'>Issue tracker</a> to report bugs.

## Demo videos ##
<table>
<tr>
<td><a href='http://www.youtube.com/watch?feature=player_embedded&v=ro3FFNx7d-g' target='_blank'><img src='http://img.youtube.com/vi/ro3FFNx7d-g/0.jpg' width='425' height=344 /></a></td>
<td><a href='http://www.youtube.com/watch?feature=player_embedded&v=7HEMyxAnATI' target='_blank'><img src='http://img.youtube.com/vi/7HEMyxAnATI/0.jpg' width='425' height=344 /></a></td>
</tr>
<tr>
<td align='center'><i>Call between Google Chrome and iPad device</i></td>
<td align='center'><i>Call between Google Chrome and Android device</i></td>
</tr>
</table>

<br>
<br>
<b>© 2012-2013 Doubango Telecom</b> <br />
<i>Inspiring the future</i>