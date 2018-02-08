/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
var tsdp_header_type_e =
{
    NONE: { i_rank: -1, c_name: null },

    A: { i_rank: 13, c_name: 'a' },
    B: { i_rank: 8, c_name: 'b' },
    C: { i_rank: 7, c_name: 'c' },
    DUMMY: { i_rank: 255, c_name: '*' },
    E: { i_rank: 5, c_name: 'e' },
    I: { i_rank: 3, c_name: 'i' },
    K: { i_rank: 12, c_name: 'k' },
    M: { i_rank: 14, c_name: 'm' },
    O: { i_rank: 1, c_name: 'o' },
    P: { i_rank: 6, c_name: 'p' },
    R: { i_rank: 10, c_name: 'r' },
    S: { i_rank: 2, c_name: 's' },
    T: { i_rank: 9, c_name: 't' },
    U: { i_rank: 4, c_name: 'u' },
    V: { i_rank: 0, c_name: 'v' },
    Z: { i_rank: 11, c_name: 'z' }
};

function tsdp_header(e_type) {
    this.e_type = e_type;
}

tsdp_header.prototype.tostring_full = function (b_without_crlf, s_endline) {
    return tsk_string_format("{0}={1}{2}", this.get_name(), this.toString(s_endline), b_without_crlf ? "" : (s_endline ? s_endline : "\r\n"));
}

tsdp_header.prototype.get_name = function () {
    if (this.e_type == tsdp_header_type_e.DUMMY) {
        return this.c_name;
    }
    return this.e_type.c_name;
}

function tsdp_header_compare_by_rank(o_hdr_1, o_hdr_2) {
    if (o_hdr_1 && o_hdr_2) {
        return o_hdr_1.e_type.i_rank - o_hdr_2.e_type.i_rank;
    }
    return -1;
}


if(!window.__b_release_mode){
    tsdp_api_add_js_scripts('head',
        'src/tinySDP/src/headers/tsdp_header_A.js',
        'src/tinySDP/src/headers/tsdp_header_C.js',
        'src/tinySDP/src/headers/tsdp_header_M.js',
        'src/tinySDP/src/headers/tsdp_header_O.js',
        'src/tinySDP/src/headers/tsdp_header_Str.js', // B, E, I, K, P, R, S, T, U, Z
        'src/tinySDP/src/headers/tsdp_header_V.js'
    );
}