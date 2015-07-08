

<font color='red' size='2'>
<strong>We strongly recommend using the <i>RTCWeb Breaker</i> (requires <a href='http://webrtc2sip.org'>webrtc2sip</a> between the browser and Asterisk) on the <a href='http://sipml5.org/expert.htm'>expert window</a> instead of patching Asterisk. Using <a href='http://webrtc2sip.org'>webrtc2sip</a> with the <i>Media Coder</i> enabled also allows video transcoding (e.g. VP8 <code>&lt;-&gt; H.264</code>). <br />
For more info on how to use webrtc2sip and Asterisk: <a href='http://linux.autostatic.com/asterisk-and-sipml5-interoperability'>http://linux.autostatic.com/asterisk-and-sipml5-interoperability</a>
</strong><br />
</font>

This is a short guide explaining how to configure any HTML5 SIP client to work with Asterisk.
This example talk about [sipml5](http://code.google.com/p/sipml5/) client but any client using WebRTC should work. We also use [xlite5](http://www.counterpath.com/x-lite.html) but off course any SIP client could be used.
I assume that you already know how Asterisk works.

![http://sipml5.googlecode.com/svn/trunk/images/architecture_asterisk.png](http://sipml5.googlecode.com/svn/trunk/images/architecture_asterisk.png)<br />
_sipML5 solution using Asterisk_


&lt;hr /&gt;



## Building source code ##
The current Asterisk version ([revision 379070](https://code.google.com/p/sipml5/source/detail?r=379070)) allows to register and make calls from Chrome but no audio or video will flow.
The problem comes from ICE implementation in Chrome which is not fully compliant with RFC 5245. To fix this problem you'll need to apply the provided patch and rebuild Asterisk as explained in this section.
This patch also adds experimental support for VP8 video codec.

  1. checkout Asterisk source code **[revision 379070](https://code.google.com/p/sipml5/source/detail?r=379070)**
```
svn checkout -r 379070 http://svn.digium.com/svn/asterisk/trunk asterisk
```
  1. copy the [patch](http://sipml5.googlecode.com/svn/trunk/asterisk/asterisk_379070.patch) into **asterisk** folder
```
cd asterisk
wget http://sipml5.googlecode.com/svn/trunk/asterisk/asterisk_379070.patch
```
  1. apply the patch
```
 patch -p0 -i ./asterisk_379070.patch
```
  1. configure for build
```
export PREFIX=/opt/asterisk
./configure --with-crypto --with-ssl --with-srtp --prefix=$PREFIX
```
  1. build and install
```
make 
make install
make samples
```

## Configure **sip.conf** ##
Open [$PREFIX/etc/asterisk/sip.conf](http://sipml5.googlecode.com/svn/trunk/asterisk/etc/sip.conf) and change the default values as follow
```
udpbindaddr=0.0.0.0:5060
realm=doubango.org
transport=udp,ws,wss
```

## Configure **http.conf** ##
Open [$PREFIX/etc/asterisk/http.conf](http://sipml5.googlecode.com/svn/trunk/asterisk/etc/http.conf) and change the default values as follow
```
enabled=yes
bindaddr=0.0.0.0
bindport=8088
```

## Configure **rtp.conf** ##
Open [$PREFIX/etc/asterisk/rtp.conf](http://sipml5.googlecode.com/svn/trunk/asterisk/etc/rtp.conf) and change the default values as follow
```
stunaddr=stun.l.google.com:19302
```

## Create two users for testing ##
Open [$PREFIX/etc/asterisk/users.conf](http://sipml5.googlecode.com/svn/trunk/asterisk/etc/users.conf) and add two users (**1060** for chrome and **1061** for xlite5)
```
[1060]
type=peer
username=1060
host=dynamic
secret=1060
context=default
hasiax = no
hassip = yes
encryption = yes
avpf = yes
icesupport = yes
videosupport=no
directmedia=no

[1061]
type=peer
username=1061
host=dynamic
secret=1061
context=default
hasiax = no
hassip = yes
; enable ice if supported by your ua (e.g. xlite)
icesupport = yes
```

## Setting extensions ##
Open [$PREFIX/etc/asterisk/extensions.conf](http://sipml5.googlecode.com/svn/trunk/asterisk/etc/extensions.conf) and add two extensions to the **[default](default.md)** section
```
exten => 100,1,Dial(SIP/1060)
exten => 101,1,Dial(SIP/1061)
```

## Start Asterisk ##
To start Asterisk
```
$PREFIX/sbin/safe_asterisk
```

## Configure sipml5 ##
  * Open [http://sipml5.org/call.htm](http://sipml5.org/call.htmsvn=236) on your browser
  * Click on **Expert mode?** and set the fields as follow
![http://sipml5.googlecode.com/svn/trunk/asterisk/screenhot_chrome_expert.png](http://sipml5.googlecode.com/svn/trunk/asterisk/screenhot_chrome_expert.png)<br />
_Expert mode fields settings_<br />
The websocket connection url is **ws://192.168.0.12:8088/ws** (Do not forget the **/ws** at the end). For secure connection use **wss://** instead of **ws://**<br />
**192.168.0.12** = Asterisk Server IP address. You have to change this value with yours.<br />
**8088** = Websocket listening port (defined in **$PREFIX/etc/asterisk/http.conf**)
  * Go back to the home screen and set the fields as follow
![http://sipml5.googlecode.com/svn/trunk/asterisk/screenshot_chrome_credentials.png](http://sipml5.googlecode.com/svn/trunk/asterisk/screenshot_chrome_credentials.png)<br />
_Credentials fields settings_<br />
The password value is **1060** as defined in **$PREFIX/etc/asterisk/users.conf**

  * Press **LogIn** to connect to the server

## Configure Xlite5 ##
  * Download xlite5 from [http://www.counterpath.com/x-lite.html](http://www.counterpath.com/x-lite.html) and Install it
  * Add new Account (Preferences -> Accounts -> Add) and configure the credentials as follow
![http://sipml5.googlecode.com/svn/trunk/asterisk/screenshot_xlite5_credentials.png](http://sipml5.googlecode.com/svn/trunk/asterisk/screenshot_xlite5_credentials.png)<br />
_xlite5 account configuration_<br />
**192.168.0.12** = Asterisk Server IP address. You have to change this value with yours.<br />
**5060** is the default port defined in **$PREFIX/etc/asterisk/sip.conf**
  * Enable Firewall Traversal (**Topology** tab) as follow
![http://sipml5.googlecode.com/svn/trunk/asterisk/screenshot_xlite5_natt.png](http://sipml5.googlecode.com/svn/trunk/asterisk/screenshot_xlite5_natt.png)<br />
_Firewall traversal_<br />

## Testing with chrome ##
From **sipml5** home page, enter **1061** in the call control box and press **call**.

## Testing with Firefox, IE9+, Safari and Opera ##
To test with these browsers you will need to install [webrtc4all](http://code.google.com/p/webrtc4all/downloads/list) version **1.11.745** or later. <br />
**IMPORTANT**: The websocket transport is disabled on these browsers (because not supported or using old version) and you have to set a **SIP outbound proxy** using the expert view. Only **UDP** is supported as transport protocol. The value of the SIP outbound proxy should be something like **udp://192.168.0.12:5060**.

## Experimental support for VP8 video codec ##
Starting [r106](https://code.google.com/p/sipml5/source/detail?r=106) there is experimental support for VP8 video codec. To be used at your own risk.

## Updates ##
  1. **[r90](https://code.google.com/p/sipml5/source/detail?r=90)**: Fix one-way audio when the called party is chrome
  1. **[r91](https://code.google.com/p/sipml5/source/detail?r=91)**: Fix ICE authentication issues
  1. **[r98](https://code.google.com/p/sipml5/source/detail?r=98)**: Add support for Firefox, IE9+, Safari and Opera (thanks to [webrtc4all](http://code.google.com/p/webrtc4all)). Disable STUN keepAlive to avoid overrun.
  1. **[r104](https://code.google.com/p/sipml5/source/detail?r=104)**: Fix [issue 42](https://code.google.com/p/sipml5/issues/detail?id=42). Use Asterisk **373330**. Re-enable STUN keepAlive.
  1. **[r106](https://code.google.com/p/sipml5/source/detail?r=106)**: Adds support for VP8 video codec in Asterisk.
  1. **[r169](https://code.google.com/p/sipml5/source/detail?r=169)**: Update patch (tested with chrome **stable 24.0.1312.52 m** and **canary 26.0.1384.2**)

## Technical help ##
Please check our [issue tracker](http://code.google.com/p/sipml5/issues/list) or [developer group](https://groups.google.com/group/doubango) if you have any problem.


&lt;hr /&gt;


_bossiel_