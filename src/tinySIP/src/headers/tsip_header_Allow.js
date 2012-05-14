
/* line 1 "./ragel/tsip_parser_header_Allow.jrl" */
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
var TSIP_HEADER_ALLOW_DEFAULT =	"ACK, BYE, CANCEL, INVITE, MESSAGE, NOTIFY, OPTIONS, PRACK, REFER, UPDATE";


/* line 46 "./ragel/tsip_parser_header_Allow.jrl" */



/* line 31 "./src/headers/tsip_header_Allow.js" */
const _tsip_machine_parser_header_Allow_actions = [
	0, 1, 0, 1, 1, 1, 2
];

const _tsip_machine_parser_header_Allow_key_offsets = [
	0, 0, 2, 4, 6, 8, 10, 13, 
	30, 31, 47, 51, 52, 54, 57, 74, 
	75, 77, 93
];

const _tsip_machine_parser_header_Allow_trans_keys = [
	65, 97, 76, 108, 76, 108, 79, 111, 
	87, 119, 9, 32, 58, 9, 13, 32, 
	33, 37, 39, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 10, 9, 
	13, 32, 33, 37, 39, 44, 126, 42, 
	46, 48, 57, 65, 90, 95, 122, 9, 
	13, 32, 44, 10, 9, 32, 9, 32, 
	44, 9, 13, 32, 33, 37, 39, 126, 
	42, 43, 45, 46, 48, 57, 65, 90, 
	95, 122, 10, 9, 32, 9, 32, 33, 
	37, 39, 126, 42, 43, 45, 46, 48, 
	57, 65, 90, 95, 122, 0
];

const _tsip_machine_parser_header_Allow_single_lengths = [
	0, 2, 2, 2, 2, 2, 3, 7, 
	1, 8, 4, 1, 2, 3, 7, 1, 
	2, 6, 0
];

const _tsip_machine_parser_header_Allow_range_lengths = [
	0, 0, 0, 0, 0, 0, 0, 5, 
	0, 4, 0, 0, 0, 0, 5, 0, 
	0, 5, 0
];

const _tsip_machine_parser_header_Allow_index_offsets = [
	0, 0, 3, 6, 9, 12, 15, 19, 
	32, 34, 47, 52, 54, 57, 61, 74, 
	76, 79, 91
];

const _tsip_machine_parser_header_Allow_indicies = [
	0, 0, 1, 2, 2, 1, 3, 3, 
	1, 4, 4, 1, 5, 5, 1, 5, 
	5, 6, 1, 6, 7, 6, 8, 8, 
	8, 8, 8, 8, 8, 8, 8, 1, 
	9, 1, 10, 11, 10, 12, 12, 12, 
	13, 12, 12, 12, 12, 12, 1, 14, 
	15, 14, 16, 1, 17, 1, 18, 18, 
	1, 18, 18, 16, 1, 16, 19, 16, 
	8, 8, 8, 8, 8, 8, 8, 8, 
	8, 1, 20, 1, 21, 21, 1, 21, 
	21, 8, 8, 8, 8, 8, 8, 8, 
	8, 8, 1, 1, 0
];

const _tsip_machine_parser_header_Allow_trans_targs = [
	2, 0, 3, 4, 5, 6, 7, 8, 
	9, 18, 10, 8, 9, 14, 10, 11, 
	14, 12, 13, 15, 16, 17
];

const _tsip_machine_parser_header_Allow_trans_actions = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	1, 5, 3, 3, 0, 3, 0, 0, 
	0, 0, 0, 0, 0, 0
];

const tsip_machine_parser_header_Allow_start = 1;
const tsip_machine_parser_header_Allow_first_final = 18;
const tsip_machine_parser_header_Allow_error = 0;

const tsip_machine_parser_header_Allow_en_main = 1;


/* line 49 "./ragel/tsip_parser_header_Allow.jrl" */

function tsip_header_Allow(){
	this.__proto__.__proto__ = new tsip_header(tsip_header_type_e.Allow);
    this.as_methods = new Array();
	this.toString = function(){
        var s_str = null;
        for(var i = 0; i < this.as_methods.length; ++i){
            if(i == 0){
                s_str = this.as_methods[i];
            }
            else{
                s_str += tsk_string_format(",{0}", this.as_methods[i]);
            }
        }
        return s_str;
    };
}

tsip_header_Allow.prototype.has_method = function(s_method){
    if(this.as_methods && s_method){
        var s_method_i = s_method.toLowerCase();
        for(var i = 0; i < this.as_methods.length; ++i){
            if(this.as_methods[i].toLowerCase() == s_method_i){
                return true;
            }
        }
    }
    return false;
}

tsip_header_Allow.prototype.Parse = function(s_str){
    var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;	
	var hdr_allow = new tsip_header_Allow();
	
	
/* line 150 "./src/headers/tsip_header_Allow.js" */
{
	 cs = tsip_machine_parser_header_Allow_start;
} /* JSCodeGen::writeInit */

/* line 89 "./ragel/tsip_parser_header_Allow.jrl" */
	
/* line 157 "./src/headers/tsip_header_Allow.js" */
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
	_keys = _tsip_machine_parser_header_Allow_key_offsets[cs];
	_trans = _tsip_machine_parser_header_Allow_index_offsets[cs];
	_klen = _tsip_machine_parser_header_Allow_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsip_machine_parser_header_Allow_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsip_machine_parser_header_Allow_trans_keys[_mid]) {
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
	  _klen = _tsip_machine_parser_header_Allow_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsip_machine_parser_header_Allow_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsip_machine_parser_header_Allow_trans_keys[_mid+1]) {
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
	_trans = _tsip_machine_parser_header_Allow_indicies[_trans];
	cs = _tsip_machine_parser_header_Allow_trans_targs[_trans];
	if (_tsip_machine_parser_header_Allow_trans_actions[_trans] != 0) {
		_acts = _tsip_machine_parser_header_Allow_trans_actions[_trans];
		_nacts = _tsip_machine_parser_header_Allow_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsip_machine_parser_header_Allow_actions[_acts - 1]) {
case 0:
/* line 29 "./ragel/tsip_parser_header_Allow.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 33 "./ragel/tsip_parser_header_Allow.jrl" */

	    tsk_ragel_parser_add_string(s_str, p, i_tag_start, hdr_allow.as_methods);
			break;
case 2:
/* line 37 "./ragel/tsip_parser_header_Allow.jrl" */

	    
			break;
/* line 256 "./src/headers/tsip_header_Allow.js" */
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

/* line 90 "./ragel/tsip_parser_header_Allow.jrl" */
	
	if( cs < 
/* line 286 "./src/headers/tsip_header_Allow.js" */
18
/* line 91 "./ragel/tsip_parser_header_Allow.jrl" */
 ){
		console.error("Failed to parse 'Allow' header: %s", s_str);
		return null;
	}
	
	return hdr_allow;
}