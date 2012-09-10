
/* line 1 "./ragel/tsip_parser_header_Warning.jrl" */
/*
* Copyright (C) 2012 Doubango Telecom <http://www.doubango.org>
* License: GPLv3
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
tsip_header_Warning.prototype = Object.create(tsip_header.prototype);

/* line 76 "./ragel/tsip_parser_header_Warning.jrl" */



/* line 30 "./src/headers/tsip_header_Warning.js" */
_tsip_machine_parser_header_Warning_actions = [
	0, 1, 0, 1, 2, 1, 4, 1, 
	6, 2, 1, 0, 2, 3, 5
];

_tsip_machine_parser_header_Warning_key_offsets = [
	0, 0, 2, 4, 6, 8, 10, 12, 
	14, 17, 22, 23, 25, 29, 31, 33, 
	34, 51, 66, 70, 74, 75, 77, 80, 
	88, 89, 91, 95, 99, 100, 102, 105, 
	106, 112, 129, 146, 163, 180, 198, 215, 
	233, 235, 238, 255, 272, 289, 306, 323, 
	341, 359, 377, 394, 411, 428, 445, 462, 
	479, 486, 494, 502, 510, 512, 519, 528, 
	530, 533, 535, 538, 540, 543, 546, 547, 
	549, 552, 553, 556, 557, 566, 575, 583, 
	591, 599, 607, 609, 615, 624, 633, 642, 
	644, 647, 650, 651, 652
];

_tsip_machine_parser_header_Warning_trans_keys = [
	87, 119, 65, 97, 82, 114, 78, 110, 
	73, 105, 78, 110, 71, 103, 9, 32, 
	58, 9, 13, 32, 48, 57, 10, 9, 
	32, 9, 32, 48, 57, 48, 57, 48, 
	57, 32, 33, 37, 39, 91, 126, 42, 
	43, 45, 46, 48, 57, 65, 90, 95, 
	96, 97, 122, 32, 33, 37, 39, 126, 
	42, 43, 45, 46, 48, 57, 65, 90, 
	95, 122, 9, 13, 32, 34, 9, 13, 
	32, 34, 10, 9, 32, 9, 32, 34, 
	9, 13, 34, 92, 32, 126, 128, 255, 
	10, 9, 32, 9, 13, 32, 44, 9, 
	13, 32, 44, 10, 9, 32, 9, 32, 
	44, 10, 0, 9, 11, 12, 14, 127, 
	32, 33, 37, 39, 45, 46, 126, 42, 
	43, 48, 57, 65, 90, 95, 96, 97, 
	122, 32, 33, 37, 39, 45, 46, 126, 
	42, 43, 48, 57, 65, 90, 95, 96, 
	97, 122, 32, 33, 37, 39, 45, 46, 
	126, 42, 43, 48, 57, 65, 90, 95, 
	96, 97, 122, 32, 33, 37, 39, 126, 
	42, 43, 45, 46, 48, 57, 65, 90, 
	95, 96, 97, 122, 32, 33, 37, 39, 
	45, 46, 58, 126, 42, 43, 48, 57, 
	65, 90, 95, 96, 97, 122, 32, 33, 
	37, 39, 45, 46, 126, 42, 43, 48, 
	57, 65, 90, 95, 96, 97, 122, 32, 
	33, 37, 39, 58, 126, 42, 43, 45, 
	46, 48, 57, 65, 90, 95, 96, 97, 
	122, 48, 57, 32, 48, 57, 32, 33, 
	37, 39, 126, 42, 43, 45, 46, 48, 
	57, 65, 90, 95, 96, 97, 122, 32, 
	33, 37, 39, 45, 46, 126, 42, 43, 
	48, 57, 65, 90, 95, 96, 97, 122, 
	32, 33, 37, 39, 126, 42, 43, 45, 
	46, 48, 57, 65, 90, 95, 96, 97, 
	122, 32, 33, 37, 39, 45, 46, 126, 
	42, 43, 48, 57, 65, 90, 95, 96, 
	97, 122, 32, 33, 37, 39, 126, 42, 
	43, 45, 46, 48, 57, 65, 90, 95, 
	96, 97, 122, 32, 33, 37, 39, 45, 
	46, 58, 126, 42, 43, 48, 57, 65, 
	90, 95, 96, 97, 122, 32, 33, 37, 
	39, 45, 46, 58, 126, 42, 43, 48, 
	57, 65, 90, 95, 96, 97, 122, 32, 
	33, 37, 39, 45, 46, 58, 126, 42, 
	43, 48, 57, 65, 90, 95, 96, 97, 
	122, 32, 33, 37, 39, 45, 46, 126, 
	42, 43, 48, 57, 65, 90, 95, 96, 
	97, 122, 32, 33, 37, 39, 45, 46, 
	126, 42, 43, 48, 57, 65, 90, 95, 
	96, 97, 122, 32, 33, 37, 39, 45, 
	46, 126, 42, 43, 48, 57, 65, 90, 
	95, 96, 97, 122, 32, 33, 37, 39, 
	45, 46, 126, 42, 43, 48, 57, 65, 
	90, 95, 96, 97, 122, 32, 33, 37, 
	39, 45, 46, 126, 42, 43, 48, 57, 
	65, 90, 95, 96, 97, 122, 32, 33, 
	37, 39, 45, 46, 126, 42, 43, 48, 
	57, 65, 90, 95, 96, 97, 122, 58, 
	48, 57, 65, 70, 97, 102, 58, 93, 
	48, 57, 65, 70, 97, 102, 58, 93, 
	48, 57, 65, 70, 97, 102, 58, 93, 
	48, 57, 65, 70, 97, 102, 58, 93, 
	58, 48, 57, 65, 70, 97, 102, 46, 
	58, 93, 48, 57, 65, 70, 97, 102, 
	48, 57, 46, 48, 57, 48, 57, 46, 
	48, 57, 48, 57, 93, 48, 57, 93, 
	48, 57, 93, 32, 58, 46, 48, 57, 
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
	48, 57, 46, 58, 0
];

_tsip_machine_parser_header_Warning_single_lengths = [
	0, 2, 2, 2, 2, 2, 2, 2, 
	3, 3, 1, 2, 2, 0, 0, 1, 
	5, 5, 4, 4, 1, 2, 3, 4, 
	1, 2, 4, 4, 1, 2, 3, 1, 
	0, 7, 7, 7, 5, 8, 7, 6, 
	0, 1, 5, 7, 5, 7, 5, 8, 
	8, 8, 7, 7, 7, 7, 7, 7, 
	1, 2, 2, 2, 2, 1, 3, 0, 
	1, 0, 1, 0, 1, 1, 1, 2, 
	1, 1, 1, 1, 3, 3, 2, 2, 
	2, 2, 2, 0, 3, 3, 3, 0, 
	1, 1, 1, 1, 0
];

_tsip_machine_parser_header_Warning_range_lengths = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 1, 0, 0, 1, 1, 1, 0, 
	6, 5, 0, 0, 0, 0, 0, 2, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	3, 5, 5, 5, 6, 5, 5, 6, 
	1, 1, 6, 5, 6, 5, 6, 5, 
	5, 5, 5, 5, 5, 5, 5, 5, 
	3, 3, 3, 3, 0, 3, 3, 1, 
	1, 1, 1, 1, 1, 1, 0, 0, 
	1, 0, 1, 0, 3, 3, 3, 3, 
	3, 3, 0, 3, 3, 3, 3, 1, 
	1, 1, 0, 0, 0
];

_tsip_machine_parser_header_Warning_index_offsets = [
	0, 0, 3, 6, 9, 12, 15, 18, 
	21, 25, 30, 32, 35, 39, 41, 43, 
	45, 57, 68, 73, 78, 80, 83, 87, 
	94, 96, 99, 104, 109, 111, 114, 118, 
	120, 124, 137, 150, 163, 175, 189, 202, 
	215, 217, 220, 232, 245, 257, 270, 282, 
	296, 310, 324, 337, 350, 363, 376, 389, 
	402, 407, 413, 419, 425, 428, 433, 440, 
	442, 445, 447, 450, 452, 455, 458, 460, 
	463, 466, 468, 471, 473, 480, 487, 493, 
	499, 505, 511, 514, 518, 525, 532, 539, 
	541, 544, 547, 549, 551
];

_tsip_machine_parser_header_Warning_indicies = [
	0, 0, 1, 2, 2, 1, 3, 3, 
	1, 4, 4, 1, 5, 5, 1, 6, 
	6, 1, 7, 7, 1, 7, 7, 8, 
	1, 8, 9, 8, 10, 1, 11, 1, 
	12, 12, 1, 12, 12, 10, 1, 13, 
	1, 14, 1, 15, 1, 16, 16, 16, 
	19, 16, 16, 16, 17, 18, 16, 18, 
	1, 20, 21, 21, 21, 21, 21, 21, 
	21, 21, 21, 1, 22, 23, 22, 24, 
	1, 25, 26, 25, 27, 1, 28, 1, 
	29, 29, 1, 29, 29, 27, 1, 27, 
	30, 31, 32, 27, 27, 1, 33, 1, 
	27, 27, 1, 34, 35, 34, 36, 1, 
	37, 38, 37, 8, 1, 39, 1, 40, 
	40, 1, 40, 40, 8, 1, 41, 1, 
	27, 27, 27, 1, 20, 21, 21, 21, 
	42, 43, 21, 21, 44, 45, 21, 45, 
	1, 20, 21, 21, 21, 42, 21, 21, 
	21, 45, 45, 21, 45, 1, 20, 21, 
	21, 21, 42, 46, 21, 21, 45, 45, 
	21, 45, 1, 20, 21, 21, 21, 21, 
	21, 21, 45, 47, 21, 47, 1, 20, 
	21, 21, 21, 48, 49, 50, 21, 21, 
	47, 47, 21, 47, 1, 20, 21, 21, 
	21, 48, 21, 21, 21, 47, 47, 21, 
	47, 1, 20, 21, 21, 21, 50, 21, 
	21, 21, 45, 47, 21, 47, 1, 51, 
	1, 20, 51, 1, 20, 21, 21, 21, 
	21, 21, 21, 52, 47, 21, 47, 1, 
	20, 21, 21, 21, 42, 53, 21, 21, 
	54, 45, 21, 45, 1, 20, 21, 21, 
	21, 21, 21, 21, 55, 47, 21, 47, 
	1, 20, 21, 21, 21, 42, 56, 21, 
	21, 57, 45, 21, 45, 1, 20, 21, 
	21, 21, 21, 21, 21, 58, 47, 21, 
	47, 1, 20, 21, 21, 21, 42, 46, 
	50, 21, 21, 59, 45, 21, 45, 1, 
	20, 21, 21, 21, 42, 46, 50, 21, 
	21, 60, 45, 21, 45, 1, 20, 21, 
	21, 21, 42, 46, 50, 21, 21, 45, 
	45, 21, 45, 1, 20, 21, 21, 21, 
	42, 56, 21, 21, 61, 45, 21, 45, 
	1, 20, 21, 21, 21, 42, 56, 21, 
	21, 45, 45, 21, 45, 1, 20, 21, 
	21, 21, 42, 53, 21, 21, 62, 45, 
	21, 45, 1, 20, 21, 21, 21, 42, 
	53, 21, 21, 45, 45, 21, 45, 1, 
	20, 21, 21, 21, 42, 43, 21, 21, 
	63, 45, 21, 45, 1, 20, 21, 21, 
	21, 42, 43, 21, 21, 45, 45, 21, 
	45, 1, 65, 64, 64, 64, 1, 67, 
	68, 66, 66, 66, 1, 67, 68, 69, 
	69, 69, 1, 67, 68, 70, 70, 70, 
	1, 67, 68, 1, 72, 71, 64, 64, 
	1, 73, 67, 68, 74, 66, 66, 1, 
	75, 1, 76, 77, 1, 78, 1, 79, 
	80, 1, 81, 1, 68, 82, 1, 68, 
	83, 1, 68, 1, 20, 50, 1, 79, 
	84, 1, 79, 1, 76, 85, 1, 76, 
	1, 73, 67, 68, 86, 69, 69, 1, 
	73, 67, 68, 70, 70, 70, 1, 88, 
	68, 87, 87, 87, 1, 90, 68, 89, 
	89, 89, 1, 90, 68, 91, 91, 91, 
	1, 90, 68, 92, 92, 92, 1, 90, 
	68, 1, 93, 87, 87, 1, 73, 90, 
	68, 94, 89, 89, 1, 73, 90, 68, 
	95, 91, 91, 1, 73, 90, 68, 92, 
	92, 92, 1, 96, 1, 73, 97, 1, 
	73, 98, 1, 73, 1, 72, 1, 1, 
	0
];

_tsip_machine_parser_header_Warning_trans_targs = [
	2, 0, 3, 4, 5, 6, 7, 8, 
	9, 10, 13, 11, 12, 14, 15, 16, 
	17, 33, 37, 56, 18, 17, 19, 20, 
	23, 19, 20, 23, 21, 22, 24, 26, 
	32, 25, 27, 31, 9, 27, 28, 29, 
	30, 92, 34, 42, 54, 35, 36, 37, 
	38, 39, 40, 41, 43, 44, 52, 45, 
	46, 50, 47, 48, 49, 51, 53, 55, 
	57, 91, 58, 61, 71, 59, 60, 62, 
	78, 63, 76, 64, 65, 74, 66, 67, 
	72, 68, 69, 70, 73, 75, 77, 79, 
	87, 80, 83, 81, 82, 84, 85, 86, 
	88, 89, 90
];

_tsip_machine_parser_header_Warning_trans_actions = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 9, 0, 0, 0, 0, 5, 
	1, 1, 1, 1, 3, 0, 1, 1, 
	1, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 12, 12, 12, 0, 0, 0, 
	0, 7, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0
];

tsip_machine_parser_header_Warning_start = 1;
tsip_machine_parser_header_Warning_first_final = 92;
tsip_machine_parser_header_Warning_error = 0;

tsip_machine_parser_header_Warning_en_main = 1;


/* line 79 "./ragel/tsip_parser_header_Warning.jrl" */

function tsip_header_Warning(i_code, s_agent, s_text){
	tsip_header.call(this, tsip_header_type_e.Warning);
    this.i_code = i_code;
    this.s_agent = s_agent;
    this.s_text = s_text;
}

tsip_header_Warning.prototype.toString = function(){
	return tsk_string_format("{0} {1} {2}",
		this.i_code, this.s_agent, this.s_text);
};

// returns an array of 'Warning' headers
tsip_header_Warning.prototype.Parse = function(s_str){
    var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;
	var hdr_warnings = new Array();
	var curr_warning = null;
	
	
/* line 319 "./src/headers/tsip_header_Warning.js" */
{
	 cs = tsip_machine_parser_header_Warning_start;
} /* JSCodeGen::writeInit */

/* line 104 "./ragel/tsip_parser_header_Warning.jrl" */
	
/* line 326 "./src/headers/tsip_header_Warning.js" */
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
	_keys = _tsip_machine_parser_header_Warning_key_offsets[cs];
	_trans = _tsip_machine_parser_header_Warning_index_offsets[cs];
	_klen = _tsip_machine_parser_header_Warning_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsip_machine_parser_header_Warning_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsip_machine_parser_header_Warning_trans_keys[_mid]) {
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
	  _klen = _tsip_machine_parser_header_Warning_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsip_machine_parser_header_Warning_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsip_machine_parser_header_Warning_trans_keys[_mid+1]) {
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
	_trans = _tsip_machine_parser_header_Warning_indicies[_trans];
	cs = _tsip_machine_parser_header_Warning_trans_targs[_trans];
	if (_tsip_machine_parser_header_Warning_trans_actions[_trans] != 0) {
		_acts = _tsip_machine_parser_header_Warning_trans_actions[_trans];
		_nacts = _tsip_machine_parser_header_Warning_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsip_machine_parser_header_Warning_actions[_acts - 1]) {
case 0:
/* line 28 "./ragel/tsip_parser_header_Warning.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 32 "./ragel/tsip_parser_header_Warning.jrl" */

		if(!curr_warning){
			curr_warning = new tsip_header_Warning(-1, null, null);
		}
			break;
case 2:
/* line 38 "./ragel/tsip_parser_header_Warning.jrl" */

		if(curr_warning){
		    curr_warning.s_agent = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
		}
			break;
case 3:
/* line 44 "./ragel/tsip_parser_header_Warning.jrl" */

		if(curr_warning){
		    curr_warning.s_text = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
		}
			break;
case 4:
/* line 50 "./ragel/tsip_parser_header_Warning.jrl" */

		if(curr_warning){
		    curr_warning.i_code = tsk_ragel_parser_get_int(s_str, p, i_tag_start);
		}
			break;
case 5:
/* line 56 "./ragel/tsip_parser_header_Warning.jrl" */

		if(curr_warning){
	        hdr_warnings.push(curr_warning);
	        curr_warning = null;
	    }
			break;
case 6:
/* line 63 "./ragel/tsip_parser_header_Warning.jrl" */

			break;
/* line 455 "./src/headers/tsip_header_Warning.js" */
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

/* line 105 "./ragel/tsip_parser_header_Warning.jrl" */
	
	if( cs < 
/* line 485 "./src/headers/tsip_header_Warning.js" */
92
/* line 106 "./ragel/tsip_parser_header_Warning.jrl" */
 ){
		tsk_utils_log_error("Failed to parse 'Warning' header: " + s_str);
		return null;
	}
	
	return hdr_warnings;
}