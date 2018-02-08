
/* line 1 "./ragel/tsip_parser_header_Refer_Sub.jrl" */
/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
tsip_header_Refer_Sub.prototype = Object.create(tsip_header.prototype);

/* line 37 "./ragel/tsip_parser_header_Refer_Sub.jrl" */



/* line 15 "./src/headers/tsip_header_Refer_Sub.js" */
_tsip_machine_parser_header_Refer_Sub_actions = [
	0, 1, 0, 1, 1, 1, 2, 1, 
	3, 1, 4
];

_tsip_machine_parser_header_Refer_Sub_key_offsets = [
	0, 0, 2, 4, 6, 8, 10, 11, 
	13, 15, 17, 20, 27, 28, 30, 36, 
	38, 40, 42, 44, 48, 52, 53, 55, 
	58, 75, 76, 78, 94, 113, 118, 119, 
	121, 125, 144, 145, 147, 166, 167, 169, 
	172, 180, 181, 183, 187, 188, 194, 212, 
	219, 227, 235, 243, 245, 252, 261, 263, 
	266, 268, 271, 273, 276, 279, 280, 283, 
	284, 287, 288, 297, 306, 314, 322, 330, 
	338, 340, 346, 355, 364, 373, 375, 378, 
	381, 382, 383, 385, 387, 389, 393
];

_tsip_machine_parser_header_Refer_Sub_trans_keys = [
	82, 114, 69, 101, 70, 102, 69, 101, 
	82, 114, 45, 83, 115, 85, 117, 66, 
	98, 9, 32, 58, 9, 13, 32, 70, 
	84, 102, 116, 10, 9, 32, 9, 32, 
	70, 84, 102, 116, 65, 97, 76, 108, 
	83, 115, 69, 101, 9, 13, 32, 59, 
	9, 13, 32, 59, 10, 9, 32, 9, 
	32, 59, 9, 13, 32, 33, 37, 39, 
	126, 42, 43, 45, 46, 48, 57, 65, 
	90, 95, 122, 10, 9, 32, 9, 32, 
	33, 37, 39, 126, 42, 43, 45, 46, 
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
	48, 57, 46, 48, 57, 46, 58, 82, 
	114, 85, 117, 69, 101, 9, 13, 32, 
	59, 0
];

_tsip_machine_parser_header_Refer_Sub_single_lengths = [
	0, 2, 2, 2, 2, 2, 1, 2, 
	2, 2, 3, 7, 1, 2, 6, 2, 
	2, 2, 2, 4, 4, 1, 2, 3, 
	7, 1, 2, 6, 9, 5, 1, 2, 
	4, 9, 1, 2, 9, 1, 2, 3, 
	4, 1, 2, 4, 1, 0, 8, 1, 
	2, 2, 2, 2, 1, 3, 0, 1, 
	0, 1, 0, 1, 1, 1, 1, 1, 
	1, 1, 3, 3, 2, 2, 2, 2, 
	2, 0, 3, 3, 3, 0, 1, 1, 
	1, 1, 2, 2, 2, 4, 0
];

_tsip_machine_parser_header_Refer_Sub_range_lengths = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	5, 0, 0, 5, 5, 0, 0, 0, 
	0, 5, 0, 0, 5, 0, 0, 0, 
	2, 0, 0, 0, 0, 3, 5, 3, 
	3, 3, 3, 0, 3, 3, 1, 1, 
	1, 1, 1, 1, 1, 0, 1, 0, 
	1, 0, 3, 3, 3, 3, 3, 3, 
	0, 3, 3, 3, 3, 1, 1, 1, 
	0, 0, 0, 0, 0, 0, 0
];

_tsip_machine_parser_header_Refer_Sub_index_offsets = [
	0, 0, 3, 6, 9, 12, 15, 17, 
	20, 23, 26, 30, 38, 40, 43, 50, 
	53, 56, 59, 62, 67, 72, 74, 77, 
	81, 94, 96, 99, 111, 126, 132, 134, 
	137, 142, 157, 159, 162, 177, 179, 182, 
	186, 193, 195, 198, 203, 205, 209, 223, 
	228, 234, 240, 246, 249, 254, 261, 263, 
	266, 268, 271, 273, 276, 279, 281, 284, 
	286, 289, 291, 298, 305, 311, 317, 323, 
	329, 332, 336, 343, 350, 357, 359, 362, 
	365, 367, 369, 372, 375, 378, 383
];

_tsip_machine_parser_header_Refer_Sub_indicies = [
	0, 0, 1, 2, 2, 1, 3, 3, 
	1, 4, 4, 1, 5, 5, 1, 6, 
	1, 7, 7, 1, 8, 8, 1, 9, 
	9, 1, 9, 9, 10, 1, 10, 11, 
	10, 12, 13, 12, 13, 1, 14, 1, 
	15, 15, 1, 15, 15, 12, 13, 12, 
	13, 1, 16, 16, 1, 17, 17, 1, 
	18, 18, 1, 19, 19, 1, 20, 21, 
	20, 22, 1, 23, 24, 23, 25, 1, 
	26, 1, 27, 27, 1, 27, 27, 25, 
	1, 25, 28, 25, 29, 29, 29, 29, 
	29, 29, 29, 29, 29, 1, 30, 1, 
	31, 31, 1, 31, 31, 29, 29, 29, 
	29, 29, 29, 29, 29, 29, 1, 32, 
	33, 32, 34, 34, 34, 35, 36, 34, 
	34, 34, 34, 34, 34, 1, 37, 38, 
	37, 25, 36, 1, 39, 1, 40, 40, 
	1, 40, 40, 25, 36, 1, 36, 41, 
	36, 42, 43, 42, 42, 44, 42, 42, 
	42, 42, 42, 42, 1, 45, 1, 46, 
	46, 1, 46, 47, 46, 42, 43, 42, 
	42, 44, 42, 42, 42, 42, 42, 42, 
	1, 48, 1, 49, 49, 1, 49, 49, 
	43, 1, 43, 50, 51, 52, 43, 43, 
	1, 53, 1, 43, 43, 1, 54, 33, 
	54, 35, 1, 55, 1, 43, 43, 43, 
	1, 54, 33, 54, 42, 42, 42, 35, 
	42, 42, 42, 42, 42, 42, 1, 57, 
	56, 56, 56, 1, 59, 51, 58, 58, 
	58, 1, 59, 51, 60, 60, 60, 1, 
	59, 51, 61, 61, 61, 1, 59, 51, 
	1, 63, 62, 56, 56, 1, 64, 59, 
	51, 65, 58, 58, 1, 66, 1, 67, 
	68, 1, 69, 1, 70, 71, 1, 72, 
	1, 51, 73, 1, 51, 74, 1, 51, 
	1, 70, 75, 1, 70, 1, 67, 76, 
	1, 67, 1, 64, 59, 51, 77, 60, 
	60, 1, 64, 59, 51, 61, 61, 61, 
	1, 79, 51, 78, 78, 78, 1, 81, 
	51, 80, 80, 80, 1, 81, 51, 82, 
	82, 82, 1, 81, 51, 83, 83, 83, 
	1, 81, 51, 1, 84, 78, 78, 1, 
	64, 81, 51, 85, 80, 80, 1, 64, 
	81, 51, 86, 82, 82, 1, 64, 81, 
	51, 83, 83, 83, 1, 87, 1, 64, 
	88, 1, 64, 89, 1, 64, 1, 63, 
	1, 90, 90, 1, 91, 91, 1, 92, 
	92, 1, 93, 94, 93, 95, 1, 1, 
	0
];

_tsip_machine_parser_header_Refer_Sub_trans_targs = [
	2, 0, 3, 4, 5, 6, 7, 8, 
	9, 10, 11, 12, 15, 82, 13, 14, 
	16, 17, 18, 19, 20, 44, 24, 20, 
	21, 24, 22, 23, 25, 28, 26, 27, 
	29, 44, 28, 24, 33, 29, 30, 31, 
	32, 34, 46, 40, 47, 35, 36, 37, 
	38, 39, 41, 43, 45, 42, 20, 86, 
	48, 81, 49, 52, 50, 51, 53, 68, 
	54, 66, 55, 56, 64, 57, 58, 62, 
	59, 60, 61, 63, 65, 67, 69, 77, 
	70, 73, 71, 72, 74, 75, 76, 78, 
	79, 80, 83, 84, 85, 20, 44, 24
];

_tsip_machine_parser_header_Refer_Sub_trans_actions = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 1, 1, 0, 0, 
	0, 0, 0, 0, 5, 5, 5, 0, 
	0, 0, 0, 0, 0, 1, 0, 0, 
	7, 7, 0, 7, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 7, 9, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 3, 3, 3
];

tsip_machine_parser_header_Refer_Sub_start = 1;
tsip_machine_parser_header_Refer_Sub_first_final = 86;
tsip_machine_parser_header_Refer_Sub_error = 0;

tsip_machine_parser_header_Refer_Sub_en_main = 1;


/* line 40 "./ragel/tsip_parser_header_Refer_Sub.jrl" */

function tsip_header_Refer_Sub(b_sub){
	tsip_header.call(this, tsip_header_type_e.Refer_Sub);
    this.b_sub = b_sub;
}

tsip_header_Refer_Sub.prototype.toString = function(){
    return this.b_sub ? "true" : "false";
}

tsip_header_Refer_Sub.prototype.Parse = function(s_str){
    var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;	
	var hdr_rsub = new tsip_header_Refer_Sub(true);
	
	
/* line 240 "./src/headers/tsip_header_Refer_Sub.js" */
{
	 cs = tsip_machine_parser_header_Refer_Sub_start;
} /* JSCodeGen::writeInit */

/* line 60 "./ragel/tsip_parser_header_Refer_Sub.jrl" */
	
/* line 247 "./src/headers/tsip_header_Refer_Sub.js" */
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
	_keys = _tsip_machine_parser_header_Refer_Sub_key_offsets[cs];
	_trans = _tsip_machine_parser_header_Refer_Sub_index_offsets[cs];
	_klen = _tsip_machine_parser_header_Refer_Sub_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsip_machine_parser_header_Refer_Sub_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsip_machine_parser_header_Refer_Sub_trans_keys[_mid]) {
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
	  _klen = _tsip_machine_parser_header_Refer_Sub_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsip_machine_parser_header_Refer_Sub_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsip_machine_parser_header_Refer_Sub_trans_keys[_mid+1]) {
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
	_trans = _tsip_machine_parser_header_Refer_Sub_indicies[_trans];
	cs = _tsip_machine_parser_header_Refer_Sub_trans_targs[_trans];
	if (_tsip_machine_parser_header_Refer_Sub_trans_actions[_trans] != 0) {
		_acts = _tsip_machine_parser_header_Refer_Sub_trans_actions[_trans];
		_nacts = _tsip_machine_parser_header_Refer_Sub_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsip_machine_parser_header_Refer_Sub_actions[_acts - 1]) {
case 0:
/* line 13 "./ragel/tsip_parser_header_Refer_Sub.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 17 "./ragel/tsip_parser_header_Refer_Sub.jrl" */

		hdr_rsub.b_sub = true;
			break;
case 2:
/* line 20 "./ragel/tsip_parser_header_Refer_Sub.jrl" */

		hdr_rsub.b_sub = false;
			break;
case 3:
/* line 23 "./ragel/tsip_parser_header_Refer_Sub.jrl" */

		tsk_ragel_add_param(s_str, p, i_tag_start, hdr_rsub.ao_params);
			break;
case 4:
/* line 27 "./ragel/tsip_parser_header_Refer_Sub.jrl" */

			break;
/* line 355 "./src/headers/tsip_header_Refer_Sub.js" */
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

/* line 61 "./ragel/tsip_parser_header_Refer_Sub.jrl" */
	
	if( cs < 
/* line 385 "./src/headers/tsip_header_Refer_Sub.js" */
86
/* line 62 "./ragel/tsip_parser_header_Refer_Sub.jrl" */
 ){
		tsk_utils_log_error("Failed to parse 'Refer-Sub' header: " + s_str);
		return null;
	}
	
	return hdr_rsub;
}
