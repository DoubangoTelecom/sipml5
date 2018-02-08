/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
tsip_transac.prototype.__magic_cookie = "z9hG4bK";

var tsip_transac_event_type_e =
{
    INCOMING_MSG : 0,
	OUTGOING_MSG: 1,
	CANCELED: 2,
	TERMINATED: 3,
	TIMEDOUT: 4,
	ERROR: 5,
	TRANSPORT_ERROR: 6
};

var tsip_transac_type_e =
{
    NONE: -1,

    ICT: 0,
    IST: 1,
    NICT: 2,
    NIST: 3
};

function tsip_transac() {
    this.e_type = tsip_transac_type_e.NONE;
    this.o_dialog = null;
    this.o_fsm = null;
    this.b_reliable = true;
    this.b_running = false;
    this.b_initialized = false;
    this.s_branch = null;
    this.i_cseq_value = 0;
    this.s_cseq_method = null;
    this.s_callid = null;
    this.fn_callback = null;
};

tsip_transac.prototype.init = function (e_type, b_reliable, i_cseq_value, s_cseq_method, s_callid, o_dialog, i_fsm_state_curr, i_fsm_state_term) {
    if (!this.b_initialized) {
        this.e_type = e_type;
        this.b_reliable = b_reliable;
        this.i_cseq_value = i_cseq_value;
        this.s_cseq_method = s_cseq_method;
        this.s_callid = s_callid;
        this.o_dialog = o_dialog;
        this.o_fsm = new tsk_fsm(i_fsm_state_curr, i_fsm_state_term, null, this);
        this.b_initialized = true;
    }
    return 0;
};

tsip_transac.prototype.deinit = function () {
    this.get_stack().o_layer_transac.remove(this);
    this.b_initialized = false;
    return 0;
}

tsip_transac.prototype.timer_schedule = function (T, N) {
    this.timer_cancel(N);
    var This = this;
    var s_code = tsk_string_format("This.o_timer{1} = setTimeout(function(){ __tsip_transac_{0}_timer_callback(This, This.o_timer{1})}, This.i_timer{1});", T, N);
    eval(s_code);
}

tsip_transac.prototype.timer_cancel = function (N) {
    var s_code = tsk_string_format("if(this.o_timer{0}) { clearTimeout(this.o_timer{0}); this.o_timer{0} = null; }", N);
    eval(s_code);
}

tsip_transac.prototype.set_callback = function (fn_callback) {
    this.fn_callback = fn_callback;
}

tsip_transac.prototype.send = function (s_branch, o_message) {
    return this.get_stack().o_layer_transport.send(s_branch, o_message);
}

tsip_transac.prototype.callback = function (e_event_type, o_message) {
    if (this.fn_callback) {
        return this.fn_callback(this, e_event_type, o_message);
    }
    tsk_utils_log_error("Invalid callback function");
    return -1;
}

tsip_transac.prototype.get_type = function () {
    return this.e_type;
}

tsip_transac.prototype.get_fsm = function () {
    return this.o_fsm;
}

tsip_transac.prototype.get_dialog = function () {
    return this.o_dialog;
}

tsip_transac.prototype.get_session = function () {
    if (this.o_dialog) {
        return this.o_dialog.o_session;
    }
    return null;
}

tsip_transac.prototype.get_stack = function () {
    var o_session = this.get_session();
    if (o_session) {
        return o_session.o_stack;
    }
    return null;
}

tsip_transac.prototype.fsm_act = function (i_action, o_message) {
    if (!this.o_fsm) {
        tsk_utils_log_error("Invalid argument");
        return -1;
    }
    return this.o_fsm.act(i_action, this, o_message, this, o_message);
};

tsip_transac.prototype.send = function (s_branch, o_message) {
    var o_stack = this.get_stack();
    if (!o_stack || !o_stack.o_layer_transport) {
        tsk_utils_log_error("Invalid state");
        return -1;
    }
    return o_stack.o_layer_transport.send(s_branch, o_message);
}

tsip_transac.prototype.compare = function (transac) {
    return tsip_transac_compare(this, transac);
}

function tsip_transac_compare(o_transac1, o_transac2){
	if(o_transac1 && o_transac2){
		if((o_transac1.s_branch == o_transac2.s_branch) && (o_transac1.s_cseq_method == o_transac2.s_cseq_method)){
			return 0;
		}
	}
	return -1;
}

if(!window.__b_release_mode){
    tsip_api_add_js_scripts('head',
     'src/tinySIP/src/transactions/tsip_transac_ict.js',
     'src/tinySIP/src/transactions/tsip_transac_ist.js',
     'src/tinySIP/src/transactions/tsip_transac_layer.js',
     'src/tinySIP/src/transactions/tsip_transac_nict.js',
     'src/tinySIP/src/transactions/tsip_transac_nist.js'
    );
}
