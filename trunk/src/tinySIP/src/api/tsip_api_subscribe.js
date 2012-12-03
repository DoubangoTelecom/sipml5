/*
* Copyright (C) 2012 Doubango Telecom <http://www.doubango.org>
* License: GPLv3
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
var tsip_event_subscribe_type_e =
{
	I_SUBSCRIBE: 0,
	AO_SUBSCRIBE: 1,
	
	I_UNSUBSRIBE: 10,
	AO_UNSUBSCRIBE: 11,

	I_NOTIFY: 20,
	AO_NOTIFY: 21
};

function tsip_event_subscribe(o_sip_session, i_code, s_phrase, o_sip_message, e_subscribe_type) {
    this.__proto__ = new tsip_event(o_sip_session, i_code, s_phrase, o_sip_message, tsip_event_type_e.SUBSCRIBE);
    this.e_type = e_subscribe_type;
}