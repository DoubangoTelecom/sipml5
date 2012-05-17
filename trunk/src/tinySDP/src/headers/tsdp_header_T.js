
/* line 1 "./ragel/tsdp_parser_header_T.jrl" */
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

tsdp_header_T.prototype = Object.create(tsdp_header.prototype);

/* line 57 "./ragel/tsdp_parser_header_T.jrl" */



/* line 31 "./src/headers/tsdp_header_T.js" */
const _tsdp_machine_parser_header_T_actions = [
	0, 1, 0, 1, 1, 1, 2
];

const _tsdp_machine_parser_header_T_key_offsets = [
	0, 0, 1, 3, 6, 9, 11, 12, 
	15
];

const _tsdp_machine_parser_header_T_trans_keys = [
	116, 32, 61, 32, 48, 57, 32, 48, 
	57, 48, 57, 10, 13, 48, 57, 0
];

const _tsdp_machine_parser_header_T_single_lengths = [
	0, 1, 2, 1, 1, 0, 1, 1, 
	0
];

const _tsdp_machine_parser_header_T_range_lengths = [
	0, 0, 0, 1, 1, 1, 0, 1, 
	0
];

const _tsdp_machine_parser_header_T_index_offsets = [
	0, 0, 2, 5, 8, 11, 13, 15, 
	18
];

const _tsdp_machine_parser_header_T_trans_targs = [
	2, 0, 2, 3, 0, 3, 4, 0, 
	5, 4, 0, 7, 0, 8, 0, 6, 
	7, 0, 0, 0
];

const _tsdp_machine_parser_header_T_trans_actions = [
	0, 0, 0, 0, 0, 0, 1, 0, 
	3, 0, 0, 1, 0, 0, 0, 5, 
	0, 0, 0, 0
];

const _tsdp_machine_parser_header_T_eof_actions = [
	0, 0, 0, 0, 0, 0, 0, 5, 
	0
];

const tsdp_machine_parser_header_T_start = 1;
const tsdp_machine_parser_header_T_first_final = 7;
const tsdp_machine_parser_header_T_error = 0;

const tsdp_machine_parser_header_T_en_main = 1;


/* line 60 "./ragel/tsdp_parser_header_T.jrl" */

function tsdp_header_T(i_start, i_stop){
	tsdp_header.call(this, tsdp_header_type_e.T);
	this.i_start = i_start;
	this.i_stop = i_stop;
	this.ao_hdr_R = new Array();
}

tsdp_header_T.prototype.toString = function(){
	//"t=3034423619 3042462419\r\n"
	//"r=7d 1h 0 25h\r\n"
	// IMPORTANT: Do not append the last CRLF (because we only print the header value).
	var s_str = tsk_string_format( "{0} {1}", this.i_start, this.i_stop);

	for(var i = 0; i < this.ao_hdr_R.length; ++i){
		if(i == 0){
			s_str += "\r\n";
		}
		s_str += tsk_string_format("{0}=", this.ao_hdr_R[i].e_type.s_name);
		s_str += this.ao_hdr_R[i];

		if(i != (this.ao_hdr_R.length - 1)){
			s_str += "\r\n";
		}
	}

	return s_str;
}

tsdp_header_T.prototype.Parse = function(s_str){
	var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;	
	var hdr_T = new tsdp_header_T(0, 0);
	
	
/* line 125 "./src/headers/tsdp_header_T.js" */
{
	 cs = tsdp_machine_parser_header_T_start;
} /* JSCodeGen::writeInit */

/* line 99 "./ragel/tsdp_parser_header_T.jrl" */
	
/* line 132 "./src/headers/tsdp_header_T.js" */
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
	_keys = _tsdp_machine_parser_header_T_key_offsets[cs];
	_trans = _tsdp_machine_parser_header_T_index_offsets[cs];
	_klen = _tsdp_machine_parser_header_T_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsdp_machine_parser_header_T_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsdp_machine_parser_header_T_trans_keys[_mid]) {
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
	  _klen = _tsdp_machine_parser_header_T_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsdp_machine_parser_header_T_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsdp_machine_parser_header_T_trans_keys[_mid+1]) {
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
	cs = _tsdp_machine_parser_header_T_trans_targs[_trans];
	if (_tsdp_machine_parser_header_T_trans_actions[_trans] != 0) {
		_acts = _tsdp_machine_parser_header_T_trans_actions[_trans];
		_nacts = _tsdp_machine_parser_header_T_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsdp_machine_parser_header_T_actions[_acts - 1]) {
case 0:
/* line 29 "./ragel/tsdp_parser_header_T.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 33 "./ragel/tsdp_parser_header_T.jrl" */

		hdr_T.i_start = tsk_ragel_parser_get_int(s_str, p, i_tag_start);
			break;
case 2:
/* line 37 "./ragel/tsdp_parser_header_T.jrl" */

		hdr_T.i_stop = tsk_ragel_parser_get_int(s_str, p, i_tag_start);
			break;
/* line 230 "./src/headers/tsdp_header_T.js" */
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
	if (p == eof) {
	__acts = _tsdp_machine_parser_header_T_eof_actions[cs];
	__nacts =  _tsdp_machine_parser_header_T_actions[__acts];
	__acts += 1;
	while (__nacts > 0) {
		__nacts -= 1;
		__acts += 1;
		switch (_tsdp_machine_parser_header_T_actions[__acts - 1]) {
case 2:
/* line 37 "./ragel/tsdp_parser_header_T.jrl" */

		hdr_T.i_stop = tsk_ragel_parser_get_int(s_str, p, i_tag_start);
			break;
/* line 263 "./src/headers/tsdp_header_T.js" */
		} /* eof action switch */
	}
	if (_trigger_goto) {
		continue;
	}
}
	}
	if (_goto_level <= _out) {
		break;
	}
	}
	}

/* line 100 "./ragel/tsdp_parser_header_T.jrl" */
	
	if( cs < 
/* line 280 "./src/headers/tsdp_header_T.js" */
7
/* line 101 "./ragel/tsdp_parser_header_T.jrl" */
 ){
		console.error("Failed to parse \"t=\" header: %s", s_str);
		return null;
	}
	
	return hdr_T;
}