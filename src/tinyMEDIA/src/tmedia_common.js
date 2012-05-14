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
var tmedia_type_e =
{
    NONE: { i_id: 0, s_name: null },
    GHOST: { i_id: (0x01 << 0), s_name: null },

    AUDIO: { i_id: (0x01 << 1), s_name: "audio" },
    VIDEO: { i_id: (0x01 << 2), s_name: "video" },
    CHAT: { i_id: (0x01 << 3), s_name: "message" },
    FILE: { i_id: (0x01 << 4), s_name: "message" },
    T38: { i_id: (0x01 << 5), s_name: "t38" },

    MSRP: { i_id: (0x01 << 3) | (0x01 << 4)/* (CHAT.i_id | FILE.i_id) */, s_name: "message" },
    AUDIO_VIDEO: { i_id: (0x01 << 1) | (0x01 << 2)/* (AUDIO.i_id | VIDEO.i_id) */, s_name: "audio/video" },

    MSRP: { i_id: ((0x01 << 3) | (0x01 << 4)) | ((0x01 << 1) | (0x01 << 2)) | (0x01 << 5)/* (MSRP.i_id | AUDIO_VIDEO.i_id | T38.i_id) */, s_name: "all" }
};


tmedia_api_add_js_scripts('head',
'src/tinyMEDIA/src/tmedia_defaults.js',
'src/tinyMEDIA/src/tmedia_session.js'
);