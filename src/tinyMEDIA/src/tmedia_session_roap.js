/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
//@deprecated THIS IMPLEMENTATION IS DEPRECATED
// http://tools.ietf.org/html/draft-jennings-rtcweb-signaling-01

var __o_session_roap = null;

var tmedia_session_state_e =
{
    NONE: -1,
    OFFER_SENT: 0,
    OFFER_RECEIVED: 1,
    ANSWER_SENT: 2,
    ANSWER_RECEIVED: 3,

    LOCAL_HOLD: 10
};

function tmedia_session_roap(o_mgr) {
    this.__proto__.__proto__ = new tmedia_session(tmedia_type_e.AUDIO_VIDEO, o_mgr);
    this.e_state = tmedia_session_state_e.NONE;
    this.o_pc = null;
    this.o_pc_json = null;

    this.o_remote_stream = null;
    this.o_local_stream = null;

    this.o_sdp_json_lo = null;
    this.o_sdp_lo = null;
    this.o_sdp_json_ro = null;
    this.o_sdp_ro = null;

    this.b_ro_changed = false;
    this.b_lo_held = false;
    this.b_ro_held = false;
}

tmedia_session_roap.prototype.__set = function (o_param) {
    return 0;
}

tmedia_session_roap.prototype.__prepare = function () {
    return 0;
}

tmedia_session_roap.prototype.__start = function () {
    return 0;
}

tmedia_session_roap.prototype.__pause = function () {
    //if (this.o_local_stream) {
        
    //}
    return 0;
}


tmedia_session_roap.prototype.__stop = function () {
    tsk_utils_log_info("PeerConnection::stop()");

    if (this.o_pc) {
        this.o_pc.close();
        this.o_pc = null;
    }
    this.o_mgr.set_stream_remote(null);
    this.o_mgr.set_stream_local(null);

    return 0;
}

tmedia_session_roap.prototype.__get_lo = function () {
    tsk_utils_log_info("ROAP: __get_lo");
    if (!this.o_pc) {
        __o_session_roap = this;

        // alert user
        this.o_mgr.set_stream_local(__o_roap_stream);

        __o_session_roap.o_local_stream = __o_roap_stream;
        __o_session_roap.o_pc = new __o_peerconnection_class("STUN stun.l.google.com:19302", __o_session_roap.__on_signaling_message);
        //__o_session_roap.o_pc = new webkitDeprecatedPeerConnection("NONE", __o_session_roap.__on_signaling_message);
        __o_session_roap.o_pc.o_session = __o_session_roap;
        __o_session_roap.o_pc.onstatechange = tmedia_session_roap.prototype.__on_state_change;
        __o_session_roap.o_pc.onconnecting = tmedia_session_roap.prototype.__on_connecting;
        __o_session_roap.o_pc.onopen = tmedia_session_roap.prototype.__on_open;
        __o_session_roap.o_pc.onaddstream = tmedia_session_roap.prototype.__on_add_stream;
        __o_session_roap.o_pc.onremovestream = tmedia_session_roap.prototype.__on_remove_stream;

        if (__o_session_roap.o_pc) {
            tsk_utils_log_info("ROAP: __get_lo::addStream()");
            __o_session_roap.o_pc.addStream(__o_session_roap.o_local_stream);
        }

        if (this.e_state == tmedia_session_state_e.OFFER_RECEIVED && this.o_sdp_ro) {
            this.__set_ro(this.o_sdp_ro, true);
        }

        return null;
    }

    return this.o_sdp_lo;
}

tmedia_session_roap.prototype.__hold = function () {
    this.b_lo_held = true;

    if (this.o_pc && this.o_local_stream) {
        this.o_pc.removeStream(this.o_local_stream);
        return 0;
    }

    tsk_utils_log_error("Invalid state");
    return -1;
}

tmedia_session_roap.prototype.__set_ro = function (o_sdp, b_is_offer) {
    tsk_utils_log_info("ROAP: __set_ro");
    this.o_sdp_ro = o_sdp;

    if (!this.o_pc) {
        this.e_state = tmedia_session_state_e.OFFER_RECEIVED;
        return 0;
    }

    var s_sdp_json_ro = null;
    var o_hdr_O;
    var i_seq = 1;
    var i_tieBreaker = Math.floor((Math.random() * 0x0000FFFF));
    var s_answererSessionId;
    var s_offererSessionId;

    if ((o_hdr_O = this.o_sdp_ro.get_header(tsdp_header_type_e.O))) {
        i_seq = o_hdr_O.i_sess_version;
    }

    this.e_state = b_is_offer ? tmedia_session_state_e.OFFER_RECEIVED : tmedia_session_state_e.ANSWER_RECEIVED;

    if (this.o_pc_json) {
        s_answererSessionId = this.o_pc_json.answererSessionId ? this.o_pc_json.answererSessionId : tsk_string_random(16);
        s_offererSessionId = this.o_pc_json.offererSessionId ? this.o_pc_json.offererSessionId : tsk_string_random(16);

        if (this.o_pc_json.messageType == "OFFER") {
            s_sdp_json_ro = tsk_string_format(
                "{\n" +
                "\"answererSessionId\" : \"{0}\",\n" +
                "\"messageType\" : \"ANSWER\",\n" +
                "\"offererSessionId\" : \"{1}\",\n" +
                "\"sdp\" : \"{2}\",\n" +
                "\"seq\" : {3}\n" +
                "}\n", s_answererSessionId, s_offererSessionId, this.o_sdp_ro.toString("\\r\\n"), this.o_sdp_json_lo.seq);
        }
        else { // ACK use "ACKED"
            s_sdp_json_ro = tsk_string_format(
                "{\n" +
                "\"answererSessionId\" : \"{0}\",\n" +
                "\"messageType\" : \"OFFER\",\n" +
                "\"offererSessionId\" : \"{1}\",\n" +
                "\"sdp\" : \"{2}\",\n" +
                "\"seq\" : {3},\n" +
                "\"tieBreaker\": {4}\n" +
                "}\n", s_answererSessionId, s_offererSessionId, this.o_sdp_ro.toString("\\r\\n"), (this.o_sdp_json_lo.seq + 1), i_tieBreaker);
        }
    }
    else {
        s_sdp_json_ro = tsk_string_format(
                "{\n" +
                "\"messageType\" : \"OFFER\",\n" +
                "\"offererSessionId\" : \"{0}\",\n" +
                "\"sdp\" : \"{1}\",\n" +
                "\"seq\" : {2},\n" +
                "\"tieBreaker\": {3}\n" +
                "}\n", tsk_string_random(16), this.o_sdp_ro.toString("\\r\\n"), i_seq, i_tieBreaker);
    }

    try {
        tsk_utils_log_info("RO=" + s_sdp_json_ro);
        this.o_sdp_json_ro = JSON.parse(s_sdp_json_ro);
        this.o_pc.processSignalingMessage("SDP\n" + s_sdp_json_ro);
        return 0;
    }
    catch (e) {
        __o_session_roap.o_mgr.callback(tmedia_session_events_e.SET_RO_FAILED, this.e_type);
        tsk_utils_log_error(e);
        return -2;
    }
}

tmedia_session_roap.prototype.__acked = function () {
    if (this.o_sdp_json_lo) {
        if (this.o_sdp_json_lo.messageType == "ANSWER") {
            var s_sdp_json_ack = tsk_string_format(
                "SDP\n{\n" +
                "\"answererSessionId\" : \"{0}\",\n" +
                "\"messageType\" : \"OK\",\n" +
                "\"offererSessionId\" : \"{1}\",\n" +
                "\"seq\" : {2}\n" +
                "}\n", this.o_sdp_json_lo.offererSessionId, this.o_sdp_json_lo.answererSessionId, this.o_sdp_json_lo.seq);

            tsk_utils_log_info("ACK=" + s_sdp_json_ack);
            try {
                this.o_pc.processSignalingMessage(s_sdp_json_ack);
            }
            catch (e) {
                tsk_utils_log_error(e);
                return -2;
            }
        }
    }
    return 0;
}

tmedia_session_roap.prototype.__on_signaling_message = function (message) {
    tsk_utils_log_info("LO=" + message);

    if (tsk_string_index_of(message, 3, "SDP") == 0) {
        message = message.substring(3);
    }

    try {
        __o_session_roap.o_pc_json = JSON.parse(message);
        if (__o_session_roap.o_pc_json.messageType == "OFFER" || __o_session_roap.o_pc_json.messageType == "ANSWER") {
            var o_sdp = tsdp_message.prototype.Parse(__o_session_roap.o_pc_json.sdp);
            if (!o_sdp) {
                tsk_utils_log_error("failed to parse sdp" + __o_session_roap.o_pc_json.sdp);
                __o_session_roap.o_mgr.callback(tmedia_session_events_e.GET_LO_FAILED, this.e_type);
                return;
            }
            // https://groups.google.com/group/ericsson-labs-web-rtc/browse_thread/thread/4acadd0da3fce37c
            var o_hdr_ma = o_sdp.get_header_m_by_name("audio");
            var o_hdr_mv = o_sdp.get_header_m_by_name("video");
            /*if (o_hdr_ma && o_hdr_ma.i_port < 1024) {
                tsk_utils_log_error("Audio media contains invalid port:" + o_hdr_ma.i_port);
                return;
            }
            if (o_hdr_mv && o_hdr_mv.i_port < 1024) {
                tsk_utils_log_error("Video media contains invalid port:" + o_hdr_mv.i_port);
                return;
            }*/

            __o_session_roap.o_sdp_json_lo = __o_session_roap.o_pc_json;
            __o_session_roap.o_sdp_lo = o_sdp;

            var o_hdr_S;
            if ((o_hdr_S = __o_session_roap.o_sdp_lo.get_header(tsdp_header_type_e.S))) {
                o_hdr_S.s_value = "webrtc (roap)";
            }

            var o_hdr_O;
            if ((o_hdr_O = __o_session_roap.o_sdp_lo.get_header(tsdp_header_type_e.O))) {
                o_hdr_O.i_sess_version = __o_session_roap.o_sdp_json_lo.seq;
            }

            /* Hold/Resume */
            if (__o_session_roap.b_lo_held || __o_session_roap.b_ro_held) {
                var o_hdr_M;
                var i_index = 0;
                while ((o_hdr_M = __o_session_roap.o_sdp_lo.get_header_at(tsdp_header_type_e.M, i_index++))) {
                    o_hdr_M.set_holdresume_att(__o_session_roap.b_lo_held, __o_session_roap.b_ro_held);
                }
            }

            //__o_session_roap.o_sdp_lo.remove_media("video");
            //__o_session_roap.o_sdp_lo.add_media("video", 0, "RTP/AVP");
            
            //if (o_hdr_ma) {
                //o_hdr_m.s_proto = "RTP/AVP";
                //tsdp_header_A.prototype.RemoveAllByField(o_hdr_m.ao_hdr_A, "rtcp");
                //tsdp_header_A.prototype.RemoveAllByField(o_hdr_m.ao_hdr_A, "ssrc");
            //}
            //if (o_hdr_mv) {
                //o_hdr_m.s_proto = "RTP/AVP";
                //tsdp_header_A.prototype.RemoveAllByField(o_hdr_m.ao_hdr_A, "rtcp");
                //tsdp_header_A.prototype.RemoveAllByField(o_hdr_m.ao_hdr_A, "ssrc");
            //}


            if (__o_session_roap.e_state == tmedia_session_state_e.LOCAL_HOLD) {
                __o_session_roap.e_state = tmedia_session_state_e.OFFER_SENT;
            }

            __o_session_roap.o_mgr.callback(tmedia_session_events_e.GET_LO_SUCCESS, this.e_type);
        }
        else if (__o_session_roap.o_pc_json.messageType == "OK") {
            __o_session_roap.o_mgr.callback(tmedia_session_events_e.SET_RO_SUCCESS, this.e_type);
        }
        if (__o_session_roap.o_pc_json.messageType == "ERROR") {
            tsk_utils_log_error("onSignalingMessage::messageType = ERROR");
            __o_session_roap.o_mgr.callback(tmedia_session_events_e.GET_LO_FAILED, this.e_type); // FIXME
        }
    }
    catch (e) {
        __o_session_roap.o_mgr.callback(tmedia_session_events_e.GET_LO_FAILED, this.e_type);
        tsk_utils_log_error(e);
        return;
    }
    /* Hold/Resume */
    // __o_session_roap.M.o_lo.set_holdresume_att(__o_session_roap.b_lo_held, __o_session_roap.b_ro_held);
    /* callback */

}

tmedia_session_roap.prototype.__on_state_change = function (evt) {
    tsk_utils_log_info("__on_state_change");
}

tmedia_session_roap.prototype.__on_connecting = function (evt) {
    tsk_utils_log_info("__on_connecting");
}

tmedia_session_roap.prototype.__on_open = function (evt) {
    tsk_utils_log_info("__on_open");
}

tmedia_session_roap.prototype.__on_add_stream = function (evt) {
    tsk_utils_log_info("__on_add_stream");

    // alert user
    if (__o_session_roap) {
        __o_session_roap.o_remote_stream = evt.stream;
        if (__o_session_roap.o_mgr) {
            __o_session_roap.o_mgr.set_stream_remote(evt.stream);
        }
    }
}

tmedia_session_roap.prototype.__on_remove_stream = function (evt) {
    tsk_utils_log_info("__on_remove_stream");

    // alert user
    if (__o_session_roap) {
        __o_session_roap.o_remote_stream = null;
        if (__o_session_roap.o_mgr) {
            __o_session_roap.o_mgr.set_stream_remote(null);
        }
    }
}