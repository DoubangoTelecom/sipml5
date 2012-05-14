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
