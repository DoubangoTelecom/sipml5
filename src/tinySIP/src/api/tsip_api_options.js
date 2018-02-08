/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
var tsip_event_options_type_e = 
{
	I_OPTIONS: 0,
	AO_OPTIONS: 1
};

function tsip_event_options(o_sip_session, i_code, s_phrase, o_sip_message, e_options_type) {
    this.__proto__ = new tsip_event(o_sip_session, i_code, s_phrase, o_sip_message, tsip_event_type_e.OPTIONS);
    this.e_type = e_options_type;
}