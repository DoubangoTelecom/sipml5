
/* line 1 "./ragel/tsip_parser_header_From.jrl" */
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

/* line 68 "./ragel/tsip_parser_header_From.jrl" */




/* line 30 "./src/headers/tsip_header_From.js" */
const _tsip_machine_parser_header_From_actions = [
	0, 1, 0, 1, 1, 1, 2, 1, 
	3, 1, 4, 1, 5
];

const _tsip_machine_parser_header_From_key_offsets = [
	0, 0, 2, 7, 10, 31, 32, 34, 
	55, 56, 58, 61, 65, 77, 80, 82, 
	85, 89, 93, 94, 96, 99, 118, 119, 
	121, 139, 158, 163, 164, 166, 170, 189, 
	190, 192, 211, 212, 214, 217, 225, 226, 
	228, 232, 233, 239, 257, 264, 272, 280, 
	288, 290, 297, 306, 308, 311, 313, 316, 
	318, 321, 324, 325, 328, 329, 332, 333, 
	342, 351, 359, 367, 375, 383, 385, 391, 
	400, 409, 418, 420, 423, 426, 427, 428, 
	449, 470, 489, 494, 495, 497, 501, 520, 
	521, 523, 542, 560, 577, 595, 599, 600, 
	602, 610, 611, 613, 617, 623, 643, 662, 
	667, 669, 675, 677, 679
];

const _tsip_machine_parser_header_From_trans_keys = [
	70, 102, 9, 32, 58, 82, 114, 9, 
	32, 58, 9, 13, 32, 33, 34, 37, 
	39, 60, 126, 42, 43, 45, 46, 48, 
	57, 65, 90, 95, 96, 97, 122, 10, 
	9, 32, 9, 13, 32, 33, 34, 37, 
	39, 60, 126, 42, 43, 45, 46, 48, 
	57, 65, 90, 95, 96, 97, 122, 10, 
	9, 32, 9, 32, 60, 65, 90, 97, 
	122, 9, 32, 43, 58, 45, 46, 48, 
	57, 65, 90, 97, 122, 9, 32, 58, 
	0, 65535, 62, 0, 65535, 9, 13, 32, 
	59, 9, 13, 32, 59, 10, 9, 32, 
	9, 32, 59, 9, 13, 32, 33, 37, 
	39, 84, 116, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 10, 9, 
	32, 9, 32, 33, 37, 39, 84, 116, 
	126, 42, 43, 45, 46, 48, 57, 65, 
	90, 95, 122, 9, 13, 32, 33, 37, 
	39, 59, 61, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 9, 13, 
	32, 59, 61, 10, 9, 32, 9, 32, 
	59, 61, 9, 13, 32, 33, 34, 37, 
	39, 91, 126, 42, 43, 45, 46, 48, 
	57, 65, 90, 95, 122, 10, 9, 32, 
	9, 13, 32, 33, 34, 37, 39, 91, 
	126, 42, 43, 45, 46, 48, 57, 65, 
	90, 95, 122, 10, 9, 32, 9, 32, 
	34, 9, 13, 34, 92, 32, 126, 128, 
	255, 10, 9, 32, 9, 13, 32, 59, 
	10, 0, 9, 11, 12, 14, 127, 9, 
	13, 32, 33, 37, 39, 59, 126, 42, 
	43, 45, 46, 48, 57, 65, 90, 95, 
	122, 58, 48, 57, 65, 70, 97, 102, 
	58, 93, 48, 57, 65, 70, 97, 102, 
	58, 93, 48, 57, 65, 70, 97, 102, 
	58, 93, 48, 57, 65, 70, 97, 102, 
	58, 93, 58, 48, 57, 65, 70, 97, 
	102, 46, 58, 93, 48, 57, 65, 70, 
	97, 102, 48, 57, 46, 48, 57, 48, 
	57, 46, 48, 57, 48, 57, 93, 48, 
	57, 93, 48, 57, 93, 46, 48, 57, 
	46, 46, 48, 57, 46, 46, 58, 93, 
	48, 57, 65, 70, 97, 102, 46, 58, 
	93, 48, 57, 65, 70, 97, 102, 58, 
	93, 48, 57, 65, 70, 97, 102, 58, 
	93, 48, 57, 65, 70, 97, 102, 58, 
	93, 48, 57, 65, 70, 97, 102, 58, 
	93, 48, 57, 65, 70, 97, 102, 58, 
	93, 48, 57, 65, 70, 97, 102, 46, 
	58, 93, 48, 57, 65, 70, 97, 102, 
	46, 58, 93, 48, 57, 65, 70, 97, 
	102, 46, 58, 93, 48, 57, 65, 70, 
	97, 102, 48, 57, 46, 48, 57, 46, 
	48, 57, 46, 58, 9, 13, 32, 33, 
	37, 39, 59, 61, 65, 97, 126, 42, 
	43, 45, 46, 48, 57, 66, 90, 95, 
	122, 9, 13, 32, 33, 37, 39, 59, 
	61, 71, 103, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 9, 13, 
	32, 33, 37, 39, 59, 61, 126, 42, 
	43, 45, 46, 48, 57, 65, 90, 95, 
	122, 9, 13, 32, 59, 61, 10, 9, 
	32, 9, 32, 59, 61, 9, 13, 32, 
	33, 34, 37, 39, 91, 126, 42, 43, 
	45, 46, 48, 57, 65, 90, 95, 122, 
	10, 9, 32, 9, 13, 32, 33, 34, 
	37, 39, 91, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 9, 13, 
	32, 33, 37, 39, 59, 126, 42, 43, 
	45, 46, 48, 57, 65, 90, 95, 122, 
	9, 13, 32, 33, 37, 39, 126, 42, 
	43, 45, 46, 48, 57, 65, 90, 95, 
	122, 9, 13, 32, 33, 37, 39, 60, 
	126, 42, 43, 45, 46, 48, 57, 65, 
	90, 95, 122, 9, 13, 32, 60, 10, 
	9, 32, 9, 13, 34, 92, 32, 126, 
	128, 255, 10, 9, 32, 9, 13, 32, 
	60, 0, 9, 11, 12, 14, 127, 9, 
	13, 32, 33, 37, 39, 42, 43, 58, 
	126, 45, 46, 48, 57, 65, 90, 95, 
	96, 97, 122, 9, 13, 32, 33, 37, 
	39, 58, 60, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 9, 13, 
	32, 58, 60, 0, 65535, 9, 13, 32, 
	59, 0, 65535, 79, 111, 77, 109, 0
];

const _tsip_machine_parser_header_From_single_lengths = [
	0, 2, 5, 3, 9, 1, 2, 9, 
	1, 2, 3, 0, 4, 3, 0, 1, 
	4, 4, 1, 2, 3, 9, 1, 2, 
	8, 9, 5, 1, 2, 4, 9, 1, 
	2, 9, 1, 2, 3, 4, 1, 2, 
	4, 1, 0, 8, 1, 2, 2, 2, 
	2, 1, 3, 0, 1, 0, 1, 0, 
	1, 1, 1, 1, 1, 1, 1, 3, 
	3, 2, 2, 2, 2, 2, 0, 3, 
	3, 3, 0, 1, 1, 1, 1, 11, 
	11, 9, 5, 1, 2, 4, 9, 1, 
	2, 9, 8, 7, 8, 4, 1, 2, 
	4, 1, 2, 4, 0, 10, 9, 5, 
	0, 4, 2, 2, 0
];

const _tsip_machine_parser_header_From_range_lengths = [
	0, 0, 0, 0, 6, 0, 0, 6, 
	0, 0, 0, 2, 4, 0, 1, 1, 
	0, 0, 0, 0, 0, 5, 0, 0, 
	5, 5, 0, 0, 0, 0, 5, 0, 
	0, 5, 0, 0, 0, 2, 0, 0, 
	0, 0, 3, 5, 3, 3, 3, 3, 
	0, 3, 3, 1, 1, 1, 1, 1, 
	1, 1, 0, 1, 0, 1, 0, 3, 
	3, 3, 3, 3, 3, 0, 3, 3, 
	3, 3, 1, 1, 1, 0, 0, 5, 
	5, 5, 0, 0, 0, 0, 5, 0, 
	0, 5, 5, 5, 5, 0, 0, 0, 
	2, 0, 0, 0, 3, 5, 5, 0, 
	1, 1, 0, 0, 0
];

const _tsip_machine_parser_header_From_index_offsets = [
	0, 0, 3, 9, 13, 29, 31, 34, 
	50, 52, 55, 59, 62, 71, 75, 77, 
	80, 85, 90, 92, 95, 99, 114, 116, 
	119, 133, 148, 154, 156, 159, 164, 179, 
	181, 184, 199, 201, 204, 208, 215, 217, 
	220, 225, 227, 231, 245, 250, 256, 262, 
	268, 271, 276, 283, 285, 288, 290, 293, 
	295, 298, 301, 303, 306, 308, 311, 313, 
	320, 327, 333, 339, 345, 351, 354, 358, 
	365, 372, 379, 381, 384, 387, 389, 391, 
	408, 425, 440, 446, 448, 451, 456, 471, 
	473, 476, 491, 505, 518, 532, 537, 539, 
	542, 549, 551, 554, 559, 563, 579, 594, 
	600, 602, 608, 611, 614
];

const _tsip_machine_parser_header_From_indicies = [
	0, 0, 1, 2, 2, 3, 4, 4, 
	1, 2, 2, 3, 1, 3, 5, 3, 
	6, 7, 6, 6, 8, 6, 6, 6, 
	6, 9, 6, 9, 1, 10, 1, 11, 
	11, 1, 11, 12, 11, 6, 7, 6, 
	6, 8, 6, 6, 6, 6, 9, 6, 
	9, 1, 13, 1, 14, 14, 1, 14, 
	14, 8, 1, 15, 15, 1, 16, 16, 
	17, 18, 17, 17, 17, 17, 1, 16, 
	16, 18, 1, 19, 1, 20, 19, 1, 
	21, 22, 21, 23, 1, 21, 24, 21, 
	23, 1, 25, 1, 26, 26, 1, 26, 
	26, 23, 1, 23, 27, 23, 28, 28, 
	28, 29, 29, 28, 28, 28, 28, 28, 
	28, 1, 30, 1, 31, 31, 1, 31, 
	31, 28, 28, 28, 29, 29, 28, 28, 
	28, 28, 28, 28, 1, 32, 33, 32, 
	34, 34, 34, 35, 36, 34, 34, 34, 
	34, 34, 34, 1, 37, 38, 37, 23, 
	36, 1, 39, 1, 40, 40, 1, 40, 
	40, 23, 36, 1, 36, 41, 36, 42, 
	43, 42, 42, 44, 42, 42, 42, 42, 
	42, 42, 1, 45, 1, 46, 46, 1, 
	46, 47, 46, 42, 43, 42, 42, 44, 
	42, 42, 42, 42, 42, 42, 1, 48, 
	1, 49, 49, 1, 49, 49, 43, 1, 
	43, 50, 51, 52, 43, 43, 1, 53, 
	1, 43, 43, 1, 54, 33, 54, 35, 
	1, 55, 1, 43, 43, 43, 1, 54, 
	33, 54, 42, 42, 42, 35, 42, 42, 
	42, 42, 42, 42, 1, 57, 56, 56, 
	56, 1, 59, 51, 58, 58, 58, 1, 
	59, 51, 60, 60, 60, 1, 59, 51, 
	61, 61, 61, 1, 59, 51, 1, 63, 
	62, 56, 56, 1, 64, 59, 51, 65, 
	58, 58, 1, 66, 1, 67, 68, 1, 
	69, 1, 70, 71, 1, 72, 1, 51, 
	73, 1, 51, 74, 1, 51, 1, 70, 
	75, 1, 70, 1, 67, 76, 1, 67, 
	1, 64, 59, 51, 77, 60, 60, 1, 
	64, 59, 51, 61, 61, 61, 1, 79, 
	51, 78, 78, 78, 1, 81, 51, 80, 
	80, 80, 1, 81, 51, 82, 82, 82, 
	1, 81, 51, 83, 83, 83, 1, 81, 
	51, 1, 84, 78, 78, 1, 64, 81, 
	51, 85, 80, 80, 1, 64, 81, 51, 
	86, 82, 82, 1, 64, 81, 51, 83, 
	83, 83, 1, 87, 1, 64, 88, 1, 
	64, 89, 1, 64, 1, 63, 1, 32, 
	33, 32, 34, 34, 34, 35, 36, 90, 
	90, 34, 34, 34, 34, 34, 34, 1, 
	32, 33, 32, 34, 34, 34, 35, 36, 
	91, 91, 34, 34, 34, 34, 34, 34, 
	1, 92, 33, 92, 34, 34, 34, 35, 
	93, 34, 34, 34, 34, 34, 34, 1, 
	94, 95, 94, 23, 93, 1, 96, 1, 
	97, 97, 1, 97, 97, 23, 93, 1, 
	93, 98, 93, 99, 43, 99, 99, 44, 
	99, 99, 99, 99, 99, 99, 1, 100, 
	1, 101, 101, 1, 101, 47, 101, 99, 
	43, 99, 99, 44, 99, 99, 99, 99, 
	99, 99, 1, 102, 103, 102, 104, 104, 
	104, 105, 104, 104, 104, 104, 104, 104, 
	1, 106, 107, 106, 108, 108, 108, 108, 
	108, 108, 108, 108, 108, 1, 109, 110, 
	109, 108, 108, 108, 111, 108, 108, 108, 
	108, 108, 108, 1, 112, 12, 112, 8, 
	1, 113, 1, 106, 106, 1, 114, 115, 
	116, 117, 114, 114, 1, 118, 1, 114, 
	114, 1, 109, 110, 109, 111, 1, 114, 
	114, 114, 1, 119, 107, 119, 108, 108, 
	108, 108, 120, 121, 108, 120, 120, 120, 
	108, 120, 1, 122, 110, 122, 108, 108, 
	108, 121, 111, 108, 108, 108, 108, 108, 
	108, 1, 123, 12, 123, 121, 8, 1, 
	124, 1, 125, 126, 125, 127, 124, 1, 
	128, 128, 1, 2, 2, 1, 1, 0
];

const _tsip_machine_parser_header_From_trans_targs = [
	2, 0, 3, 4, 106, 5, 91, 96, 
	11, 101, 6, 7, 8, 9, 10, 12, 
	13, 12, 14, 15, 16, 17, 41, 21, 
	18, 19, 20, 22, 25, 79, 23, 24, 
	26, 41, 25, 21, 30, 26, 27, 28, 
	29, 31, 43, 37, 44, 32, 33, 34, 
	35, 36, 38, 40, 42, 39, 17, 108, 
	45, 78, 46, 49, 47, 48, 50, 65, 
	51, 63, 52, 53, 61, 54, 55, 59, 
	56, 57, 58, 60, 62, 64, 66, 74, 
	67, 70, 68, 69, 71, 72, 73, 75, 
	76, 77, 80, 81, 82, 86, 82, 83, 
	84, 85, 87, 90, 88, 89, 17, 41, 
	90, 21, 92, 94, 91, 93, 8, 11, 
	93, 95, 96, 97, 99, 100, 98, 102, 
	101, 104, 103, 103, 105, 17, 41, 21, 
	107
];

const _tsip_machine_parser_header_From_trans_actions = [
	0, 0, 0, 0, 0, 0, 1, 1, 
	0, 1, 0, 0, 0, 0, 0, 1, 
	0, 0, 0, 0, 3, 0, 0, 0, 
	0, 0, 0, 0, 1, 1, 0, 0, 
	9, 9, 0, 9, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 9, 11, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 9, 0, 0, 0, 
	0, 0, 0, 1, 0, 0, 7, 7, 
	0, 7, 0, 0, 0, 5, 5, 5, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 5, 0, 0, 3, 3, 3, 
	0
];

const tsip_machine_parser_header_From_start = 1;
const tsip_machine_parser_header_From_first_final = 108;
const tsip_machine_parser_header_From_error = 0;

const tsip_machine_parser_header_From_en_main = 1;


/* line 72 "./ragel/tsip_parser_header_From.jrl" */

function tsip_header_From(s_display_name, o_uri, s_tag){
    this.__proto__.__proto__ = new tsip_header(tsip_header_type_e.From);
    this.s_display_name = tsk_strdup(s_display_name);
	this.o_uri = o_uri;
	this.s_tag = tsk_strdup(s_tag);
    this.toString = function(){
        var s_str = tsip_uri_tostring(this.o_uri, true, true);
        if(s_str && this.s_tag){
            s_str += tsk_string_format(";tag={0}", this.s_tag);
        }
        return s_str;
    }
}

function tsip_header_From_create_null(){
    return tsip_header_From_create(null, null, null);
}


tsip_header_From.prototype.Parse = function(s_str){
    var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;	
	var hdr_from = new tsip_header_From(null, null, null);
	
	
/* line 350 "./src/headers/tsip_header_From.js" */
{
	 cs = tsip_machine_parser_header_From_start;
} /* JSCodeGen::writeInit */

/* line 102 "./ragel/tsip_parser_header_From.jrl" */
	
/* line 357 "./src/headers/tsip_header_From.js" */
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
	_keys = _tsip_machine_parser_header_From_key_offsets[cs];
	_trans = _tsip_machine_parser_header_From_index_offsets[cs];
	_klen = _tsip_machine_parser_header_From_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsip_machine_parser_header_From_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsip_machine_parser_header_From_trans_keys[_mid]) {
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
	  _klen = _tsip_machine_parser_header_From_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsip_machine_parser_header_From_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsip_machine_parser_header_From_trans_keys[_mid+1]) {
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
	_trans = _tsip_machine_parser_header_From_indicies[_trans];
	cs = _tsip_machine_parser_header_From_trans_targs[_trans];
	if (_tsip_machine_parser_header_From_trans_actions[_trans] != 0) {
		_acts = _tsip_machine_parser_header_From_trans_actions[_trans];
		_nacts = _tsip_machine_parser_header_From_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsip_machine_parser_header_From_actions[_acts - 1]) {
case 0:
/* line 27 "./ragel/tsip_parser_header_From.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 31 "./ragel/tsip_parser_header_From.jrl" */

	    if(!hdr_from.o_uri){
		    var s_uri = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			if((hdr_from.o_uri = tsip_uri.prototype.Parse(s_uri)) && hdr_from.s_display_name){
				hdr_from.o_uri.s_display_name = tsk_strdup(hdr_from.s_display_name);
			}
		}
			break;
case 2:
/* line 40 "./ragel/tsip_parser_header_From.jrl" */

		hdr_from.s_display_name = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
        hdr_from.s_display_name = tsk_string_unquote_2(hdr_from.s_display_name);
			break;
case 3:
/* line 45 "./ragel/tsip_parser_header_From.jrl" */

	    hdr_from.s_tag = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			break;
case 4:
/* line 49 "./ragel/tsip_parser_header_From.jrl" */

	    tsk_ragel_add_param(s_str, p, i_tag_start, hdr_from.ao_params);
			break;
case 5:
/* line 53 "./ragel/tsip_parser_header_From.jrl" */

			break;
/* line 476 "./src/headers/tsip_header_From.js" */
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

/* line 103 "./ragel/tsip_parser_header_From.jrl" */
	
	if( cs < 
/* line 506 "./src/headers/tsip_header_From.js" */
108
/* line 104 "./ragel/tsip_parser_header_From.jrl" */
 ){
		console.error("Failed to parse 'From' header: %s", s_str);
		return null;
	}
	
	return hdr_from;
}