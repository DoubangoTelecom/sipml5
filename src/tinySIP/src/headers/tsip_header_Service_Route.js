
/* line 1 "./ragel/tsip_parser_header_Service_Route.jrl" */
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

/* line 82 "./ragel/tsip_parser_header_Service_Route.jrl" */



/* line 29 "./src/headers/tsip_header_Service_Route.js" */
const _tsip_machine_parser_header_Service_Route_actions = [
	0, 1, 0, 1, 1, 1, 2, 1, 
	3, 1, 4, 1, 5, 1, 6, 2, 
	1, 0, 2, 4, 5
];

const _tsip_machine_parser_header_Service_Route_key_offsets = [
	0, 0, 1, 2, 3, 4, 5, 6, 
	7, 8, 9, 10, 11, 12, 13, 16, 
	35, 36, 38, 57, 58, 60, 63, 67, 
	79, 82, 84, 87, 92, 93, 110, 111, 
	113, 129, 147, 153, 154, 156, 161, 180, 
	181, 183, 202, 203, 205, 208, 216, 217, 
	219, 224, 229, 230, 232, 236, 242, 259, 
	266, 274, 282, 290, 292, 299, 308, 310, 
	313, 315, 318, 320, 323, 326, 327, 330, 
	331, 334, 335, 344, 353, 361, 369, 377, 
	385, 387, 393, 402, 411, 420, 422, 425, 
	428, 429, 430, 447, 465, 469, 470, 472, 
	480, 481, 483, 487, 493
];

const _tsip_machine_parser_header_Service_Route_trans_keys = [
	83, 101, 114, 118, 105, 99, 101, 45, 
	82, 111, 117, 116, 101, 9, 32, 58, 
	9, 13, 32, 33, 34, 37, 39, 60, 
	126, 42, 43, 45, 46, 48, 57, 65, 
	90, 95, 122, 10, 9, 32, 9, 13, 
	32, 33, 34, 37, 39, 60, 126, 42, 
	43, 45, 46, 48, 57, 65, 90, 95, 
	122, 10, 9, 32, 9, 32, 60, 65, 
	90, 97, 122, 9, 32, 43, 58, 45, 
	46, 48, 57, 65, 90, 97, 122, 9, 
	32, 58, 0, 65535, 62, 0, 65535, 9, 
	13, 32, 44, 59, 10, 9, 13, 32, 
	33, 37, 39, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 10, 9, 
	32, 9, 32, 33, 37, 39, 126, 42, 
	43, 45, 46, 48, 57, 65, 90, 95, 
	122, 9, 13, 32, 33, 37, 39, 44, 
	59, 61, 126, 42, 46, 48, 57, 65, 
	90, 95, 122, 9, 13, 32, 44, 59, 
	61, 10, 9, 32, 9, 32, 44, 59, 
	61, 9, 13, 32, 33, 34, 37, 39, 
	91, 126, 42, 43, 45, 46, 48, 57, 
	65, 90, 95, 122, 10, 9, 32, 9, 
	13, 32, 33, 34, 37, 39, 91, 126, 
	42, 43, 45, 46, 48, 57, 65, 90, 
	95, 122, 10, 9, 32, 9, 32, 34, 
	9, 13, 34, 92, 32, 126, 128, 255, 
	10, 9, 32, 9, 13, 32, 44, 59, 
	9, 13, 32, 44, 59, 10, 9, 32, 
	9, 32, 44, 59, 0, 9, 11, 12, 
	14, 127, 9, 13, 32, 33, 37, 39, 
	44, 59, 126, 42, 46, 48, 57, 65, 
	90, 95, 122, 58, 48, 57, 65, 70, 
	97, 102, 58, 93, 48, 57, 65, 70, 
	97, 102, 58, 93, 48, 57, 65, 70, 
	97, 102, 58, 93, 48, 57, 65, 70, 
	97, 102, 58, 93, 58, 48, 57, 65, 
	70, 97, 102, 46, 58, 93, 48, 57, 
	65, 70, 97, 102, 48, 57, 46, 48, 
	57, 48, 57, 46, 48, 57, 48, 57, 
	93, 48, 57, 93, 48, 57, 93, 46, 
	48, 57, 46, 46, 48, 57, 46, 46, 
	58, 93, 48, 57, 65, 70, 97, 102, 
	46, 58, 93, 48, 57, 65, 70, 97, 
	102, 58, 93, 48, 57, 65, 70, 97, 
	102, 58, 93, 48, 57, 65, 70, 97, 
	102, 58, 93, 48, 57, 65, 70, 97, 
	102, 58, 93, 48, 57, 65, 70, 97, 
	102, 58, 93, 48, 57, 65, 70, 97, 
	102, 46, 58, 93, 48, 57, 65, 70, 
	97, 102, 46, 58, 93, 48, 57, 65, 
	70, 97, 102, 46, 58, 93, 48, 57, 
	65, 70, 97, 102, 48, 57, 46, 48, 
	57, 46, 48, 57, 46, 58, 9, 13, 
	32, 33, 37, 39, 126, 42, 43, 45, 
	46, 48, 57, 65, 90, 95, 122, 9, 
	13, 32, 33, 37, 39, 60, 126, 42, 
	43, 45, 46, 48, 57, 65, 90, 95, 
	122, 9, 13, 32, 60, 10, 9, 32, 
	9, 13, 34, 92, 32, 126, 128, 255, 
	10, 9, 32, 9, 13, 32, 60, 0, 
	9, 11, 12, 14, 127, 0
];

const _tsip_machine_parser_header_Service_Route_single_lengths = [
	0, 1, 1, 1, 1, 1, 1, 1, 
	1, 1, 1, 1, 1, 1, 3, 9, 
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

const _tsip_machine_parser_header_Service_Route_range_lengths = [
	0, 0, 0, 0, 0, 0, 0, 0, 
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

const _tsip_machine_parser_header_Service_Route_index_offsets = [
	0, 0, 2, 4, 6, 8, 10, 12, 
	14, 16, 18, 20, 22, 24, 26, 30, 
	45, 47, 50, 65, 67, 70, 74, 77, 
	86, 90, 92, 95, 101, 103, 116, 118, 
	121, 133, 148, 155, 157, 160, 166, 181, 
	183, 186, 201, 203, 206, 210, 217, 219, 
	222, 228, 234, 236, 239, 244, 248, 262, 
	267, 273, 279, 285, 288, 293, 300, 302, 
	305, 307, 310, 312, 315, 318, 320, 323, 
	325, 328, 330, 337, 344, 350, 356, 362, 
	368, 371, 375, 382, 389, 396, 398, 401, 
	404, 406, 408, 421, 435, 440, 442, 445, 
	452, 454, 457, 462, 466
];

const _tsip_machine_parser_header_Service_Route_indicies = [
	0, 1, 2, 1, 3, 1, 4, 1, 
	5, 1, 6, 1, 7, 1, 8, 1, 
	9, 1, 10, 1, 11, 1, 12, 1, 
	13, 1, 13, 13, 14, 1, 15, 16, 
	15, 17, 18, 17, 17, 19, 17, 17, 
	17, 17, 17, 17, 1, 20, 1, 21, 
	21, 1, 22, 23, 22, 17, 18, 17, 
	17, 19, 17, 17, 17, 17, 17, 17, 
	1, 24, 1, 25, 25, 1, 25, 25, 
	26, 1, 27, 27, 1, 28, 28, 29, 
	30, 29, 29, 29, 29, 1, 28, 28, 
	30, 1, 31, 1, 32, 31, 1, 33, 
	34, 33, 35, 36, 1, 37, 1, 36, 
	38, 36, 39, 39, 39, 39, 39, 39, 
	39, 39, 39, 1, 40, 1, 41, 41, 
	1, 41, 41, 39, 39, 39, 39, 39, 
	39, 39, 39, 39, 1, 42, 43, 42, 
	44, 44, 44, 45, 46, 47, 44, 44, 
	44, 44, 44, 1, 48, 49, 48, 14, 
	36, 47, 1, 50, 1, 51, 51, 1, 
	51, 51, 14, 36, 47, 1, 47, 52, 
	47, 53, 54, 53, 53, 55, 53, 53, 
	53, 53, 53, 53, 1, 56, 1, 57, 
	57, 1, 57, 58, 57, 53, 54, 53, 
	53, 55, 53, 53, 53, 53, 53, 53, 
	1, 59, 1, 60, 60, 1, 60, 60, 
	54, 1, 54, 61, 62, 63, 54, 54, 
	1, 64, 1, 54, 54, 1, 65, 43, 
	65, 45, 46, 1, 66, 67, 66, 14, 
	36, 1, 68, 1, 69, 69, 1, 69, 
	69, 14, 36, 1, 54, 54, 54, 1, 
	65, 43, 65, 53, 53, 53, 45, 46, 
	53, 53, 53, 53, 53, 1, 71, 70, 
	70, 70, 1, 73, 62, 72, 72, 72, 
	1, 73, 62, 74, 74, 74, 1, 73, 
	62, 75, 75, 75, 1, 73, 62, 1, 
	77, 76, 70, 70, 1, 78, 73, 62, 
	79, 72, 72, 1, 80, 1, 81, 82, 
	1, 83, 1, 84, 85, 1, 86, 1, 
	62, 87, 1, 62, 88, 1, 62, 1, 
	84, 89, 1, 84, 1, 81, 90, 1, 
	81, 1, 78, 73, 62, 91, 74, 74, 
	1, 78, 73, 62, 75, 75, 75, 1, 
	93, 62, 92, 92, 92, 1, 95, 62, 
	94, 94, 94, 1, 95, 62, 96, 96, 
	96, 1, 95, 62, 97, 97, 97, 1, 
	95, 62, 1, 98, 92, 92, 1, 78, 
	95, 62, 99, 94, 94, 1, 78, 95, 
	62, 100, 96, 96, 1, 78, 95, 62, 
	97, 97, 97, 1, 101, 1, 78, 102, 
	1, 78, 103, 1, 78, 1, 77, 1, 
	104, 105, 104, 106, 106, 106, 106, 106, 
	106, 106, 106, 106, 1, 107, 108, 107, 
	106, 106, 106, 109, 106, 106, 106, 106, 
	106, 106, 1, 110, 111, 110, 26, 1, 
	112, 1, 104, 104, 1, 113, 114, 115, 
	116, 113, 113, 1, 117, 1, 113, 113, 
	1, 107, 108, 107, 109, 1, 113, 113, 
	113, 1, 1, 0
];

const _tsip_machine_parser_header_Service_Route_trans_targs = [
	2, 0, 3, 4, 5, 6, 7, 8, 
	9, 10, 11, 12, 13, 14, 15, 15, 
	16, 90, 95, 22, 17, 18, 18, 19, 
	20, 21, 22, 23, 24, 23, 25, 26, 
	27, 27, 28, 15, 29, 100, 30, 33, 
	31, 32, 34, 28, 33, 15, 29, 38, 
	34, 35, 36, 37, 39, 54, 45, 55, 
	40, 41, 42, 43, 44, 46, 48, 53, 
	47, 49, 49, 50, 51, 52, 56, 89, 
	57, 60, 58, 59, 61, 76, 62, 74, 
	63, 64, 72, 65, 66, 70, 67, 68, 
	69, 71, 73, 75, 77, 85, 78, 81, 
	79, 80, 82, 83, 84, 86, 87, 88, 
	91, 93, 90, 92, 19, 22, 92, 19, 
	94, 95, 96, 98, 99, 97
];

const _tsip_machine_parser_header_Service_Route_trans_actions = [
	0, 0, 0, 0, 0, 0, 0, 0, 
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

const tsip_machine_parser_header_Service_Route_start = 1;
const tsip_machine_parser_header_Service_Route_first_final = 100;
const tsip_machine_parser_header_Service_Route_error = 0;

const tsip_machine_parser_header_Service_Route_en_main = 1;


/* line 85 "./ragel/tsip_parser_header_Service_Route.jrl" */

function tsip_header_Service_Route(o_uri){
    this.__proto__.__proto__ = new tsip_header(tsip_header_type_e.Service_Route);
    this.s_display_name = null;
    this.o_uri = o_uri;
    this.toString = function(){
        if(this.o_uri){
            return tsip_uri_tostring(this.o_uri, true, true);
        }
        return null;
    }
}

// returns an array of 'Service-Route' headers
tsip_header_Service_Route.prototype.Parse = function(s_str){
    var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;
	var hdr_services = new Array();
	var curr_service = null;
	
	
/* line 296 "./src/headers/tsip_header_Service_Route.js" */
{
	 cs = tsip_machine_parser_header_Service_Route_start;
} /* JSCodeGen::writeInit */

/* line 110 "./ragel/tsip_parser_header_Service_Route.jrl" */
	
/* line 303 "./src/headers/tsip_header_Service_Route.js" */
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
	_keys = _tsip_machine_parser_header_Service_Route_key_offsets[cs];
	_trans = _tsip_machine_parser_header_Service_Route_index_offsets[cs];
	_klen = _tsip_machine_parser_header_Service_Route_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsip_machine_parser_header_Service_Route_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsip_machine_parser_header_Service_Route_trans_keys[_mid]) {
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
	  _klen = _tsip_machine_parser_header_Service_Route_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsip_machine_parser_header_Service_Route_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsip_machine_parser_header_Service_Route_trans_keys[_mid+1]) {
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
	_trans = _tsip_machine_parser_header_Service_Route_indicies[_trans];
	cs = _tsip_machine_parser_header_Service_Route_trans_targs[_trans];
	if (_tsip_machine_parser_header_Service_Route_trans_actions[_trans] != 0) {
		_acts = _tsip_machine_parser_header_Service_Route_trans_actions[_trans];
		_nacts = _tsip_machine_parser_header_Service_Route_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsip_machine_parser_header_Service_Route_actions[_acts - 1]) {
case 0:
/* line 27 "./ragel/tsip_parser_header_Service_Route.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 31 "./ragel/tsip_parser_header_Service_Route.jrl" */

		if(!curr_service){
			curr_service = new tsip_header_Service_Route(null);
		}
			break;
case 2:
/* line 37 "./ragel/tsip_parser_header_Service_Route.jrl" */

		if(curr_service){			
			curr_service.s_display_name = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
            curr_service.s_display_name = tsk_string_unquote_2(curr_service.s_display_name);
		}
			break;
case 3:
/* line 44 "./ragel/tsip_parser_header_Service_Route.jrl" */
		
		if(curr_service && !curr_service.o_uri){
		    var s_uri = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			if((curr_service.o_uri = tsip_uri.prototype.Parse(s_uri)) && curr_service.s_display_name){
				curr_service.o_uri.s_display_name = tsk_strdup(curr_service.s_display_name);
			}
		}
			break;
case 4:
/* line 53 "./ragel/tsip_parser_header_Service_Route.jrl" */

		if(curr_service){
		    tsk_ragel_add_param(s_str, p, i_tag_start, curr_service.ao_params);
		}
			break;
case 5:
/* line 59 "./ragel/tsip_parser_header_Service_Route.jrl" */

		if(curr_service){
	        hdr_services.push(curr_service);
	        curr_service = null;
	    }
			break;
case 6:
/* line 66 "./ragel/tsip_parser_header_Service_Route.jrl" */

			break;
/* line 436 "./src/headers/tsip_header_Service_Route.js" */
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

/* line 111 "./ragel/tsip_parser_header_Service_Route.jrl" */
	
	if( cs < 
/* line 466 "./src/headers/tsip_header_Service_Route.js" */
100
/* line 112 "./ragel/tsip_parser_header_Service_Route.jrl" */
 ){
		console.error("Failed to parse 'Service-Route' header: %s", s_str);
		return null;
	}
	
	return hdr_services;
}