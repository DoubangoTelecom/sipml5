/*
* Copyright (C) 2012 Doubango Telecom <http://www.doubango.org>
*
* Contact: Mamadou Diop <diopmamadou(at)doubango[dot]org>
*	
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*
* sipML5 is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as publishd by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*	
* sipML5 is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*	
* You should have received a copy of the GNU General Public License
* along with sipML5.
*/

function tsk_utils_init_webrtc() {
    // WebRtc plugins
    WebRtc4all_Init();
}

function tsk_utils_have_websocket() {
    try {
        return (WebSocket != null);
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