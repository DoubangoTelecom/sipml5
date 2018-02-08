/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
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
    SCREEN_SHARE: { i_id: (0x01 << 2) | (0x01 << 6) /* VIDEO + SCREENSHARE */, s_name: "sccreen share" },
    BFCP: { i_id: (0x01 << 7), s_name: "bfcp" },
    BFCPAUDIO: { i_id: (0x01 << 8) | (0x01 << 7)/*BFCP*/, s_name: "bfcpaudio" },
    BFCPVIDEO: { i_id: (0x01 << 9) | (0x01 << 7)/*BFCP*/, s_name: "bfcpvideo" },

    MSRP: { i_id: (0x01 << 3) | (0x01 << 4)/* (CHAT.i_id | FILE.i_id) */, s_name: "message" },
    AUDIO_VIDEO: { i_id: (0x01 << 1) | (0x01 << 2)/* (AUDIO.i_id | VIDEO.i_id) */, s_name: "audio/video" },
    AUDIO_BFCPVIDEO: { i_id: (0x01 << 1) | (0x01 << 9) | (0x01 << 7), s_name: "audio/bfcpvideo" },
    VIDEO_BFCPVIDEO: { i_id: (0x01 << 2) | (0x01 << 9) | (0x01 << 7), s_name: "video/bfcpvideo" },
    AUDIO_VIDEO_BFCPVIDEO: { i_id: (0x01 << 1) | (0x01 << 2) | (0x01 << 9) | (0x01 << 7), s_name: "audio/video/bfcpvideo" },

    ALL: { i_id: 0xFF, s_name: "all" }
};

function tmedia_type_from_id(i_id) {
    for (var key in tmedia_type_e) {
        if (tmedia_type_e[key].i_id == i_id) {
            return tmedia_type_e[key];
        }
    }
    return tmedia_type_e.NONE;
}

if(!window.__b_release_mode){
    tmedia_api_add_js_scripts('head',
    'src/tinyMEDIA/src/tmedia_webrtc4all.js', // must be first
    'src/tinyMEDIA/src/tmedia_defaults.js',
    'src/tinyMEDIA/src/tmedia_session.js'
    );
}