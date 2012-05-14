
/* line 1 "./ragel/tsip_parser_header_P_Associated_URI.jrl" */
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

/* line 81 "./ragel/tsip_parser_header_P_Associated_URI.jrl" */



/* line 29 "./src/headers/tsip_header_P_Associated_URI.js" */
const _tsip_machine_parser_header_P_Associated_URI_actions = [
	0, 1, 0, 1, 1, 1, 2, 1, 
	3, 1, 4, 1, 5, 1, 6, 2, 
	1, 0, 2, 4, 5
];

const _tsip_machine_parser_header_P_Associated_URI_key_offsets = [
	0, 0, 2, 3, 5, 7, 9, 11, 
	13, 15, 17, 19, 21, 23, 24, 26, 
	28, 30, 33, 52, 53, 55, 74, 75, 
	77, 80, 84, 96, 99, 101, 104, 109, 
	110, 127, 128, 130, 146, 164, 170, 171, 
	173, 178, 197, 198, 200, 219, 220, 222, 
	225, 233, 234, 236, 241, 246, 247, 249, 
	253, 259, 276, 283, 291, 299, 307, 309, 
	316, 325, 327, 330, 332, 335, 337, 340, 
	343, 344, 347, 348, 351, 352, 361, 370, 
	378, 386, 394, 402, 404, 410, 419, 428, 
	437, 439, 442, 445, 446, 447, 464, 482, 
	486, 487, 489, 497, 498, 500, 504, 510
];

const _tsip_machine_parser_header_P_Associated_URI_trans_keys = [
	80, 112, 45, 65, 97, 83, 115, 83, 
	115, 79, 111, 67, 99, 73, 105, 65, 
	97, 84, 116, 69, 101, 68, 100, 45, 
	85, 117, 82, 114, 73, 105, 9, 32, 
	58, 9, 13, 32, 33, 34, 37, 39, 
	60, 126, 42, 43, 45, 46, 48, 57, 
	65, 90, 95, 122, 10, 9, 32, 9, 
	13, 32, 33, 34, 37, 39, 60, 126, 
	42, 43, 45, 46, 48, 57, 65, 90, 
	95, 122, 10, 9, 32, 9, 32, 60, 
	65, 90, 97, 122, 9, 32, 43, 58, 
	45, 46, 48, 57, 65, 90, 97, 122, 
	9, 32, 58, 0, 65535, 62, 0, 65535, 
	9, 13, 32, 44, 59, 10, 9, 13, 
	32, 33, 37, 39, 126, 42, 43, 45, 
	46, 48, 57, 65, 90, 95, 122, 10, 
	9, 32, 9, 32, 33, 37, 39, 126, 
	42, 43, 45, 46, 48, 57, 65, 90, 
	95, 122, 9, 13, 32, 33, 37, 39, 
	44, 59, 61, 126, 42, 46, 48, 57, 
	65, 90, 95, 122, 9, 13, 32, 44, 
	59, 61, 10, 9, 32, 9, 32, 44, 
	59, 61, 9, 13, 32, 33, 34, 37, 
	39, 91, 126, 42, 43, 45, 46, 48, 
	57, 65, 90, 95, 122, 10, 9, 32, 
	9, 13, 32, 33, 34, 37, 39, 91, 
	126, 42, 43, 45, 46, 48, 57, 65, 
	90, 95, 122, 10, 9, 32, 9, 32, 
	34, 9, 13, 34, 92, 32, 126, 128, 
	255, 10, 9, 32, 9, 13, 32, 44, 
	59, 9, 13, 32, 44, 59, 10, 9, 
	32, 9, 32, 44, 59, 0, 9, 11, 
	12, 14, 127, 9, 13, 32, 33, 37, 
	39, 44, 59, 126, 42, 46, 48, 57, 
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
	48, 57, 46, 48, 57, 46, 58, 9, 
	13, 32, 33, 37, 39, 126, 42, 43, 
	45, 46, 48, 57, 65, 90, 95, 122, 
	9, 13, 32, 33, 37, 39, 60, 126, 
	42, 43, 45, 46, 48, 57, 65, 90, 
	95, 122, 9, 13, 32, 60, 10, 9, 
	32, 9, 13, 34, 92, 32, 126, 128, 
	255, 10, 9, 32, 9, 13, 32, 60, 
	0, 9, 11, 12, 14, 127, 0
];

const _tsip_machine_parser_header_P_Associated_URI_single_lengths = [
	0, 2, 1, 2, 2, 2, 2, 2, 
	2, 2, 2, 2, 2, 1, 2, 2, 
	2, 3, 9, 1, 2, 9, 1, 2, 
	3, 0, 4, 3, 0, 1, 5, 1, 
	7, 1, 2, 6, 10, 6, 1, 2, 
	5, 9, 1, 2, 9, 1, 2, 3, 
	4, 1, 2, 5, 5, 1, 2, 4, 
	0, 9, 1, 2, 2, 2, 2, 1, 
	3, 0, 1, 0, 1, 0, 1, 1, 
	1, 1, 1, 1, 1, 3, 3, 2, 
	2, 2, 2, 2, 0, 3, 3, 3, 
	0, 1, 1, 1, 1, 7, 8, 4, 
	1, 2, 4, 1, 2, 4, 0, 0
];

const _tsip_machine_parser_header_P_Associated_URI_range_lengths = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 5, 0, 0, 5, 0, 0, 
	0, 2, 4, 0, 1, 1, 0, 0, 
	5, 0, 0, 5, 4, 0, 0, 0, 
	0, 5, 0, 0, 5, 0, 0, 0, 
	2, 0, 0, 0, 0, 0, 0, 0, 
	3, 4, 3, 3, 3, 3, 0, 3, 
	3, 1, 1, 1, 1, 1, 1, 1, 
	0, 1, 0, 1, 0, 3, 3, 3, 
	3, 3, 3, 0, 3, 3, 3, 3, 
	1, 1, 1, 0, 0, 5, 5, 0, 
	0, 0, 2, 0, 0, 0, 3, 0
];

const _tsip_machine_parser_header_P_Associated_URI_index_offsets = [
	0, 0, 3, 5, 8, 11, 14, 17, 
	20, 23, 26, 29, 32, 35, 37, 40, 
	43, 46, 50, 65, 67, 70, 85, 87, 
	90, 94, 97, 106, 110, 112, 115, 121, 
	123, 136, 138, 141, 153, 168, 175, 177, 
	180, 186, 201, 203, 206, 221, 223, 226, 
	230, 237, 239, 242, 248, 254, 256, 259, 
	264, 268, 282, 287, 293, 299, 305, 308, 
	313, 320, 322, 325, 327, 330, 332, 335, 
	338, 340, 343, 345, 348, 350, 357, 364, 
	370, 376, 382, 388, 391, 395, 402, 409, 
	416, 418, 421, 424, 426, 428, 441, 455, 
	460, 462, 465, 472, 474, 477, 482, 486
];

const _tsip_machine_parser_header_P_Associated_URI_indicies = [
	0, 0, 1, 2, 1, 3, 3, 1, 
	4, 4, 1, 5, 5, 1, 6, 6, 
	1, 7, 7, 1, 8, 8, 1, 9, 
	9, 1, 10, 10, 1, 11, 11, 1, 
	12, 12, 1, 13, 1, 14, 14, 1, 
	15, 15, 1, 16, 16, 1, 16, 16, 
	17, 1, 18, 19, 18, 20, 21, 20, 
	20, 22, 20, 20, 20, 20, 20, 20, 
	1, 23, 1, 24, 24, 1, 25, 26, 
	25, 20, 21, 20, 20, 22, 20, 20, 
	20, 20, 20, 20, 1, 27, 1, 28, 
	28, 1, 28, 28, 29, 1, 30, 30, 
	1, 31, 31, 32, 33, 32, 32, 32, 
	32, 1, 31, 31, 33, 1, 34, 1, 
	35, 34, 1, 36, 37, 36, 38, 39, 
	1, 40, 1, 39, 41, 39, 42, 42, 
	42, 42, 42, 42, 42, 42, 42, 1, 
	43, 1, 44, 44, 1, 44, 44, 42, 
	42, 42, 42, 42, 42, 42, 42, 42, 
	1, 45, 46, 45, 47, 47, 47, 48, 
	49, 50, 47, 47, 47, 47, 47, 1, 
	51, 52, 51, 17, 39, 50, 1, 53, 
	1, 54, 54, 1, 54, 54, 17, 39, 
	50, 1, 50, 55, 50, 56, 57, 56, 
	56, 58, 56, 56, 56, 56, 56, 56, 
	1, 59, 1, 60, 60, 1, 60, 61, 
	60, 56, 57, 56, 56, 58, 56, 56, 
	56, 56, 56, 56, 1, 62, 1, 63, 
	63, 1, 63, 63, 57, 1, 57, 64, 
	65, 66, 57, 57, 1, 67, 1, 57, 
	57, 1, 68, 46, 68, 48, 49, 1, 
	69, 70, 69, 17, 39, 1, 71, 1, 
	72, 72, 1, 72, 72, 17, 39, 1, 
	57, 57, 57, 1, 68, 46, 68, 56, 
	56, 56, 48, 49, 56, 56, 56, 56, 
	56, 1, 74, 73, 73, 73, 1, 76, 
	65, 75, 75, 75, 1, 76, 65, 77, 
	77, 77, 1, 76, 65, 78, 78, 78, 
	1, 76, 65, 1, 80, 79, 73, 73, 
	1, 81, 76, 65, 82, 75, 75, 1, 
	83, 1, 84, 85, 1, 86, 1, 87, 
	88, 1, 89, 1, 65, 90, 1, 65, 
	91, 1, 65, 1, 87, 92, 1, 87, 
	1, 84, 93, 1, 84, 1, 81, 76, 
	65, 94, 77, 77, 1, 81, 76, 65, 
	78, 78, 78, 1, 96, 65, 95, 95, 
	95, 1, 98, 65, 97, 97, 97, 1, 
	98, 65, 99, 99, 99, 1, 98, 65, 
	100, 100, 100, 1, 98, 65, 1, 101, 
	95, 95, 1, 81, 98, 65, 102, 97, 
	97, 1, 81, 98, 65, 103, 99, 99, 
	1, 81, 98, 65, 100, 100, 100, 1, 
	104, 1, 81, 105, 1, 81, 106, 1, 
	81, 1, 80, 1, 107, 108, 107, 109, 
	109, 109, 109, 109, 109, 109, 109, 109, 
	1, 110, 111, 110, 109, 109, 109, 112, 
	109, 109, 109, 109, 109, 109, 1, 113, 
	114, 113, 29, 1, 115, 1, 107, 107, 
	1, 116, 117, 118, 119, 116, 116, 1, 
	120, 1, 116, 116, 1, 110, 111, 110, 
	112, 1, 116, 116, 116, 1, 1, 0
];

const _tsip_machine_parser_header_P_Associated_URI_trans_targs = [
	2, 0, 3, 4, 5, 6, 7, 8, 
	9, 10, 11, 12, 13, 14, 15, 16, 
	17, 18, 18, 19, 93, 98, 25, 20, 
	21, 21, 22, 23, 24, 25, 26, 27, 
	26, 28, 29, 30, 30, 31, 18, 32, 
	103, 33, 36, 34, 35, 37, 31, 36, 
	18, 32, 41, 37, 38, 39, 40, 42, 
	57, 48, 58, 43, 44, 45, 46, 47, 
	49, 51, 56, 50, 52, 52, 53, 54, 
	55, 59, 92, 60, 63, 61, 62, 64, 
	79, 65, 77, 66, 67, 75, 68, 69, 
	73, 70, 71, 72, 74, 76, 78, 80, 
	88, 81, 84, 82, 83, 85, 86, 87, 
	89, 90, 91, 94, 96, 93, 95, 22, 
	25, 95, 22, 97, 98, 99, 101, 102, 
	100
];

const _tsip_machine_parser_header_P_Associated_URI_trans_actions = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 3, 3, 15, 15, 3, 0, 
	0, 3, 3, 0, 0, 0, 1, 0, 
	0, 0, 0, 7, 11, 11, 11, 0, 
	13, 0, 1, 0, 0, 18, 18, 0, 
	18, 9, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 18, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 5, 5, 
	5, 0, 0, 0, 0, 0, 0, 0, 
	0
];

const tsip_machine_parser_header_P_Associated_URI_start = 1;
const tsip_machine_parser_header_P_Associated_URI_first_final = 103;
const tsip_machine_parser_header_P_Associated_URI_error = 0;

const tsip_machine_parser_header_P_Associated_URI_en_main = 1;


/* line 84 "./ragel/tsip_parser_header_P_Associated_URI.jrl" */

function tsip_header_P_Associated_URI(o_uri){
    this.__proto__.__proto__ = new tsip_header(tsip_header_type_e.P_Associated_URI);
    this.s_display_name = null;
    this.o_uri = o_uri;
    this.toString = function(){
        if(this.o_uri){
            return tsip_uri_tostring(this.o_uri, true, true);
        }
        return null;
    }
}

// returns an array of 'P-Associated-URI' headers
tsip_header_P_Associated_URI.prototype.Parse = function(s_str){
    var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;
	var hdr_p_associated_uris = new Array();
	var curr_p_associated_uri = null;
	
	
/* line 302 "./src/headers/tsip_header_P_Associated_URI.js" */
{
	 cs = tsip_machine_parser_header_P_Associated_URI_start;
} /* JSCodeGen::writeInit */

/* line 109 "./ragel/tsip_parser_header_P_Associated_URI.jrl" */
	
/* line 309 "./src/headers/tsip_header_P_Associated_URI.js" */
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
	_keys = _tsip_machine_parser_header_P_Associated_URI_key_offsets[cs];
	_trans = _tsip_machine_parser_header_P_Associated_URI_index_offsets[cs];
	_klen = _tsip_machine_parser_header_P_Associated_URI_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsip_machine_parser_header_P_Associated_URI_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsip_machine_parser_header_P_Associated_URI_trans_keys[_mid]) {
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
	  _klen = _tsip_machine_parser_header_P_Associated_URI_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsip_machine_parser_header_P_Associated_URI_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsip_machine_parser_header_P_Associated_URI_trans_keys[_mid+1]) {
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
	_trans = _tsip_machine_parser_header_P_Associated_URI_indicies[_trans];
	cs = _tsip_machine_parser_header_P_Associated_URI_trans_targs[_trans];
	if (_tsip_machine_parser_header_P_Associated_URI_trans_actions[_trans] != 0) {
		_acts = _tsip_machine_parser_header_P_Associated_URI_trans_actions[_trans];
		_nacts = _tsip_machine_parser_header_P_Associated_URI_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsip_machine_parser_header_P_Associated_URI_actions[_acts - 1]) {
case 0:
/* line 27 "./ragel/tsip_parser_header_P_Associated_URI.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 31 "./ragel/tsip_parser_header_P_Associated_URI.jrl" */

		if(!curr_p_associated_uri){
			curr_p_associated_uri = new tsip_header_P_Associated_URI(null);
		}
			break;
case 2:
/* line 37 "./ragel/tsip_parser_header_P_Associated_URI.jrl" */

		if(curr_p_associated_uri){			
			curr_p_associated_uri.s_display_name = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
            curr_p_associated_uri.s_display_name = tsk_string_unquote_2(curr_p_associated_uri.s_display_name);
		}
			break;
case 3:
/* line 44 "./ragel/tsip_parser_header_P_Associated_URI.jrl" */

		if(curr_p_associated_uri && !curr_p_associated_uri.o_uri){
		    var s_uri = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			if((curr_p_associated_uri.o_uri = tsip_uri.prototype.Parse(s_uri)) && curr_p_associated_uri.s_display_name){
				curr_p_associated_uri.o_uri.s_display_name = tsk_strdup(curr_p_associated_uri.s_display_name);
			}
		}
			break;
case 4:
/* line 53 "./ragel/tsip_parser_header_P_Associated_URI.jrl" */

		if(curr_p_associated_uri){
		    tsk_ragel_add_param(s_str, p, i_tag_start, curr_p_associated_uri.ao_params);
		}
			break;
case 5:
/* line 59 "./ragel/tsip_parser_header_P_Associated_URI.jrl" */

		if(curr_p_associated_uri){
	        hdr_p_associated_uris.push(curr_p_associated_uri);
	        curr_p_associated_uri = null;
	    }
			break;
case 6:
/* line 66 "./ragel/tsip_parser_header_P_Associated_URI.jrl" */

			break;
/* line 442 "./src/headers/tsip_header_P_Associated_URI.js" */
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

/* line 110 "./ragel/tsip_parser_header_P_Associated_URI.jrl" */
	
	if( cs < 
/* line 472 "./src/headers/tsip_header_P_Associated_URI.js" */
103
/* line 111 "./ragel/tsip_parser_header_P_Associated_URI.jrl" */
 ){
		console.error("Failed to parse 'P-Associated-URI' header: %s", s_str);
		return null;
	}
	
	return hdr_p_associated_uris;
}