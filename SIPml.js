/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/

/**
@fileoverview This is SIPML5 "library" contains a  lot of classes and functions.

@name sipML5 API
@author      Doubango Telecom <http://www.doubango.org>
@version     2.1.4
*/

/** 
@namespace
@description Root namesapce.
*/
SIPml = {};

/** @private */SIPml.b_initialized = false;
/** @private */SIPml.b_initializing = false;
/** @private */SIPml.s_navigator_friendly_name = 'unknown';
/** @private */SIPml.b_navigator_outdated = false;
/** @private */SIPml.s_navigator_version = 'unknown';
/** @private */SIPml.s_system_friendly_name = 'unknown';
/** @private */SIPml.b_webrtc4all_plugin_outdated = false;
/** @private */SIPml.b_webrtc4all_supported = false;
/** @private */SIPml.s_webrtc4all_version = 'unknown';
/** @private */SIPml.b_have_media_stream = false;
/** @private */SIPml.b_webrtc_supported = false;


/**
Sets the debug level.
@since version 1.3.203
@param {String} level The level. Supported values: <i>info</i>, <i>warn</i>, <i>error</i> and <i>fatal</i>.
*/
SIPml.setDebugLevel = function (level) {
    tsk_utils_log_set_level(level === 'fatal' ? 1 : (level === 'error' ? 2 : (level === 'warn' ? 3 : 4)));
}

/**
Starts debugging the native (C/C++) code. Requires webrt4all plugin.
On Windows, the output file should be at <b>C:\Users\&lt;YOUR LOGIN&gt;\AppData\Local\Temp\Low\webrtc4all.log</b>.
Starting the native debug isn't recommended and must be done to track issues only.
@since version 2.0.0
*/
SIPml.startNativeDebug = function () {
    WebRtc4all_GetPlugin().startDebug();
}

/**
Stops debugging the native (C/C++) code. Requires webrt4all plugin.
@since version 2.0.0
*/
SIPml.stopNativeDebug = function () {
    WebRtc4all_GetPlugin().stopDebug();
}

/**
Gets the current WebRTC type being  used.
@since version 1.4.217
@returns {String} the WebRTC type. Possible values: <i>native</i>, <i>w4a</i>, <i>erisson</i> or <i>unknown</i>.
*/
SIPml.getWebRtcType = function () {
    switch (WebRtc4all_GetType()) {
        case WebRtcType_e.W4A: case WebRtcType_e.IE: case WebRtcType_e.NPAPI: return "w4a";
        case WebRtcType_e.ERICSSON: return "erisson";
        case WebRtcType_e.NATIVE: return "native";
        default: return "unknown";
    }
}

/**
Sets the default webrtc type. Must be called before <a href="#.init">initializing</a> the engine.
@since version 2.0.0
@param {String} type The type. Supported values: <i>native</i>, <i>w4a</i> and <i>erisson</i>.
@returns {Boolean} <i>true</i> if succeed; otherwise <i>false</i>
*/
SIPml.setWebRtcType = function (type) {
    if (SIPml.isInitialized()) {
        throw new Error("ERR_ALREADY_INITIALIZED: Engine already initialized.");
    }
    return WebRtc4all_SetType(type);
}

/**
Gets the list of running apps. Requires webrt4all plugin.
@since version 2.0.0
@returns {String} the the list of running apps. Format: <i>(base64($$WindowID$$=str(...)$$Description$$=str(...)$$IconData$$=base64(...)$$IconType$$=str(...)))*</i>
@throws {ERR_NOT_READY | ERR_NOT_SUPPORTED} <font color="red">ERR_NOT_READY</font> | <font color="red">ERR_NOT_SUPPORTED</font>
*/
SIPml.getRunningApps = function () {
    if (SIPml.getWebRtcType() != 'w4a') {
        throw new Error("ERR_NOT_SUPPORTED: requires webrtc4all plugin");
    }
    return WebRtc4all_GetPlugin().runningApps();
}

/**
Sets the video fps. Requires webrt4all plugin.
@since version 2.0.0
@param {Integer} fps fps value. 
@returns {Integer} 0 if successful; otherwise nonzero
@throws {ERR_NOT_READY | ERR_NOT_SUPPORTED} <font color="red">ERR_NOT_READY</font> | <font color="red">ERR_NOT_SUPPORTED</font>
*/
SIPml.setFps = function (fps) {
    if (SIPml.getWebRtcType() != 'w4a') {
        throw new Error("ERR_NOT_SUPPORTED: Setting maximum video size requires webrtc4all plugin");
    }
    WebRtc4all_GetPlugin().fps = fps;
    return 0;
}


/**
Sets the maximum video size. Requires webrt4all plugin.
@since version 2.0.0
@param {String} maxVideoSize maxVideoSize value. Supported values: "sqcif", "qcif" "qvga" "cif" "hvga", "vga", "4cif", "svga", "480p", "720p", "16cif", "1080p", "2160p".
@returns {Integer} 0 if successful; otherwise nonzero
@throws {ERR_NOT_READY | ERR_NOT_SUPPORTED} <font color="red">ERR_NOT_READY</font> | <font color="red">ERR_NOT_SUPPORTED</font>
*/
SIPml.setMaxVideoSize = function (maxVideoSize) {
    if (SIPml.getWebRtcType() != 'w4a') {
        throw new Error("ERR_NOT_SUPPORTED: Setting FPS requires webrtc4all plugin");
    }
    WebRtc4all_GetPlugin().maxVideoSize = maxVideoSize;
    return 0;
}

/**
Sets the maximum bandwidth (upload). Requires webrt4all plugin.
@since version 2.0.0
@param {Integer} maxBandwidthUp maxBandwidthUp value (kbps). 
@returns {Integer} 0 if successful; otherwise nonzero
@throws {ERR_NOT_READY | ERR_NOT_SUPPORTED} <font color="red">ERR_NOT_READY</font> | <font color="red">ERR_NOT_SUPPORTED</font>
*/
SIPml.setMaxBandwidthUp = function (maxBandwidthUp) {
    if (SIPml.getWebRtcType() != 'w4a') {
        throw new Error("ERR_NOT_SUPPORTED: Setting maximum bandwidth requires webrtc4all plugin");
    }
    WebRtc4all_GetPlugin().maxBandwidthUp = maxBandwidthUp;
    return 0;
}

/**
Sets the maximum bandwidth (down). Requires webrt4all plugin.
@since version 2.0.0
@param {Integer} maxBandwidthUp maxBandwidthUp value (kbps). 
@returns {Integer} 0 if successful; otherwise nonzero
@throws {ERR_NOT_READY | ERR_NOT_SUPPORTED} <font color="red">ERR_NOT_READY</font> | <font color="red">ERR_NOT_SUPPORTED</font>
*/
SIPml.setMaxBandwidthDown = function (maxBandwidthDown) {
    if (SIPml.getWebRtcType() != 'w4a') {
        throw new Error("ERR_NOT_SUPPORTED: Setting maximum bandwidth requires webrtc4all plugin");
    }
    WebRtc4all_GetPlugin().maxBandwidthDown = maxBandwidthDown;
    return 0;
}

/**
Defines whether to enable "zero-artifacts" features. Requires webrt4all plugin. <br />
More information about this option on Doubango's TelePresence wiki page: <a href="https://code.google.com/p/telepresence/wiki/Technical_Video_quality#Zero-artifacts">https://code.google.com/p/telepresence/wiki/Technical_Video_quality#Zero-artifacts</a>
@since version 2.0.0
@param {Boolean} zeroArtifacts New optional value. 
@returns {Integer} 0 if successful; otherwise nonzero
@throws {ERR_NOT_READY | ERR_NOT_SUPPORTED} <font color="red">ERR_NOT_READY</font> | <font color="red">ERR_NOT_SUPPORTED</font>
*/
SIPml.setZeroArtifacts = function (zeroArtifacts) {
    if (SIPml.getWebRtcType() != 'w4a') {
        throw new Error("ERR_NOT_SUPPORTED: Setting maximum bandwidth requires webrtc4all plugin");
    }
    WebRtc4all_GetPlugin().zeroArtifacts = zeroArtifacts;
    return 0;
}

/**
Gets the version name of the installed <a href="http://code.google.com/p/webrtc4all/">webrtc4all plugin</a>.
You must <a href="#.init">initialize</a> the engine before calling this function.
@static
@returns {String} Version name (e.g. '1.12.756')
@throws {ERR_NOT_INITIALIZED} <font color="red">ERR_NOT_INITIALIZED</font> if the engine is not <a href="#.init">initialized</a>.
*/
SIPml.getWebRtc4AllVersion = function () {
    if (!SIPml.isInitialized()) {
        throw new Error("ERR_NOT_INITIALIZED: Engine not initialized yet. Please call 'SIPml.init()' first");
    }
    return SIPml.s_webrtc4all_version;
};

/**
Gets the web browser version (e.g. <i>'1.5.beta'</i>).
You must <a href="#.init">initialize</a> the engine before calling this function.
@static
@returns {String} The the web browser version.
@throws {ERR_NOT_INITIALIZED} <font color="red">ERR_NOT_INITIALIZED</font> if the engine is not <a href="#.init">initialized</a>.
*/
SIPml.getNavigatorVersion = function () {
    if (!SIPml.isInitialized()) {
        throw new Error("ERR_NOT_INITIALIZED: Engine not initialized yet. Please call 'SIPml.init()' first");
    }
    return SIPml.s_navigator_version;
};

/**
Gets the web browser friendly name (e.g. <i>'chrome'</i>, <i>'firefox'</i>, <i>'safari'</i>, <i>'opera'</i>, <i>'ie'</i> or <i>'netscape'</i>).
You must <a href="#.init">initialize</a> the engine before calling this function.
@static
@returns {String} The web browser friendly name.
@throws {ERR_NOT_INITIALIZED} <font color="red">ERR_NOT_INITIALIZED</font> if the engine is not <a href="#.init">initialized</a>.
*/
SIPml.getNavigatorFriendlyName = function () {
    if (!SIPml.isInitialized()) {
        throw new Error("ERR_NOT_INITIALIZED: Engine not initialized yet. Please call 'SIPml.init()' first");
    }
    return SIPml.s_navigator_friendly_name;
};

/**
Gets the Operating System friendly name (e.g. <i>'windows'</i>, <i>'mac'</i>, <i>'lunix'</i>, <i>'solaris'</i>, <i>'sunos'</i> or <i>'powerpc'</i>).
You must <a href="#.init">initialize</a> the engine before calling this function.
@static
@returns {String} The Operating System friendly name.
@throws {ERR_NOT_INITIALIZED} <font color="red">ERR_NOT_INITIALIZED</font> if the engine is not <a href="#.init">initialized</a>.
*/
SIPml.getSystemFriendlyName = function () {
    if (!SIPml.isInitialized()) {
        throw new Error("ERR_NOT_INITIALIZED: Engine not initialized yet. Please call 'SIPml.init()' first");
    }
    return SIPml.s_system_friendly_name;
};

/**
Checks whether the web browser supports WebRTC but is outdated.
You must <a href="#.init">initialize</a> the engine before calling this function.
@static
@returns {Boolean} <i>true</i> if outdated; otherwise <i>false</i>
@throws {ERR_NOT_INITIALIZED} <font color="red">ERR_NOT_INITIALIZED</font> if the engine is not <a href="#.init">initialized</a>.
*/
SIPml.isNavigatorOutdated = function () {
    if (!SIPml.isInitialized()) {
        throw new Error("ERR_NOT_INITIALIZED: Engine not initialized yet. Please call 'SIPml.init()' first");
    }
    return SIPml.b_navigator_outdated;
}

/**
Checks whether the <a href="http://code.google.com/p/webrtc4all/">webrtc4all plugin</a> is outdated or not.
You must <a href="#.init">initialize</a> the engine before calling this function.
@static
@returns {Boolean} <i>true</i> if outdated; otherwise <i>false</i>
@throws {ERR_NOT_INITIALIZED} <font color="red">ERR_NOT_INITIALIZED</font> if the engine is not <a href="#.init">initialized</a>.
*/
SIPml.isWebRtc4AllPluginOutdated = function () {
    if (!SIPml.isInitialized()) {
        throw new Error("ERR_NOT_INITIALIZED: Engine not initialized yet. Please call 'SIPml.init()' first");
    }
    return SIPml.b_webrtc4all_plugin_outdated;
}

/**
Checks whether the <a href="http://code.google.com/p/webrtc4all/">webrtc4all plugin</a> is installed or not.
You must <a href="#.init">initialize</a> the engine before calling this function.
@static
@returns {Boolean} <i>true</i> if supported; otherwise <i>false</i>
@throws {ERR_NOT_INITIALIZED} <font color="red">ERR_NOT_INITIALIZED</font> if the engine is not <a href="#.init">initialized</a>.
*/
SIPml.isWebRtc4AllSupported = function () {
    if (!SIPml.isInitialized()) {
        throw new Error("ERR_NOT_INITIALIZED: Engine not initialized yet. Please call 'SIPml.init()' first");
    }
    return SIPml.b_webrtc4all_supported;
}

/**
Checks whether Screen share is supported on this browser.
You must <a href="#.init">initialize</a> the engine before calling this function.
@since version 1.3.203
@static
@returns {Boolean} <i>true</i> if supported; otherwise <i>false</i>
@throws {ERR_NOT_INITIALIZED} <font color="red">ERR_NOT_INITIALIZED</font> if the engine is not <a href="#.init">initialized</a>.
*/
SIPml.isScreenShareSupported = function () {
    if (!SIPml.isInitialized()) {
        throw new Error("ERR_NOT_INITIALIZED: Engine not initialized yet. Please call 'SIPml.init()' first");
    }
    return (SIPml.getWebRtcType() === "w4a") || (navigator.userAgent.match('Chrome') && parseInt(navigator.userAgent.match(/Chrome\/(.*) /)[1]) >= 26);
}

/**
Checks whether WebRTC is supported or not.
You must <a href="#.init">initialize</a> the engine before calling this function.
@static
@returns {Boolean} <i>true</i> if supported; otherwise <i>false</i>
@throws {ERR_NOT_INITIALIZED} <font color="red">ERR_NOT_INITIALIZED</font> if the engine is not <a href="#.init">initialized</a>.
*/
SIPml.isWebRtcSupported = function () {
    if (!SIPml.isInitialized()) {
        throw new Error("ERR_NOT_INITIALIZED: Engine not initialized yet. Please call 'SIPml.init()' first");
    }
    return SIPml.b_webrtc_supported;
}

/**
Checks whether WebSocket is supported or not.
@static
@returns {Boolean} <i>true</i> if supported; otherwise <i>false</i>
*/
SIPml.isWebSocketSupported = function () {
    return tsk_utils_have_websocket();
}

/**
Checks whether <a href="https://developer.mozilla.org/en-US/docs/WebRTC/navigator.getUserMedia">getUserMedia</a> is supported or not. The engined must be initialized before calling this function.
@static
@returns {Boolean} <i>true</i> if <a href="https://developer.mozilla.org/en-US/docs/WebRTC/navigator.getUserMedia">getUserMedia</a> is supported; otherwise <i>false</i>
*/
SIPml.haveMediaStream = function () {
    if (!SIPml.isInitialized()) {
        throw new Error("ERR_NOT_INITIALIZED: Engine not initialized yet. Please call 'SIPml.init()' first");
    }
    return SIPml.b_have_media_stream;
}

/**
Checks whether the engine is ready to make/receive calls or not. <br />
The engine is ready when:
    <ul>
        <li>engine is <a href="#.init">initialized</a></li>
        <li>webrtc is supported</li>
        <li>we got a valid media stream (from <a href="https://developer.mozilla.org/en-US/docs/WebRTC/navigator.getUserMedia">getUserMedia</a>)</li>
    </ul>
@static
@returns {Boolean} <i>true</i> if the engine is ready; otherwise <i>false</i>
@throws {ERR_NOT_INITIALIZED} <font color="red">ERR_NOT_INITIALIZED</font> if the engine is not <a href="#.init">initialized</a>.
*/
SIPml.isReady = function () {
    return (SIPml.isInitialized() && SIPml.isWebRtcSupported() && SIPml.haveMediaStream());
}

/**
Checks whether the engine is initialized or not. To initialize the stack you must call <a href="#.init">init()</a> function.
@static
@returns {Boolean} <i>true</i> if the engine is initialized; otherwise <i>false</i>
*/
SIPml.isInitialized = function () { return SIPml.b_initialized; }


/**
Initialize the engine. <b>You must call this function before any other.</b>.
@param {CallbackFunction} [readyCallback] Optional callback function to call when the stack finish initializing and become ready.
@param {CallbackFunction} [errorCallback] Optional callback function to call when initialization fails.

@example
SIPml.init(function(e){ console.info('engine is ready'); }, function(e){ console.info('Error: ' + e.message); });
@static
*/
SIPml.init = function (successCallback, errorCallback) {
    if (!SIPml.b_initialized && !SIPml.b_initializing) {
        SIPml.b_initializing = true;
        tsk_utils_init_webrtc();

        tsk_utils_log_info('User-Agent=' + (navigator.userAgent || "unknown"));

        SIPml.b_have_media_stream = tsk_utils_have_stream();
        SIPml.b_webrtc_supported = tsk_utils_have_webrtc();
        SIPml.b_webrtc4all_supported = tsk_utils_have_webrtc4all();
        SIPml.s_webrtc4all_version = tsk_utils_webrtc4all_get_version();
        SIPml.s_navigator_friendly_name = tsk_utils_get_navigator_friendly_name();
        SIPml.s_system_friendly_name = tsk_utils_get_system_friendly_name();

        // prints whether WebSocket is supported
        tsk_utils_log_info("WebSocket supported = " + (SIPml.isWebSocketSupported() ? "yes" : "no"));

        // check webrtc4all version
        if (tsk_utils_have_webrtc4all()) {
            tsk_utils_log_info("WebRTC type = " + WebRtc4all_GetType() + " version = " + tsk_utils_webrtc4all_get_version());
            if (SIPml.s_webrtc4all_version != '1.35.981') {
                SIPml.b_webrtc4all_plugin_outdated = true;
            }
        }

        // prints navigator friendly name
        tsk_utils_log_info("Navigator friendly name = " + SIPml.s_navigator_friendly_name);

        // gets navigator version
        if (SIPml.s_navigator_friendly_name == 'ie') {
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(navigator.userAgent) != null) {
                SIPml.s_navigator_version = RegExp.$1;
            }
        }

        // prints OS friendly name
        tsk_utils_log_info("OS friendly name = " + SIPml.s_system_friendly_name);
        // prints support for WebRTC (native or plugin)
        tsk_utils_log_info("Have WebRTC = " + (tsk_utils_have_webrtc() ? "yes" : "false"));
        // prints support for getUserMedia
        tsk_utils_log_info("Have GUM = " + (tsk_utils_have_stream() ? "yes" : "false"));

        // checks for WebRTC support
        if (!tsk_utils_have_webrtc()) {
            // is it chrome?
            if (SIPml.s_navigator_friendly_name == "chrome") {
                SIPml.b_navigator_outdated = true;
                return;
            }

            // for now the plugins (WebRTC4all only works on Windows)
            if (SIPml.s_system_friendly_name == 'win' || SIPml.s_system_friendly_name == 'windows') {
                // Internet explorer
                if (SIPml.s_navigator_friendly_name == 'ie') {
                    // Check for IE version 
                    var rv = -1;
                    var ua = navigator.userAgent;
                    var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                    if (re.exec(ua) != null) {
                        rv = parseFloat(RegExp.$1);
                    }
                    if (rv < 9.0) {
                        SIPml.b_navigator_outdated = true;
                        return;
                    }

                    // break page loading ('window.location' won't stop JS execution)
                    if (!tsk_utils_have_webrtc4all()) {
                        return;
                    }
                }
            }
        }

        if (SIPml.b_webrtc_supported && SIPml.b_have_media_stream) {
            SIPml.b_initialized = true;
            SIPml.b_initializing = false;
            tsk_utils_log_info("Engine initialized");
            if (successCallback) {
                successCallback({});
            }
        }
        else {
            if (errorCallback) {
                var s_description = !SIPml.b_webrtc_supported ? "WebRTC not supported" : (!SIPml.b_have_media_stream ? "getUserMedia not supported" : "Internal error");
                errorCallback({ description: s_description });
            }
        }
    }
}

// ================================== SIPml.EventTarget ==========================================

/**
@constructor
Defines an event target. You sould never create an event target object.
*/
SIPml.EventTarget = function () {
    this.ao_listeners = [];
}

/**
Adds an event listener to the target object. <br /><br />
<table border="1">
    <tr>
        <td><b>Target classes<b></td>
        <td><b>Supported event types<b></td>
        <td><b>Raised event object<b></td>
        <td><b>Remarques<b></td>
    </tr>
    <tr>
        <td><a href="SIPml.Stack.html" name="SIPml.EventTarget.Stack">SIPml.Stack</a></td>
        <td>
            <b>*</b><br/> starting<br/> started<br/> stopping<br/> stopped<br/> failed_to_start<br/> failed_to_stop<br/> i_new_call<br /> i_new_message<br />
            m_permission_requested<br/> m_permission_accepted<br/> m_permission_refused
        </td>
        <td><a href="SIPml.Stack.Event.html">SIPml.Stack.Event</a></td>
        <td>'*' is used to listen for all events</td>
    </tr>
    <tr>
        <td>
            <a href="SIPml.Session.html" name="SIPml.EventTarget.Session">SIPml.Session</a>
            <ul>
                <li><a href="SIPml.Session.Call.html">SIPml.Session.Call</a></li>
                <li><a href="SIPml.Session.Message.html">SIPml.Session.Message</a></li>
                <li><a href="SIPml.Session.Message.html">SIPml.Session.Registration</a></li>
                <li><a href="SIPml.Session.Message.html">SIPml.Session.Subscribe</a></li>
                <li><a href="SIPml.Session.Message.html">SIPml.Session.Publish</a></li>
            <ul>
        </td>
        <td><b>*</b><br/> connecting<br /> connected<br />  terminating<br /> terminated<br />
                i_ao_request<br />
                media_added<br/> media_removed<br/>
                i_request<br/> o_request<br/> cancelled_request<br/> sent_request<br/>
                transport_error<br/> global_error<br/> message_error<br/> webrtc_error
        </td>
        <td><a href="SIPml.Session.Event.html">SIPml.Session.Event</a></td>
        <td>'*' is used to listen for all events<br /></td>
    </tr>
    <tr>
        <td><a href="SIPml.Session.Call.html" name="SIPml.EventTarget.Session.Call">SIPml.Session.Call</a></td>
        <td>
            m_early_media<br/> m_local_hold_ok<br/> m_local_hold_nok<br/> m_local_resume_ok<br/> m_local_resume_nok<br/> m_remote_hold<br/> m_remote_resume<br/>
            m_stream_video_local_added<br /> m_stream_video_local_removed<br/> m_stream_video_remote_added<br/> m_stream_video_remote_removed <br />
            m_stream_audio_local_added<br /> m_stream_audio_local_removed<br/> m_stream_audio_remote_added<br/> m_stream_audio_remote_removed <br />
            i_ect_new_call<br/> o_ect_trying<br/> o_ect_accepted<br/> o_ect_completed<br/> i_ect_completed<br/> o_ect_failed<br/> i_ect_failed<br/> o_ect_notify<br/> i_ect_notify<br/> i_ect_requested <br />
            m_bfcp_info<br />
            i_info
        </td>
        <td><a href="SIPml.Session.Event.html">SIPml.Session.Event</a></td>
        <td>borrows all events supported by <a href="SIPml.Session.html">SIPml.Session</a></td>
    </tr>
    <tr>
        <td><a href="SIPml.Session.Subscribe.html" name="SIPml.EventTarget.Session.Subscribe">SIPml.Session.Subscribe</a></td>
        <td>
            i_notify
        </td>
        <td><a href="SIPml.Session.Event.html">SIPml.Session.Event</a></td>
        <td>borrows all events supported by <a href="SIPml.Session.html">SIPml.Session</a></td>
    </tr>
</table>
@param {String|Array} type The event type/identifier. Must not be null or empty. Use <b>'*'</b> to listen for all events.
@param {function} listener The object that receives a notification when an event of the specified type occurs. This must be an object implementing the <a href="http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventListener">EventListener</a> interface, or simply a JavaScript function.
@example
// listen for a single event
this.addEventListener('started', function(e){
    console.info("'started' event fired");
});
// or listen for two or more events
this.addEventListener(['started', 'stopped'], function(e){
    console.info("'"+e.type+"' event fired");
});
// or listen for all events
this.addEventListener('*', function(e){
    console.info("'"+e.type+"' event fired");
});
@see <a href="#removeEventListener">removeEventListener</a>
@throws {ERR_INVALID_PARAMETER_VALUE|ERR_INVALID_PARAMETER_TYPE} <font color="red">ERR_INVALID_PARAMETER_VALUE</font> | <font color="red">ERR_INVALID_PARAMETER_TYPE</font>
*/
SIPml.EventTarget.prototype.addEventListener = function (o_type, o_listener) {
    if (!o_listener) {
        throw new Error("ERR_INVALID_PARAMETER_VALUE: 'listener' must not be null");
    }
    if (!o_type) {
        throw new Error("ERR_INVALID_PARAMETER_VALUE: 'type' must not be null");
    }
    if (!(o_type instanceof String || typeof o_type == "string" || o_type instanceof Array)) {
        throw new Error("ERR_INVALID_PARAMETER_TYPE: 'type' must be a string or array");
    }

    if (o_type instanceof Array) {
        var This = this;
        o_type.forEach(function (s_type) {
            if (!tsk_string_is_null_or_empty(s_type) && tsk_string_is_string(s_type)) {
                This.ao_listeners[s_type] = o_listener;
            }
        });
    }
    else {
        this.ao_listeners[o_type] = o_listener;
    }
}

/**
Removes an event listener from the target object.
@param {String} type The event type/identifier to stop listening for.
@see <a href="#addEventListener">addEventListener</a>
@exemple
this.removeEventListener('started');
*/
SIPml.EventTarget.prototype.removeEventListener = function (s_type) {
    if (tsk_string_is_string(s_type) && !tsk_string_is_null_or_empty(s_type)) {
        this.ao_listeners[s_type] = undefined;
    }
}

/**
@ignore
@private
@param {Object} event
*/
SIPml.EventTarget.prototype.dispatchEvent = function (o_event) {
    var o_listener = (this.ao_listeners[o_event.s_type] || this.ao_listeners['*']);
    if (o_listener) {
        o_listener.call(this, o_event.o_value);
    }
}



// ================================== SIPml.Event ==========================================


/** 
SIP  event object. You should never create an instance of this class by yourself.
@constructor
@param {String} type The event type or identifier. Please check <a href="SIPml.EventTarget.html#SIPml.EventTarget.Session">this link</a> for more information about all supported session event types.
@param {tsip_event} [event] Private wrapped session object.
@property {String} type The event <a href="SIPml.EventTarget.html#SIPml.EventTarget.Session">type or identifier</a> (e.g. <i>'connected'</i>).
@property {String} description User-friendly description in english (e.g. <i>'Session is now connected'</i>).
*/
SIPml.Event = function (s_type, o_event) {
    this.type = s_type;
    this.description = o_event ? o_event.s_phrase : s_type;
    this.o_event = o_event;
}

/**
Gets the SIP response code.
@returns {Integer} The SIP response code (e.g. 404).
*/
SIPml.Event.prototype.getSipResponseCode = function () {
    var o_message = this.o_event ? this.o_event.get_message() : null;
    if (o_message && o_message.is_response()) {
        return o_message.get_response_code();
    }
    return -1;
}

/**
Gets the SIP content associated to this event. This function could be called to get the content of the incoming SIP message ('i_new_message' event).
@returns {Object} SIP content.
@see <a href="#getContentType">getContentType</a>, <a href="#getContentString">getContentString</a>
*/
SIPml.Event.prototype.getContent = function () {
    var o_message = this.o_event ? this.o_event.get_message() : null;
    if (o_message) {
        return o_message.get_content();
    }
    return null;
}

/**
Gets the SIP content associated to this event. This function could be called to get the content of the incoming SIP message ('i_new_message' event).
@returns {String} SIP content.
@see <a href="#getContentType">getContentType</a>, <a href="#getContent">getContent</a>
*/
SIPml.Event.prototype.getContentString = function () {
    var o_message = this.o_event ? this.o_event.get_message() : null;
    if (o_message) {
        return o_message.get_content_as_string();
    }
    return null;
}

/**
Gets the SIP content-type associated to this event. This function could be called to get the content-type of the incoming SIP message ('i_new_message' event).
@returns {Object} SIP content-type.
@see <a href="#getContent">getContent</a>
*/
SIPml.Event.prototype.getContentType = function () {
    var o_message = this.o_event ? this.o_event.get_message() : null;
    if (o_message) {
        return o_message.get_content_type();
    }
    return null;
}



// ================================== SIPml.Stack ==========================================


/**
Anonymous SIP Stack configuration object.
@namespace SIPml.Stack.Configuration
@name SIPml.Stack.Configuration
@property {String} realm The domain name. Required for stack <a href="SIPml.Stack.html#constructor">constructor</a> but optional when used with <a href="SIPml.Stack.html#setConfiguration">setConfiguration</a>. <br />
Example: <i>example.org</i>
@property {String} impi The authentication name. Required for stack <a href="SIPml.Stack.html#constructor">constructor</a> but optional when used with <a href="SIPml.Stack.html#setConfiguration">setConfiguration</a>.<br />
Example: <i>+33600000000</i> or <i>bob</i>.
@property {string} impu The full SIP uri address. Required for stack <a href="SIPml.Stack.html#constructor">constructor</a> but optional when used with <a href="SIPml.Stack.html#setConfiguration">setConfiguration</a>.<br />
Example: <i>sip:+33600000000@example.com</i> or <i>tel:+33600000000</i> or <i>sip:bob@example.com</i>
@property {String} [password] The password to use for SIP authentication.<br />
Example: <i>mysecret</i>
@property {String} [display_name] The display name to use in SIP requests. This is the String displayed by the called party for incoming calls. <br />
Example: <i>I Am Legend</i>
@property {String} [websocket_proxy_url] The websocket proxy url to connect to (SIP server or gateway address). If unset the stack will use sipml5.org as host and a random port. You should not set this value unless you know what you're doing.<br />
Example: <i>ws://sipml5.org:5060</i>
@property {String} [outbound_proxy_url] The outbound Proxy URL is used to set the destination IP address and Port to use for all outgoing requests regardless the <i>domain name</i> (a.k.a <i>realm</i>). <br />
This is a good option for developers using a SIP domain name without valid DNS A/NAPTR/SRV records. You should not set this value unless you know what you're doing. <br />
Example: <i>udp://192.168.0.12:5060</i>
@property {Array} [ice_servers] The list of the STUN/TURN servers to use. The format must be as explained at <a target=_blank href="http://www.w3.org/TR/webrtc/#rtciceserver-type">http://www.w3.org/TR/webrtc/#rtciceserver-type</a>. <br />
To disable TURN/STUN to speedup ICE candidates gathering you can use an empty array. e.g. <i>[]</i>. <br />
Example: <i>[{ url: 'stun:stun.l.google.com:19302'}, { url:'turn:user@numb.viagenie.ca', credential:'myPassword'}]</i>
@property {Object} [bandwidth] Defines the maximum audio and video bandwidth to use. This will change the outhoing SDP to include a "b:AS=" attribute. Use <i>0</i> to let the browser negotiates the right value using RTCP-REMB and congestion control. Same property could be used at session level to override this value.<br />
<i>Available since version 1.3.203</i>. <br />
Example: <i>{ audio:64, video:512 }</i>
@property {Object} [video_size] Defines the maximum and minimum video size to be used. All values are optional. The browser will try to find the best video size between <i>max</i> and <i>min</i> based on the camera capabilities. Same property could be used at session level to override this value.<br />
<i>Available since version 1.3.203</i>. <br />
Example: <i>{ minWidth:640, minHeight:480, maxWidth:1920, maxHeight:1080 }</i>
@property {Boolean} [enable_rtcweb_breaker] Whether to enable the <a href="http://webrtc2sip.org/#aRTCWebBreaker" target=_blank>RTCWeb Breaker</a> module to allow calling SIP-legacy networks. <br />
Example: <i>true</i>
@property {Boolean} [enable_click2call] Whether to enable the <a href="http://click2dial.org" target=_blank>Click2Call / Click2Dial</a> service.
<i>Available since version 1.2.181</i>. <br />
Example: <i>true</i>
@property {Boolean} [enable_early_ims] Whether to enable 3GGP Early IMS as per <a href="http://www.arib.or.jp/english/html/overview/doc/STD-T63v9_60/5_Appendix/Rel6/33/33978-660.pdf" target=_blank>TR 33.978</a>. Should be 'true' unless you're using a real IMS network. <br />
<i>Available since version 1.3.203</i>. <br />
Example: <i>true</i>
@property {Boolean} [enable_media_stream_cache] Whether to reuse the same media stream for all calls. If your website is <b>not using https</b> then, the browser will request access to the camera (or microphone) every time you try to make a call. Caching the media stream will avoid getting these notifications for each call. <br />
<i>Available since version 1.3.203</i>. <br />
Example: <i>true</i>

@property {Object} [events_listener] Object to subscribe to some events.
Example:
<ul>
    <li><i>{ events: '*', listener: function(e){} }</i> </li>
    <li><i>{ events: 'started', listener: function(e){} }</i></li>
    <li><i>{ events: ['started', 'stopped'], listener: function(e){} }</i></li>
</ul>
You can also use <a href="#addEventListener">addEventListener</a> to add listeners to the stack.
@property {Array} [sip_headers] Stack-level SIP headers to add to all outgoing requests. Each header is an object with a <i>name</i> and <i>value</i> fields. <br />
Example: <i>sip_headers: [{name: 'User-Agent', value: 'IM-client/OMA1.0 sipML5-v1.0.89.0'}, {name: 'Organization', value: 'Doubango Telecom'}]</i>

@example
var configuration = {
        realm: 'example.org',
        impi: 'bob',
        impu: 'sip:bob@example.org',
        password: 'mysecret', // optional
        display_name: 'I Am Legend', // optional
        websocket_proxy_url: 'ws://192.168.0.10:5060', // optional
        outbound_proxy_url: 'udp://192.168.0.12:5060', // optional
        ice_servers: [{ url: 'stun:stun.l.google.com:19302'}, { url:'turn:user@numb.viagenie.ca', credential:'myPassword'}], // optional
        enable_rtcweb_breaker: true, // optional
        enable_click2call: false, // optional
        enable_early_ims: true, // optional
        events_listener: { events: '*', listener: listenerFunc }, // optional
        sip_headers: [ //optional
            {name: 'User-Agent', value: 'IM-client/OMA1.0 sipML5-v1.0.89.0'}, 
            {name: 'Organization', value: 'Doubango Telecom'}
        ]
    };
*/


/**
This is the root object used by any other object to make/receive calls, messages or manage presence.
You have to create an instance of this class before anything else.
@extends SIPml.EventTarget
@constructor
@class
@param {SIPml.Stack.Configuration} configuration Configuration object. Could be updated later using <a href="#setConfiguration">setConfiguration</a>.
@throws {ERR_INVALID_PARAMETER_VALUE|ERR_INVALID_PARAMETER_TYPE} <font color="red">ERR_INVALID_PARAMETER_VALUE</font> | <font color="red">ERR_INVALID_PARAMETER_TYPE</font>
@example
var listenerFunc = function(e){
    console.info('stack event = ' + e.type);
    // Please check <a href="SIPml.EventTarget.html#SIPml.EventTarget.Stack">this link</a> for more information on all supported events.
}

var o_stack = new SIPml.Stack({
        realm: 'example.org',
        impi: 'bob',
        impu: 'sip:bob@example.org',
        password: 'mysecret', // optional
        display_name: 'I Am Legend', // optional
        websocket_proxy_url: 'ws://192.168.0.10:5060', // optional
        outbound_proxy_url: 'udp://192.168.0.12:5060', // optional
        ice_servers: [{ url: 'stun:stun.l.google.com:19302'}, { url:'turn:user@numb.viagenie.ca', credential:'myPassword'}], // optional
        bandwidth: { audio:64, video:512 }, // optional
        video_size: { minWidth:640, minHeight:480, maxWidth:1920, maxHeight:1080 }, // optional
        enable_rtcweb_breaker: true, // optional
        enable_click2call: false, // optional
        events_listener: { events: '*', listener: listenerFunc }, //optional
        sip_headers: [ //optional
            {name: 'User-Agent', value: 'IM-client/OMA1.0 sipML5-v1.0.89.0'}, 
            {name: 'Organization', value: 'Doubango Telecom'}
        ]
    }
);

@see <a href="#setConfiguration">setConfiguration</a>
*/
SIPml.Stack = function (o_conf) {
    SIPml.init();
    SIPml.EventTarget.call(this);
    /*
    members:
    - o_stack {tsip_stack}
    */

    if (!o_conf) {
        throw new Error("ERR_INVALID_PARAMETER_VALUE: null configuration value");
    }
    if (tsk_string_is_null_or_empty(o_conf.realm)) {
        throw new Error("ERR_INVALID_PARAMETER_VALUE: '" + o_conf.realm + "' is not valid as realm value");
    }
    if (tsk_string_is_null_or_empty(o_conf.impi)) {
        throw new Error("ERR_INVALID_PARAMETER_VALUE: '" + o_conf.impi + "' is not valid as impi value");
    }
    if (tsk_string_is_null_or_empty(o_conf.impu)) {
        throw new Error("ERR_INVALID_PARAMETER_VALUE: '" + o_conf.impu + "' is not valid as impu value");
    }
    // check IMPU validity
    var o_impu = tsip_uri.prototype.Parse(o_conf.impu);
    if (!o_impu || !o_impu.s_user_name || !o_impu.s_host) {
        throw new Error("ERR_INVALID_PARAMETER_VALUE: '" + o_conf.impu + "' is not valid as SIP Uri");
    }

    var i_port;
    var s_proxy;

    if (!SIPml.isWebSocketSupported()) {
        // port and host will be updated using the result from DNS SRV(NAPTR(realm))
        i_port = 5060;
        s_proxy = o_conf.realm;
    }
    else {
        // there are at least 5 servers running on the cloud.
        // we will connect to one of them and let the balancer to choose the right one (less connected sockets)
        // each port can accept up to 65K connections which means that the cloud can manage 325K active connections
        // the number of port will be increased or decreased based on the current trafic

        // webrtc2sip 2.2+ (Doubango): 
        //      WS: 10060, 11060, 12060, 13060, 14060
        //      WSS: 10062, 11062, 12062, 13062, 14062
        //

        i_port = ((o_conf.enable_rtcweb_breaker || (window.location && window.location.protocol == "https:")) ? 10062 : 10060) + (((new Date().getTime()) % 5) * 1000);
        s_proxy = "ns313841.ovh.net";
    }

    // create the stack
    this.o_stack = new tsip_stack(o_conf.realm, o_conf.impi, o_conf.impu, s_proxy, i_port);
    this.o_stack.oStack = this;
    // set configurations
    this.setConfiguration(o_conf);

    // listen for stack events
    this.o_stack.on_event_stack = function (e) {
        var s_type;
        switch (e.i_code) {
            case tsip_event_code_e.STACK_STARTING: s_type = 'starting'; break;
            case tsip_event_code_e.STACK_STARTED: s_type = 'started'; break;
            case tsip_event_code_e.STACK_STOPPING: s_type = 'stopping'; break;
            case tsip_event_code_e.STACK_STOPPED: s_type = 'stopped'; break;
            case tsip_event_code_e.STACK_FAILED_TO_START: s_type = 'failed_to_start'; break;
            case tsip_event_code_e.STACK_FAILED_TO_STOP: s_type = 'failed_to_stop'; break;
        }
        if (s_type) {
            e.o_stack.oStack.dispatchEvent({ s_type: s_type, o_value: new SIPml.Stack.Event(s_type, e) });
        }
    }


    // listen for dialog events
    this.o_stack.on_event_dialog = function (e) {
        var s_type = null;
        var i_session_id = e.o_session.i_id;
        var oSession = e.o_session.o_stack.oStack.ao_sessions[i_session_id];
        if (!oSession) {
            tsk_utils_log_warn('Cannot find session with id = ' + i_session_id);
            return;
        }

        switch (e.i_code) {
            case tsip_event_code_e.DIALOG_TRANSPORT_ERROR: s_type = 'transport_error'; break;
            case tsip_event_code_e.DIALOG_GLOBAL_ERROR: s_type = 'global_error'; break;
            case tsip_event_code_e.DIALOG_MESSAGE_ERROR: s_type = 'message_error'; break;
            case tsip_event_code_e.DIALOG_WEBRTC_ERROR: s_type = 'webrtc_error'; break;
            case tsip_event_code_e.DIALOG_REQUEST_INCOMING: s_type = 'i_request'; break;
            case tsip_event_code_e.DIALOG_REQUEST_OUTGOING: s_type = 'o_request'; break;
            case tsip_event_code_e.DIALOG_REQUEST_CANCELLED: s_type = 'cancelled_request'; break;
            case tsip_event_code_e.DIALOG_REQUEST_SENT: s_type = 'sent_request'; break;
            case tsip_event_code_e.DIALOG_MEDIA_ADDED: s_type = 'media_added'; break;
            case tsip_event_code_e.DIALOG_MEDIA_REMOVED: s_type = 'media_removed'; break;
            case tsip_event_code_e.DIALOG_CONNECTING: s_type = 'connecting'; break;
            case tsip_event_code_e.DIALOG_CONNECTED: s_type = 'connected'; break;
            case tsip_event_code_e.DIALOG_BFCP_INFO: s_type = 'bfcp_info'; break;
            case tsip_event_code_e.DIALOG_TERMINATING: s_type = 'terminating'; break;
            case tsip_event_code_e.DIALOG_TERMINATED:
                {
                    s_type = 'terminated';
                    e.o_session.o_stack.oStack.ao_sessions[i_session_id] = undefined;
                    break;
                }
            default: break;
        }

        if (s_type) {
            oSession.dispatchEvent({ s_type: s_type, o_value: new SIPml.Session.Event(oSession, s_type, e) });
        }
    }

    // listen for MESSAGE events
    this.o_stack.on_event_message = function (e) {
        var s_type = null;
        var i_session_id = e.o_session.i_id;
        var oSession = e.o_session.o_stack.oStack.ao_sessions[i_session_id];

        switch (e.e_message_type) {
            case tsip_event_message_type_e.I_MESSAGE: s_type = 'i_new_message'; break;
            case tsip_event_message_type_e.AO_MESSAGE: s_type = 'i_ao_request'; break;
        }

        if (s_type) {
            // 'i_new_call' is stack-level event
            if (s_type == 'i_new_message') {
                var oNewEvent = new SIPml.Stack.Event(s_type, e);
                oNewEvent.newSession = new SIPml.Session.Message(e.o_session);
                e.o_session.o_stack.oStack.ao_sessions[i_session_id] = oNewEvent.newSession; // save session
                e.o_session.o_stack.oStack.dispatchEvent({ s_type: s_type, o_value: oNewEvent });
            }
            else {
                if (oSession) {
                    oSession.dispatchEvent({ s_type: s_type, o_value: new SIPml.Session.Event(oSession, s_type, e) });
                }
                else {
                    tsk_utils_log_warn('Cannot find session with id = ' + i_session_id + ' and event = ' + e.e_invite_type);
                }
            }
        }
    };

    // listen for PUBLISH events
    this.o_stack.on_event_publish = function (e) {
        var s_type = null;
        var i_session_id = e.o_session.i_id;
        var oSession = e.o_session.o_stack.oStack.ao_sessions[i_session_id];
        if (!oSession) {
            tsk_utils_log_warn('Cannot find session with id = ' + i_session_id + ' and event = ' + e.e_invite_type);
            return;
        }

        switch (e.e_publish_type) {
            case tsip_event_publish_type_e.I_PUBLISH: break;
            case tsip_event_publish_type_e.I_UNPUBLISH: break;
            case tsip_event_publish_type_e.AO_PUBLISH:
            case tsip_event_publish_type_e.AO_UNPUBLISH:
                {
                    s_type = 'i_ao_request';
                    break;
                }
        }
        if (s_type) {
            oSession.dispatchEvent({ s_type: s_type, o_value: new SIPml.Session.Event(oSession, s_type, e) });
        }
    }

    // listen for SUBSCRIBE events
    this.o_stack.on_event_subscribe = function (e) {
        var s_type = null;
        var i_session_id = e.o_session.i_id;
        var oSession = e.o_session.o_stack.oStack.ao_sessions[i_session_id];
        if (!oSession) {
            tsk_utils_log_warn('Cannot find session with id = ' + i_session_id + ' and event = ' + e.e_invite_type);
            return;
        }

        switch (e.e_subscribe_type) {
            case tsip_event_subscribe_type_e.I_SUBSCRIBE: break;
            case tsip_event_subscribe_type_e.I_UNSUBSRIBE: break;
            case tsip_event_subscribe_type_e.AO_SUBSCRIBE:
            case tsip_event_subscribe_type_e.AO_UNSUBSCRIBE:
            case tsip_event_subscribe_type_e.AO_NOTIFY:
                {
                    s_type = 'i_ao_request';
                    break;
                }
            case tsip_event_subscribe_type_e.I_NOTIFY:
                {
                    s_type = 'i_notify';
                    break;
                }
        }
        if (s_type) {
            oSession.dispatchEvent({ s_type: s_type, o_value: new SIPml.Session.Event(oSession, s_type, e) });
        }
    }


    // listen for INVITE events
    this.o_stack.on_event_invite = function (e) {
        var s_type = null;
        var i_session_id = e.o_session.i_id;
        var oSession = e.o_session.o_stack.oStack.ao_sessions[i_session_id];
        if (!oSession) {
            switch (e.e_invite_type) {
                case tsip_event_invite_type_e.I_NEW_CALL:
                case tsip_event_invite_type_e.M_STREAM_LOCAL_REQUESTED:
                case tsip_event_invite_type_e.M_STREAM_LOCAL_ACCEPTED:
                case tsip_event_invite_type_e.M_STREAM_LOCAL_REFUSED:
                case tsip_event_invite_type_e.M_BFCP_INFO:
                    break;

                case tsip_event_invite_type_e.M_STREAM_LOCAL_ADDED:
                case tsip_event_invite_type_e.M_STREAM_REMOTE_ADDED:
                case tsip_event_invite_type_e.M_STREAM_LOCAL_REMOVED:
                case tsip_event_invite_type_e.M_STREAM_REMOTE_REMOVED:
                case tsip_event_invite_type_e.I_AO_REQUEST:
                    tsk_utils_log_info('Not notifying to session with id = ' + i_session_id + ' for event = ' + e.e_invite_type);
                    return;

                default:
                    tsk_utils_log_warn('Cannot find session with id = ' + i_session_id + ' and event = ' + e.e_invite_type);
                    return;
            }
        }



        var _setStream = function (o_view, o_stream, b_audio) {
            if (o_view) {
                attachMediaStream(o_view, o_stream);
                return (b_audio && o_stream && o_stream.getAudioTracks().length > 0) || (!b_audio && o_stream && o_stream.getVideoTracks().length > 0);
            }
        }

        var attachStream = function (bLocal) {
            var o_stream = bLocal ? e.o_session.get_stream_local() : e.o_session.get_stream_remote();
            if (_setStream((bLocal ? oSession.videoLocal : oSession.videoRemote), o_stream, false)) {
                dispatchEvent(bLocal ? 'm_stream_video_local_added' : 'm_stream_video_remote_added');
            }
            if (_setStream((bLocal ? oSession.audioLocal : oSession.audioRemote), o_stream, true)) {
                dispatchEvent(bLocal ? 'm_stream_audio_local_added' : 'm_stream_audio_remote_added');
            }
        }
        var deattachStream = function (bLocal) {
            if (_setStream((bLocal ? oSession.videoLocal : oSession.videoRemote), null, false)) {
                dispatchEvent(bLocal ? 'm_stream_video_local_removed' : 'm_stream_video_remote_removed');
            }
            if (_setStream((bLocal ? oSession.audioLocal : oSession.audioRemote), null, true)) {
                dispatchEvent(bLocal ? 'm_stream_audio_local_removed' : 'm_stream_audio_remote_removed');
            }
        }

        var dispatchEvent = function (s_event_type) {
            if (s_event_type) {
                // 'i_new_call', 'm_permission_requested', 'm_permission_accepted' and 'm_permission_refused' are stack-level event
                switch (s_event_type) {
                    case 'i_new_call':
                    case 'm_permission_requested':
                    case 'm_permission_accepted':
                    case 'm_permission_refused':
                        {
                            var oNewEvent = new SIPml.Stack.Event(s_event_type, e);
                            if (s_event_type == 'i_new_call') {
                                oNewEvent.newSession = new SIPml.Session.Call(e.o_session);
                                e.o_session.o_stack.oStack.ao_sessions[i_session_id] = oNewEvent.newSession; // save session
                            }
                            e.o_session.o_stack.oStack.dispatchEvent({ s_type: s_event_type, o_value: oNewEvent });
                            break;
                        }
                    default:
                        {
                            oSession.dispatchEvent({ s_type: s_event_type, o_value: new SIPml.Session.Event(oSession, s_event_type, e) });
                            break;
                        }
                }
            }
        }

        switch (e.e_invite_type) {
            case tsip_event_invite_type_e.I_NEW_CALL: s_type = 'i_new_call'; break;
            case tsip_event_invite_type_e.I_ECT_NEW_CALL: s_type = 'i_ect_new_call'; break;
            case tsip_event_invite_type_e.I_AO_REQUEST: s_type = 'i_ao_request'; break;
            case tsip_event_invite_type_e.M_EARLY_MEDIA: s_type = 'm_early_media'; break;
            case tsip_event_invite_type_e.M_STREAM_LOCAL_REQUESTED: s_type = 'm_permission_requested'; break;
            case tsip_event_invite_type_e.M_STREAM_LOCAL_ACCEPTED: s_type = 'm_permission_accepted'; break;
            case tsip_event_invite_type_e.M_STREAM_LOCAL_REFUSED: s_type = 'm_permission_refused'; break;
            case tsip_event_invite_type_e.M_STREAM_LOCAL_ADDED:
                {
                    return attachStream(true);
                }
            case tsip_event_invite_type_e.M_STREAM_LOCAL_REMOVED:
                {
                    return deattachStream(true);
                }
            case tsip_event_invite_type_e.M_STREAM_REMOTE_ADDED:
                {
                    return attachStream(false);
                }
            case tsip_event_invite_type_e.M_STREAM_REMOTE_REMOVED:
                {
                    return deattachStream(false);
                }
            case tsip_event_invite_type_e.M_LOCAL_HOLD_OK: s_type = 'm_local_hold_ok'; break;
            case tsip_event_invite_type_e.M_LOCAL_HOLD_NOK: s_type = 'm_local_hold_nok'; break;
            case tsip_event_invite_type_e.M_LOCAL_RESUME_OK: s_type = 'm_local_resume_ok'; break;
            case tsip_event_invite_type_e.M_LOCAL_RESUME_NOK: s_type = 'm_local_resume_nok'; break;
            case tsip_event_invite_type_e.M_REMOTE_HOLD: s_type = 'm_remote_hold'; break;
            case tsip_event_invite_type_e.M_REMOTE_RESUME: s_type = 'm_remote_resume'; break;
            case tsip_event_invite_type_e.M_BFCP_INFO: s_type = 'm_bfcp_info'; break;
            case tsip_event_invite_type_e.O_ECT_TRYING: s_type = 'o_ect_trying'; break;
            case tsip_event_invite_type_e.O_ECT_ACCEPTED: s_type = 'o_ect_accepted'; break;
            case tsip_event_invite_type_e.O_ECT_COMPLETED: s_type = 'o_ect_completed'; break;
            case tsip_event_invite_type_e.I_ECT_COMPLETED: s_type = 'i_ect_completed'; break;
            case tsip_event_invite_type_e.O_ECT_FAILED: s_type = 'o_ect_failed'; break;
            case tsip_event_invite_type_e.I_ECT_FAILED: s_type = 'i_ect_failed'; break;
            case tsip_event_invite_type_e.O_ECT_NOTIFY: s_type = 'o_ect_notify'; break;
            case tsip_event_invite_type_e.I_ECT_NOTIFY: s_type = 'i_ect_notify'; break;
            case tsip_event_invite_type_e.I_ECT_REQUESTED: s_type = 'i_ect_requested'; break;
            case tsip_event_invite_type_e.DIALOG_REQUEST_INCOMING:
                {
                    if (e.o_message) {
                        if (e.o_message.is_info()) { s_type = 'i_info'; }
                    }
                    break;
                }
            default: break;
        }

        // dispatch event
        dispatchEvent(s_type);
    }
}

SIPml.Stack.prototype = Object.create(SIPml.EventTarget.prototype);
SIPml.Stack.prototype.ao_sessions = [];

/**
Updates configuration values.
@param {SIPml.Stack.Configuration} configuration Configuration object value.
@returns {Integer} 0 if successful; otherwise nonzero
@example
// add two new headers and change the <i>proxy_url</i>
o_stack.setConfiguration({
    proxy_url: 'ws://192.168.0.10:5060',
    sip_headers: [
            {name: 'User-Agent', value: 'IM-client/OMA1.0 sipML5-v1.0.89.0'}, 
            {name: 'Organization', value: 'Doubango Telecom'}
        ]
    }
);
*/
SIPml.Stack.prototype.setConfiguration = function (o_conf) {
    if (o_conf.realm && !tsk_string_is_string(o_conf.realm)) {
        throw new Error("ERR_INVALID_PARAMETER_TYPE: '" + typeof o_conf.realm + "' not a valid type for realm. String is expected");
    }
    if (o_conf.impi && !tsk_string_is_string(o_conf.impi)) {
        throw new Error("ERR_INVALID_PARAMETER_TYPE: '" + typeof o_conf.impi + "' not a valid type for impi. String is expected");
    }
    if (o_conf.impu && !tsk_string_is_string(o_conf.impu)) {
        throw new Error("ERR_INVALID_PARAMETER_TYPE: '" + typeof o_conf.impu + "' not a valid type for impu. String is expected");
    }
    if (o_conf.password && !tsk_string_is_string(o_conf.password)) {
        throw new Error("ERR_INVALID_PARAMETER_TYPE: '" + typeof o_conf.password + "' not a valid type for password. String is expected");
    }
    if (o_conf.display_name && !tsk_string_is_string(o_conf.display_name)) {
        throw new Error("ERR_INVALID_PARAMETER_TYPE: '" + typeof o_conf.display_name + "' not a valid type for display_name. String is expected");
    }
    if (o_conf.websocket_proxy_url && !tsk_string_is_string(o_conf.websocket_proxy_url)) {
        throw new Error("ERR_INVALID_PARAMETER_TYPE: '" + typeof o_conf.websocket_proxy_url + "' not a valid type for websocket_proxy_url. String is expected");
    }
    if (o_conf.outbound_proxy_url && !tsk_string_is_string(o_conf.outbound_proxy_url)) {
        throw new Error("ERR_INVALID_PARAMETER_TYPE: '" + typeof o_conf.outbound_proxy_url + "' not a valid type for outbound_proxy_url. String is expected");
    }
    if (o_conf.sip_headers && typeof o_conf.sip_headers != "Array" && !(o_conf.sip_headers instanceof Array)) {
        throw new Error("ERR_INVALID_PARAMETER_TYPE: '" + typeof o_conf.sip_headers + "' not a valid type for sip_headers. Array is expected");
    }

    // event-listener: must be first to be defined as other configs could raise events
    if (o_conf.events_listener) {
        this.addEventListener(o_conf.events_listener.events, o_conf.events_listener.listener);
    }

    var b_rtcweb_breaker_enabled = !!o_conf.enable_rtcweb_breaker;
    var b_click2call_enabled = !!o_conf.enable_click2call;
    var b_early_ims = (o_conf.enable_early_ims == undefined) ? true : !!o_conf.enable_early_ims; // default value is true
    var b_enable_media_stream_cache = !!o_conf.enable_media_stream_cache;
    var o_bandwidth = o_conf.bandwidth ? o_conf.bandwidth : { audio: undefined, video: undefined };
    var o_video_size = o_conf.video_size ? o_conf.video_size : { minWidth: undefined, minHeight: undefined, maxWidth: undefined, maxHeight: undefined };
    var o_stack = this.o_stack;
    tsk_utils_log_info("s_websocket_server_url=" + (o_conf.websocket_proxy_url || "(null)"));
    tsk_utils_log_info("s_sip_outboundproxy_url=" + (o_conf.outbound_proxy_url || "(null)"));
    tsk_utils_log_info("b_rtcweb_breaker_enabled=" + (b_rtcweb_breaker_enabled ? "yes" : "no"));
    tsk_utils_log_info("b_click2call_enabled=" + (b_click2call_enabled ? "yes" : "no"));
    tsk_utils_log_info("b_early_ims=" + (b_early_ims ? "yes" : "no"));
    tsk_utils_log_info("b_enable_media_stream_cache=" + (b_enable_media_stream_cache ? "yes" : "no"));
    tsk_utils_log_info("o_bandwidth=" + JSON.stringify(o_bandwidth));
    tsk_utils_log_info("o_video_size=" + JSON.stringify(o_video_size));

    o_stack.set(tsip_stack.prototype.SetPassword(o_conf.password),
                     tsip_stack.prototype.SetDisplayName(o_conf.display_name),
                     tsip_stack.prototype.SetProxyOutBoundUrl(o_conf.outbound_proxy_url),
                     tsip_stack.prototype.SetRTCWebBreakerEnabled(b_rtcweb_breaker_enabled),
                     tsip_stack.prototype.SetClick2CallEnabled(b_click2call_enabled),
                     tsip_stack.prototype.SetSecureTransportEnabled((b_rtcweb_breaker_enabled || (window.location && window.location.protocol == "https:"))), // always use secure transport when RTCWebBreaker or https://
                     tsip_stack.prototype.SetEarlyIMSEnabled(b_early_ims), // should be 'true' unless you're using a real IMS network
                     tsip_stack.prototype.SetWebsocketServerUrl(o_conf.websocket_proxy_url),
                     tsip_stack.prototype.SetIceServers(o_conf.ice_servers),
                     tsip_stack.prototype.SetMediaStreamCacheEnabled(b_enable_media_stream_cache),
                     tsip_stack.prototype.SetBandwidth(o_bandwidth),
                     tsip_stack.prototype.SetVideoSize(o_video_size));

    // add sip headers
    if (o_conf.sip_headers) {
        o_conf.sip_headers.forEach(function (o_header) {
            if (o_header && !tsk_string_is_null_or_empty(o_header.name) && (!o_header.value || tsk_string_is_string(o_header.value))) {
                o_stack.set(
                    tsip_stack.prototype.SetHeader(o_header.name, o_header.value)
                );
            }
        });
    }

    return 0;
}


/**
Starts the SIP stack and connect the network transport to the WebSocket server without sending any SIP request. 
This function must be be called before any attempt to make or receive calls/messages. This function is asynchronous which means that the stack will not be immediately started after the call.
Please check <a href="SIPml.EventTarget.html#SIPml.EventTarget.Stack">this link</a> for more information on all supported events.
@returns {Integer} 0 if successful; otherwise nonzero
@throws {ERR_INVALID_STATE} <font color="red">ERR_INVALID_STATE</font>
*/
SIPml.Stack.prototype.start = function () {
    return this.o_stack.start();
}

/**
Stops the SIP stack and disconnect the network transport from the WebSocket server. This function will also hangup all calls and unregister the user from the SIP server.
Please check <a href="SIPml.EventTarget.html#SIPml.EventTarget.Stack">this link</a> for more information on all supported events.
@param {Integer} [timeout] Optional parameter used to defined maximum time in milliseconds to take to stop the stack. 
Default value: 2000 millis
@returns {Integer} 0 if successful; otherwise nonzero
@throws {ERR_INVALID_STATE} <font color="red">ERR_INVALID_STATE</font>
*/
SIPml.Stack.prototype.stop = function (i_timeout) {
    return this.o_stack.stop(i_timeout);
}

/**
Create new SIP session.
@param {String} type Session type. Supported values: <b>'register'</b>, <b>'call-audio'</b>, <b>'call-audiovideo'</b>, <b>'call-video'</b>, <b>'call-screenshare'</b>, <b>'message'</b>, <b>'subscribe'</b> or <b>'publish'</b>.
@param {SIPml.Session.Configuration} [configuration] Anonymous object used to configure the newly created session.
@throws {ERR_INVALID_PARAMETER_VALUE} <font color="red">ERR_INVALID_PARAMETER_VALUE</font> <br>
@returns {SIPml.Session} New session if successful; otherwise null.<br> The session type would be <a href="SIPml.Session.Registration.html">SIPml.Session.Registration</a>, <a href="SIPml.Session.Call.html">SIPml.Session.Call</a> or <a href="SIPml.Session.Message.html">SIPml.Session.Message</a> <br>

@example
var <a href="SIPml.Session.Registration.html">o_registration</a> = this.<a href="#newSession">newSession</a>('register', {
            expires: 200,
            sip_caps: [
                    {name: '+g.oma.sip-im'},
                    {name: '+audio'},
                    {name: 'language', value: '\"en,fr\"'}
            ],
            sip_headers: [
                    {name: 'What', value: 'Registration', session: false}, 
                    {name: 'Organization', value: 'Doubango Telecom', session: true}
            ]
        });
o_registration.<a href="SIPml.Session.Registration.html#register">register</a>();

// or
var <a href="SIPml.Session.Call.html">o_audiovideo</a> = this.<a href="#newSession">newSession</a>('call-audiovideo', {
            video_local: document.getElementById('video_local'), // &lt;video id="video_local" .../&gt;
            video_remote: document.getElementById('video_remote'), // &lt;video id="video_remote" .../&gt;
            audio_remote: document.getElementById('audio_remote'), // &lt;audio id="audio_remote" .../&gt;
            sip_caps: [
                    {name: '+g.oma.sip-im'},
                    {name: '+sip.ice'},
                    {name: 'language', value: '\"en,fr\"'}
            ],
            sip_headers: [
                    {name: 'What', value: 'Audio/Video call', session: false}, 
                    {name: 'Organization', value: 'Doubango Telecom', session: false}
            ]
        });
o_audiovideo.<a href="SIPml.Session.Call.html#call">call</a>('alice'); // call alice
*/
SIPml.Stack.prototype.newSession = function (s_type, o_conf) {
    var o_session;
    var cls;
    if (s_type == 'register') {
        o_session = new tsip_session_register(this.o_stack);
        cls = SIPml.Session.Registration;
    }
    else if (s_type == 'message') {
        o_session = new tsip_session_message(this.o_stack);
        cls = SIPml.Session.Message;
    }
    else if (s_type == 'publish') {
        o_session = new tsip_session_publish(this.o_stack);
        cls = SIPml.Session.Publish;
    }
    else if (s_type == 'subscribe') {
        o_session = new tsip_session_subscribe(this.o_stack);
        cls = SIPml.Session.Subscribe;
    }
    else if (s_type == 'call-audio' || s_type == 'call-audiovideo' || s_type == 'call-video' || s_type == 'call-screenshare') {
        o_session = new tsip_session_invite(this.o_stack);
        o_session.s_type = s_type;
        cls = SIPml.Session.Call;
    }
    else {
        throw new Error("ERR_INVALID_PARAMETER_VALUE: '" + s_type + "' not valid as session type");
    }

    o_session.b_local = true; // locally created session
    var oSession = new cls(o_session, o_conf);
    this.ao_sessions[oSession.getId()] = oSession;
    return oSession;
}

// ================================== SIPml.Stack.Event ==========================================

/** 
SIP Stack event object. You should never create an instance of this object.
@constructor
@extends SIPml.Event
@param {String} type The event type/identifier.
@param {tsip_event} [event] The wrapped event object.
@property {String} type The event type or identifier (e.g. <i>'started'</i> or <i>'i_new_call'</i>). Please check <a href="SIPml.EventTarget.html#SIPml.EventTarget.Stack">this link</a> for more information on all supported events.
@property {String} description User-friendly description in english (e.g. <i>'Stack started'</i> or <i>'<b>I</b>ncoming <b>new</b> <b>call</b>'</i>).
@property {SIPml.Session} [newSession] Optional session object only defined when the event is about a new session creation (e.g. <i>'i_new_call'</i>).
The session type would be <a href="SIPml.Session.Call.html">SIPml.Session.Call</a> or <a href="SIPml.Session.Message.html">SIPml.Session.Message</a>
*/
SIPml.Stack.Event = function (s_type, o_event) {
    SIPml.Event.call(this, s_type, o_event);
}

SIPml.Stack.Event.prototype = Object.create(SIPml.Event.prototype);

// ================================== SIPml.Session ==========================================

/**
Anonymous SIP Session configuration object.
@namespace SIPml.Session.Configuration
@name SIPml.Session.Configuration
@property {Integer} [expires] Session timeout in seconds. 
@property {HTMLVideoElement} [video_local] <a href="https://developer.mozilla.org/en-US/docs/DOM/HTMLVideoElement">HTMLVideoElement<a> where to display the local video preview. This propety should only be used for <a href="SIPml.Session.Call.html">video sessions</a>.
@property {HTMLVideoElement} [video_remote] <a href="https://developer.mozilla.org/en-US/docs/DOM/HTMLVideoElement">HTMLVideoElement<a> where to display the remote video stream. This propety should only be used for <a href="SIPml.Session.Call.html">video sessions</a>.
@property {HTMLAudioElement} [audio_remote] <a href="https://developer.mozilla.org/en-US/docs/DOM/HTMLAudioElement">HTMLAudioElement<a> used to playback the remote audio stream. This propety should only be used for <a href="SIPml.Session.Call.html">audio sessions</a>.
@property {Integer} [screencast_window_id] Windows identifer from which to grab frames for application or desktop share. Use #0 to share your entire desktop. This property should only be used when webrt4all with support fot BFCP is installed. <br />
<i>Available since version 2.0.0</i>. <br />
@property {Array} [sip_caps] <i>{name,value}</i> pairs defining the SIP capabilities associated to this session. The capabilities are added to the Contact header. Please refer to <a href="http://tools.ietf.org/html/rfc3840">rfc3840</a> and <a href="http://tools.ietf.org/html/rfc3841">rfc3841</a> for more information.
@property {String} [from] Set the source uri string to be used in the <i>From</i> header (available since API version 1.2.170).
@property {Object} [bandwidth] Defines the maximum audio and video bandwidth to use. This will change the outhoing SDP to include a "b:AS=" attribute. Use <i>0</i> to let the browser negotiates the right value using RTCP-REMB and congestion control. A default value for all sessions could be defined at stack level.<br />
<i>Available since version 1.3.203</i>. <br />
Example: <i>{ audio:64, video:512 }</i>
@property {Object} [video_size] Defines the maximum and minimum video size to be used. All values are optional. The browser will try to find the best video size between <i>max</i> and <i>min</i> based on the camera capabilities. A default value for all sessions could be defined at stack level.<br />
<i>Available since version 1.3.203</i>. <br />
Example: <i>{ minWidth:640, minHeight:480, maxWidth:1920, maxHeight:1080 }</i>
@property {Array} [sip_headers] <i>{name,value,session}</i> trios defining the SIP headers associated to this session. <i>session</i> is a boolean defining whether the header have to be added to all outgoing request or not (initial only).
@example
var configuration = 
{
    expires: 200,
    audio_remote: document.getElementById('audio_remote'), // &lt;audio id="audio_remote" .../&gt;
    video_local: document.getElementById('video_local'),  // &lt;video id="video_local" .../&gt;
    video_remote: document.getElementById('video_remote'),  // &lt;video id="video_remote" .../&gt;
    sip_caps: [
                    {name: '+g.oma.sip-im'},
                    {name: '+sip.ice'},
                    {name: 'language', value: '\"en,fr\"'}
            ],
    sip_headers: [
                    {name: 'What', value: 'Audio/Video call', session: false}, 
                    {name: 'Organization', value: 'Doubango Telecom', session: false}
            ]
}
*/

/** 
Base (abstract) SIP session. You should never create an instance of this class by yourself. You have to use <a href="SIPml.Stack.html#newSession"> newSession()</a> to create a new instance.
This is a base class for <a href="SIPml.Session.Registration.html">SIPml.Session.Registration</a>, <a href="SIPml.Session.Call.html">SIPml.Session.Call</a> and <a href="SIPml.Session.Message.html">SIPml.Session.Message</a>.
@constructor
@extends SIPml.EventTarget
@param {tsip_session_t} session Private wrapped session object.
@param {SIPml.Session.Configuration} [configuration] Optional configuration object.
@throws {ERR_INVALID_PARAMETER_VALUE|ERR_INVALID_PARAMETER_TYPE} <font color="red">ERR_INVALID_PARAMETER_VALUE</font> | <font color="red">ERR_INVALID_PARAMETER_TYPE</font>
*/
SIPml.Session = function (o_session, o_conf) {
    SIPml.EventTarget.call(this);
    /*
        - o_configuration: []
        - o_session: tsip_session_xxx
    */
    if (!o_session) {
        throw new Error("ERR_INVALID_PARAMETER_VALUE: Invalid session value");
    }

    this.o_session = o_session;
    this.setConfiguration(o_conf);
}

SIPml.Session.prototype = Object.create(SIPml.EventTarget.prototype);
SIPml.Session.prototype.o_session = null;
SIPml.Session.prototype.o_session = null;
SIPml.Session.prototype.o_configuration = null;

/**
Gets the session unique identifier.
@returns {Integer} Read-only session unique identifier.
*/
SIPml.Session.prototype.getId = function () {
    return this.o_session.get_id();
}

/**
Updates or sets the session configuration.
@param {SIPml.Session.Configuration} configuration
*/
SIPml.Session.prototype.setConfiguration = function (o_conf) {
    if (!o_conf) {
        return;
    }

    var o_session = this.o_session;

    // event-listener: must be first to be defined as other configs could raise events
    if (o_conf.events_listener) {
        this.addEventListener(o_conf.events_listener.events, o_conf.events_listener.listener);
    }

    if (this instanceof SIPml.Session.Call) {
        // Bandwidth and video size
        o_session.set(
                    tsip_session.prototype.SetBandwidth(o_conf.bandwidth ? o_conf.bandwidth : { audio: undefined, video: undefined }),
                    tsip_session.prototype.SetVideoSize(o_conf.video_size ? o_conf.video_size : { minWidth: undefined, minHeight: undefined, maxWidth: undefined, maxHeight: undefined }),
                    tsip_session.prototype.SetScreencastWindowID(o_conf.screencast_window_id ? o_conf.screencast_window_id : 0)
                );
        // Do not change the views if not defined in new config. User must use "null" to unset the views
        this.videoLocal = (o_conf.video_local === undefined) ? this.videoLocal : o_conf.video_local;
        this.videoRemote = (o_conf.video_remote === undefined) ? this.videoRemote : o_conf.video_remote;
        this.audioRemote = (o_conf.audio_remote === undefined) ? this.audioRemote : o_conf.audio_remote;
        this.audioLocal = (o_conf.audio_local === undefined) ? this.audioLocal : o_conf.audio_local;

        var _addStream = function (o_view, o_stream, b_audio) {
            if (o_view) {
                attachMediaStream(o_view, o_stream);
                return (b_audio && o_stream && o_stream.getAudioTracks().length > 0) || (!b_audio && o_stream && o_stream.getVideoTracks().length > 0);
            }
        }

        if (_addStream(this.videoLocal, o_session.get_stream_local(), false)) {
            this.dispatchEvent({ s_type: 'm_stream_video_local_added', o_value: new SIPml.Session.Event(this, 'm_stream_video_local_added') });
        }
        if (_addStream(this.videoRemote, o_session.get_stream_remote(), false)) {
            this.dispatchEvent({ s_type: 'm_stream_video_remote_added', o_value: new SIPml.Session.Event(this, 'm_stream_video_remote_added') });
        }
        if (_addStream(this.audioLocal, o_session.get_stream_local(), true)) {
            this.dispatchEvent({ s_type: 'm_stream_audio_local_added', o_value: new SIPml.Session.Event(this, 'm_stream_audio_local_added') });
        }
        if (_addStream(this.audioRemote, o_session.get_stream_remote(), true)) {
            this.dispatchEvent({ s_type: 'm_stream_audio_remote_added', o_value: new SIPml.Session.Event(this, 'm_stream_audio_remote_added') });
        }
    }


    // headers
    if (o_conf.sip_headers) {
        o_conf.sip_headers.forEach(function (o_header) {
            if (o_header && !tsk_string_is_null_or_empty(o_header.name) && (!o_header.value || tsk_string_is_string(o_header.value))) {
                o_session.set(
                    tsip_session.prototype.SetHeader(o_header.name, o_header.value)
                );
            }
        });
    }
    // caps
    if (o_conf.sip_caps) {
        o_conf.sip_caps.forEach(function (o_cap) {
            if (o_cap && !tsk_string_is_null_or_empty(o_cap.name) && (!o_cap.value || tsk_string_is_string(o_cap.value))) {
                o_session.set(
                    tsip_session.prototype.SetCaps(o_cap.name, o_cap.value)
                );
            }
        });
    }
    // expires
    if (o_conf.expires) {
        o_session.set(tsip_session.prototype.SetExpires(o_conf.expires));
    }
    // from
    if (o_conf.from) {
        o_session.set(tsip_session.prototype.SetFromStr(o_conf.from));
    }
}

/**
Gets the remote party SIP Uri (e.g. sip:john.doe@example.com). This Uri could be used a match an incoming call to a contact from your address book.
@returns {String} The remote party SIP Uri.
@see <a href="#getRemoteFriendlyName">getRemoteFriendlyName</a>
*/
SIPml.Session.prototype.getRemoteUri = function () {
    return (this.o_session.b_local ? this.o_session.o_uri_to : this.o_session.o_uri_from).toString();
}

/**
Gets the remote party friendly name (e.g. 'John Doe').
@returns {String} The remote party friendly name.
@see <a href="#getRemoteUri">getRemoteUri</a>
*/
SIPml.Session.prototype.getRemoteFriendlyName = function () {
    var o_uri = this.o_session.b_local ? this.o_session.o_uri_to : this.o_session.o_uri_from;
    return o_uri.s_display_name ? o_uri.s_display_name : o_uri.s_user_name;
}

/**
Rejects an incoming SIP MESSAGE (SMS-like) or audio/video call.
@param {SIPml.Session.Configuration} [configuration] Configuration value.
@returns {Integer} 0 if successful; otherwise nonzero
@throws {ERR_NOT_READY} <font color="red">ERR_NOT_READY</font>
*/
SIPml.Session.prototype.reject = function (o_conf) {
    this.setConfiguration(o_conf);
    return this.o_session.reject();
}

/**
Accepts an incoming SIP MESSAGE (SMS-like) or audio/video call.
@param {SIPml.Session.Configuration} [configuration] Configuration value.
@returns {Integer} 0 if successful; otherwise nonzero
@throws {ERR_NOT_READY} <font color="red">ERR_NOT_READY</font>
*/
SIPml.Session.prototype.accept = function (o_conf) {
    this.setConfiguration(o_conf);
    return this.o_session.accept();
}



// ================================== SIPml.Session.Event ==================================


/** 
SIP session event object. You should never create an instance of this class by yourself.
@constructor
@extends SIPml.Event
@param {SIPml.Session} [session] The session type would be <a href="SIPml.Session.Registration.html">SIPml.Session.Registration</a>, <a href="SIPml.Session.Call.html">SIPml.Session.Call</a> or <a href="SIPml.Session.Message.html">SIPml.Session.Message</a>.
@param {String} type The event type or identifier. Please check <a href="SIPml.EventTarget.html#SIPml.EventTarget.Session">this link</a> for more information about all supported session event types.
@param {tsip_event} [event] Private wrapped session object.
@property {SIPml.Session} session Session associated to this event. Would be <a href="SIPml.Session.Registration.html">SIPml.Session.Registration</a>, <a href="SIPml.Session.Call.html">SIPml.Session.Call</a> or <a href="SIPml.Session.Message.html">SIPml.Session.Message</a>.
*/
SIPml.Session.Event = function (o_session, s_type, o_event) {
    SIPml.Event.call(this, s_type, o_event);
    this.session = o_session;
}

SIPml.Session.Event.prototype = Object.create(SIPml.Event.prototype);


/**
Gets the name of destination for the current call transfer. 
@returns {String} The name of destination for the current call transfer (e.g. 'John Doe').
*/
SIPml.Session.Event.prototype.getTransferDestinationFriendlyName = function () {
    var o_message = this.o_event ? this.o_event.get_message() : null;
    if (o_message) {
        var o_hdr_Refer_To = o_message.get_header(tsip_header_type_e.Refer_To);
        if (o_hdr_Refer_To && o_hdr_Refer_To.o_uri) {
            return (o_hdr_Refer_To.s_display_name ? o_hdr_Refer_To.s_display_name : o_hdr_Refer_To.o_uri.s_user_name);
        }
    }
    return null;
}

// ================================== SIPml.Registration ==================================

/**
SIP session registration class. You should never create an instance of this class by yourself.
Please use <a href="SIPml.Stack.html#newSession">stack.newSession()</a> function to create a new registration session.
@constructor
@extends SIPml.Session
@param {tsip_session} session Private wrapped session object
@param {SIPml.Session.Configuration} [configuration] Configuration value.
*/
SIPml.Session.Registration = function (o_session, o_configuration) {
    SIPml.Session.call(this, o_session, o_configuration);
}

SIPml.Session.Registration.prototype = Object.create(SIPml.Session.prototype);

/**
Sends SIP REGISTER request to login the user. Refreshing requests will be automatically done based on the expiration time.
@param {SIPml.Session.Configuration} [configuration] Optional configuration value.
@example
var session = <a href="SIPml.Stack.html#newSession">stack.newSession</a>('register', {
                            expires: 200,
                            events_listener: { events: '*', listener: onSipEventSession },
                            sip_caps: [
                                        { name: '+g.oma.sip-im', value: null },
                                        { name: '+audio', value: null },
                                        { name: 'language', value: '\"en,fr\"' }
                                ]
                        });
session.register();

@see <a href="#unregister">unregister</a>
@throws {ERR_INVALID_STATE} <font color="red">ERR_INVALID_STATE</font>
*/
SIPml.Session.Registration.prototype.register = function (o_conf) {
    // FIXME: apply o_configuration
    // FIXME: raise error if stack not started
    this.setConfiguration(o_conf);
    return this.o_session.register();
}

/**
Sends SIP REGISTER (expires=0) request to logout the user.
@param {SIPml.Session.Configuration} [configuration] Configuration value.
@see <a href="#register">register</a>
@throws {ERR_INVALID_STATE} <font color="red">ERR_INVALID_STATE</font>
*/
SIPml.Session.Registration.prototype.unregister = function (o_conf) {
    // FIXME: raise error if stack not started
    this.setConfiguration(o_conf);
    return this.o_session.unregister();
}

// ================================== SIPml.Call ==========================================

/** 
SIP audio/video/screenshare call session class. You should never create an instance of this class by yourself.
Please use <a href="SIPml.Stack.html#newSession">stack.newSession()</a> function to create a new audio/video/screenshare session.
@constructor
@extends SIPml.Session
@param {tsip_session} session Private wrapped session object
@param {SIPml.Session.Configuration} [configuration] Configuration value.
@example
var listenerFunc = function(e){
    console.info('session event = ' + e.type);
}
var session = <a href="SIPml.Stack.html#newSession">stack.newSession</a>('call-audiovideo', {
            video_local: document.getElementById('video-local'), // &lt;video id="video-local" .../&gt;
            video_remote: document.getElementById('video-remote'), // &lt;video id="video-remote" .../&gt;
            audio_remote: document.getElementById('audio-remote'), // &lt;audio id="audio-remote" .../&gt;
            events_listener: { events: '*', listener: listenerFunc },
            sip_caps: [
                            { name: '+g.oma.sip-im' },
                            { name: '+sip.ice' },
                            { name: 'language', value: '\"en,fr\"' }
                        ]
        });
@throws {ERR_INVALID_PARAMETER_VALUE} <font color="red">ERR_INVALID_PARAMETER_VALUE</font>
*/
SIPml.Session.Call = function (o_session, o_conf) {
    SIPml.Session.call(this, o_session, o_conf);

    switch (o_session.s_type) {
        case 'call-audio': this.mediaType = tmedia_type_e.AUDIO; break;
        case 'call-audiovideo': this.mediaType = tmedia_type_e.AUDIO_VIDEO; break;
        case 'call-video': this.mediaType = tmedia_type_e.VIDEO; break;
        case 'call-screenshare': this.mediaType = tmedia_type_e.SCREEN_SHARE; break;
    }
}

SIPml.Session.Call.prototype = Object.create(SIPml.Session.prototype);
SIPml.Session.Call.prototype.videoLocal = null;
SIPml.Session.Call.prototype.videoRemote = null;

/**
Makes audio/video call.
@param {String} to Destination name, uri, phone number or identifier (e.g. 'sip:johndoe@example.com' or 'johndoe' or '+33600000000').
@param {SIPml.Session.Configuration} [configuration] Configuration value.
@returns {Integer} 0 if successful; otherwise nonzero
@example
var listenerFunc = function(e){
    console.info('session event = ' + e.type);
}
var session = <a href="SIPml.Stack.html#newSession">stack.newSession</a>('call-audiovideo');
session.call('johndoe', {
            video_local: document.getElementById('video-local'), // &lt;video id="video-local" .../&gt;
            video_remote: document.getElementById('video-remote'), // &lt;video id="video-remote" .../&gt;
            audio_remote: document.getElementById('audio-remote'), // &lt;audio id="audio-remote" .../&gt;
            events_listener: { events: '*', listener: listenerFunc },
            sip_caps: [
                            { name: '+g.oma.sip-im' },
                            { name: '+sip.ice' },
                            { name: 'language', value: '\"en,fr\"' }
                        ]
        });

@throws {ERR_INVALID_PARAMETER_VALUE | ERR_NOT_READY} <font color="red">ERR_INVALID_PARAMETER_VALUE</font> | <font color="red">ERR_NOT_READY</font>
*/
SIPml.Session.Call.prototype.call = function (s_to, o_conf) {
    if (tsk_string_is_null_or_empty(s_to)) {
        throw new Error("ERR_INVALID_PARAMETER_VALUE: 'to' must not be null");
    }
    if (!SIPml.haveMediaStream()) {
        throw new Error("ERR_NOT_READY: Media engine not ready yet");
    }
    // set destination
    this.o_session.set(tsip_session.prototype.SetToStr(s_to));
    // set conf
    this.setConfiguration(o_conf);
    // make call
    return this.o_session.call(this.mediaType);
}

/**
Terminates the audio/video call.
@param {SIPml.Session.Configuration} [configuration] Configuration value.
@returns {Integer} 0 if successful; otherwise nonzero
@throws {ERR_NOT_READY} <font color="red">ERR_NOT_READY</font>
*/
SIPml.Session.Call.prototype.hangup = function (o_conf) {
    this.setConfiguration(o_conf);
    return this.o_session.hangup();
}

/**
Holds the audio/video call.
@param {SIPml.Session.Configuration} [configuration] Configuration value.
@returns {Integer} 0 if successful; otherwise nonzero
@throws {ERR_NOT_READY} <font color="red">ERR_NOT_READY</font>
*/
SIPml.Session.Call.prototype.hold = function (o_conf) {
    this.setConfiguration(o_conf);
    return this.o_session.hold(this.mediaType);
}

/**
Resumes the audio/video call.
@param {SIPml.Session.Configuration} [configuration] Configuration value.
@returns {Integer} 0 if successful; otherwise nonzero
@throws {ERR_NOT_READY} <font color="red">ERR_NOT_READY</font>
*/
SIPml.Session.Call.prototype.resume = function (o_conf) {
    this.setConfiguration(o_conf);
    return this.o_session.resume(this.mediaType);
}

/**
Sends SIP INFO message.
@param {Object|String} [content] SIP INFO request content.
@param {String} [contentType] Content Type.
@param {SIPml.Session.Configuration} [configuration] Configuration value.
@returns {Integer} 0 if successful; otherwise nonzero
@example
session.info('Device orientation: portrait', 'doubango/device-orientation.xml');
@throws {ERR_NOT_READY} <font color="red">ERR_NOT_READY</font>
*/
SIPml.Session.Call.prototype.info = function (o_content, s_content_type, o_conf) {
    this.setConfiguration(o_conf);
    return this.o_session.info(o_content, s_content_type);
}

/**
Sends a SIP DTMF digit.
@param {Char} [digit] The digit to send.
@param {SIPml.Session.Configuration} [configuration] Configuration value.
@returns {Integer} 0 if successful; otherwise nonzero
@example
session.dtmf('#');
@throws {ERR_INVALID_PARAMETER_VALUE | ERR_NOT_READY} <font color="red">ERR_INVALID_PARAMETER_VALUE</font> | <font color="red">ERR_NOT_READY</font>
*/
SIPml.Session.Call.prototype.dtmf = function (c_digit, o_conf) {
    this.setConfiguration(o_conf);
    return this.o_session.dtmf(c_digit);
}

/**
Transfers the call to a new destination.
@param {String} to Transfer destination name, uri, phone number or identifier (e.g. 'sip:johndoe@example.com' or 'johndoe' or '+33600000000').
@param {SIPml.Session.Configuration} [configuration] Configuration value.
@returns {Integer} 0 if successful; otherwise nonzero
@example
session.transfer('johndoe');
@throws {ERR_INVALID_PARAMETER_VALUE | ERR_NOT_READY} <font color="red">ERR_INVALID_PARAMETER_VALUE</font> | <font color="red">ERR_NOT_READY</font>
*/
SIPml.Session.Call.prototype.transfer = function (s_to, o_conf) {
    this.setConfiguration(o_conf);
    return this.o_session.transfer(s_to);
}

/**
Accepts incoming transfer request.
@param {SIPml.Session.Configuration} [configuration] Configuration value.
@returns {Integer} 0 if successful; otherwise nonzero
@throws {ERR_NOT_READY} <font color="red">ERR_NOT_READY</font>
*/
SIPml.Session.Call.prototype.acceptTransfer = function (o_conf) {
    this.setConfiguration(o_conf);
    return this.o_session.transfer_accept();
}

/**
Rejects incoming transfer request.
@param {SIPml.Session.Configuration} [configuration] Configuration value.
@returns {Integer} 0 if successful; otherwise nonzero
@throws {ERR_NOT_READY} <font color="red">ERR_NOT_READY</font>
*/
SIPml.Session.Call.prototype.rejectTransfer = function (o_conf) {
    this.setConfiguration(o_conf);
    return this.o_session.transfer_reject();
}

/**
Starts sharing your entire desktop or an App using BFCP(<a href="https://tools.ietf.org/html/rfc4582">rfc4582</a>). Requires webrt4all plugin.
@since version 2.0.0
@param {SIPml.Session.Configuration} [configuration] Configuration value.
@returns {Integer} 0 if successful; otherwise nonzero
@throws {ERR_NOT_READY | ERR_NOT_SUPPORTED} <font color="red">ERR_NOT_READY</font> | <font color="red">ERR_NOT_SUPPORTED</font>
*/
SIPml.Session.Call.prototype.startBfcpShare = function (o_conf) {
    if (SIPml.getWebRtcType() != 'w4a') {
        throw new Error("ERR_NOT_SUPPORTED: BFCP sharing requires webrtc4all plugin");
    }
    this.setConfiguration(o_conf);
    return this.o_session.start_bfcp_share();
}

/**
Stops sharing your entire desktop or an App using BFCP(<a href="https://tools.ietf.org/html/rfc4582">rfc4582</a>). Requires webrt4all plugin.
@since version 2.0.0
@param {SIPml.Session.Configuration} [configuration] Configuration value.
@returns {Integer} 0 if successful; otherwise nonzero
@throws {ERR_NOT_READY | ERR_NOT_SUPPORTED} <font color="red">ERR_NOT_READY</font> | <font color="red">ERR_NOT_SUPPORTED</font>
*/
SIPml.Session.Call.prototype.stopBfcpShare = function (o_conf) {
    if (SIPml.getWebRtcType() != 'w4a') {
        throw new Error("ERR_NOT_SUPPORTED: BFCP sharing requires webrtc4all plugin");
    }
    this.setConfiguration(o_conf);
    return this.o_session.stop_bfcp_share();
}

/**
Mutes or unmutes a media.
@since version 2.0.0
@param {String} media Media to mute. Must be <i>audio</i>, <i>video</i>.
@param {Boolean} mute Whether to mute (true) or unmute (false) the media.
@returns {Integer} 0 if successful; otherwise nonzero
@throws {ERR_INVALID_ARGUMENT | ERR_NOT_SUPPORTED} <font color="red">ERR_INVALID_ARGUMENT</font> | <font color="red">ERR_NOT_SUPPORTED</font>
*/
SIPml.Session.Call.prototype.mute = function (s_media, b_mute) {
    if ((s_media !== 'audio' && s_media !== 'video') || typeof b_mute != "boolean") {
        throw new Error("ERR_INVALID_ARGUMENT");
    }
    return this.o_session.set_mute(s_media, b_mute);
}

// ================================== SIPml.Session.Message ==========================================

/** 
SIP MESSAGE (SMS) session class. You should never create an instance of this class by yourself.
Please use <a href="SIPml.Stack.html#newSession">stack.newSession()</a> function to create a messaging/IM session.
@constructor
@param {tsip_session} session Private session object.
@param {SIPml.Session.Configuration} [configuration] Configuration value.
@example
var session = <a href="SIPml.Stack.html#newSession">stack.newSession</a>('message');
*/
SIPml.Session.Message = function (o_session, o_conf) {
    SIPml.Session.call(this, o_session, o_conf);

}

SIPml.Session.Message.prototype = Object.create(SIPml.Session.prototype);

/**
Sends a SIP MESSAGE (SMS-like) request.
@param {String} to Destination name, uri, phone number or identifier (e.g. 'sip:johndoe@example.com' or 'johndoe' or '+33600000000').
@param {Object|String} [content] The message content.
@param {String} [contentType] The content type.
@param {SIPml.Session.Configuration} [configuration] Configuration value.
@returns {Integer} 0 if successful; otherwise nonzero
@example
var session = <a href="SIPml.Stack.html#newSession">stack.newSession</a>('message');
session.send('johndoe', 'P&ecirc;che &agrave; la moule', 'text/plain;charset=utf8',{
    sip_caps: [
                                    { name: '+g.oma.sip-im' },
                                    { name: '+sip.ice' },
                                    { name: 'language', value: '\"en,fr\"' }
                            ],
    sip_headers: [
                            { name: 'What', value: 'Sending SMS' },
                            { name: 'My-Organization', value: 'Doubango Telecom' }
                    ]
});
@throws {ERR_INVALID_PARAMETER_VALUE | ERR_NOT_READY} <font color="red">ERR_INVALID_PARAMETER_VALUE</font> | <font color="red">ERR_NOT_READY</font>
*/
SIPml.Session.Message.prototype.send = function (s_to, o_content, s_content_type, o_conf) {
    if (tsk_string_is_null_or_empty(s_to)) {
        throw new Error("ERR_INVALID_PARAMETER_VALUE: 'to' must not be null");
    }

    // apply configuration values
    this.setConfiguration(o_conf);
    // set destination
    this.o_session.set(tsip_session.prototype.SetToStr(s_to));
    // sends the message
    return this.o_session.send(o_content, s_content_type);
}



// ================================== SIPml.Session.Publish ==========================================


/** 
SIP PUBLISH (for presence status publication) session class.You should never create an instance of this class by yourself.
Please use <a href="SIPml.Stack.html#newSession">stack.newSession()</a> function to create a new presence publication session.
@constructor
@extends SIPml.Session
@since version 1.1.0
@param {tsip_session} session Private session object.
@param {SIPml.Session.Configuration} [configuration] Configuration value.
@example
var session = <a href="SIPml.Stack.html#newSession">stack.newSession</a>('publish', {
                            expires: 200,
                            events_listener: { events: '*', listener: function(e){} },
                            sip_headers: [
                                          { name: 'Event', value: 'presence' } // very important
                                ],
                            sip_caps: [
                                        { name: '+g.oma.sip-im', value: null },
                                        { name: '+audio', value: null },
                                        { name: 'language', value: '\"en,fr\"' }
                                ]
                        });
*/
SIPml.Session.Publish = function (o_session, o_conf) {
    SIPml.Session.call(this, o_session, o_conf);
    // set destination to ourself (https://groups.google.com/forum/#!topic/doubango/XKWTQ9TgjPU)
    o_session.set(tsip_session.prototype.SetToUri(o_session.get_stack().identity.o_uri_impu));
}

SIPml.Session.Publish.prototype = Object.create(SIPml.Session.prototype);

/**
Sends a SIP PUBLISH (for presence status publication) request.
@since version 1.1.0
@param {Object|String} [content] The request content.
@param {String} [contentType] The content type.
@param {SIPml.Session.Configuration} [configuration] Configuration value.
@returns {Integer} 0 if successful; otherwise nonzero
@example
var session = <a href="SIPml.Stack.html#newSession">stack.newSession</a>('publish');
var contentType = 'application/pidf+xml';
var content = '&lt;?xml version=\"1.0\" encoding=\"UTF-8\"?&gt;\n' +
                '&lt;presence xmlns=\"urn:ietf:params:xml:ns:pidf\"\n' +
                    ' xmlns:im=\"urn:ietf:params:xml:ns:pidf:im\"' +
             	    ' entity=\"sip:bob@example.com\"&gt;\n' +
                    '&lt;tuple id=\"s8794\"&gt;\n' +
                    '&lt;status&gt;\n'+
                    '   &lt;basic>open&lt;/basic&gt;\n' +
                    '   &lt;im:im>away&lt;/im:im&gt;\n' +
                    '&lt;/status&gt;\n' +
                    '&lt;contact priority=\"0.8\"&gt;tel:+33600000000&lt;/contact&gt;\n' +
                    '&lt;note  xml:lang=\"fr\"&gt;Bonjour de Paris :)&lt;/note&gt;\n' +
                    '&lt;/tuple&gt;\n' +
   	            '&lt;/presence&gt;';

session.publish(content, contentType,{
    expires: 200,
    sip_caps: [
                                    { name: '+g.oma.sip-im' },
                                    { name: '+sip.ice' },
                                    { name: 'language', value: '\"en,fr\"' }
                            ],
    sip_headers: [
                            { name: 'Event', value: 'presence' },
                            { name: 'Organization', value: 'Doubango Telecom' }
                    ]
});
@returns {Integer} 0 if successful; otherwise nonzero
@throws {ERR_INVALID_PARAMETER_VALUE | ERR_NOT_READY} <font color="red">ERR_INVALID_PARAMETER_VALUE</font> | <font color="red">ERR_NOT_READY</font>
@see <a href="#unpublish">unpublish</a>
*/
SIPml.Session.Publish.prototype.publish = function (o_content, s_content_type, o_conf) {
    // apply configuration values
    this.setConfiguration(o_conf);
    // sends the PUBLISH request
    return this.o_session.publish(o_content, s_content_type);
}

/**
Remove/unpublish presence data from the server.
@since version 1.1.0
@param {SIPml.Session.Configuration} [configuration] Configuration value.
@throws {ERR_INVALID_PARAMETER_VALUE | ERR_NOT_READY} <font color="red">ERR_INVALID_PARAMETER_VALUE</font> | <font color="red">ERR_NOT_READY</font>
@see <a href="#publish">publish</a>
*/
SIPml.Session.Publish.prototype.unpublish = function (o_conf) {
    // apply configuration values
    this.setConfiguration(o_conf);
    // sends the PUBLISH request (expires = 0)
    return this.o_session.unpublish();
}





// ================================== SIPml.Session.Subscribe ==========================================


/** 
SIP SUBSCRIBE (for presence status subscription) session class.You should never create an instance of this class by yourself.
Please use <a href="SIPml.Stack.html#newSession">stack.newSession()</a> function to create a new presence subscription session.
@constructor
@extends SIPml.Session
@since version 1.1.0
@param {tsip_session} session Private session object.
@param {SIPml.Session.Configuration} [configuration] Configuration value.
@example
var session = <a href="SIPml.Stack.html#newSession">stack.newSession</a>('subscribe', {
                expires: 200,
                events_listener: { events: '*', listener: function(e){} },
                sip_headers: [
                                { name: 'Event', value: 'presence' },
                                { name: 'Accept', value: 'application/pidf+xml' }
                    ],
                sip_caps: [
                            { name: '+g.oma.sip-im', value: null },
                            { name: '+audio', value: null },
                            { name: 'language', value: '\"en,fr\"' }
                    ]
            });
*/
SIPml.Session.Subscribe = function (o_session, o_conf) {
    SIPml.Session.call(this, o_session, o_conf);

}

SIPml.Session.Subscribe.prototype = Object.create(SIPml.Session.prototype);

/**
Sends a SIP SUBSCRIBE (for presence status subscription) request.
@since version 1.1.0
@param {String} to Destination name, uri, phone number or identifier (e.g. 'sip:johndoe@example.com' or 'johndoe' or '+33600000000').
@param {SIPml.Session.Configuration} [configuration] Configuration value.
@returns {Integer} 0 if successful; otherwise nonzero
@example
var onEvent = function(e){
    if(e.type == 'i_notify'){
        // process incoming NOTIFY request
    }
}
var session = <a href="SIPml.Stack.html#newSession">stack.newSession</a>('subscribe', {
                expires: 200,
                events_listener: { events: '*', listener: onEvent },
                sip_headers: [
                                { name: 'Event', value: 'presence' },
                                { name: 'Accept', value: 'application/pidf+xml' }
                    ],
                sip_caps: [
                            { name: '+g.oma.sip-im', value: null },
                            { name: '+audio', value: null },
                            { name: 'language', value: '\"en,fr\"' }
                    ]
            });
session.subscribe('johndoe'); // watch for johndoe's presence status

@throws {ERR_INVALID_PARAMETER_VALUE | ERR_NOT_READY} <font color="red">ERR_INVALID_PARAMETER_VALUE</font> | <font color="red">ERR_NOT_READY</font>
@see <a href="#unsubscribe">unsubscribe</a>
*/
SIPml.Session.Subscribe.prototype.subscribe = function (s_to, o_conf) {
    if (tsk_string_is_null_or_empty(s_to)) {
        throw new Error("ERR_INVALID_PARAMETER_VALUE: 'to' must not be null");
    }
    // set destination
    this.o_session.set(tsip_session.prototype.SetToStr(s_to));
    // apply configuration values
    this.setConfiguration(o_conf);
    // sends the PUBLISH request
    return this.o_session.subscribe();
}

/**
Unsubscribe.
@since version 1.1.0
@param {SIPml.Session.Configuration} [configuration] Configuration value.
@returns {Integer} 0 if successful; otherwise nonzero
@throws {ERR_INVALID_PARAMETER_VALUE | ERR_NOT_READY} <font color="red">ERR_INVALID_PARAMETER_VALUE</font> | <font color="red">ERR_NOT_READY</font>
@see <a href="#subscribe">subscribe</a>
*/
SIPml.Session.Subscribe.prototype.unsubscribe = function (o_conf) {
    // apply configuration values
    this.setConfiguration(o_conf);
    // sends the SUBSCRIBE request (expires = 0)
    return this.o_session.unsubscribe();
}
