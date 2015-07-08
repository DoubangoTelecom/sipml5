All releases can be downloaded [here](Downloads.md).



## 1.5.222 ##
  * SVN: [r222](https://code.google.com/p/sipml5/source/detail?r=222)
  * Date: December 11, 2014
  * Add support for BFCP. New API functions: [startBfcpShare()](http://sipml5.org/docgen/symbols/SIPml.Session.Call.html#startBfcpShare), [stopBfcpShare()](http://sipml5.org/docgen/symbols/SIPml.Session.Call.html#stopBfcpShare)
  * [Fix 'INVALID\_SESSION\_DESCRIPTION' issue on FF 35.05](https://groups.google.com/forum/#!topic/doubango/xMd8DV-_pbs)
  * Fix Hold/Resume issue on Chrome (Still not working for FF 35.05 as PeerConnection.removeStream() not implemented by Mozilla)
  * Add public function to mute/unmute audio and video streams. New API function: [mute()](http://sipml5.org/docgen/symbols/SIPml.Session.Call.html#mute)

## 1.4.217 ##
  * SVN: [r217](https://code.google.com/p/sipml5/source/detail?r=217)
  * Date: March 26, 2014
  * Fix [issue 162](https://code.google.com/p/sipml5/issues/detail?id=162) (One Way video when calling cisco TelePresence-H.264-)
  * Fix [issue 166](https://code.google.com/p/sipml5/issues/detail?id=166) (Adds support for [RFC5168](http://tools.ietf.org/html/rfc5168) -requires webrtc4all plugin-)
  * Fix [issue 169](https://code.google.com/p/sipml5/issues/detail?id=169) (Use the right media profile depending on the presence of "fingerprint" and "crypto" attributes)
  * Fix [issue 171](https://code.google.com/p/sipml5/issues/detail?id=171) (Allow choosing the WebRTC implementation type -native, bowser or w4a-). New API function: [setWebRtcType](http://sipml5.org/docgen/symbols/SIPml.html#.setWebRtcType).


## 1.3.203 ##
  * SVN: [r203](https://code.google.com/p/sipml5/source/detail?r=203)
  * Date: August 2, 2013
  * Adds support for [Screen/Desktop sharing](ScreenShare.md)
  * Allows disabling STUN/TURN on the browser(API: [ice\_servers](http://sipml5.org/docgen/symbols/SIPml.Stack.Configuration.html#ice_servers), TEST: see [here](http://sipml5.org/expert.htm#aIceServers))
  * Allows setting audio and video bandwidths (API: [bandwidth](http://sipml5.org/docgen/symbols/SIPml.Stack.Configuration.html#bandwidth), TEST: see [here](http://sipml5.org/expert.htm#aBandwidth))
  * Allows setting preferred video size (API: [video\_size](http://sipml5.org/docgen/symbols/SIPml.Stack.Configuration.html#video_size), TEST: see [here](http://sipml5.org/expert.htm#aSizeVideo)).
  * Adds support for media stream caching (API: [enable\_media\_stream\_cache](http://sipml5.org/docgen/symbols/SIPml.Stack.Configuration.html#enable_media_stream_cache), TEST: see [here](http://sipml5.org/expert.htm#aCacheMediaStream))
  * Allows setting the debug level (API: [setDebugLevel](http://sipml5.org/docgen/symbols/SIPml.html#.setDebugLevel), TEST: see [here](http://sipml5.org/expert.htm#aDebugMessages))
  * Adds support for Full (3GPP TS 24.229 - 5.1.1.2.2) and earlyIMS ([TR 33.978](http://www.arib.or.jp/english/html/overview/doc/STD-T63v9_60/5_Appendix/Rel6/33/33978-660.pdf)) registrations (API: [enable\_early\_ims](http://sipml5.org/docgen/symbols/SIPml.Stack.Configuration.html#enable_early_ims), TEST: see [here](http://sipml5.org/expert.htm#aEarlyIMS))
  * Adds support for TEL URI ([http://tools.ietf.org/html/rfc3966](rfc3966.md))
  * Bugs closed in this release: [issue 98](https://code.google.com/p/sipml5/issues/detail?id=98), [issue 99](https://code.google.com/p/sipml5/issues/detail?id=99), [issue 109](https://code.google.com/p/sipml5/issues/detail?id=109), [issue 114](https://code.google.com/p/sipml5/issues/detail?id=114) and [issue 119](https://code.google.com/p/sipml5/issues/detail?id=119).

## 1.2.185 ##
  * SVN: [r185](https://code.google.com/p/sipml5/source/detail?r=185)
  * Date: March 14, 2013
  * Allows setting [TURN/STUN servers](http://sipml5.org/docgen/symbols/SIPml.Stack.Configuration.html#ice_servers)
  * Bug fix

## 1.2.170 ##
  * SVN: [r170](https://code.google.com/p/sipml5/source/detail?r=170)
  * Date: March 11, 2013
  * Adds support for [click-to-call](http://click2dial.org)
  * Bug fix

## 1.2.165 ##
  * SVN: [r165](https://code.google.com/p/sipml5/source/detail?r=165)
  * Date: January 14, 2013
  * Adds support for Firefox Nightly
  * Fix [issue 60](https://code.google.com/p/sipml5/issues/detail?id=60), [issue 65](https://code.google.com/p/sipml5/issues/detail?id=65) and [issue 66](https://code.google.com/p/sipml5/issues/detail?id=66)

## 1.1.0 ##
  * SVN: [r148](https://code.google.com/p/sipml5/source/detail?r=148)
  * Date: December 20, 2012
  * Adds support for Presence publication and subscription
  * Fix [issue 56](https://code.google.com/p/sipml5/issues/detail?id=56), [issue 57](https://code.google.com/p/sipml5/issues/detail?id=57) and [issue 59](https://code.google.com/p/sipml5/issues/detail?id=59)

## 1.0.0 ##
  * SVN: [r144](https://code.google.com/p/sipml5/source/detail?r=144)
  * Date: December 16, 2012
  * First API release