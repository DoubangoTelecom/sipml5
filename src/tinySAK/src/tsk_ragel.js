/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
function tsk_ragel_state_create() {
    var self = new Object();
    tsk_ragel_state_init(self, null, 0);
    return self;
}

function tsk_ragel_state_init(o_self, o_data, i_size) {
    o_self.i_cs = 0;
    o_self.i_p = 0;
    o_self.i_pe = i_size;
    o_self.o_data = o_data;
    o_self.s_data = null;
    o_self.i_eof = 0;
    o_self.i_tag_start = 0;
    o_self.i_tag_end = i_size;
}

function tsk_ragel_state_init_ai(o_self, ai_data) {
    return tsk_ragel_state_init_str(o_self, tsk_buff_ab2str(ai_data));
}

function tsk_ragel_state_init_str(o_self, s_str) {
    tsk_ragel_state_init(o_self, tsk_buff_str2ib(s_str), s_str.length);
    o_self.s_data = s_str;
}

function tsk_ragel_parser_get_string(s_str, i_p, i_tag_start) {
    var i_len = (i_p - i_tag_start);
    var s_ret = null;
    if (i_len > 0) {
        s_ret = s_str.substring(i_tag_start, (i_tag_start + i_len));
    }
    return s_ret;
}

function tsk_ragel_parser_get_int(s_str, i_p, i_tag_start) {
    var i_ret = 0;
    var s_curr = tsk_ragel_parser_get_string(s_str, i_p, i_tag_start);
    if (!tsk_string_is_null_or_empty(s_curr)) {
        i_ret = parseInt(s_curr);
    }
    return i_ret;
}

function tsk_ragel_parser_get_param(s_str, i_p, i_tag_start) {
    if (!tsk_string_is_null_or_empty(s_str)) {
        var i_len = (i_p - i_tag_start);
        return tsk_param_parse(s_str.substring(i_tag_start, i_tag_start + i_len));
    }
    return null;
}

function tsk_ragel_add_param(s_str, i_p, i_tag_start, ao_params) {
    var o_param = tsk_ragel_parser_get_param(s_str, i_p, i_tag_start);
    if (o_param) {
        ao_params.push(o_param);
    }
}

function tsk_ragel_parser_add_string(s_str, i_p, i_tag_start, sa_strings){
    var s_curr = tsk_ragel_parser_get_string(s_str, i_p, i_tag_start);
    if (!tsk_string_is_null_or_empty(s_curr)) {
        sa_strings.push(s_curr);
    }
    return sa_strings;
}

function tsk_ragel_scanner_get_string(s_str, i_ts, i_te){
    var i_len = (i_te - i_ts);
    var s_ret = null;
    if(i_len > 0){
        s_ret = s_str.substring(i_ts, (i_ts + i_len));
    }
    return s_ret;
}

function tsk_ragel_scanner_get_int(s_str, i_ts, i_te){
    var s_curr = tsk_ragel_scanner_get_string(s_str, i_ts, i_te);
    if(s_curr){
        return parseInt(s_curr);
    }
    return 0;
}

function tsk_tagel_scanner_add_param(s_str, i_ts_i_te, ao_params) {
    if (ao_params && !tsk_string_is_null_or_empty(s_str)) {
        var i_len = (te - ts);
        var o_param = tsk_param_parse(s_str.substring(i_ts, i_ts + i_len));
        ao_params.push(o_param);
    }
}