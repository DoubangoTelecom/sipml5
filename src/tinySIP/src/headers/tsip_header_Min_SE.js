
/* line 1 "./ragel/tsip_parser_header_Min_SE.jrl" */
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
var TSIP_SESSION_EXPIRES_MIN_VALUE = 90;


/* line 49 "./ragel/tsip_parser_header_Min_SE.jrl" */



/* line 31 "./src/headers/tsip_header_Min_SE.js" */
const _tsip_machine_parser_header_Min_SE_actions = [
	0, 1, 0, 1, 1, 1, 2, 1, 
	3
];

const _tsip_machine_parser_header_Min_SE_key_offsets = [
	0, 0, 2, 4, 6, 7, 9, 11, 
	14, 19, 20, 22, 26, 32, 36, 37, 
	39, 42, 59, 60, 62, 78, 97, 102, 
	103, 105, 109, 128, 129, 131, 150, 151, 
	153, 156, 164, 165, 167, 171, 172, 178, 
	196, 203, 211, 219, 227, 229, 236, 245, 
	247, 250, 252, 255, 257, 260, 263, 264, 
	267, 268, 271, 272, 281, 290, 298, 306, 
	314, 322, 324, 330, 339, 348, 357, 359, 
	362, 365, 366, 367
];

const _tsip_machine_parser_header_Min_SE_trans_keys = [
	77, 109, 73, 105, 78, 110, 45, 83, 
	115, 69, 101, 9, 32, 58, 9, 13, 
	32, 48, 57, 10, 9, 32, 9, 32, 
	48, 57, 9, 13, 32, 59, 48, 57, 
	9, 13, 32, 59, 10, 9, 32, 9, 
	32, 59, 9, 13, 32, 33, 37, 39, 
	126, 42, 43, 45, 46, 48, 57, 65, 
	90, 95, 122, 10, 9, 32, 9, 32, 
	33, 37, 39, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 9, 13, 
	32, 33, 37, 39, 59, 61, 126, 42, 
	43, 45, 46, 48, 57, 65, 90, 95, 
	122, 9, 13, 32, 59, 61, 10, 9, 
	32, 9, 32, 59, 61, 9, 13, 32, 
	33, 34, 37, 39, 91, 126, 42, 43, 
	45, 46, 48, 57, 65, 90, 95, 122, 
	10, 9, 32, 9, 13, 32, 33, 34, 
	37, 39, 91, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 10, 9, 
	32, 9, 32, 34, 9, 13, 34, 92, 
	32, 126, 128, 255, 10, 9, 32, 9, 
	13, 32, 59, 10, 0, 9, 11, 12, 
	14, 127, 9, 13, 32, 33, 37, 39, 
	59, 126, 42, 43, 45, 46, 48, 57, 
	65, 90, 95, 122, 58, 48, 57, 65, 
	70, 97, 102, 58, 93, 48, 57, 65, 
	70, 97, 102, 58, 93, 48, 57, 65, 
	70, 97, 102, 58, 93, 48, 57, 65, 
	70, 97, 102, 58, 93, 58, 48, 57, 
	65, 70, 97, 102, 46, 58, 93, 48, 
	57, 65, 70, 97, 102, 48, 57, 46, 
	48, 57, 48, 57, 46, 48, 57, 48, 
	57, 93, 48, 57, 93, 48, 57, 93, 
	46, 48, 57, 46, 46, 48, 57, 46, 
	46, 58, 93, 48, 57, 65, 70, 97, 
	102, 46, 58, 93, 48, 57, 65, 70, 
	97, 102, 58, 93, 48, 57, 65, 70, 
	97, 102, 58, 93, 48, 57, 65, 70, 
	97, 102, 58, 93, 48, 57, 65, 70, 
	97, 102, 58, 93, 48, 57, 65, 70, 
	97, 102, 58, 93, 48, 57, 65, 70, 
	97, 102, 46, 58, 93, 48, 57, 65, 
	70, 97, 102, 46, 58, 93, 48, 57, 
	65, 70, 97, 102, 46, 58, 93, 48, 
	57, 65, 70, 97, 102, 48, 57, 46, 
	48, 57, 46, 48, 57, 46, 58, 0
];

const _tsip_machine_parser_header_Min_SE_single_lengths = [
	0, 2, 2, 2, 1, 2, 2, 3, 
	3, 1, 2, 2, 4, 4, 1, 2, 
	3, 7, 1, 2, 6, 9, 5, 1, 
	2, 4, 9, 1, 2, 9, 1, 2, 
	3, 4, 1, 2, 4, 1, 0, 8, 
	1, 2, 2, 2, 2, 1, 3, 0, 
	1, 0, 1, 0, 1, 1, 1, 1, 
	1, 1, 1, 3, 3, 2, 2, 2, 
	2, 2, 0, 3, 3, 3, 0, 1, 
	1, 1, 1, 0
];

const _tsip_machine_parser_header_Min_SE_range_lengths = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	1, 0, 0, 1, 1, 0, 0, 0, 
	0, 5, 0, 0, 5, 5, 0, 0, 
	0, 0, 5, 0, 0, 5, 0, 0, 
	0, 2, 0, 0, 0, 0, 3, 5, 
	3, 3, 3, 3, 0, 3, 3, 1, 
	1, 1, 1, 1, 1, 1, 0, 1, 
	0, 1, 0, 3, 3, 3, 3, 3, 
	3, 0, 3, 3, 3, 3, 1, 1, 
	1, 0, 0, 0
];

const _tsip_machine_parser_header_Min_SE_index_offsets = [
	0, 0, 3, 6, 9, 11, 14, 17, 
	21, 26, 28, 31, 35, 41, 46, 48, 
	51, 55, 68, 70, 73, 85, 100, 106, 
	108, 111, 116, 131, 133, 136, 151, 153, 
	156, 160, 167, 169, 172, 177, 179, 183, 
	197, 202, 208, 214, 220, 223, 228, 235, 
	237, 240, 242, 245, 247, 250, 253, 255, 
	258, 260, 263, 265, 272, 279, 285, 291, 
	297, 303, 306, 310, 317, 324, 331, 333, 
	336, 339, 341, 343
];

const _tsip_machine_parser_header_Min_SE_indicies = [
	0, 0, 1, 2, 2, 1, 3, 3, 
	1, 4, 1, 5, 5, 1, 6, 6, 
	1, 6, 6, 7, 1, 7, 8, 7, 
	9, 1, 10, 1, 11, 11, 1, 11, 
	11, 9, 1, 12, 13, 12, 15, 14, 
	1, 16, 17, 16, 18, 1, 19, 1, 
	20, 20, 1, 20, 20, 18, 1, 18, 
	21, 18, 22, 22, 22, 22, 22, 22, 
	22, 22, 22, 1, 23, 1, 24, 24, 
	1, 24, 24, 22, 22, 22, 22, 22, 
	22, 22, 22, 22, 1, 25, 26, 25, 
	27, 27, 27, 28, 29, 27, 27, 27, 
	27, 27, 27, 1, 30, 31, 30, 18, 
	29, 1, 32, 1, 33, 33, 1, 33, 
	33, 18, 29, 1, 29, 34, 29, 35, 
	36, 35, 35, 37, 35, 35, 35, 35, 
	35, 35, 1, 38, 1, 39, 39, 1, 
	39, 40, 39, 35, 36, 35, 35, 37, 
	35, 35, 35, 35, 35, 35, 1, 41, 
	1, 42, 42, 1, 42, 42, 36, 1, 
	36, 43, 44, 45, 36, 36, 1, 46, 
	1, 36, 36, 1, 47, 26, 47, 28, 
	1, 48, 1, 36, 36, 36, 1, 47, 
	26, 47, 35, 35, 35, 28, 35, 35, 
	35, 35, 35, 35, 1, 50, 49, 49, 
	49, 1, 52, 44, 51, 51, 51, 1, 
	52, 44, 53, 53, 53, 1, 52, 44, 
	54, 54, 54, 1, 52, 44, 1, 56, 
	55, 49, 49, 1, 57, 52, 44, 58, 
	51, 51, 1, 59, 1, 60, 61, 1, 
	62, 1, 63, 64, 1, 65, 1, 44, 
	66, 1, 44, 67, 1, 44, 1, 63, 
	68, 1, 63, 1, 60, 69, 1, 60, 
	1, 57, 52, 44, 70, 53, 53, 1, 
	57, 52, 44, 54, 54, 54, 1, 72, 
	44, 71, 71, 71, 1, 74, 44, 73, 
	73, 73, 1, 74, 44, 75, 75, 75, 
	1, 74, 44, 76, 76, 76, 1, 74, 
	44, 1, 77, 71, 71, 1, 57, 74, 
	44, 78, 73, 73, 1, 57, 74, 44, 
	79, 75, 75, 1, 57, 74, 44, 76, 
	76, 76, 1, 80, 1, 57, 81, 1, 
	57, 82, 1, 57, 1, 56, 1, 1, 
	0
];

const _tsip_machine_parser_header_Min_SE_trans_targs = [
	2, 0, 3, 4, 5, 6, 7, 8, 
	9, 12, 10, 11, 13, 37, 12, 17, 
	13, 14, 17, 15, 16, 18, 21, 19, 
	20, 22, 37, 21, 17, 26, 22, 23, 
	24, 25, 27, 39, 33, 40, 28, 29, 
	30, 31, 32, 34, 36, 38, 35, 13, 
	75, 41, 74, 42, 45, 43, 44, 46, 
	61, 47, 59, 48, 49, 57, 50, 51, 
	55, 52, 53, 54, 56, 58, 60, 62, 
	70, 63, 66, 64, 65, 67, 68, 69, 
	71, 72, 73
];

const _tsip_machine_parser_header_Min_SE_trans_actions = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 1, 0, 0, 3, 3, 0, 3, 
	0, 0, 0, 0, 0, 0, 1, 0, 
	0, 5, 5, 0, 5, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 5, 
	7, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0
];

const tsip_machine_parser_header_Min_SE_start = 1;
const tsip_machine_parser_header_Min_SE_first_final = 75;
const tsip_machine_parser_header_Min_SE_error = 0;

const tsip_machine_parser_header_Min_SE_en_main = 1;


/* line 52 "./ragel/tsip_parser_header_Min_SE.jrl" */

function tsip_header_Min_SE(i_delta_seconds){
    this.__proto__.__proto__ = new tsip_header(tsip_header_type_e.Min_SE);
    this.i_delta_seconds = i_delta_seconds;
    this.toString = function(){
        if(this.i_delta_seconds >= 0){
            return this.i_delta_seconds.toString();
        }
        return null;
    };
}

tsip_header_Min_SE.prototype.Parse = function(s_str){
    var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;
	var hdr_minse = new tsip_header_Min_SE(TSIP_HEADER_MIN_EXPIRES_NONE);
	
	
/* line 243 "./src/headers/tsip_header_Min_SE.js" */
{
	 cs = tsip_machine_parser_header_Min_SE_start;
} /* JSCodeGen::writeInit */

/* line 74 "./ragel/tsip_parser_header_Min_SE.jrl" */
	
/* line 250 "./src/headers/tsip_header_Min_SE.js" */
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
	_keys = _tsip_machine_parser_header_Min_SE_key_offsets[cs];
	_trans = _tsip_machine_parser_header_Min_SE_index_offsets[cs];
	_klen = _tsip_machine_parser_header_Min_SE_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsip_machine_parser_header_Min_SE_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsip_machine_parser_header_Min_SE_trans_keys[_mid]) {
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
	  _klen = _tsip_machine_parser_header_Min_SE_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsip_machine_parser_header_Min_SE_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsip_machine_parser_header_Min_SE_trans_keys[_mid+1]) {
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
	_trans = _tsip_machine_parser_header_Min_SE_indicies[_trans];
	cs = _tsip_machine_parser_header_Min_SE_trans_targs[_trans];
	if (_tsip_machine_parser_header_Min_SE_trans_actions[_trans] != 0) {
		_acts = _tsip_machine_parser_header_Min_SE_trans_actions[_trans];
		_nacts = _tsip_machine_parser_header_Min_SE_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsip_machine_parser_header_Min_SE_actions[_acts - 1]) {
case 0:
/* line 29 "./ragel/tsip_parser_header_Min_SE.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 33 "./ragel/tsip_parser_header_Min_SE.jrl" */

	    hdr_minse.i_delta_seconds = tsk_ragel_parser_get_int(s_str, p, i_tag_start);
			break;
case 2:
/* line 37 "./ragel/tsip_parser_header_Min_SE.jrl" */

	    tsk_ragel_add_param(s_str, p, i_tag_start, hdr_minse.ao_params);
			break;
case 3:
/* line 41 "./ragel/tsip_parser_header_Min_SE.jrl" */

			break;
/* line 353 "./src/headers/tsip_header_Min_SE.js" */
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

/* line 75 "./ragel/tsip_parser_header_Min_SE.jrl" */
	
	if( cs < 
/* line 383 "./src/headers/tsip_header_Min_SE.js" */
75
/* line 76 "./ragel/tsip_parser_header_Min_SE.jrl" */
 ){
		console.error("Failed to parse 'Min-SE' header: %s", s_str);
		return null;
	}
	
	return hdr_minse;
}