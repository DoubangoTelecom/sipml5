/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
function tsip_dialog_layer(o_stack) {
    if (!o_stack) {
        tsk_utils_log_error("Invalid argument");
        return null;
    }
    
    this.o_stack = o_stack;
    this.ao_dialogs = new Array();

    this.shutdown = {};
    this.shutdown.b_inprogress = false;
    this.shutdown.b_phase2 = false;

    this.b_locked = false;
}

// only used for find()
function tsip_dialog_layer_find_result(o_dialog, b_cid_matched){
    this.o_dialog = o_dialog;
    this.b_cid_matched = b_cid_matched;
}

tsip_dialog_layer.prototype.find_by_ss = function (o_session) {
    if (!o_session) {
        tsk_utils_log_error("Invalid argument");
        return null;
    }
    return this.find_by_ssid(o_session.i_id);
}

tsip_dialog_layer.prototype.find_by_ssid = function (i_sid) {   
    var o_dialog = null;

    while (this.b_locked){}

    this.b_locked = true;
    for (var i = 0; i < this.ao_dialogs.length; ++i) {
        if (this.ao_dialogs[i].o_session && this.ao_dialogs[i].o_session.i_id == i_sid) {
            o_dialog = this.ao_dialogs[i];
            break;
        }
    }
    this.b_locked = false;

    return o_dialog;
}

tsip_dialog_layer.prototype.find = function(s_callid, s_to_tag, s_from_tag, e_request_type){
	var o_ret = null;
	var o_dialog;
	var b_cid_matched = false;
	
	while (this.b_locked){}
    this.b_locked = true;

	for(var i = 0; i< this.ao_dialogs.length; ++i){
		o_dialog = this.ao_dialogs[i];
		if(tsk_string_equals(o_dialog.s_callid, s_callid)){
			var b_is_cancel = (e_request_type == tsip_request_type_e.CANCEL); // Incoming CANCEL
			var b_is_register = (e_request_type == tsip_request_type_e.REGISTER); // Incoming REGISTER
			var b_is_notify = (e_request_type == tsip_request_type_e.NOTIFY); // Incoming NOTIFY
			b_cid_matched = true;
			/* CANCEL Request will have the same local tag than the INVITE request -> do not compare tags */
			if((b_is_cancel || tsk_string_equals(o_dialog.s_tag_local, s_from_tag)) && (!o_dialog.s_tag_remote || tsk_string_equals(o_dialog.s_tag_remote, s_to_tag))){
				o_ret = o_dialog;
				break;
			}
			/* REGISTER is dialogless which means that each reREGISTER or unREGISTER will have empty to tag  */
			if(b_is_register /* Do not check tags */){
				o_ret = o_dialog;
				break;
			}
			/*	NOTIFY could arrive before the 200 SUBSCRIBE => This is why we don't try to match both tags
			 
				RFC 3265 - 3.1.4.4. Confirmation of Subscription Creation
				Due to the potential for both out-of-order messages and forking, the
				subscriber MUST be prepared to receive NOTIFY messages before the
				SUBSCRIBE transaction has completed.
			 */
			if(b_is_notify /* Do not check tags */){
				o_ret = o_dialog;
				break;
			}
		}
	}

	this.b_locked = false;

	return new tsip_dialog_layer_find_result(o_ret, b_cid_matched);
}

tsip_dialog_layer.prototype.dialog_new = function (e_dialog_type, o_session) {
    var o_dialog = null;

    while (this.b_locked){}

    this.b_locked = true;

    switch (e_dialog_type) {
        case tsip_dialog_type_e.REGISTER:
            {
                if ((o_dialog = new tsip_dialog_register(o_session, null))) {
                    this.ao_dialogs.push(o_dialog);
                }
                break;
            }
        case tsip_dialog_type_e.INVITE:
            {
                if ((o_dialog = new tsip_dialog_invite(o_session, null))) {
                    this.ao_dialogs.push(o_dialog);
                }
                break;
            }
        case tsip_dialog_type_e.MESSAGE:
        case tsip_dialog_type_e.INFO:
        case tsip_dialog_type_e.OPTIONS:
        case tsip_dialog_type_e.PUBLISH:
        case tsip_dialog_type_e.SUBSCRIBE:
        default:
            {
                if ((o_dialog = new tsip_dialog_generic(e_dialog_type, o_session, null))) {
                    this.ao_dialogs.push(o_dialog);
                }
                break;
            }
    }

    this.b_locked = false;

    return o_dialog;
}

tsip_dialog_layer.prototype.dialog_remove = function (o_dialog) {
    if (o_dialog) {
        while (this.b_locked){}

        this.b_locked = true;
        for (var i = 0; i < this.ao_dialogs.length; ++i) {
            if (this.ao_dialogs[i] == o_dialog) {
                this.ao_dialogs.splice(i, 1);
                break;
            }
        }
        this.b_locked = false;
    }
}

// this function is only called if no transaction match
// for responses, the transaction will always match
tsip_dialog_layer.prototype.handle_incoming_message = function (o_message) {
    var i_ret = -1;
    var o_transac = null;
    var o_layer_transac = this.o_stack.o_layer_transac;

    var o_ret = this.find(o_message.o_hdr_Call_ID.s_value,
		o_message.is_response() ? o_message.o_hdr_To.s_tag : o_message.o_hdr_From.s_tag,
		o_message.is_response() ? o_message.o_hdr_From.s_tag : o_message.o_hdr_To.s_tag,
		o_message.is_request() ? o_message.line.request.e_type : tsip_request_type_e.NONE);

    var b_cid_matched = o_ret.b_cid_matched;
    var o_dialog = o_ret.o_dialog;

    if (o_dialog) {
        if (o_message.is_cancel() || o_message.is_ack()) {
            return o_dialog.callback(tsip_dialog_event_type_e.I_MSG, o_message);
        }
        else {
            o_transac = o_layer_transac.transac_new(false, o_message, o_dialog);
        }
    }
    else {
        if (o_message.is_request()) {
            var o_session = null;
            var o_newdialog = null;

            switch (o_message.line.request.e_type) {
                case tsip_request_type_e.MESSAGE:
                    {	/* Server incoming MESSAGE */
                        if ((o_session = new tsip_session_message(this.o_stack, tsip_session.prototype.SetInitialMessage(o_message)))) {
                            o_newdialog = new tsip_dialog_generic(tsip_dialog_type_e.MESSAGE, o_session, o_message.o_hdr_Call_ID ? o_message.o_hdr_Call_ID.s_value : null);
                        }
                        break;
                    }
                case tsip_request_type_e.INFO:
                    {	/* Server incoming INFO */
                        //if((ss = tsip_ssession_create_2(self->stack, message))){
                        //	newdialog = (tsip_dialog_t*)tsip_dialog_info_create(ss);
                        //}
                        tsk_utils_log_warn("Not implemented");
                        break;
                    }
                case tsip_request_type_e.OPTIONS:
                    {	/* Server incoming OPTIONS */
                        //if((ss = tsip_ssession_create_2(self->stack, message))){
                        //	newdialog = (tsip_dialog_t*)tsip_dialog_options_create(ss);
                        //}
                        tsk_utils_log_error("Not implemented");
                        break;
                    }

                case tsip_request_type_e.REGISTER:
                    {	/* incoming REGISTER */
                        //if((ss = tsip_ssession_create_2(self->stack, message))){
                        //	newdialog = (tsip_dialog_t*)tsip_dialog_register_create(ss, message->Call_ID ? message->Call_ID->value : tsk_null);
                        //}
                        tsk_utils_log_error("Not implemented");
                        break;
                    }

                case tsip_request_type_e.INVITE:
                    {	/* incoming INVITE */
                        if ((o_session = new tsip_session_invite(this.o_stack, tsip_session.prototype.SetInitialMessage(o_message)))) {
                            o_newdialog = new tsip_dialog_invite(o_session, o_message.o_hdr_Call_ID ? o_message.o_hdr_Call_ID.s_value : null);
                        }
                        break;
                    }

                default:
                    {
                        break;
                    }
            } //switch

            // for new dialog, create a new transac and start it later
            if (o_newdialog) {
                o_transac = o_layer_transac.transac_new(false, o_message, o_newdialog);
                this.ao_dialogs.push(o_newdialog); /* add new dialog to the layer */
            }
        }
    }

    if (o_transac) {
        i_ret = o_transac.start(o_message);
    }
    else if (o_message.is_request()) { /* No transaction match for the SIP request */
        var o_layer_transport = this.o_stack.o_layer_transport;
        var o_response = null;

        if (o_layer_transport) {
            if (b_cid_matched) { /* We are receiving our own message. */
                o_response = new tsip_response(482, "Loop Detected (Check your iFCs)", o_message);
                if (o_response && !o_response.o_hdr_To.s_tag) {/* Early dialog? */
                    o_response.o_hdr_To.s_tag = "tag_doubango";
                }
            }
            else {
                switch (o_message.line.request.e_type) {
                    case tsip_request_type_e.OPTIONS: // Hacked to work on Tiscali IMS networks
                    case tsip_request_type_e.INFO:
                        o_response = new tsip_response(405, "Method Not Allowed", o_message);
                        break;
                    default:
                        o_response = new tsip_response(481, "Dialog/Transaction Does Not Exist", o_message);
                        break;
                }
            }
            if (o_response) {
                i_ret = o_layer_transport.send(o_response.o_hdr_firstVia ? o_response.o_hdr_firstVia.s_branch : "no-branch", o_response);
            }
        }
    }

    return i_ret;
}
