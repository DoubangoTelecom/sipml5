
/* line 1 "./ragel/tsdp_parser_header_M.jrl" */
/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/

tsdp_header_M.prototype = Object.create(tsdp_header.prototype);

/* line 49 "./ragel/tsdp_parser_header_M.jrl" */




/* line 17 "./src/headers/tsdp_header_M.js" */
_tsdp_machine_parser_header_M_actions = [
	0, 1, 0, 1, 1, 1, 2, 1, 
	3, 1, 4
];

_tsdp_machine_parser_header_M_key_offsets = [
	0, 0, 1, 3, 18, 33, 35, 39, 
	53, 54, 68, 70, 73, 88, 88, 103
];

_tsdp_machine_parser_header_M_trans_keys = [
	109, 32, 61, 32, 33, 37, 39, 126, 
	42, 43, 45, 46, 48, 57, 65, 90, 
	95, 122, 32, 33, 37, 39, 126, 42, 
	43, 45, 46, 48, 57, 65, 90, 95, 
	122, 48, 57, 32, 47, 48, 57, 33, 
	37, 39, 126, 42, 43, 45, 46, 48, 
	57, 65, 90, 95, 122, 10, 33, 37, 
	39, 126, 42, 43, 45, 46, 48, 57, 
	65, 90, 95, 122, 48, 57, 32, 48, 
	57, 13, 32, 33, 37, 39, 47, 126, 
	42, 43, 45, 57, 65, 90, 95, 122, 
	13, 33, 37, 39, 126, 42, 43, 45, 
	46, 48, 57, 65, 90, 95, 122, 13, 
	32, 33, 37, 39, 126, 42, 43, 45, 
	46, 48, 57, 65, 90, 95, 122, 0
];

_tsdp_machine_parser_header_M_single_lengths = [
	0, 1, 2, 5, 5, 0, 2, 4, 
	1, 4, 0, 1, 7, 0, 5, 6
];

_tsdp_machine_parser_header_M_range_lengths = [
	0, 0, 0, 5, 5, 1, 1, 5, 
	0, 5, 1, 1, 4, 0, 5, 5
];

_tsdp_machine_parser_header_M_index_offsets = [
	0, 0, 2, 5, 16, 27, 29, 33, 
	43, 45, 55, 57, 60, 72, 73, 84
];

_tsdp_machine_parser_header_M_indicies = [
	0, 1, 0, 2, 1, 2, 3, 3, 
	3, 3, 3, 3, 3, 3, 3, 1, 
	4, 5, 5, 5, 5, 5, 5, 5, 
	5, 5, 1, 6, 1, 7, 8, 9, 
	1, 10, 10, 10, 10, 10, 10, 10, 
	10, 10, 1, 11, 1, 12, 12, 12, 
	12, 12, 12, 12, 12, 12, 1, 13, 
	1, 7, 14, 1, 15, 16, 12, 12, 
	12, 17, 12, 12, 12, 12, 12, 1, 
	1, 18, 19, 19, 19, 19, 19, 19, 
	19, 19, 19, 1, 20, 21, 22, 22, 
	22, 22, 22, 22, 22, 22, 22, 1, 
	0
];

_tsdp_machine_parser_header_M_trans_targs = [
	2, 0, 3, 4, 5, 4, 6, 7, 
	10, 6, 12, 13, 12, 11, 11, 8, 
	14, 9, 8, 15, 8, 14, 15
];

_tsdp_machine_parser_header_M_trans_actions = [
	0, 0, 0, 1, 3, 0, 1, 5, 
	5, 0, 1, 0, 0, 1, 0, 7, 
	7, 0, 0, 1, 9, 9, 0
];

_tsdp_machine_parser_header_M_eof_actions = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 7, 0, 0, 9
];

tsdp_machine_parser_header_M_start = 1;
tsdp_machine_parser_header_M_first_final = 12;
tsdp_machine_parser_header_M_error = 0;

tsdp_machine_parser_header_M_en_main = 1;


/* line 53 "./ragel/tsdp_parser_header_M.jrl" */

function tsdp_header_M(s_media, i_port, s_proto){
	tsdp_header.call(this, tsdp_header_type_e.M);
	this.s_media = s_media;
	this.i_port = i_port;
	this.i_nports = 0; // number of ports
	this.s_proto = s_proto;
	this.as_fmt = new Array();

	this.o_hdr_I = null;
	this.o_hdr_C = null;
	this.ao_hdr_B = new Array();
	this.o_hdr_K = null;
	this.ao_hdr_A = new Array();
	this.ao_hdr_Dummy = new Array();
}

tsdp_header_M.prototype.toString = function(s_endline){
	if(!s_endline){
		s_endline = "\r\n";
	}
	/*	IMPORTANT: Keep the order.
			
		m=  (media name and transport address)
		i=* (media title)
		c=* (connection information -- optional if included at
				session level)
		b=* (zero or more bandwidth information lines)
		k=* (encryption key)
		a=* (zero or more media attribute lines)
	*/
	var s_str = tsk_string_format("{0} {1}{2}{3} {4}",
			this.s_media,
			this.i_port,
			
			this.i_nports ? "/" : "",
			this.i_nports ? this.i_nports : "",

			this.s_proto);

	// FMTs
	for(var i = 0; i < this.as_fmt.length; ++i){
		s_str += " " + this.as_fmt[i];
	}
		
	var b_single_line = !this.o_hdr_I && !this.o_hdr_C && this.ao_hdr_B.length==0 && !this.o_hdr_K && this.ao_hdr_A.length.length==0;
	if(b_single_line){
		return s_str;
	}

	// close the "m=" line
	s_str += s_endline;

	// i=* (media title)
	if(this.o_hdr_I){
		s_str += this.o_hdr_I.tostring_full(false, s_endline);
	}
	// c=* (connection information -- optional if included at session level)
	if(this.o_hdr_C){
		s_str += this.o_hdr_C.tostring_full(false, s_endline);
	}
	// b=* (zero or more bandwidth information lines)
	for(var i = 0; i < this.ao_hdr_B.length; ++i){
		s_str += this.ao_hdr_B[i].tostring_full(false, s_endline);
	}
		
	// k=* (encryption key)
	if(this.o_hdr_K){
		s_str += this.o_hdr_K.tostring_full(false, s_endline);
	}
	// a=* (zero or more media attribute lines)
	for(var i = 0; i < this.ao_hdr_A.length; ++i){
		s_str += this.ao_hdr_A[i].tostring_full(false, s_endline);
	}
	// dummies
	for(var i = 0; i < this.ao_hdr_Dummy.length; ++i){
		s_str += this.ao_hdr_Dummy[i].tostring_full(false, s_endline);
	}
		
	return s_str.substring(0, s_str.length - s_endline.length);
}

// for A headers, use "tsdp_header_A_removeAll_by_field()"
tsdp_header_M.prototype.remove_header = function(e_type){
	switch(e_type){
		case tsdp_header_type_e.I:
			{
                this.o_hdr_I = null;
				break;
			}
		case tsdp_header_type_e.C:
			{
                this.o_hdr_C = null;
				break;
			}
		case tsdp_header_type_e.B:
			{
                this.ao_hdr_B.splice(0, this.ao_hdr_B.length);
				break;
			}
		case tsdp_header_type_e.K:
			{
                this.o_hdr_K = null;
				break;
			}
	}
	return 0;
}

tsdp_header_M.prototype.add_header = function(o_header){
	if(!o_header){
		tsk_utils_log_error("Invalid argument");
		return -1;
	}

	switch(o_header.e_type){
		case tsdp_header_type_e.I:
			{
				this.o_hdr_I = o_header;
				break;
			}
		case tsdp_header_type_e.C:
			{
				this.o_hdr_C = o_header;
				break;
			}
		case tsdp_header_type_e.B:
			{
				this.ao_hdr_B.push(o_header);
				break;
			}
		case tsdp_header_type_e.K:
			{
				this.o_hdr_K = o_header;
				break;
			}
		case tsdp_header_type_e.A:
			{
				this.ao_hdr_A.push(o_header);
				break;
			}
	}
	
	return 0;
}

tsdp_header_M.prototype.add_fmt = function(s_fmt){
	if(s_fmt){
		this.as_fmt.push(s_fmt);
	}
}

// add_headers(...)
tsdp_header_M.prototype.add_headers = function(){
	for(var i = 0; i < arguments.length; ++i){
		if(arguments[i]){
			this.add_header(arguments[i]);
		}
	}
}

tsdp_header_M.prototype.find_a_at = function(s_field, i_index) {
	if(!s_field || i_index < 0){
		tsk_utils_log_error("Invalid argument");
		return null;
	}

	var i_pos = 0;
	for(var i = 0; i < this.ao_hdr_A.length; ++i){
		if(this.ao_hdr_A[i].s_field == s_field){
			if(i_pos++ >= i_index){
				return this.ao_hdr_A[i];
			}
		}
	}
	return null;
}

tsdp_header_M.prototype.find_a = function(s_field) {
	return this.find_a_at(s_field, 0);
}

tsdp_header_M.prototype.get_rtpmap = function(s_fmt){
	var i_fmt_len = s_fmt ? s_fmt.length : 0;
	if(i_fmt_len <= 0 || i_fmt_len > 3/*'0-255' or '*'*/){
		tsk_utils_log_error("Invalid argument");
		return null;
	}
	var s_rtpmap = null; /* e.g. AMR-WB/16000 */
	var i_A_len, i_index = 0;
	var i_indexof;
	
	var o_hdr_A;
	
	/* find "a=rtpmap" */
	while((o_hdr_A = this.find_a_at(i_index++))){
		/* A->value would be: "98 AMR-WB/16000" */
		if((i_A_len = o_hdr_A.s_value ? o_hdr_A.s_value.length : 0) < (i_fmt_len + 1/*space*/)){
			continue;
		}
		if((i_indexof = tsk_string_index_of(o_hdr_A.s_value, i_A_len, s_fmt)) == 0 && (o_hdr_A.s_value[i_fmt_len] == ' ')){
			s_rtpmap = o_hdr_A.s_value.substring(i_fmt_len+1, A_len);
			break;
		}
	}

	return s_rtpmap;
}

tsdp_header_M.prototype.get_fmtp = function(s_fmt){
	var i_fmt_len = s_fmt ? s_fmt.length : 0;
	if(i_fmt_len <= 0 || i_fmt_len > 3/*'0-255' or '*'*/){
		tsk_utils_log_error("Invalid argument");
		return null;
	}
	var s_fmtp= null; /* e.g. octet-align=1 */
	var i_A_len, i_index = 0;
	var i_indexof;
	
	var o_hdr_A;
	
	/* find "a=rtpmap" */
	while((o_hdr_A = this.find_a_at(i_index++))){
		/* A->value would be: "98 octet-align=1" */
		if((i_A_len = o_hdr_A.s_value ? o_hdr_A.s_value.length : 0) < (i_fmt_len + 1/*space*/)){
			continue;
		}
		if((i_indexof = tsk_string_index_of(o_hdr_A.s_value, i_A_len, s_fmt)) == 0 && (o_hdr_A.s_value[i_fmt_len] == ' ')){
			s_fmtp = o_hdr_A.s_value.substring(i_fmt_len+1, A_len);
			break;
		}
	}

	return s_fmtp;
}

/* as per 3GPP TS 34.610 */
tsdp_header_M.prototype.hold = function(b_local){
	var o_hdr_A;

	if((o_hdr_A = this.find_a(b_local ? "recvonly" : "sendonly"))){
		// an "inactive" SDP attribute if the stream was previously set to "recvonly" media stream
		o_hdr_A.s_field = b_local ? "inactive" : "recvonly";
	}
	else if((o_hdr_A = this.find_a("sendrecv"))){
		// a "sendonly" SDP attribute if the stream was previously set to "sendrecv" media stream
		o_hdr_A.s_field = b_local ? "sendonly" : "recvonly";
	}
	else{
		// default value is sendrecv. hold on default --> sendonly
		if(!(o_hdr_A = this.find_a(b_local ? "sendonly" : "recvonly")) && !(o_hdr_A = this.find_a("inactive"))){
			var o_hdr_newA;
			if((o_hdr_newA = new tsdp_header_A(b_local ? "sendonly" : "recvonly", null))){
				this.add_header(o_hdr_newA);
			}
		}
	}
	return 0;
}

/* as per 3GPP TS 34.610 */
tsdp_header_M.prototype.set_holdresume_att = function(b_lo_held, b_ro_held){
	var o_hdr_A;
	var hold_resume_atts = [["sendrecv", "recvonly"],["sendonly", "inactive"]];
	
	if((o_hdr_A = this.find_a("sendrecv")) || (o_hdr_A = this.find_a("sendonly")) || (o_hdr_A = this.find_a("recvonly")) || (o_hdr_A = this.find_a("inactive"))){
		o_hdr_A.s_field = hold_resume_atts[b_lo_held ? 1 : 0][b_ro_held ? 1 : 0];
	}
	else{
		var o_hdr_newA;
		if((o_hdr_newA = new tsdp_header_A(hold_resume_atts[b_lo_held ? 1 : 0][b_ro_held ? 1 : 0], null))){
			this.add_headers(o_hdr_newA);
		}
	}
	
	return 0;
}

tsdp_header_M.prototype.is_held = function(b_local){
	/* both cases */
	if(this.find_a("inactive")){
		return true;
	}

	if(b_local){
		return this.find_a("recvonly") ? true : false;
	}
	else{
		return this.find_a("sendonly") ? true : false;
	}
}

/* as per 3GPP TS 34.610 */
tsdp_header_M.prototype.resume = function(b_local){
	var o_hdr_A;

	if((o_hdr_A = this.find_a("inactive"))){
		// a "recvonly" SDP attribute if the stream was previously an inactive media stream
		o_hdr_A.s_field = b_local ? "recvonly" : "sendonly";
	}
	else if((o_hdr_A = this.find_a(b_local ? "sendonly" : "recvonly"))){
		// a "sendrecv" SDP attribute if the stream was previously a sendonly media stream, or the attribute may be omitted, since sendrecv is the default
		o_hdr_A.s_field = sendrecv;
	}
	return 0;
}

tsdp_header_M.prototype.Parse = function(s_str){
	var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;	
	var hdr_M = new tsdp_header_M(null, 0, null);
	
	
/* line 419 "./src/headers/tsdp_header_M.js" */
{
	 cs = tsdp_machine_parser_header_M_start;
} /* JSCodeGen::writeInit */

/* line 370 "./ragel/tsdp_parser_header_M.jrl" */
	
/* line 426 "./src/headers/tsdp_header_M.js" */
{
	var _klen, _trans, _keys, _ps, _widec, _acts, _nacts;
	var _goto_level, _resume, _eof_trans, _again, _test_eof;
	var _out;
	_klen = _trans = _keys = _acts = _nacts = null;
	_goto_level = 0;
	_resume = 10;
	_eof_trans = 15;
	_again = 20;
	_test_eof = 30;
	_out = 40;
	while (true) {
	_trigger_goto = false;
	if (_goto_level <= 0) {
	if (p == pe) {
		_goto_level = _test_eof;
		continue;
	}
	if (cs == 0) {
		_goto_level = _out;
		continue;
	}
	}
	if (_goto_level <= _resume) {
	_keys = _tsdp_machine_parser_header_M_key_offsets[cs];
	_trans = _tsdp_machine_parser_header_M_index_offsets[cs];
	_klen = _tsdp_machine_parser_header_M_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsdp_machine_parser_header_M_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsdp_machine_parser_header_M_trans_keys[_mid]) {
	           _lower = _mid + 1;
	        } else {
	           _trans += (_mid - _keys);
	           _break_match = true;
	           break;
	        };
	     } /* while */
	     if (_break_match) { break; }
	     _keys += _klen;
	     _trans += _klen;
	  }
	  _klen = _tsdp_machine_parser_header_M_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsdp_machine_parser_header_M_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsdp_machine_parser_header_M_trans_keys[_mid+1]) {
	          _lower = _mid + 2;
	        } else {
	          _trans += ((_mid - _keys) >> 1);
	          _break_match = true;
	          break;
	        }
	     } /* while */
	     if (_break_match) { break; }
	     _trans += _klen
	  }
	} while (false);
	_trans = _tsdp_machine_parser_header_M_indicies[_trans];
	cs = _tsdp_machine_parser_header_M_trans_targs[_trans];
	if (_tsdp_machine_parser_header_M_trans_actions[_trans] != 0) {
		_acts = _tsdp_machine_parser_header_M_trans_actions[_trans];
		_nacts = _tsdp_machine_parser_header_M_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsdp_machine_parser_header_M_actions[_acts - 1]) {
case 0:
/* line 14 "./ragel/tsdp_parser_header_M.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 18 "./ragel/tsdp_parser_header_M.jrl" */

		hdr_M.s_media = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			break;
case 2:
/* line 22 "./ragel/tsdp_parser_header_M.jrl" */

		hdr_M.i_port= tsk_ragel_parser_get_int(s_str, p, i_tag_start);
			break;
case 3:
/* line 30 "./ragel/tsdp_parser_header_M.jrl" */

		hdr_M.s_proto = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			break;
case 4:
/* line 34 "./ragel/tsdp_parser_header_M.jrl" */

		tsk_ragel_parser_add_string(s_str, p, i_tag_start, hdr_M.as_fmt);
			break;
/* line 535 "./src/headers/tsdp_header_M.js" */
			} /* action switch */
		}
	}
	if (_trigger_goto) {
		continue;
	}
	}
	if (_goto_level <= _again) {
	if (cs == 0) {
		_goto_level = _out;
		continue;
	}
	p += 1;
	if (p != pe) {
		_goto_level = _resume;
		continue;
	}
	}
	if (_goto_level <= _test_eof) {
	if (p == eof) {
	__acts = _tsdp_machine_parser_header_M_eof_actions[cs];
	__nacts =  _tsdp_machine_parser_header_M_actions[__acts];
	__acts += 1;
	while (__nacts > 0) {
		__nacts -= 1;
		__acts += 1;
		switch (_tsdp_machine_parser_header_M_actions[__acts - 1]) {
case 3:
/* line 30 "./ragel/tsdp_parser_header_M.jrl" */

		hdr_M.s_proto = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			break;
case 4:
/* line 34 "./ragel/tsdp_parser_header_M.jrl" */

		tsk_ragel_parser_add_string(s_str, p, i_tag_start, hdr_M.as_fmt);
			break;
/* line 573 "./src/headers/tsdp_header_M.js" */
		} /* eof action switch */
	}
	if (_trigger_goto) {
		continue;
	}
}
	}
	if (_goto_level <= _out) {
		break;
	}
	}
	}

/* line 371 "./ragel/tsdp_parser_header_M.jrl" */
	
	if( cs < 
/* line 590 "./src/headers/tsdp_header_M.js" */
12
/* line 372 "./ragel/tsdp_parser_header_M.jrl" */
 ){
		tsk_utils_log_error("Failed to parse \"m=\" header: " + s_str);
		return null;
	}
	
	return hdr_M;
}
