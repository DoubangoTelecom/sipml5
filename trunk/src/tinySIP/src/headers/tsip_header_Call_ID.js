
/* line 1 "./ragel/tsip_parser_header_Call_ID.jrl" */
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

/* line 44 "./ragel/tsip_parser_header_Call_ID.jrl" */



/* line 29 "./src/headers/tsip_header_Call_ID.js" */
const _tsip_machine_parser_header_Call_ID_actions = [
	0, 1, 0, 1, 1, 1, 2
];

const _tsip_machine_parser_header_Call_ID_key_offsets = [
	0, 0, 4, 6, 8, 10, 11, 13, 
	15, 18, 37, 38, 40, 58, 74, 75, 
	91, 108
];

const _tsip_machine_parser_header_Call_ID_trans_keys = [
	67, 73, 99, 105, 65, 97, 76, 108, 
	76, 108, 45, 73, 105, 68, 100, 9, 
	32, 58, 9, 13, 32, 37, 60, 33, 
	34, 39, 43, 45, 58, 62, 63, 65, 
	93, 95, 123, 125, 126, 10, 9, 32, 
	9, 32, 37, 60, 33, 34, 39, 43, 
	45, 58, 62, 63, 65, 93, 95, 123, 
	125, 126, 13, 37, 60, 64, 33, 34, 
	39, 43, 45, 58, 62, 93, 95, 123, 
	125, 126, 10, 37, 60, 33, 34, 39, 
	43, 45, 58, 62, 63, 65, 93, 95, 
	123, 125, 126, 13, 37, 60, 33, 34, 
	39, 43, 45, 58, 62, 63, 65, 93, 
	95, 123, 125, 126, 0
];

const _tsip_machine_parser_header_Call_ID_single_lengths = [
	0, 4, 2, 2, 2, 1, 2, 2, 
	3, 5, 1, 2, 4, 4, 1, 2, 
	3, 0
];

const _tsip_machine_parser_header_Call_ID_range_lengths = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 7, 0, 0, 7, 6, 0, 7, 
	7, 0
];

const _tsip_machine_parser_header_Call_ID_index_offsets = [
	0, 0, 5, 8, 11, 14, 16, 19, 
	22, 26, 39, 41, 44, 56, 67, 69, 
	79, 90
];

const _tsip_machine_parser_header_Call_ID_indicies = [
	0, 2, 0, 2, 1, 3, 3, 1, 
	4, 4, 1, 5, 5, 1, 6, 1, 
	7, 7, 1, 2, 2, 1, 2, 2, 
	8, 1, 8, 9, 8, 10, 10, 10, 
	10, 10, 10, 10, 10, 10, 1, 11, 
	1, 12, 12, 1, 12, 12, 10, 10, 
	10, 10, 10, 10, 10, 10, 10, 1, 
	13, 14, 14, 15, 14, 14, 14, 14, 
	14, 14, 1, 16, 1, 17, 17, 17, 
	17, 17, 17, 17, 17, 17, 1, 13, 
	17, 17, 17, 17, 17, 17, 17, 17, 
	17, 1, 1, 0
];

const _tsip_machine_parser_header_Call_ID_trans_targs = [
	2, 0, 8, 3, 4, 5, 6, 7, 
	9, 10, 13, 11, 12, 14, 13, 15, 
	17, 16
];

const _tsip_machine_parser_header_Call_ID_trans_actions = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 1, 0, 0, 3, 0, 0, 
	5, 0
];

const tsip_machine_parser_header_Call_ID_start = 1;
const tsip_machine_parser_header_Call_ID_first_final = 17;
const tsip_machine_parser_header_Call_ID_error = 0;

const tsip_machine_parser_header_Call_ID_en_main = 1;


/* line 47 "./ragel/tsip_parser_header_Call_ID.jrl" */

function tsip_header_Call_ID(s_value){
    this.__proto__.__proto__ = new tsip_header(tsip_header_type_e.Call_ID);
    this.s_value = s_value;

    this.toString = function(){
        return this.s_value;
    };
}

tsip_header_Call_ID.prototype.Parse = function(s_str){
    var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;	
	var hdr_call_id = new tsip_header_Call_ID(null);
	
	
/* line 130 "./src/headers/tsip_header_Call_ID.js" */
{
	 cs = tsip_machine_parser_header_Call_ID_start;
} /* JSCodeGen::writeInit */

/* line 67 "./ragel/tsip_parser_header_Call_ID.jrl" */
	
/* line 137 "./src/headers/tsip_header_Call_ID.js" */
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
	_keys = _tsip_machine_parser_header_Call_ID_key_offsets[cs];
	_trans = _tsip_machine_parser_header_Call_ID_index_offsets[cs];
	_klen = _tsip_machine_parser_header_Call_ID_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsip_machine_parser_header_Call_ID_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsip_machine_parser_header_Call_ID_trans_keys[_mid]) {
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
	  _klen = _tsip_machine_parser_header_Call_ID_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsip_machine_parser_header_Call_ID_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsip_machine_parser_header_Call_ID_trans_keys[_mid+1]) {
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
	_trans = _tsip_machine_parser_header_Call_ID_indicies[_trans];
	cs = _tsip_machine_parser_header_Call_ID_trans_targs[_trans];
	if (_tsip_machine_parser_header_Call_ID_trans_actions[_trans] != 0) {
		_acts = _tsip_machine_parser_header_Call_ID_trans_actions[_trans];
		_nacts = _tsip_machine_parser_header_Call_ID_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsip_machine_parser_header_Call_ID_actions[_acts - 1]) {
case 0:
/* line 27 "./ragel/tsip_parser_header_Call_ID.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 31 "./ragel/tsip_parser_header_Call_ID.jrl" */

	    hdr_call_id.s_value = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			break;
case 2:
/* line 35 "./ragel/tsip_parser_header_Call_ID.jrl" */

			break;
/* line 235 "./src/headers/tsip_header_Call_ID.js" */
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

/* line 68 "./ragel/tsip_parser_header_Call_ID.jrl" */
	
	if( cs < 
/* line 265 "./src/headers/tsip_header_Call_ID.js" */
17
/* line 69 "./ragel/tsip_parser_header_Call_ID.jrl" */
 ){
		console.error("Failed to parse 'Call-ID' header: %s", s_str);
		return null;
	}
	
	return hdr_call_id;
}