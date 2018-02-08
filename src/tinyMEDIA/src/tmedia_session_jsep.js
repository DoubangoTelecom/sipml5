/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
// http://tools.ietf.org/html/draft-uberti-rtcweb-jsep-02
// JSEP00: webkitPeerConnection00 (http://www.w3.org/TR/2012/WD-webrtc-20120209/)
// JSEP01: webkitRTCPeerConnection (http://www.w3.org/TR/webrtc/), https://webrtc-demos.appspot.com/html/pc1.html
// Mozilla: http://mozilla.github.com/webrtc-landing/pc_test.html
// Contraints: https://webrtc-demos.appspot.com/html/constraints-and-stats.html
// Android: https://groups.google.com/group/discuss-webrtc/browse_thread/thread/b8538c85df801b40
// Canary 'muted': https://groups.google.com/group/discuss-webrtc/browse_thread/thread/8200f2049c4de29f
// Canary state events: https://groups.google.com/group/discuss-webrtc/browse_thread/thread/bd30afc3e2f43f6d
// DTMF: https://groups.google.com/group/discuss-webrtc/browse_thread/thread/1354781f202adbf9
// IceRestart: https://groups.google.com/group/discuss-webrtc/browse_thread/thread/c189584d380eaa97
// Video Resolution: https://code.google.com/p/chromium/issues/detail?id=143631#c9
// Webrtc-Everywhere: https://github.com/sarandogou/webrtc-everywhere
// Adapter.js: https://github.com/sarandogou/webrtc

tmedia_session_jsep.prototype = Object.create(tmedia_session.prototype);
tmedia_session_jsep01.prototype = Object.create(tmedia_session_jsep.prototype);

tmedia_session_jsep.prototype.o_pc = null;
tmedia_session_jsep.prototype.b_cache_stream = false;
tmedia_session_jsep.prototype.o_local_stream = null;
tmedia_session_jsep.prototype.o_sdp_jsep_lo = null;
tmedia_session_jsep.prototype.o_sdp_lo = null;
tmedia_session_jsep.prototype.b_sdp_lo_pending = false;
tmedia_session_jsep.prototype.o_sdp_json_ro = null;
tmedia_session_jsep.prototype.o_sdp_ro = null;
tmedia_session_jsep.prototype.b_sdp_ro_pending = false;
tmedia_session_jsep.prototype.b_sdp_ro_offer = false;
tmedia_session_jsep.prototype.s_answererSessionId = null;
tmedia_session_jsep.prototype.s_offererSessionId = null;
tmedia_session_jsep.prototype.ao_ice_servers = null;
tmedia_session_jsep.prototype.o_bandwidth = { audio: undefined, video: undefined };
tmedia_session_jsep.prototype.o_video_size = { minWidth: undefined, minHeight: undefined, maxWidth: undefined, maxHeight: undefined };
tmedia_session_jsep.prototype.d_screencast_windowid = 0; // BFCP. #0 means entire desktop

tmedia_session_jsep.prototype.b_ro_changed = false;
tmedia_session_jsep.prototype.b_lo_held = false;
tmedia_session_jsep.prototype.b_ro_held = false;

//
//  JSEP
//

tmedia_session_jsep.prototype.CreateInstance = function (o_mgr) {
    return new tmedia_session_jsep01(o_mgr);
}

function tmedia_session_jsep(o_mgr) {
    tmedia_session.call(this, o_mgr.e_type, o_mgr);
}

tmedia_session_jsep.prototype.__set = function (o_param) {
    if (!o_param) {
        return -1;
    }
    switch (o_param.s_key) {
        case 'ice-servers':
            {
                this.ao_ice_servers = o_param.o_value;
                return 0;
            }
        case 'cache-stream':
            {
                this.b_cache_stream = !!o_param.o_value;
                return 0;
            }
        case 'bandwidth':
            {
                this.o_bandwidth = o_param.o_value;
                return 0;
            }
        case 'video-size':
            {
                this.o_video_size = o_param.o_value;
                return 0;
            }
        case 'screencast-windowid':
            {
                this.d_screencast_windowid = parseFloat(o_param.o_value.toString());
                if (this.o_pc && this.o_pc.setScreencastSrcWindowId) {
                    this.o_pc.setScreencastSrcWindowId(this.d_screencast_windowid);
                }
                return 0;
            }
        case 'mute-audio':
        case 'mute-video':
            {
                if (this.o_pc && typeof o_param.o_value == "boolean") {
                    if (this.o_pc.mute) {
                        this.o_pc.mute((o_param.s_key === 'mute-audio') ? "audio" : "video", o_param.o_value);
                    }
                    else if (this.o_local_stream) {
                        var tracks = (o_param.s_key === 'mute-audio') ? this.o_local_stream.getAudioTracks() : this.o_local_stream.getVideoTracks();
                        if (tracks) {
                            for (var i = 0; i < tracks.length; ++i) {
                                tracks[i].enabled = !o_param.o_value;
                            }
                        }
                    }
                }
            }
    }

    return -2;
}

tmedia_session_jsep.prototype.__prepare = function () {
    return 0;
}

tmedia_session_jsep.prototype.__set_media_type = function (e_type) {
    if (e_type != this.e_type) {
        this.e_type = e_type;
        this.o_sdp_lo = null;
    }
    return 0;
}

tmedia_session_jsep.prototype.__processContent = function (s_req_name, s_content_type, s_content_ptr, i_content_size) {
    if (this.o_pc && this.o_pc.processContent) {
        this.o_pc.processContent(s_req_name, s_content_type, s_content_ptr, i_content_size);
        return 0;
    }
    return -1;
}

tmedia_session_jsep.prototype.__send_dtmf = function (s_digit) {
    if (this.o_pc && this.o_pc.sendDTMF) {
        this.o_pc.sendDTMF(s_digit);
        return 0;
    }
    return -1;
}

tmedia_session_jsep.prototype.__start = function () {
    if (this.o_local_stream && this.o_local_stream.start) {
        // cached stream would be stopped in close()
        this.o_local_stream.start();
    }
    return 0;
}

tmedia_session_jsep.prototype.__pause = function () {
    if (this.o_local_stream && this.o_local_stream.pause) {
        this.o_local_stream.pause();
    }
    return 0;
}

tmedia_session_jsep.prototype.__stop = function () {
    this.close();
    this.o_sdp_lo = null;
    tsk_utils_log_info("PeerConnection::stop()");

    return 0;
}

tmedia_session_jsep.prototype.decorate_lo = function () {
    if (this.o_sdp_lo) {
        /* Session name for debugging - Requires by webrtc2sip to set RTCWeb type */
        var o_hdr_S;
        if ((o_hdr_S = this.o_sdp_lo.get_header(tsdp_header_type_e.S))) {
            o_hdr_S.s_value = "Doubango Telecom - " + tsk_utils_get_navigator_friendly_name();
        }
        /* HACK: https://bugzilla.mozilla.org/show_bug.cgi?id=1072384 */
        var o_hdr_O;
        if ((o_hdr_O = this.o_sdp_lo.get_header(tsdp_header_type_e.O))) {
            if (o_hdr_O.s_addr === "0.0.0.0") {
                o_hdr_O.s_addr = "127.0.0.1";
            }
        }

        /* Remove 'video' media if not enabled (bug in chrome: doesn't honor 'has_video' parameter) */
        if (!(this.e_type.i_id & tmedia_type_e.VIDEO.i_id)) {
            this.o_sdp_lo.remove_media("video");
        }
        /* hold / resume, profile, bandwidth... */
        var i_index = 0;
        var o_hdr_M;
        var b_fingerprint = !!this.o_sdp_lo.get_header_a("fingerprint"); // session-level fingerprint
        while ((o_hdr_M = this.o_sdp_lo.get_header_at(tsdp_header_type_e.M, i_index++))) {
            // hold/resume
            o_hdr_M.set_holdresume_att(this.b_lo_held, this.b_ro_held);

            // HACK: Nightly 20.0a1 uses RTP/SAVPF for DTLS-SRTP which is not correct. More info at https://bugzilla.mozilla.org/show_bug.cgi?id=827932.
            if (o_hdr_M.find_a("crypto")) {
                o_hdr_M.s_proto = "RTP/SAVPF";
            }
            else if (b_fingerprint || o_hdr_M.find_a("fingerprint")) {
                o_hdr_M.s_proto = "UDP/TLS/RTP/SAVPF";
            }

            // HACK: https://bugzilla.mozilla.org/show_bug.cgi?id=1072384
            if (o_hdr_M.o_hdr_C && o_hdr_M.o_hdr_C.s_addr === "0.0.0.0") {
                o_hdr_M.o_hdr_C.s_addr = "127.0.0.1";
            }

            // bandwidth
            if (this.o_bandwidth) {
                if (this.o_bandwidth.audio && o_hdr_M.s_media.toLowerCase() == "audio") {
                    o_hdr_M.add_header(new tsdp_header_B("AS:" + this.o_bandwidth.audio));
                }
                else if (this.o_bandwidth.video && o_hdr_M.s_media.toLowerCase() == "video") {
                    o_hdr_M.add_header(new tsdp_header_B("AS:" + this.o_bandwidth.video));
                }
            }
        }
    }
    return 0;
}

tmedia_session_jsep.prototype.decorate_ro = function (b_remove_bundle) {
    if (this.o_sdp_ro) {
        var o_hdr_M, o_hdr_A;
        var i_index = 0, i;

        // FIXME: Chrome fails to parse SDP with global SDP "a=" attributes
        // Chrome 21.0.1154.0+ generate "a=group:BUNDLE audio video" but cannot parse it
        // In fact, new the attribute is left the ice callback is called twice and the 2nd one trigger new INVITE then 200OK. The SYN_ERR is caused by the SDP in the 200 OK.
        // Is it because of "a=rtcp:1 IN IP4 0.0.0.0"?
        if (b_remove_bundle) {
            this.o_sdp_ro.remove_header(tsdp_header_type_e.A);
        }

        // ==== START: RFC5939 utility functions ==== //
        var rfc5939_get_acap_part = function (o_hdr_a, i_part/* i_part = 1: field, 2: value*/) {
            var ao_match = o_hdr_a.s_value.match(/^\d\s+(\w+):([\D|\d]+)/i);
            if (ao_match && ao_match.length == 3) {
                return ao_match[i_part];
            }
        }
        var rfc5939_acap_ensure = function (o_hdr_a) {
            if (o_hdr_a && o_hdr_a.s_field == "acap") {
                o_hdr_a.s_field = rfc5939_get_acap_part(o_hdr_a, 1);
                o_hdr_a.s_value = rfc5939_get_acap_part(o_hdr_a, 2);
            }
        }
        var rfc5939_get_headerA_at = function (o_msg, s_media, s_field, i_index) {
            var i_pos = 0;
            var get_headerA_at = function (o_sdp, s_field, i_index) {
                if (o_sdp) {
                    var ao_headersA = (o_sdp.ao_headers || o_sdp.ao_hdr_A);
                    for (var i = 0; i < ao_headersA.length; ++i) {
                        if (ao_headersA[i].e_type == tsdp_header_type_e.A && ao_headersA[i].s_value) {
                            var b_found = (ao_headersA[i].s_field === s_field);
                            if (!b_found && ao_headersA[i].s_field == "acap") {
                                b_found = (rfc5939_get_acap_part(ao_headersA[i], 1) == s_field);
                            }
                            if (b_found && i_pos++ >= i_index) {
                                return ao_headersA[i];
                            }
                        }
                    }
                }
            }

            var o_hdr_a = get_headerA_at(o_msg, s_field, i_index); // find at session level
            if (!o_hdr_a) {
                return get_headerA_at(o_msg.get_header_m_by_name(s_media), s_field, i_index); // find at media level
            }
            return o_hdr_a;
        }
        // ==== END: RFC5939 utility functions ==== //

        // change profile if not secure
        //!\ firefox nighly: DTLS-SRTP only, chrome: SDES-SRTP
        var b_fingerprint = !!this.o_sdp_ro.get_header_a("fingerprint"); // session-level fingerprint
        while ((o_hdr_M = this.o_sdp_ro.get_header_at(tsdp_header_type_e.M, i_index++))) {
            // check for "crypto:"/"fingerprint:" lines (event if it's not valid to provide "crypto" lines in non-secure SDP many clients do it, so, just check)
            if (o_hdr_M.s_proto.indexOf("SAVP") < 0) {
                if (o_hdr_M.find_a("crypto")) {
                    o_hdr_M.s_proto = "RTP/SAVPF";
                    break;
                }
                else if (b_fingerprint || o_hdr_M.find_a("fingerprint")) {
                    o_hdr_M.s_proto = "UDP/TLS/RTP/SAVPF";
                    break;
                }
            }

            // rfc5939: "acap:fingerprint,setup,connection"
            if (o_hdr_M.s_proto.indexOf("SAVP") < 0) {
                if ((o_hdr_A = rfc5939_get_headerA_at(this.o_sdp_ro, o_hdr_M.s_media, "fingerprint", 0))) {
                    rfc5939_acap_ensure(o_hdr_A);
                    if ((o_hdr_A = rfc5939_get_headerA_at(this.o_sdp_ro, o_hdr_M.s_media, "setup", 0))) {
                        rfc5939_acap_ensure(o_hdr_A);
                    }
                    if ((o_hdr_A = rfc5939_get_headerA_at(this.o_sdp_ro, o_hdr_M.s_media, "connection", 0))) {
                        rfc5939_acap_ensure(o_hdr_A);
                    }
                    o_hdr_M.s_proto = "UDP/TLS/RTP/SAVP";
                }
            }
            // rfc5939: "acap:crypto". Only if DTLS is OFF
            if (o_hdr_M.s_proto.indexOf("SAVP") < 0) {
                i = 0;
                while ((o_hdr_A = rfc5939_get_headerA_at(this.o_sdp_ro, o_hdr_M.s_media, "crypto", i++))) {
                    rfc5939_acap_ensure(o_hdr_A);
                    o_hdr_M.s_proto = "RTP/SAVPF";
                    // do not break => find next "acap:crypto" lines and ensure them
                }
            }

            // HACK: Nightly 20.0a1 uses RTP/SAVPF for DTLS-SRTP which is not correct. More info at https://bugzilla.mozilla.org/show_bug.cgi?id=827932
            // Same for chrome: https://code.google.com/p/sipml5/issues/detail?id=92
            if (o_hdr_M.s_proto.indexOf("UDP/TLS/RTP/SAVP") != -1) {
                o_hdr_M.s_proto = "RTP/SAVPF";
            }
        }
    }
    return 0;
}

tmedia_session_jsep.prototype.subscribe_stream_events = function () {
    if (this.o_pc) {
        var This = (tmedia_session_jsep01.mozThis || this);
        this.o_pc.onaddstream = function (evt) {
            tsk_utils_log_info("__on_add_stream");
            This.o_remote_stream = evt.stream;
            if (This.o_mgr) {
                This.o_mgr.set_stream_remote(evt.stream);
            }
        }
        this.o_pc.onremovestream = function (evt) {
            tsk_utils_log_info("__on_remove_stream");
            This.o_remote_stream = null;
            if (This.o_mgr) {
                This.o_mgr.set_stream_remote(null);
            }
        }
    }
}

tmedia_session_jsep.prototype.close = function () {
    if (this.o_mgr) { // 'onremovestream' not always called
        this.o_mgr.set_stream_remote(null);
        this.o_mgr.set_stream_local(null);
    }
    if (this.o_pc) {
        if (this.o_local_stream) {
            // TODO: On Firefox 26: Error: "removeStream not implemented yet"
            try { this.o_pc.removeStream(this.o_local_stream); } catch (e) { tsk_utils_log_error(e); }
            if (!this.b_cache_stream || (this.e_type == tmedia_type_e.SCREEN_SHARE)) { // only stop if caching is disabled or screenshare
                try {
                    var tracks = this.o_local_stream.getTracks();
                    for (var track in tracks) {
                        tracks[track].stop();
                    }
                } catch (e) { tsk_utils_log_error(e); }
                try { this.o_local_stream.stop(); } catch (e) { } // Deprecated in Chrome 45: https://github.com/DoubangoTelecom/sipml5/issues/231
            }
            this.o_local_stream = null;
        }
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

    this.o_sdp_ro = null;
    this.o_sdp_lo = null;

    if (this.o_pc && this.o_local_stream) {
        this.o_pc.removeStream(this.o_local_stream);
    }

    return 0;
}

tmedia_session_jsep.prototype.__resume = function () {
    if (!this.b_lo_held) {
        // tsk_utils_log_warn('not on hold');
        return;
    }
    this.b_lo_held = false;

    this.o_sdp_lo = null;
    this.o_sdp_ro = null;

    if (this.o_pc && this.o_local_stream) {
        this.o_pc.addStream(this.o_local_stream);
    }

    return 0;
}

//
//  JSEP01
//

function tmedia_session_jsep01(o_mgr) {
    tmedia_session_jsep.call(this, o_mgr);
    this.o_media_constraints =
    {
        'mandatory':
          {
              'OfferToReceiveAudio': !!(this.e_type.i_id & tmedia_type_e.AUDIO.i_id),
              'OfferToReceiveVideo': !!(this.e_type.i_id & tmedia_type_e.VIDEO.i_id)
          }
    };

    if (tsk_utils_get_navigator_friendly_name() == 'firefox') {
        tmedia_session_jsep01.mozThis = this; // FIXME: no longer needed? At least not needed on FF 34.05
        this.o_media_constraints.mandatory.MozDontOfferDataChannel = true;
    }
}

tmedia_session_jsep01.mozThis = undefined;

tmedia_session_jsep01.onGetUserMediaSuccess = function (o_stream, _This) {
    tsk_utils_log_info("onGetUserMediaSuccess");
    var This = (tmedia_session_jsep01.mozThis || _This);
    if (This && This.o_pc && This.o_mgr) {
        if (!This.b_sdp_lo_pending) {
            tsk_utils_log_warn("onGetUserMediaSuccess but no local sdp request is pending");
            return;
        }

        if (o_stream) {
            // save stream other next calls
            if (o_stream.getAudioTracks().length > 0 && o_stream.getVideoTracks().length == 0) {
                __o_jsep_stream_audio = o_stream;
            }
            else if (o_stream.getAudioTracks().length > 0 && o_stream.getVideoTracks().length > 0) {
                __o_jsep_stream_audiovideo = o_stream;
            }

            if (!This.o_local_stream) {
                This.o_mgr.callback(tmedia_session_events_e.STREAM_LOCAL_ACCEPTED, this.e_type);
            }

            // HACK: Firefox only allows to call gum one time
            if (tmedia_session_jsep01.mozThis) {
                __o_jsep_stream_audiovideo = __o_jsep_stream_audio = o_stream;
            }

            This.o_local_stream = o_stream;
            This.o_pc.addStream(o_stream);
        }
        else {
            // Probably call held
        }
        This.o_mgr.set_stream_local(o_stream);

        var b_answer = ((This.b_sdp_ro_pending || This.b_sdp_ro_offer) && (This.o_sdp_ro != null));
        if (b_answer) {
            tsk_utils_log_info("createAnswer");
            This.o_pc.createAnswer(
                tmedia_session_jsep01.mozThis ? tmedia_session_jsep01.onCreateSdpSuccess : function (o_offer) { tmedia_session_jsep01.onCreateSdpSuccess(o_offer, This); },
                tmedia_session_jsep01.mozThis ? tmedia_session_jsep01.onCreateSdpError : function (s_error) { tmedia_session_jsep01.onCreateSdpError(s_error, This); },
                This.o_media_constraints,
                false // createProvisionalAnswer
             );
        }
        else {
            tsk_utils_log_info("createOffer");
            This.o_pc.createOffer(
                tmedia_session_jsep01.mozThis ? tmedia_session_jsep01.onCreateSdpSuccess : function (o_offer) { tmedia_session_jsep01.onCreateSdpSuccess(o_offer, This); },
                tmedia_session_jsep01.mozThis ? tmedia_session_jsep01.onCreateSdpError : function (s_error) { tmedia_session_jsep01.onCreateSdpError(s_error, This); },
                This.o_media_constraints
            );
        }
    }
}

tmedia_session_jsep01.onGetUserMediaError = function (s_error, _This) {
    tsk_utils_log_info("onGetUserMediaError");
    var This = (tmedia_session_jsep01.mozThis || _This);
    if (This && This.o_mgr) {
        tsk_utils_log_error(s_error);
        This.o_mgr.callback(tmedia_session_events_e.STREAM_LOCAL_REFUSED, This.e_type);
    }
}

tmedia_session_jsep01.onCreateSdpSuccess = function (o_sdp, _This) {
    tsk_utils_log_info("onCreateSdpSuccess");
    var This = (tmedia_session_jsep01.mozThis || _This);
    if (This && This.o_pc) {
        This.o_pc.setLocalDescription(o_sdp,
            tmedia_session_jsep01.mozThis ? tmedia_session_jsep01.onSetLocalDescriptionSuccess : function () { tmedia_session_jsep01.onSetLocalDescriptionSuccess(This); },
            tmedia_session_jsep01.mozThis ? tmedia_session_jsep01.onSetLocalDescriptionError : function (s_error) { tmedia_session_jsep01.onSetLocalDescriptionError(s_error, This); }
        );
    }
}

tmedia_session_jsep01.onCreateSdpError = function (s_error, _This) {
    tsk_utils_log_info("onCreateSdpError");
    var This = (tmedia_session_jsep01.mozThis || _This);
    if (This && This.o_mgr) {
        tsk_utils_log_error(s_error);
        This.o_mgr.callback(tmedia_session_events_e.GET_LO_FAILED, This.e_type);
    }
}

tmedia_session_jsep01.onSetLocalDescriptionSuccess = function (_This) {
    tsk_utils_log_info("onSetLocalDescriptionSuccess");
    var This = (tmedia_session_jsep01.mozThis || _This);
    if (This && This.o_pc) {
        if ((This.o_pc.iceGatheringState || This.o_pc.iceState) === "complete") {
            tmedia_session_jsep01.onIceGatheringCompleted(This);
        }
        This.b_sdp_ro_offer = false; // reset until next incoming RO
    }
}

tmedia_session_jsep01.onSetLocalDescriptionError = function (s_error, _This) {
    tsk_utils_log_info("onSetLocalDescriptionError");
    var This = (tmedia_session_jsep01.mozThis || _This);
    if (This && This.o_mgr) {
        tsk_utils_log_error(s_error.toString());
        This.o_mgr.callback(tmedia_session_events_e.GET_LO_FAILED, This.e_type);
    }
}

tmedia_session_jsep01.onSetRemoteDescriptionSuccess = function (_This) {
    tsk_utils_log_info("onSetRemoteDescriptionSuccess");
    var This = (tmedia_session_jsep01.mozThis || _This);
    if (This) {
        if (!This.b_sdp_ro_pending && This.b_sdp_ro_offer) {
            This.o_sdp_lo = null; // to force new SDP when get_lo() is called
        }
    }
}

tmedia_session_jsep01.onSetRemoteDescriptionError = function (s_error, _This) {
    tsk_utils_log_info("onSetRemoteDescriptionError");
    var This = (tmedia_session_jsep01.mozThis || _This);
    if (This) {
        This.o_mgr.callback(tmedia_session_events_e.SET_RO_FAILED, This.e_type);
        tsk_utils_log_error(s_error);
    }
}

tmedia_session_jsep01.onIceGatheringCompleted = function (_This) {
    tsk_utils_log_info("onIceGatheringCompleted");
    var This = (tmedia_session_jsep01.mozThis || _This);
    if (This && This.o_pc) {
        if (!This.b_sdp_lo_pending) {
            tsk_utils_log_warn("onIceGatheringCompleted but no local sdp request is pending");
            return;
        }
        This.b_sdp_lo_pending = false;
        // HACK: Firefox Nightly 20.0a1(2013-01-08): PeerConnection.localDescription has a wrong value (remote sdp). More info at https://bugzilla.mozilla.org/show_bug.cgi?id=828235
        var localDescription = (This.localDescription || This.o_pc.localDescription);
        if (localDescription) {
            This.o_sdp_jsep_lo = localDescription;
            This.o_sdp_lo = tsdp_message.prototype.Parse(This.o_sdp_jsep_lo.sdp);
            This.decorate_lo();
            if (This.o_mgr) {
                This.o_mgr.callback(tmedia_session_events_e.GET_LO_SUCCESS, This.e_type);
            }
        }
        else {
            This.o_mgr.callback(tmedia_session_events_e.GET_LO_FAILED, This.e_type);
            tsk_utils_log_error("localDescription is null");
        }
    }
}

tmedia_session_jsep01.onIceCandidate = function (o_event, _This) {
    var This = (tmedia_session_jsep01.mozThis || _This);
    if (!This || !This.o_pc) {
        tsk_utils_log_error("This/PeerConnection is null: unexpected");
        return;
    }
    var iceState = (This.o_pc.iceGatheringState || This.o_pc.iceState);

    tsk_utils_log_info("onIceCandidate = " + iceState);

    if (iceState === "complete" || (o_event && !o_event.candidate)) {
        tsk_utils_log_info("ICE GATHERING COMPLETED!");
        tmedia_session_jsep01.onIceGatheringCompleted(This);
    }
    else if (This.o_pc.iceState === "failed") {
        tsk_utils_log_error("Ice state is 'failed'");
        This.o_mgr.callback(tmedia_session_events_e.GET_LO_FAILED, This.e_type);
    }
}

tmedia_session_jsep01.onNegotiationNeeded = function (o_event, _This) {
    tsk_utils_log_info("onNegotiationNeeded");
    var This = (tmedia_session_jsep01.mozThis || _This);
    if (!This || !This.o_pc) {
        // do not raise error: could happen after pc.close()
        return;
    }
    if ((This.o_pc.iceGatheringState || This.o_pc.iceState) !== "new") {
        tmedia_session_jsep01.onGetUserMediaSuccess(This.b_lo_held ? null : This.o_local_stream, This);
    }
}

tmedia_session_jsep01.onSignalingstateChange = function (o_event, _This) {
    var This = (tmedia_session_jsep01.mozThis || _This);
    if (!This || !This.o_pc) {
        // do not raise error: could happen after pc.close()
        return;
    }
    tsk_utils_log_info("onSignalingstateChange:" + This.o_pc.signalingState);
    if (This.o_local_stream && This.o_pc.signalingState === "have-remote-offer") {
        tmedia_session_jsep01.onGetUserMediaSuccess(This.o_local_stream, This);
    }
}


tmedia_session_jsep01.prototype.__get_lo = function () {
    var This = this;
    if (!this.o_pc && !this.b_lo_held) {
        var o_video_constraints = {
            mandatory: {},
            optional: []
        };
        if ((this.e_type.i_id & tmedia_type_e.SCREEN_SHARE.i_id) == tmedia_type_e.SCREEN_SHARE.i_id) {
            o_video_constraints.mandatory.chromeMediaSource = 'screen';
        }
        if (this.e_type.i_id & tmedia_type_e.VIDEO.i_id) {
            if (this.o_video_size) {
                if (this.o_video_size.minWidth) o_video_constraints.mandatory.minWidth = this.o_video_size.minWidth;
                if (this.o_video_size.minHeight) o_video_constraints.mandatory.minHeight = this.o_video_size.minHeight;
                if (this.o_video_size.maxWidth) o_video_constraints.mandatory.maxWidth = this.o_video_size.maxWidth;
                if (this.o_video_size.maxHeight) o_video_constraints.mandatory.maxHeight = this.o_video_size.maxHeight;
            }
            try { tsk_utils_log_info("Video Contraints:" + JSON.stringify(o_video_constraints)); } catch (e) { }
        }
        var o_iceServers = this.ao_ice_servers;
        if (!o_iceServers) { // defines default ICE servers only if none exist (because WebRTC requires ICE)
            // HACK Nightly 21.0a1 (2013-02-18): 
            // - In RTCConfiguration passed to RTCPeerConnection constructor: FQDN not yet implemented (only IP-#s). Omitting "stun:stun.l.google.com:19302"
            // - CHANGE-REQUEST not supported when using "numb.viagenie.ca"
            // - (stun/ERR) Missing XOR-MAPPED-ADDRESS when using "stun.l.google.com"
            // numb.viagenie.ca: 66.228.45.110:
            // stun.l.google.com: 173.194.78.127
            // stun.counterpath.net: 216.93.246.18
            // "23.21.150.121" is the default STUN server used in Nightly
            o_iceServers = tmedia_session_jsep01.mozThis
                ? [{ url: 'stun:23.21.150.121:3478' }, { url: 'stun:216.93.246.18:3478' }, { url: 'stun:66.228.45.110:3478' }, { url: 'stun:173.194.78.127:19302' }]
                : [{ url: 'stun:stun.l.google.com:19302' }, { url: 'stun:stun.counterpath.net:3478' }, { url: 'stun:numb.viagenie.ca:3478' }];
        }
        try { tsk_utils_log_info("ICE servers:" + JSON.stringify(o_iceServers)); } catch (e) { }
        this.o_pc = new window.RTCPeerConnection(
                (o_iceServers && !o_iceServers.length) ? null : { iceServers: o_iceServers, rtcpMuxPolicy: "negotiate" }, // empty array is used to disable STUN/TURN.
                this.o_media_constraints
        );
        this.o_pc.onicecandidate = tmedia_session_jsep01.mozThis ? tmedia_session_jsep01.onIceCandidate : function (o_event) { tmedia_session_jsep01.onIceCandidate(o_event, This); };
        this.o_pc.onnegotiationneeded = tmedia_session_jsep01.mozThis ? tmedia_session_jsep01.onNegotiationNeeded : function (o_event) { tmedia_session_jsep01.onNegotiationNeeded(o_event, This); };
        this.o_pc.onsignalingstatechange = tmedia_session_jsep01.mozThis ? tmedia_session_jsep01.onSignalingstateChange : function (o_event) { tmedia_session_jsep01.onSignalingstateChange(o_event, This); };
                
        this.subscribe_stream_events();
    }

    if (!this.o_sdp_lo && !this.b_sdp_lo_pending) {
        this.b_sdp_lo_pending = true;

        // set penfing ro if there is one
        if (this.b_sdp_ro_pending && this.o_sdp_ro) {
            this.__set_ro(this.o_sdp_ro, true);
        }
        // get media stream
        if (this.e_type == tmedia_type_e.AUDIO && (this.b_cache_stream && __o_jsep_stream_audio)) {
            tmedia_session_jsep01.onGetUserMediaSuccess(__o_jsep_stream_audio, This);
        }
        else if (this.e_type == tmedia_type_e.AUDIO_VIDEO && (this.b_cache_stream && __o_jsep_stream_audiovideo)) {
            tmedia_session_jsep01.onGetUserMediaSuccess(__o_jsep_stream_audiovideo, This);
        }
        else {
            if (!this.b_lo_held && !this.o_local_stream) {
                this.o_mgr.callback(tmedia_session_events_e.STREAM_LOCAL_REQUESTED, this.e_type);
                navigator.getUserMedia(
                        {
                            audio: (this.e_type == tmedia_type_e.SCREEN_SHARE) ? false : !!(this.e_type.i_id & tmedia_type_e.AUDIO.i_id), // IMPORTANT: Chrome '28.0.1500.95 m' doesn't support using audio with screenshare
                            video: !!(this.e_type.i_id & tmedia_type_e.VIDEO.i_id) ? o_video_constraints : false, // "SCREEN_SHARE" contains "VIDEO" flag -> (VIDEO & SCREEN_SHARE) = VIDEO
                            data: false
                        },
                        tmedia_session_jsep01.mozThis ? tmedia_session_jsep01.onGetUserMediaSuccess : function (o_stream) { tmedia_session_jsep01.onGetUserMediaSuccess(o_stream, This); },
                        tmedia_session_jsep01.mozThis ? tmedia_session_jsep01.onGetUserMediaError : function (s_error) { tmedia_session_jsep01.onGetUserMediaError(s_error, This); }
                    );
            }
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
    /* reset local sdp */
    if (b_is_offer) {
        this.o_sdp_lo = null;
    }

    if (this.o_pc) {
        try {
            var This = this;
            this.decorate_ro(false);
            tsk_utils_log_info("setRemoteDescription(" + (b_is_offer ? "offer)" : "answer)") + "\n" + this.o_sdp_ro);
            this.o_pc.setRemoteDescription(
               new window.RTCSessionDescription({ type: b_is_offer ? "offer" : "answer", sdp: This.o_sdp_ro.toString() }),
               tmedia_session_jsep01.mozThis ? tmedia_session_jsep01.onSetRemoteDescriptionSuccess : function () { tmedia_session_jsep01.onSetRemoteDescriptionSuccess(This); },
               tmedia_session_jsep01.mozThis ? tmedia_session_jsep01.onSetRemoteDescriptionError : function (s_error) { tmedia_session_jsep01.onSetRemoteDescriptionError(s_error, This); }
            );
        }
        catch (e) {
            tsk_utils_log_error(e);
            this.o_mgr.callback(tmedia_session_events_e.SET_RO_FAILED, this.e_type);
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

