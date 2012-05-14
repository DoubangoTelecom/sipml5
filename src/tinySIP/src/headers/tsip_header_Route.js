
/* line 1 "./ragel/tsip_parser_header_Route.jrl" */
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

/* line 85 "./ragel/tsip_parser_header_Route.jrl" */



/* line 29 "./src/headers/tsip_header_Route.js" */
const _tsip_machine_parser_header_Route_actions = [
	0, 1, 0, 1, 1, 1, 2, 1, 
	3, 1, 4, 1, 5, 1, 6, 2, 
	1, 0, 2, 4, 5
];

const _tsip_machine_parser_header_Route_key_offsets = [
	0, 0, 2, 4, 6, 8, 10, 13, 
	32, 33, 35, 54, 55, 57, 60, 64, 
	76, 79, 81, 84, 89, 90, 107, 108, 
	110, 126, 144, 150, 151, 153, 158, 177, 
	178, 180, 199, 200, 202, 205, 213, 214, 
	216, 221, 226, 227, 229, 233, 239, 256, 
	263, 271, 279, 287, 289, 296, 305, 307, 
	310, 312, 315, 317, 320, 323, 324, 327, 
	328, 331, 332, 341, 350, 358, 366, 374, 
	382, 384, 390, 399, 408, 417, 419, 422, 
	425, 426, 427, 444, 462, 466, 467, 469, 
	477, 478, 480, 484, 490
];

const _tsip_machine_parser_header_Route_trans_keys = [
	82, 114, 79, 111, 85, 117, 84, 116, 
	69, 101, 9, 32, 58, 9, 13, 32, 
	33, 34, 37, 39, 60, 126, 42, 43, 
	45, 46, 48, 57, 65, 90, 95, 122, 
	10, 9, 32, 9, 13, 32, 33, 34, 
	37, 39, 60, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 10, 9, 
	32, 9, 32, 60, 65, 90, 97, 122, 
	9, 32, 43, 58, 45, 46, 48, 57, 
	65, 90, 97, 122, 9, 32, 58, 0, 
	65535, 62, 0, 65535, 9, 13, 32, 44, 
	59, 10, 9, 13, 32, 33, 37, 39, 
	126, 42, 43, 45, 46, 48, 57, 65, 
	90, 95, 122, 10, 9, 32, 9, 32, 
	33, 37, 39, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 9, 13, 
	32, 33, 37, 39, 44, 59, 61, 126, 
	42, 46, 48, 57, 65, 90, 95, 122, 
	9, 13, 32, 44, 59, 61, 10, 9, 
	32, 9, 32, 44, 59, 61, 9, 13, 
	32, 33, 34, 37, 39, 91, 126, 42, 
	43, 45, 46, 48, 57, 65, 90, 95, 
	122, 10, 9, 32, 9, 13, 32, 33, 
	34, 37, 39, 91, 126, 42, 43, 45, 
	46, 48, 57, 65, 90, 95, 122, 10, 
	9, 32, 9, 32, 34, 9, 13, 34, 
	92, 32, 126, 128, 255, 10, 9, 32, 
	9, 13, 32, 44, 59, 9, 13, 32, 
	44, 59, 10, 9, 32, 9, 32, 44, 
	59, 0, 9, 11, 12, 14, 127, 9, 
	13, 32, 33, 37, 39, 44, 59, 126, 
	42, 46, 48, 57, 65, 90, 95, 122, 
	58, 48, 57, 65, 70, 97, 102, 58, 
	93, 48, 57, 65, 70, 97, 102, 58, 
	93, 48, 57, 65, 70, 97, 102, 58, 
	93, 48, 57, 65, 70, 97, 102, 58, 
	93, 58, 48, 57, 65, 70, 97, 102, 
	46, 58, 93, 48, 57, 65, 70, 97, 
	102, 48, 57, 46, 48, 57, 48, 57, 
	46, 48, 57, 48, 57, 93, 48, 57, 
	93, 48, 57, 93, 46, 48, 57, 46, 
	46, 48, 57, 46, 46, 58, 93, 48, 
	57, 65, 70, 97, 102, 46, 58, 93, 
	48, 57, 65, 70, 97, 102, 58, 93, 
	48, 57, 65, 70, 97, 102, 58, 93, 
	48, 57, 65, 70, 97, 102, 58, 93, 
	48, 57, 65, 70, 97, 102, 58, 93, 
	48, 57, 65, 70, 97, 102, 58, 93, 
	48, 57, 65, 70, 97, 102, 46, 58, 
	93, 48, 57, 65, 70, 97, 102, 46, 
	58, 93, 48, 57, 65, 70, 97, 102, 
	46, 58, 93, 48, 57, 65, 70, 97, 
	102, 48, 57, 46, 48, 57, 46, 48, 
	57, 46, 58, 9, 13, 32, 33, 37, 
	39, 126, 42, 43, 45, 46, 48, 57, 
	65, 90, 95, 122, 9, 13, 32, 33, 
	37, 39, 60, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 9, 13, 
	32, 60, 10, 9, 32, 9, 13, 34, 
	92, 32, 126, 128, 255, 10, 9, 32, 
	9, 13, 32, 60, 0, 9, 11, 12, 
	14, 127, 0
];

const _tsip_machine_parser_header_Route_single_lengths = [
	0, 2, 2, 2, 2, 2, 3, 9, 
	1, 2, 9, 1, 2, 3, 0, 4, 
	3, 0, 1, 5, 1, 7, 1, 2, 
	6, 10, 6, 1, 2, 5, 9, 1, 
	2, 9, 1, 2, 3, 4, 1, 2, 
	5, 5, 1, 2, 4, 0, 9, 1, 
	2, 2, 2, 2, 1, 3, 0, 1, 
	0, 1, 0, 1, 1, 1, 1, 1, 
	1, 1, 3, 3, 2, 2, 2, 2, 
	2, 0, 3, 3, 3, 0, 1, 1, 
	1, 1, 7, 8, 4, 1, 2, 4, 
	1, 2, 4, 0, 0
];

const _tsip_machine_parser_header_Route_range_lengths = [
	0, 0, 0, 0, 0, 0, 0, 5, 
	0, 0, 5, 0, 0, 0, 2, 4, 
	0, 1, 1, 0, 0, 5, 0, 0, 
	5, 4, 0, 0, 0, 0, 5, 0, 
	0, 5, 0, 0, 0, 2, 0, 0, 
	0, 0, 0, 0, 0, 3, 4, 3, 
	3, 3, 3, 0, 3, 3, 1, 1, 
	1, 1, 1, 1, 1, 0, 1, 0, 
	1, 0, 3, 3, 3, 3, 3, 3, 
	0, 3, 3, 3, 3, 1, 1, 1, 
	0, 0, 5, 5, 0, 0, 0, 2, 
	0, 0, 0, 3, 0
];

const _tsip_machine_parser_header_Route_index_offsets = [
	0, 0, 3, 6, 9, 12, 15, 19, 
	34, 36, 39, 54, 56, 59, 63, 66, 
	75, 79, 81, 84, 90, 92, 105, 107, 
	110, 122, 137, 144, 146, 149, 155, 170, 
	172, 175, 190, 192, 195, 199, 206, 208, 
	211, 217, 223, 225, 228, 233, 237, 251, 
	256, 262, 268, 274, 277, 282, 289, 291, 
	294, 296, 299, 301, 304, 307, 309, 312, 
	314, 317, 319, 326, 333, 339, 345, 351, 
	357, 360, 364, 371, 378, 385, 387, 390, 
	393, 395, 397, 410, 424, 429, 431, 434, 
	441, 443, 446, 451, 455
];

const _tsip_machine_parser_header_Route_indicies = [
	0, 0, 1, 2, 2, 1, 3, 3, 
	1, 4, 4, 1, 5, 5, 1, 5, 
	5, 6, 1, 7, 8, 7, 9, 10, 
	9, 9, 11, 9, 9, 9, 9, 9, 
	9, 1, 12, 1, 13, 13, 1, 14, 
	15, 14, 9, 10, 9, 9, 11, 9, 
	9, 9, 9, 9, 9, 1, 16, 1, 
	17, 17, 1, 17, 17, 18, 1, 19, 
	19, 1, 20, 20, 21, 22, 21, 21, 
	21, 21, 1, 20, 20, 22, 1, 23, 
	1, 24, 23, 1, 25, 26, 25, 27, 
	28, 1, 29, 1, 28, 30, 28, 31, 
	31, 31, 31, 31, 31, 31, 31, 31, 
	1, 32, 1, 33, 33, 1, 33, 33, 
	31, 31, 31, 31, 31, 31, 31, 31, 
	31, 1, 34, 35, 34, 36, 36, 36, 
	37, 38, 39, 36, 36, 36, 36, 36, 
	1, 40, 41, 40, 6, 28, 39, 1, 
	42, 1, 43, 43, 1, 43, 43, 6, 
	28, 39, 1, 39, 44, 39, 45, 46, 
	45, 45, 47, 45, 45, 45, 45, 45, 
	45, 1, 48, 1, 49, 49, 1, 49, 
	50, 49, 45, 46, 45, 45, 47, 45, 
	45, 45, 45, 45, 45, 1, 51, 1, 
	52, 52, 1, 52, 52, 46, 1, 46, 
	53, 54, 55, 46, 46, 1, 56, 1, 
	46, 46, 1, 57, 35, 57, 37, 38, 
	1, 58, 59, 58, 6, 28, 1, 60, 
	1, 61, 61, 1, 61, 61, 6, 28, 
	1, 46, 46, 46, 1, 57, 35, 57, 
	45, 45, 45, 37, 38, 45, 45, 45, 
	45, 45, 1, 63, 62, 62, 62, 1, 
	65, 54, 64, 64, 64, 1, 65, 54, 
	66, 66, 66, 1, 65, 54, 67, 67, 
	67, 1, 65, 54, 1, 69, 68, 62, 
	62, 1, 70, 65, 54, 71, 64, 64, 
	1, 72, 1, 73, 74, 1, 75, 1, 
	76, 77, 1, 78, 1, 54, 79, 1, 
	54, 80, 1, 54, 1, 76, 81, 1, 
	76, 1, 73, 82, 1, 73, 1, 70, 
	65, 54, 83, 66, 66, 1, 70, 65, 
	54, 67, 67, 67, 1, 85, 54, 84, 
	84, 84, 1, 87, 54, 86, 86, 86, 
	1, 87, 54, 88, 88, 88, 1, 87, 
	54, 89, 89, 89, 1, 87, 54, 1, 
	90, 84, 84, 1, 70, 87, 54, 91, 
	86, 86, 1, 70, 87, 54, 92, 88, 
	88, 1, 70, 87, 54, 89, 89, 89, 
	1, 93, 1, 70, 94, 1, 70, 95, 
	1, 70, 1, 69, 1, 96, 97, 96, 
	98, 98, 98, 98, 98, 98, 98, 98, 
	98, 1, 99, 100, 99, 98, 98, 98, 
	101, 98, 98, 98, 98, 98, 98, 1, 
	102, 103, 102, 18, 1, 104, 1, 96, 
	96, 1, 105, 106, 107, 108, 105, 105, 
	1, 109, 1, 105, 105, 1, 99, 100, 
	99, 101, 1, 105, 105, 105, 1, 1, 
	0
];

const _tsip_machine_parser_header_Route_trans_targs = [
	2, 0, 3, 4, 5, 6, 7, 7, 
	8, 82, 87, 14, 9, 10, 10, 11, 
	12, 13, 14, 15, 16, 15, 17, 18, 
	19, 19, 20, 7, 21, 92, 22, 25, 
	23, 24, 26, 20, 25, 7, 21, 30, 
	26, 27, 28, 29, 31, 46, 37, 47, 
	32, 33, 34, 35, 36, 38, 40, 45, 
	39, 41, 41, 42, 43, 44, 48, 81, 
	49, 52, 50, 51, 53, 68, 54, 66, 
	55, 56, 64, 57, 58, 62, 59, 60, 
	61, 63, 65, 67, 69, 77, 70, 73, 
	71, 72, 74, 75, 76, 78, 79, 80, 
	83, 85, 82, 84, 11, 14, 84, 11, 
	86, 87, 88, 90, 91, 89
];

const _tsip_machine_parser_header_Route_trans_actions = [
	0, 0, 0, 0, 0, 0, 0, 3, 
	3, 15, 15, 3, 0, 0, 3, 3, 
	0, 0, 0, 1, 0, 0, 0, 0, 
	7, 11, 11, 11, 0, 13, 0, 1, 
	0, 0, 18, 18, 0, 18, 9, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 18, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 5, 5, 5, 0, 0, 
	0, 0, 0, 0, 0, 0
];

const tsip_machine_parser_header_Route_start = 1;
const tsip_machine_parser_header_Route_first_final = 92;
const tsip_machine_parser_header_Route_error = 0;

const tsip_machine_parser_header_Route_en_main = 1;


/* line 88 "./ragel/tsip_parser_header_Route.jrl" */

function tsip_header_Route(o_uri){
    this.__proto__.__proto__ = new tsip_header(tsip_header_type_e.Route);
    this.s_display_name = null;
    this.o_uri = o_uri;
    this.toString = function(){
        if(this.o_uri){
            return tsip_uri_tostring(this.o_uri, true, true);
        }
        return null;
    }
}

// returns an array of 'Route' headers
tsip_header_Route.prototype.Parse = function(s_str){
    var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;
	var hdr_routes = new Array();
	var curr_route = null;
	
	
/* line 289 "./src/headers/tsip_header_Route.js" */
{
	 cs = tsip_machine_parser_header_Route_start;
} /* JSCodeGen::writeInit */

/* line 113 "./ragel/tsip_parser_header_Route.jrl" */
	
/* line 296 "./src/headers/tsip_header_Route.js" */
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
	_keys = _tsip_machine_parser_header_Route_key_offsets[cs];
	_trans = _tsip_machine_parser_header_Route_index_offsets[cs];
	_klen = _tsip_machine_parser_header_Route_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsip_machine_parser_header_Route_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsip_machine_parser_header_Route_trans_keys[_mid]) {
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
	  _klen = _tsip_machine_parser_header_Route_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsip_machine_parser_header_Route_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsip_machine_parser_header_Route_trans_keys[_mid+1]) {
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
	_trans = _tsip_machine_parser_header_Route_indicies[_trans];
	cs = _tsip_machine_parser_header_Route_trans_targs[_trans];
	if (_tsip_machine_parser_header_Route_trans_actions[_trans] != 0) {
		_acts = _tsip_machine_parser_header_Route_trans_actions[_trans];
		_nacts = _tsip_machine_parser_header_Route_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsip_machine_parser_header_Route_actions[_acts - 1]) {
case 0:
/* line 27 "./ragel/tsip_parser_header_Route.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 31 "./ragel/tsip_parser_header_Route.jrl" */

		if(!curr_route){
			curr_route = new tsip_header_Route(null);
		}
			break;
case 2:
/* line 37 "./ragel/tsip_parser_header_Route.jrl" */

		if(curr_route){
		    curr_route.s_display_name = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
            curr_route.s_display_name = tsk_string_unquote_2(curr_route.s_display_name);
		}
			break;
case 3:
/* line 44 "./ragel/tsip_parser_header_Route.jrl" */

	    if(curr_route && !curr_route.o_uri){
		    var s_uri = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			if((curr_route.o_uri = tsip_uri.prototype.Parse(s_uri)) && curr_route.s_display_name){
				curr_route.o_uri.s_display_name = tsk_strdup(curr_route.s_display_name);
			}
		}
			break;
case 4:
/* line 53 "./ragel/tsip_parser_header_Route.jrl" */

		if(curr_route){
		    tsk_ragel_add_param(s_str, p, i_tag_start, curr_route.ao_params);
		}
			break;
case 5:
/* line 59 "./ragel/tsip_parser_header_Route.jrl" */

	     if(curr_route){
	        hdr_routes.push(curr_route);
	        curr_route = null;
	    }
			break;
case 6:
/* line 66 "./ragel/tsip_parser_header_Route.jrl" */

			break;
/* line 429 "./src/headers/tsip_header_Route.js" */
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

/* line 114 "./ragel/tsip_parser_header_Route.jrl" */
	
	if( cs < 
/* line 459 "./src/headers/tsip_header_Route.js" */
92
/* line 115 "./ragel/tsip_parser_header_Route.jrl" */
 ){
		console.error("Failed to parse 'Route' header: %s", s_str);
		return null;
	}
	
	return hdr_routes;
}