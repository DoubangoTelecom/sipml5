
/* line 1 "./ragel/tsdp_parser_header_V.jrl" */
/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/

tsdp_header_V.prototype = Object.create(tsdp_header.prototype);

/* line 27 "./ragel/tsdp_parser_header_V.jrl" */



/* line 16 "./src/headers/tsdp_header_V.js" */
_tsdp_machine_parser_header_V_actions = [
	0, 1, 0, 1, 1
];

_tsdp_machine_parser_header_V_key_offsets = [
	0, 0, 1, 3, 6, 7, 10
];

_tsdp_machine_parser_header_V_trans_keys = [
	118, 32, 61, 32, 48, 57, 10, 13, 
	48, 57, 0
];

_tsdp_machine_parser_header_V_single_lengths = [
	0, 1, 2, 1, 1, 1, 0
];

_tsdp_machine_parser_header_V_range_lengths = [
	0, 0, 0, 1, 0, 1, 0
];

_tsdp_machine_parser_header_V_index_offsets = [
	0, 0, 2, 5, 8, 10, 13
];

_tsdp_machine_parser_header_V_trans_targs = [
	2, 0, 2, 3, 0, 3, 5, 0, 
	6, 0, 4, 5, 0, 0, 0
];

_tsdp_machine_parser_header_V_trans_actions = [
	0, 0, 0, 0, 0, 0, 1, 0, 
	0, 0, 3, 0, 0, 0, 0
];

_tsdp_machine_parser_header_V_eof_actions = [
	0, 0, 0, 0, 0, 3, 0
];

tsdp_machine_parser_header_V_start = 1;
tsdp_machine_parser_header_V_first_final = 5;
tsdp_machine_parser_header_V_error = 0;

tsdp_machine_parser_header_V_en_main = 1;


/* line 30 "./ragel/tsdp_parser_header_V.jrl" */

function tsdp_header_V(i_version){
	tsdp_header.call(this, tsdp_header_type_e.V);
	this.i_version = i_version;
	this.toString = function(){
		return this.i_version.toString();
	}
}

tsdp_header_V.prototype.Parse = function(s_str){
	var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;	
	var hdr_V = new tsdp_header_V(0);
	
	
/* line 83 "./src/headers/tsdp_header_V.js" */
{
	 cs = tsdp_machine_parser_header_V_start;
} /* JSCodeGen::writeInit */

/* line 49 "./ragel/tsdp_parser_header_V.jrl" */
	
/* line 90 "./src/headers/tsdp_header_V.js" */
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
	_keys = _tsdp_machine_parser_header_V_key_offsets[cs];
	_trans = _tsdp_machine_parser_header_V_index_offsets[cs];
	_klen = _tsdp_machine_parser_header_V_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsdp_machine_parser_header_V_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsdp_machine_parser_header_V_trans_keys[_mid]) {
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
	  _klen = _tsdp_machine_parser_header_V_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsdp_machine_parser_header_V_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsdp_machine_parser_header_V_trans_keys[_mid+1]) {
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
	cs = _tsdp_machine_parser_header_V_trans_targs[_trans];
	if (_tsdp_machine_parser_header_V_trans_actions[_trans] != 0) {
		_acts = _tsdp_machine_parser_header_V_trans_actions[_trans];
		_nacts = _tsdp_machine_parser_header_V_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsdp_machine_parser_header_V_actions[_acts - 1]) {
case 0:
/* line 14 "./ragel/tsdp_parser_header_V.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 18 "./ragel/tsdp_parser_header_V.jrl" */

		hdr_V.i_version = tsk_ragel_parser_get_int(s_str, p, i_tag_start);
			break;
/* line 183 "./src/headers/tsdp_header_V.js" */
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
	__acts = _tsdp_machine_parser_header_V_eof_actions[cs];
	__nacts =  _tsdp_machine_parser_header_V_actions[__acts];
	__acts += 1;
	while (__nacts > 0) {
		__nacts -= 1;
		__acts += 1;
		switch (_tsdp_machine_parser_header_V_actions[__acts - 1]) {
case 1:
/* line 18 "./ragel/tsdp_parser_header_V.jrl" */

		hdr_V.i_version = tsk_ragel_parser_get_int(s_str, p, i_tag_start);
			break;
/* line 216 "./src/headers/tsdp_header_V.js" */
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

/* line 50 "./ragel/tsdp_parser_header_V.jrl" */
	
	if( cs < 
/* line 233 "./src/headers/tsdp_header_V.js" */
5
/* line 51 "./ragel/tsdp_parser_header_V.jrl" */
 ){
		tsk_utils_log_error("Failed to parse \"v=\" header: " + s_str);
		return null;
	}
	
	return hdr_V;
}
