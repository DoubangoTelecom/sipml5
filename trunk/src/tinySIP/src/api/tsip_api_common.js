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
tsip_session.prototype.__action_handle = function(o_action){
    var i_ret = -1
    if(this.o_stack && o_action){
		var o_dialog;
				
		if((o_dialog = this.o_stack.o_layer_dialog.find_by_ss(this))){
			switch(o_action.e_type){
			    case tsip_action_type_e.HANGUP:
					{	/* hang-up is an special case (==> hangup/cancel/nothing) */
						i_ret = o_dialog.hangup(o_action);
						break;
					}
				default:
					{	/* All other cases */
						i_ret = o_dialog.fsm_act(o_action.e_type, null, o_action);
						break;
					}
			}
		}
		else{
			console.error("Failed to find dialog with this opid [%d]", this.i_id);
		}
	}
	else{
		console.error("Invalid argument");
	}

	return i_ret;
}

// __action_any(e_action_type, ...)
tsip_session.prototype.__action_any = function(e_action_type){
	/* Checks for validity */
	if(!this.o_stack){
		console.error("Invalid stack");
		return -1;
	}
	
	/* Checks if the stack has been started */
	if (this.o_stack.e_state != tsip_transport_state_e.STARTED) {
        console.error("Stack not started");
        return -2;
    }

	/* execute action */
    var o_action = new tsip_action(e_action_type);
    return this.__action_handle(o_action);
}

// reject(...)
tsip_session.prototype.reject = function () {
    return this.__action_any(tsip_action_type_e.REJECT);
}

// hangup(...)
tsip_session.prototype.hangup = function () {
    return this.__action_any(tsip_action_type_e.HANGUP);
}

// accept(...)
tsip_session.prototype.accept = function () {
    return this.__action_any(tsip_action_type_e.ACCEPT);
}

// cancel(...)
tsip_session.prototype.cancel = function () {
    return this.__action_any(tsip_action_type_e.CANCEL);
}