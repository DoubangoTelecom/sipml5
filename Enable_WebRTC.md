

## Google Chrome ##
Nothing to be done. It's ON by default.

## Firefox Nightly ##
  1. Browse to <a href='about:config'><b>about:config</b></a>
  1. Set **media.peerconnection.enabled** value to true
  1. Set **media.navigator.enabled** value to true
  1. It's not required but to speedup your testing you can disable permission on media stream request by setting **media.navigator.permission.disabled** value to true

## IE, Firefox stable, Safari and Opera ##
Just download and install [webrtc4all](http://code.google.com/p/webrtc4all/).