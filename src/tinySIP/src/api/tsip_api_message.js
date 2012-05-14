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
var tsip_event_message_type_e =
{
	I_MESSAGE: 0,
	AO_MESSAGE: 1
};

function tsip_event_message(o_sip_session, i_code, s_phrase, o_message, e_message_type) {
    this.__proto__ = new tsip_event(o_sip_session, i_code, s_phrase, o_message, tsip_event_type_e.MESSAGE);
    this.e_message_type = e_message_type;
}

function tsip_session_message(o_stack) {
    var o_proto = new tsip_session(o_stack);
    if (o_proto) {
        this.__proto__.__proto__ = o_proto;
        this.__set(Array.prototype.slice.call(arguments, 1));
    }
}

// send(o_content, s_content_type, ...)
tsip_session_message.prototype.send = function (o_content, s_content_type) {
    if (!o_content) {
        console.error("Invalid argument");
        return -1;
    }

    if (this.o_stack.e_state != tsip_transport_state_e.STARTED) {
        console.error("Stack not started");
        return -2;
    }

    var i_ret = -1;
    var o_action = new tsip_action(tsip_action_type_e.MESSAGE);
    if (o_action) {
        var o_dialog = this.o_stack.o_layer_dialog.dialog_new(tsip_dialog_type_e.MESSAGE, this);
        if (o_dialog) {
            o_action.set_content(o_content);
            if (s_content_type) {
                o_action.add_headers(new tsip_header_Content_Type(s_content_type));
            }
            if ((i_ret = o_dialog.fsm_act(o_action.e_type, null, o_action)) == 0) { }
        }
    }

    return i_ret;
}