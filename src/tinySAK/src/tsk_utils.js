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
function tsk_utils_have_websocket() {
    try {
        return (WebSocket != null);
    }
    catch (e) {
        return false;
    }
}

function tsk_utils_have_webrtc() {
    try {
        if ((navigator.webkitGetUserMedia && (webkitPeerConnection00))) {
            return true;
        }
    }
    catch (e) { }
    return tsk_utils_have_webrtc4ie();
}

var __have_webrtc4ie = undefined;
function tsk_utils_have_webrtc4ie() {
    if (__have_webrtc4ie == undefined) {
        try {
            __have_webrtc4ie = (new ActiveXObject("webrtc4ie.PeerConnection") != null);
        }
        catch (e) {
            __have_webrtc4ie = false;
        }
    }
    return __have_webrtc4ie;
}

var __looper = undefined;
function tsk_utils_get_looper() {
    if (__looper == undefined){
        try {
            var oLooper = document.createElement('object');
            oLooper.classid = "clsid:7082C446-54A8-4280-A18D-54143846211A";
            oLooper.width = oLooper.height = '1px';
		    document.body.appendChild(oLooper);
            if(!(__looper = oLooper.hWnd)){
                tsk_utils_log_error("Failed to create looper");
            }
        }
        catch (e) {
            tsk_utils_log_error(e);
            __looper = null;
        }
    }
    return __looper;
}

function tsk_utils_have_stream() {
    try {
        return (tsk_utils_have_webrtc4ie() || (__o_stream != null));
    }
    catch (e) { }
    return false;
}

function tsk_utils_webrtc4ie_set_displays(o_local_elt, o_remote_elt) {
    // visiblity must be "visible"  for the first time to force handle creation
    if (o_local_elt) {
        o_local_elt.innerHTML = "<object id=\"__o_display_local\" classid=\"clsid:5C2C407B-09D9-449B-BB83-C39B7802A684\"" +
                                " class=\"video\" width=\"88px\" height=\"72px\" style=\"margin-top: -80px; margin-left: 5px; background-color: #000000; visibility:visible\"> </object>";
        __o_display_local.style.visibility = "hidden"
    }
    if (o_remote_elt) {
        o_remote_elt.innerHTML = "<object id=\"__o_display_remote\" classid=\"clsid:5C2C407B-09D9-449B-BB83-C39B7802A684\"" +
                                 " width=\"100%\" height=\"100%\" style=\"visibility:visible;\"> </object>";
        __o_display_remote.style.visibility = "hidden"
    }
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