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
function tmedia_api_add_js_scripts(s_elt) {
    var tag_hdr = document.getElementsByTagName(s_elt)[0];
    for (var i = 1; i < arguments.length; ++i) {
        var tag_script = document.createElement('script');
        tag_script.setAttribute('type', 'text/javascript');
        tag_script.setAttribute('src', arguments[i] + "?svn=8");
        tag_hdr.appendChild(tag_script);
    }
};

tmedia_api_add_js_scripts('head',
'src/tinyMEDIA/src/tmedia_common.js',
//'src/tinyMEDIA/src/tmedia_defaults.js', #include_in<tmedia_common.js>
'src/tinyMEDIA/src/tmedia_param.js',
'src/tinyMEDIA/src/tmedia_qos.js'
//'src/tinyMEDIA/src/tmedia_session.js', #include_in<tmedia_common.js>
//'src/tinyMEDIA/src/tmedia_session_jsep.js', #include_in<tmedia_session.js>
//'src/tinyMEDIA/src/tmedia_session_roap.js', #include_in<tmedia_session.js>
//'src/tinyMEDIA/src/tmedia_session_ghost.js' #include_in<tmedia_session.js>
// 'src/tinyMEDIA/src/tmedia_webrtc4all.js' // #include_in<tmedia_common.js>
);