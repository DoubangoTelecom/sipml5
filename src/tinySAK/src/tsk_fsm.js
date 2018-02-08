/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
tsk_fsm.prototype.__i_state_any = -0xFFFF;
tsk_fsm.prototype.__i_state_default = -0xFFF0;
tsk_fsm.prototype.__i_state_none = -0xFF00;
tsk_fsm.prototype.__i_state_final = -0xF000;
tsk_fsm.prototype.__i_action_any = -0xFFFF;

// fn_onterm = bool fn(o_usr_data)
function tsk_fsm(i_state_curr, i_state_term, fn_onterm, o_usr_data) {
    this.i_state_curr = i_state_curr;
    this.i_state_term = i_state_term;
    this.fn_onterm = fn_onterm;
    this.o_usr_data = o_usr_data;
    this.ao_entries = new Array();
    this.b_debug = false;
}

tsk_fsm.prototype.is_terminated = function () {
    return this.i_state_curr == this.i_state_term;
}

tsk_fsm.prototype.is_debug_enabled = function () {
    return this.b_debug;
}

tsk_fsm.prototype.set_debug_enabled = function (b_enable) {
    this.b_debug = b_enable;
}

tsk_fsm.prototype.set_onterm_callback = function (fn_callback, o_usr_data) {
    this.fn_onterm = fn_callback;
    this.o_usr_data = o_usr_data;
}

tsk_fsm.prototype.get_usr_data = function () {
    return this.o_usr_data;
}

// set( ...entries)
tsk_fsm.prototype.set = function () {
    for (var i = 0; i < arguments.length; ++i) {
        if (arguments[i]) {
            this.ao_entries.push(arguments[i]);
        }
    }
    this.ao_entries.sort(tsk_fsm_entry_compare);
    return 0;
}

// tsk_fsm_act(i_action, o_cond_obj1, o_cond_obj2, ...exec_args)
tsk_fsm.prototype.act = function (i_action, o_cond_obj1, o_cond_obj2) {
    var b_found = false;
    var b_terminates = false;
    var i_ret_exec = 0;
    var o_entry;

    if (this.is_terminated()) {
        tsk_utils_log_warn("The FSM is in the final state");
        return -2;
    }

    // FIXME: deadlock
    // while (this.b_locked) tsk_utils_log_info("locked");
    this.b_locked = true;

    for (var i = 0; i < this.ao_entries.length; ++i) {
        if (!(o_entry = this.ao_entries[i])) {
            continue;
        }
        if ((o_entry.i_state_from != tsk_fsm.prototype.__i_state_any) && (o_entry.i_state_from != this.i_state_curr)) {
            continue;
        }
        if ((o_entry.i_action != tsk_fsm.prototype.__i_action_any) && (o_entry.i_action != i_action)) {
            continue;
        }

        // check condition
        if (!o_entry.fn_condition || o_entry.fn_condition(o_cond_obj1, o_cond_obj2)) {
            if (this.is_debug_enabled()) {
                tsk_utils_log_info("State machine: " + o_entry.s_description);
            }
            if (o_entry.i_state_to != tsk_fsm.prototype.__i_state_any) {
                this.i_state_curr = o_entry.i_state_to;
            }
            if (o_entry.fn_execute) {
                try {
                    if ((i_ret_exec = o_entry.fn_execute(Array.prototype.slice.call(arguments, 3)))) {
                        tsk_utils_log_info("State machine: Exec function failed. Moving to the termnial state");
                    }
                }
                catch (e) {
                    tsk_utils_log_error(e);
                    i_ret_exec = -3;
                }
            }
            else {
                i_ret_exec = 0;
            }
            b_terminates = (i_ret_exec != 0 || (this.i_state_curr == this.i_state_term));
            b_found = true;
            break;
        }
    }

    if (b_terminates) {
        this.i_state_curr = this.i_state_term;
        if (this.fn_onterm) {
            this.fn_onterm(this.o_usr_data);
        }
    }

    this.b_locked = false;

    return i_ret_exec;
}


// fn_condition = bool fn(o_1, o_2)
// fn_execute = int fn(exec_args[])
function tsk_fsm_entry(i_state_from, i_action, fn_condition, i_state_to, fn_execute, s_description) {
    this.i_state_from = i_state_from;
    this.i_action = i_action;
    this.fn_condition = fn_condition;
    this.i_state_to = i_state_to;
    this.fn_execute = fn_execute;
    this.s_description = s_description;
}

tsk_fsm_entry.prototype.Create = function (i_state_from, i_action, fn_condition, i_state_to, fn_execute, s_description) {
    return new tsk_fsm_entry(i_state_from, i_action, fn_condition, i_state_to, fn_execute, s_description);
}

tsk_fsm_entry.prototype.CreateAlways = function(i_state_from, i_action, i_state_to, fn_execute, s_description) {
    return new tsk_fsm_entry(i_state_from, i_action, null, i_state_to, fn_execute, s_description);
}

tsk_fsm_entry.prototype.CreateNothing = function(i_state_from, i_action, fn_condition, s_description) {
    return new tsk_fsm_entry(i_state_from, i_action, fn_condition, i_state_from, null, s_description);
}

tsk_fsm_entry.prototype.CreateAlwaysNothing = function(i_state_from, s_description) {
    return new tsk_fsm_entry(i_state_from, tsk_fsm.prototype.__i_action_any, null, i_state_from, null, s_description);
}

function tsk_fsm_entry_compare(o_entry1, o_entry2) {
    if (o_entry1 && o_entry2) {
        if (o_entry1.i_state_from == tsk_fsm.prototype.__i_state_any) {
            return +20;
        }
        else if (o_entry2.i_state_from == tsk_fsm.prototype.__i_state_any) {
            return -20;
        }

        // put "any" actions at the bottom (weak)
        if (o_entry1.i_action == tsk_fsm.prototype.__i_action_any) {
            return +10;
        }
        else if (o_entry2.i_action == tsk_fsm.prototype.__i_action_any) {
            return -10;
        }
        // put conditions first
        return o_entry1.fn_condition ? -1 : (o_entry2.fn_condition ? 1 : 0);
    }
   
    return 0
}