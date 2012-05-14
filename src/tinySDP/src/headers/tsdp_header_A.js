
/* line 1 "./ragel/tsdp_parser_header_A.jrl" */
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

/* line 47 "./ragel/tsdp_parser_header_A.jrl" */



/* line 29 "./src/headers/tsdp_header_A.js" */
const _tsdp_machine_parser_header_A_actions = [
	0, 1, 0, 1, 1, 1, 2, 2, 
	0, 2
];

const _tsdp_machine_parser_header_A_key_offsets = [
	0, 0, 1, 3, 18, 19, 35, 35, 
	38
];

const _tsdp_machine_parser_header_A_trans_keys = [
	97, 32, 61, 32, 33, 37, 39, 126, 
	42, 43, 45, 46, 48, 57, 65, 90, 
	95, 122, 10, 13, 33, 37, 39, 58, 
	126, 42, 43, 45, 46, 48, 57, 65, 
	90, 95, 122, 13, 0, 65535, 13, 0, 
	65535, 0
];

const _tsdp_machine_parser_header_A_single_lengths = [
	0, 1, 2, 5, 1, 6, 0, 1, 
	1
];

const _tsdp_machine_parser_header_A_range_lengths = [
	0, 0, 0, 5, 0, 5, 0, 1, 
	1
];

const _tsdp_machine_parser_header_A_index_offsets = [
	0, 0, 2, 5, 16, 18, 30, 31, 
	34
];

const _tsdp_machine_parser_header_A_indicies = [
	0, 1, 0, 2, 1, 2, 3, 3, 
	3, 3, 3, 3, 3, 3, 3, 1, 
	4, 1, 5, 6, 6, 6, 7, 6, 
	6, 6, 6, 6, 6, 1, 1, 9, 
	8, 1, 11, 10, 1, 0
];

const _tsdp_machine_parser_header_A_trans_targs = [
	2, 0, 3, 5, 6, 4, 5, 7, 
	8, 4, 8, 4
];

const _tsdp_machine_parser_header_A_trans_actions = [
	0, 0, 0, 1, 0, 3, 0, 3, 
	1, 7, 0, 5
];

const _tsdp_machine_parser_header_A_eof_actions = [
	0, 0, 0, 0, 0, 3, 0, 7, 
	5
];

const tsdp_machine_parser_header_A_start = 1;
const tsdp_machine_parser_header_A_first_final = 5;
const tsdp_machine_parser_header_A_error = 0;

const tsdp_machine_parser_header_A_en_main = 1;


/* line 50 "./ragel/tsdp_parser_header_A.jrl" */

function tsdp_header_A(s_field, s_value){
	this.__proto__ = new tsdp_header(tsdp_header_type_e.A);
	this.s_field = s_field;
	this.s_value = s_value;
	this.toString = function(){
		return tsk_string_format("{0}{1}{2}",
				this.s_field,

				this.s_value ? ":" : "",
				this.s_value ? this.s_value : "");
	}
}

tsdp_header_A.prototype.RemoveAllByField = function(ao_headers, s_field){
	var o_hdr_A;

	if(!ao_headers || !s_field){
		console.error("Invalid parameter");
		return -1;
	}

	for(i = 0; i < ao_headers.length; ){
		o_hdr_A = ao_headers[i];
		if(tsk_string_iequals(s_field, o_hdr_A.s_field)){
			ao_headers.splice(i, 1);
			continue;
		}
		++i;
	}

	return 0;
}

tsdp_header_A.prototype.Parse = function(s_str){
	var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;	
	var hdr_A = new tsdp_header_A(null, null);
	
	
/* line 139 "./src/headers/tsdp_header_A.js" */
{
	 cs = tsdp_machine_parser_header_A_start;
} /* JSCodeGen::writeInit */

/* line 94 "./ragel/tsdp_parser_header_A.jrl" */
	
/* line 146 "./src/headers/tsdp_header_A.js" */
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
	_keys = _tsdp_machine_parser_header_A_key_offsets[cs];
	_trans = _tsdp_machine_parser_header_A_index_offsets[cs];
	_klen = _tsdp_machine_parser_header_A_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsdp_machine_parser_header_A_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsdp_machine_parser_header_A_trans_keys[_mid]) {
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
	  _klen = _tsdp_machine_parser_header_A_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsdp_machine_parser_header_A_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsdp_machine_parser_header_A_trans_keys[_mid+1]) {
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
	_trans = _tsdp_machine_parser_header_A_indicies[_trans];
	cs = _tsdp_machine_parser_header_A_trans_targs[_trans];
	if (_tsdp_machine_parser_header_A_trans_actions[_trans] != 0) {
		_acts = _tsdp_machine_parser_header_A_trans_actions[_trans];
		_nacts = _tsdp_machine_parser_header_A_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsdp_machine_parser_header_A_actions[_acts - 1]) {
case 0:
/* line 27 "./ragel/tsdp_parser_header_A.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 31 "./ragel/tsdp_parser_header_A.jrl" */

		hdr_A.s_field = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			break;
case 2:
/* line 35 "./ragel/tsdp_parser_header_A.jrl" */

		hdr_A.s_value = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			break;
/* line 245 "./src/headers/tsdp_header_A.js" */
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
	__acts = _tsdp_machine_parser_header_A_eof_actions[cs];
	__nacts =  _tsdp_machine_parser_header_A_actions[__acts];
	__acts += 1;
	while (__nacts > 0) {
		__nacts -= 1;
		__acts += 1;
		switch (_tsdp_machine_parser_header_A_actions[__acts - 1]) {
case 0:
/* line 27 "./ragel/tsdp_parser_header_A.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 31 "./ragel/tsdp_parser_header_A.jrl" */

		hdr_A.s_field = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			break;
case 2:
/* line 35 "./ragel/tsdp_parser_header_A.jrl" */

		hdr_A.s_value = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			break;
/* line 288 "./src/headers/tsdp_header_A.js" */
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

/* line 95 "./ragel/tsdp_parser_header_A.jrl" */
	
	if( cs < 
/* line 305 "./src/headers/tsdp_header_A.js" */
5
/* line 96 "./ragel/tsdp_parser_header_A.jrl" */
 ){
		console.error("Failed to parse \"a=\" header: %s", s_str);
		return null;
	}
	
	return hdr_A;
}



