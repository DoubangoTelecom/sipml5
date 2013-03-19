/*
* Copyright (C) 2012 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/

tsip_dialog_generic.prototype.init_subscribe = function () {
    this.s_etag = null;
    this.o_fsm.set(
        // Any -> (SEND SUBSCRIBE) -> InProgress
	    tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_generic_actions_e.O_SUBSCRIBE, tsip_dialog_generic_states_e.INPROGRESS, tsip_dialog_generic_Any_2_InProgress_X_oSubscribe, "tsip_dialog_generic_Any_2_InProgress_X_oSubscribe"),     
        // Any -> (INCOMING NOTIFY) -> Any
        tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_generic_actions_e.I_NOTIFY, tsk_fsm.prototype.__i_state_any, tsip_dialog_generic_Any_2_Any_X_iNotify, "tsip_dialog_generic_Any_2_Any_X_iNotify") 
    );
}

tsip_dialog_generic.prototype.send_subscribe = function () {
    var o_request;
    var i_ret = -1;

    if(this.b_disconnecting){
        this.i_expires = 0;
    }

    if ((o_request = this.request_new("SUBSCRIBE"))) {
        /* apply action params to the request */
        var o_action = this.get_action_curr();
        if(o_action && (i_ret = tsip_dialog.prototype.ApplyAction(o_request, o_action))){
            return i_ret;
        }
        i_ret = this.request_send(o_request);
    }

    return i_ret;
}

//--------------------------------------------------------
//				== STATE MACHINE BEGIN ==
//--------------------------------------------------------

// Any -> (SEND SUBSCRIBE) -> InProgress
function tsip_dialog_generic_Any_2_InProgress_X_oSubscribe(ao_args) {
    var o_dialog = ao_args[0];
    var o_action = ao_args[2];

    if(!o_dialog.b_running){
        o_dialog.b_running = true;
    }
    o_dialog.set_action_curr(o_action);

    // alert user
    if(o_dialog.e_state == tsip_dialog_state_e.INITIAL){
        o_dialog.signal(tsip_event_code_e.DIALOG_CONNECTING, "Connecting...");
    }

    return o_dialog.send_subscribe();
}


// Any -> (INCOMING NOTIFY) -> Any
function tsip_dialog_generic_Any_2_Any_X_iNotify(ao_args) {
     var o_dialog = ao_args[0];
     var o_request = ao_args[1];

     /* Send 2xx NOTIFY */
     var o_response;
     var i_ret = -1;
     if ((o_response = o_dialog.response_new(200, 'OK', o_request))) {
        i_ret = o_dialog.response_send(o_response);
     }

     // update timeout using expires from subscription state (e.g. 'Subscription-State: pending;expires=200')
     o_dialog.i_timerRefresh = o_dialog.get_newdelay(o_request);
	 o_dialog.timer_schedule('generic', 'Refresh');

     // alert user
     o_dialog.signal_i(tsip_event_code_e.DIALOG_REQUEST_INCOMING, 'Incoming NOTIFY', o_request);

     return i_ret;
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//				== STATE MACHINE END ==
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++

