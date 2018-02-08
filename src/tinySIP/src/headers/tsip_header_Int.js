
/* line 1 "./ragel/tsip_parser_header_Int.jrl" */
/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/

var TSIP_HEADER_MAX_FORWARDS_DEFAULT = 70;

// Parse headers: 'Content-Length', 'Expires', 'Max-Forwards', 'Min-Expires', 'Min-SE', 'RSeq'
tsip_header_Int.prototype = Object.create(tsip_header.prototype);
tsip_header_Content_Length.prototype = Object.create(tsip_header_Int.prototype);
tsip_header_Expires.prototype = Object.create(tsip_header_Int.prototype);
tsip_header_Max_Forwards.prototype = Object.create(tsip_header_Int.prototype);
tsip_header_Min_Expires.prototype = Object.create(tsip_header_Int.prototype);
tsip_header_Min_SE.prototype = Object.create(tsip_header_Int.prototype);
tsip_header_RSeq.prototype = Object.create(tsip_header_Int.prototype);


/* line 62 "./ragel/tsip_parser_header_Int.jrl" */



/* line 26 "./src/headers/tsip_header_Int.js" */
_tsip_machine_parser_header_Int_actions = [
	0, 1, 0, 1, 1, 1, 2, 1, 
	3, 1, 4, 1, 5, 1, 6, 1, 
	7, 1, 8, 1, 9
];

_tsip_machine_parser_header_Int_key_offsets = [
	0, 0, 10, 12, 14, 16, 18, 20, 
	22, 23, 25, 27, 29, 31, 33, 35, 
	38, 41, 46, 47, 49, 53, 60, 65, 
	66, 68, 72, 89, 90, 92, 108, 126, 
	132, 133, 135, 140, 159, 160, 162, 181, 
	182, 184, 187, 195, 196, 198, 203, 204, 
	210, 227, 234, 242, 250, 258, 260, 267, 
	276, 278, 281, 283, 286, 288, 291, 294, 
	295, 298, 299, 302, 303, 312, 321, 329, 
	337, 345, 353, 355, 361, 370, 379, 388, 
	390, 393, 396, 397, 398, 400, 402, 404, 
	406, 408, 410, 413, 417, 419, 420, 422, 
	424, 426, 428, 430, 432, 434, 436, 439, 
	441, 442, 446, 448, 450, 452, 454, 456, 
	458, 461, 463, 466, 468, 470, 472, 475
];

_tsip_machine_parser_header_Int_trans_keys = [
	67, 69, 76, 77, 82, 99, 101, 108, 
	109, 114, 79, 111, 78, 110, 84, 116, 
	69, 101, 78, 110, 84, 116, 45, 76, 
	108, 69, 101, 78, 110, 71, 103, 84, 
	116, 72, 104, 9, 32, 58, 9, 32, 
	58, 9, 13, 32, 48, 57, 10, 9, 
	32, 9, 32, 48, 57, 9, 13, 32, 
	44, 59, 48, 57, 9, 13, 32, 44, 
	59, 10, 9, 32, 9, 32, 44, 59, 
	9, 13, 32, 33, 37, 39, 126, 42, 
	43, 45, 46, 48, 57, 65, 90, 95, 
	122, 10, 9, 32, 9, 32, 33, 37, 
	39, 126, 42, 43, 45, 46, 48, 57, 
	65, 90, 95, 122, 9, 13, 32, 33, 
	37, 39, 44, 59, 61, 126, 42, 46, 
	48, 57, 65, 90, 95, 122, 9, 13, 
	32, 44, 59, 61, 10, 9, 32, 9, 
	32, 44, 59, 61, 9, 13, 32, 33, 
	34, 37, 39, 91, 126, 42, 43, 45, 
	46, 48, 57, 65, 90, 95, 122, 10, 
	9, 32, 9, 13, 32, 33, 34, 37, 
	39, 91, 126, 42, 43, 45, 46, 48, 
	57, 65, 90, 95, 122, 10, 9, 32, 
	9, 32, 34, 9, 13, 34, 92, 32, 
	126, 128, 255, 10, 9, 32, 9, 13, 
	32, 44, 59, 10, 0, 9, 11, 12, 
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
	57, 46, 48, 57, 46, 58, 88, 120, 
	80, 112, 73, 105, 82, 114, 69, 101, 
	83, 115, 9, 32, 58, 65, 73, 97, 
	105, 88, 120, 45, 70, 102, 79, 111, 
	82, 114, 87, 119, 65, 97, 82, 114, 
	68, 100, 83, 115, 9, 32, 58, 78, 
	110, 45, 69, 83, 101, 115, 88, 120, 
	80, 112, 73, 105, 82, 114, 69, 101, 
	83, 115, 9, 32, 58, 69, 101, 9, 
	32, 58, 83, 115, 69, 101, 81, 113, 
	9, 32, 58, 0
];

_tsip_machine_parser_header_Int_single_lengths = [
	0, 10, 2, 2, 2, 2, 2, 2, 
	1, 2, 2, 2, 2, 2, 2, 3, 
	3, 3, 1, 2, 2, 5, 5, 1, 
	2, 4, 7, 1, 2, 6, 10, 6, 
	1, 2, 5, 9, 1, 2, 9, 1, 
	2, 3, 4, 1, 2, 5, 1, 0, 
	9, 1, 2, 2, 2, 2, 1, 3, 
	0, 1, 0, 1, 0, 1, 1, 1, 
	1, 1, 1, 1, 3, 3, 2, 2, 
	2, 2, 2, 0, 3, 3, 3, 0, 
	1, 1, 1, 1, 2, 2, 2, 2, 
	2, 2, 3, 4, 2, 1, 2, 2, 
	2, 2, 2, 2, 2, 2, 3, 2, 
	1, 4, 2, 2, 2, 2, 2, 2, 
	3, 2, 3, 2, 2, 2, 3, 0
];

_tsip_machine_parser_header_Int_range_lengths = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 1, 0, 0, 1, 1, 0, 0, 
	0, 0, 5, 0, 0, 5, 4, 0, 
	0, 0, 0, 5, 0, 0, 5, 0, 
	0, 0, 2, 0, 0, 0, 0, 3, 
	4, 3, 3, 3, 3, 0, 3, 3, 
	1, 1, 1, 1, 1, 1, 1, 0, 
	1, 0, 1, 0, 3, 3, 3, 3, 
	3, 3, 0, 3, 3, 3, 3, 1, 
	1, 1, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0
];

_tsip_machine_parser_header_Int_index_offsets = [
	0, 0, 11, 14, 17, 20, 23, 26, 
	29, 31, 34, 37, 40, 43, 46, 49, 
	53, 57, 62, 64, 67, 71, 78, 84, 
	86, 89, 94, 107, 109, 112, 124, 139, 
	146, 148, 151, 157, 172, 174, 177, 192, 
	194, 197, 201, 208, 210, 213, 219, 221, 
	225, 239, 244, 250, 256, 262, 265, 270, 
	277, 279, 282, 284, 287, 289, 292, 295, 
	297, 300, 302, 305, 307, 314, 321, 327, 
	333, 339, 345, 348, 352, 359, 366, 373, 
	375, 378, 381, 383, 385, 388, 391, 394, 
	397, 400, 403, 407, 412, 415, 417, 420, 
	423, 426, 429, 432, 435, 438, 441, 445, 
	448, 450, 455, 458, 461, 464, 467, 470, 
	473, 477, 480, 484, 487, 490, 493, 497
];

_tsip_machine_parser_header_Int_indicies = [
	0, 2, 3, 4, 5, 0, 2, 3, 
	4, 5, 1, 6, 6, 1, 7, 7, 
	1, 8, 8, 1, 9, 9, 1, 10, 
	10, 1, 11, 11, 1, 12, 1, 13, 
	13, 1, 14, 14, 1, 15, 15, 1, 
	16, 16, 1, 17, 17, 1, 3, 3, 
	1, 18, 18, 19, 1, 20, 20, 21, 
	1, 21, 22, 21, 23, 1, 24, 1, 
	25, 25, 1, 25, 25, 23, 1, 26, 
	27, 26, 28, 28, 29, 1, 30, 31, 
	30, 32, 32, 1, 33, 1, 34, 34, 
	1, 34, 34, 32, 32, 1, 32, 35, 
	32, 36, 36, 36, 36, 36, 36, 36, 
	36, 36, 1, 37, 1, 38, 38, 1, 
	38, 38, 36, 36, 36, 36, 36, 36, 
	36, 36, 36, 1, 39, 40, 39, 41, 
	41, 41, 42, 42, 43, 41, 41, 41, 
	41, 41, 1, 44, 45, 44, 32, 32, 
	43, 1, 46, 1, 47, 47, 1, 47, 
	47, 32, 32, 43, 1, 43, 48, 43, 
	49, 50, 49, 49, 51, 49, 49, 49, 
	49, 49, 49, 1, 52, 1, 53, 53, 
	1, 53, 54, 53, 49, 50, 49, 49, 
	51, 49, 49, 49, 49, 49, 49, 1, 
	55, 1, 56, 56, 1, 56, 56, 50, 
	1, 50, 57, 58, 59, 50, 50, 1, 
	60, 1, 50, 50, 1, 61, 40, 61, 
	42, 42, 1, 62, 1, 50, 50, 50, 
	1, 61, 40, 61, 49, 49, 49, 42, 
	42, 49, 49, 49, 49, 49, 1, 64, 
	63, 63, 63, 1, 66, 58, 65, 65, 
	65, 1, 66, 58, 67, 67, 67, 1, 
	66, 58, 68, 68, 68, 1, 66, 58, 
	1, 70, 69, 63, 63, 1, 71, 66, 
	58, 72, 65, 65, 1, 73, 1, 74, 
	75, 1, 76, 1, 77, 78, 1, 79, 
	1, 58, 80, 1, 58, 81, 1, 58, 
	1, 77, 82, 1, 77, 1, 74, 83, 
	1, 74, 1, 71, 66, 58, 84, 67, 
	67, 1, 71, 66, 58, 68, 68, 68, 
	1, 86, 58, 85, 85, 85, 1, 88, 
	58, 87, 87, 87, 1, 88, 58, 89, 
	89, 89, 1, 88, 58, 90, 90, 90, 
	1, 88, 58, 1, 91, 85, 85, 1, 
	71, 88, 58, 92, 87, 87, 1, 71, 
	88, 58, 93, 89, 89, 1, 71, 88, 
	58, 90, 90, 90, 1, 94, 1, 71, 
	95, 1, 71, 96, 1, 71, 1, 70, 
	1, 97, 97, 1, 98, 98, 1, 99, 
	99, 1, 100, 100, 1, 101, 101, 1, 
	102, 102, 1, 103, 103, 104, 1, 105, 
	106, 105, 106, 1, 107, 107, 1, 108, 
	1, 109, 109, 1, 110, 110, 1, 111, 
	111, 1, 112, 112, 1, 113, 113, 1, 
	114, 114, 1, 115, 115, 1, 116, 116, 
	1, 117, 117, 118, 1, 119, 119, 1, 
	120, 1, 121, 122, 121, 122, 1, 123, 
	123, 1, 124, 124, 1, 125, 125, 1, 
	126, 126, 1, 127, 127, 1, 128, 128, 
	1, 129, 129, 130, 1, 131, 131, 1, 
	132, 132, 133, 1, 134, 134, 1, 135, 
	135, 1, 136, 136, 1, 137, 137, 138, 
	1, 1, 0
];

_tsip_machine_parser_header_Int_trans_targs = [
	2, 0, 84, 15, 91, 115, 3, 4, 
	5, 6, 7, 8, 9, 10, 11, 12, 
	13, 14, 16, 17, 16, 17, 18, 21, 
	19, 20, 22, 46, 26, 21, 22, 23, 
	26, 24, 25, 27, 30, 28, 29, 31, 
	46, 30, 26, 35, 31, 32, 33, 34, 
	36, 48, 42, 49, 37, 38, 39, 40, 
	41, 43, 45, 47, 44, 22, 119, 50, 
	83, 51, 54, 52, 53, 55, 70, 56, 
	68, 57, 58, 66, 59, 60, 64, 61, 
	62, 63, 65, 67, 69, 71, 79, 72, 
	75, 73, 74, 76, 77, 78, 80, 81, 
	82, 85, 86, 87, 88, 89, 90, 16, 
	17, 92, 103, 93, 94, 95, 96, 97, 
	98, 99, 100, 101, 102, 16, 17, 104, 
	105, 106, 113, 107, 108, 109, 110, 111, 
	112, 16, 17, 114, 16, 17, 116, 117, 
	118, 16, 17
];

_tsip_machine_parser_header_Int_trans_actions = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 7, 7, 0, 0, 0, 1, 
	0, 0, 3, 3, 3, 0, 0, 0, 
	0, 0, 0, 0, 1, 0, 0, 5, 
	5, 0, 5, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 5, 19, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 9, 
	9, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 11, 11, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 13, 13, 0, 15, 15, 0, 0, 
	0, 17, 17
];

tsip_machine_parser_header_Int_start = 1;
tsip_machine_parser_header_Int_first_final = 119;
tsip_machine_parser_header_Int_error = 0;

tsip_machine_parser_header_Int_en_main = 1;


/* line 65 "./ragel/tsip_parser_header_Int.jrl" */

function tsip_header_Int(e_type, i_value){
    tsip_header.call(this, e_type);
    this.i_value = i_value;
}

tsip_header_Int.prototype.toString = function(){
    return typeof this.i_value == "undefined" ? null : this.i_value.toString();
};

tsip_header_Int.prototype.Parse = function(s_str){
    var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;	
	var o_hdr = null;
	
	
/* line 304 "./src/headers/tsip_header_Int.js" */
{
	 cs = tsip_machine_parser_header_Int_start;
} /* JSCodeGen::writeInit */

/* line 85 "./ragel/tsip_parser_header_Int.jrl" */
	
/* line 311 "./src/headers/tsip_header_Int.js" */
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
	_keys = _tsip_machine_parser_header_Int_key_offsets[cs];
	_trans = _tsip_machine_parser_header_Int_index_offsets[cs];
	_klen = _tsip_machine_parser_header_Int_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsip_machine_parser_header_Int_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsip_machine_parser_header_Int_trans_keys[_mid]) {
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
	  _klen = _tsip_machine_parser_header_Int_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsip_machine_parser_header_Int_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsip_machine_parser_header_Int_trans_keys[_mid+1]) {
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
	_trans = _tsip_machine_parser_header_Int_indicies[_trans];
	cs = _tsip_machine_parser_header_Int_trans_targs[_trans];
	if (_tsip_machine_parser_header_Int_trans_actions[_trans] != 0) {
		_acts = _tsip_machine_parser_header_Int_trans_actions[_trans];
		_nacts = _tsip_machine_parser_header_Int_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsip_machine_parser_header_Int_actions[_acts - 1]) {
case 0:
/* line 24 "./ragel/tsip_parser_header_Int.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 28 "./ragel/tsip_parser_header_Int.jrl" */

		if(o_hdr){
			o_hdr.i_value = tsk_ragel_parser_get_int(s_str, p, i_tag_start);
		}
			break;
case 2:
/* line 34 "./ragel/tsip_parser_header_Int.jrl" */

		if(o_hdr){
			tsk_ragel_add_param(s_str, p, i_tag_start, o_hdr.ao_params);
		}
			break;
case 3:
/* line 40 "./ragel/tsip_parser_header_Int.jrl" */
 o_hdr = new tsip_header_Content_Length(); 		break;
case 4:
/* line 41 "./ragel/tsip_parser_header_Int.jrl" */
 o_hdr = new tsip_header_Expires(); 		break;
case 5:
/* line 42 "./ragel/tsip_parser_header_Int.jrl" */
 o_hdr = new tsip_header_Max_Forwards(); 		break;
case 6:
/* line 43 "./ragel/tsip_parser_header_Int.jrl" */
 o_hdr = new tsip_header_Min_Expires(); 		break;
case 7:
/* line 44 "./ragel/tsip_parser_header_Int.jrl" */
 o_hdr = new tsip_header_Min_SE(); 		break;
case 8:
/* line 45 "./ragel/tsip_parser_header_Int.jrl" */
 o_hdr = new tsip_header_RSeq(); 		break;
case 9:
/* line 57 "./ragel/tsip_parser_header_Int.jrl" */
 		break;
/* line 435 "./src/headers/tsip_header_Int.js" */
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

/* line 86 "./ragel/tsip_parser_header_Int.jrl" */
	
	if( cs < 
/* line 465 "./src/headers/tsip_header_Int.js" */
119
/* line 87 "./ragel/tsip_parser_header_Int.jrl" */
 ){
		tsk_utils_log_error("Failed to parse header: " + s_str);
		return null;
	}
	
	return o_hdr;
}

function tsip_header_Content_Length(i_value){ tsip_header_Int.call(this, tsip_header_type_e.Content_Length, i_value); }
function tsip_header_Expires(i_value){ tsip_header_Int.call(this, tsip_header_type_e.Expires, i_value); }
function tsip_header_Max_Forwards(i_value){ tsip_header_Int.call(this, tsip_header_type_e.Max_Forwards, i_value); }
function tsip_header_Min_Expires(i_value){ tsip_header_Int.call(this, tsip_header_type_e.Min_Expires, i_value); }
function tsip_header_Min_SE(i_value){ tsip_header_Int.call(this, tsip_header_type_e.Min_SE, i_value); }
function tsip_header_RSeq(i_value){ tsip_header_Int.call(this, tsip_header_type_e.RSeq, i_value); }

