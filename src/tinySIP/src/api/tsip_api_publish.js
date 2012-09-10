/*
* Copyright (C) 2012 Doubango Telecom <http://www.doubango.org>
* License: GPLv3
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
var tsip_event_publish_type_e =
{
    I_PUBLISH: 0,
    AO_PUBLISH: 1,

    I_UNPUBLISH: 10,
    AO_UNPUBLISH: 11
};

function tsip_event_publish(o_sip_session, i_code, s_phrase, o_sip_message, e_publish_type) {
    this.__proto__ = new tsip_event(o_sip_session, i_code, s_phrase, o_sip_message, tsip_event_type_e.PUBLISH);
    this.e_type = e_publish_type;
}