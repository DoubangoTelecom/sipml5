
/* line 1 "./ragel/tsip_parser_header_SIP_ETag.jrl" */
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

/* line 43 "./ragel/tsip_parser_header_SIP_ETag.jrl" */



/* line 29 "./src/headers/tsip_header_SIP_ETag.js" */
const _tsip_machine_parser_header_SIP_ETag_actions = [
	0, 1, 0, 1, 1, 1, 2
];

const _tsip_machine_parser_header_SIP_ETag_key_offsets = [
	0, 0, 2, 4, 6, 7, 9, 11, 
	13, 15, 18, 35, 36, 38, 54, 69, 
	70
];

const _tsip_machine_parser_header_SIP_ETag_trans_keys = [
	83, 115, 73, 105, 80, 112, 45, 69, 
	101, 84, 116, 65, 97, 71, 103, 9, 
	32, 58, 9, 13, 32, 33, 37, 39, 
	126, 42, 43, 45, 46, 48, 57, 65, 
	90, 95, 122, 10, 9, 32, 9, 32, 
	33, 37, 39, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 13, 33, 
	37, 39, 126, 42, 43, 45, 46, 48, 
	57, 65, 90, 95, 122, 10, 0
];

const _tsip_machine_parser_header_SIP_ETag_single_lengths = [
	0, 2, 2, 2, 1, 2, 2, 2, 
	2, 3, 7, 1, 2, 6, 5, 1, 
	0
];

const _tsip_machine_parser_header_SIP_ETag_range_lengths = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 5, 0, 0, 5, 5, 0, 
	0
];

const _tsip_machine_parser_header_SIP_ETag_index_offsets = [
	0, 0, 3, 6, 9, 11, 14, 17, 
	20, 23, 27, 40, 42, 45, 57, 68, 
	70
];

const _tsip_machine_parser_header_SIP_ETag_indicies = [
	0, 0, 1, 2, 2, 1, 3, 3, 
	1, 4, 1, 5, 5, 1, 6, 6, 
	1, 7, 7, 1, 8, 8, 1, 8, 
	8, 9, 1, 9, 10, 9, 11, 11, 
	11, 11, 11, 11, 11, 11, 11, 1, 
	12, 1, 13, 13, 1, 13, 13, 11, 
	11, 11, 11, 11, 11, 11, 11, 11, 
	1, 14, 15, 15, 15, 15, 15, 15, 
	15, 15, 15, 1, 16, 1, 1, 0
];

const _tsip_machine_parser_header_SIP_ETag_trans_targs = [
	2, 0, 3, 4, 5, 6, 7, 8, 
	9, 10, 11, 14, 12, 13, 15, 14, 
	16
];

const _tsip_machine_parser_header_SIP_ETag_trans_actions = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 1, 0, 0, 3, 0, 
	5
];

const tsip_machine_parser_header_SIP_ETag_start = 1;
const tsip_machine_parser_header_SIP_ETag_first_final = 16;
const tsip_machine_parser_header_SIP_ETag_error = 0;

const tsip_machine_parser_header_SIP_ETag_en_main = 1;


/* line 46 "./ragel/tsip_parser_header_SIP_ETag.jrl" */

function tsip_header_SIP_ETag(s_etag){
    this.__proto__.__proto__ = new tsip_header(tsip_header_type_e.SIP_ETag);
    this.s_etag = s_etag;
    this.toString = function(){
        return this.s_etag;
    };
}

tsip_header_SIP_ETag.prototype.Parse = function(s_str){
    var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;	
	var hdr_etag = new tsip_header_SIP_ETag(null);
	
	
/* line 121 "./src/headers/tsip_header_SIP_ETag.js" */
{
	 cs = tsip_machine_parser_header_SIP_ETag_start;
} /* JSCodeGen::writeInit */

/* line 65 "./ragel/tsip_parser_header_SIP_ETag.jrl" */
	
/* line 128 "./src/headers/tsip_header_SIP_ETag.js" */
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
	_keys = _tsip_machine_parser_header_SIP_ETag_key_offsets[cs];
	_trans = _tsip_machine_parser_header_SIP_ETag_index_offsets[cs];
	_klen = _tsip_machine_parser_header_SIP_ETag_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsip_machine_parser_header_SIP_ETag_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsip_machine_parser_header_SIP_ETag_trans_keys[_mid]) {
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
	  _klen = _tsip_machine_parser_header_SIP_ETag_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsip_machine_parser_header_SIP_ETag_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsip_machine_parser_header_SIP_ETag_trans_keys[_mid+1]) {
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
	_trans = _tsip_machine_parser_header_SIP_ETag_indicies[_trans];
	cs = _tsip_machine_parser_header_SIP_ETag_trans_targs[_trans];
	if (_tsip_machine_parser_header_SIP_ETag_trans_actions[_trans] != 0) {
		_acts = _tsip_machine_parser_header_SIP_ETag_trans_actions[_trans];
		_nacts = _tsip_machine_parser_header_SIP_ETag_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsip_machine_parser_header_SIP_ETag_actions[_acts - 1]) {
case 0:
/* line 27 "./ragel/tsip_parser_header_SIP_ETag.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 31 "./ragel/tsip_parser_header_SIP_ETag.jrl" */

		hdr_etag.s_etag = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			break;
case 2:
/* line 35 "./ragel/tsip_parser_header_SIP_ETag.jrl" */

			break;
/* line 226 "./src/headers/tsip_header_SIP_ETag.js" */
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

/* line 66 "./ragel/tsip_parser_header_SIP_ETag.jrl" */
	
	if( cs < 
/* line 256 "./src/headers/tsip_header_SIP_ETag.js" */
16
/* line 67 "./ragel/tsip_parser_header_SIP_ETag.jrl" */
 ){
		console.error("Failed to parse 'SIP-ETag' header: %s", s_str);
		return null;
	}
	
	return hdr_etag;
}
