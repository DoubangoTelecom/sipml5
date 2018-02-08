/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
tsip_session_message.prototype = Object.create(tsip_session.prototype);

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
    tsip_session.call(this, o_stack);    
    this.__set(Array.prototype.slice.call(arguments, 1));
}

// send(o_content, s_content_type, ...)
tsip_session_message.prototype.send = function (o_content, s_content_type) {
    if (!o_content) {
        tsk_utils_log_error("Invalid argument");
        return -1;
    }

    if (this.o_stack.e_state != tsip_transport_state_e.STARTED) {
        tsk_utils_log_error("Stack not started");
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