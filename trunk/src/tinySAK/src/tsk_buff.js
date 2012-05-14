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
// convert a string to a integer buffer
// each char will be converted to it's conresponding utf-16 value
function tsk_buff_str2ib(s_str) {
    if (!s_str) {
        console.error("Invalid argument");
        return -1;
    }
    var len = s_str.length;
    var ib = new ArrayBuffer(len);
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
    for (var i = 0; i < au8_buff.byteLength; ++i) {
        str += String.fromCharCode(au8_buff[i] & 0xff);
    }
    return str;
}

function tsk_buff_u8b2utf8(au8_buff) {
    try {
        var str = new String();
        var c_char;
        for (var i = 0; i < au8_buff.byteLength; ) {
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
        console.error(e);
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