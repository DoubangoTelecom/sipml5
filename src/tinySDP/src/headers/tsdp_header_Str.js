
/* line 1 "./ragel/tsdp_parser_header_Str.jrl" */
/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/

// Parse headers: B, E, I, K, P, R, S, T, U, Z, Dummy
tsdp_header_Str.prototype = Object.create(tsdp_header.prototype);
tsdp_header_B.prototype = Object.create(tsdp_header_Str.prototype);
tsdp_header_E.prototype = Object.create(tsdp_header_Str.prototype);
tsdp_header_I.prototype = Object.create(tsdp_header_Str.prototype);
tsdp_header_K.prototype = Object.create(tsdp_header_Str.prototype);
tsdp_header_P.prototype = Object.create(tsdp_header_Str.prototype);
tsdp_header_R.prototype = Object.create(tsdp_header_Str.prototype);
tsdp_header_S.prototype = Object.create(tsdp_header_Str.prototype);
tsdp_header_T.prototype = Object.create(tsdp_header_Str.prototype);
tsdp_header_U.prototype = Object.create(tsdp_header_Str.prototype);
tsdp_header_Z.prototype = Object.create(tsdp_header_Str.prototype);
tsdp_header_Dummy.prototype = Object.create(tsdp_header_Str.prototype);

tsdp_header_Str.prototype.s_value = null;


/* line 56 "./ragel/tsdp_parser_header_Str.jrl" */



/* line 31 "./src/headers/tsdp_header_Str.js" */
_tsdp_machine_parser_header_Str_actions = [
	0, 1, 0, 1, 1, 1, 2, 1, 
	3, 1, 4, 1, 5, 1, 6, 1, 
	7, 1, 8, 1, 9, 1, 10, 1, 
	11, 1, 12, 2, 0, 12
];

_tsdp_machine_parser_header_Str_key_offsets = [
	0, 0, 14, 16, 18, 19, 21, 23, 
	25, 27, 29, 31, 33, 35, 37, 39, 
	43, 46
];

_tsdp_machine_parser_header_Str_trans_keys = [
	98, 101, 105, 107, 112, 114, 115, 116, 
	117, 122, 65, 90, 97, 121, 32, 61, 
	32, 61, 10, 32, 61, 32, 61, 32, 
	61, 32, 61, 32, 61, 32, 61, 32, 
	61, 32, 61, 32, 61, 32, 61, 13, 
	32, 0, 65535, 13, 0, 65535, 0
];

_tsdp_machine_parser_header_Str_single_lengths = [
	0, 10, 2, 2, 1, 2, 2, 2, 
	2, 2, 2, 2, 2, 2, 2, 2, 
	1, 0
];

_tsdp_machine_parser_header_Str_range_lengths = [
	0, 2, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 1, 
	1, 0
];

_tsdp_machine_parser_header_Str_index_offsets = [
	0, 0, 13, 16, 19, 21, 24, 27, 
	30, 33, 36, 39, 42, 45, 48, 51, 
	55, 58
];

_tsdp_machine_parser_header_Str_trans_targs = [
	5, 6, 7, 8, 9, 10, 11, 12, 
	13, 14, 2, 2, 0, 3, 15, 0, 
	3, 15, 0, 17, 0, 3, 15, 0, 
	3, 15, 0, 3, 15, 0, 3, 15, 
	0, 3, 15, 0, 3, 15, 0, 3, 
	15, 0, 3, 15, 0, 3, 15, 0, 
	3, 15, 0, 4, 15, 16, 0, 4, 
	16, 0, 0, 0
];

_tsdp_machine_parser_header_Str_trans_actions = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 1, 1, 0, 23, 23, 0, 
	0, 0, 0, 0, 0, 3, 3, 0, 
	5, 5, 0, 7, 7, 0, 9, 9, 
	0, 11, 11, 0, 13, 13, 0, 15, 
	15, 0, 17, 17, 0, 19, 19, 0, 
	21, 21, 0, 27, 0, 1, 0, 25, 
	0, 0, 0, 0
];

_tsdp_machine_parser_header_Str_eof_actions = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 27, 
	25, 0
];

tsdp_machine_parser_header_Str_start = 1;
tsdp_machine_parser_header_Str_first_final = 15;
tsdp_machine_parser_header_Str_error = 0;

tsdp_machine_parser_header_Str_en_main = 1;


/* line 59 "./ragel/tsdp_parser_header_Str.jrl" */

function tsdp_header_Str(e_type, s_value){
	tsdp_header.call(this, e_type);
	this.s_value = s_value;
}

tsdp_header_Str.prototype.toString = function(){
	return this.s_value;
}

tsdp_header_Str.prototype.Parse = function(s_str){
	var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;	
	var o_hdr = null;
	
	
/* line 128 "./src/headers/tsdp_header_Str.js" */
{
	 cs = tsdp_machine_parser_header_Str_start;
} /* JSCodeGen::writeInit */

/* line 79 "./ragel/tsdp_parser_header_Str.jrl" */
	
/* line 135 "./src/headers/tsdp_header_Str.js" */
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
	_keys = _tsdp_machine_parser_header_Str_key_offsets[cs];
	_trans = _tsdp_machine_parser_header_Str_index_offsets[cs];
	_klen = _tsdp_machine_parser_header_Str_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsdp_machine_parser_header_Str_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsdp_machine_parser_header_Str_trans_keys[_mid]) {
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
	  _klen = _tsdp_machine_parser_header_Str_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsdp_machine_parser_header_Str_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsdp_machine_parser_header_Str_trans_keys[_mid+1]) {
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
	cs = _tsdp_machine_parser_header_Str_trans_targs[_trans];
	if (_tsdp_machine_parser_header_Str_trans_actions[_trans] != 0) {
		_acts = _tsdp_machine_parser_header_Str_trans_actions[_trans];
		_nacts = _tsdp_machine_parser_header_Str_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsdp_machine_parser_header_Str_actions[_acts - 1]) {
case 0:
/* line 29 "./ragel/tsdp_parser_header_Str.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 33 "./ragel/tsdp_parser_header_Str.jrl" */
 o_hdr = new tsdp_header_B(); 		break;
case 2:
/* line 34 "./ragel/tsdp_parser_header_Str.jrl" */
 o_hdr = new tsdp_header_E(); 		break;
case 3:
/* line 35 "./ragel/tsdp_parser_header_Str.jrl" */
 o_hdr = new tsdp_header_I(); 		break;
case 4:
/* line 36 "./ragel/tsdp_parser_header_Str.jrl" */
 o_hdr = new tsdp_header_K(); 		break;
case 5:
/* line 37 "./ragel/tsdp_parser_header_Str.jrl" */
 o_hdr = new tsdp_header_P(); 		break;
case 6:
/* line 38 "./ragel/tsdp_parser_header_Str.jrl" */
 o_hdr = new tsdp_header_R(); 		break;
case 7:
/* line 39 "./ragel/tsdp_parser_header_Str.jrl" */
 o_hdr = new tsdp_header_S(); 		break;
case 8:
/* line 40 "./ragel/tsdp_parser_header_Str.jrl" */
 o_hdr = new tsdp_header_T(); 		break;
case 9:
/* line 41 "./ragel/tsdp_parser_header_Str.jrl" */
 o_hdr = new tsdp_header_U(); 		break;
case 10:
/* line 42 "./ragel/tsdp_parser_header_Str.jrl" */
 o_hdr = new tsdp_header_Z(); 		break;
case 11:
/* line 43 "./ragel/tsdp_parser_header_Str.jrl" */
 o_hdr = new tsdp_header_Dummy(); o_hdr.c_name = tsk_ragel_parser_get_string(s_str, p, i_tag_start)[0]; 		break;
case 12:
/* line 45 "./ragel/tsdp_parser_header_Str.jrl" */

		if(o_hdr){
			o_hdr.s_value = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
		}
			break;
/* line 263 "./src/headers/tsdp_header_Str.js" */
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
	__acts = _tsdp_machine_parser_header_Str_eof_actions[cs];
	__nacts =  _tsdp_machine_parser_header_Str_actions[__acts];
	__acts += 1;
	while (__nacts > 0) {
		__nacts -= 1;
		__acts += 1;
		switch (_tsdp_machine_parser_header_Str_actions[__acts - 1]) {
case 0:
/* line 29 "./ragel/tsdp_parser_header_Str.jrl" */

		i_tag_start = p;
			break;
case 12:
/* line 45 "./ragel/tsdp_parser_header_Str.jrl" */

		if(o_hdr){
			o_hdr.s_value = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
		}
			break;
/* line 303 "./src/headers/tsdp_header_Str.js" */
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

/* line 80 "./ragel/tsdp_parser_header_Str.jrl" */
	
	if( cs < 
/* line 320 "./src/headers/tsdp_header_Str.js" */
15
/* line 81 "./ragel/tsdp_parser_header_Str.jrl" */
 ){
		tsk_utils_log_error("Failed to parse header: " + s_str);
		return null;
	}
	
	return o_hdr;
}

function tsdp_header_B(s_value){ tsdp_header_Str.call(this, tsdp_header_type_e.B, s_value); }
function tsdp_header_E(s_value){ tsdp_header_Str.call(this, tsdp_header_type_e.E, s_value); }
function tsdp_header_I(s_value){ tsdp_header_Str.call(this, tsdp_header_type_e.I, s_value); }
function tsdp_header_K(s_value){ tsdp_header_Str.call(this, tsdp_header_type_e.K, s_value); }
function tsdp_header_P(s_value){ tsdp_header_Str.call(this, tsdp_header_type_e.P, s_value); }
function tsdp_header_R(s_value){ tsdp_header_Str.call(this, tsdp_header_type_e.R, s_value); }
function tsdp_header_S(s_value){ tsdp_header_Str.call(this, tsdp_header_type_e.S, s_value); }
function tsdp_header_T(s_value){ tsdp_header_Str.call(this, tsdp_header_type_e.T, s_value); }
function tsdp_header_U(s_value){ tsdp_header_Str.call(this, tsdp_header_type_e.U, s_value); }
function tsdp_header_Z(s_value){ tsdp_header_Str.call(this, tsdp_header_type_e.Z, s_value); }
function tsdp_header_Dummy(s_name, s_value){ tsdp_header_Str.call(this, tsdp_header_type_e.DUMMY, s_value); this.s_name = s_name; }
