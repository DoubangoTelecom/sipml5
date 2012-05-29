
/* line 1 "./ragel/tsdp_parser_header_Str.jrl" */
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

// Parse headers: E, I, K, P, S, U
tsdp_header_Str.prototype = Object.create(tsdp_header.prototype);
tsdp_header_E.prototype = Object.create(tsdp_header_Str.prototype);
tsdp_header_I.prototype = Object.create(tsdp_header_Str.prototype);
tsdp_header_K.prototype = Object.create(tsdp_header_Str.prototype);
tsdp_header_P.prototype = Object.create(tsdp_header_Str.prototype);
tsdp_header_S.prototype = Object.create(tsdp_header_Str.prototype);
tsdp_header_U.prototype = Object.create(tsdp_header_Str.prototype);

tsdp_header_Str.prototype.s_value = null;


/* line 61 "./ragel/tsdp_parser_header_Str.jrl" */



/* line 41 "./src/headers/tsdp_header_Str.js" */
_tsdp_machine_parser_header_Str_actions = [
	0, 1, 0, 1, 1, 1, 2, 1, 
	3, 1, 4, 1, 5, 1, 6, 1, 
	7, 2, 0, 7
];

_tsdp_machine_parser_header_Str_key_offsets = [
	0, 0, 6, 8, 10, 11, 13, 15, 
	17, 19, 21, 25, 28
];

_tsdp_machine_parser_header_Str_trans_keys = [
	101, 105, 107, 112, 115, 117, 32, 61, 
	32, 61, 10, 32, 61, 32, 61, 32, 
	61, 32, 61, 32, 61, 13, 32, 0, 
	65535, 13, 0, 65535, 0
];

_tsdp_machine_parser_header_Str_single_lengths = [
	0, 6, 2, 2, 1, 2, 2, 2, 
	2, 2, 2, 1, 0
];

_tsdp_machine_parser_header_Str_range_lengths = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 1, 1, 0
];

_tsdp_machine_parser_header_Str_index_offsets = [
	0, 0, 7, 10, 13, 15, 18, 21, 
	24, 27, 30, 34, 37
];

_tsdp_machine_parser_header_Str_trans_targs = [
	2, 5, 6, 7, 8, 9, 0, 3, 
	10, 0, 3, 10, 0, 12, 0, 3, 
	10, 0, 3, 10, 0, 3, 10, 0, 
	3, 10, 0, 3, 10, 0, 4, 10, 
	11, 0, 4, 11, 0, 0, 0
];

_tsdp_machine_parser_header_Str_trans_actions = [
	0, 0, 0, 0, 0, 0, 0, 3, 
	3, 0, 0, 0, 0, 0, 0, 5, 
	5, 0, 7, 7, 0, 9, 9, 0, 
	11, 11, 0, 13, 13, 0, 17, 0, 
	1, 0, 15, 0, 0, 0, 0
];

_tsdp_machine_parser_header_Str_eof_actions = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 17, 15, 0
];

tsdp_machine_parser_header_Str_start = 1;
tsdp_machine_parser_header_Str_first_final = 10;
tsdp_machine_parser_header_Str_error = 0;

tsdp_machine_parser_header_Str_en_main = 1;


/* line 64 "./ragel/tsdp_parser_header_Str.jrl" */

function tsdp_header_Str(e_type, s_value){
	tsdp_header.call(this, e_type);
	this.s_value = s_value;
}

tsdp_header_Str.prototype.toString = function(){
	return this.s_value;
}

tsdp_header_Str.prototype.Parse = function(s_str){
	var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;	
	var o_hdr = null;
	
	
/* line 124 "./src/headers/tsdp_header_Str.js" */
{
	 cs = tsdp_machine_parser_header_Str_start;
} /* JSCodeGen::writeInit */

/* line 84 "./ragel/tsdp_parser_header_Str.jrl" */
	
/* line 131 "./src/headers/tsdp_header_Str.js" */
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
	_keys = _tsdp_machine_parser_header_Str_key_offsets[cs];
	_trans = _tsdp_machine_parser_header_Str_index_offsets[cs];
	_klen = _tsdp_machine_parser_header_Str_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsdp_machine_parser_header_Str_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsdp_machine_parser_header_Str_trans_keys[_mid]) {
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
	  _klen = _tsdp_machine_parser_header_Str_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsdp_machine_parser_header_Str_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsdp_machine_parser_header_Str_trans_keys[_mid+1]) {
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
	cs = _tsdp_machine_parser_header_Str_trans_targs[_trans];
	if (_tsdp_machine_parser_header_Str_trans_actions[_trans] != 0) {
		_acts = _tsdp_machine_parser_header_Str_trans_actions[_trans];
		_nacts = _tsdp_machine_parser_header_Str_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsdp_machine_parser_header_Str_actions[_acts - 1]) {
case 0:
/* line 39 "./ragel/tsdp_parser_header_Str.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 43 "./ragel/tsdp_parser_header_Str.jrl" */
 o_hdr = new tsdp_header_E(); 		break;
case 2:
/* line 44 "./ragel/tsdp_parser_header_Str.jrl" */
 o_hdr = new tsdp_header_I(); 		break;
case 3:
/* line 45 "./ragel/tsdp_parser_header_Str.jrl" */
 o_hdr = new tsdp_header_K(); 		break;
case 4:
/* line 46 "./ragel/tsdp_parser_header_Str.jrl" */
 o_hdr = new tsdp_header_P(); 		break;
case 5:
/* line 47 "./ragel/tsdp_parser_header_Str.jrl" */
 o_hdr = new tsdp_header_S(); 		break;
case 6:
/* line 48 "./ragel/tsdp_parser_header_Str.jrl" */
 o_hdr = new tsdp_header_U(); 		break;
case 7:
/* line 50 "./ragel/tsdp_parser_header_Str.jrl" */

		if(o_hdr){
			o_hdr.s_value = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
		}
			break;
/* line 244 "./src/headers/tsdp_header_Str.js" */
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
	__acts = _tsdp_machine_parser_header_Str_eof_actions[cs];
	__nacts =  _tsdp_machine_parser_header_Str_actions[__acts];
	__acts += 1;
	while (__nacts > 0) {
		__nacts -= 1;
		__acts += 1;
		switch (_tsdp_machine_parser_header_Str_actions[__acts - 1]) {
case 0:
/* line 39 "./ragel/tsdp_parser_header_Str.jrl" */

		i_tag_start = p;
			break;
case 7:
/* line 50 "./ragel/tsdp_parser_header_Str.jrl" */

		if(o_hdr){
			o_hdr.s_value = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
		}
			break;
/* line 284 "./src/headers/tsdp_header_Str.js" */
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

/* line 85 "./ragel/tsdp_parser_header_Str.jrl" */
	
	if( cs < 
/* line 301 "./src/headers/tsdp_header_Str.js" */
10
/* line 86 "./ragel/tsdp_parser_header_Str.jrl" */
 ){
		tsk_utils_log_error("Failed to parse header: " + s_str);
		return null;
	}
	
	return o_hdr;
}

function tsdp_header_E(s_value){ tsdp_header_Str.call(this, tsdp_header_type_e.E, s_value); }
function tsdp_header_I(s_value){ tsdp_header_Str.call(this, tsdp_header_type_e.I, s_value); }
function tsdp_header_K(s_value){ tsdp_header_Str.call(this, tsdp_header_type_e.K, s_value); }
function tsdp_header_P(s_value){ tsdp_header_Str.call(this, tsdp_header_type_e.P, s_value); }
function tsdp_header_S(s_value){ tsdp_header_Str.call(this, tsdp_header_type_e.S, s_value); }
function tsdp_header_U(s_value){ tsdp_header_Str.call(this, tsdp_header_type_e.U, s_value); }
