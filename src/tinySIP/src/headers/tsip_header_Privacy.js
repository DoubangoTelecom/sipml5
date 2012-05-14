
/* line 1 "./ragel/tsip_parser_header_Privacy.jrl" */
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

/* line 44 "./ragel/tsip_parser_header_Privacy.jrl" */




/* line 30 "./src/headers/tsip_header_Privacy.js" */
const _tsip_machine_parser_header_Privacy_actions = [
	0, 1, 0, 1, 1, 1, 2
];

const _tsip_machine_parser_header_Privacy_key_offsets = [
	0, 0, 2, 4, 6, 8, 10, 12, 
	14, 17, 46, 47, 49, 77, 93, 94, 
	120, 138, 156, 174, 192, 210, 228, 246, 
	248, 268, 286, 304, 322, 340, 358, 376, 
	394, 412, 430, 448, 466, 484, 502, 520, 
	538, 556, 574, 592, 610, 628
];

const _tsip_machine_parser_header_Privacy_trans_keys = [
	80, 112, 82, 114, 73, 105, 86, 118, 
	65, 97, 67, 99, 89, 121, 9, 32, 
	58, 9, 13, 32, 33, 37, 39, 67, 
	72, 73, 78, 83, 85, 99, 104, 105, 
	110, 115, 117, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 10, 9, 
	32, 9, 32, 33, 37, 39, 67, 72, 
	73, 78, 83, 85, 99, 104, 105, 110, 
	115, 117, 126, 42, 43, 45, 46, 48, 
	57, 65, 90, 95, 122, 13, 33, 37, 
	39, 59, 126, 42, 43, 45, 46, 48, 
	57, 65, 90, 95, 122, 10, 33, 37, 
	39, 67, 72, 73, 78, 83, 85, 99, 
	104, 105, 110, 115, 117, 126, 42, 43, 
	45, 46, 48, 57, 65, 90, 95, 122, 
	13, 33, 37, 39, 59, 82, 114, 126, 
	42, 43, 45, 46, 48, 57, 65, 90, 
	95, 122, 13, 33, 37, 39, 59, 73, 
	105, 126, 42, 43, 45, 46, 48, 57, 
	65, 90, 95, 122, 13, 33, 37, 39, 
	59, 84, 116, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 13, 33, 
	37, 39, 59, 73, 105, 126, 42, 43, 
	45, 46, 48, 57, 65, 90, 95, 122, 
	13, 33, 37, 39, 59, 67, 99, 126, 
	42, 43, 45, 46, 48, 57, 65, 90, 
	95, 122, 13, 33, 37, 39, 59, 65, 
	97, 126, 42, 43, 45, 46, 48, 57, 
	66, 90, 95, 122, 13, 33, 37, 39, 
	59, 76, 108, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 13, 59, 
	13, 33, 37, 39, 59, 69, 73, 101, 
	105, 126, 42, 43, 45, 46, 48, 57, 
	65, 90, 95, 122, 13, 33, 37, 39, 
	59, 65, 97, 126, 42, 43, 45, 46, 
	48, 57, 66, 90, 95, 122, 13, 33, 
	37, 39, 59, 68, 100, 126, 42, 43, 
	45, 46, 48, 57, 65, 90, 95, 122, 
	13, 33, 37, 39, 59, 69, 101, 126, 
	42, 43, 45, 46, 48, 57, 65, 90, 
	95, 122, 13, 33, 37, 39, 59, 82, 
	114, 126, 42, 43, 45, 46, 48, 57, 
	65, 90, 95, 122, 13, 33, 37, 39, 
	59, 83, 115, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 13, 33, 
	37, 39, 59, 84, 116, 126, 42, 43, 
	45, 46, 48, 57, 65, 90, 95, 122, 
	13, 33, 37, 39, 59, 79, 111, 126, 
	42, 43, 45, 46, 48, 57, 65, 90, 
	95, 122, 13, 33, 37, 39, 59, 82, 
	114, 126, 42, 43, 45, 46, 48, 57, 
	65, 90, 95, 122, 13, 33, 37, 39, 
	59, 89, 121, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 13, 33, 
	37, 39, 59, 68, 100, 126, 42, 43, 
	45, 46, 48, 57, 65, 90, 95, 122, 
	13, 33, 37, 39, 59, 79, 111, 126, 
	42, 43, 45, 46, 48, 57, 65, 90, 
	95, 122, 13, 33, 37, 39, 59, 78, 
	110, 126, 42, 43, 45, 46, 48, 57, 
	65, 90, 95, 122, 13, 33, 37, 39, 
	59, 69, 101, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 13, 33, 
	37, 39, 59, 69, 101, 126, 42, 43, 
	45, 46, 48, 57, 65, 90, 95, 122, 
	13, 33, 37, 39, 59, 83, 115, 126, 
	42, 43, 45, 46, 48, 57, 65, 90, 
	95, 122, 13, 33, 37, 39, 59, 83, 
	115, 126, 42, 43, 45, 46, 48, 57, 
	65, 90, 95, 122, 13, 33, 37, 39, 
	59, 73, 105, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 13, 33, 
	37, 39, 59, 79, 111, 126, 42, 43, 
	45, 46, 48, 57, 65, 90, 95, 122, 
	13, 33, 37, 39, 59, 78, 110, 126, 
	42, 43, 45, 46, 48, 57, 65, 90, 
	95, 122, 13, 33, 37, 39, 59, 83, 
	115, 126, 42, 43, 45, 46, 48, 57, 
	65, 90, 95, 122, 0
];

const _tsip_machine_parser_header_Privacy_single_lengths = [
	0, 2, 2, 2, 2, 2, 2, 2, 
	3, 19, 1, 2, 18, 6, 1, 16, 
	8, 8, 8, 8, 8, 8, 8, 2, 
	10, 8, 8, 8, 8, 8, 8, 8, 
	8, 8, 8, 8, 8, 8, 8, 8, 
	8, 8, 8, 8, 8, 0
];

const _tsip_machine_parser_header_Privacy_range_lengths = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 5, 0, 0, 5, 5, 0, 5, 
	5, 5, 5, 5, 5, 5, 5, 0, 
	5, 5, 5, 5, 5, 5, 5, 5, 
	5, 5, 5, 5, 5, 5, 5, 5, 
	5, 5, 5, 5, 5, 0
];

const _tsip_machine_parser_header_Privacy_index_offsets = [
	0, 0, 3, 6, 9, 12, 15, 18, 
	21, 25, 50, 52, 55, 79, 91, 93, 
	115, 129, 143, 157, 171, 185, 199, 213, 
	216, 232, 246, 260, 274, 288, 302, 316, 
	330, 344, 358, 372, 386, 400, 414, 428, 
	442, 456, 470, 484, 498, 512
];

const _tsip_machine_parser_header_Privacy_indicies = [
	0, 0, 1, 2, 2, 1, 3, 3, 
	1, 4, 4, 1, 5, 5, 1, 6, 
	6, 1, 7, 7, 1, 7, 7, 8, 
	1, 8, 9, 8, 10, 10, 10, 11, 
	12, 13, 14, 15, 16, 11, 12, 13, 
	14, 15, 16, 10, 10, 10, 10, 10, 
	10, 1, 17, 1, 18, 18, 1, 18, 
	18, 10, 10, 10, 11, 12, 13, 14, 
	15, 16, 11, 12, 13, 14, 15, 16, 
	10, 10, 10, 10, 10, 10, 1, 19, 
	20, 20, 20, 21, 20, 20, 20, 20, 
	20, 20, 1, 22, 1, 10, 10, 10, 
	11, 12, 13, 14, 15, 16, 11, 12, 
	13, 14, 15, 16, 10, 10, 10, 10, 
	10, 10, 1, 19, 20, 20, 20, 21, 
	23, 23, 20, 20, 20, 20, 20, 20, 
	1, 19, 20, 20, 20, 21, 24, 24, 
	20, 20, 20, 20, 20, 20, 1, 19, 
	20, 20, 20, 21, 25, 25, 20, 20, 
	20, 20, 20, 20, 1, 19, 20, 20, 
	20, 21, 26, 26, 20, 20, 20, 20, 
	20, 20, 1, 19, 20, 20, 20, 21, 
	27, 27, 20, 20, 20, 20, 20, 20, 
	1, 19, 20, 20, 20, 21, 28, 28, 
	20, 20, 20, 20, 20, 20, 1, 19, 
	20, 20, 20, 21, 29, 29, 20, 20, 
	20, 20, 20, 20, 1, 19, 21, 1, 
	19, 20, 20, 20, 21, 30, 31, 30, 
	31, 20, 20, 20, 20, 20, 20, 1, 
	19, 20, 20, 20, 21, 32, 32, 20, 
	20, 20, 20, 20, 20, 1, 19, 20, 
	20, 20, 21, 33, 33, 20, 20, 20, 
	20, 20, 20, 1, 19, 20, 20, 20, 
	21, 34, 34, 20, 20, 20, 20, 20, 
	20, 1, 19, 20, 20, 20, 21, 29, 
	29, 20, 20, 20, 20, 20, 20, 1, 
	19, 20, 20, 20, 21, 35, 35, 20, 
	20, 20, 20, 20, 20, 1, 19, 20, 
	20, 20, 21, 36, 36, 20, 20, 20, 
	20, 20, 20, 1, 19, 20, 20, 20, 
	21, 37, 37, 20, 20, 20, 20, 20, 
	20, 1, 19, 20, 20, 20, 21, 38, 
	38, 20, 20, 20, 20, 20, 20, 1, 
	19, 20, 20, 20, 21, 29, 29, 20, 
	20, 20, 20, 20, 20, 1, 19, 20, 
	20, 20, 21, 29, 29, 20, 20, 20, 
	20, 20, 20, 1, 19, 20, 20, 20, 
	21, 39, 39, 20, 20, 20, 20, 20, 
	20, 1, 19, 20, 20, 20, 21, 40, 
	40, 20, 20, 20, 20, 20, 20, 1, 
	19, 20, 20, 20, 21, 29, 29, 20, 
	20, 20, 20, 20, 20, 1, 19, 20, 
	20, 20, 21, 41, 41, 20, 20, 20, 
	20, 20, 20, 1, 19, 20, 20, 20, 
	21, 42, 42, 20, 20, 20, 20, 20, 
	20, 1, 19, 20, 20, 20, 21, 43, 
	43, 20, 20, 20, 20, 20, 20, 1, 
	19, 20, 20, 20, 21, 44, 44, 20, 
	20, 20, 20, 20, 20, 1, 19, 20, 
	20, 20, 21, 45, 45, 20, 20, 20, 
	20, 20, 20, 1, 19, 20, 20, 20, 
	21, 29, 29, 20, 20, 20, 20, 20, 
	20, 1, 19, 20, 20, 20, 21, 33, 
	33, 20, 20, 20, 20, 20, 20, 1, 
	1, 0
];

const _tsip_machine_parser_header_Privacy_trans_targs = [
	2, 0, 3, 4, 5, 6, 7, 8, 
	9, 10, 13, 16, 24, 34, 35, 38, 
	44, 11, 12, 14, 13, 15, 45, 17, 
	18, 19, 20, 21, 22, 23, 25, 29, 
	26, 27, 28, 30, 31, 32, 33, 36, 
	37, 39, 40, 41, 42, 43
];

const _tsip_machine_parser_header_Privacy_trans_actions = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 1, 1, 1, 1, 1, 1, 
	1, 0, 0, 3, 0, 3, 5, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0
];

const tsip_machine_parser_header_Privacy_start = 1;
const tsip_machine_parser_header_Privacy_first_final = 45;
const tsip_machine_parser_header_Privacy_error = 0;

const tsip_machine_parser_header_Privacy_en_main = 1;


/* line 48 "./ragel/tsip_parser_header_Privacy.jrl" */

function tsip_header_Privacy(o_uri){
    this.__proto__.__proto__ = new tsip_header(tsip_header_type_e.Privacy);
    this.as_values = new Array();
	this.toString = function(){
        var s_str = null;
        for(var i = 0; i < this.as_values.length; ++i){
            if(i == 0){
                s_str = this.as_values[i];
            }
            else{
                s_str += tsk_string_format(";{0}", this.as_values[i]);
            }
        }
        return s_str;
    }
}

tsip_header_Privacy.prototype.Parse = function(s_str){
    var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;	
	var hdr_privacy = new tsip_header_Privacy(null);
	
	
/* line 275 "./src/headers/tsip_header_Privacy.js" */
{
	 cs = tsip_machine_parser_header_Privacy_start;
} /* JSCodeGen::writeInit */

/* line 76 "./ragel/tsip_parser_header_Privacy.jrl" */
	
/* line 282 "./src/headers/tsip_header_Privacy.js" */
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
	_keys = _tsip_machine_parser_header_Privacy_key_offsets[cs];
	_trans = _tsip_machine_parser_header_Privacy_index_offsets[cs];
	_klen = _tsip_machine_parser_header_Privacy_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsip_machine_parser_header_Privacy_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsip_machine_parser_header_Privacy_trans_keys[_mid]) {
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
	  _klen = _tsip_machine_parser_header_Privacy_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsip_machine_parser_header_Privacy_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsip_machine_parser_header_Privacy_trans_keys[_mid+1]) {
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
	_trans = _tsip_machine_parser_header_Privacy_indicies[_trans];
	cs = _tsip_machine_parser_header_Privacy_trans_targs[_trans];
	if (_tsip_machine_parser_header_Privacy_trans_actions[_trans] != 0) {
		_acts = _tsip_machine_parser_header_Privacy_trans_actions[_trans];
		_nacts = _tsip_machine_parser_header_Privacy_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsip_machine_parser_header_Privacy_actions[_acts - 1]) {
case 0:
/* line 27 "./ragel/tsip_parser_header_Privacy.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 31 "./ragel/tsip_parser_header_Privacy.jrl" */

	    tsk_ragel_parser_add_string(s_str, p, i_tag_start, hdr_privacy.as_values);
			break;
case 2:
/* line 35 "./ragel/tsip_parser_header_Privacy.jrl" */

			break;
/* line 380 "./src/headers/tsip_header_Privacy.js" */
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

/* line 77 "./ragel/tsip_parser_header_Privacy.jrl" */
	
	if( cs < 
/* line 410 "./src/headers/tsip_header_Privacy.js" */
45
/* line 78 "./ragel/tsip_parser_header_Privacy.jrl" */
 ){
		console.error("Failed to parse 'Privacy' header: %s", s_str);
		return null;
	}
	
	return hdr_privacy;
}