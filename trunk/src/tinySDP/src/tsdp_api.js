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
function tsdp_api_add_js_script(s_src, s_elt) {
    var tag_hdr = document.getElementsByTagName(s_elt)[0];
    var tag_script = document.createElement('script');
    tag_script.setAttribute('type', 'text/javascript');
    tag_script.setAttribute('src', s_src);
    tag_hdr.appendChild(tag_script);
};

function tsdp_api_add_js_scripts(s_elt) {
    var tag_hdr = document.getElementsByTagName(s_elt)[0];
    for (var i = 1; i < arguments.length; ++i) {
        var tag_script = document.createElement('script');
        tag_script.setAttribute('type', 'text/javascript');
        tag_script.setAttribute('src', arguments[i]);
        tag_hdr.appendChild(tag_script);
    }
};

// add tinySAK API
tsdp_api_add_js_scripts('head', 'src/tinySAK/src/tsk_api.js');

// add tinySDP API
tsdp_api_add_js_scripts('head',
'src/tinySDP/src/tsdp_message.js'
//'src/tinySDP/src/tsdp_parser_message.js' #include_in<tsdp_message.js>
);


tsdp_api_add_js_scripts('head',
'src/tinySDP/src/headers/tsdp_header.js',
'src/tinySDP/src/headers/tsdp_header_A.js',
'src/tinySDP/src/headers/tsdp_header_B.js',
'src/tinySDP/src/headers/tsdp_header_C.js',
'src/tinySDP/src/headers/tsdp_header_Dummy.js',
'src/tinySDP/src/headers/tsdp_header_E.js',
'src/tinySDP/src/headers/tsdp_header_I.js',
'src/tinySDP/src/headers/tsdp_header_K.js',
'src/tinySDP/src/headers/tsdp_header_M.js',
'src/tinySDP/src/headers/tsdp_header_O.js',
'src/tinySDP/src/headers/tsdp_header_P.js',
'src/tinySDP/src/headers/tsdp_header_R.js',
'src/tinySDP/src/headers/tsdp_header_S.js',
'src/tinySDP/src/headers/tsdp_header_T.js',
'src/tinySDP/src/headers/tsdp_header_U.js',
'src/tinySDP/src/headers/tsdp_header_V.js',
'src/tinySDP/src/headers/tsdp_header_Z.js'
);