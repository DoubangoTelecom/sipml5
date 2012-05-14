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
function tsk_string_is_null_or_empty(s_str) {
    return !s_str || s_str == "";
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
