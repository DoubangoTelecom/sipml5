
/* line 1 "./ragel/tsip_parser_header_Dummy.jrl" */
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

/* line 48 "./ragel/tsip_parser_header_Dummy.jrl" */



/* line 29 "./src/headers/tsip_header_Dummy.js" */
const _tsip_machine_parser_header_Dummy_actions = [
	0, 1, 0, 1, 1, 1, 2, 1, 
	3, 2, 0, 2
];

const _tsip_machine_parser_header_Dummy_key_offsets = [
	0, 0, 14, 31, 34, 39, 42, 43, 
	44, 46, 51
];

const _tsip_machine_parser_header_Dummy_trans_keys = [
	33, 37, 39, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 9, 32, 
	33, 37, 39, 58, 126, 42, 43, 45, 
	46, 48, 57, 65, 90, 95, 122, 9, 
	32, 58, 9, 13, 32, 0, 65535, 13, 
	0, 65535, 10, 10, 9, 32, 9, 13, 
	32, 0, 65535, 0
];

const _tsip_machine_parser_header_Dummy_single_lengths = [
	0, 4, 7, 3, 3, 1, 1, 1, 
	2, 3, 0
];

const _tsip_machine_parser_header_Dummy_range_lengths = [
	0, 5, 5, 0, 1, 1, 0, 0, 
	0, 1, 0
];

const _tsip_machine_parser_header_Dummy_index_offsets = [
	0, 0, 10, 23, 27, 32, 35, 37, 
	39, 42, 47
];

const _tsip_machine_parser_header_Dummy_indicies = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 1, 2, 2, 3, 3, 3, 4, 
	3, 3, 3, 3, 3, 3, 1, 5, 
	5, 6, 1, 6, 8, 6, 7, 1, 
	10, 9, 1, 11, 1, 12, 1, 13, 
	13, 1, 13, 14, 13, 7, 1, 1, 
	0
];

const _tsip_machine_parser_header_Dummy_trans_targs = [
	2, 0, 3, 2, 4, 3, 4, 5, 
	7, 5, 6, 10, 8, 9, 6
];

const _tsip_machine_parser_header_Dummy_trans_actions = [
	1, 0, 3, 0, 3, 0, 0, 1, 
	0, 0, 5, 7, 0, 0, 9
];

const tsip_machine_parser_header_Dummy_start = 1;
const tsip_machine_parser_header_Dummy_first_final = 10;
const tsip_machine_parser_header_Dummy_error = 0;

const tsip_machine_parser_header_Dummy_en_main = 1;


/* line 51 "./ragel/tsip_parser_header_Dummy.jrl" */

function tsip_header_Dummy(s_name, s_value){
    this.__proto__.__proto__ = new tsip_header(tsip_header_type_e.Dummy);
    this.s_name = s_name;
	this.s_value = s_value;
    this.toString = function(){
        return this.s_value;
    }
}

tsip_header_Dummy.prototype.Parse = function(s_str){
	var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;	
	var hdr_Dummy = new tsip_header_Dummy(null);
	
	
/* line 113 "./src/headers/tsip_header_Dummy.js" */
{
	 cs = tsip_machine_parser_header_Dummy_start;
} /* JSCodeGen::writeInit */

/* line 71 "./ragel/tsip_parser_header_Dummy.jrl" */
	
/* line 120 "./src/headers/tsip_header_Dummy.js" */
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
	_keys = _tsip_machine_parser_header_Dummy_key_offsets[cs];
	_trans = _tsip_machine_parser_header_Dummy_index_offsets[cs];
	_klen = _tsip_machine_parser_header_Dummy_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsip_machine_parser_header_Dummy_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsip_machine_parser_header_Dummy_trans_keys[_mid]) {
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
	  _klen = _tsip_machine_parser_header_Dummy_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsip_machine_parser_header_Dummy_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsip_machine_parser_header_Dummy_trans_keys[_mid+1]) {
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
	_trans = _tsip_machine_parser_header_Dummy_indicies[_trans];
	cs = _tsip_machine_parser_header_Dummy_trans_targs[_trans];
	if (_tsip_machine_parser_header_Dummy_trans_actions[_trans] != 0) {
		_acts = _tsip_machine_parser_header_Dummy_trans_actions[_trans];
		_nacts = _tsip_machine_parser_header_Dummy_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsip_machine_parser_header_Dummy_actions[_acts - 1]) {
case 0:
/* line 27 "./ragel/tsip_parser_header_Dummy.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 31 "./ragel/tsip_parser_header_Dummy.jrl" */

		hdr_Dummy.s_name = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			break;
case 2:
/* line 35 "./ragel/tsip_parser_header_Dummy.jrl" */

		hdr_Dummy.s_value = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			break;
case 3:
/* line 39 "./ragel/tsip_parser_header_Dummy.jrl" */

	    
			break;
/* line 224 "./src/headers/tsip_header_Dummy.js" */
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

/* line 72 "./ragel/tsip_parser_header_Dummy.jrl" */
	
	if( cs < 
/* line 254 "./src/headers/tsip_header_Dummy.js" */
10
/* line 73 "./ragel/tsip_parser_header_Dummy.jrl" */
 ){
		console.error("Failed to parse 'Dummy' header: %s", s_str);
		return null;
	}
	
	return hdr_Dummy;
}