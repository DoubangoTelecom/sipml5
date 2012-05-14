
/* line 1 "./ragel/tsip_parser_header_RSeq.jrl" */
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

/* line 43 "./ragel/tsip_parser_header_RSeq.jrl" */




/* line 30 "./src/headers/tsip_header_RSeq.js" */
const _tsip_machine_parser_header_RSeq_actions = [
	0, 1, 0, 1, 1, 1, 2
];

const _tsip_machine_parser_header_RSeq_key_offsets = [
	0, 0, 2, 4, 6, 8, 11, 16, 
	17, 19, 23, 26, 27
];

const _tsip_machine_parser_header_RSeq_trans_keys = [
	82, 114, 83, 115, 69, 101, 81, 113, 
	9, 32, 58, 9, 13, 32, 48, 57, 
	10, 9, 32, 9, 32, 48, 57, 13, 
	48, 57, 10, 0
];

const _tsip_machine_parser_header_RSeq_single_lengths = [
	0, 2, 2, 2, 2, 3, 3, 1, 
	2, 2, 1, 1, 0
];

const _tsip_machine_parser_header_RSeq_range_lengths = [
	0, 0, 0, 0, 0, 0, 1, 0, 
	0, 1, 1, 0, 0
];

const _tsip_machine_parser_header_RSeq_index_offsets = [
	0, 0, 3, 6, 9, 12, 16, 21, 
	23, 26, 30, 33, 35
];

const _tsip_machine_parser_header_RSeq_indicies = [
	0, 0, 1, 2, 2, 1, 3, 3, 
	1, 4, 4, 1, 4, 4, 5, 1, 
	5, 6, 5, 7, 1, 8, 1, 9, 
	9, 1, 9, 9, 7, 1, 10, 11, 
	1, 12, 1, 1, 0
];

const _tsip_machine_parser_header_RSeq_trans_targs = [
	2, 0, 3, 4, 5, 6, 7, 10, 
	8, 9, 11, 10, 12
];

const _tsip_machine_parser_header_RSeq_trans_actions = [
	0, 0, 0, 0, 0, 0, 0, 1, 
	0, 0, 3, 0, 5
];

const tsip_machine_parser_header_RSeq_start = 1;
const tsip_machine_parser_header_RSeq_first_final = 12;
const tsip_machine_parser_header_RSeq_error = 0;

const tsip_machine_parser_header_RSeq_en_main = 1;


/* line 47 "./ragel/tsip_parser_header_RSeq.jrl" */

function tsip_header_RSeq(i_seq){
    this.__proto__.__proto__ = new tsip_header(tsip_header_type_e.RSeq);
    this.i_seq = i_seq;
    this.toString = function(){
        if(this.i_seq >= 0){
            return this.i_seq.toString();
        }
        return null;
    };
}

tsip_header_RSeq.prototype.Parse = function(s_str){
    var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;	
	var hdr_rseq = new tsip_header_RSeq(0);
	
	
/* line 110 "./src/headers/tsip_header_RSeq.js" */
{
	 cs = tsip_machine_parser_header_RSeq_start;
} /* JSCodeGen::writeInit */

/* line 69 "./ragel/tsip_parser_header_RSeq.jrl" */
	
/* line 117 "./src/headers/tsip_header_RSeq.js" */
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
	_keys = _tsip_machine_parser_header_RSeq_key_offsets[cs];
	_trans = _tsip_machine_parser_header_RSeq_index_offsets[cs];
	_klen = _tsip_machine_parser_header_RSeq_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsip_machine_parser_header_RSeq_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsip_machine_parser_header_RSeq_trans_keys[_mid]) {
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
	  _klen = _tsip_machine_parser_header_RSeq_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsip_machine_parser_header_RSeq_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsip_machine_parser_header_RSeq_trans_keys[_mid+1]) {
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
	_trans = _tsip_machine_parser_header_RSeq_indicies[_trans];
	cs = _tsip_machine_parser_header_RSeq_trans_targs[_trans];
	if (_tsip_machine_parser_header_RSeq_trans_actions[_trans] != 0) {
		_acts = _tsip_machine_parser_header_RSeq_trans_actions[_trans];
		_nacts = _tsip_machine_parser_header_RSeq_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsip_machine_parser_header_RSeq_actions[_acts - 1]) {
case 0:
/* line 27 "./ragel/tsip_parser_header_RSeq.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 31 "./ragel/tsip_parser_header_RSeq.jrl" */

		hdr_rseq.i_seq = tsk_ragel_parser_get_int(s_str, p, i_tag_start);
			break;
case 2:
/* line 35 "./ragel/tsip_parser_header_RSeq.jrl" */

			break;
/* line 215 "./src/headers/tsip_header_RSeq.js" */
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

/* line 70 "./ragel/tsip_parser_header_RSeq.jrl" */
	
	if( cs < 
/* line 245 "./src/headers/tsip_header_RSeq.js" */
12
/* line 71 "./ragel/tsip_parser_header_RSeq.jrl" */
 ){
		console.error("Failed to parse 'RSeq' header: %s", s_str);
		return null;
	}
	
	return hdr_rseq;
}