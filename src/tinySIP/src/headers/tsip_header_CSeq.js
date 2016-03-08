
/* line 1 "./ragel/tsip_parser_header_CSeq.jrl" */
/*
* Copyright (C) 2012-2016 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
tsip_header_CSeq.prototype = Object.create(tsip_header.prototype);

var TSIP_HEADER_CSEQ_NONE = 0;
var TSIP_HEADER_CSEQ_DEFAULT = 1;


/* line 38 "./ragel/tsip_parser_header_CSeq.jrl" */



/* line 19 "./src/headers/tsip_header_CSeq.js" */
_tsip_machine_parser_header_CSeq_actions = [
	0, 1, 0, 1, 1, 1, 2, 1, 
	3
];

_tsip_machine_parser_header_CSeq_key_offsets = [
	0, 0, 2, 4, 6, 8, 11, 16, 
	17, 19, 23, 28, 45, 46, 48, 64, 
	79, 80
];

_tsip_machine_parser_header_CSeq_trans_keys = [
	67, 99, 83, 115, 69, 101, 81, 113, 
	9, 32, 58, 9, 13, 32, 48, 57, 
	10, 9, 32, 9, 32, 48, 57, 9, 
	13, 32, 48, 57, 9, 13, 32, 33, 
	37, 39, 126, 42, 43, 45, 46, 48, 
	57, 65, 90, 95, 122, 10, 9, 32, 
	9, 32, 33, 37, 39, 126, 42, 43, 
	45, 46, 48, 57, 65, 90, 95, 122, 
	13, 33, 37, 39, 126, 42, 43, 45, 
	46, 48, 57, 65, 90, 95, 122, 10, 
	0
];

_tsip_machine_parser_header_CSeq_single_lengths = [
	0, 2, 2, 2, 2, 3, 3, 1, 
	2, 2, 3, 7, 1, 2, 6, 5, 
	1, 0
];

_tsip_machine_parser_header_CSeq_range_lengths = [
	0, 0, 0, 0, 0, 0, 1, 0, 
	0, 1, 1, 5, 0, 0, 5, 5, 
	0, 0
];

_tsip_machine_parser_header_CSeq_index_offsets = [
	0, 0, 3, 6, 9, 12, 16, 21, 
	23, 26, 30, 35, 48, 50, 53, 65, 
	76, 78
];

_tsip_machine_parser_header_CSeq_indicies = [
	0, 0, 1, 2, 2, 1, 3, 3, 
	1, 4, 4, 1, 4, 4, 5, 1, 
	5, 6, 5, 7, 1, 8, 1, 9, 
	9, 1, 9, 9, 7, 1, 10, 11, 
	10, 12, 1, 13, 14, 13, 15, 15, 
	15, 15, 15, 15, 15, 15, 15, 1, 
	16, 1, 17, 17, 1, 17, 17, 15, 
	15, 15, 15, 15, 15, 15, 15, 15, 
	1, 18, 19, 19, 19, 19, 19, 19, 
	19, 19, 19, 1, 20, 1, 1, 0
];

_tsip_machine_parser_header_CSeq_trans_targs = [
	2, 0, 3, 4, 5, 6, 7, 10, 
	8, 9, 11, 12, 10, 11, 12, 15, 
	13, 14, 16, 15, 17
];

_tsip_machine_parser_header_CSeq_trans_actions = [
	0, 0, 0, 0, 0, 0, 0, 1, 
	0, 0, 5, 5, 0, 0, 0, 1, 
	0, 0, 3, 0, 7
];

tsip_machine_parser_header_CSeq_start = 1;
tsip_machine_parser_header_CSeq_first_final = 17;
tsip_machine_parser_header_CSeq_error = 0;

tsip_machine_parser_header_CSeq_en_main = 1;


/* line 41 "./ragel/tsip_parser_header_CSeq.jrl" */

function tsip_header_CSeq(i_seq, s_method){
	tsip_header.call(this, tsip_header_type_e.CSeq);
    this.i_seq = i_seq;
    this.s_method = s_method;
	if(s_method){
		this.e_req_type = tsip_message.prototype.GetRequestType(this.s_method);
	}
	else{
		this.e_req_type = tsip_request_type_e.UNKNOWN;
	}
}

tsip_header_CSeq.prototype.toString = function(){
    return tsk_string_format("{0} {1}", this.i_seq, this.s_method);
}

tsip_header_CSeq.prototype.Parse = function(s_str){
    var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;	
	var hdr_cseq = new tsip_header_CSeq(TSIP_HEADER_CSEQ_NONE);
	
	
/* line 123 "./src/headers/tsip_header_CSeq.js" */
{
	 cs = tsip_machine_parser_header_CSeq_start;
} /* JSCodeGen::writeInit */

/* line 68 "./ragel/tsip_parser_header_CSeq.jrl" */
	
/* line 130 "./src/headers/tsip_header_CSeq.js" */
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
	_keys = _tsip_machine_parser_header_CSeq_key_offsets[cs];
	_trans = _tsip_machine_parser_header_CSeq_index_offsets[cs];
	_klen = _tsip_machine_parser_header_CSeq_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsip_machine_parser_header_CSeq_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsip_machine_parser_header_CSeq_trans_keys[_mid]) {
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
	  _klen = _tsip_machine_parser_header_CSeq_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsip_machine_parser_header_CSeq_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsip_machine_parser_header_CSeq_trans_keys[_mid+1]) {
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
	_trans = _tsip_machine_parser_header_CSeq_indicies[_trans];
	cs = _tsip_machine_parser_header_CSeq_trans_targs[_trans];
	if (_tsip_machine_parser_header_CSeq_trans_actions[_trans] != 0) {
		_acts = _tsip_machine_parser_header_CSeq_trans_actions[_trans];
		_nacts = _tsip_machine_parser_header_CSeq_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsip_machine_parser_header_CSeq_actions[_acts - 1]) {
case 0:
/* line 17 "./ragel/tsip_parser_header_CSeq.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 21 "./ragel/tsip_parser_header_CSeq.jrl" */

		hdr_cseq.s_method = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
		hdr_cseq.e_req_type = tsip_message.prototype.GetRequestType(hdr_cseq.s_method);
			break;
case 2:
/* line 26 "./ragel/tsip_parser_header_CSeq.jrl" */

	    hdr_cseq.i_seq = tsk_ragel_parser_get_int(s_str, p, i_tag_start);
			break;
case 3:
/* line 30 "./ragel/tsip_parser_header_CSeq.jrl" */

			break;
/* line 234 "./src/headers/tsip_header_CSeq.js" */
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

/* line 69 "./ragel/tsip_parser_header_CSeq.jrl" */
	
	if( cs < 
/* line 264 "./src/headers/tsip_header_CSeq.js" */
17
/* line 70 "./ragel/tsip_parser_header_CSeq.jrl" */
 ){
		tsk_utils_log_error("Failed to parse 'CSeq' header: " + s_str);
		return null;
	}
	
	return hdr_cseq;
}