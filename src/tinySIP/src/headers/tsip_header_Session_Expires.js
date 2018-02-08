
/* line 1 "./ragel/tsip_parser_header_Session_Expires.jrl" */
/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
tsip_header_Session_Expires.prototype = Object.create(tsip_header.prototype);
var TSIP_SESSION_EXPIRES_DEFAULT_VALUE = 1800;


/* line 44 "./ragel/tsip_parser_header_Session_Expires.jrl" */




/* line 18 "./src/headers/tsip_header_Session_Expires.js" */
_tsip_machine_parser_header_Session_Expires_actions = [
	0, 1, 0, 1, 1, 1, 2, 1, 
	3, 1, 4, 1, 5
];

_tsip_machine_parser_header_Session_Expires_key_offsets = [
	0, 0, 4, 6, 8, 10, 12, 14, 
	16, 17, 19, 21, 23, 25, 27, 29, 
	31, 34, 39, 40, 42, 46, 52, 56, 
	57, 59, 62, 81, 82, 84, 102, 121, 
	126, 127, 129, 133, 152, 153, 155, 174, 
	175, 177, 180, 188, 189, 191, 195, 196, 
	202, 220, 227, 235, 243, 251, 253, 260, 
	269, 271, 274, 276, 279, 281, 284, 287, 
	288, 291, 292, 295, 296, 305, 314, 322, 
	330, 338, 346, 348, 354, 363, 372, 381, 
	383, 386, 389, 390, 391, 412, 433, 454, 
	475, 496, 517, 538, 559, 578, 583, 584, 
	586, 590, 611, 612, 614, 635, 655, 677, 
	681, 685
];

_tsip_machine_parser_header_Session_Expires_trans_keys = [
	83, 88, 115, 120, 69, 101, 83, 115, 
	83, 115, 73, 105, 79, 111, 78, 110, 
	45, 69, 101, 88, 120, 80, 112, 73, 
	105, 82, 114, 69, 101, 83, 115, 9, 
	32, 58, 9, 13, 32, 48, 57, 10, 
	9, 32, 9, 32, 48, 57, 9, 13, 
	32, 59, 48, 57, 9, 13, 32, 59, 
	10, 9, 32, 9, 32, 59, 9, 13, 
	32, 33, 37, 39, 82, 114, 126, 42, 
	43, 45, 46, 48, 57, 65, 90, 95, 
	122, 10, 9, 32, 9, 32, 33, 37, 
	39, 82, 114, 126, 42, 43, 45, 46, 
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
	48, 57, 46, 48, 57, 46, 58, 9, 
	13, 32, 33, 37, 39, 59, 61, 69, 
	101, 126, 42, 43, 45, 46, 48, 57, 
	65, 90, 95, 122, 9, 13, 32, 33, 
	37, 39, 59, 61, 70, 102, 126, 42, 
	43, 45, 46, 48, 57, 65, 90, 95, 
	122, 9, 13, 32, 33, 37, 39, 59, 
	61, 82, 114, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 9, 13, 
	32, 33, 37, 39, 59, 61, 69, 101, 
	126, 42, 43, 45, 46, 48, 57, 65, 
	90, 95, 122, 9, 13, 32, 33, 37, 
	39, 59, 61, 83, 115, 126, 42, 43, 
	45, 46, 48, 57, 65, 90, 95, 122, 
	9, 13, 32, 33, 37, 39, 59, 61, 
	72, 104, 126, 42, 43, 45, 46, 48, 
	57, 65, 90, 95, 122, 9, 13, 32, 
	33, 37, 39, 59, 61, 69, 101, 126, 
	42, 43, 45, 46, 48, 57, 65, 90, 
	95, 122, 9, 13, 32, 33, 37, 39, 
	59, 61, 82, 114, 126, 42, 43, 45, 
	46, 48, 57, 65, 90, 95, 122, 9, 
	13, 32, 33, 37, 39, 59, 61, 126, 
	42, 43, 45, 46, 48, 57, 65, 90, 
	95, 122, 9, 13, 32, 59, 61, 10, 
	9, 32, 9, 32, 59, 61, 9, 13, 
	32, 33, 34, 37, 39, 85, 91, 117, 
	126, 42, 43, 45, 46, 48, 57, 65, 
	90, 95, 122, 10, 9, 32, 9, 13, 
	32, 33, 34, 37, 39, 85, 91, 117, 
	126, 42, 43, 45, 46, 48, 57, 65, 
	90, 95, 122, 9, 13, 32, 33, 37, 
	39, 59, 65, 97, 126, 42, 43, 45, 
	46, 48, 57, 66, 90, 95, 122, 9, 
	13, 32, 33, 37, 39, 59, 67, 83, 
	99, 115, 126, 42, 43, 45, 46, 48, 
	57, 65, 90, 95, 122, 9, 13, 32, 
	59, 9, 13, 32, 59, 0
];

_tsip_machine_parser_header_Session_Expires_single_lengths = [
	0, 4, 2, 2, 2, 2, 2, 2, 
	1, 2, 2, 2, 2, 2, 2, 2, 
	3, 3, 1, 2, 2, 4, 4, 1, 
	2, 3, 9, 1, 2, 8, 9, 5, 
	1, 2, 4, 9, 1, 2, 9, 1, 
	2, 3, 4, 1, 2, 4, 1, 0, 
	8, 1, 2, 2, 2, 2, 1, 3, 
	0, 1, 0, 1, 0, 1, 1, 1, 
	1, 1, 1, 1, 3, 3, 2, 2, 
	2, 2, 2, 0, 3, 3, 3, 0, 
	1, 1, 1, 1, 11, 11, 11, 11, 
	11, 11, 11, 11, 9, 5, 1, 2, 
	4, 11, 1, 2, 11, 10, 12, 4, 
	4, 0
];

_tsip_machine_parser_header_Session_Expires_range_lengths = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 1, 0, 0, 1, 1, 0, 0, 
	0, 0, 5, 0, 0, 5, 5, 0, 
	0, 0, 0, 5, 0, 0, 5, 0, 
	0, 0, 2, 0, 0, 0, 0, 3, 
	5, 3, 3, 3, 3, 0, 3, 3, 
	1, 1, 1, 1, 1, 1, 1, 0, 
	1, 0, 1, 0, 3, 3, 3, 3, 
	3, 3, 0, 3, 3, 3, 3, 1, 
	1, 1, 0, 0, 5, 5, 5, 5, 
	5, 5, 5, 5, 5, 0, 0, 0, 
	0, 5, 0, 0, 5, 5, 5, 0, 
	0, 0
];

_tsip_machine_parser_header_Session_Expires_index_offsets = [
	0, 0, 5, 8, 11, 14, 17, 20, 
	23, 25, 28, 31, 34, 37, 40, 43, 
	46, 50, 55, 57, 60, 64, 70, 75, 
	77, 80, 84, 99, 101, 104, 118, 133, 
	139, 141, 144, 149, 164, 166, 169, 184, 
	186, 189, 193, 200, 202, 205, 210, 212, 
	216, 230, 235, 241, 247, 253, 256, 261, 
	268, 270, 273, 275, 278, 280, 283, 286, 
	288, 291, 293, 296, 298, 305, 312, 318, 
	324, 330, 336, 339, 343, 350, 357, 364, 
	366, 369, 372, 374, 376, 393, 410, 427, 
	444, 461, 478, 495, 512, 527, 533, 535, 
	538, 543, 560, 562, 565, 582, 598, 616, 
	621, 626
];

_tsip_machine_parser_header_Session_Expires_indicies = [
	0, 2, 0, 2, 1, 3, 3, 1, 
	4, 4, 1, 5, 5, 1, 6, 6, 
	1, 7, 7, 1, 8, 8, 1, 9, 
	1, 10, 10, 1, 11, 11, 1, 12, 
	12, 1, 13, 13, 1, 14, 14, 1, 
	15, 15, 1, 2, 2, 1, 2, 2, 
	16, 1, 16, 17, 16, 18, 1, 19, 
	1, 20, 20, 1, 20, 20, 18, 1, 
	21, 22, 21, 24, 23, 1, 25, 26, 
	25, 27, 1, 28, 1, 29, 29, 1, 
	29, 29, 27, 1, 27, 30, 27, 31, 
	31, 31, 32, 32, 31, 31, 31, 31, 
	31, 31, 1, 33, 1, 34, 34, 1, 
	34, 34, 31, 31, 31, 32, 32, 31, 
	31, 31, 31, 31, 31, 1, 35, 36, 
	35, 37, 37, 37, 38, 39, 37, 37, 
	37, 37, 37, 37, 1, 40, 41, 40, 
	27, 39, 1, 42, 1, 43, 43, 1, 
	43, 43, 27, 39, 1, 39, 44, 39, 
	45, 46, 45, 45, 47, 45, 45, 45, 
	45, 45, 45, 1, 48, 1, 49, 49, 
	1, 49, 50, 49, 45, 46, 45, 45, 
	47, 45, 45, 45, 45, 45, 45, 1, 
	51, 1, 52, 52, 1, 52, 52, 46, 
	1, 46, 53, 54, 55, 46, 46, 1, 
	56, 1, 46, 46, 1, 57, 36, 57, 
	38, 1, 58, 1, 46, 46, 46, 1, 
	57, 36, 57, 45, 45, 45, 38, 45, 
	45, 45, 45, 45, 45, 1, 60, 59, 
	59, 59, 1, 62, 54, 61, 61, 61, 
	1, 62, 54, 63, 63, 63, 1, 62, 
	54, 64, 64, 64, 1, 62, 54, 1, 
	66, 65, 59, 59, 1, 67, 62, 54, 
	68, 61, 61, 1, 69, 1, 70, 71, 
	1, 72, 1, 73, 74, 1, 75, 1, 
	54, 76, 1, 54, 77, 1, 54, 1, 
	73, 78, 1, 73, 1, 70, 79, 1, 
	70, 1, 67, 62, 54, 80, 63, 63, 
	1, 67, 62, 54, 64, 64, 64, 1, 
	82, 54, 81, 81, 81, 1, 84, 54, 
	83, 83, 83, 1, 84, 54, 85, 85, 
	85, 1, 84, 54, 86, 86, 86, 1, 
	84, 54, 1, 87, 81, 81, 1, 67, 
	84, 54, 88, 83, 83, 1, 67, 84, 
	54, 89, 85, 85, 1, 67, 84, 54, 
	86, 86, 86, 1, 90, 1, 67, 91, 
	1, 67, 92, 1, 67, 1, 66, 1, 
	35, 36, 35, 37, 37, 37, 38, 39, 
	93, 93, 37, 37, 37, 37, 37, 37, 
	1, 35, 36, 35, 37, 37, 37, 38, 
	39, 94, 94, 37, 37, 37, 37, 37, 
	37, 1, 35, 36, 35, 37, 37, 37, 
	38, 39, 95, 95, 37, 37, 37, 37, 
	37, 37, 1, 35, 36, 35, 37, 37, 
	37, 38, 39, 96, 96, 37, 37, 37, 
	37, 37, 37, 1, 35, 36, 35, 37, 
	37, 37, 38, 39, 97, 97, 37, 37, 
	37, 37, 37, 37, 1, 35, 36, 35, 
	37, 37, 37, 38, 39, 98, 98, 37, 
	37, 37, 37, 37, 37, 1, 35, 36, 
	35, 37, 37, 37, 38, 39, 99, 99, 
	37, 37, 37, 37, 37, 37, 1, 35, 
	36, 35, 37, 37, 37, 38, 39, 100, 
	100, 37, 37, 37, 37, 37, 37, 1, 
	101, 36, 101, 37, 37, 37, 38, 102, 
	37, 37, 37, 37, 37, 37, 1, 103, 
	104, 103, 27, 102, 1, 105, 1, 106, 
	106, 1, 106, 106, 27, 102, 1, 102, 
	107, 102, 45, 46, 45, 45, 108, 47, 
	108, 45, 45, 45, 45, 45, 45, 1, 
	109, 1, 110, 110, 1, 110, 50, 110, 
	45, 46, 45, 45, 108, 47, 108, 45, 
	45, 45, 45, 45, 45, 1, 57, 36, 
	57, 45, 45, 45, 38, 111, 111, 45, 
	45, 45, 45, 45, 45, 1, 57, 36, 
	57, 45, 45, 45, 38, 112, 113, 112, 
	113, 45, 45, 45, 45, 45, 45, 1, 
	114, 115, 114, 116, 1, 117, 118, 117, 
	119, 1, 1, 0
];

_tsip_machine_parser_header_Session_Expires_trans_targs = [
	2, 0, 16, 3, 4, 5, 6, 7, 
	8, 9, 10, 11, 12, 13, 14, 15, 
	17, 18, 21, 19, 20, 22, 46, 21, 
	26, 22, 23, 26, 24, 25, 27, 30, 
	84, 28, 29, 31, 46, 30, 26, 35, 
	31, 32, 33, 34, 36, 48, 42, 49, 
	37, 38, 39, 40, 41, 43, 45, 47, 
	44, 22, 105, 50, 83, 51, 54, 52, 
	53, 55, 70, 56, 68, 57, 58, 66, 
	59, 60, 64, 61, 62, 63, 65, 67, 
	69, 71, 79, 72, 75, 73, 74, 76, 
	77, 78, 80, 81, 82, 85, 86, 87, 
	88, 89, 90, 91, 92, 93, 97, 93, 
	94, 95, 96, 98, 101, 99, 100, 102, 
	103, 104, 22, 46, 26, 22, 46, 26
];

_tsip_machine_parser_header_Session_Expires_trans_actions = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 1, 0, 0, 3, 3, 0, 
	3, 0, 0, 0, 0, 0, 0, 1, 
	1, 0, 0, 9, 9, 0, 9, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 9, 11, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 9, 0, 0, 
	0, 0, 0, 0, 1, 0, 0, 0, 
	0, 0, 7, 7, 7, 5, 5, 5
];

tsip_machine_parser_header_Session_Expires_start = 1;
tsip_machine_parser_header_Session_Expires_first_final = 105;
tsip_machine_parser_header_Session_Expires_error = 0;

tsip_machine_parser_header_Session_Expires_en_main = 1;


/* line 48 "./ragel/tsip_parser_header_Session_Expires.jrl" */

function tsip_header_Session_Expires(i_delta_seconds, b_refresher_uas){
	tsip_header.call(this, tsip_header_type_e.Session_Expires);
    this.i_delta_seconds = i_delta_seconds;
    this.b_refresher_uas = b_refresher_uas;
}

tsip_header_Session_Expires.prototype.toString = function(){
    if(this.i_delta_seconds >= 0){
        return tsk_string_format("{0};refresher={1}", this.i_delta_seconds, this.b_refresher_uas ? "uas" : "uac");
    }
    return null;
}

tsip_header_Session_Expires.prototype.Parse = function(s_str){
    var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;	
	var hdr_session_expires = new tsip_header_Session_Expires(TSIP_SESSION_EXPIRES_DEFAULT_VALUE, false);
	
	
/* line 331 "./src/headers/tsip_header_Session_Expires.js" */
{
	 cs = tsip_machine_parser_header_Session_Expires_start;
} /* JSCodeGen::writeInit */

/* line 72 "./ragel/tsip_parser_header_Session_Expires.jrl" */
	
/* line 338 "./src/headers/tsip_header_Session_Expires.js" */
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
	_keys = _tsip_machine_parser_header_Session_Expires_key_offsets[cs];
	_trans = _tsip_machine_parser_header_Session_Expires_index_offsets[cs];
	_klen = _tsip_machine_parser_header_Session_Expires_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsip_machine_parser_header_Session_Expires_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsip_machine_parser_header_Session_Expires_trans_keys[_mid]) {
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
	  _klen = _tsip_machine_parser_header_Session_Expires_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsip_machine_parser_header_Session_Expires_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsip_machine_parser_header_Session_Expires_trans_keys[_mid+1]) {
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
	_trans = _tsip_machine_parser_header_Session_Expires_indicies[_trans];
	cs = _tsip_machine_parser_header_Session_Expires_trans_targs[_trans];
	if (_tsip_machine_parser_header_Session_Expires_trans_actions[_trans] != 0) {
		_acts = _tsip_machine_parser_header_Session_Expires_trans_actions[_trans];
		_nacts = _tsip_machine_parser_header_Session_Expires_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsip_machine_parser_header_Session_Expires_actions[_acts - 1]) {
case 0:
/* line 15 "./ragel/tsip_parser_header_Session_Expires.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 19 "./ragel/tsip_parser_header_Session_Expires.jrl" */

	    hdr_session_expires.i_delta_seconds = tsk_ragel_parser_get_int(s_str, p, i_tag_start);
			break;
case 2:
/* line 23 "./ragel/tsip_parser_header_Session_Expires.jrl" */

		hdr_session_expires.b_refresher_uas = true;
			break;
case 3:
/* line 26 "./ragel/tsip_parser_header_Session_Expires.jrl" */

		hdr_session_expires.b_refresher_uas = false;
			break;
case 4:
/* line 30 "./ragel/tsip_parser_header_Session_Expires.jrl" */

	    tsk_ragel_add_param(s_str, p, i_tag_start, hdr_session_expires.ao_params);
			break;
case 5:
/* line 34 "./ragel/tsip_parser_header_Session_Expires.jrl" */

			break;
/* line 451 "./src/headers/tsip_header_Session_Expires.js" */
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

/* line 73 "./ragel/tsip_parser_header_Session_Expires.jrl" */
	
	if( cs < 
/* line 481 "./src/headers/tsip_header_Session_Expires.js" */
105
/* line 74 "./ragel/tsip_parser_header_Session_Expires.jrl" */
 ){
		tsk_utils_log_error("Failed to parse 'Session-Expires' header: " + s_str);
		return null;
	}
	
	return hdr_session_expires;
}