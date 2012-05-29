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
// "http://tools.ietf.org/html/draft-uberti-rtcweb-jsep-02" implementation for Microsoft Internet Explorer

msPeerConnection.prototype.s_configuration = null;
msPeerConnection.prototype.f_IceCallback = null;
msPeerConnection.prototype.o_peer = null;
msPeerConnection.prototype.localDescription = null; // part of the standard
msPeerConnection.prototype.remoteDescription = null; // part of the standard

msSessionDescription.prototype.o_sdp = null;

msIceCandidate.prototype.sMedia = null;
msIceCandidate.prototype.sCandidate = null;

function msSessionDescription(s_sdp) {
    this.o_sdp = new ActiveXObject("webrtc4ie.SessionDescription");
    this.o_sdp.Init(s_sdp);
}

msSessionDescription.prototype.toSdp = function () {
    return this.o_sdp.toSdp();
}
msSessionDescription.prototype.toString = msSessionDescription.prototype.toSdp;

msSessionDescription.prototype.addCandidate = function (o_candidate) {
    this.o_sdp.addCandidate(o_candidate.sMedia, o_candidate.sCandidate);
}

function msIceCandidate(sMedia, sCandidate) {
    this.sMedia = sMedia;
    this.sCandidate = sCandidate;
}

function msPeerConnection(s_configuration, f_IceCallback) {
    var This = this;
    this.s_configuration = s_configuration;
    this.f_IceCallback = f_IceCallback;
    this.o_peer = new ActiveXObject("webrtc4ie.PeerConnection");
    this.o_peer.Init(s_configuration);

    // attach displays if defined by the user
    try { this.o_peer.localVideo = __o_display_local ? __o_display_local.hWnd : 0; } catch (e) { }
    try { this.o_peer.remoteVideo = __o_display_remote ? __o_display_remote.hWnd : 0; } catch (e) { }

    eval("function This.o_peer::IceCallback(sMedia, sCandidate, bMoreToFollow) { return This.onIceCallback (sMedia, sCandidate, bMoreToFollow); }");
};


// actions, for setLocalDescription/setRemoteDescription
msPeerConnection.SDP_OFFER = 0x100;
msPeerConnection.SDP_PRANSWER = 0x200;
msPeerConnection.SDP_ANSWER = 0x300;

// PeerConnection state
msPeerConnection.NEW = 0;     // initial state
msPeerConnection.OPENING = 1; // local or remote desc set
msPeerConnection.ACTIVE = 2;  // local and remote desc set
msPeerConnection.CLOSED = 3;  // ended state

// ICE state
msPeerConnection.ICE_GATHERING = 0x100;
msPeerConnection.ICE_WAITING = 0x200;
msPeerConnection.ICE_CHECKING = 0x300;
msPeerConnection.ICE_CONNECTED = 0x400;
msPeerConnection.ICE_COMPLETED = 0x500;
msPeerConnection.ICE_FAILED = 0x600;
msPeerConnection.ICE_CLOSED = 0x700;

// SessionDescription createOffer (MediaHints hints)
msPeerConnection.prototype.createOffer = function (o_hints) {
    return new msSessionDescription(this.o_peer.createOffer(o_hints.has_audio, o_hints.has_video));
}

// SessionDescription createAnswer (DOMString offer, MediaHints hints);
msPeerConnection.prototype.createAnswer = function (s_offer, o_hints) {
    return new msSessionDescription(this.o_peer.createAnswer(o_hints.has_audio, o_hints.has_video));
}

// void setLocalDescription (unsigned short action, SessionDescription desc);
msPeerConnection.prototype.setLocalDescription = function (i_action, o_desc) {
    this.o_peer.setLocalDescription(i_action, o_desc.toSdp());
    this.localDescription = new msSessionDescription(this.o_peer.localDescription);
}

// void setRemoteDescription (unsigned short action, SessionDescription desc);
msPeerConnection.prototype.setRemoteDescription = function (i_action, o_desc) {
    this.o_peer.setRemoteDescription(i_action, o_desc.toSdp());
    this.remoteDescription = new msSessionDescription(this.o_peer.remoteDescription);
}

// void startIce (optional IceOptions options);
msPeerConnection.prototype.startIce = function (o_options) {
    this.o_peer.startIce(0/* all */, tsk_utils_get_looper());
}

// void processIceMessage (IceCandidate candidate);
msPeerConnection.prototype.processIceMessage = function (o_candidate) {
    tsk_utils_log_error("Not implemented"); // we expect all ICE condidtes in the SDP offer (SIP)
}

// void addStream (MediaStream stream, MediaStreamHints hints);
msPeerConnection.prototype.addStream = function (o_stream, o_hints) {
}

// void removeStream (MediaStream stream);
msPeerConnection.prototype.addStream = function (o_stream) {
}

// void close()
msPeerConnection.prototype.close = function () {
    if (this.o_peer) {
        this.o_peer.close();
    }
}

msPeerConnection.prototype.onIceCallback = function (sMedia, sCandidate, bMoreToFollow) {
    tsk_utils_log_info("onIceCallback(" + sMedia + "," + sCandidate + "," + bMoreToFollow + ")");
    this.iceState = this.o_peer.iceState;
    if (this.f_IceCallback) {
        this.f_IceCallback(new msIceCandidate(sMedia, sCandidate), bMoreToFollow);
    }
}