
/* line 1 "./ragel/tsip_parser_header_P_Access_Network_Info.jrl" */
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

/* line 43 "./ragel/tsip_parser_header_P_Access_Network_Info.jrl" */



/* line 29 "./src/headers/tsip_header_P_Access_Network_Info.js" */
const _tsip_machine_parser_header_P_Access_Network_Info_actions = [
	0, 1, 0, 1, 1, 1, 2, 2, 
	0, 1
];

const _tsip_machine_parser_header_P_Access_Network_Info_key_offsets = [
	0, 0, 2, 3, 5, 7, 9, 11, 
	13, 15, 16, 18, 20, 22, 24, 26, 
	28, 30, 31, 33, 35, 37, 39, 42, 
	47, 50, 51
];

const _tsip_machine_parser_header_P_Access_Network_Info_trans_keys = [
	80, 112, 45, 65, 97, 67, 99, 67, 
	99, 69, 101, 83, 115, 83, 115, 45, 
	78, 110, 69, 101, 84, 116, 87, 119, 
	79, 111, 82, 114, 75, 107, 45, 73, 
	105, 78, 110, 70, 102, 79, 111, 9, 
	32, 58, 9, 13, 32, 0, 65535, 13, 
	0, 65535, 10, 0
];

const _tsip_machine_parser_header_P_Access_Network_Info_single_lengths = [
	0, 2, 1, 2, 2, 2, 2, 2, 
	2, 1, 2, 2, 2, 2, 2, 2, 
	2, 1, 2, 2, 2, 2, 3, 3, 
	1, 1, 0
];

const _tsip_machine_parser_header_P_Access_Network_Info_range_lengths = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 1, 
	1, 0, 0
];

const _tsip_machine_parser_header_P_Access_Network_Info_index_offsets = [
	0, 0, 3, 5, 8, 11, 14, 17, 
	20, 23, 25, 28, 31, 34, 37, 40, 
	43, 46, 48, 51, 54, 57, 60, 64, 
	69, 72, 74
];

const _tsip_machine_parser_header_P_Access_Network_Info_indicies = [
	0, 0, 1, 2, 1, 3, 3, 1, 
	4, 4, 1, 5, 5, 1, 6, 6, 
	1, 7, 7, 1, 8, 8, 1, 9, 
	1, 10, 10, 1, 11, 11, 1, 12, 
	12, 1, 13, 13, 1, 14, 14, 1, 
	15, 15, 1, 16, 16, 1, 17, 1, 
	18, 18, 1, 19, 19, 1, 20, 20, 
	1, 21, 21, 1, 21, 21, 22, 1, 
	24, 25, 24, 23, 1, 27, 26, 1, 
	28, 1, 1, 0
];

const _tsip_machine_parser_header_P_Access_Network_Info_trans_targs = [
	2, 0, 3, 4, 5, 6, 7, 8, 
	9, 10, 11, 12, 13, 14, 15, 16, 
	17, 18, 19, 20, 21, 22, 23, 24, 
	23, 25, 24, 25, 26
];

const _tsip_machine_parser_header_P_Access_Network_Info_trans_actions = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 1, 
	1, 7, 0, 3, 5
];

const tsip_machine_parser_header_P_Access_Network_Info_start = 1;
const tsip_machine_parser_header_P_Access_Network_Info_first_final = 26;
const tsip_machine_parser_header_P_Access_Network_Info_error = 0;

const tsip_machine_parser_header_P_Access_Network_Info_en_main = 1;


/* line 46 "./ragel/tsip_parser_header_P_Access_Network_Info.jrl" */

function tsip_header_P_Access_Network_Info(s_value){
    this.__proto__.__proto__ = new tsip_header(tsip_header_type_e.P_Access_Network_Info);
    this.s_value = s_value;
    this.toString = function(){
        return this.s_value;
    };
}

tsip_header_P_Access_Network_Info.prototype.Parse = function(s_str){
    var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;	
	var hdr_ani = new tsip_header_P_Access_Network_Info(null);
	
	
/* line 127 "./src/headers/tsip_header_P_Access_Network_Info.js" */
{
	 cs = tsip_machine_parser_header_P_Access_Network_Info_start;
} /* JSCodeGen::writeInit */

/* line 65 "./ragel/tsip_parser_header_P_Access_Network_Info.jrl" */
	
/* line 134 "./src/headers/tsip_header_P_Access_Network_Info.js" */
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
	_keys = _tsip_machine_parser_header_P_Access_Network_Info_key_offsets[cs];
	_trans = _tsip_machine_parser_header_P_Access_Network_Info_index_offsets[cs];
	_klen = _tsip_machine_parser_header_P_Access_Network_Info_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsip_machine_parser_header_P_Access_Network_Info_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsip_machine_parser_header_P_Access_Network_Info_trans_keys[_mid]) {
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
	  _klen = _tsip_machine_parser_header_P_Access_Network_Info_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsip_machine_parser_header_P_Access_Network_Info_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsip_machine_parser_header_P_Access_Network_Info_trans_keys[_mid+1]) {
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
	_trans = _tsip_machine_parser_header_P_Access_Network_Info_indicies[_trans];
	cs = _tsip_machine_parser_header_P_Access_Network_Info_trans_targs[_trans];
	if (_tsip_machine_parser_header_P_Access_Network_Info_trans_actions[_trans] != 0) {
		_acts = _tsip_machine_parser_header_P_Access_Network_Info_trans_actions[_trans];
		_nacts = _tsip_machine_parser_header_P_Access_Network_Info_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsip_machine_parser_header_P_Access_Network_Info_actions[_acts - 1]) {
case 0:
/* line 27 "./ragel/tsip_parser_header_P_Access_Network_Info.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 31 "./ragel/tsip_parser_header_P_Access_Network_Info.jrl" */

	    hdr_ani.s_value = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			break;
case 2:
/* line 35 "./ragel/tsip_parser_header_P_Access_Network_Info.jrl" */

			break;
/* line 232 "./src/headers/tsip_header_P_Access_Network_Info.js" */
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
	}
	if (_goto_level <= _out) {
		break;
	}
	}
	}

/* line 66 "./ragel/tsip_parser_header_P_Access_Network_Info.jrl" */
	
	if( cs < 
/* line 262 "./src/headers/tsip_header_P_Access_Network_Info.js" */
26
/* line 67 "./ragel/tsip_parser_header_P_Access_Network_Info.jrl" */
 ){
		console.error("Failed to parse 'P-Access-Network-Info' header: %s", s_str);
		return null;
	}
	
	return hdr_ani;
}