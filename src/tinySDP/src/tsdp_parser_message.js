
/* line 1 "./ragel/tsdp_parser_message.jrl" */
/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/

/* line 181 "./ragel/tsdp_parser_message.jrl" */


/* Ragel data */

/* line 15 "./src/tsdp_parser_message.js" */
_tsdp_machine_message_actions = [
	0, 1, 0, 1, 1, 1, 2, 1, 
	3, 1, 4, 1, 5, 1, 6, 1, 
	7, 1, 8, 1, 9, 1, 10, 1, 
	11, 1, 12, 1, 13, 1, 14, 1, 
	15, 1, 16
];

_tsdp_machine_message_key_offsets = [
	0, 0, 2, 5, 6, 8, 11, 13, 
	16, 18, 21, 23, 26, 28, 31, 33, 
	36, 38, 41, 43, 46, 48, 51, 53, 
	56, 58, 61, 63, 66, 68, 71, 73, 
	76, 78, 81
];

_tsdp_machine_message_trans_keys = [
	32, 61, 13, 0, 65535, 10, 32, 61, 
	13, 0, 65535, 32, 61, 13, 0, 65535, 
	32, 61, 13, 0, 65535, 32, 61, 13, 
	0, 65535, 32, 61, 13, 0, 65535, 32, 
	61, 13, 0, 65535, 32, 61, 13, 0, 
	65535, 32, 61, 13, 0, 65535, 32, 61, 
	13, 0, 65535, 32, 61, 13, 0, 65535, 
	32, 61, 13, 0, 65535, 32, 61, 13, 
	0, 65535, 32, 61, 13, 0, 65535, 32, 
	61, 13, 0, 65535, 32, 61, 13, 0, 
	65535, 65, 66, 67, 69, 73, 75, 77, 
	79, 80, 82, 83, 84, 85, 86, 90, 
	97, 98, 99, 101, 105, 107, 109, 111, 
	112, 114, 115, 116, 117, 118, 122, 68, 
	89, 100, 121, 0
];

_tsdp_machine_message_single_lengths = [
	0, 2, 1, 1, 2, 1, 2, 1, 
	2, 1, 2, 1, 2, 1, 2, 1, 
	2, 1, 2, 1, 2, 1, 2, 1, 
	2, 1, 2, 1, 2, 1, 2, 1, 
	2, 1, 30
];

_tsdp_machine_message_range_lengths = [
	0, 0, 1, 0, 0, 1, 0, 1, 
	0, 1, 0, 1, 0, 1, 0, 1, 
	0, 1, 0, 1, 0, 1, 0, 1, 
	0, 1, 0, 1, 0, 1, 0, 1, 
	0, 1, 2
];

_tsdp_machine_message_index_offsets = [
	0, 0, 3, 6, 8, 11, 14, 17, 
	20, 23, 26, 29, 32, 35, 38, 41, 
	44, 47, 50, 53, 56, 59, 62, 65, 
	68, 71, 74, 77, 80, 83, 86, 89, 
	92, 95, 98
];

_tsdp_machine_message_trans_targs = [
	1, 2, 0, 3, 2, 0, 34, 0, 
	4, 5, 0, 3, 5, 0, 6, 7, 
	0, 3, 7, 0, 8, 9, 0, 3, 
	9, 0, 10, 11, 0, 3, 11, 0, 
	12, 13, 0, 3, 13, 0, 14, 15, 
	0, 3, 15, 0, 16, 17, 0, 3, 
	17, 0, 18, 19, 0, 3, 19, 0, 
	20, 21, 0, 3, 21, 0, 22, 23, 
	0, 3, 23, 0, 24, 25, 0, 3, 
	25, 0, 26, 27, 0, 3, 27, 0, 
	28, 29, 0, 3, 29, 0, 30, 31, 
	0, 3, 31, 0, 32, 33, 0, 3, 
	33, 0, 1, 4, 6, 10, 12, 14, 
	16, 18, 20, 22, 24, 26, 28, 30, 
	32, 1, 4, 6, 10, 12, 14, 16, 
	18, 20, 22, 24, 26, 28, 30, 32, 
	8, 8, 0, 0
];

_tsdp_machine_message_trans_actions = [
	0, 0, 0, 3, 0, 0, 0, 0, 
	0, 0, 0, 5, 0, 0, 0, 0, 
	0, 7, 0, 0, 0, 0, 0, 9, 
	0, 0, 0, 0, 0, 11, 0, 0, 
	0, 0, 0, 13, 0, 0, 0, 0, 
	0, 15, 0, 0, 0, 0, 0, 17, 
	0, 0, 0, 0, 0, 19, 0, 0, 
	0, 0, 0, 21, 0, 0, 0, 0, 
	0, 23, 0, 0, 0, 0, 0, 25, 
	0, 0, 0, 0, 0, 27, 0, 0, 
	0, 0, 0, 29, 0, 0, 0, 0, 
	0, 31, 0, 0, 0, 0, 0, 33, 
	0, 0, 1, 1, 1, 1, 1, 1, 
	1, 1, 1, 1, 1, 1, 1, 1, 
	1, 1, 1, 1, 1, 1, 1, 1, 
	1, 1, 1, 1, 1, 1, 1, 1, 
	1, 1, 0, 0
];

tsdp_machine_message_start = 34;
tsdp_machine_message_first_final = 34;
tsdp_machine_message_error = 0;

tsdp_machine_message_en_main = 34;


/* line 185 "./ragel/tsdp_parser_message.jrl" */

tsdp_message.prototype.Parse = function(s_str){
	var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;	
	var sdp_msg = new tsdp_message();
	var header = null;
	var hdr_T = null;
	var hdr_M = null;
	
	
/* line 136 "./src/tsdp_parser_message.js" */
{
	 cs = tsdp_machine_message_start;
} /* JSCodeGen::writeInit */

/* line 199 "./ragel/tsdp_parser_message.jrl" */
	
/* line 143 "./src/tsdp_parser_message.js" */
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
	_keys = _tsdp_machine_message_key_offsets[cs];
	_trans = _tsdp_machine_message_index_offsets[cs];
	_klen = _tsdp_machine_message_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsdp_machine_message_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsdp_machine_message_trans_keys[_mid]) {
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
	  _klen = _tsdp_machine_message_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsdp_machine_message_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsdp_machine_message_trans_keys[_mid+1]) {
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
	cs = _tsdp_machine_message_trans_targs[_trans];
	if (_tsdp_machine_message_trans_actions[_trans] != 0) {
		_acts = _tsdp_machine_message_trans_actions[_trans];
		_nacts = _tsdp_machine_message_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsdp_machine_message_actions[_acts - 1]) {
case 0:
/* line 14 "./ragel/tsdp_parser_message.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 21 "./ragel/tsdp_parser_message.jrl" */

		if(hdr_M){
			if((header = tsdp_header_A.prototype.Parse(tsk_ragel_parser_get_string(s_str, p, i_tag_start)))){
				hdr_M.ao_hdr_A.push(header);
			}
		}
		else if((header = tsdp_header_A.prototype.Parse(tsk_ragel_parser_get_string(s_str, p, i_tag_start)))){
			sdp_msg.add_header(header);
		}
			break;
case 2:
/* line 32 "./ragel/tsdp_parser_message.jrl" */

		if(hdr_M){
			if((header = tsdp_header_B.prototype.Parse(tsk_ragel_parser_get_string(s_str, p, i_tag_start)))){
				hdr_M.ao_hdr_B.push(header);
			}
		}
		else if((header = tsdp_header_B.prototype.Parse(tsk_ragel_parser_get_string(s_str, p, i_tag_start)))){
			sdp_msg.add_header(header);
		}
			break;
case 3:
/* line 43 "./ragel/tsdp_parser_message.jrl" */

		if(hdr_M && !hdr_M.o_hdr_C){
			hdr_M.o_hdr_C = tsdp_header_C.prototype.Parse(tsk_ragel_parser_get_string(s_str, p, i_tag_start));
		}
		else if((header = tsdp_header_C.prototype.Parse(tsk_ragel_parser_get_string(s_str, p, i_tag_start)))){
			sdp_msg.add_header(header);
		}
			break;
case 4:
/* line 52 "./ragel/tsdp_parser_message.jrl" */

		if((header = tsdp_header_Dummy.prototype.Parse(tsk_ragel_parser_get_string(s_str, p, i_tag_start)))){
			if(hdr_M){
				hdr_M.ao_hdr_Dummy.push(header);
			}
			else{
				sdp_msg.add_header(header);
			}
		}
			break;
case 5:
/* line 63 "./ragel/tsdp_parser_message.jrl" */

		if((header = tsdp_header_E.prototype.Parse(tsk_ragel_parser_get_string(s_str, p, i_tag_start)))){
			sdp_msg.add_header(header);
		}
			break;
case 6:
/* line 69 "./ragel/tsdp_parser_message.jrl" */

		if(hdr_M && !hdr_M.o_hdr_I){
			hdr_M.o_hdr_I = tsdp_header_I.prototype.Parse(tsk_ragel_parser_get_string(s_str, p, i_tag_start));
		}
		else if((header = tsdp_header_I.prototype.Parse(tsk_ragel_parser_get_string(s_str, p, i_tag_start)))){
			sdp_msg.add_header(header);
		}
			break;
case 7:
/* line 78 "./ragel/tsdp_parser_message.jrl" */

		if(hdr_M && !hdr_M.o_hdr_K){
			hdr_M.o_hdr_K = tsdp_header_K.prototype.Parse(tsk_ragel_parser_get_string(s_str, p, i_tag_start));
		}
		else if((header = tsdp_header_K.prototype.Parse(tsk_ragel_parser_get_string(s_str, p, i_tag_start)))){
			sdp_msg.add_header(header);
		}
			break;
case 8:
/* line 87 "./ragel/tsdp_parser_message.jrl" */

		if((hdr_M = tsdp_header_M.prototype.Parse(tsk_ragel_parser_get_string(s_str, p, i_tag_start)))){
			sdp_msg.add_header(hdr_M);
		}
			break;
case 9:
/* line 93 "./ragel/tsdp_parser_message.jrl" */

		if((header = tsdp_header_O.prototype.Parse(tsk_ragel_parser_get_string(s_str, p, i_tag_start)))){
			sdp_msg.add_header(header);
		}
			break;
case 10:
/* line 99 "./ragel/tsdp_parser_message.jrl" */

		if((header = tsdp_header_P.prototype.Parse(tsk_ragel_parser_get_string(s_str, p, i_tag_start)))){
			sdp_msg.add_header(header);
		}
			break;
case 11:
/* line 105 "./ragel/tsdp_parser_message.jrl" */

		if((header = tsdp_header_R.prototype.Parse(tsk_ragel_parser_get_string(s_str, p, i_tag_start)))){
			if(hdr_T){
				hdr_T.ao_hdr_R.push(header);
			}
			else{
				sdp_msg.add_header(header);
			}
		}
			break;
case 12:
/* line 116 "./ragel/tsdp_parser_message.jrl" */

		if((header = tsdp_header_S.prototype.Parse(tsk_ragel_parser_get_string(s_str, p, i_tag_start)))){
			sdp_msg.add_header(header);
		}
			break;
case 13:
/* line 122 "./ragel/tsdp_parser_message.jrl" */

		if((hdr_T = tsdp_header_T.prototype.Parse(tsk_ragel_parser_get_string(s_str, p, i_tag_start)))){
			sdp_msg.add_header(hdr_T);
			hdr_T = null;
		}
			break;
case 14:
/* line 129 "./ragel/tsdp_parser_message.jrl" */

		if((header = tsdp_header_U.prototype.Parse(tsk_ragel_parser_get_string(s_str, p, i_tag_start)))){
			sdp_msg.add_header(header);
		}
			break;
case 15:
/* line 135 "./ragel/tsdp_parser_message.jrl" */

		if((header = tsdp_header_V.prototype.Parse(tsk_ragel_parser_get_string(s_str, p, i_tag_start)))){
			sdp_msg.add_header(header);
		}
			break;
case 16:
/* line 141 "./ragel/tsdp_parser_message.jrl" */

		if((header = tsdp_header_Z.prototype.Parse(tsk_ragel_parser_get_string(s_str, p, i_tag_start)))){
			sdp_msg.add_header(header);
		}
			break;
/* line 373 "./src/tsdp_parser_message.js" */
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

/* line 200 "./ragel/tsdp_parser_message.jrl" */
	
	if( cs < 
/* line 403 "./src/tsdp_parser_message.js" */
34
/* line 201 "./ragel/tsdp_parser_message.jrl" */
 ){
		tsk_utils_log_error("Failed to parse sdp message: " + s_str);
		return null;
	}
	
	return sdp_msg;
}

