/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
function tsip_challenge(o_stack, b_isproxy, s_scheme, s_realm, s_nonce, s_opaque, s_algorithm, s_qop) {
    this.o_stack = o_stack;
    this.b_isproxy = b_isproxy;
	this.s_scheme = s_scheme;
	this.s_realm = s_realm;
	this.s_nonce = s_nonce;
	this.s_opaque = s_opaque;
	this.s_algorithm = s_algorithm;
	this.s_cnonce = null;
	this.i_nc = 0;
	if (s_qop) {
	    this.s_qop = tsk_string_contains(s_qop, s_qop.length, "auth-int") ? "auth-int" :
					(tsk_string_contains(s_qop, s_qop.length, "auth") ? "auth" : null);
	    this.reset_cnonce();
	}
}

tsip_challenge.prototype.get_username = function(){
    return this.o_stack.identity.s_impi;
}

tsip_challenge.prototype.get_password = function(){
    return this.o_stack.identity.s_password;
}

tsip_challenge.prototype.reset_cnonce = function () {
    if (this.s_qop) {
        this.s_cnonce = MD5.hexdigest(tsk_string_random(21));
        this.i_nc = 1;
    }
}

tsip_challenge.prototype.get_response = function (s_method, s_uristring, o_entity_body) {
    if (tsk_string_iequals(this.s_scheme, "Digest")) {
        var s_nc = "";

        /* ===
        Calculate HA1 = MD5(A1) = M5(username:realm:secret)
        */
        var s_ha1 = tsip_auth_digest_HA1(this.get_username(), this.s_realm, this.get_password());

        /* ===
        HA2 
        */
        var s_ha2 = tsip_auth_digest_HA2(s_method, s_uristring, o_entity_body, this.s_qop);

        /* RESPONSE */
        if (this.i_nc) {
            s_nc = tsip_challenge.prototype.Ncount2String(this.i_nc);
        }
        var s_md5_response = tsip_auth_digest_response(s_ha1, this.s_nonce, s_nc, this.s_cnonce, this.s_qop, s_ha2);

        if (this.s_qop) {
            ++this.i_nc;
        }
        return s_md5_response;
    }
    return null;
}

tsip_challenge.prototype.update = function (s_scheme, s_realm, s_nonce, s_opaque, s_algorithm, s_qop) {
    var b_noncechanged = !tsk_string_iequals(this.s_nonce, s_nonce);

    this.s_scheme = s_scheme;
    this.s_realm = s_realm;
    this.s_nonce = s_nonce;
    this.s_opaque = s_opaque;
    this.s_algorithm = s_algorithm;
    if (s_qop) {
        this.s_qop = tsk_string_contains(s_qop, s_qop.length, "auth-int") ? "auth-int" :
					(tsk_string_contains(s_qop, s_qop.length, "auth") ? "auth" : null);
    }

    if (b_noncechanged && this.s_qop) {
        this.reset_cnonce();
    }
    return 0;
}

tsip_challenge.prototype.create_header_authorization = function(o_request){
	var s_nc = null;
	var s_uristring = null;
	var o_header = null;

    if(!(s_uristring = tsip_uri_tostring(o_request.line.request.o_uri, true, false))){
        tsk_utils_log_error("Failed to parse URI: " + o_request.line.request.o_uri);
        return null;
    }

	/* We compute the nc here because @ref tsip_challenge_get_response function will increment it's value. */
	if (this.i_nc) {
        s_nc = tsip_challenge.prototype.Ncount2String(this.i_nc);
    }

	/* entity_body ==> request-content */
    var s_response = this.get_response(o_request.line.request.s_method, s_uristring, o_request.o_content);

    o_header = new tsip_header_Authorization();
    o_header.e_type = this.b_isproxy ? tsip_header_type_e.Proxy_Authorization : tsip_header_type_e.Authorization;
	o_header.s_scheme = this.s_scheme;
	o_header.s_username = this.get_username();
	o_header.s_realm = this.s_realm;
	o_header.s_nonce = this.s_nonce;
	o_header.s_uri = s_uristring;
	o_header.s_response = s_response;
	o_header.s_algorithm = this.s_algorithm ? this.s_algorithm : "MD5";
	o_header.s_cnonce = this.i_nc ? this.s_cnonce : null;
	o_header.s_opaque = this.s_opaque;
	o_header.s_qop = this.s_qop;
	o_header.s_nc = s_nc;

	return o_header;
}

tsip_challenge.prototype.CreateEmptyHeaderAuthorization = function(s_username, s_realm, s_uristring){
	var o_header = new tsip_header_Authorization();

	if(o_header){
        o_header.e_type = tsip_header_type_e.Authorization;
		o_header.s_scheme = "Digest";
		o_header.s_username = s_username;
		o_header.s_realm = s_realm;
		o_header.s_nonce = "";
		o_header.s_response = "";
		o_header.s_uri = s_uristring;
	}

	return o_header;
}

tsip_challenge.prototype.Ncount2String = function (i_nc) {
    var i = 7;
    var s_nc = "";
    do {
        s_nc += "0123456789abcdef"[(i_nc >> i * 4) & 0xF];
    }
    while (i--);
    //return s_nc.split("").reverse().join("");
    return s_nc;
}