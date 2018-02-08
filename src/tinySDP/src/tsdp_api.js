/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
function tsdp_api_add_js_scripts(s_elt) {
    var tag_hdr = document.getElementsByTagName(s_elt)[0];
    for (var i = 1; i < arguments.length; ++i) {
        var tag_script = document.createElement('script');
        tag_script.setAttribute('type', 'text/javascript');
        tag_script.setAttribute('src', arguments[i] + "?svn=252");
        tag_hdr.appendChild(tag_script);
    }
};

// add tinySAK API
tsdp_api_add_js_scripts('head', 'src/tinySAK/src/tsk_api.js');

tsdp_api_add_js_scripts('head',
    'src/tinySDP/src/headers/tsdp_header.js',
    // 'src/tinySDP/src/headers/tsdp_header_A.js', #include_in<tsdp_header.js>
    // 'src/tinySDP/src/headers/tsdp_header_B.js', #include_in<tsdp_header.js>
    // 'src/tinySDP/src/headers/tsdp_header_C.js', #include_in<tsdp_header.js>
    // 'src/tinySDP/src/headers/tsdp_header_Dummy.js', #include_in<tsdp_header.js>
    // 'src/tinySDP/src/headers/tsdp_header_E.js', #see<tsdp_header_Str.js>
    // 'src/tinySDP/src/headers/tsdp_header_I.js', #see<tsdp_header_Str.js>
    // 'src/tinySDP/src/headers/tsdp_header_K.js', #see<tsdp_header_Str.js>
    // 'src/tinySDP/src/headers/tsdp_header_M.js', #include_in<tsdp_header.js>
    // 'src/tinySDP/src/headers/tsdp_header_O.js', #include_in<tsdp_header.js>
    // 'src/tinySDP/src/headers/tsdp_header_P.js', #see<tsdp_header_Str.js>
    // 'src/tinySDP/src/headers/tsdp_header_R.js', #include_in<tsdp_header.js>
    // 'src/tinySDP/src/headers/tsdp_header_S.js', #see<tsdp_header_Str.js>
    // 'src/tinySDP/src/headers/tsdp_header_Str.js', #include_in<tsdp_header.js>
    // 'src/tinySDP/src/headers/tsdp_header_T.js', #include_in<tsdp_header.js>
    // 'src/tinySDP/src/headers/tsdp_header_U.js', #include_in<tsdp_header.js>
    // 'src/tinySDP/src/headers/tsdp_header_V.js', #include_in<tsdp_header.js>
    // 'src/tinySDP/src/headers/tsdp_header_Z.js' #include_in<tsdp_header.js>

    'src/tinySDP/src/tsdp_message.js'
    //'src/tinySDP/src/tsdp_parser_message.js' #include_in<tsdp_message.js>
);