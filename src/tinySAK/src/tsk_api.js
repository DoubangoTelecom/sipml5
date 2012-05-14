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
function tsk_api_add_js_script(s_src, s_elt) {
    var tag_hdr = document.getElementsByTagName(s_elt)[0];
    var tag_script = document.createElement('script');
    tag_script.setAttribute('type', 'text/javascript');
    tag_script.setAttribute('src', s_src);
    tag_hdr.appendChild(tag_script);
};

tsk_api_add_js_script('./src/tinySAK/src/tsk_base64.js', 'head');
tsk_api_add_js_script('./src/tinySAK/src/tsk_buff.js', 'head');
tsk_api_add_js_script('./src/tinySAK/src/tsk_fsm.js', 'head');
tsk_api_add_js_script('./src/tinySAK/src/tsk_md5.js', 'head');
tsk_api_add_js_script('./src/tinySAK/src/tsk_param.js', 'head');
tsk_api_add_js_script('./src/tinySAK/src/tsk_ragel.js', 'head');
tsk_api_add_js_script('./src/tinySAK/src/tsk_string.js', 'head');