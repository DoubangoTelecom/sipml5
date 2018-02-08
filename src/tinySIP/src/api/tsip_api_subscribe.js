/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
tsip_session_subscribe.prototype = Object.create(tsip_session.prototype);
tsip_event_subscribe.prototype = Object.create(tsip_event.prototype);

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
    tsip_event.call(this, o_sip_session, i_code, s_phrase, o_sip_message, tsip_event_type_e.SUBSCRIBE);
    this.e_subscribe_type = e_subscribe_type;
}

/**
* SIP <b>SUBSCRIBE</b> session.
* @ctor
* Signature: tsip_session_publish(o_stack, ...set())
* @tparam tsip_stack o_stack SIP stack to use to create this session
*/
function tsip_session_subscribe(o_stack) {
    tsip_session.call(this, o_stack);
    this.__set(Array.prototype.slice.call(arguments, 1));
}

tsip_session_subscribe.prototype.subscribe = function () {
    if (this.o_stack.e_state != tsip_transport_state_e.STARTED) {
        tsk_utils_log_error("Stack not started");
        return -2;
    }

    var i_ret = -1;
    var o_action = new tsip_action(tsip_action_type_e.SUBSCRIBE);
    if(o_action){
        var o_dialog = this.o_stack.o_layer_dialog.find_by_ss(this);
        if (!o_dialog) {
            o_dialog = this.o_stack.o_layer_dialog.dialog_new(tsip_dialog_type_e.SUBSCRIBE, this);
        }
        i_ret = o_dialog.fsm_act(o_action.e_type, null, o_action);
    }

    return i_ret;
}

tsip_session_subscribe.prototype.unsubscribe = function () {
    return this.__action_any(tsip_action_type_e.UNSUBSCRIBE);
}