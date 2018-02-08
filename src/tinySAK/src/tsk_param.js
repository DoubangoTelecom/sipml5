/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
function tsk_param_create(s_name, s_value) {
    var self = new Object();
    self.s_name = s_name;
    self.s_value = s_value;
    self.b_tag = false;
    return self;
}

function tsk_param_create_null() {
    return tsk_param_create(null, null);
}

function tsk_param_parse(s_line) {
    if (!tsk_string_is_null_or_empty(s_line)) {
        var i_start = 0;
        var i_end = s_line.length;
        var i_equal = tsk_string_index_of(s_line, i_end, "=");
        var s_name = null;
        var s_value = null;
        if (i_equal >= 0 && i_equal < i_end) {
            s_name = s_line.substring(i_start, i_start + (i_equal - i_start));
            s_value = s_line.substring(i_equal + 1, i_equal + (i_end - i_equal));
        }
        else {
            s_name = s_line;
        }
        return tsk_param_create(s_name, s_value);
    }
    return null;
}

function tsk_param_get_index_by_name(ao_params, s_name) {
    if (ao_params && !tsk_string_is_null_or_empty(s_name)) {
        var s_name_i = s_name.toLowerCase();
        for(var i = 0; i < ao_params.length; ++i){
            if(ao_params[i].s_name.toLowerCase() == s_name_i){
                return i;
            }
        }
    }
    return -1;
}

function tsk_param_get_by_name(ao_params, s_name) {
    var i_index = tsk_param_get_index_by_name(ao_params, s_name);
    if(i_index != -1){
        return ao_params[i_index];
    }
    return null;
}

function tsk_param_get_value_by_name(ao_params, s_name) {
    var o_param = tsk_param_get_by_name(ao_params, s_name);
    if(o_param){
        return o_param.s_value;
    }
    return null;
}

function tsk_params_have_param(ao_params, s_name) {
    return tsk_param_get_by_name(ao_params, s_name) != null;
}

function tsk_params_add(ao_params, s_name, s_value){
    if(ao_params && !tsk_string_is_null_or_empty(s_name)){
        var i_index = tsk_param_get_index_by_name(ao_params, s_name);
        if(i_index != -1){
            ao_params[i_index].s_value = s_value;
        }
        else{
            ao_params.push(tsk_param_create(s_name, s_value));
        }
    }
}

function tsk_params_add_param(ao_params, o_param) {
    if (ao_params && o_param) {
        tsk_params_add(ao_params, o_param.s_name, o_param.s_value);
    }
}

function tsk_params_remove_by_name(ao_params, s_name){
    if(ao_params && !tsk_string_is_null_or_empty(s_name)){
        var i_index = tsk_param_get_index_by_name(ao_params, s_name);
        if(i_index != -1){
            ao_params.splice(i_index, 1);
        }
    }
}

function tsk_param_tostring(o_param){
    if(o_param && o_param.s_name){
        return  !tsk_string_is_null_or_empty(o_param.s_value) ? (o_param.s_name + "=" + o_param.s_value) : o_param.s_name;
    }
    return "";
}

function tsk_params_tostring(o_params, c_separator){
    var s_ret = "";
    if(o_params){
        for (var i = 0; i < o_params.length; ++i) {
            if (!tsk_string_is_null_or_empty(s_ret)) {
                s_ret += c_separator;
            }
            s_ret += tsk_param_tostring(o_params[i]);
        }
    }
    return s_ret;
}
