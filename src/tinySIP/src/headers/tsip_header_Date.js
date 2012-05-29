
/* line 1 "./ragel/tsip_parser_header_Date.jrl" */
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
tsip_header_Date.prototype = Object.create(tsip_header.prototype);

/* line 74 "./ragel/tsip_parser_header_Date.jrl" */



/* line 30 "./src/headers/tsip_header_Date.js" */
_tsip_machine_parser_header_Date_actions = [
	0, 1, 0, 1, 1, 1, 2, 1, 
	3, 1, 4, 1, 5, 1, 6, 1, 
	7, 1, 8
];

_tsip_machine_parser_header_Date_key_offsets = [
	0, 0, 2, 4, 6, 8, 11, 24, 
	25, 27, 39, 41, 43, 44, 45, 47, 
	49, 50, 66, 70, 72, 73, 75, 77, 
	79, 81, 82, 84, 86, 87, 89, 91, 
	92, 94, 96, 97, 99, 101, 103, 104, 
	105, 107, 109, 111, 113, 115, 119, 121, 
	125, 127, 131, 133, 135, 137, 139, 141, 
	143, 145, 147, 151, 153, 157, 159, 161, 
	163, 165
];

_tsip_machine_parser_header_Date_trans_keys = [
	68, 100, 65, 97, 84, 116, 69, 101, 
	9, 32, 58, 9, 13, 32, 70, 77, 
	83, 84, 87, 102, 109, 115, 116, 119, 
	10, 9, 32, 9, 32, 70, 77, 83, 
	84, 87, 102, 109, 115, 116, 119, 82, 
	114, 73, 105, 44, 32, 48, 57, 48, 
	57, 32, 65, 68, 70, 74, 77, 78, 
	79, 83, 97, 100, 102, 106, 109, 110, 
	111, 115, 80, 85, 112, 117, 82, 114, 
	32, 48, 57, 48, 57, 48, 57, 48, 
	57, 32, 48, 57, 48, 57, 58, 48, 
	57, 48, 57, 58, 48, 57, 48, 57, 
	32, 71, 103, 77, 109, 84, 116, 13, 
	10, 71, 103, 69, 101, 67, 99, 69, 
	101, 66, 98, 65, 85, 97, 117, 78, 
	110, 76, 78, 108, 110, 65, 97, 82, 
	89, 114, 121, 79, 111, 86, 118, 67, 
	99, 84, 116, 69, 101, 80, 112, 79, 
	111, 78, 110, 65, 85, 97, 117, 84, 
	116, 72, 85, 104, 117, 85, 117, 69, 
	101, 69, 101, 68, 100, 0
];

_tsip_machine_parser_header_Date_single_lengths = [
	0, 2, 2, 2, 2, 3, 13, 1, 
	2, 12, 2, 2, 1, 1, 0, 0, 
	1, 16, 4, 2, 1, 0, 0, 0, 
	0, 1, 0, 0, 1, 0, 0, 1, 
	0, 0, 1, 2, 2, 2, 1, 1, 
	2, 2, 2, 2, 2, 4, 2, 4, 
	2, 4, 2, 2, 2, 2, 2, 2, 
	2, 2, 4, 2, 4, 2, 2, 2, 
	2, 0
];

_tsip_machine_parser_header_Date_range_lengths = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 1, 1, 
	0, 0, 0, 0, 0, 1, 1, 1, 
	1, 0, 1, 1, 0, 1, 1, 0, 
	1, 1, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0
];

_tsip_machine_parser_header_Date_index_offsets = [
	0, 0, 3, 6, 9, 12, 16, 30, 
	32, 35, 48, 51, 54, 56, 58, 60, 
	62, 64, 81, 86, 89, 91, 93, 95, 
	97, 99, 101, 103, 105, 107, 109, 111, 
	113, 115, 117, 119, 122, 125, 128, 130, 
	132, 135, 138, 141, 144, 147, 152, 155, 
	160, 163, 168, 171, 174, 177, 180, 183, 
	186, 189, 192, 197, 200, 205, 208, 211, 
	214, 217
];

_tsip_machine_parser_header_Date_indicies = [
	0, 0, 1, 2, 2, 1, 3, 3, 
	1, 4, 4, 1, 4, 4, 5, 1, 
	5, 6, 5, 7, 8, 9, 10, 11, 
	7, 8, 9, 10, 11, 1, 12, 1, 
	13, 13, 1, 13, 13, 7, 8, 9, 
	10, 11, 7, 8, 9, 10, 11, 1, 
	14, 14, 1, 15, 15, 1, 16, 1, 
	17, 1, 18, 1, 19, 1, 20, 1, 
	21, 22, 23, 24, 25, 26, 27, 28, 
	21, 22, 23, 24, 25, 26, 27, 28, 
	1, 29, 30, 29, 30, 1, 31, 31, 
	1, 32, 1, 33, 1, 34, 1, 35, 
	1, 36, 1, 37, 1, 38, 1, 39, 
	1, 40, 1, 41, 1, 42, 1, 43, 
	1, 44, 1, 45, 1, 46, 1, 47, 
	47, 1, 48, 48, 1, 49, 49, 1, 
	50, 1, 51, 1, 31, 31, 1, 52, 
	52, 1, 31, 31, 1, 53, 53, 1, 
	31, 31, 1, 54, 55, 54, 55, 1, 
	31, 31, 1, 31, 31, 31, 31, 1, 
	56, 56, 1, 31, 31, 31, 31, 1, 
	57, 57, 1, 31, 31, 1, 58, 58, 
	1, 31, 31, 1, 59, 59, 1, 31, 
	31, 1, 60, 60, 1, 15, 15, 1, 
	61, 60, 61, 60, 1, 15, 15, 1, 
	62, 63, 62, 63, 1, 15, 15, 1, 
	15, 15, 1, 64, 64, 1, 15, 15, 
	1, 1, 0
];

_tsip_machine_parser_header_Date_trans_targs = [
	2, 0, 3, 4, 5, 6, 7, 10, 
	56, 58, 60, 63, 8, 9, 11, 12, 
	13, 14, 15, 16, 17, 18, 41, 43, 
	45, 48, 50, 52, 54, 19, 40, 20, 
	21, 22, 23, 24, 25, 26, 27, 28, 
	29, 30, 31, 32, 33, 34, 35, 36, 
	37, 38, 39, 65, 42, 44, 46, 47, 
	49, 51, 53, 55, 57, 59, 61, 62, 
	64
];

_tsip_machine_parser_header_Date_trans_actions = [
	0, 0, 0, 0, 0, 0, 0, 1, 
	1, 1, 1, 1, 0, 0, 0, 0, 
	3, 0, 1, 0, 5, 1, 1, 1, 
	1, 1, 1, 1, 1, 0, 0, 0, 
	7, 1, 0, 0, 0, 9, 1, 0, 
	11, 1, 0, 13, 1, 0, 15, 0, 
	0, 0, 0, 17, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0
];

tsip_machine_parser_header_Date_start = 1;
tsip_machine_parser_header_Date_first_final = 65;
tsip_machine_parser_header_Date_error = 0;

tsip_machine_parser_header_Date_en_main = 1;


/* line 77 "./ragel/tsip_parser_header_Date.jrl" */

function tsip_header_Date(s_wkday, s_month, i_day, i_year, i_h, i_m, i_s){
	tsip_header.call(this, tsip_header_type_e.Date);
    this.s_wkday = s_wkday;
    this.s_month = s_month;
    this.i_day = i_day;
    this.i_year = i_year;
    this.time = {};
    this.time.i_h = i_h;
    this.time.i_m = i_m;
    this.time.i_s = i_s;
    // Date: Wed, 28 Apr 2010 23:42:50 GMT
}

tsip_header_Date.prototype.toString = function(){
    if(this.s_month){
        return tsk_string_format("{0}, {1} {2} {3} {4}:{5}:{6} GMT",
            this.s_wkday, this.i_day, this.s_month, this.i_year, this.time.i_h, this.time.i_m, this.time.i_s);
    }
    return null;
}

tsip_header_Date.prototype.Parse = function(s_str){
    var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;	
	var hdr_date = new tsip_header_Date(null, null, -1, -1, -1, -1, -1);
	
	
/* line 204 "./src/headers/tsip_header_Date.js" */
{
	 cs = tsip_machine_parser_header_Date_start;
} /* JSCodeGen::writeInit */

/* line 109 "./ragel/tsip_parser_header_Date.jrl" */
	
/* line 211 "./src/headers/tsip_header_Date.js" */
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
	_keys = _tsip_machine_parser_header_Date_key_offsets[cs];
	_trans = _tsip_machine_parser_header_Date_index_offsets[cs];
	_klen = _tsip_machine_parser_header_Date_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsip_machine_parser_header_Date_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsip_machine_parser_header_Date_trans_keys[_mid]) {
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
	  _klen = _tsip_machine_parser_header_Date_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsip_machine_parser_header_Date_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsip_machine_parser_header_Date_trans_keys[_mid+1]) {
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
	_trans = _tsip_machine_parser_header_Date_indicies[_trans];
	cs = _tsip_machine_parser_header_Date_trans_targs[_trans];
	if (_tsip_machine_parser_header_Date_trans_actions[_trans] != 0) {
		_acts = _tsip_machine_parser_header_Date_trans_actions[_trans];
		_nacts = _tsip_machine_parser_header_Date_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsip_machine_parser_header_Date_actions[_acts - 1]) {
case 0:
/* line 28 "./ragel/tsip_parser_header_Date.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 32 "./ragel/tsip_parser_header_Date.jrl" */

	    hdr_date.s_wkday = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			break;
case 2:
/* line 36 "./ragel/tsip_parser_header_Date.jrl" */

	    hdr_date.i_day = tsk_ragel_parser_get_int(s_str, p, i_tag_start);
			break;
case 3:
/* line 40 "./ragel/tsip_parser_header_Date.jrl" */

	    hdr_date.s_month= tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			break;
case 4:
/* line 44 "./ragel/tsip_parser_header_Date.jrl" */

	    hdr_date.i_year = tsk_ragel_parser_get_int(s_str, p, i_tag_start);
			break;
case 5:
/* line 48 "./ragel/tsip_parser_header_Date.jrl" */

	    hdr_date.time.i_h = tsk_ragel_parser_get_int(s_str, p, i_tag_start);
			break;
case 6:
/* line 52 "./ragel/tsip_parser_header_Date.jrl" */

	    hdr_date.time.i_m = tsk_ragel_parser_get_int(s_str, p, i_tag_start);
			break;
case 7:
/* line 56 "./ragel/tsip_parser_header_Date.jrl" */

		hdr_date.time.i_s = tsk_ragel_parser_get_int(s_str, p, i_tag_start);
			break;
case 8:
/* line 60 "./ragel/tsip_parser_header_Date.jrl" */

			break;
/* line 339 "./src/headers/tsip_header_Date.js" */
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

/* line 110 "./ragel/tsip_parser_header_Date.jrl" */
	
	if( cs < 
/* line 369 "./src/headers/tsip_header_Date.js" */
65
/* line 111 "./ragel/tsip_parser_header_Date.jrl" */
 ){
		tsk_utils_log_error("Failed to parse 'Date' header: " + s_str);
		return null;
	}
	
	return hdr_date;
}