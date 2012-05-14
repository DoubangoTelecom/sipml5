
/* line 1 "./ragel/tsip_parser_header_Event.jrl" */
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

/* line 52 "./ragel/tsip_parser_header_Event.jrl" */



/* line 29 "./src/headers/tsip_header_Event.js" */
const _tsip_machine_parser_header_Event_actions = [
	0, 1, 0, 1, 1, 1, 2, 1, 
	3
];

const _tsip_machine_parser_header_Event_key_offsets = [
	0, 0, 4, 6, 8, 10, 12, 15, 
	31, 32, 34, 49, 67, 71, 72, 74, 
	77, 94, 95, 97, 113, 132, 137, 138, 
	140, 144, 163, 164, 166, 185, 186, 188, 
	191, 199, 200, 202, 206, 207, 213, 231, 
	238, 246, 254, 262, 264, 271, 280, 282, 
	285, 287, 290, 292, 295, 298, 299, 302, 
	303, 306, 307, 316, 325, 333, 341, 349, 
	357, 359, 365, 374, 383, 392, 394, 397, 
	400, 401, 402, 415
];

const _tsip_machine_parser_header_Event_trans_keys = [
	69, 79, 101, 111, 86, 118, 69, 101, 
	78, 110, 84, 116, 9, 32, 58, 9, 
	13, 32, 33, 37, 39, 45, 126, 42, 
	43, 48, 57, 65, 90, 95, 122, 10, 
	9, 32, 9, 32, 33, 37, 39, 45, 
	126, 42, 43, 48, 57, 65, 90, 95, 
	122, 9, 13, 32, 33, 37, 39, 45, 
	46, 59, 126, 42, 43, 48, 57, 65, 
	90, 95, 122, 9, 13, 32, 59, 10, 
	9, 32, 9, 32, 59, 9, 13, 32, 
	33, 37, 39, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 10, 9, 
	32, 9, 32, 33, 37, 39, 126, 42, 
	43, 45, 46, 48, 57, 65, 90, 95, 
	122, 9, 13, 32, 33, 37, 39, 59, 
	61, 126, 42, 43, 45, 46, 48, 57, 
	65, 90, 95, 122, 9, 13, 32, 59, 
	61, 10, 9, 32, 9, 32, 59, 61, 
	9, 13, 32, 33, 34, 37, 39, 91, 
	126, 42, 43, 45, 46, 48, 57, 65, 
	90, 95, 122, 10, 9, 32, 9, 13, 
	32, 33, 34, 37, 39, 91, 126, 42, 
	43, 45, 46, 48, 57, 65, 90, 95, 
	122, 10, 9, 32, 9, 32, 34, 9, 
	13, 34, 92, 32, 126, 128, 255, 10, 
	9, 32, 9, 13, 32, 59, 10, 0, 
	9, 11, 12, 14, 127, 9, 13, 32, 
	33, 37, 39, 59, 126, 42, 43, 45, 
	46, 48, 57, 65, 90, 95, 122, 58, 
	48, 57, 65, 70, 97, 102, 58, 93, 
	48, 57, 65, 70, 97, 102, 58, 93, 
	48, 57, 65, 70, 97, 102, 58, 93, 
	48, 57, 65, 70, 97, 102, 58, 93, 
	58, 48, 57, 65, 70, 97, 102, 46, 
	58, 93, 48, 57, 65, 70, 97, 102, 
	48, 57, 46, 48, 57, 48, 57, 46, 
	48, 57, 48, 57, 93, 48, 57, 93, 
	48, 57, 93, 46, 48, 57, 46, 46, 
	48, 57, 46, 46, 58, 93, 48, 57, 
	65, 70, 97, 102, 46, 58, 93, 48, 
	57, 65, 70, 97, 102, 58, 93, 48, 
	57, 65, 70, 97, 102, 58, 93, 48, 
	57, 65, 70, 97, 102, 58, 93, 48, 
	57, 65, 70, 97, 102, 58, 93, 48, 
	57, 65, 70, 97, 102, 58, 93, 48, 
	57, 65, 70, 97, 102, 46, 58, 93, 
	48, 57, 65, 70, 97, 102, 46, 58, 
	93, 48, 57, 65, 70, 97, 102, 46, 
	58, 93, 48, 57, 65, 70, 97, 102, 
	48, 57, 46, 48, 57, 46, 48, 57, 
	46, 58, 33, 37, 39, 45, 126, 42, 
	43, 48, 57, 65, 90, 95, 122, 0
];

const _tsip_machine_parser_header_Event_single_lengths = [
	0, 4, 2, 2, 2, 2, 3, 8, 
	1, 2, 7, 10, 4, 1, 2, 3, 
	7, 1, 2, 6, 9, 5, 1, 2, 
	4, 9, 1, 2, 9, 1, 2, 3, 
	4, 1, 2, 4, 1, 0, 8, 1, 
	2, 2, 2, 2, 1, 3, 0, 1, 
	0, 1, 0, 1, 1, 1, 1, 1, 
	1, 1, 3, 3, 2, 2, 2, 2, 
	2, 0, 3, 3, 3, 0, 1, 1, 
	1, 1, 5, 0
];

const _tsip_machine_parser_header_Event_range_lengths = [
	0, 0, 0, 0, 0, 0, 0, 4, 
	0, 0, 4, 4, 0, 0, 0, 0, 
	5, 0, 0, 5, 5, 0, 0, 0, 
	0, 5, 0, 0, 5, 0, 0, 0, 
	2, 0, 0, 0, 0, 3, 5, 3, 
	3, 3, 3, 0, 3, 3, 1, 1, 
	1, 1, 1, 1, 1, 0, 1, 0, 
	1, 0, 3, 3, 3, 3, 3, 3, 
	0, 3, 3, 3, 3, 1, 1, 1, 
	0, 0, 4, 0
];

const _tsip_machine_parser_header_Event_index_offsets = [
	0, 0, 5, 8, 11, 14, 17, 21, 
	34, 36, 39, 51, 66, 71, 73, 76, 
	80, 93, 95, 98, 110, 125, 131, 133, 
	136, 141, 156, 158, 161, 176, 178, 181, 
	185, 192, 194, 197, 202, 204, 208, 222, 
	227, 233, 239, 245, 248, 253, 260, 262, 
	265, 267, 270, 272, 275, 278, 280, 283, 
	285, 288, 290, 297, 304, 310, 316, 322, 
	328, 331, 335, 342, 349, 356, 358, 361, 
	364, 366, 368, 378
];

const _tsip_machine_parser_header_Event_indicies = [
	0, 2, 0, 2, 1, 3, 3, 1, 
	4, 4, 1, 5, 5, 1, 2, 2, 
	1, 2, 2, 6, 1, 6, 7, 6, 
	8, 8, 8, 8, 8, 8, 8, 8, 
	8, 1, 9, 1, 10, 10, 1, 10, 
	10, 8, 8, 8, 8, 8, 8, 8, 
	8, 8, 1, 11, 12, 11, 13, 13, 
	13, 13, 14, 15, 13, 13, 13, 13, 
	13, 1, 16, 17, 16, 18, 1, 19, 
	1, 20, 20, 1, 20, 20, 18, 1, 
	18, 21, 18, 22, 22, 22, 22, 22, 
	22, 22, 22, 22, 1, 23, 1, 24, 
	24, 1, 24, 24, 22, 22, 22, 22, 
	22, 22, 22, 22, 22, 1, 25, 26, 
	25, 27, 27, 27, 28, 29, 27, 27, 
	27, 27, 27, 27, 1, 30, 31, 30, 
	18, 29, 1, 32, 1, 33, 33, 1, 
	33, 33, 18, 29, 1, 29, 34, 29, 
	35, 36, 35, 35, 37, 35, 35, 35, 
	35, 35, 35, 1, 38, 1, 39, 39, 
	1, 39, 40, 39, 35, 36, 35, 35, 
	37, 35, 35, 35, 35, 35, 35, 1, 
	41, 1, 42, 42, 1, 42, 42, 36, 
	1, 36, 43, 44, 45, 36, 36, 1, 
	46, 1, 36, 36, 1, 47, 26, 47, 
	28, 1, 48, 1, 36, 36, 36, 1, 
	47, 26, 47, 35, 35, 35, 28, 35, 
	35, 35, 35, 35, 35, 1, 50, 49, 
	49, 49, 1, 52, 44, 51, 51, 51, 
	1, 52, 44, 53, 53, 53, 1, 52, 
	44, 54, 54, 54, 1, 52, 44, 1, 
	56, 55, 49, 49, 1, 57, 52, 44, 
	58, 51, 51, 1, 59, 1, 60, 61, 
	1, 62, 1, 63, 64, 1, 65, 1, 
	44, 66, 1, 44, 67, 1, 44, 1, 
	63, 68, 1, 63, 1, 60, 69, 1, 
	60, 1, 57, 52, 44, 70, 53, 53, 
	1, 57, 52, 44, 54, 54, 54, 1, 
	72, 44, 71, 71, 71, 1, 74, 44, 
	73, 73, 73, 1, 74, 44, 75, 75, 
	75, 1, 74, 44, 76, 76, 76, 1, 
	74, 44, 1, 77, 71, 71, 1, 57, 
	74, 44, 78, 73, 73, 1, 57, 74, 
	44, 79, 75, 75, 1, 57, 74, 44, 
	76, 76, 76, 1, 80, 1, 57, 81, 
	1, 57, 82, 1, 57, 1, 56, 1, 
	13, 13, 13, 13, 13, 13, 13, 13, 
	13, 1, 1, 0
];

const _tsip_machine_parser_header_Event_trans_targs = [
	2, 0, 6, 3, 4, 5, 7, 8, 
	11, 9, 10, 12, 36, 11, 74, 16, 
	12, 13, 16, 14, 15, 17, 20, 18, 
	19, 21, 36, 20, 16, 25, 21, 22, 
	23, 24, 26, 38, 32, 39, 27, 28, 
	29, 30, 31, 33, 35, 37, 34, 12, 
	75, 40, 73, 41, 44, 42, 43, 45, 
	60, 46, 58, 47, 48, 56, 49, 50, 
	54, 51, 52, 53, 55, 57, 59, 61, 
	69, 62, 65, 63, 64, 66, 67, 68, 
	70, 71, 72
];

const _tsip_machine_parser_header_Event_trans_actions = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	1, 0, 0, 3, 3, 0, 0, 3, 
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

const tsip_machine_parser_header_Event_start = 1;
const tsip_machine_parser_header_Event_first_final = 75;
const tsip_machine_parser_header_Event_error = 0;

const tsip_machine_parser_header_Event_en_main = 1;


/* line 55 "./ragel/tsip_parser_header_Event.jrl" */

function tsip_header_Event(s_package){
    this.__proto__.__proto__ = new tsip_header(tsip_header_type_e.Event);
    this.s_package = s_package;
    this.toString = function(){
        return this.s_package;
    };
}

tsip_header_Event.prototype.Parse = function(s_str){
    var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;	
	var hdr_event = new tsip_header_Event(null);
	
	
/* line 248 "./src/headers/tsip_header_Event.js" */
{
	 cs = tsip_machine_parser_header_Event_start;
} /* JSCodeGen::writeInit */

/* line 74 "./ragel/tsip_parser_header_Event.jrl" */
	
/* line 255 "./src/headers/tsip_header_Event.js" */
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
	_keys = _tsip_machine_parser_header_Event_key_offsets[cs];
	_trans = _tsip_machine_parser_header_Event_index_offsets[cs];
	_klen = _tsip_machine_parser_header_Event_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsip_machine_parser_header_Event_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsip_machine_parser_header_Event_trans_keys[_mid]) {
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
	  _klen = _tsip_machine_parser_header_Event_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsip_machine_parser_header_Event_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsip_machine_parser_header_Event_trans_keys[_mid+1]) {
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
	_trans = _tsip_machine_parser_header_Event_indicies[_trans];
	cs = _tsip_machine_parser_header_Event_trans_targs[_trans];
	if (_tsip_machine_parser_header_Event_trans_actions[_trans] != 0) {
		_acts = _tsip_machine_parser_header_Event_trans_actions[_trans];
		_nacts = _tsip_machine_parser_header_Event_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsip_machine_parser_header_Event_actions[_acts - 1]) {
case 0:
/* line 27 "./ragel/tsip_parser_header_Event.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 31 "./ragel/tsip_parser_header_Event.jrl" */

		hdr_event.s_package= tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			break;
case 2:
/* line 35 "./ragel/tsip_parser_header_Event.jrl" */

	    tsk_ragel_add_param(s_str, p, i_tag_start, hdr_event.ao_params);
			break;
case 3:
/* line 39 "./ragel/tsip_parser_header_Event.jrl" */

			break;
/* line 358 "./src/headers/tsip_header_Event.js" */
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

/* line 75 "./ragel/tsip_parser_header_Event.jrl" */
	
	if( cs < 
/* line 388 "./src/headers/tsip_header_Event.js" */
75
/* line 76 "./ragel/tsip_parser_header_Event.jrl" */
 ){
		console.error("Failed to parse 'Event' header: %s", s_str);
		return null;
	}
	
	return hdr_event;
}