/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
tsip_event_info.prototype = Object.create(tsip_event.prototype);
var tsip_event_info_type_e =
{
    I_INFO: 0,
    AO_INFO: 1
};

function tsip_event_info(o_sip_session, i_code, s_phrase, o_sip_message, e_info_type) {
    //this.__proto__ = new tsip_event(o_sip_session, i_code, s_phrase, o_sip_message, tsip_event_type_e.INFO);
    tsip_event.call(this, o_sip_session, i_code, s_phrase, o_sip_message, tsip_event_type_e.INFO);
    this.e_type = e_info_type;
}
