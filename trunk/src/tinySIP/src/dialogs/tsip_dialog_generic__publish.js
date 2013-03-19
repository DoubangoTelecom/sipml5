/*
* Copyright (C) 2012 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/

tsip_dialog_generic.prototype.init_publish = function () {
    this.s_etag = null;
    this.o_fsm.set(
        // Any -> (SEND PUBLISH) -> InProgress
	    tsk_fsm_entry.prototype.CreateAlways(tsk_fsm.prototype.__i_state_any, tsip_dialog_generic_actions_e.O_PUBLISH, tsip_dialog_generic_states_e.INPROGRESS, tsip_dialog_generic_Any_2_InProgress_X_oPublish, "tsip_dialog_generic_Any_2_InProgress_X_oPublish")      
    );
}

tsip_dialog_generic.prototype.send_publish = function () {
    var o_request;
    var i_ret = -1;

    if(this.b_disconnecting){
        this.i_expires = 0;
    }

    /*	RFC 3903 - 4.1.  Identification of Published Event State
		The presence of a body and the SIP-If-Match header field determine
		the specific SSESSION that the request is performing, as described in Table 1.
		+-----------+-------+---------------+---------------+
		| SSESSION | Body? | SIP-If-Match? | Expires Value |
		+-----------+-------+---------------+---------------+
		| Initial   | yes   | no            | > 0           |
		| Refresh   | no    | yes           | > 0           |
		| Modify    | yes   | yes           | > 0           |
		| Remove    | no    | yes           | 0             |
		+-----------+-------+---------------+---------------+
		Table 1: Publication sessions
	*/

    if ((o_request = this.request_new("PUBLISH"))) {
        /* apply action params to the request */
        var o_action = this.get_action_curr();
        if(o_action && (i_ret = tsip_dialog.prototype.ApplyAction(o_request, o_action))){
            return i_ret;
        }

        /* Etag. If initial then etag is null or undefined */
		if(this.s_etag){
            o_request.add_header(new tsip_header_SIP_If_Match(this.s_etag));
		}
        i_ret = this.request_send(o_request);        
    }

    return i_ret;
}

//--------------------------------------------------------
//				== STATE MACHINE BEGIN ==
//--------------------------------------------------------

// Any -> (SEND PUBLISH) -> InProgress
function tsip_dialog_generic_Any_2_InProgress_X_oPublish(ao_args) {
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

    return o_dialog.send_publish();
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//				== STATE MACHINE END ==
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++

