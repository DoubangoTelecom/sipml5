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
// http://tools.ietf.org/html/draft-uberti-rtcweb-jsep-02

function tmedia_session_jsep(o_mgr) {
    this.__proto__.__proto__ = new tmedia_session(tmedia_type_e.AUDIO_VIDEO, o_mgr);
    this.o_pc = null;
    this.o_local_stream = null;
    this.o_sdp_jsep_lo = null;
    this.o_sdp_lo = null;
    this.b_sdp_lo_pending = false;
    this.i_sdp_lo_version = 1;
    this.o_sdp_json_ro = null;
    this.o_sdp_ro = null;
    this.b_sdp_ro_pending = false;
    this.b_sdp_ro_offer = false;
    this.s_answererSessionId = null;
    this.s_offererSessionId = null;

    this.b_ro_changed = false;
    this.b_lo_held = false;
    this.b_ro_held = false;
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
    console.debug("PeerConnection::stop()");

    return 0;
}

tmedia_session_jsep.prototype.__get_lo = function () {
    if (!this.o_pc && !this.b_lo_held) {
        this.o_mgr.set_stream_video_local(__o_stream);

        this.o_local_stream = __o_stream;
        var This = this;
        this.o_pc = new webkitPeerConnection00("STUN stun.l.google.com:19302",
                function (o_candidate, b_moreToFollow) {
                    console.debug("__on_ice_candidate: %d", This.o_pc.iceState);
                    if (o_candidate) {
                        This.o_sdp_jsep_lo.addCandidate(o_candidate);
                    }
                    if (!b_moreToFollow) {
                        This.o_sdp_lo = tsdp_message.prototype.Parse(This.o_sdp_jsep_lo.toSdp());
                        if (This.o_sdp_lo) {
                            This.decorate_lo();
                        }
                        if (This.o_mgr) {
                            This.o_mgr.callback(tmedia_session_events_e.GET_LO_SUCCESS, This.e_type);
                        }
                        This.b_sdp_lo_pending = false;
                    }
                }
        );
        this.o_pc.o_session = this;
        this.o_pc.onstatechange = function (evt) {
            console.debug("__on_state_change");
        }
        this.o_pc.onopen = function (evt) {
            console.debug("__on_open");
        }
        this.o_pc.onaddstream = function (evt) {
            console.debug("__on_add_stream");
            this.o_session.o_remote_stream = evt.stream;
            if (this.o_session.o_mgr) {
                this.o_session.o_mgr.set_stream_video_remote(evt.stream);
            }
        }
        this.o_pc.onremovestream = function (evt) {
            console.debug("__on_remove_stream");
            this.o_pc.o_session.o_remote_stream = null;
            if (this.o_session.o_mgr) {
                this.o_session.o_mgr.set_stream_video_remote(null);
            }
        }

        this.o_pc.addStream(this.o_local_stream);
    }

    if (!this.o_sdp_lo && !this.b_sdp_lo_pending) {
        var b_start_ice = true;
        var b_answer = ((this.b_sdp_ro_pending || this.b_sdp_ro_offer) && (this.o_sdp_ro != null));

        if (this.o_pc.localDescription) {
            switch (this.o_pc.iceState) { // chrome won't restart ICE
                case webkitPeerConnection00.ICE_COMPLETED:
                case webkitPeerConnection00.FAILED:
                case webkitPeerConnection00.ICE_CLOSED:
                    b_start_ice = false;
                    break;
            }
        }

        if (this.b_sdp_ro_pending && this.o_sdp_ro) {
            this.__set_ro(this.o_sdp_ro, true);
        }

        this.o_sdp_jsep_lo = b_answer ?
            this.o_pc.createAnswer(this.o_pc.remoteDescription.toSdp(), { has_audio: (this.e_type & tmedia_type_e.AUDIO), has_video: (this.e_type & tmedia_type_e.VIDEO) }) :
            this.o_pc.createOffer({ has_audio: (this.e_type & tmedia_type_e.AUDIO), has_video: (this.e_type & tmedia_type_e.VIDEO) });

        if (!b_start_ice) {
            this.o_sdp_lo = tsdp_message.prototype.Parse(this.o_sdp_jsep_lo.toSdp());
            if (this.o_sdp_lo) {
                this.decorate_lo();
                this.o_sdp_jsep_lo = new SessionDescription(this.o_sdp_lo);
            }
        }

        if (b_answer) this.o_pc.setLocalDescription(webkitPeerConnection00.SDP_ANSWER, this.o_sdp_jsep_lo);
        else this.o_pc.setLocalDescription(webkitPeerConnection00.SDP_OFFER, this.o_sdp_jsep_lo);

        if (b_start_ice) {
            this.b_sdp_lo_pending = true;
            this.o_pc.startIce({ use_candidates: "all" });
        }
    }

    return this.o_sdp_lo;
}

tmedia_session_jsep.prototype.decorate_lo = function () {
    if (this.o_sdp_lo) {
        /* Session name for debugging */
        var o_hdr_S;
        if ((o_hdr_S = this.o_sdp_lo.get_header(tsdp_header_type_e.S))) {
            o_hdr_S.s_value = "webrtc (chrome 20.0.1127.0) - Doubango Telecom (sipML5 r000)";
        }
        /* Session version */
        var o_hdr_O;
        if ((o_hdr_O = this.o_sdp_lo.get_header(tsdp_header_type_e.O))) {
            o_hdr_O.i_sess_version = this.i_sdp_lo_version++;
        }
        /* hold / resume */
        var i_index = 0;
        var o_hdr_M;
        while ((o_hdr_M = this.o_sdp_lo.get_header_at(tsdp_header_type_e.M, i_index++))) {
            o_hdr_M.set_holdresume_att(this.b_lo_held, this.b_ro_held);
        }          
    }
    return 0;
}

tmedia_session_jsep.prototype.close = function () {
    if (this.o_mgr) { // 'onremovestream' not always called
        this.o_mgr.set_stream_video_remote(null);
        this.o_mgr.set_stream_video_local(null);
    }
    if (this.o_pc) {
        if (this.o_local_stream) {
            this.o_pc.removeStream(this.o_local_stream);
        }
        if (this.o_remote_stream) {
            this.o_pc.removeStream(this.o_remote_stream);
        }
        this.o_pc.close();
        this.o_pc = null;
        this.b_sdp_lo_pending = false;
        this.b_sdp_ro_pending = false;
    }
}

tmedia_session_jsep.prototype.__set_ro = function (o_sdp, b_is_offer) {
    if (!o_sdp) {
        console.error("Invalid argument");
        return -1;
    }

    /* update remote offer */
    this.o_sdp_ro = o_sdp;
    this.b_sdp_ro_offer = b_is_offer;

    if (this.o_pc) {
        try {
            this.o_pc.setRemoteDescription(b_is_offer ? webkitPeerConnection00.SDP_OFFER : webkitPeerConnection00.SDP_ANSWER,
                            new SessionDescription(this.o_sdp_ro));
            if (!this.b_sdp_ro_pending && b_is_offer) {
                this.o_sdp_lo = null; // to force new SDP when get_lo() is called
            }
        }
        catch (e) {
            this.o_mgr.callback(tmedia_session_events_e.SET_RO_FAILED, this.e_type);
            console.error(e);
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

tmedia_session_jsep.prototype.__acked = function () {
    return 0;
}

tmedia_session_jsep.prototype.__hold = function () {
    if (this.b_lo_held) {
        // console.warn('already on hold');
        return;
    }
    this.b_lo_held = true;

    this.close();

    this.o_sdp_ro = null;

    this.decorate_lo();

    return 0;
}

tmedia_session_jsep.prototype.__resume = function () {
    if (!this.b_lo_held) {
        // console.warn('not on hold');
        return;
    }
    this.b_lo_held = false;

    this.close();

    this.o_sdp_lo = null;
    this.o_sdp_ro = null;

    return 0;
}