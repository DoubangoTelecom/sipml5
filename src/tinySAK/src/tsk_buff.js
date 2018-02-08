/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
// convert a string to a integer buffer
// each char will be converted to it's conresponding utf-16 value
function tsk_buff_str2ib(s_str) {
    if (!s_str) {
        tsk_utils_log_error("Invalid argument");
        return -1;
    }
    var len = s_str.length;
    var ib = new Array(len);
    for (var i = 0; i < len; ++i) {
        ib[i] = s_str.charCodeAt(i);
    }
    return ib;
}

function tsk_buff_ab2str(buff) {
    return tsk_buff_u8b2ascii(new Uint8Array(buff));
}

function tsk_buff_u8b2ascii(au8_buff) {
    // return Array.prototype.slice.call(au8_buff).join("");
    var str = new String();
    var i_length = au8_buff.byteLength == undefined ? au8_buff.length : au8_buff.byteLength;
    for (var i = 0; i < i_length; ++i) {
        str += String.fromCharCode(au8_buff[i] & 0xff);
    }
    return str;
}

function tsk_buff_u8b2utf8(au8_buff) {
    try {
        var str = new String();
        var c_char;
        var i_length = au8_buff.byteLength == undefined ? au8_buff.length : au8_buff.byteLength;
        for (var i = 0; i < i_length; ) {
            c_char = au8_buff[i];
            if (c_char < 0x80) {
                str += String.fromCharCode(c_char); ++i;
            }
            else if ((c_char > 0xbf) && (c_char < 0xe0)) {
                str += String.fromCharCode(((c_char & 0x1f) << 6) | (au8_buff[i + 1] & 0x3f)); i += 2;
            }
            else {
                str += String.fromCharCode(((c_char & 0x0f) << 12) | ((au8_buff[i + 1] & 0x3f) << 6) | (au8_buff[i + 2] & 0x3f)); i += 3;
            }
        }
        return str;
    }
    catch (e) {
        tsk_utils_log_error(e);
        return tsk_buff_u8b2ascii(au8_buff);
    }
}

function tsk_buff_str2u8b(s_str) {
    var array = new Uint8Array(s_str.length);
    for (var i = 0; i < s_str.length; ++i) {
        array[i] = s_str[i].charCodeAt(0) & 0xff;
    }
    return array;
}