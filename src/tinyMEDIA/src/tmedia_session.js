/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/

var __o_peerconnection_class = undefined;
var __o_sessiondescription_class = undefined;
var __o_iceCandidate_class = undefined;

var tmedia_session_events_e =
{
    GET_LO_SUCCESS: 0,
    GET_LO_FAILED: 1,

    SET_RO_SUCCESS: 10,
    SET_RO_FAILED: 11,

    SET_ACK_SUCCESS: 20,
    SET_ACK_FAILED: 21,

    STREAM_LOCAL_REQUESTED: 30,
    STREAM_LOCAL_ACCEPTED: 31,
    STREAM_LOCAL_REFUSED: 32,
    STREAM_LOCAL_ADDED: 33,
    STREAM_LOCAL_REMOVED: 34,
    STREAM_REMOTE_ADDED: 35,
    STREAM_REMOTE_REMOVED: 36,

    RFC5168_REQUEST_IDR: 40,

    BFCP_INFO: 50
};

tmedia_session_mgr.prototype.__ao_supported_media = [tmedia_type_e.AUDIO, tmedia_type_e.VIDEO];

// fn_callback(o_usr_data, e_event_type, e_media_type)
function tmedia_session_mgr(e_type, s_addr, b_ipv6, b_offerer, fn_callback, o_usr_data) {
    this.s_addr = s_addr;
    this.s_public_addr = null;
    this.b_ipv6 = b_ipv6;

    this.fn_callback = fn_callback;
    this.o_usr_data = o_usr_data;

    this.sdp = {};
    this.sdp.i_lo_ver = -1;
    this.sdp.o_lo = null;
    this.sdp.i_ro_ver = -1;
    this.sdp.o_ro = null;

    this.o_stream_local = null;
    this.o_stream_remote = null;

    this.b_started = false;
    this.b_ro_changed = false;
    this.b_lo_changed = false;
    this.b_state_changed = false;
    this.b_media_type_changed = false;

    this.e_type = e_type;
    this.ao_sessions = new Array();
    this.ao_params = new Array();

    if (b_offerer) {
        this.load_sessions();
    }
}

tmedia_session_mgr.prototype.is_roap = function () {
    return (WebRtc4all_GetType() == WebRtcType_e.ERICSSON);
}

tmedia_session_mgr.prototype.is_jsep = function () {
    return !this.is_roap();
}

tmedia_session_mgr.prototype.get_stream_local = function () {
    return this.o_stream_local;
}

tmedia_session_mgr.prototype.get_stream_remote = function () {
    return this.o_stream_remote;
}

tmedia_session_mgr.prototype.set_stream_local = function (o_stream) {
    this.o_stream_local = o_stream;
    this.callback(o_stream ? tmedia_session_events_e.STREAM_LOCAL_ADDED : tmedia_session_events_e.STREAM_LOCAL_REMOVED, tmedia_type_e.VIDEO);
}

tmedia_session_mgr.prototype.set_stream_remote = function (o_stream) {
    this.o_stream_remote = o_stream;
    this.callback(o_stream ? tmedia_session_events_e.STREAM_REMOTE_ADDED : tmedia_session_events_e.STREAM_REMOTE_REMOVED, tmedia_type_e.VIDEO);
}

tmedia_session_mgr.prototype.set_fn_callback = function (fn_callback, o_usr_data) {
    this.fn_callback = fn_callback;
    this.o_usr_data = o_usr_data;
}

tmedia_session_mgr.prototype.callback = function (e_event_type, e_media_type, s_description/*optional*/) {
    if (this.fn_callback) {
        if (e_event_type == tmedia_session_events_e.GET_LO_SUCCESS) {
            this.b_lo_changed = true;
            if (this.ao_sessions.length > 0) {
                this.sdp.o_lo = this.ao_sessions[0].o_sdp_lo; // ao_sessions[0].get_lo() not used because we don't want to request new SDP but just a reference
            }
        }
        this.fn_callback(this.o_usr_data, e_event_type, e_media_type, s_description/*optional*/);
    }
}

tmedia_session_mgr.prototype.set_media_type = function(e_type){
	if(this.e_type != e_type){
		this.b_media_type_changed = true;
		this.e_type = e_type;
        for (var i = 0; i < this.ao_sessions.length; ++i) {
            this.ao_sessions[i].set_media_type(e_type);
        }
	}
	return 0;
}

tmedia_session_mgr.prototype.get_media_type = function () {
    return this.e_type;
}

tmedia_session_mgr.prototype.has_media = function (e_type) {
    for (var i = 0; i < this.ao_sessions.length; ++i) {
        if (this.ao_sessions[i].e_type == e_type) {
            return true;
        }
    }
    return false;
}

tmedia_session_mgr.prototype.has_ro_changed = function () {
    return this.b_ro_changed;
}

tmedia_session_mgr.prototype.has_state_changed = function () {
    return this.b_state_changed;
}

tmedia_session_mgr.prototype.has_active_session = function(){
    for (var i = 0; i < this.ao_sessions.length; ++i) {
        if (this.ao_sessions[i].o_sdp_lo) {
            return true;
        }
    }
    return false;
}

tmedia_session_mgr.prototype.is_started = function () {
    return this.b_started;
}

tmedia_session_mgr.prototype.has_lo = function () {
    return this.sdp.o_lo != null;
}

tmedia_session_mgr.prototype.has_ro = function () {
    return this.sdp.o_ro != null;
}

tmedia_session_mgr.prototype.remove_media = function(e_type){
    for (var i = 0; i < this.ao_sessions.length; ++i) {
        if (this.ao_sessions[i].e_type == e_type) {
            this.ao_sessions[i].stop();
            this.ao_sessions.splice(i, 1);
            break;
        }
    }
}

tmedia_session_mgr.prototype.send_dtmf = function(s_digit){
    for (var i = 0; i < this.ao_sessions.length; ++i) {
        if ((this.ao_sessions[i].e_type.i_id & tmedia_type_e.AUDIO.i_id) == tmedia_type_e.AUDIO.i_id) {
            return this.ao_sessions[i].send_dtmf(s_digit);
        }
    }
    return -1;
}

tmedia_session_mgr.prototype.apply_params = function () {
    var o_param;
    for (var i = 0; i < this.ao_params.length; ++i) {
        if (!(o_param = this.ao_params[i])) {
            continue;
        }

        switch (o_param.e_type) {
            case tmedia_param_type_e.CODEC:
                {
                    break;
                }
            case tmedia_param_type_e.MANAGER:
                {
                    break;
                }
            case tmedia_param_type_e.SESSION:
                {
                    for (var j = 0; j < this.ao_sessions.length; ++j) {
                        if (this.ao_sessions[j].e_type.i_id & o_param.e_media_type.i_id) {
                            this.ao_sessions[j].set(o_param);
                        }
                    }
                    break;
                }
        }
    }

    // clean params
    this.ao_params.splice(0, this.ao_params.length);
}

tmedia_session_mgr.prototype.load_sessions = function () {
    var o_session = null;
    if (this.ao_sessions.length == 0 || this.b_media_type_changed) {
        /* for each registered plugin create a session instance */
        for (var i = 0; i < tmedia_session_mgr.prototype.__ao_supported_media.length; ++i) {
            var e_type = tmedia_session_mgr.prototype.__ao_supported_media[i];
            if ((e_type.i_id & this.e_type.i_id) && !this.has_media(e_type)) {// we don't have a session with this media type yet
                if ((o_session = tmedia_session.prototype.Create(e_type, this))) {
                    this.ao_sessions.push(o_session);
                }
            }
            else if (!(e_type.i_id & this.e_type.i_id) && this.has_media(e_type)) {// we have media session from previous call (before update)
                this.remove_media(e_type);
            }
        }
        /* set default values */
        this.set(
            tmedia_session_mgr.prototype.SetParamSession(this.e_type, "local-ip", this.s_addr),
			tmedia_session_mgr.prototype.SetParamSession(this.e_type, "local-ipver", this.b_ipv6 ? "ipv6" : "ipv4")
        );

        /* apply params */
        this.apply_params(self);
    }
    return 0;
}

tmedia_session_mgr.prototype.__update_ro = function (o_sdp) {
    this.sdp.o_ro = o_sdp;
    var b_ro_held = true;
    // do not use 'is_held()' as 'session.o_ro' are not defined yet
    var i_index = 0;
    var o_hdr_M;
    while ((o_hdr_M = o_sdp.get_header_at(tsdp_header_type_e.M, i_index++))) {
        if (!o_hdr_M.is_held(false)) {
            b_ro_held = false;
            break;
        }
    }
    for (var i = 0; i < this.ao_sessions.length; ++i) {
        this.ao_sessions[i].b_ro_held = b_ro_held;
    }
    return 0;
}

tmedia_session_mgr.prototype.get_lo = function () {
    /* prepare the session manager if not already done (create all sessions) */
    if (this.ao_sessions.length == 0) {
        if (this.load_sessions() != 0) {
            tsk_utils_log_error("Failed to prepare the session manager");
            return null;
        }
    }

    /* creates local sdp if not already done or update it's value (because of set_ro())*/
    if ((this.b_ro_changed || this.b_lo_changed || this.b_state_changed || this.b_mediaType_changed) && this.sdp.o_lo) {
        this.sdp.o_lo = null;
        if (this.b_mediaType_changed) {
            // reload session with new medias and keep the old one
            this.load_sessions();
        }
        this.b_lo_changed = false;
        this.b_ro_changed = false;
        this.b_state_changed = false;
        this.b_mediaType_changed = false;
    }

    if (this.ao_sessions.length > 0) {
        this.sdp.o_lo = this.ao_sessions[0].get_lo();
    }

    return this.sdp.o_lo;
}

tmedia_session_mgr.prototype.set_ro = function (o_sdp, b_is_offer) {
    if (!o_sdp) {
        tsk_utils_log_error("Invalid parameter");
        return -1;
    }

    var i_ret = 0;
    var b_stopped_to_reconf = false;
    var b_is_hold_resume = false;
    var b_is_mediatype_changed = false;
    var e_new_mediatype = tmedia_type_e.NONE;
    var b_is_loopback_address = false;
    var b_had_ro_sdp = (this.sdp.o_ro != null);
    var o_hdr_O;
    var o_hdr_C; /* global "c=" line */

    /*	RFC 3264 subcaluse 8
    When issuing an offer that modifies the session, the "o=" line of the new SDP MUST be identical to that in the previous SDP, 
    except that the version in the origin field MUST increment by one from the previous SDP. If the version in the origin line 
    does not increment, the SDP MUST be identical to the SDP with that version number. The answerer MUST be prepared to receive 
    an offer that contains SDP with a version that has not changed; this is effectively a no-op.
    */
    if ((o_hdr_O = o_sdp.get_header(tsdp_header_type_e.O))) {
        if (this.sdp.i_ro_ver == o_hdr_O.i_sess_version) {
            tsk_utils_log_warn("Remote offer has not changed");
            return 0;
        }
        this.sdp.i_ro_ver = o_hdr_O.i_sess_version;
    }
    else {
        tsk_utils_log_error("o= line is missing");
        return -2;
    }

    /* This is to hack fake forking from ZTE => ignore SDP with loopback address in order to not start/stop the camera several
    * times which leads to more than ten seconds for session connection.
    * Gets the global connection line: "c="
    * Loopback address is only invalid on 
    */
    if ((o_hdr_C = o_sdp.get_header(tsdp_header_type_e.C)) && o_hdr_C.s_addr) {
        b_is_loopback_address = (tsk_string_iequals("IP4", o_hdr_C.s_addrtype) && tsk_string_iequals("127.0.0.1", o_hdr_C.s_addr))
						|| (tsk_string_iequals("IP6", o_hdr_C.s_addrtype) && tsk_string_iequals("::1", o_hdr_C.s_addr));
    }

    /* Check if media type has changed or not
    * For initial offer we don't need to check anything
    */
    if (this.sdp.o_lo) {
        e_new_mediatype = o_sdp.get_media_type();
        
        // Remove BFCP offer if not locally enabled. Only the client can init BFCP session.
	    if (b_is_offer) {
            var i_new_mediatype = e_new_mediatype.i_id;
		    if (!(this.e_type.i_id & tmedia_type_e.BFCPVIDEO.i_id)) {
			    i_new_mediatype &= ~tmedia_type_e.BFCPVIDEO.i_id; 
		    }
		    if (!(this.e_type.i_id & tmedia_type_e.BFCPAUDIO.i_id)) {
			    i_new_mediatype &= ~tmedia_type_e.BFCPAUDIO.i_id;
		    }
		    if (!(this.e_type.i_id & tmedia_type_e.BFCP.i_id)) {
			    i_new_mediatype &= ~tmedia_type_e.BFCP.i_id;
		    }
            e_new_mediatype = tmedia_type_from_id(i_new_mediatype);
	    }

        if (e_new_mediatype == tmedia_type_e.VIDEO && this.e_type == tmedia_type_e.SCREEN_SHARE) { // "SCREEN_SHARE" will be identified in the SDP as Video when using get_media_type()
            e_new_mediatype = this.e_type;
        }
        if ((b_is_mediatype_changed = (e_new_mediatype != this.e_type))) {
            this.set_media_type(e_new_mediatype);
            tsk_utils_log_info("media type has changed");
        }
    }

    /*
    * It's almost impossible to update the codecs, the connection information etc etc while the sessions are running
    * For example, if the video producer is already started then, you probably cannot update its configuration
    * without stoping it and restart again with the right config. Same for RTP Network config (ip addresses, NAT, ports, IP version, ...)
    * "is_loopback_address" is used as a guard to avoid reconf for loopback address used for example by ZTE for fake forking. In all case
    * loopback address won't work on embedded devices such as iOS and Android.
    * FIXME: We must check that it's not a basic hold/resume because this kind of request doesn't update the stream config
    */
    if (this.b_started && !(this.is_roap() || this.is_jsep()) && ((!b_is_hold_resume && !b_is_loopback_address) || b_is_mediatype_changed)) {
        if ((i_ret = this.stop())) {
            tsk_utils_log_error("Failed to stop session manager");
            return i_ret;
        }
        b_stopped_to_reconf = true;
    }

    /* update remote offer */
    this.__update_ro(o_sdp);

    /* prepare the session manager if not already done (create all sessions with their codecs) 
    * if network-initiated: think about tmedia_type_from_sdp() before creating the manager */
    if ((i_ret = this.load_sessions())) {
        tsk_utils_log_error("Failed to prepare the session manager");
        return i_ret;
    }

    /* get global connection line (common to all sessions) 
    * Each session should override this info if it has a different one in its "m=" line
    */
    if (o_hdr_C && o_hdr_C.s_addr) {
        this.set(tmedia_session_mgr.prototype.SetParamSession(this.e_type, "remote-ip", o_hdr_C.s_addr));
    }

    for (var i = 0; i < this.ao_sessions.length; ++i) {
        this.ao_sessions[i].set_ro(o_sdp, b_is_offer);
    }

    /* signal that ro has changed (will be used to update lo) unless there was no ro_sdp*/
    this.b_ro_changed = b_had_ro_sdp;

    /* update local offer before restarting the session manager otherwise neg_codecs won't match if new codecs
    have been added or removed */
    (this.get_lo(self));

    /* manager was started and we stopped it in order to reconfigure it (codecs, network, ....) */
    if (b_stopped_to_reconf) {
        if ((i_ret = this.start())) {
            tsk_utils_log_warn("Failed to re-start session manager");
            return i_ret;
        }
    }

    return 0;
}

tmedia_session_mgr.prototype.processContent = function (s_req_name, s_content_type, s_content_ptr, i_content_size) {
    for (var i = 0; i < this.ao_sessions.length; ++i) {
        this.ao_sessions[i].processContent(s_req_name, s_content_type, s_content_ptr, i_content_size);
    }
}

tmedia_session_mgr.prototype.start = function () {
    var i_ret = 0;
    for (var i = 0; i < this.ao_sessions.length; ++i) {
        if ((i_ret = this.ao_sessions[i].start())) {
            return i_ret;
        }
    }
    this.b_started = true;
    return 0;
}

tmedia_session_mgr.prototype.stop = function () {
    var i_ret = 0;
    for (var i = 0; i < this.ao_sessions.length; ++i) {
        if ((i_ret = this.ao_sessions[i].stop())) {
            return i_ret;
        }
    }
    this.b_started = false;
    return 0;
}

tmedia_session_mgr.prototype.acked = function () {
    var i_ret = 0;
    for (var i = 0; i < this.ao_sessions.length; ++i) {
        if ((i_ret = this.ao_sessions[i].acked())) {
            return i_ret;
        }
    }
    return 0;
}

tmedia_session_mgr.prototype.is_held = function(e_type, b_local){	
	var b_have_these_sessions = false;
    var i_index;
    var o_hdr_M;
    var o_sdp;

	for (var i = 0; i < this.ao_sessions.length; ++i) {
		var o_session = this.ao_sessions[i];
		if (!e_type || (o_session.e_type.i_id & e_type.i_id)) {
            if(b_local && o_session.o_sdp_lo){
                o_sdp = o_session.o_sdp_lo;
            }
            else if(!b_local && o_session.o_sdp_ro){
                o_sdp = o_session.o_sdp_ro;
            }
            else continue;

            b_have_these_sessions = true;
            i_index = 0;
            while((o_hdr_M = o_sdp.get_header_at(tsdp_header_type_e.M, i_index++))){
                if (!o_hdr_M.is_held(b_local)) {
                    return false;
                }
            }
		}
	}
	/* none is held */
	return b_have_these_sessions ? true : false;
}

tmedia_session_mgr.prototype.hold = function (e_type) {
    var i_ret;
    for (var i = 0; i < this.ao_sessions.length; ++i) {
        if (!e_type || (this.ao_sessions[i].e_type.i_id & e_type.i_id)) {
            this.b_state_changed = true;
            if (i_ret = this.ao_sessions[i].hold()) {
                return i_ret;
            }
            this.ao_sessions[i].b_lo_held = true;
        }
    }
    return 0;
}

tmedia_session_mgr.prototype.resume = function (e_type) {
    var i_ret;
    for (var i = 0; i < this.ao_sessions.length; ++i) {
        if (!e_type || (this.ao_sessions[i].e_type.i_id & e_type.i_id)) {
            this.b_state_changed = true;
            if (i_ret = this.ao_sessions[i].resume()) {
                return i_ret;
            }
            this.ao_sessions[i].b_lo_held = false;
        }
    }
    return 0;
}

tmedia_session_mgr.prototype.set = function(){
    for(var i = 0; i < arguments.length; ++i){
        if(arguments[i]){
            this.ao_params.push(arguments[i]);
        }
    }

    /* apply params if we already have sessions */
    if(this.ao_sessions.length > 0){
        this.apply_params();
    }
}

tmedia_session_mgr.prototype.SetParamSession = function (e_media_type, s_key, o_value) {
    return new tmedia_param(tmedia_param_type_e.SESSION, e_media_type, s_key, o_value);
}

tmedia_session_mgr.prototype.SetParamCodec = function (e_media_type, s_key, o_value) {
    return new tmedia_param(tmedia_param_type_e.CODEC, e_media_type, s_key, o_value);
}

tmedia_session_mgr.prototype.SetParam = function (e_media_type, s_key, o_value) {
    return new tmedia_param(tmedia_param_type_e.MANAGER, e_media_type, s_key, o_value);
}






function tmedia_session(e_type, o_mgr) {
    this.e_type = e_type;
    this.b_ro_changed = false;
    this.b_initialized = false;
    this.b_prepared = false;
    this.b_lo_held = false;
    this.b_ro_held = false;

    this.o_sdp = null;
    this.o_mgr = o_mgr;
}

tmedia_session.prototype.set = function (o_param) {
    return this.__set(o_param);
}

tmedia_session.prototype.prepare = function () {
    return this.__prepare();
}

tmedia_session.prototype.set_media_type = function(e_type){
	return this.__set_media_type ? this.__set_media_type(e_type) : -1;
}

tmedia_session.prototype.start = function () {
    return this.__start();
}

tmedia_session.prototype.pause = function () {
    return this.__pause();
}

tmedia_session.prototype.stop = function () {
    return this.__stop();
}

tmedia_session.prototype.get_lo = function () {
    return this.__get_lo();
}

tmedia_session.prototype.set_ro = function (o_sdp, b_is_offer) {
    return this.__set_ro(o_sdp, b_is_offer);
}

tmedia_session.prototype.processContent = function (s_req_name, s_content_type, s_content_ptr, i_content_size) {
    return this.__processContent ? this.__processContent(s_req_name, s_content_type, s_content_ptr, i_content_size) : -1;
}

tmedia_session.prototype.acked = function () {
    return this.__acked();
}

tmedia_session.prototype.hold = function () {
    return this.__hold();
}

tmedia_session.prototype.resume = function () {
    return this.__resume();
}

tmedia_session.prototype.send_dtmf = function (s_digit) {
    return this.__send_dtmf ? this.__send_dtmf(s_digit) : -1;
}


tmedia_session.prototype.Create = function (e_type, o_mgr) {
    switch (e_type) {
        case tmedia_type_e.AUDIO:
        case tmedia_type_e.VIDEO:
        case tmedia_type_e.SCREEN_SHARE:
        case tmedia_type_e.BFCPVIDEO:
        case tmedia_type_e.AUDIO_BFCPVIDEO:
        case tmedia_type_e.VIDEO_BFCPVIDEO:
        case tmedia_type_e.AUDIO_VIDEO_BFCPVIDEO:
            {
                 // for now we support a single media session per call
                 // The code is based on Doubango ANSI-C code which uses one media type (e.g. 1audio plus 1video) per media session while SIPML5 bundle them (e.g. 1audiovideo)
                if(o_mgr.ao_sessions.length == 0) {
                    if (o_mgr.is_jsep()) {
                        return tmedia_session_jsep.prototype.CreateInstance(o_mgr);
                    }
                    else {
                        return new tmedia_session_roap(o_mgr);
                    }
                }
                return null;
            }
        case tmedia_type_e.GHOST:
            {
                return new tmedia_session_ghost(o_mgr);
            }
        default:
            {
                tsk_utils_log_error(e_type + " not supported as media type");
                return null;
            }
    }
}

if(!window.__b_release_mode){
    tmedia_api_add_js_scripts('head',
        'src/tinyMEDIA/src/tmedia_session_jsep.js',
        'src/tinyMEDIA/src/tmedia_session_roap.js',
        'src/tinyMEDIA/src/tmedia_session_ghost.js'
    );
}