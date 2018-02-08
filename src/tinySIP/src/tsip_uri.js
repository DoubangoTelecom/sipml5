/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
var tsip_uri_type_e =
{
    unknown: { i_id: 0, s_scheme: "unknown" },
    sip: { i_id: 1, s_scheme: "sip" },
    sips: { i_id: 2, s_scheme: "sips" },
    tel: { i_id: 3, s_scheme: "tel" }
};

var tsip_host_type_e =
{
    unknown: { i_id: 0, s_name: "unknown" },
    hostname: { i_id: 1, s_name: "hostname" },
    ipv4: { i_id: 2, s_name: "ipv4" },
    ipv6: { i_id: 3, s_name: "ipv6" }
};

function tsip_uri(e_type) {
    this.e_type = e_type;
    this.s_scheme = null;
    this.s_host = null;
    this.e_host_type = tsip_host_type_e.unknown;
    this.i_port = 0;
    this.s_user_name = null;
    this.s_password = null;
    this.s_display_name = null;
    this.ao_params = new Array();
    this.toString = function () {
        return tsip_uri_tostring(this, true, true);
    };
}

tsip_uri.prototype.tostring = function(b_with_params, b_quote){
    return tsip_uri_tostring(this, b_with_params, b_quote);
}

tsip_uri.prototype.compare = function (o_uri) {
    var s_str = tsip_uri_compare(this, o_uri);
}

tsip_uri.prototype.clone = function (b_with_params, b_quote) {
    var s_str = tsip_uri_tostring(this, b_with_params, b_quote);
    if (s_str) {
        return tsip_uri.prototype.Parse(s_str);
    }
    return null;
}

function tsip_uri_make_valid(s_uri, s_domain) {
    if (!s_uri || !s_domain) {
        tsk_utils_log_error("Invalid argument");
        return null;
    }
    if (tsk_string_index_of(s_uri, s_uri.length, "\"") == 0 || tsk_string_index_of(s_uri, s_uri.length, "<") == 0) {
        return tsip_uri.prototype.Parse(s_uri);
    }
    var b_teluri = (tsk_string_index_of(s_uri, s_uri.length, "tel:") == 0);
    if (tsk_string_index_of(s_uri, s_uri.length, "sip:") != 0 && tsk_string_index_of(s_uri, s_uri.length, "sips:") != 0 && !b_teluri) {
        s_uri = "sip:" + s_uri;
    }
    if (!b_teluri && tsk_string_index_of(s_uri, s_uri.length, "@") == -1) { /* no domain name in tel: uri */
        s_uri += "@" + s_domain;
    }
    return tsip_uri.prototype.Parse(s_uri); 
}

function __tsip_uri_tostring(o_self, b_with_params) {
	// e.g. sip:alice:secretword@atlanta.com:65535
	var s_uri = tsk_string_format("{0}:{1}{2}{3}{4}{5}{6}{7}{8}{9}", 

		o_self.s_scheme ? o_self.s_scheme : "sip", /* default scheme is sip: */

		o_self.s_user_name ? o_self.s_user_name : "",

		o_self.s_password ? ":" : "",
		o_self.s_password ? o_self.s_password : "",

		o_self.s_host ? (o_self.s_user_name ? "@" : "") : "",
		o_self.e_host_type == tsip_host_type_e.ipv6 ? "[" : "",
		o_self.s_host ? o_self.s_host : "",
		o_self.e_host_type == tsip_host_type_e.ipv6 ? "]" : "",

		o_self.i_port > 0 ? ":" : "",
		o_self.i_port > 0 ? o_self.i_port : ""
		);
	
	// Params
	if (s_uri && b_with_params && o_self.ao_params.length > 0) {
        s_uri += tsk_string_format(";{0}", tsk_params_tostring(o_self.ao_params, ';'));
    }
	
	return s_uri;
}


function tsip_uri_tostring(o_self, b_with_params, b_quote){
	if(o_self){
	    if (b_quote) {
	        var s_str = "";
			if(o_self.s_display_name){
                s_str += tsk_string_format("\"{0}\"", o_self.s_display_name);
			}
            s_str += tsk_string_format("<{0}>", __tsip_uri_tostring(o_self, b_with_params));
            return s_str;
		}
		else{
		    return __tsip_uri_tostring(o_self, b_with_params);
		}
	}
	else{
		tsk_utils_log_error("Invalid argument");
		return null;
	}
}

function tsip_uri_strcmp(s_s1, s_s2, b_case_sensitive){
	if(s_s1 && s_s2){
		var b_s1_is_encoded = false;
		var b_s2_is_encoded = false;

		if(tsk_string_contains(s_s1, s_s1.length, "%")){
			b_s1_is_encoded = true;
			s_s1 = decodeURIComponent(s_s1);
		}
		if(tsk_string_contains(s_s2, s_s2.length, "%")){
			b_s2_is_encoded = true;
			s_s2 = decodeURIComponent(s_s2);
		}

		return b_case_sensitive ? s_s1.localeCompare(s_s2) : s_s1.toLowerCase().localeCompare(s_s2.toLowerCase());
	}
	return -1;
}

function tsip_uri_strequals(s_s1, s_s2) { return (tsip_uri_strcmp(s_s1, s_s2, true) == 0); }
function tsip_uri_striequals(s_s1, s_s2) { return (tsip_uri_strcmp(s_s1, s_s2, false) == 0);}

function tsip_uri_compare_parameter(o_uri_1, o_uri_2, s_pname){
    var o_param_1 = tsk_param_get_by_name(o_uri_1.ao_params, s_pname);
	var o_param_2 = tsk_param_get_by_name(o_uri_2.ao_params, s_pname);
	if((o_param_1 || o_param_2) && ((o_param_1 && !o_param_2) || (!o_param_1 && o_param_2) || (!tsip_uri_striequals(o_param_1.s_value, o_param_2.s_value)))){
		return -3;
	}
    return 0;
}

function tsip_uri_compare(o_uri_1, o_uri_2){
	if(o_uri_1 && o_uri_2){
		var o_param_1;
		var o_param_2;
        var i_ret;

		/* RFC 3261 - 19.1.4 URI Comparison

			Comparison of the userinfo of SIP and SIPS URIs is case-sensitive.  This includes userinfo containing passwords or
			formatted as telephone-subscribers.  Comparison of all other components of the URI is case-insensitive unless explicitly
			defined otherwise.

			An IP address that is the result of a DNS lookup of a host name does not match that host name.

			For two URIs to be equal, the user, password, host, and port components must match.

			A URI omitting the user component will not match a URI that includes one.  A URI omitting the password component will not
			match a URI that includes one.

			userinfo	= 	( user   /   telephone-subscriber )   [ ":" password ]   "@" 
		*/
		if(!tsk_string_equals(o_uri_1.s_scheme, o_uri_2.s_scheme) ||
			!tsip_uri_strequals(o_uri_1.s_user_name, o_uri_2.s_user_name) ||
			!tsip_uri_strequals(o_uri_1.s_host, o_uri_2.s_host) ||
			!tsk_string_equals(o_uri_1.s_password, o_uri_2.s_password) ||
			o_uri_1.i_port != o_uri_2.i_port){
				return -2;
		}

		/* Is there parameters */
		if((!o_uri_1.ao_params && !o_uri_2.ao_params) || (o_uri_1.ao_params.length == 0 && o_uri_2.ao_params.length == 0)){
			return 0;
		}

		/*	RFC 3261 - 19.1.4 URI Comparison
			
			A URI omitting any component with a default value will not match a URI explicitly containing that component with its
			default value.  For instance, a URI omitting the optional port component will not match a URI explicitly declaring port 5060.
			The same is true for the transport-parameter, ttl-parameter, user-parameter, and method components.

			-  A user, ttl, or method uri-parameter appearing in only one URI never matches, even if it contains the default value.
			-  A URI that includes an maddr parameter will not match a URI that contains no maddr parameter.
		*/
        if((i_ret = tsip_uri_compare_parameter(o_uri_1, o_uri_2, "transport")) != 0){
            return i_ret;
        }
        if((i_ret = tsip_uri_compare_parameter(o_uri_1, o_uri_2, "ttl")) != 0){
            return i_ret;
        }
        if((i_ret = tsip_uri_compare_parameter(o_uri_1, o_uri_2, "user")) != 0){
            return i_ret;
        }
        if((i_ret = tsip_uri_compare_parameter(o_uri_1, o_uri_2, "method")) != 0){
            return i_ret;
        }
        if((i_ret = tsip_uri_compare_parameter(o_uri_1, o_uri_2, "maddr")) != 0){
            return i_ret;
        }

		/*	RFC 3261 - 19.1.4 URI Comparison
			
			URI uri-parameter components are compared as follows:

			1 -  Any uri-parameter appearing in both URIs must match.
			2 -  All other uri-parameters appearing in only one URI are ignored when comparing the URIs.

			o  URI header components are never ignored.  Any present header component MUST be present in both URIs and match for the URIs
			to match.  The matching rules are defined for each header field in Section 20.
		*/
		for(var i = 0; i < o_uri_1.ao_params.length; ++i){
			o_param_1 = o_uri_1.ao_params[i];
			if((o_param_2 = tsk_param_get_by_name(o_uri_2.ao_params, o_param_1.s_name))){
				if(!tsip_uri_striequals(o_param_1.s_value, o_param_2.s_value)){
					return -4;
				}
			}
		}
        for(var i = 0; i < o_uri_2.ao_params.length; ++i){
			o_param_2 = o_uri_2.ao_params[i];
			if((o_param_1 = tsk_param_get_by_name(o_uri_1.ao_params, o_param_2.s_name))){
				if(!tsip_uri_striequals(o_param_1.s_value, o_param_2.s_value)){
					return -4;
				}
			}
		}
		return 0;
	}
	else{
		return (!o_uri_1 && !o_uri_2) ? 0 : -1;
	}
}

if(!window.__b_release_mode){
    tsip_api_add_js_scripts('head',
    'src/tinySIP/src/parsers/tsip_parser_uri.js'
    );
}