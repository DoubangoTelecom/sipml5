
/* line 1 "./ragel/tsdp_parser_header_P.jrl" */
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

/* line 40 "./ragel/tsdp_parser_header_P.jrl" */



/* line 29 "./src/headers/tsdp_header_P.js" */
const _tsdp_machine_parser_header_P_actions = [
	0, 1, 0, 1, 1, 2, 0, 1
];

const _tsdp_machine_parser_header_P_key_offsets = [
	0, 0, 1, 3, 4, 8, 11
];

const _tsdp_machine_parser_header_P_trans_keys = [
	112, 32, 61, 10, 13, 32, 0, 65535, 
	13, 0, 65535, 0
];

const _tsdp_machine_parser_header_P_single_lengths = [
	0, 1, 2, 1, 2, 1, 0
];

const _tsdp_machine_parser_header_P_range_lengths = [
	0, 0, 0, 0, 1, 1, 0
];

const _tsdp_machine_parser_header_P_index_offsets = [
	0, 0, 2, 5, 7, 11, 14
];

const _tsdp_machine_parser_header_P_trans_targs = [
	2, 0, 2, 4, 0, 6, 0, 3, 
	4, 5, 0, 3, 5, 0, 0, 0
];

const _tsdp_machine_parser_header_P_trans_actions = [
	0, 0, 0, 0, 0, 0, 0, 5, 
	0, 1, 0, 3, 0, 0, 0, 0
];

const _tsdp_machine_parser_header_P_eof_actions = [
	0, 0, 0, 0, 5, 3, 0
];

const tsdp_machine_parser_header_P_start = 1;
const tsdp_machine_parser_header_P_first_final = 4;
const tsdp_machine_parser_header_P_error = 0;

const tsdp_machine_parser_header_P_en_main = 1;


/* line 43 "./ragel/tsdp_parser_header_P.jrl" */

function tsdp_header_P(s_value){
	this.__proto__ = new tsdp_header(tsdp_header_type_e.P);
	this.s_value = s_value;
	this.toString = function(){
		return this.s_value;
	}
}

tsdp_header_P.prototype.Parse = function(s_str){
	var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;	
	var hdr_P = new tsdp_header_P(null);
	
	
/* line 96 "./src/headers/tsdp_header_P.js" */
{
	 cs = tsdp_machine_parser_header_P_start;
} /* JSCodeGen::writeInit */

/* line 62 "./ragel/tsdp_parser_header_P.jrl" */
	
/* line 103 "./src/headers/tsdp_header_P.js" */
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
	_keys = _tsdp_machine_parser_header_P_key_offsets[cs];
	_trans = _tsdp_machine_parser_header_P_index_offsets[cs];
	_klen = _tsdp_machine_parser_header_P_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsdp_machine_parser_header_P_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsdp_machine_parser_header_P_trans_keys[_mid]) {
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
	  _klen = _tsdp_machine_parser_header_P_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsdp_machine_parser_header_P_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsdp_machine_parser_header_P_trans_keys[_mid+1]) {
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
	cs = _tsdp_machine_parser_header_P_trans_targs[_trans];
	if (_tsdp_machine_parser_header_P_trans_actions[_trans] != 0) {
		_acts = _tsdp_machine_parser_header_P_trans_actions[_trans];
		_nacts = _tsdp_machine_parser_header_P_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsdp_machine_parser_header_P_actions[_acts - 1]) {
case 0:
/* line 27 "./ragel/tsdp_parser_header_P.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 31 "./ragel/tsdp_parser_header_P.jrl" */

		hdr_P.s_value = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			break;
/* line 196 "./src/headers/tsdp_header_P.js" */
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
	__acts = _tsdp_machine_parser_header_P_eof_actions[cs];
	__nacts =  _tsdp_machine_parser_header_P_actions[__acts];
	__acts += 1;
	while (__nacts > 0) {
		__nacts -= 1;
		__acts += 1;
		switch (_tsdp_machine_parser_header_P_actions[__acts - 1]) {
case 0:
/* line 27 "./ragel/tsdp_parser_header_P.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 31 "./ragel/tsdp_parser_header_P.jrl" */

		hdr_P.s_value = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			break;
/* line 234 "./src/headers/tsdp_header_P.js" */
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

/* line 63 "./ragel/tsdp_parser_header_P.jrl" */
	
	if( cs < 
/* line 251 "./src/headers/tsdp_header_P.js" */
4
/* line 64 "./ragel/tsdp_parser_header_P.jrl" */
 ){
		console.error("Failed to parse \"p=\" header: %s", s_str);
		return null;
	}
	
	return hdr_P;
}
