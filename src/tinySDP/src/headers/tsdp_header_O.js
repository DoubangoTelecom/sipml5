
/* line 1 "./ragel/tsdp_parser_header_O.jrl" */
/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/

tsdp_header_O.prototype = Object.create(tsdp_header.prototype);

/* line 53 "./ragel/tsdp_parser_header_O.jrl" */




/* line 17 "./src/headers/tsdp_header_O.js" */
_tsdp_machine_parser_header_O_actions = [
	0, 1, 0, 1, 1, 1, 2, 1, 
	3, 1, 4, 1, 5, 1, 6, 2, 
	0, 4, 2, 0, 5, 2, 0, 6
];

_tsdp_machine_parser_header_O_key_offsets = [
	0, 0, 1, 3, 6, 9, 11, 14, 
	16, 19, 22, 25, 28, 31, 32, 35, 
	38
];

_tsdp_machine_parser_header_O_trans_keys = [
	111, 32, 61, 32, 0, 65535, 32, 0, 
	65535, 48, 57, 32, 48, 57, 48, 57, 
	32, 48, 57, 32, 0, 65535, 32, 0, 
	65535, 32, 0, 65535, 32, 0, 65535, 10, 
	13, 0, 65535, 13, 0, 65535, 0
];

_tsdp_machine_parser_header_O_single_lengths = [
	0, 1, 2, 1, 1, 0, 1, 0, 
	1, 1, 1, 1, 1, 1, 1, 1, 
	0
];

_tsdp_machine_parser_header_O_range_lengths = [
	0, 0, 0, 1, 1, 1, 1, 1, 
	1, 1, 1, 1, 1, 0, 1, 1, 
	0
];

_tsdp_machine_parser_header_O_index_offsets = [
	0, 0, 2, 5, 8, 11, 13, 16, 
	18, 21, 24, 27, 30, 33, 35, 38, 
	41
];

_tsdp_machine_parser_header_O_trans_targs = [
	2, 0, 2, 3, 0, 3, 4, 0, 
	5, 4, 0, 6, 0, 7, 6, 0, 
	8, 0, 9, 8, 0, 11, 10, 0, 
	11, 10, 0, 14, 12, 0, 14, 12, 
	0, 16, 0, 13, 15, 0, 13, 15, 
	0, 0, 0
];

_tsdp_machine_parser_header_O_trans_actions = [
	0, 0, 0, 0, 0, 0, 1, 0, 
	3, 0, 0, 1, 0, 5, 0, 0, 
	1, 0, 7, 0, 0, 15, 1, 0, 
	9, 0, 0, 18, 1, 0, 11, 0, 
	0, 0, 0, 21, 1, 0, 13, 0, 
	0, 0, 0
];

_tsdp_machine_parser_header_O_eof_actions = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 21, 13, 
	0
];

tsdp_machine_parser_header_O_start = 1;
tsdp_machine_parser_header_O_first_final = 14;
tsdp_machine_parser_header_O_error = 0;

tsdp_machine_parser_header_O_en_main = 1;


/* line 57 "./ragel/tsdp_parser_header_O.jrl" */

function tsdp_header_O(s_username, i_sess_id, i_sess_version, s_nettype, s_addrtype, s_addr){
	tsdp_header.call(this, tsdp_header_type_e.O);
	this.s_username = s_username;
	this.i_sess_id = i_sess_id;
	this.i_sess_version = i_sess_version;
	this.s_nettype = s_nettype;
	this.s_addrtype = s_addrtype;
	this.s_addr = s_addr;
}

tsdp_header_O.prototype.toString = function(){
	// o=alice 2890844526 2890844526 IN IP4 host.atlanta.example.com
	return tsk_string_format("{0} {1} {2} {3} {4} {5}",
		this.s_username,
		this.i_sess_id,
		this.i_sess_version,
		this.s_nettype,
		this.s_addrtype,
		this.s_addr);
}


tsdp_header_O.prototype.Parse = function(s_str){
	var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;	
	var hdr_O = new tsdp_header_O(null, 0, 0, null, null, null);
	
	
/* line 121 "./src/headers/tsdp_header_O.js" */
{
	 cs = tsdp_machine_parser_header_O_start;
} /* JSCodeGen::writeInit */

/* line 90 "./ragel/tsdp_parser_header_O.jrl" */
	
/* line 128 "./src/headers/tsdp_header_O.js" */
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
	_keys = _tsdp_machine_parser_header_O_key_offsets[cs];
	_trans = _tsdp_machine_parser_header_O_index_offsets[cs];
	_klen = _tsdp_machine_parser_header_O_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsdp_machine_parser_header_O_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsdp_machine_parser_header_O_trans_keys[_mid]) {
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
	  _klen = _tsdp_machine_parser_header_O_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsdp_machine_parser_header_O_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsdp_machine_parser_header_O_trans_keys[_mid+1]) {
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
	cs = _tsdp_machine_parser_header_O_trans_targs[_trans];
	if (_tsdp_machine_parser_header_O_trans_actions[_trans] != 0) {
		_acts = _tsdp_machine_parser_header_O_trans_actions[_trans];
		_nacts = _tsdp_machine_parser_header_O_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsdp_machine_parser_header_O_actions[_acts - 1]) {
case 0:
/* line 14 "./ragel/tsdp_parser_header_O.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 18 "./ragel/tsdp_parser_header_O.jrl" */

		hdr_O.s_username = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			break;
case 2:
/* line 22 "./ragel/tsdp_parser_header_O.jrl" */

		hdr_O.i_sess_id = tsk_ragel_parser_get_int(s_str, p, i_tag_start);
			break;
case 3:
/* line 26 "./ragel/tsdp_parser_header_O.jrl" */

		hdr_O.i_sess_version = tsk_ragel_parser_get_int(s_str, p, i_tag_start);
			break;
case 4:
/* line 30 "./ragel/tsdp_parser_header_O.jrl" */

		hdr_O.s_nettype = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			break;
case 5:
/* line 34 "./ragel/tsdp_parser_header_O.jrl" */

		hdr_O.s_addrtype = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			break;
case 6:
/* line 38 "./ragel/tsdp_parser_header_O.jrl" */

		hdr_O.s_addr= tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			break;
/* line 246 "./src/headers/tsdp_header_O.js" */
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
	__acts = _tsdp_machine_parser_header_O_eof_actions[cs];
	__nacts =  _tsdp_machine_parser_header_O_actions[__acts];
	__acts += 1;
	while (__nacts > 0) {
		__nacts -= 1;
		__acts += 1;
		switch (_tsdp_machine_parser_header_O_actions[__acts - 1]) {
case 0:
/* line 14 "./ragel/tsdp_parser_header_O.jrl" */

		i_tag_start = p;
			break;
case 6:
/* line 38 "./ragel/tsdp_parser_header_O.jrl" */

		hdr_O.s_addr= tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			break;
/* line 284 "./src/headers/tsdp_header_O.js" */
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

/* line 91 "./ragel/tsdp_parser_header_O.jrl" */
	
	if( cs < 
/* line 301 "./src/headers/tsdp_header_O.js" */
14
/* line 92 "./ragel/tsdp_parser_header_O.jrl" */
 ){
		tsk_utils_log_error("Failed to parse \"o=\" header: " + s_str);
		return null;
	}
	
	return hdr_O;
}
