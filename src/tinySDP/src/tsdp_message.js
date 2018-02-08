/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
tsdp_message.prototype.__s_o_username_default = "webrtc";
tsdp_message.prototype.__i_o_session_ver_default = 2301;
tsdp_message.prototype.__i_o_session_id_default = 1983;
tsdp_message.prototype.__s_s_value_default = "-";

function tsdp_message(s_addr, b_ipv6, i_version) {
    this.ao_headers = new Array();

    if (s_addr) {

        /*	RFC 3264 - 5 Generating the Initial Offer
        The numeric value of the session id and version in the o line MUST be 
        representable with a 64 bit signed integer.  The initial value of the version MUST be less than
        (2**62)-1, to avoid rollovers.
        */
        this.add_headers(
                new tsdp_header_V(0),
                new tsdp_header_O(
                    tsdp_message.prototype.__s_o_username_default,
                    tsdp_message.prototype.__i_o_session_id_default,
                    i_version,
                    "IN",
                    b_ipv6 ? "IP6" : "IP4",
                    s_addr));

        /*	RFC 3264 - 5 Generating the Initial Offer
        The SDP "s=" line conveys the subject of the session, which is
        reasonably defined for multicast, but ill defined for unicast.  For
        unicast sessions, it is RECOMMENDED that it consist of a single space
        character (0x20) or a dash (-).

        Unfortunately, SDP does not allow the "s=" line to be empty.
        */
        this.add_headers(new tsdp_header_S(tsdp_message.prototype.__s_s_value_default));

        /*	RFC 3264 - 5 Generating the Initial Offer
        The SDP "t=" line conveys the time of the session.  Generally,
        streams for unicast sessions are created and destroyed through
        external signaling means, such as SIP.  In that case, the "t=" line
        SHOULD have a value of "0 0".
        */
        this.add_headers(new tsdp_header_T(0, 0));
    }
}

tsdp_message.prototype.get_media_type = function () {
    var i_id = tmedia_type_e.NONE.i_id;
    var i_index = 0;
    var o_hdr_M, o_hdr_A;
    while ((o_hdr_M = this.get_header_at(tsdp_header_type_e.M, i_index++))) {
        if (o_hdr_M.i_port == 0) { // media disabled?
            continue;
        }
        if (tsk_string_iequals(o_hdr_M.s_media, "audio")) {
            i_id |= tmedia_type_e.AUDIO.i_id;
        }
        else if (tsk_string_iequals(o_hdr_M.s_media, "video")) {
            o_hdr_A = o_hdr_M.find_a_at("content", 0);
            if (o_hdr_A && !tsk_string_iequals(o_hdr_A.s_value, "main")) {
                i_id |= tmedia_type_e.BFCPVIDEO.i_id;
            }
            else {
                i_id |= tmedia_type_e.VIDEO.i_id;
            }
        }
        else if (tsk_string_iequals(o_hdr_M.s_media, "message")) {
            i_id |= tmedia_type_e.MSRP.i_id;
        }
    }
    return tmedia_type_from_id(i_id);
}

// add_headers(...)
tsdp_message.prototype.add_headers = function () {
    for (var i = 0; i < arguments.length; ++i) {
        if (arguments[i]) {
            this.ao_headers.push(arguments[i]);
        }
    }
    this.ao_headers.sort(tsdp_header_compare_by_rank);
}

tsdp_message.prototype.add_header = function (o_header) {
    this.add_headers(o_header);
}

tsdp_message.prototype.remove_header = function (e_type) {
    for (var i_index = 0; i_index < this.ao_headers.length; ) {
        if (this.ao_headers[i_index].e_type == e_type) {
            this.ao_headers.splice(i_index, 1);
            continue;
        }
        ++i_index;
    }
}

tsdp_message.prototype.get_header_at = function(e_type, i_index){
    var i_pos = 0;
    for (var i = 0; i < this.ao_headers.length; ++i) {
        if(this.ao_headers[i].e_type == e_type){
            if(i_pos++ >= i_index){
                return this.ao_headers[i];
            }
        }
    }
    return null;
}

tsdp_message.prototype.get_header = function (e_type) {
    return this.get_header_at(e_type, 0);
}

tsdp_message.prototype.get_header_by_name = function (c_name) {
    for (var i = 0; i < this.ao_headers.length; ++i) {
        if (this.ao_headers[i].get_name() == c_name) {
            return c_name;
        }
    }
    return null;
}

tsdp_message.prototype.get_header_a_at = function(s_field, i_index) {
	if(!s_field || i_index < 0){
		tsk_utils_log_error("Invalid argument");
		return null;
	}

	var i_pos = 0;
	for(var i = 0; i < this.ao_headers.length; ++i){
		if(this.ao_headers[i].e_type == tsdp_header_type_e.A && this.ao_headers[i].s_field == s_field){
			if(i_pos++ >= i_index){
				return this.ao_headers[i];
			}
		}
	}
	return null;
}

tsdp_message.prototype.get_header_a = function(s_field) {
	return this.get_header_a_at(s_field, 0);
}

tsdp_message.prototype.add_media = function (s_media, i_port, s_proto) {
    this.add_headers(new tsdp_header_M(s_media, i_port, s_proto));
}

tsdp_message.prototype.remove_media = function (s_media) {
    for (var i = 0; i < this.ao_headers.length; ++i) {
        if (this.ao_headers[i].e_type == tsdp_header_type_e.M) {
            if (this.ao_headers[i].s_media == s_media) {
                this.ao_headers.splice(i, 1);
            }
        }
    }
}

tsdp_message.prototype.get_header_m_by_name = function(s_media){
    if(!s_media){
        tsk_utils_log_error("Invalid argument");
        return null;
    }
    for (var i = 0; i < this.ao_headers.length; ++i) {
        if (this.ao_headers[i].e_type == tsdp_header_type_e.M) {
            if(tsk_string_iequals(this.ao_headers[i].s_media, s_media)){
                return this.ao_headers[i];
            }
        }
    }
    return null;
}

tsdp_message.prototype.has_media = function (s_media) {
    return this.get_header_m_by_name(s_media) != null;
}

/* ================= 3GPP TS 34.610 :: Communication HOLD (HOLD) using IP Multimedia (IM) Core ================*/
tsdp_message.prototype.hold = function(s_media){
	if(!s_media){
        tsk_utils_log_error("Invalid argument");
        return -1;
    }

    // 3GPP TS 34.610-900 - 4.5.2.1	Actions at the invoking UE
    var o_hdr_M = this.get_header_m_by_name(s_media);
    if(o_hdr_M){
        o_hdr_M.hold(true);
    }

	return 0;
}

tsdp_message.prototype.resume = function(s_media){
	if(!s_media){
        tsk_utils_log_error("Invalid argument");
        return -1;
    }
	
	// 3GPP TS 34.610-900 - 4.5.2.1	Actions at the invoking UE
    var o_hdr_M = this.get_header_m_by_name(s_media);
    if(o_hdr_M){
        o_hdr_M.resume(true);
    }
    return 0;
}

tsdp_message.prototype.toString = function (s_endline) {
    var s_str = "";
    if (!s_endline) {
        s_endline = "\r\n";
    }
    for (var i = 0; i < this.ao_headers.length; ++i) {
        s_str += this.ao_headers[i].tostring_full(false, s_endline);
    }
    return s_str;
}

if(!window.__b_release_mode){
    tsdp_api_add_js_scripts('head',
    'src/tinySDP/src/tsdp_parser_message.js'
    );
}