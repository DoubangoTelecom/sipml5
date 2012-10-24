/*
* Copyright (C) 2012 Doubango Telecom <http://www.doubango.org>
* License: GPLv3
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/

function tsk_utils_init_webrtc() {
    // WebRtc plugins
    WebRtc4all_Init();
}

function tsk_utils_have_websocket() {
    try {
        return !!window.WebSocket;
    }
    catch (e) {
        return false;
    }
}

function tsk_utils_have_webrtc() {
    return (WebRtc4all_GetType() != WebRtcType_e.NONE);
}

function tsk_utils_have_webrtc4all() {
    return (tsk_utils_have_webrtc4npapi() || tsk_utils_have_webrtc4ie());
}

function tsk_utils_have_webrtc4npapi() {
    return (WebRtc4all_GetType() == WebRtcType_e.NPAPI);
}

function tsk_utils_have_webrtc4ie() {
    return (WebRtc4all_GetType() == WebRtcType_e.IE);
}

function tsk_utils_have_webrtc4native() {
    return (WebRtc4all_GetType() == WebRtcType_e.NATIVE);
}

function tsk_utils_have_webrtc4ericsson() {
    return (WebRtc4all_GetType() == WebRtcType_e.ERICSSON);
}

function tsk_utils_webrtc4all_get_version() {
    return WebRtc4all_GetVersion();
}

function tsk_utils_have_stream() {
    try {
        return (tsk_utils_have_webrtc4all() || (__o_stream != null));
    }
    catch (e) { }
    return false;
}

function tsk_utils_log_info(s_msg) {
    if (window.console) {
        window.console.info(s_msg);
    }
}

function tsk_utils_log_warn(s_msg) {
    if (window.console) {
        window.console.warn(s_msg);
    }
}

function tsk_utils_log_error(s_msg) {
    if (window.console) {
        window.console.error(s_msg);
    }
}