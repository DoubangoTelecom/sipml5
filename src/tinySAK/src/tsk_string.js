/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
function tsk_string_is_null_or_empty(s_str) {
    return !s_str || s_str == "";
}

function tsk_string_is_string(o_str) {
    return (o_str instanceof String || typeof o_str == "string");
}


function tsk_string_index_of(s_str, i_len, s_substr){
    var i_ret = -1;
    if(s_str && s_substr){
        i_ret = s_str.indexOf(s_substr);
    }
    return i_ret < i_len ? i_ret : -1;
}

function tsk_string_contains(s_str, i_len, s_substr){
    return tsk_string_index_of(s_str, i_len, s_substr) >= 0;
}

function tsk_string_unquote(s_str, c_lquote, c_rquote){
    var s_ret = s_str;
    if(s_ret){
        var i_len = s_ret.length;
        if(i_len >= 2 && s_ret[0] == c_lquote && s_ret[i_len - 1] == c_rquote){
            s_ret = s_str.substring(1, i_len - 1);
        }
    }
    return s_ret;
}

function tsk_string_unquote_2(s_str){
    return tsk_string_unquote(s_str, "\"", "\"");
}

function tsk_strdup(s_str) {
    if (s_str) {
        return new String(s_str).toString();
    }
    return s_str;
}

// tsk_string_format(s_format, ...)
function tsk_string_format(s_str) {
    for (var i = 1; i < arguments.length; i++) {
        var regexp = new RegExp('\\{' + (i - 1) + '\\}', 'gi');
        s_str = s_str.replace(regexp, arguments[i]);
    }
    return s_str;
};

function tsk_string_equals(s_1, s_2) {
    return (s_1 == s_2);
}

function tsk_string_iequals(s_1, s_2) {
    if (s_1 && s_2) {
        return s_1.toLowerCase() == s_2.toLowerCase();
    }
    return (s_1 == s_2);
}

function tsk_string_random_from_dict(i_length, s_dict) {
    var s_ret = "";
    for (var i = 0; i < i_length; i++) {
        s_ret += s_dict[Math.floor(Math.random() * s_dict.length)];
    }
    return s_ret;
}

function tsk_string_random(i_length) {
    var s_dict = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    return tsk_string_random_from_dict(i_length, s_dict);
}

function tsk_string_random_uuid() {
    // e.g. 6ba7b810-9dad-11d1-80b4-00c04fd430c8
    var s_dict = "0123456789abcdef";
    return tsk_string_format("{0}-{1}-{2}-{3}-{4}",
            tsk_string_random_from_dict(8, s_dict),
            tsk_string_random_from_dict(4, s_dict),
            tsk_string_random_from_dict(4, s_dict), 
            tsk_string_random_from_dict(4, s_dict),
            tsk_string_random_from_dict(12, s_dict));
}

function tsk_string_to_int(s_str, i_default) {
    try{ return parseInt(s_str); }
    catch(e){ return i_default; }
}

function tsk_string_to_object(s_str) {
     if(!tsk_string_is_null_or_empty(s_str)){
        try{ eval("var obj = " + s_str + ";"); return obj; }
        catch(e){}
     }
}

// s_url: <scheme>://<host>:<port>/<dir>
// <dir> is optional
// s_url: udp://192.168.0.10:8545/ws
// @return array is succeed or null otherwise
function tsk_string_parse_url(s_url) {
    if (!s_url) {
        tsk_utils_log_error("Invalid argument");
        return null;
    }
    var i_0 = s_url.indexOf("://");
    var i_1 = s_url.lastIndexOf(":");
    if (i_0 == -1 || i_1 == -1) {
        tsk_utils_log_error(s_url + " not valid as url");
        return null;
    }
    var ao_params = new Array();
    ao_params.push(s_url.substring(0, i_0));
    ao_params.push(s_url.substring((i_0 + 3), i_1));

    try {
        var i_3 = s_url.substring(i_0 + 3).indexOf("/");
        if (i_3 == -1) {
            ao_params.push(parseInt(s_url.substring(i_1 + 1), 10));
        }
        else {
            ao_params.push(parseInt(s_url.substring(i_1 + 1, i_3 + i_0 + 3), 10));
            ao_params.push(s_url.substring(i_3 + i_0 + 3 + 1));
        }
    }
    catch (e) {
        tsk_utils_log_error(e);
        return null;
    }

    return ao_params;
}