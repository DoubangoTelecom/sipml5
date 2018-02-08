/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
// Generates HTTP-basic response as per RFC 2617.
function tsip_auth_basic_response(s_userid, s_password){
	/* RFC 2617 - 2 Basic Authentication Scheme
	
	To receive authorization, the client sends the userid and password,
	separated by a single colon (":") character, within a base64 [7]
	encoded string in the credentials.
	*/
	
    return Base64.encode(tsk_string_format("{0}:{1}", s_userid, s_password));
}

// Generates digest HA1 value as per RFC 2617 subclause 3.2.2.2. 
function tsip_auth_digest_HA1(s_username, s_realm, s_password){
	/* RFC 2617 - 3.2.2.2 A1
		A1       = unq(username-value) ":" unq(realm-value) ":" passwd
	*/
    return MD5.hexdigest(tsk_string_format("{0}:{1}:{2}", s_username, s_realm, s_password));
}


// Generates digest HA1 value for 'MD5-sess' algo as per RFC 2617 subclause 3.2.2.2.
function tsip_auth_digest_HA1sess(s_username, s_realm, s_password, s_nonce, s_cnonce){

	/* RFC 2617 - 3.2.2.2 A1
			A1       = H( unq(username-value) ":" unq(realm-value)
                     ":" passwd )
                     ":" unq(nonce-value) ":" unq(cnonce-value)
	*/
    return MD5.hexdigest(tsk_string_format("{0}:{1}:{2}:{3}:{4}", s_username, s_realm, s_password, s_nonce, s_cnonce));
}


// Generates digest HA2 value as per RFC 2617 subclause 3.2.2.3. 
function tsip_auth_digest_HA2(s_method, s_url, o_entity_body, s_qop){
	/* RFC 2617 - 3.2.2.3 A2

	If the "qop" directive's value is "auth" or is unspecified, then A2
	is:
	A2       = Method ":" digest-url-value

	If the "qop" value is "auth-int", then A2 is:
	A2       = Method ":" digest-url-value ":" H(entity-body)
	*/

	var s_a2 = null;

	if(tsk_string_is_null_or_empty(s_qop) || tsk_string_iequals(s_qop, "auth")){
		s_a2 = tsk_string_format("{0}:{1}", s_method, s_url);
	}
	else if(tsk_string_iequals(s_qop, "auth-int")){
		if(o_entity_body){
			var s_hEntity = MD5.hash(o_entity_body);
			s_a2 = tsk_string_format("{0}:{1}:{2}", s_method, s_url, s_hEntity);
		}
		else{
            s_a2 = tsk_string_format("{0}:{1}:{2}", s_method, s_url, "d41d8cd98f00b204e9800998ecf8427e");
		}
	}

    return MD5.hexdigest(s_a2);
}


// Generates HTTP digest response as per RFC 2617 subclause 3.2.2.1.
function tsip_auth_digest_response(s_ha1, s_nonce, s_noncecount, s_cnonce, s_qop, s_ha2){
	/* RFC 2617 3.2.2.1 Request-Digest

	============ CASE 1 ============
	If the "qop" value is "auth" or "auth-int":
	request-digest  = <"> < KD ( H(A1),     unq(nonce-value)
	":" nc-value
	":" unq(cnonce-value)
	":" unq(qop-value)
	":" H(A2)
	) <">
	============ CASE 2 ============
	If the "qop" directive is not present (this construction is for
	compatibility with RFC 2069):
	request-digest  =
	<"> < KD ( H(A1), unq(nonce-value) ":" H(A2) ) >
	<">
	*/

	if(tsk_string_iequals(s_qop, "auth") || tsk_string_iequals(s_qop, "auth-int")){
		/* CASE 1 */
	    return MD5.hexdigest(tsk_string_format("{0}:{1}:{2}:{3}:{4}:{5}", s_ha1, s_nonce, s_noncecount, s_cnonce, s_qop, s_ha2));
	}
	else{
		/* CASE 2 */
	    return MD5.hexdigest(tsk_string_format("{0}:{1}:{2}", s_ha1, s_nonce, s_ha2));
	}
}