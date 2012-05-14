
/* line 1 "./ragel/tsdp_parser_header_Z.jrl" */
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

/* line 73 "./ragel/tsdp_parser_header_Z.jrl" */



/* line 29 "./src/headers/tsdp_header_Z.js" */
const _tsdp_machine_parser_header_Z_actions = [
	0, 1, 0, 1, 3, 1, 4, 2, 
	1, 0, 2, 4, 2, 2, 5, 0, 
	3, 4, 2, 1
];

const _tsdp_machine_parser_header_Z_key_offsets = [
	0, 0, 1, 3, 5, 8, 11, 13, 
	14, 16, 19, 22, 24, 32, 32, 40, 
	42
];

const _tsdp_machine_parser_header_Z_trans_keys = [
	122, 32, 61, 48, 57, 32, 48, 57, 
	45, 48, 57, 48, 57, 10, 48, 57, 
	32, 48, 57, 45, 48, 57, 48, 57, 
	13, 32, 100, 104, 109, 115, 48, 57, 
	13, 32, 100, 104, 109, 115, 48, 57, 
	13, 32, 13, 32, 0
];

const _tsdp_machine_parser_header_Z_single_lengths = [
	0, 1, 2, 0, 1, 1, 0, 1, 
	0, 1, 1, 0, 6, 0, 6, 2, 
	2
];

const _tsdp_machine_parser_header_Z_range_lengths = [
	0, 0, 0, 1, 1, 1, 1, 0, 
	1, 1, 1, 1, 1, 0, 1, 0, 
	0
];

const _tsdp_machine_parser_header_Z_index_offsets = [
	0, 0, 2, 5, 7, 10, 13, 15, 
	17, 19, 22, 25, 27, 35, 36, 44, 
	47
];

const _tsdp_machine_parser_header_Z_indicies = [
	0, 1, 0, 2, 1, 3, 1, 4, 
	5, 1, 6, 7, 1, 8, 1, 9, 
	1, 10, 1, 11, 12, 1, 13, 14, 
	1, 15, 1, 16, 17, 19, 19, 19, 
	19, 18, 1, 1, 20, 21, 23, 23, 
	23, 23, 22, 1, 20, 21, 1, 16, 
	17, 1, 0
];

const _tsdp_machine_parser_header_Z_trans_targs = [
	2, 0, 3, 4, 5, 4, 6, 12, 
	12, 13, 9, 10, 9, 11, 14, 14, 
	7, 8, 12, 16, 7, 8, 14, 15
];

const _tsdp_machine_parser_header_Z_trans_actions = [
	0, 0, 0, 7, 3, 0, 0, 1, 
	13, 0, 1, 3, 0, 0, 1, 13, 
	16, 16, 0, 0, 10, 5, 0, 0
];

const _tsdp_machine_parser_header_Z_eof_actions = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 16, 0, 10, 10, 
	16
];

const tsdp_machine_parser_header_Z_start = 1;
const tsdp_machine_parser_header_Z_first_final = 12;
const tsdp_machine_parser_header_Z_error = 0;

const tsdp_machine_parser_header_Z_en_main = 1;


/* line 76 "./ragel/tsdp_parser_header_Z.jrl" */

function tsdp_zone(i_time, b_shifted_back, s_typed_time){
	this.i_time = i_time;
	this.b_shifted_back = b_shifted_back;
	this.s_typed_time = s_typed_time;
}

function tsdp_header_Z(i_time, b_shifted_back, s_typed_time){
	this.__proto__ = new tsdp_header(tsdp_header_type_e.Z);
	this.ao_zones = new Array();
	if(s_typed_time){
		this.ao_zones.push(new tsdp_zone(i_time, b_shifted_back, s_typed_time));
	}

	this.toString = function(){
		var s_str = "";
		for(var i = 0; i < this.ao_zones.length; ++i){

				// time  SP ["-"] typed-time
				s_str += tsk_string_format("{0}{1} {2}{3}",
					i == 0 ? "" : " ",
					this.ao_zones[i].i_time,
					this.ao_zones[i].b_shifted_back ? "-" : "",
					this.ao_zones[i].s_typed_time);
			}

		return s_str;
	}
}

tsdp_header_Z.prototype.Parse = function(s_str){
	var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;	
	var hdr_Z = new tsdp_header_Z(0, false, null);
	var o_zone = null;
	
	
/* line 146 "./src/headers/tsdp_header_Z.js" */
{
	 cs = tsdp_machine_parser_header_Z_start;
} /* JSCodeGen::writeInit */

/* line 117 "./ragel/tsdp_parser_header_Z.jrl" */
	
/* line 153 "./src/headers/tsdp_header_Z.js" */
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
	_keys = _tsdp_machine_parser_header_Z_key_offsets[cs];
	_trans = _tsdp_machine_parser_header_Z_index_offsets[cs];
	_klen = _tsdp_machine_parser_header_Z_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsdp_machine_parser_header_Z_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsdp_machine_parser_header_Z_trans_keys[_mid]) {
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
	  _klen = _tsdp_machine_parser_header_Z_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsdp_machine_parser_header_Z_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsdp_machine_parser_header_Z_trans_keys[_mid+1]) {
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
	_trans = _tsdp_machine_parser_header_Z_indicies[_trans];
	cs = _tsdp_machine_parser_header_Z_trans_targs[_trans];
	if (_tsdp_machine_parser_header_Z_trans_actions[_trans] != 0) {
		_acts = _tsdp_machine_parser_header_Z_trans_actions[_trans];
		_nacts = _tsdp_machine_parser_header_Z_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsdp_machine_parser_header_Z_actions[_acts - 1]) {
case 0:
/* line 27 "./ragel/tsdp_parser_header_Z.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 31 "./ragel/tsdp_parser_header_Z.jrl" */

		if(!o_zone){
			o_zone = new tsdp_zone(0, false, null);
		}
			break;
case 2:
/* line 37 "./ragel/tsdp_parser_header_Z.jrl" */

		if(o_zone){
			hdr_Z.ao_zones.push(o_zone);
			o_zone = null;
		}
			break;
case 3:
/* line 44 "./ragel/tsdp_parser_header_Z.jrl" */

		if(o_zone){
			o_zone.i_time = tsk_ragel_parser_get_int(s_str, p, i_tag_start);
		}
			break;
case 4:
/* line 50 "./ragel/tsdp_parser_header_Z.jrl" */

		if(o_zone){
			o_zone.s_typed_time = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
		}
			break;
case 5:
/* line 56 "./ragel/tsdp_parser_header_Z.jrl" */

		if(o_zone){
			o_zone.b_shifted_back = true;
		}
			break;
/* line 278 "./src/headers/tsdp_header_Z.js" */
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
	__acts = _tsdp_machine_parser_header_Z_eof_actions[cs];
	__nacts =  _tsdp_machine_parser_header_Z_actions[__acts];
	__acts += 1;
	while (__nacts > 0) {
		__nacts -= 1;
		__acts += 1;
		switch (_tsdp_machine_parser_header_Z_actions[__acts - 1]) {
case 1:
/* line 31 "./ragel/tsdp_parser_header_Z.jrl" */

		if(!o_zone){
			o_zone = new tsdp_zone(0, false, null);
		}
			break;
case 2:
/* line 37 "./ragel/tsdp_parser_header_Z.jrl" */

		if(o_zone){
			hdr_Z.ao_zones.push(o_zone);
			o_zone = null;
		}
			break;
case 4:
/* line 50 "./ragel/tsdp_parser_header_Z.jrl" */

		if(o_zone){
			o_zone.s_typed_time = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
		}
			break;
/* line 328 "./src/headers/tsdp_header_Z.js" */
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

/* line 118 "./ragel/tsdp_parser_header_Z.jrl" */
	
	if( cs < 
/* line 345 "./src/headers/tsdp_header_Z.js" */
12
/* line 119 "./ragel/tsdp_parser_header_Z.jrl" */
 ){
		console.error("Failed to parse \"z=\" header: %s", s_str);
		return null;
	}
	
	return hdr_Z;
}