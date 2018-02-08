
/* line 1 "./ragel/tsdp_parser_header_C.jrl" */
/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/

tsdp_header_C.prototype = Object.create(tsdp_header.prototype);

/* line 38 "./ragel/tsdp_parser_header_C.jrl" */



/* line 16 "./src/headers/tsdp_header_C.js" */
_tsdp_machine_parser_header_C_actions = [
	0, 1, 0, 1, 1, 1, 2, 1, 
	3, 2, 0, 2, 2, 0, 3
];

_tsdp_machine_parser_header_C_key_offsets = [
	0, 0, 1, 3, 6, 9, 12, 15, 
	16, 19, 22
];

_tsdp_machine_parser_header_C_trans_keys = [
	99, 32, 61, 32, 0, 65535, 32, 0, 
	65535, 32, 0, 65535, 32, 0, 65535, 10, 
	13, 0, 65535, 13, 0, 65535, 0
];

_tsdp_machine_parser_header_C_single_lengths = [
	0, 1, 2, 1, 1, 1, 1, 1, 
	1, 1, 0
];

_tsdp_machine_parser_header_C_range_lengths = [
	0, 0, 0, 1, 1, 1, 1, 0, 
	1, 1, 0
];

_tsdp_machine_parser_header_C_index_offsets = [
	0, 0, 2, 5, 8, 11, 14, 17, 
	19, 22, 25
];

_tsdp_machine_parser_header_C_trans_targs = [
	2, 0, 2, 3, 0, 3, 4, 0, 
	5, 4, 0, 8, 6, 0, 8, 6, 
	0, 10, 0, 7, 9, 0, 7, 9, 
	0, 0, 0
];

_tsdp_machine_parser_header_C_trans_actions = [
	0, 0, 0, 0, 0, 0, 1, 0, 
	3, 0, 0, 9, 1, 0, 5, 0, 
	0, 0, 0, 12, 1, 0, 7, 0, 
	0, 0, 0
];

_tsdp_machine_parser_header_C_eof_actions = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	12, 7, 0
];

tsdp_machine_parser_header_C_start = 1;
tsdp_machine_parser_header_C_first_final = 8;
tsdp_machine_parser_header_C_error = 0;

tsdp_machine_parser_header_C_en_main = 1;


/* line 41 "./ragel/tsdp_parser_header_C.jrl" */

function tsdp_header_C(s_nettype, s_addrtype, s_addr){
	tsdp_header.call(this, tsdp_header_type_e.C);
	this.s_nettype = s_nettype;
	this.s_addrtype = s_addrtype;
	this.s_addr = s_addr;
}

tsdp_header_C.prototype.toString = function(){
	return tsk_string_format("{0} {1} {2}", 
			this.s_nettype,
			this.s_addrtype,
			this.s_addr);
}

tsdp_header_C.prototype.Parse = function(s_str){
	var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;	
	var hdr_C = new tsdp_header_C(null, null, null);
	
	
/* line 100 "./src/headers/tsdp_header_C.js" */
{
	 cs = tsdp_machine_parser_header_C_start;
} /* JSCodeGen::writeInit */

/* line 66 "./ragel/tsdp_parser_header_C.jrl" */
	
/* line 107 "./src/headers/tsdp_header_C.js" */
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
	_keys = _tsdp_machine_parser_header_C_key_offsets[cs];
	_trans = _tsdp_machine_parser_header_C_index_offsets[cs];
	_klen = _tsdp_machine_parser_header_C_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsdp_machine_parser_header_C_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsdp_machine_parser_header_C_trans_keys[_mid]) {
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
	  _klen = _tsdp_machine_parser_header_C_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsdp_machine_parser_header_C_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsdp_machine_parser_header_C_trans_keys[_mid+1]) {
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
	cs = _tsdp_machine_parser_header_C_trans_targs[_trans];
	if (_tsdp_machine_parser_header_C_trans_actions[_trans] != 0) {
		_acts = _tsdp_machine_parser_header_C_trans_actions[_trans];
		_nacts = _tsdp_machine_parser_header_C_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsdp_machine_parser_header_C_actions[_acts - 1]) {
case 0:
/* line 14 "./ragel/tsdp_parser_header_C.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 18 "./ragel/tsdp_parser_header_C.jrl" */

		hdr_C.s_nettype = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			break;
case 2:
/* line 22 "./ragel/tsdp_parser_header_C.jrl" */

		hdr_C.s_addrtype = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			break;
case 3:
/* line 26 "./ragel/tsdp_parser_header_C.jrl" */

		hdr_C.s_addr = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			break;
/* line 210 "./src/headers/tsdp_header_C.js" */
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
	__acts = _tsdp_machine_parser_header_C_eof_actions[cs];
	__nacts =  _tsdp_machine_parser_header_C_actions[__acts];
	__acts += 1;
	while (__nacts > 0) {
		__nacts -= 1;
		__acts += 1;
		switch (_tsdp_machine_parser_header_C_actions[__acts - 1]) {
case 0:
/* line 14 "./ragel/tsdp_parser_header_C.jrl" */

		i_tag_start = p;
			break;
case 3:
/* line 26 "./ragel/tsdp_parser_header_C.jrl" */

		hdr_C.s_addr = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			break;
/* line 248 "./src/headers/tsdp_header_C.js" */
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

/* line 67 "./ragel/tsdp_parser_header_C.jrl" */
	
	if( cs < 
/* line 265 "./src/headers/tsdp_header_C.js" */
8
/* line 68 "./ragel/tsdp_parser_header_C.jrl" */
 ){
		tsk_utils_log_error("Failed to parse \"c=\" header: " + s_str);
		return null;
	}
	
	return hdr_C;
}