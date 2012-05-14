
/* line 1 "./ragel/tsip_parser_header_Record_Route.jrl" */
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

/* line 80 "./ragel/tsip_parser_header_Record_Route.jrl" */



/* line 29 "./src/headers/tsip_header_Record_Route.js" */
const _tsip_machine_parser_header_Record_Route_actions = [
	0, 1, 0, 1, 1, 1, 2, 1, 
	3, 1, 4, 1, 5, 1, 6, 2, 
	1, 0, 2, 4, 5
];

const _tsip_machine_parser_header_Record_Route_key_offsets = [
	0, 0, 2, 4, 6, 8, 10, 12, 
	13, 15, 17, 19, 21, 23, 26, 45, 
	46, 48, 67, 68, 70, 73, 77, 89, 
	92, 94, 97, 102, 103, 120, 121, 123, 
	139, 157, 163, 164, 166, 171, 190, 191, 
	193, 212, 213, 215, 218, 226, 227, 229, 
	234, 239, 240, 242, 246, 252, 269, 276, 
	284, 292, 300, 302, 309, 318, 320, 323, 
	325, 328, 330, 333, 336, 337, 340, 341, 
	344, 345, 354, 363, 371, 379, 387, 395, 
	397, 403, 412, 421, 430, 432, 435, 438, 
	439, 440, 457, 475, 479, 480, 482, 490, 
	491, 493, 497, 503
];

const _tsip_machine_parser_header_Record_Route_trans_keys = [
	82, 114, 69, 101, 67, 99, 79, 111, 
	82, 114, 68, 100, 45, 82, 114, 79, 
	111, 85, 117, 84, 116, 69, 101, 9, 
	32, 58, 9, 13, 32, 33, 34, 37, 
	39, 60, 126, 42, 43, 45, 46, 48, 
	57, 65, 90, 95, 122, 10, 9, 32, 
	9, 13, 32, 33, 34, 37, 39, 60, 
	126, 42, 43, 45, 46, 48, 57, 65, 
	90, 95, 122, 10, 9, 32, 9, 32, 
	60, 65, 90, 97, 122, 9, 32, 43, 
	58, 45, 46, 48, 57, 65, 90, 97, 
	122, 9, 32, 58, 0, 65535, 62, 0, 
	65535, 9, 13, 32, 44, 59, 10, 9, 
	13, 32, 33, 37, 39, 126, 42, 43, 
	45, 46, 48, 57, 65, 90, 95, 122, 
	10, 9, 32, 9, 32, 33, 37, 39, 
	126, 42, 43, 45, 46, 48, 57, 65, 
	90, 95, 122, 9, 13, 32, 33, 37, 
	39, 44, 59, 61, 126, 42, 46, 48, 
	57, 65, 90, 95, 122, 9, 13, 32, 
	44, 59, 61, 10, 9, 32, 9, 32, 
	44, 59, 61, 9, 13, 32, 33, 34, 
	37, 39, 91, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 10, 9, 
	32, 9, 13, 32, 33, 34, 37, 39, 
	91, 126, 42, 43, 45, 46, 48, 57, 
	65, 90, 95, 122, 10, 9, 32, 9, 
	32, 34, 9, 13, 34, 92, 32, 126, 
	128, 255, 10, 9, 32, 9, 13, 32, 
	44, 59, 9, 13, 32, 44, 59, 10, 
	9, 32, 9, 32, 44, 59, 0, 9, 
	11, 12, 14, 127, 9, 13, 32, 33, 
	37, 39, 44, 59, 126, 42, 46, 48, 
	57, 65, 90, 95, 122, 58, 48, 57, 
	65, 70, 97, 102, 58, 93, 48, 57, 
	65, 70, 97, 102, 58, 93, 48, 57, 
	65, 70, 97, 102, 58, 93, 48, 57, 
	65, 70, 97, 102, 58, 93, 58, 48, 
	57, 65, 70, 97, 102, 46, 58, 93, 
	48, 57, 65, 70, 97, 102, 48, 57, 
	46, 48, 57, 48, 57, 46, 48, 57, 
	48, 57, 93, 48, 57, 93, 48, 57, 
	93, 46, 48, 57, 46, 46, 48, 57, 
	46, 46, 58, 93, 48, 57, 65, 70, 
	97, 102, 46, 58, 93, 48, 57, 65, 
	70, 97, 102, 58, 93, 48, 57, 65, 
	70, 97, 102, 58, 93, 48, 57, 65, 
	70, 97, 102, 58, 93, 48, 57, 65, 
	70, 97, 102, 58, 93, 48, 57, 65, 
	70, 97, 102, 58, 93, 48, 57, 65, 
	70, 97, 102, 46, 58, 93, 48, 57, 
	65, 70, 97, 102, 46, 58, 93, 48, 
	57, 65, 70, 97, 102, 46, 58, 93, 
	48, 57, 65, 70, 97, 102, 48, 57, 
	46, 48, 57, 46, 48, 57, 46, 58, 
	9, 13, 32, 33, 37, 39, 126, 42, 
	43, 45, 46, 48, 57, 65, 90, 95, 
	122, 9, 13, 32, 33, 37, 39, 60, 
	126, 42, 43, 45, 46, 48, 57, 65, 
	90, 95, 122, 9, 13, 32, 60, 10, 
	9, 32, 9, 13, 34, 92, 32, 126, 
	128, 255, 10, 9, 32, 9, 13, 32, 
	60, 0, 9, 11, 12, 14, 127, 0
];

const _tsip_machine_parser_header_Record_Route_single_lengths = [
	0, 2, 2, 2, 2, 2, 2, 1, 
	2, 2, 2, 2, 2, 3, 9, 1, 
	2, 9, 1, 2, 3, 0, 4, 3, 
	0, 1, 5, 1, 7, 1, 2, 6, 
	10, 6, 1, 2, 5, 9, 1, 2, 
	9, 1, 2, 3, 4, 1, 2, 5, 
	5, 1, 2, 4, 0, 9, 1, 2, 
	2, 2, 2, 1, 3, 0, 1, 0, 
	1, 0, 1, 1, 1, 1, 1, 1, 
	1, 3, 3, 2, 2, 2, 2, 2, 
	0, 3, 3, 3, 0, 1, 1, 1, 
	1, 7, 8, 4, 1, 2, 4, 1, 
	2, 4, 0, 0
];

const _tsip_machine_parser_header_Record_Route_range_lengths = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 5, 0, 
	0, 5, 0, 0, 0, 2, 4, 0, 
	1, 1, 0, 0, 5, 0, 0, 5, 
	4, 0, 0, 0, 0, 5, 0, 0, 
	5, 0, 0, 0, 2, 0, 0, 0, 
	0, 0, 0, 0, 3, 4, 3, 3, 
	3, 3, 0, 3, 3, 1, 1, 1, 
	1, 1, 1, 1, 0, 1, 0, 1, 
	0, 3, 3, 3, 3, 3, 3, 0, 
	3, 3, 3, 3, 1, 1, 1, 0, 
	0, 5, 5, 0, 0, 0, 2, 0, 
	0, 0, 3, 0
];

const _tsip_machine_parser_header_Record_Route_index_offsets = [
	0, 0, 3, 6, 9, 12, 15, 18, 
	20, 23, 26, 29, 32, 35, 39, 54, 
	56, 59, 74, 76, 79, 83, 86, 95, 
	99, 101, 104, 110, 112, 125, 127, 130, 
	142, 157, 164, 166, 169, 175, 190, 192, 
	195, 210, 212, 215, 219, 226, 228, 231, 
	237, 243, 245, 248, 253, 257, 271, 276, 
	282, 288, 294, 297, 302, 309, 311, 314, 
	316, 319, 321, 324, 327, 329, 332, 334, 
	337, 339, 346, 353, 359, 365, 371, 377, 
	380, 384, 391, 398, 405, 407, 410, 413, 
	415, 417, 430, 444, 449, 451, 454, 461, 
	463, 466, 471, 475
];

const _tsip_machine_parser_header_Record_Route_indicies = [
	0, 0, 1, 2, 2, 1, 3, 3, 
	1, 4, 4, 1, 5, 5, 1, 6, 
	6, 1, 7, 1, 8, 8, 1, 9, 
	9, 1, 10, 10, 1, 11, 11, 1, 
	12, 12, 1, 12, 12, 13, 1, 14, 
	15, 14, 16, 17, 16, 16, 18, 16, 
	16, 16, 16, 16, 16, 1, 19, 1, 
	20, 20, 1, 21, 22, 21, 16, 17, 
	16, 16, 18, 16, 16, 16, 16, 16, 
	16, 1, 23, 1, 24, 24, 1, 24, 
	24, 25, 1, 26, 26, 1, 27, 27, 
	28, 29, 28, 28, 28, 28, 1, 27, 
	27, 29, 1, 30, 1, 31, 30, 1, 
	32, 33, 32, 34, 35, 1, 36, 1, 
	35, 37, 35, 38, 38, 38, 38, 38, 
	38, 38, 38, 38, 1, 39, 1, 40, 
	40, 1, 40, 40, 38, 38, 38, 38, 
	38, 38, 38, 38, 38, 1, 41, 42, 
	41, 43, 43, 43, 44, 45, 46, 43, 
	43, 43, 43, 43, 1, 47, 48, 47, 
	13, 35, 46, 1, 49, 1, 50, 50, 
	1, 50, 50, 13, 35, 46, 1, 46, 
	51, 46, 52, 53, 52, 52, 54, 52, 
	52, 52, 52, 52, 52, 1, 55, 1, 
	56, 56, 1, 56, 57, 56, 52, 53, 
	52, 52, 54, 52, 52, 52, 52, 52, 
	52, 1, 58, 1, 59, 59, 1, 59, 
	59, 53, 1, 53, 60, 61, 62, 53, 
	53, 1, 63, 1, 53, 53, 1, 64, 
	42, 64, 44, 45, 1, 65, 66, 65, 
	13, 35, 1, 67, 1, 68, 68, 1, 
	68, 68, 13, 35, 1, 53, 53, 53, 
	1, 64, 42, 64, 52, 52, 52, 44, 
	45, 52, 52, 52, 52, 52, 1, 70, 
	69, 69, 69, 1, 72, 61, 71, 71, 
	71, 1, 72, 61, 73, 73, 73, 1, 
	72, 61, 74, 74, 74, 1, 72, 61, 
	1, 76, 75, 69, 69, 1, 77, 72, 
	61, 78, 71, 71, 1, 79, 1, 80, 
	81, 1, 82, 1, 83, 84, 1, 85, 
	1, 61, 86, 1, 61, 87, 1, 61, 
	1, 83, 88, 1, 83, 1, 80, 89, 
	1, 80, 1, 77, 72, 61, 90, 73, 
	73, 1, 77, 72, 61, 74, 74, 74, 
	1, 92, 61, 91, 91, 91, 1, 94, 
	61, 93, 93, 93, 1, 94, 61, 95, 
	95, 95, 1, 94, 61, 96, 96, 96, 
	1, 94, 61, 1, 97, 91, 91, 1, 
	77, 94, 61, 98, 93, 93, 1, 77, 
	94, 61, 99, 95, 95, 1, 77, 94, 
	61, 96, 96, 96, 1, 100, 1, 77, 
	101, 1, 77, 102, 1, 77, 1, 76, 
	1, 103, 104, 103, 105, 105, 105, 105, 
	105, 105, 105, 105, 105, 1, 106, 107, 
	106, 105, 105, 105, 108, 105, 105, 105, 
	105, 105, 105, 1, 109, 110, 109, 25, 
	1, 111, 1, 103, 103, 1, 112, 113, 
	114, 115, 112, 112, 1, 116, 1, 112, 
	112, 1, 106, 107, 106, 108, 1, 112, 
	112, 112, 1, 1, 0
];

const _tsip_machine_parser_header_Record_Route_trans_targs = [
	2, 0, 3, 4, 5, 6, 7, 8, 
	9, 10, 11, 12, 13, 14, 14, 15, 
	89, 94, 21, 16, 17, 17, 18, 19, 
	20, 21, 22, 23, 22, 24, 25, 26, 
	26, 27, 14, 28, 99, 29, 32, 30, 
	31, 33, 27, 32, 14, 28, 37, 33, 
	34, 35, 36, 38, 53, 44, 54, 39, 
	40, 41, 42, 43, 45, 47, 52, 46, 
	48, 48, 49, 50, 51, 55, 88, 56, 
	59, 57, 58, 60, 75, 61, 73, 62, 
	63, 71, 64, 65, 69, 66, 67, 68, 
	70, 72, 74, 76, 84, 77, 80, 78, 
	79, 81, 82, 83, 85, 86, 87, 90, 
	92, 89, 91, 18, 21, 91, 18, 93, 
	94, 95, 97, 98, 96
];

const _tsip_machine_parser_header_Record_Route_trans_actions = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 3, 3, 
	15, 15, 3, 0, 0, 3, 3, 0, 
	0, 0, 1, 0, 0, 0, 0, 7, 
	11, 11, 11, 0, 13, 0, 1, 0, 
	0, 18, 18, 0, 18, 9, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	18, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 5, 5, 5, 0, 0, 0, 
	0, 0, 0, 0, 0
];

const tsip_machine_parser_header_Record_Route_start = 1;
const tsip_machine_parser_header_Record_Route_first_final = 99;
const tsip_machine_parser_header_Record_Route_error = 0;

const tsip_machine_parser_header_Record_Route_en_main = 1;


/* line 83 "./ragel/tsip_parser_header_Record_Route.jrl" */

function tsip_header_Record_Route(o_uri){
    this.__proto__.__proto__ = new tsip_header(tsip_header_type_e.Record_Route);
    this.s_display_name = null;
    this.o_uri = o_uri;
    this.toString = function(){
        if(this.o_uri){
            return tsip_uri_tostring(this.o_uri, true, true);
        }
        return null;
    }
}

// returns an array of 'Record-Route' headers
tsip_header_Record_Route.prototype.Parse = function(s_str){
    var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;
	var hdr_record_routes = new Array();
	var curr_route = null;
	
	
/* line 298 "./src/headers/tsip_header_Record_Route.js" */
{
	 cs = tsip_machine_parser_header_Record_Route_start;
} /* JSCodeGen::writeInit */

/* line 108 "./ragel/tsip_parser_header_Record_Route.jrl" */
	
/* line 305 "./src/headers/tsip_header_Record_Route.js" */
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
	_keys = _tsip_machine_parser_header_Record_Route_key_offsets[cs];
	_trans = _tsip_machine_parser_header_Record_Route_index_offsets[cs];
	_klen = _tsip_machine_parser_header_Record_Route_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsip_machine_parser_header_Record_Route_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsip_machine_parser_header_Record_Route_trans_keys[_mid]) {
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
	  _klen = _tsip_machine_parser_header_Record_Route_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsip_machine_parser_header_Record_Route_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsip_machine_parser_header_Record_Route_trans_keys[_mid+1]) {
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
	_trans = _tsip_machine_parser_header_Record_Route_indicies[_trans];
	cs = _tsip_machine_parser_header_Record_Route_trans_targs[_trans];
	if (_tsip_machine_parser_header_Record_Route_trans_actions[_trans] != 0) {
		_acts = _tsip_machine_parser_header_Record_Route_trans_actions[_trans];
		_nacts = _tsip_machine_parser_header_Record_Route_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsip_machine_parser_header_Record_Route_actions[_acts - 1]) {
case 0:
/* line 27 "./ragel/tsip_parser_header_Record_Route.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 31 "./ragel/tsip_parser_header_Record_Route.jrl" */

		if(!curr_route){
			curr_route = new tsip_header_Record_Route();
		}
			break;
case 2:
/* line 37 "./ragel/tsip_parser_header_Record_Route.jrl" */

		if(curr_route){
		    curr_route.s_display_name = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
            curr_route.s_display_name = tsk_string_unquote_2(curr_route.s_display_name);
		}
			break;
case 3:
/* line 44 "./ragel/tsip_parser_header_Record_Route.jrl" */

		if(curr_route && !curr_route.o_uri){
		    var s_uri = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			if((curr_route.o_uri = tsip_uri.prototype.Parse(s_uri)) && curr_route.s_display_name){
				curr_route.o_uri.s_display_name = tsk_strdup(curr_route.s_display_name);
			}
		}
			break;
case 4:
/* line 53 "./ragel/tsip_parser_header_Record_Route.jrl" */

		if(curr_route){
		    tsk_ragel_add_param(s_str, p, i_tag_start, curr_route.ao_params);
		}
			break;
case 5:
/* line 59 "./ragel/tsip_parser_header_Record_Route.jrl" */

	    if(curr_route){
	        hdr_record_routes.push(curr_route);
	        curr_route = null;
	    }
			break;
case 6:
/* line 66 "./ragel/tsip_parser_header_Record_Route.jrl" */

			break;
/* line 438 "./src/headers/tsip_header_Record_Route.js" */
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

/* line 109 "./ragel/tsip_parser_header_Record_Route.jrl" */
	
	if( cs < 
/* line 468 "./src/headers/tsip_header_Record_Route.js" */
99
/* line 110 "./ragel/tsip_parser_header_Record_Route.jrl" */
 ){
		console.error("Failed to parse 'Record-Route' header: %s", s_str);
		return null;
	}
	
	return hdr_record_routes;
}
