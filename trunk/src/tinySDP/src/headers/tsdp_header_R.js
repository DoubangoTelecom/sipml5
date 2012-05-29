
/* line 1 "./ragel/tsdp_parser_header_R.jrl" */
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

tsdp_header_R.prototype = Object.create(tsdp_header.prototype);

/* line 51 "./ragel/tsdp_parser_header_R.jrl" */



/* line 31 "./src/headers/tsdp_header_R.js" */
_tsdp_machine_parser_header_R_actions = [
	0, 1, 0, 1, 1, 1, 2
];

_tsdp_machine_parser_header_R_key_offsets = [
	0, 0, 1, 3, 6, 13, 15, 22, 
	24, 25, 26, 27, 35, 35
];

_tsdp_machine_parser_header_R_trans_keys = [
	114, 32, 61, 32, 48, 57, 32, 100, 
	104, 109, 115, 48, 57, 48, 57, 32, 
	100, 104, 109, 115, 48, 57, 48, 57, 
	10, 32, 32, 13, 32, 100, 104, 109, 
	115, 48, 57, 13, 32, 0
];

_tsdp_machine_parser_header_R_single_lengths = [
	0, 1, 2, 1, 5, 0, 5, 0, 
	1, 1, 1, 6, 0, 2
];

_tsdp_machine_parser_header_R_range_lengths = [
	0, 0, 0, 1, 1, 1, 1, 1, 
	0, 0, 0, 1, 0, 0
];

_tsdp_machine_parser_header_R_index_offsets = [
	0, 0, 2, 5, 8, 15, 17, 24, 
	26, 28, 30, 32, 40, 41
];

_tsdp_machine_parser_header_R_indicies = [
	0, 1, 0, 2, 1, 2, 3, 1, 
	4, 6, 6, 6, 6, 5, 1, 7, 
	1, 8, 10, 10, 10, 10, 9, 1, 
	11, 1, 12, 1, 8, 1, 4, 1, 
	13, 8, 15, 15, 15, 15, 14, 1, 
	1, 13, 8, 1, 0
];

_tsdp_machine_parser_header_R_trans_targs = [
	2, 0, 3, 4, 5, 4, 10, 6, 
	7, 6, 9, 11, 12, 8, 11, 13
];

_tsdp_machine_parser_header_R_trans_actions = [
	0, 0, 0, 1, 3, 0, 0, 1, 
	5, 0, 0, 1, 0, 5, 0, 0
];

_tsdp_machine_parser_header_R_eof_actions = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 5, 0, 5
];

tsdp_machine_parser_header_R_start = 1;
tsdp_machine_parser_header_R_first_final = 11;
tsdp_machine_parser_header_R_error = 0;

tsdp_machine_parser_header_R_en_main = 1;


/* line 54 "./ragel/tsdp_parser_header_R.jrl" */

function tsdp_header_R(s_repeat_interval, s_typed_time){
	tsdp_header.call(this, tsdp_header_type_e.R);
	this.s_repeat_interval = s_repeat_interval;
	this.as_typed_times = new Array();
	if(s_typed_time){
		this.as_typed_times.push(s_typed_time);
	}
}

tsdp_header_R.prototype.toString = function(){
	// r=7d 1h 0 25h
	var s_str = this.s_repeat_interval;
	for(var i = 0; i < this.as_typed_times.length; ++i){
		s_str += " " + this.as_typed_times[i];
	}
	return s_str;
}

tsdp_header_R.prototype.Parse = function(s_str){
	var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;	
	var hdr_R = new tsdp_header_R(null, null);
	
	
/* line 125 "./src/headers/tsdp_header_R.js" */
{
	 cs = tsdp_machine_parser_header_R_start;
} /* JSCodeGen::writeInit */

/* line 83 "./ragel/tsdp_parser_header_R.jrl" */
	
/* line 132 "./src/headers/tsdp_header_R.js" */
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
	_keys = _tsdp_machine_parser_header_R_key_offsets[cs];
	_trans = _tsdp_machine_parser_header_R_index_offsets[cs];
	_klen = _tsdp_machine_parser_header_R_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsdp_machine_parser_header_R_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsdp_machine_parser_header_R_trans_keys[_mid]) {
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
	  _klen = _tsdp_machine_parser_header_R_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsdp_machine_parser_header_R_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsdp_machine_parser_header_R_trans_keys[_mid+1]) {
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
	_trans = _tsdp_machine_parser_header_R_indicies[_trans];
	cs = _tsdp_machine_parser_header_R_trans_targs[_trans];
	if (_tsdp_machine_parser_header_R_trans_actions[_trans] != 0) {
		_acts = _tsdp_machine_parser_header_R_trans_actions[_trans];
		_nacts = _tsdp_machine_parser_header_R_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsdp_machine_parser_header_R_actions[_acts - 1]) {
case 0:
/* line 29 "./ragel/tsdp_parser_header_R.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 33 "./ragel/tsdp_parser_header_R.jrl" */

		hdr_R.s_repeat_interval = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			break;
case 2:
/* line 37 "./ragel/tsdp_parser_header_R.jrl" */

		tsk_ragel_parser_add_string(s_str, p, i_tag_start, hdr_R.as_typed_times);
			break;
/* line 231 "./src/headers/tsdp_header_R.js" */
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
	__acts = _tsdp_machine_parser_header_R_eof_actions[cs];
	__nacts =  _tsdp_machine_parser_header_R_actions[__acts];
	__acts += 1;
	while (__nacts > 0) {
		__nacts -= 1;
		__acts += 1;
		switch (_tsdp_machine_parser_header_R_actions[__acts - 1]) {
case 2:
/* line 37 "./ragel/tsdp_parser_header_R.jrl" */

		tsk_ragel_parser_add_string(s_str, p, i_tag_start, hdr_R.as_typed_times);
			break;
/* line 264 "./src/headers/tsdp_header_R.js" */
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

/* line 84 "./ragel/tsdp_parser_header_R.jrl" */
	
	if( cs < 
/* line 281 "./src/headers/tsdp_header_R.js" */
11
/* line 85 "./ragel/tsdp_parser_header_R.jrl" */
 ){
		tsk_utils_log_error("Failed to parse \"r=\" header: " + s_str);
		return null;
	}
	
	return hdr_R;
}