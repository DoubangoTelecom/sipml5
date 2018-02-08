/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
var tsip_event_type_e =
{
    NONE: -1,

    INVITE: 0,
    MESSAGE: 1,
    INFO: 2,
    OPTIONS: 3,
    PUBLISH: 4,
    REGISTER: 5,
    SUBSCRIBE: 6,

    DIALOG: 20,
    STACK: 21
};

var tsip_event_code_e = 
{
    // 100-699 are SIP reserved codes

    // 7xx ==> errors
    DIALOG_TRANSPORT_ERROR: 702,
    DIALOG_GLOBAL_ERROR: 703,
    DIALOG_MESSAGE_ERROR: 704,
    DIALOG_WEBRTC_ERROR: 705,

    // 8xx ==> success
    DIALOG_REQUEST_INCOMING: 800,
    DIALOG_REQUEST_OUTGOING: 802,
    DIALOG_REQUEST_CANCELLED: 803,
    DIALOG_REQUEST_SENT: 804,
    DIALOG_MEDIA_ADDED: 805,
    DIALOG_MEDIA_REMOVED: 806,
    DIALOG_MEDIA_LOCAL_REQUESTED: 807,
    DIALOG_MEDIA_LOCAL_ACCEPTED: 808,
    DIALOG_MEDIA_LOCAL_REFUSED: 809,

    // 9xx ==> Informational
    DIALOG_CONNECTING: 900,
    DIALOG_CONNECTED: 901,
    DIALOG_TERMINATING: 902,
    DIALOG_TERMINATED: 903,
    DIALOG_BFCP_INFO: 904,
    STACK_STARTING: 950,
    STACK_STARTED: 951,
    STACK_STOPPING: 952,
    STACK_STOPPED: 953,
    STACK_FAILED_TO_START: 954,
    STACK_FAILED_TO_STOP: 955
};

function tsip_event(o_session, i_code, s_phrase, o_message, e_type) {
    this.init(o_session, i_code, s_phrase, o_message, e_type);  
}

tsip_event.prototype.init = function (o_session, i_code, s_phrase, o_message, e_type) {
    this.o_session = o_session;
    this.o_usr_data = null;
    this.i_code = i_code;
    this.s_phrase = s_phrase;
    this.o_message = o_message;
    this.e_type = e_type;
    return 0;
}

tsip_event.prototype.get_session = function () {
    return this.o_session;
}

tsip_event.prototype.get_message = function () {
    return this.o_message;
}

tsip_event.prototype.get_code = function () {
    return this.i_code;
}

tsip_event.prototype.get_phrase = function () {
    return this.s_phrase;
}

tsip_event.prototype.set_usr_data = function (o_usr_data) {
    this.o_usr_data = o_usr_data;
}

tsip_event.prototype.is_type_session = function () {
    switch (this.e_type) {
        case tsip_event_type_e.INVITE:
        case tsip_event_type_e.MESSAGE:
        case tsip_event_type_e.INFO:
        case tsip_event_type_e.OPTIONS:
        case tsip_event_type_e.PUBLISH:
        case tsip_event_type_e.REGISTER:
        case tsip_event_type_e.SUBSCRIBE:
        case tsip_event_type_e.DIALOG:
            {
                return true;
            }
    }
    return false;
};

tsip_event.prototype.is_type_stack = function () {
    return (this.e_type == tsip_event_type_e.STACK);
};

// o_message: optional
tsip_event.prototype.signal = function () {
    var This = this;
    if (this.o_session.on_event && this.is_type_session()) {
        setTimeout(function () { This.o_session.on_event(This) }, 1);
    }
    
    switch (this.e_type) {
        case tsip_event_type_e.DIALOG:
            {
                if (This.o_session.o_stack.on_event_dialog) {
                    setTimeout(function () { This.o_session.o_stack.on_event_dialog(This) }, 1);
                }
                break;
            }
        case tsip_event_type_e.STACK:
            {
                if (This.o_session.o_stack.on_event_stack) {
                    setTimeout(function () { This.o_session.o_stack.on_event_stack(This) }, 1);
                }
            }
        case tsip_event_type_e.INVITE:
            {
                if (This.o_session.o_stack.on_event_invite) {
                    setTimeout(function () { This.o_session.o_stack.on_event_invite(This) }, 1);
                }
                break;
            }
        case tsip_event_type_e.MESSAGE:
            {
                if (This.o_session.o_stack.on_event_message) {
                    setTimeout(function () { This.o_session.o_stack.on_event_message(This) }, 1);
                }
                break;
            }
        case tsip_event_type_e.PUBLISH:
            {
                if (This.o_session.o_stack.on_event_publish) {
                    setTimeout(function () { This.o_session.o_stack.on_event_publish(This) }, 1);
                }
                break;
            }
        case tsip_event_type_e.SUBSCRIBE:
            {
                if (This.o_session.o_stack.on_event_subscribe) {
                    setTimeout(function () { This.o_session.o_stack.on_event_subscribe(This) }, 1);
                }
                break;
            }
    }


    return 0;
}

tsip_event.prototype.Signal = function(e_type, o_session, i_code, s_phrase, o_message) {
    if (!o_session || !o_session.o_stack) {
        tsk_utils_log_error("Invalid argument");
        return -1;
    }
    var o_event = new tsip_event(o_session, i_code, s_phrase, o_message, e_type);
    return o_event.signal();
}
