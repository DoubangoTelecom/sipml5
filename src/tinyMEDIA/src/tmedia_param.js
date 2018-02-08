/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
var tmedia_param_type_e =
{
    CODEC: 0,
    SESSION: 1,
    MANAGER: 2
};

function tmedia_param(e_type, e_media_type, s_key, o_value) {
    this.e_type = e_type;
    this.e_media_type = e_media_type;
    this.s_key = s_key;
    this.o_value = o_value;
}