
/* line 1 "./ragel/tsip_parser_header_Path.jrl" */
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

/* line 82 "./ragel/tsip_parser_header_Path.jrl" */



/* line 29 "./src/headers/tsip_header_Path.js" */
const _tsip_machine_parser_header_Path_actions = [
	0, 1, 0, 1, 1, 1, 2, 1, 
	3, 1, 4, 1, 5, 1, 6, 2, 
	1, 0, 2, 4, 5
];

const _tsip_machine_parser_header_Path_key_offsets = [
	0, 0, 1, 2, 3, 4, 7, 26, 
	27, 29, 48, 49, 51, 54, 58, 70, 
	73, 75, 78, 83, 84, 101, 102, 104, 
	120, 138, 144, 145, 147, 152, 171, 172, 
	174, 193, 194, 196, 199, 207, 208, 210, 
	215, 220, 221, 223, 227, 233, 250, 257, 
	265, 273, 281, 283, 290, 299, 301, 304, 
	306, 309, 311, 314, 317, 318, 321, 322, 
	325, 326, 335, 344, 352, 360, 368, 376, 
	378, 384, 393, 402, 411, 413, 416, 419, 
	420, 421, 438, 456, 460, 461, 463, 471, 
	472, 474, 478, 484
];

const _tsip_machine_parser_header_Path_trans_keys = [
	80, 97, 116, 104, 9, 32, 58, 9, 
	13, 32, 33, 34, 37, 39, 60, 126, 
	42, 43, 45, 46, 48, 57, 65, 90, 
	95, 122, 10, 9, 32, 9, 13, 32, 
	33, 34, 37, 39, 60, 126, 42, 43, 
	45, 46, 48, 57, 65, 90, 95, 122, 
	10, 9, 32, 9, 32, 60, 65, 90, 
	97, 122, 9, 32, 43, 58, 45, 46, 
	48, 57, 65, 90, 97, 122, 9, 32, 
	58, 0, 65535, 62, 0, 65535, 9, 13, 
	32, 44, 59, 10, 9, 13, 32, 33, 
	37, 39, 126, 42, 43, 45, 46, 48, 
	57, 65, 90, 95, 122, 10, 9, 32, 
	9, 32, 33, 37, 39, 126, 42, 43, 
	45, 46, 48, 57, 65, 90, 95, 122, 
	9, 13, 32, 33, 37, 39, 44, 59, 
	61, 126, 42, 46, 48, 57, 65, 90, 
	95, 122, 9, 13, 32, 44, 59, 61, 
	10, 9, 32, 9, 32, 44, 59, 61, 
	9, 13, 32, 33, 34, 37, 39, 91, 
	126, 42, 43, 45, 46, 48, 57, 65, 
	90, 95, 122, 10, 9, 32, 9, 13, 
	32, 33, 34, 37, 39, 91, 126, 42, 
	43, 45, 46, 48, 57, 65, 90, 95, 
	122, 10, 9, 32, 9, 32, 34, 9, 
	13, 34, 92, 32, 126, 128, 255, 10, 
	9, 32, 9, 13, 32, 44, 59, 9, 
	13, 32, 44, 59, 10, 9, 32, 9, 
	32, 44, 59, 0, 9, 11, 12, 14, 
	127, 9, 13, 32, 33, 37, 39, 44, 
	59, 126, 42, 46, 48, 57, 65, 90, 
	95, 122, 58, 48, 57, 65, 70, 97, 
	102, 58, 93, 48, 57, 65, 70, 97, 
	102, 58, 93, 48, 57, 65, 70, 97, 
	102, 58, 93, 48, 57, 65, 70, 97, 
	102, 58, 93, 58, 48, 57, 65, 70, 
	97, 102, 46, 58, 93, 48, 57, 65, 
	70, 97, 102, 48, 57, 46, 48, 57, 
	48, 57, 46, 48, 57, 48, 57, 93, 
	48, 57, 93, 48, 57, 93, 46, 48, 
	57, 46, 46, 48, 57, 46, 46, 58, 
	93, 48, 57, 65, 70, 97, 102, 46, 
	58, 93, 48, 57, 65, 70, 97, 102, 
	58, 93, 48, 57, 65, 70, 97, 102, 
	58, 93, 48, 57, 65, 70, 97, 102, 
	58, 93, 48, 57, 65, 70, 97, 102, 
	58, 93, 48, 57, 65, 70, 97, 102, 
	58, 93, 48, 57, 65, 70, 97, 102, 
	46, 58, 93, 48, 57, 65, 70, 97, 
	102, 46, 58, 93, 48, 57, 65, 70, 
	97, 102, 46, 58, 93, 48, 57, 65, 
	70, 97, 102, 48, 57, 46, 48, 57, 
	46, 48, 57, 46, 58, 9, 13, 32, 
	33, 37, 39, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 9, 13, 
	32, 33, 37, 39, 60, 126, 42, 43, 
	45, 46, 48, 57, 65, 90, 95, 122, 
	9, 13, 32, 60, 10, 9, 32, 9, 
	13, 34, 92, 32, 126, 128, 255, 10, 
	9, 32, 9, 13, 32, 60, 0, 9, 
	11, 12, 14, 127, 0
];

const _tsip_machine_parser_header_Path_single_lengths = [
	0, 1, 1, 1, 1, 3, 9, 1, 
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

const _tsip_machine_parser_header_Path_range_lengths = [
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

const _tsip_machine_parser_header_Path_index_offsets = [
	0, 0, 2, 4, 6, 8, 12, 27, 
	29, 32, 47, 49, 52, 56, 59, 68, 
	72, 74, 77, 83, 85, 98, 100, 103, 
	115, 130, 137, 139, 142, 148, 163, 165, 
	168, 183, 185, 188, 192, 199, 201, 204, 
	210, 216, 218, 221, 226, 230, 244, 249, 
	255, 261, 267, 270, 275, 282, 284, 287, 
	289, 292, 294, 297, 300, 302, 305, 307, 
	310, 312, 319, 326, 332, 338, 344, 350, 
	353, 357, 364, 371, 378, 380, 383, 386, 
	388, 390, 403, 417, 422, 424, 427, 434, 
	436, 439, 444, 448
];

const _tsip_machine_parser_header_Path_indicies = [
	0, 1, 2, 1, 3, 1, 4, 1, 
	4, 4, 5, 1, 6, 7, 6, 8, 
	9, 8, 8, 10, 8, 8, 8, 8, 
	8, 8, 1, 11, 1, 12, 12, 1, 
	13, 14, 13, 8, 9, 8, 8, 10, 
	8, 8, 8, 8, 8, 8, 1, 15, 
	1, 16, 16, 1, 16, 16, 17, 1, 
	18, 18, 1, 19, 19, 20, 21, 20, 
	20, 20, 20, 1, 19, 19, 21, 1, 
	22, 1, 23, 22, 1, 24, 25, 24, 
	26, 27, 1, 28, 1, 27, 29, 27, 
	30, 30, 30, 30, 30, 30, 30, 30, 
	30, 1, 31, 1, 32, 32, 1, 32, 
	32, 30, 30, 30, 30, 30, 30, 30, 
	30, 30, 1, 33, 34, 33, 35, 35, 
	35, 36, 37, 38, 35, 35, 35, 35, 
	35, 1, 39, 40, 39, 5, 27, 38, 
	1, 41, 1, 42, 42, 1, 42, 42, 
	5, 27, 38, 1, 38, 43, 38, 44, 
	45, 44, 44, 46, 44, 44, 44, 44, 
	44, 44, 1, 47, 1, 48, 48, 1, 
	48, 49, 48, 44, 45, 44, 44, 46, 
	44, 44, 44, 44, 44, 44, 1, 50, 
	1, 51, 51, 1, 51, 51, 45, 1, 
	45, 52, 53, 54, 45, 45, 1, 55, 
	1, 45, 45, 1, 56, 34, 56, 36, 
	37, 1, 57, 58, 57, 5, 27, 1, 
	59, 1, 60, 60, 1, 60, 60, 5, 
	27, 1, 45, 45, 45, 1, 56, 34, 
	56, 44, 44, 44, 36, 37, 44, 44, 
	44, 44, 44, 1, 62, 61, 61, 61, 
	1, 64, 53, 63, 63, 63, 1, 64, 
	53, 65, 65, 65, 1, 64, 53, 66, 
	66, 66, 1, 64, 53, 1, 68, 67, 
	61, 61, 1, 69, 64, 53, 70, 63, 
	63, 1, 71, 1, 72, 73, 1, 74, 
	1, 75, 76, 1, 77, 1, 53, 78, 
	1, 53, 79, 1, 53, 1, 75, 80, 
	1, 75, 1, 72, 81, 1, 72, 1, 
	69, 64, 53, 82, 65, 65, 1, 69, 
	64, 53, 66, 66, 66, 1, 84, 53, 
	83, 83, 83, 1, 86, 53, 85, 85, 
	85, 1, 86, 53, 87, 87, 87, 1, 
	86, 53, 88, 88, 88, 1, 86, 53, 
	1, 89, 83, 83, 1, 69, 86, 53, 
	90, 85, 85, 1, 69, 86, 53, 91, 
	87, 87, 1, 69, 86, 53, 88, 88, 
	88, 1, 92, 1, 69, 93, 1, 69, 
	94, 1, 69, 1, 68, 1, 95, 96, 
	95, 97, 97, 97, 97, 97, 97, 97, 
	97, 97, 1, 98, 99, 98, 97, 97, 
	97, 100, 97, 97, 97, 97, 97, 97, 
	1, 101, 102, 101, 17, 1, 103, 1, 
	95, 95, 1, 104, 105, 106, 107, 104, 
	104, 1, 108, 1, 104, 104, 1, 98, 
	99, 98, 100, 1, 104, 104, 104, 1, 
	1, 0
];

const _tsip_machine_parser_header_Path_trans_targs = [
	2, 0, 3, 4, 5, 6, 6, 7, 
	81, 86, 13, 8, 9, 9, 10, 11, 
	12, 13, 14, 15, 14, 16, 17, 18, 
	18, 19, 6, 20, 91, 21, 24, 22, 
	23, 25, 19, 24, 6, 20, 29, 25, 
	26, 27, 28, 30, 45, 36, 46, 31, 
	32, 33, 34, 35, 37, 39, 44, 38, 
	40, 40, 41, 42, 43, 47, 80, 48, 
	51, 49, 50, 52, 67, 53, 65, 54, 
	55, 63, 56, 57, 61, 58, 59, 60, 
	62, 64, 66, 68, 76, 69, 72, 70, 
	71, 73, 74, 75, 77, 78, 79, 82, 
	84, 81, 83, 10, 13, 83, 10, 85, 
	86, 87, 89, 90, 88
];

const _tsip_machine_parser_header_Path_trans_actions = [
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

const tsip_machine_parser_header_Path_start = 1;
const tsip_machine_parser_header_Path_first_final = 91;
const tsip_machine_parser_header_Path_error = 0;

const tsip_machine_parser_header_Path_en_main = 1;


/* line 85 "./ragel/tsip_parser_header_Path.jrl" */

function tsip_header_Path(o_uri){
    this.__proto__.__proto__ = new tsip_header(tsip_header_type_e.Path);
    this.s_display_name = null;
    this.o_uri = o_uri;
    this.toString = function(){
        if(this.o_uri){
            return tsip_uri_tostring(this.o_uri, true, true);
        }
        return null;
    }
}

// returns an array of 'Path' headers
tsip_header_Path.prototype.Parse = function(s_str){
    var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;
	var hdr_paths = new Array();
	var curr_path = null;
	
	
/* line 287 "./src/headers/tsip_header_Path.js" */
{
	 cs = tsip_machine_parser_header_Path_start;
} /* JSCodeGen::writeInit */

/* line 110 "./ragel/tsip_parser_header_Path.jrl" */
	
/* line 294 "./src/headers/tsip_header_Path.js" */
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
	_keys = _tsip_machine_parser_header_Path_key_offsets[cs];
	_trans = _tsip_machine_parser_header_Path_index_offsets[cs];
	_klen = _tsip_machine_parser_header_Path_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsip_machine_parser_header_Path_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsip_machine_parser_header_Path_trans_keys[_mid]) {
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
	  _klen = _tsip_machine_parser_header_Path_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsip_machine_parser_header_Path_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsip_machine_parser_header_Path_trans_keys[_mid+1]) {
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
	_trans = _tsip_machine_parser_header_Path_indicies[_trans];
	cs = _tsip_machine_parser_header_Path_trans_targs[_trans];
	if (_tsip_machine_parser_header_Path_trans_actions[_trans] != 0) {
		_acts = _tsip_machine_parser_header_Path_trans_actions[_trans];
		_nacts = _tsip_machine_parser_header_Path_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsip_machine_parser_header_Path_actions[_acts - 1]) {
case 0:
/* line 27 "./ragel/tsip_parser_header_Path.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 31 "./ragel/tsip_parser_header_Path.jrl" */

		if(!curr_path){
			curr_path = new tsip_header_Path(null);
		}
			break;
case 2:
/* line 37 "./ragel/tsip_parser_header_Path.jrl" */

		if(curr_path){
			curr_path.s_display_name = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
            curr_path.s_display_name = tsk_string_unquote_2(curr_path.s_display_name);
		}
			break;
case 3:
/* line 44 "./ragel/tsip_parser_header_Path.jrl" */

		if(curr_path && !curr_path.o_uri){
		    var s_uri = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			if((curr_path.o_uri = tsip_uri.prototype.Parse(s_uri)) && curr_path.s_display_name){
				curr_path.o_uri.s_display_name = tsk_strdup(curr_path.s_display_name);
			}
		}
			break;
case 4:
/* line 53 "./ragel/tsip_parser_header_Path.jrl" */

		if(curr_path){
			tsk_ragel_add_param(s_str, p, i_tag_start, curr_path.ao_params);
		}
			break;
case 5:
/* line 59 "./ragel/tsip_parser_header_Path.jrl" */

	    if(curr_path){
	        hdr_paths.push(curr_path);
	        curr_path = null;
	    }
			break;
case 6:
/* line 66 "./ragel/tsip_parser_header_Path.jrl" */

			break;
/* line 427 "./src/headers/tsip_header_Path.js" */
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

/* line 111 "./ragel/tsip_parser_header_Path.jrl" */
	
	if( cs < 
/* line 457 "./src/headers/tsip_header_Path.js" */
91
/* line 112 "./ragel/tsip_parser_header_Path.jrl" */
 ){
		console.error("Failed to parse 'Path' header: %s", s_str);
		return null;
	}
	
	return hdr_paths;
}