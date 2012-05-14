
/* line 1 "./ragel/tsip_parser_header_Allow_Events.jrl" */
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

/* line 47 "./ragel/tsip_parser_header_Allow_Events.jrl" */




/* line 30 "./src/headers/tsip_header_Allow_Events.js" */
const _tsip_machine_parser_header_Allow_events_actions = [
	0, 1, 0, 1, 1, 1, 2
];

const _tsip_machine_parser_header_Allow_events_key_offsets = [
	0, 0, 4, 6, 8, 10, 12, 13, 
	15, 17, 19, 21, 23, 25, 28, 44, 
	45, 47, 62, 79, 83, 84, 86, 89, 
	90, 103
];

const _tsip_machine_parser_header_Allow_events_trans_keys = [
	65, 85, 97, 117, 76, 108, 76, 108, 
	79, 111, 87, 119, 45, 69, 101, 86, 
	118, 69, 101, 78, 110, 84, 116, 83, 
	115, 9, 32, 58, 9, 13, 32, 33, 
	37, 39, 45, 126, 42, 43, 48, 57, 
	65, 90, 95, 122, 10, 9, 32, 9, 
	32, 33, 37, 39, 45, 126, 42, 43, 
	48, 57, 65, 90, 95, 122, 9, 13, 
	32, 33, 37, 39, 44, 46, 126, 42, 
	45, 48, 57, 65, 90, 95, 122, 9, 
	13, 32, 44, 10, 9, 32, 9, 32, 
	44, 10, 33, 37, 39, 45, 126, 42, 
	43, 48, 57, 65, 90, 95, 122, 0
];

const _tsip_machine_parser_header_Allow_events_single_lengths = [
	0, 4, 2, 2, 2, 2, 1, 2, 
	2, 2, 2, 2, 2, 3, 8, 1, 
	2, 7, 9, 4, 1, 2, 3, 1, 
	5, 0
];

const _tsip_machine_parser_header_Allow_events_range_lengths = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 4, 0, 
	0, 4, 4, 0, 0, 0, 0, 0, 
	4, 0
];

const _tsip_machine_parser_header_Allow_events_index_offsets = [
	0, 0, 5, 8, 11, 14, 17, 19, 
	22, 25, 28, 31, 34, 37, 41, 54, 
	56, 59, 71, 85, 90, 92, 95, 99, 
	101, 111
];

const _tsip_machine_parser_header_Allow_events_indicies = [
	0, 2, 0, 2, 1, 3, 3, 1, 
	4, 4, 1, 5, 5, 1, 6, 6, 
	1, 7, 1, 8, 8, 1, 9, 9, 
	1, 10, 10, 1, 11, 11, 1, 12, 
	12, 1, 2, 2, 1, 2, 2, 13, 
	1, 13, 14, 13, 15, 15, 15, 15, 
	15, 15, 15, 15, 15, 1, 16, 1, 
	17, 17, 1, 17, 17, 15, 15, 15, 
	15, 15, 15, 15, 15, 15, 1, 18, 
	19, 18, 20, 20, 20, 21, 22, 20, 
	20, 20, 20, 20, 1, 23, 24, 23, 
	13, 1, 25, 1, 26, 26, 1, 26, 
	26, 13, 1, 27, 1, 20, 20, 20, 
	20, 20, 20, 20, 20, 20, 1, 1, 
	0
];

const _tsip_machine_parser_header_Allow_events_trans_targs = [
	2, 0, 13, 3, 4, 5, 6, 7, 
	8, 9, 10, 11, 12, 14, 15, 18, 
	16, 17, 19, 23, 18, 14, 24, 19, 
	20, 21, 22, 25
];

const _tsip_machine_parser_header_Allow_events_trans_actions = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 1, 
	0, 0, 3, 3, 0, 3, 0, 0, 
	0, 0, 0, 5
];

const tsip_machine_parser_header_Allow_events_start = 1;
const tsip_machine_parser_header_Allow_events_first_final = 25;
const tsip_machine_parser_header_Allow_events_error = 0;

const tsip_machine_parser_header_Allow_events_en_main = 1;


/* line 51 "./ragel/tsip_parser_header_Allow_Events.jrl" */

function tsip_header_Allow_Events(){
	this.__proto__.__proto__ = new tsip_header(tsip_header_type_e.Allow_Events);
    this.as_events = new Array();
	this.toString = function(){
        var s_str = null;
        for(var i = 0; i < this.as_events.length; ++i){
            if(i == 0){
                s_str = this.as_events[i];
            }
            else{
                s_str += tsk_string_format(",{0}", this.as_events[i]);
            }
        }
        return s_str;
    }
}

tsip_header_Allow_Events.prototype.Parse = function(s_str){
    var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;	
	var hdr_allow_events = new tsip_header_Allow_Events();
	
	
/* line 147 "./src/headers/tsip_header_Allow_Events.js" */
{
	 cs = tsip_machine_parser_header_Allow_events_start;
} /* JSCodeGen::writeInit */

/* line 79 "./ragel/tsip_parser_header_Allow_Events.jrl" */
	
/* line 154 "./src/headers/tsip_header_Allow_Events.js" */
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
	_keys = _tsip_machine_parser_header_Allow_events_key_offsets[cs];
	_trans = _tsip_machine_parser_header_Allow_events_index_offsets[cs];
	_klen = _tsip_machine_parser_header_Allow_events_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsip_machine_parser_header_Allow_events_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsip_machine_parser_header_Allow_events_trans_keys[_mid]) {
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
	  _klen = _tsip_machine_parser_header_Allow_events_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsip_machine_parser_header_Allow_events_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsip_machine_parser_header_Allow_events_trans_keys[_mid+1]) {
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
	_trans = _tsip_machine_parser_header_Allow_events_indicies[_trans];
	cs = _tsip_machine_parser_header_Allow_events_trans_targs[_trans];
	if (_tsip_machine_parser_header_Allow_events_trans_actions[_trans] != 0) {
		_acts = _tsip_machine_parser_header_Allow_events_trans_actions[_trans];
		_nacts = _tsip_machine_parser_header_Allow_events_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsip_machine_parser_header_Allow_events_actions[_acts - 1]) {
case 0:
/* line 27 "./ragel/tsip_parser_header_Allow_Events.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 31 "./ragel/tsip_parser_header_Allow_Events.jrl" */

	    tsk_ragel_parser_add_string(s_str, p, i_tag_start, hdr_allow_events.as_events);
			break;
case 2:
/* line 35 "./ragel/tsip_parser_header_Allow_Events.jrl" */

			break;
/* line 252 "./src/headers/tsip_header_Allow_Events.js" */
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

/* line 80 "./ragel/tsip_parser_header_Allow_Events.jrl" */
	
	if( cs < 
/* line 282 "./src/headers/tsip_header_Allow_Events.js" */
25
/* line 81 "./ragel/tsip_parser_header_Allow_Events.jrl" */
 ){
		console.error("Failed to parse 'Allow-Events' header: %s", s_str);
		return null;
	}
	
	return hdr_allow_events;
}