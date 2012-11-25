/*
* Copyright (C) 2012 Doubango Telecom <http://www.doubango.org>
* License: GPLv3
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
// http://tools.ietf.org/html/draft-uberti-rtcweb-jsep-02
// JSEP00: webkitPeerConnection00 (http://www.w3.org/TR/2012/WD-webrtc-20120209/)
// JSEP01: webkitRTCPeerConnection (http://www.w3.org/TR/webrtc/), https://webrtc-demos.appspot.com/html/pc1.html

tmedia_session_jsep.prototype = Object.create(tmedia_session.prototype);
tmedia_session_jsep00.prototype = Object.create(tmedia_session_jsep.prototype);
tmedia_session_jsep01.prototype = Object.create(tmedia_session_jsep.prototype);

tmedia_session_jsep.prototype.o_pc = null;
tmedia_session_jsep.prototype.o_local_stream = null;
tmedia_session_jsep.prototype.o_sdp_jsep_lo = null;
tmedia_session_jsep.prototype.o_sdp_lo = null;
tmedia_session_jsep.prototype.b_sdp_lo_pending = false;
tmedia_session_jsep.prototype.i_sdp_lo_version = -1;
tmedia_session_jsep.prototype.o_sdp_json_ro = null;
tmedia_session_jsep.prototype.o_sdp_ro = null;
tmedia_session_jsep.prototype.b_sdp_ro_pending = false;
tmedia_session_jsep.prototype.b_sdp_ro_offer = false;
tmedia_session_jsep.prototype.s_answererSessionId = null;
tmedia_session_jsep.prototype.s_offererSessionId = null;

tmedia_session_jsep.prototype.b_ro_changed = false;
tmedia_session_jsep.prototype.b_lo_held = false;
tmedia_session_jsep.prototype.b_ro_held = false;

//
//  JSEP
//

tmedia_session_jsep.prototype.CreateInstance = function (o_mgr) {
    if (__o_peerconnection_class == window.webkitRTCPeerConnection) {
        return new tmedia_session_jsep01(o_mgr);
    }
    return new tmedia_session_jsep00(o_mgr);
}

function tmedia_session_jsep(o_mgr) {
    tmedia_session.call(this, o_mgr.e_type, o_mgr);
}

tmedia_session_jsep.prototype.__set = function (o_param) {
    return 0;
}

tmedia_session_jsep.prototype.__prepare = function () {
    return 0;
}

tmedia_session_jsep.prototype.__start = function () {
    if (this.o_local_stream) {
    }
    return 0;
}

tmedia_session_jsep.prototype.__pause = function () {
    if (this.o_local_stream) {

    }
    return 0;
}

tmedia_session_jsep.prototype.__stop = function () {
    this.close();
    this.o_sdp_lo = null;
    tsk_utils_log_info("PeerConnection::stop()");

    return 0;
}

tmedia_session_jsep.prototype.decorate_lo = function (b_inc_version) {
    if (this.o_sdp_lo) {
        /* Session name for debugging */
        var o_hdr_S;
        if ((o_hdr_S = this.o_sdp_lo.get_header(tsdp_header_type_e.S))) {
            o_hdr_S.s_value = "Doubango Telecom - PeerConnection";
        }
        /* Session version */
        var o_hdr_O;
        if (this.i_sdp_lo_version == -1) {
            this.i_sdp_lo_version = ((__o_peerconnection_class == window.webkitRTCPeerConnection) || (__o_peerconnection_class == w4aPeerConnection)) ? 2 : 1; // 1: google-ice, 2: standard-ice
        }
        if ((o_hdr_O = this.o_sdp_lo.get_header(tsdp_header_type_e.O))) {
            o_hdr_O.i_sess_version = this.i_sdp_lo_version;
            if (b_inc_version) {
                ++this.i_sdp_lo_version;
            }
        }
        /* Remove 'video' media if not enabled (bug in chrome: doesn't honor 'has_video' parameter) */
        if (/*!this.o_sdp_ro &&*/!(this.e_type.i_id & tmedia_type_e.VIDEO.i_id)) {
            this.o_sdp_lo.remove_media("video");
        }
        /* hold / resume */
        var i_index = 0;
        var o_hdr_M;
        while ((o_hdr_M = this.o_sdp_lo.get_header_at(tsdp_header_type_e.M, i_index++))) {
            // o_hdr_M.s_proto = "RTP/SAVP";
            o_hdr_M.set_holdresume_att(this.b_lo_held, this.b_ro_held);
        }
    }
    return 0;
}

tmedia_session_jsep.prototype.decorate_ro = function (b_remove_bundle) {
    if (this.o_sdp_ro) {
        var o_hdr_M;
        var i_index = 0;

        // FIXME: Chrome fails to parse SDP with global SDP "a=" attributes
        // Chrome 21.0.1154.0+ generate "a=group:BUNDLE audio video" but cannot parse it
        // In fact, new the attribute is left the ice callback is called twice and the 2nd one trigger new INVITE then 200OK. The SYN_ERR is caused by the SDP in the 200 OK.
        // Is it because of "a=rtcp:1 IN IP4 0.0.0.0"?
        if (b_remove_bundle) {
            this.o_sdp_ro.remove_header(tsdp_header_type_e.A);
        }

        // change profile if not secure
        while ((o_hdr_M = this.o_sdp_ro.get_header_at(tsdp_header_type_e.M, i_index++))) {
            if (o_hdr_M.s_proto.indexOf("SAVP") < 0) {
                for (var i = 0; i < o_hdr_M.ao_hdr_A.length; ++i) {
                    if (o_hdr_M.ao_hdr_A[i].s_field == "crypto") {
                        o_hdr_M.s_proto = "RTP/SAVPF";
                        break;
                    }
                }
            }
        }
    }
    return 0;
}

tmedia_session_jsep.prototype.subscribe_stream_events = function () {
    if (this.o_pc) {
        this.o_pc.onstatechange = function (evt) {
            tsk_utils_log_info("__on_state_change");
        }
        this.o_pc.onopen = function (evt) {
            tsk_utils_log_info("__on_open");
        }
        this.o_pc.onaddstream = function (evt) {
            tsk_utils_log_info("__on_add_stream");
            this.o_session.o_remote_stream = evt.stream;
            if (this.o_session.o_mgr) {
                this.o_session.o_mgr.set_stream_video_remote(evt.stream);
            }
        }
        this.o_pc.onremovestream = function (evt) {
            tsk_utils_log_info("__on_remove_stream");
            this.o_pc.o_session.o_remote_stream = null;
            if (this.o_session.o_mgr) {
                this.o_session.o_mgr.set_stream_video_remote(null);
            }
        }

        this.o_pc.addStream(this.o_local_stream);
    }
}

tmedia_session_jsep.prototype.close = function () {
    if (this.o_mgr) { // 'onremovestream' not always called
        this.o_mgr.set_stream_video_remote(null);
        this.o_mgr.set_stream_video_local(null);
    }
    if (this.o_pc) {
        /*if (this.o_local_stream) {
            this.o_pc.removeStream(this.o_local_stream);
        }
        if (this.o_remote_stream) {
            this.o_pc.removeStream(this.o_remote_stream);
        }*/
        this.o_pc.close();
        this.o_pc = null;
        this.b_sdp_lo_pending = false;
        this.b_sdp_ro_pending = false;
    }
}

tmedia_session_jsep.prototype.__acked = function () {
    return 0;
}

tmedia_session_jsep.prototype.__hold = function () {
    if (this.b_lo_held) {
        // tsk_utils_log_warn('already on hold');
        return;
    }
    this.b_lo_held = true;

    this.close();

    this.o_sdp_ro = null;

    this.decorate_lo(true);

    return 0;
}

tmedia_session_jsep.prototype.__resume = function () {
    if (!this.b_lo_held) {
        // tsk_utils_log_warn('not on hold');
        return;
    }
    this.b_lo_held = false;

    this.close();

    this.o_sdp_lo = null;
    this.o_sdp_ro = null;

    return 0;
}


//
//  JSEP00
//

function tmedia_session_jsep00(o_mgr) {
    tmedia_session_jsep.call(this, o_mgr);
}

tmedia_session_jsep00.prototype.__get_lo = function () {
    if (!this.o_pc && !this.b_lo_held) {
        this.o_mgr.set_stream_video_local(__o_stream);

        this.o_local_stream = __o_stream;
        var This = this;

        // "__o_peerconnection_class" is equal to "webkitPeerConnection00 || webkitPeerConnection" on chrome and "w4aPeerConnection" on IE
        this.o_pc = new __o_peerconnection_class("STUN stun.l.google.com:19302",
                function (o_candidate, b_moreToFollow) {
                    // tsk_utils_log_info("__on_ice_candidate: " + (o_candidate ? o_candidate.toSdp() : "null"));
                    if (o_candidate) {
                        This.o_sdp_jsep_lo.addCandidate(o_candidate);
                    }
                    if (!b_moreToFollow) {
                        This.o_sdp_lo = tsdp_message.prototype.Parse(This.o_sdp_jsep_lo.toSdp());
                        if (This.o_sdp_lo) {
                            This.decorate_lo(true);
                        }
                        if (This.o_mgr) {
                            This.o_mgr.callback(tmedia_session_events_e.GET_LO_SUCCESS, This.e_type);
                        }
                        This.b_sdp_lo_pending = false;
                    }
                }
        );
        this.o_pc.o_session = this;
        this.subscribe_stream_events();
    }

    if (!this.o_sdp_lo && !this.b_sdp_lo_pending) {
        var b_start_ice = true;
        var b_answer = ((this.b_sdp_ro_pending || this.b_sdp_ro_offer) && (this.o_sdp_ro != null));

        if (this.o_pc.localDescription) {
            switch (this.o_pc.iceState) { // chrome won't restart ICE
                case __o_peerconnection_class.ICE_COMPLETED:
                case __o_peerconnection_class.ICE_FAILED:
                case __o_peerconnection_class.ICE_CLOSED:
                    b_start_ice = false;
                    break;
            }
        }

        if (this.b_sdp_ro_pending && this.o_sdp_ro) {
            this.__set_ro(this.o_sdp_ro, true);
        }

        this.o_sdp_jsep_lo = b_answer ?
            this.o_pc.createAnswer(this.o_pc.remoteDescription.toSdp(), { has_audio: !!(this.e_type.i_id & tmedia_type_e.AUDIO.i_id), has_video: !!(this.e_type.i_id & tmedia_type_e.VIDEO.i_id) }) :
            this.o_pc.createOffer({ has_audio: !!(this.e_type.i_id & tmedia_type_e.AUDIO.i_id), has_video: !!(this.e_type.i_id & tmedia_type_e.VIDEO.i_id) });

        if (!b_start_ice) {
            this.o_sdp_lo = tsdp_message.prototype.Parse(this.o_sdp_jsep_lo.toSdp());
            if (this.o_sdp_lo) {
                this.decorate_lo(false);
                this.o_sdp_jsep_lo = new __o_sessiondescription_class(this.o_sdp_lo);
            }
        }

        this.o_pc.setLocalDescription(b_answer ? __o_peerconnection_class.SDP_ANSWER : __o_peerconnection_class.SDP_OFFER,
                this.o_sdp_jsep_lo);

        if (b_start_ice) {
            this.b_sdp_lo_pending = true;
            this.o_pc.startIce({ use_candidates: "all" });
        }
    }

    return this.o_sdp_lo;
}

tmedia_session_jsep00.prototype.__set_ro = function (o_sdp, b_is_offer) {
    if (!o_sdp) {
        tsk_utils_log_error("Invalid argument");
        return -1;
    }

    /* update remote offer */
    this.o_sdp_ro = o_sdp;
    this.b_sdp_ro_offer = b_is_offer;

    if (this.o_pc) {
        try {
            //console.debug("SDP_RO=%s", this.o_sdp_ro.toString());
            this.decorate_ro(true);
            this.o_pc.setRemoteDescription(b_is_offer ? __o_peerconnection_class.SDP_OFFER : __o_peerconnection_class.SDP_ANSWER,
                            new __o_sessiondescription_class(this.o_sdp_ro.toString()));
            if (!this.b_sdp_ro_pending && b_is_offer) {
                this.o_sdp_lo = null; // to force new SDP when get_lo() is called
            }
        }
        catch (e) {
            this.o_mgr.callback(tmedia_session_events_e.SET_RO_FAILED, this.e_type);
            tsk_utils_log_error(e);
            return -2;
        }
        finally {
            this.b_sdp_ro_pending = false;
        }
    }
    else {
        this.b_sdp_ro_pending = true;
    }

    return 0;
}

//
//  JSEP01
//

function tmedia_session_jsep01(o_mgr) {
    tmedia_session_jsep.call(this, o_mgr);
    // FIXME: fails on Canary. WHY?
    // this.o_media_constraints = { 'OfferToReceiveAudio': !!(this.e_type.i_id & tmedia_type_e.AUDIO.i_id), 'OfferToReceiveVideo': !!(this.e_type.i_id & tmedia_type_e.VIDEO.i_id) };
}

tmedia_session_jsep01.prototype.__get_lo = function () {
    var This = this;
    if (!this.o_pc && !this.b_lo_held) {
        this.o_mgr.set_stream_video_local(__o_stream);

        this.o_local_stream = __o_stream;

        this.o_pc = new __o_peerconnection_class(
                { iceServers: [{ url: 'stun:stun.l.google.com:19302'}] },
                this.o_media_constraints
        );
        this.o_pc.onicecandidate = function (o_event) {
            tsk_utils_log_info("onicecandidate = " + This.o_pc.iceState);
            // if (o_event && o_event.candidate) {
            //    This.o_pc.addIceCandidate(new __o_iceCandidate_class(o_event.candidate));
            // }
            if (This.o_pc.iceState == "completed" || (o_event && !o_event.candidate)) {
                tsk_utils_log_info("ICE GATHERING COMPLETED!");
                if (This.o_pc.localDescription) {
                    This.o_sdp_jsep_lo = This.o_pc.localDescription;
                    This.o_sdp_lo = tsdp_message.prototype.Parse(This.o_sdp_jsep_lo.sdp);
                    This.decorate_lo(true);
                    if (This.o_mgr) {
                        This.o_mgr.callback(tmedia_session_events_e.GET_LO_SUCCESS, This.e_type);
                    }
                    This.b_sdp_lo_pending = false;
                }
            }
            else if (This.o_pc.iceState == "failed") {
                This.o_mgr.callback(tmedia_session_events_e.SET_RO_FAILED, This.e_type);
                tsk_utils_log_error("Ice state is 'failed'");
            }
        }

        this.o_pc.o_session = this;
        this.subscribe_stream_events();
    }

    if (!this.o_sdp_lo && !this.b_sdp_lo_pending) {
        var b_answer = ((this.b_sdp_ro_pending || this.b_sdp_ro_offer) && (this.o_sdp_ro != null));

        if (this.b_sdp_ro_pending && this.o_sdp_ro) {
            this.__set_ro(this.o_sdp_ro, true);
        }

        if (b_answer) {
            this.o_pc.createAnswer(
                function (desc) {
                    This.o_pc.setLocalDescription(desc);
                },
                function (s_error) {
                    This.o_mgr.callback(tmedia_session_events_e.GET_LO_FAILED, This.e_type);
                    tsk_utils_log_error(s_error);
                },
                this.o_media_constraints,
                false // createProvisionalAnswer
             );
        }
        else {
            this.o_pc.createOffer(
                function (desc) {
                    This.o_pc.setLocalDescription(desc);
                },
                function (s_error) {
                    This.o_mgr.callback(tmedia_session_events_e.SET_RO_FAILED, This.e_type);
                    tsk_utils_log_error(s_error);
                },
                this.o_media_constraints
            );

        }
    }

    return this.o_sdp_lo;
}

tmedia_session_jsep01.prototype.__set_ro = function (o_sdp, b_is_offer) {
    if (!o_sdp) {
        tsk_utils_log_error("Invalid argument");
        return -1;
    }

    /* update remote offer */
    this.o_sdp_ro = o_sdp;
    this.b_sdp_ro_offer = b_is_offer;

    if (this.o_pc) {
        try {
            var This = this;
            this.decorate_ro(false);
            
            this.o_pc.setRemoteDescription(
                        new __o_sessiondescription_class({ type: b_is_offer ? "offer" : "answer", sdp : This.o_sdp_ro.toString() }),
                        function () { // success callback
                            if (!This.b_sdp_ro_pending && b_is_offer) {
                                This.o_sdp_lo = null; // to force new SDP when get_lo() is called
                            }
                        },
                        function (s_error) { // error callback
                            This.o_mgr.callback(tmedia_session_events_e.SET_RO_FAILED, This.e_type);
                            tsk_utils_log_error(s_error);
                        }
            );
        }
        catch (e) {
            this.o_mgr.callback(tmedia_session_events_e.SET_RO_FAILED, this.e_type);
            tsk_utils_log_error(e);
            return -2;
        }
        finally {
            this.b_sdp_ro_pending = false;
        }
    }
    else {
        this.b_sdp_ro_pending = true;
    }

    return 0;
}