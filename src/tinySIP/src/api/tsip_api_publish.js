/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
tsip_session_publish.prototype = Object.create(tsip_session.prototype);
tsip_event_publish.prototype = Object.create(tsip_event.prototype);

var tsip_event_publish_type_e =
{
    I_PUBLISH: 0,
    AO_PUBLISH: 1,

    I_UNPUBLISH: 10,
    AO_UNPUBLISH: 11
};

function tsip_event_publish(o_sip_session, i_code, s_phrase, o_sip_message, e_publish_type) {
    tsip_event.call(this, o_sip_session, i_code, s_phrase, o_sip_message, tsip_event_type_e.PUBLISH);
    this.e_publish_type = e_publish_type;
}

/**
* SIP <b>PUBLISH</b> session.
* @ctor
* Signature: tsip_session_publish(o_stack, ...set())
* @tparam tsip_stack o_stack SIP stack to use to create this session
*/
function tsip_session_publish(o_stack) {
    tsip_session.call(this, o_stack);
    this.__set(Array.prototype.slice.call(arguments, 1));
}

tsip_session_publish.prototype.publish = function (o_content, s_content_type) {
    if (this.o_stack.e_state != tsip_transport_state_e.STARTED) {
        tsk_utils_log_error("Stack not started");
        return -2;
    }

    var i_ret = -1;
    var o_action = new tsip_action(tsip_action_type_e.PUBLISH);
    if(o_action){
        var o_dialog = this.o_stack.o_layer_dialog.find_by_ss(this);
        if (!o_dialog) {
            o_dialog = this.o_stack.o_layer_dialog.dialog_new(tsip_dialog_type_e.PUBLISH, this);
        }
        
        // add content and content-type to the action object
        o_action.set_content(o_content);
        if (s_content_type) {
            o_action.add_headers(new tsip_header_Content_Type(s_content_type));
        }
        
        i_ret = o_dialog.fsm_act(o_action.e_type, null, o_action);
    }

    return i_ret;
}

tsip_session_publish.prototype.unpublish = function () {
    return this.__action_any(tsip_action_type_e.UNPUBLISH);
}
