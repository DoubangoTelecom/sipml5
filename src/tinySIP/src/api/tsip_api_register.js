/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
/**
* SIP <b>REGISTER</b> event types
* @var
*/
tsip_session_register.prototype = Object.create(tsip_session.prototype);
tsip_event_register.prototype = Object.create(tsip_event.prototype);

var tsip_event_register_type_e =
{
	I_NEW_REGISTER: 0,

	I_REGISTER: 10, // refresh
	AO_REGISTER: 11,

	I_UNREGISTER: 20,
	AO_UNREGISTER: 21
};

/**
* SIP <b>REGISTER</b> session.
* @ctor
* Signature: tsip_session_register(o_stack, ...set())
* @tparam tsip_stack o_stack SIP stack to use to create this session
*/
function tsip_session_register(o_stack) {
    tsip_session.call(this, o_stack);
    this.__set(Array.prototype.slice.call(arguments, 1));
}

/**
* SIP <b>REGISTER</b> event. <br /> The registration state will be reported through @ref tsip_stack::on_event_dialog.
* Used to report <b>REGISTER</b> events via @ref tsip_stack::on_event_dialog
* @ctor
* @tparam tsip_session_register o_session SIP session
* @tparam int i_code Event code
* @tparam String s_phrase Event description
* @tparam tsip_message o_sip_message SIP message
* @tparam tsip_event_register_type_e e_register_type <b>REGISTER</b> event type
*
@code
o_session = new tsip_session_register(o_stack,
                tsip_session.prototype.SetExpires(1800),
                tsip_session.prototype.SetHeader("Purpose", "Registering"),
                tsip_session.prototype.SetCaps("+g.oma.sip-im"),
                tsip_session.prototype.SetCaps("+audio"),
                tsip_session.prototype.SetCaps("language", "\"en,fr\"")
 );
@endcode
*/
function tsip_event_register(o_session, i_code, s_phrase, o_sip_message, e_register_type) {
    tsip_event.call(this, o_session, i_code, s_phrase, o_sip_message, tsip_event_type_e.REGISTER);
    this.e_register_type = e_register_type;
}

/**
* Registers (login) the session. Sends SIP <b>REGISTER</b> message. <br/>The registration state will be reported through @ref tsip_stack::on_event_dialog. <br />
* Signature: register(...set())
* @treturn int zero if succeed and non-zero otherwise
*
@code
o_session.register();
@endcode
*/
tsip_session_register.prototype.register = function () {
    if (this.o_stack.e_state != tsip_transport_state_e.STARTED) {
        tsk_utils_log_error("Stack not started");
        return -2;
    }

    var i_ret = -1;
    var o_action = new tsip_action(tsip_action_type_e.REGISTER);
    if(o_action){
        var o_dialog = this.o_stack.o_layer_dialog.find_by_ss(this);
        if (!o_dialog) {
            o_dialog = this.o_stack.o_layer_dialog.dialog_new(tsip_dialog_type_e.REGISTER, this);
        }
        i_ret = o_dialog.fsm_act(o_action.e_type, null, o_action);
    }

    return i_ret;
}

/**
* UnRegisters (logout) the session. Sends SIP <b>REGISTER</b> message with expires value equal to zero. <br />The registration state will be reported through @ref tsip_stack::on_event_dialog. <br />
* Signature: unregister(...set())
* @treturn int zero if succeed and non-zero otherwise
*
@code
o_session.unregister();
@endcode
*/
tsip_session_register.prototype.unregister = function () {
    return this.__action_any(tsip_action_type_e.UNREGISTER);
}