
/* line 1 "./ragel/tsdp_parser_header_Dummy.jrl" */
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

tsdp_header_Dummy.prototype = Object.create(tsdp_header.prototype);

/* line 46 "./ragel/tsdp_parser_header_Dummy.jrl" */



/* line 31 "./src/headers/tsdp_header_Dummy.js" */
_tsdp_machine_parser_header_Dummy_actions = [
	0, 1, 0, 1, 1, 1, 2, 2, 
	0, 2
];

_tsdp_machine_parser_header_Dummy_key_offsets = [
	0, 0, 4, 6, 8, 9, 13, 16
];

_tsdp_machine_parser_header_Dummy_trans_keys = [
	65, 90, 97, 122, 32, 61, 32, 61, 
	10, 13, 32, 0, 65535, 13, 0, 65535, 
	0
];

_tsdp_machine_parser_header_Dummy_single_lengths = [
	0, 0, 2, 2, 1, 2, 1, 0
];

_tsdp_machine_parser_header_Dummy_range_lengths = [
	0, 2, 0, 0, 0, 1, 1, 0
];

_tsdp_machine_parser_header_Dummy_index_offsets = [
	0, 0, 3, 6, 9, 11, 15, 18
];

_tsdp_machine_parser_header_Dummy_trans_targs = [
	2, 2, 0, 3, 5, 0, 3, 5, 
	0, 7, 0, 4, 5, 6, 0, 4, 
	6, 0, 0, 0
];

_tsdp_machine_parser_header_Dummy_trans_actions = [
	1, 1, 0, 3, 3, 0, 0, 0, 
	0, 0, 0, 7, 0, 1, 0, 5, 
	0, 0, 0, 0
];

_tsdp_machine_parser_header_Dummy_eof_actions = [
	0, 0, 0, 0, 0, 7, 5, 0
];

tsdp_machine_parser_header_Dummy_start = 1;
tsdp_machine_parser_header_Dummy_first_final = 5;
tsdp_machine_parser_header_Dummy_error = 0;

tsdp_machine_parser_header_Dummy_en_main = 1;


/* line 49 "./ragel/tsdp_parser_header_Dummy.jrl" */

function tsdp_header_Dummy(c_name, s_value){
	tsdp_header.call(this, tsdp_header_type_e.DUMMY);
	this.c_name = c_name;
	this.s_value = s_value;
}

tsdp_header_Dummy.prototype.toString = function(){
	return this.s_value;
}

tsdp_header_Dummy.prototype.Parse = function(s_str){
	var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;	
	var hdr_Dummy = new tsdp_header_Dummy('*', null);
	
	
/* line 104 "./src/headers/tsdp_header_Dummy.js" */
{
	 cs = tsdp_machine_parser_header_Dummy_start;
} /* JSCodeGen::writeInit */

/* line 70 "./ragel/tsdp_parser_header_Dummy.jrl" */
	
/* line 111 "./src/headers/tsdp_header_Dummy.js" */
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
	_keys = _tsdp_machine_parser_header_Dummy_key_offsets[cs];
	_trans = _tsdp_machine_parser_header_Dummy_index_offsets[cs];
	_klen = _tsdp_machine_parser_header_Dummy_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsdp_machine_parser_header_Dummy_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsdp_machine_parser_header_Dummy_trans_keys[_mid]) {
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
	  _klen = _tsdp_machine_parser_header_Dummy_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsdp_machine_parser_header_Dummy_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsdp_machine_parser_header_Dummy_trans_keys[_mid+1]) {
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
	cs = _tsdp_machine_parser_header_Dummy_trans_targs[_trans];
	if (_tsdp_machine_parser_header_Dummy_trans_actions[_trans] != 0) {
		_acts = _tsdp_machine_parser_header_Dummy_trans_actions[_trans];
		_nacts = _tsdp_machine_parser_header_Dummy_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsdp_machine_parser_header_Dummy_actions[_acts - 1]) {
case 0:
/* line 29 "./ragel/tsdp_parser_header_Dummy.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 33 "./ragel/tsdp_parser_header_Dummy.jrl" */

		hdr_Dummy.c_name = s_str[i_tag_start];
			break;
case 2:
/* line 37 "./ragel/tsdp_parser_header_Dummy.jrl" */

		hdr_Dummy.s_value = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			break;
/* line 209 "./src/headers/tsdp_header_Dummy.js" */
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
	__acts = _tsdp_machine_parser_header_Dummy_eof_actions[cs];
	__nacts =  _tsdp_machine_parser_header_Dummy_actions[__acts];
	__acts += 1;
	while (__nacts > 0) {
		__nacts -= 1;
		__acts += 1;
		switch (_tsdp_machine_parser_header_Dummy_actions[__acts - 1]) {
case 0:
/* line 29 "./ragel/tsdp_parser_header_Dummy.jrl" */

		i_tag_start = p;
			break;
case 2:
/* line 37 "./ragel/tsdp_parser_header_Dummy.jrl" */

		hdr_Dummy.s_value = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			break;
/* line 247 "./src/headers/tsdp_header_Dummy.js" */
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

/* line 71 "./ragel/tsdp_parser_header_Dummy.jrl" */
	
	if( cs < 
/* line 264 "./src/headers/tsdp_header_Dummy.js" */
5
/* line 72 "./ragel/tsdp_parser_header_Dummy.jrl" */
 ){
		tsk_utils_log_error("Failed to parse 'Dummy' header: " + s_str);
		return null;
	}
	
	return hdr_Dummy;
}
