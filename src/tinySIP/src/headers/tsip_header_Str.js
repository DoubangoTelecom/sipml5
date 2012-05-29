
/* line 1 "./ragel/tsip_parser_header_Str.jrl" */
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

// Parse headers: 'Call-ID', 'Event', 'P-Access-Network-Info', 'Server', 'SIP-ETag', 'SIP-If-Match', 'User-Agent'
tsip_header_Str.prototype = Object.create(tsip_header.prototype);
tsip_header_Call_ID.prototype = Object.create(tsip_header_Str.prototype);
tsip_header_Event.prototype = Object.create(tsip_header_Str.prototype);
tsip_header_P_Access_Network_Info.prototype = Object.create(tsip_header_Str.prototype);
tsip_header_Server.prototype = Object.create(tsip_header_Str.prototype);
tsip_header_SIP_ETag.prototype = Object.create(tsip_header_Str.prototype);
tsip_header_SIP_If_Match.prototype = Object.create(tsip_header_Str.prototype);
tsip_header_User_Agent.prototype = Object.create(tsip_header_Str.prototype);


/* line 78 "./ragel/tsip_parser_header_Str.jrl" */



/* line 40 "./src/headers/tsip_header_Str.js" */
_tsip_machine_parser_header_Str_actions = [
	0, 1, 0, 1, 1, 1, 2, 1, 
	3, 1, 4, 1, 5, 1, 6, 1, 
	7, 1, 8, 1, 9, 1, 10, 2, 
	0, 8
];

_tsip_machine_parser_header_Str_key_offsets = [
	0, 0, 14, 16, 18, 20, 21, 23, 
	25, 28, 31, 38, 45, 46, 63, 64, 
	66, 82, 100, 106, 107, 109, 114, 133, 
	134, 136, 155, 156, 158, 161, 169, 170, 
	172, 177, 182, 183, 185, 189, 195, 212, 
	219, 227, 235, 243, 245, 252, 261, 263, 
	266, 268, 271, 273, 276, 279, 280, 283, 
	284, 287, 288, 297, 306, 314, 322, 330, 
	338, 340, 346, 355, 364, 373, 375, 378, 
	381, 382, 383, 385, 387, 389, 391, 394, 
	395, 397, 399, 401, 403, 405, 407, 408, 
	410, 412, 414, 416, 418, 420, 422, 423, 
	425, 427, 429, 431, 434, 438, 440, 442, 
	444, 446, 449, 451, 452, 456, 458, 460, 
	462, 465, 467, 468, 470, 472, 474, 476, 
	478, 481, 483, 485, 487, 488, 490, 492, 
	494, 496, 498, 501
];

_tsip_machine_parser_header_Str_trans_keys = [
	67, 69, 73, 79, 80, 83, 85, 99, 
	101, 105, 111, 112, 115, 117, 65, 97, 
	76, 108, 76, 108, 45, 73, 105, 68, 
	100, 9, 32, 58, 9, 32, 58, 9, 
	13, 32, 44, 59, 0, 65535, 9, 13, 
	32, 44, 59, 0, 65535, 10, 9, 13, 
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
	48, 57, 46, 48, 57, 46, 58, 86, 
	118, 69, 101, 78, 110, 84, 116, 9, 
	32, 58, 45, 65, 97, 67, 99, 67, 
	99, 69, 101, 83, 115, 83, 115, 45, 
	78, 110, 69, 101, 84, 116, 87, 119, 
	79, 111, 82, 114, 75, 107, 45, 73, 
	105, 78, 110, 70, 102, 79, 111, 9, 
	32, 58, 69, 73, 101, 105, 82, 114, 
	86, 118, 69, 101, 82, 114, 9, 32, 
	58, 80, 112, 45, 69, 73, 101, 105, 
	84, 116, 65, 97, 71, 103, 9, 32, 
	58, 70, 102, 45, 77, 109, 65, 97, 
	84, 116, 67, 99, 72, 104, 9, 32, 
	58, 83, 115, 69, 101, 82, 114, 45, 
	65, 97, 71, 103, 69, 101, 78, 110, 
	84, 116, 9, 32, 58, 0
];

_tsip_machine_parser_header_Str_single_lengths = [
	0, 14, 2, 2, 2, 1, 2, 2, 
	3, 3, 5, 5, 1, 7, 1, 2, 
	6, 10, 6, 1, 2, 5, 9, 1, 
	2, 9, 1, 2, 3, 4, 1, 2, 
	5, 5, 1, 2, 4, 0, 9, 1, 
	2, 2, 2, 2, 1, 3, 0, 1, 
	0, 1, 0, 1, 1, 1, 1, 1, 
	1, 1, 3, 3, 2, 2, 2, 2, 
	2, 0, 3, 3, 3, 0, 1, 1, 
	1, 1, 2, 2, 2, 2, 3, 1, 
	2, 2, 2, 2, 2, 2, 1, 2, 
	2, 2, 2, 2, 2, 2, 1, 2, 
	2, 2, 2, 3, 4, 2, 2, 2, 
	2, 3, 2, 1, 4, 2, 2, 2, 
	3, 2, 1, 2, 2, 2, 2, 2, 
	3, 2, 2, 2, 1, 2, 2, 2, 
	2, 2, 3, 0
];

_tsip_machine_parser_header_Str_range_lengths = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 1, 1, 0, 5, 0, 0, 
	5, 4, 0, 0, 0, 0, 5, 0, 
	0, 5, 0, 0, 0, 2, 0, 0, 
	0, 0, 0, 0, 0, 3, 4, 3, 
	3, 3, 3, 0, 3, 3, 1, 1, 
	1, 1, 1, 1, 1, 0, 1, 0, 
	1, 0, 3, 3, 3, 3, 3, 3, 
	0, 3, 3, 3, 3, 1, 1, 1, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0
];

_tsip_machine_parser_header_Str_index_offsets = [
	0, 0, 15, 18, 21, 24, 26, 29, 
	32, 36, 40, 47, 54, 56, 69, 71, 
	74, 86, 101, 108, 110, 113, 119, 134, 
	136, 139, 154, 156, 159, 163, 170, 172, 
	175, 181, 187, 189, 192, 197, 201, 215, 
	220, 226, 232, 238, 241, 246, 253, 255, 
	258, 260, 263, 265, 268, 271, 273, 276, 
	278, 281, 283, 290, 297, 303, 309, 315, 
	321, 324, 328, 335, 342, 349, 351, 354, 
	357, 359, 361, 364, 367, 370, 373, 377, 
	379, 382, 385, 388, 391, 394, 397, 399, 
	402, 405, 408, 411, 414, 417, 420, 422, 
	425, 428, 431, 434, 438, 443, 446, 449, 
	452, 455, 459, 462, 464, 469, 472, 475, 
	478, 482, 485, 487, 490, 493, 496, 499, 
	502, 506, 509, 512, 515, 517, 520, 523, 
	526, 529, 532, 536
];

_tsip_machine_parser_header_Str_indicies = [
	0, 2, 3, 4, 5, 6, 7, 0, 
	2, 3, 4, 5, 6, 7, 1, 8, 
	8, 1, 9, 9, 1, 10, 10, 1, 
	11, 1, 12, 12, 1, 3, 3, 1, 
	13, 13, 14, 1, 15, 15, 16, 1, 
	18, 19, 18, 20, 20, 17, 1, 22, 
	23, 22, 24, 24, 21, 1, 25, 1, 
	26, 27, 26, 28, 28, 28, 28, 28, 
	28, 28, 28, 28, 1, 29, 1, 30, 
	30, 1, 30, 30, 28, 28, 28, 28, 
	28, 28, 28, 28, 28, 1, 31, 32, 
	31, 33, 33, 33, 34, 34, 35, 33, 
	33, 33, 33, 33, 1, 36, 37, 36, 
	26, 26, 35, 1, 38, 1, 39, 39, 
	1, 39, 39, 26, 26, 35, 1, 35, 
	40, 35, 41, 42, 41, 41, 43, 41, 
	41, 41, 41, 41, 41, 1, 44, 1, 
	45, 45, 1, 45, 46, 45, 41, 42, 
	41, 41, 43, 41, 41, 41, 41, 41, 
	41, 1, 47, 1, 48, 48, 1, 48, 
	48, 42, 1, 42, 49, 50, 51, 42, 
	42, 1, 52, 1, 42, 42, 1, 53, 
	32, 53, 34, 34, 1, 54, 55, 54, 
	26, 26, 1, 56, 1, 57, 57, 1, 
	57, 57, 26, 26, 1, 42, 42, 42, 
	1, 53, 32, 53, 41, 41, 41, 34, 
	34, 41, 41, 41, 41, 41, 1, 59, 
	58, 58, 58, 1, 61, 50, 60, 60, 
	60, 1, 61, 50, 62, 62, 62, 1, 
	61, 50, 63, 63, 63, 1, 61, 50, 
	1, 65, 64, 58, 58, 1, 66, 61, 
	50, 67, 60, 60, 1, 68, 1, 69, 
	70, 1, 71, 1, 72, 73, 1, 74, 
	1, 50, 75, 1, 50, 76, 1, 50, 
	1, 72, 77, 1, 72, 1, 69, 78, 
	1, 69, 1, 66, 61, 50, 79, 62, 
	62, 1, 66, 61, 50, 63, 63, 63, 
	1, 81, 50, 80, 80, 80, 1, 83, 
	50, 82, 82, 82, 1, 83, 50, 84, 
	84, 84, 1, 83, 50, 85, 85, 85, 
	1, 83, 50, 1, 86, 80, 80, 1, 
	66, 83, 50, 87, 82, 82, 1, 66, 
	83, 50, 88, 84, 84, 1, 66, 83, 
	50, 85, 85, 85, 1, 89, 1, 66, 
	90, 1, 66, 91, 1, 66, 1, 65, 
	1, 92, 92, 1, 93, 93, 1, 94, 
	94, 1, 4, 4, 1, 95, 95, 96, 
	1, 97, 1, 98, 98, 1, 99, 99, 
	1, 100, 100, 1, 101, 101, 1, 102, 
	102, 1, 103, 103, 1, 104, 1, 105, 
	105, 1, 106, 106, 1, 107, 107, 1, 
	108, 108, 1, 109, 109, 1, 110, 110, 
	1, 111, 111, 1, 112, 1, 113, 113, 
	1, 114, 114, 1, 115, 115, 1, 116, 
	116, 1, 117, 117, 118, 1, 119, 120, 
	119, 120, 1, 121, 121, 1, 122, 122, 
	1, 123, 123, 1, 124, 124, 1, 125, 
	125, 126, 1, 127, 127, 1, 128, 1, 
	129, 130, 129, 130, 1, 131, 131, 1, 
	132, 132, 1, 133, 133, 1, 134, 134, 
	135, 1, 136, 136, 1, 137, 1, 138, 
	138, 1, 139, 139, 1, 140, 140, 1, 
	141, 141, 1, 142, 142, 1, 143, 143, 
	144, 1, 145, 145, 1, 146, 146, 1, 
	147, 147, 1, 148, 1, 149, 149, 1, 
	150, 150, 1, 151, 151, 1, 152, 152, 
	1, 153, 153, 1, 154, 154, 155, 1, 
	1, 0
];

_tsip_machine_parser_header_Str_trans_targs = [
	2, 0, 74, 8, 78, 79, 100, 121, 
	3, 4, 5, 6, 7, 9, 10, 9, 
	10, 11, 10, 12, 13, 11, 11, 12, 
	13, 131, 13, 14, 17, 15, 16, 18, 
	12, 17, 13, 22, 18, 19, 20, 21, 
	23, 38, 29, 39, 24, 25, 26, 27, 
	28, 30, 32, 37, 31, 33, 33, 34, 
	35, 36, 40, 73, 41, 44, 42, 43, 
	45, 60, 46, 58, 47, 48, 56, 49, 
	50, 54, 51, 52, 53, 55, 57, 59, 
	61, 69, 62, 65, 63, 64, 66, 67, 
	68, 70, 71, 72, 75, 76, 77, 9, 
	10, 80, 81, 82, 83, 84, 85, 86, 
	87, 88, 89, 90, 91, 92, 93, 94, 
	95, 96, 97, 98, 99, 9, 10, 101, 
	106, 102, 103, 104, 105, 9, 10, 107, 
	108, 109, 113, 110, 111, 112, 9, 10, 
	114, 115, 116, 117, 118, 119, 120, 9, 
	10, 122, 123, 124, 125, 126, 127, 128, 
	129, 130, 9, 10
];

_tsip_machine_parser_header_Str_trans_actions = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 3, 3, 0, 
	0, 1, 23, 23, 23, 0, 17, 17, 
	17, 21, 0, 0, 1, 0, 0, 19, 
	19, 0, 19, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 19, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 5, 
	5, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 7, 7, 0, 
	0, 0, 0, 0, 0, 9, 9, 0, 
	0, 0, 0, 0, 0, 0, 11, 11, 
	0, 0, 0, 0, 0, 0, 0, 13, 
	13, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 15, 15
];

tsip_machine_parser_header_Str_start = 1;
tsip_machine_parser_header_Str_first_final = 131;
tsip_machine_parser_header_Str_error = 0;

tsip_machine_parser_header_Str_en_main = 1;


/* line 81 "./ragel/tsip_parser_header_Str.jrl" */

function tsip_header_Str(e_type, s_value){
	tsip_header.call(this, e_type);
    this.s_value = s_value;
}

tsip_header_Str.prototype.toString = function(){
    return this.s_value;
};

tsip_header_Str.prototype.Parse = function(s_str){
    var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;	
	var o_hdr = null;
	
	
/* line 339 "./src/headers/tsip_header_Str.js" */
{
	 cs = tsip_machine_parser_header_Str_start;
} /* JSCodeGen::writeInit */

/* line 101 "./ragel/tsip_parser_header_Str.jrl" */
	
/* line 346 "./src/headers/tsip_header_Str.js" */
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
	_keys = _tsip_machine_parser_header_Str_key_offsets[cs];
	_trans = _tsip_machine_parser_header_Str_index_offsets[cs];
	_klen = _tsip_machine_parser_header_Str_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsip_machine_parser_header_Str_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsip_machine_parser_header_Str_trans_keys[_mid]) {
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
	  _klen = _tsip_machine_parser_header_Str_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsip_machine_parser_header_Str_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsip_machine_parser_header_Str_trans_keys[_mid+1]) {
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
	_trans = _tsip_machine_parser_header_Str_indicies[_trans];
	cs = _tsip_machine_parser_header_Str_trans_targs[_trans];
	if (_tsip_machine_parser_header_Str_trans_actions[_trans] != 0) {
		_acts = _tsip_machine_parser_header_Str_trans_actions[_trans];
		_nacts = _tsip_machine_parser_header_Str_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsip_machine_parser_header_Str_actions[_acts - 1]) {
case 0:
/* line 38 "./ragel/tsip_parser_header_Str.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 42 "./ragel/tsip_parser_header_Str.jrl" */
 o_hdr = new  tsip_header_Call_ID(); 		break;
case 2:
/* line 43 "./ragel/tsip_parser_header_Str.jrl" */
 o_hdr = new  tsip_header_Event(); 		break;
case 3:
/* line 44 "./ragel/tsip_parser_header_Str.jrl" */
 o_hdr = new tsip_header_P_Access_Network_Info(); 		break;
case 4:
/* line 45 "./ragel/tsip_parser_header_Str.jrl" */
 o_hdr = new tsip_header_Server(); 		break;
case 5:
/* line 46 "./ragel/tsip_parser_header_Str.jrl" */
 o_hdr = new tsip_header_SIP_ETag(); 		break;
case 6:
/* line 47 "./ragel/tsip_parser_header_Str.jrl" */
 o_hdr = new tsip_header_SIP_If_Match(); 		break;
case 7:
/* line 48 "./ragel/tsip_parser_header_Str.jrl" */
 o_hdr = new tsip_header_User_Agent(); 		break;
case 8:
/* line 50 "./ragel/tsip_parser_header_Str.jrl" */

		if(o_hdr){
			o_hdr.s_value = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
		}
			break;
case 9:
/* line 56 "./ragel/tsip_parser_header_Str.jrl" */

		if(o_hdr){
			tsk_ragel_add_param(s_str, p, i_tag_start, o_hdr.ao_params);
		}
			break;
case 10:
/* line 62 "./ragel/tsip_parser_header_Str.jrl" */
 		break;
/* line 473 "./src/headers/tsip_header_Str.js" */
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

/* line 102 "./ragel/tsip_parser_header_Str.jrl" */
	
	if( cs < 
/* line 503 "./src/headers/tsip_header_Str.js" */
131
/* line 103 "./ragel/tsip_parser_header_Str.jrl" */
 ){
		tsk_utils_log_error("Failed to parse header: " + s_str);
		return null;
	}
	
	return o_hdr;
}

function tsip_header_Call_ID(s_value){ tsip_header_Str.call(this, tsip_header_type_e.Call_ID, s_value); }
function tsip_header_Event(s_value){ tsip_header_Str.call(this, tsip_header_type_e.Event, s_value); }
function tsip_header_P_Access_Network_Info(s_value){ tsip_header_Str.call(this, tsip_header_type_e.P_Access_Network_Info, s_value); }
function tsip_header_Server(s_value){ tsip_header_Str.call(this, tsip_header_type_e.Server, s_value); }
function tsip_header_SIP_ETag(s_value){ tsip_header_Str.call(this, tsip_header_type_e.SIP_ETag, s_value); }
function tsip_header_SIP_If_Match(s_value){ tsip_header_Str.call(this, tsip_header_type_e.SIP_If_Match, s_value); }
function tsip_header_User_Agent(s_value){ tsip_header_Str.call(this, tsip_header_type_e.User_Agent, s_value); }