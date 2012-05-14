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