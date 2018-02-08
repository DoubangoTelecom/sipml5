
/* line 1 "./ragel/tsip_parser_message.jrl" */
/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
function prev_not_comma(o_ragel_state, i_p){
	return (o_ragel_state.i_pe <= i_p) || (o_ragel_state.o_data[i_p - 1] != ',');
}


/* line 96 "./ragel/tsip_parser_message.jrl" */



/* line 18 "./src/parsers/tsip_parser_message.js" */
_tsip_machine_parser_message_actions = [
	0, 1, 0, 1, 1, 1, 2, 1, 
	3, 1, 4, 1, 5, 1, 6, 1, 
	7, 2, 0, 5, 2, 6, 0
];

_tsip_machine_parser_message_key_offsets = [
	0, 0, 16, 31, 35, 47, 50, 52, 
	55, 57, 59, 61, 62, 64, 67, 69, 
	72, 73, 88, 89, 106, 109, 114, 117, 
	121, 142, 146, 147, 149, 166, 183, 197, 
	199, 202, 204, 207, 209, 211, 213, 214, 
	230, 246, 252, 258, 260, 281, 284, 288
];

_tsip_machine_parser_message_trans_keys = [
	33, 37, 39, 83, 115, 126, 42, 43, 
	45, 46, 48, 57, 65, 90, 95, 122, 
	32, 33, 37, 39, 126, 42, 43, 45, 
	46, 48, 57, 65, 90, 95, 122, 65, 
	90, 97, 122, 9, 32, 43, 58, 45, 
	46, 48, 57, 65, 90, 97, 122, 9, 
	32, 58, 0, 65535, 32, 0, 65535, 83, 
	115, 73, 105, 80, 112, 47, 48, 57, 
	46, 48, 57, 48, 57, 13, 48, 57, 
	10, 13, 33, 37, 39, 126, 42, 43, 
	45, 46, 48, 57, 65, 90, 95, 122, 
	10, 9, 32, 33, 37, 39, 58, 126, 
	42, 43, 45, 46, 48, 57, 65, 90, 
	95, 122, 9, 32, 58, 9, 13, 32, 
	0, 65535, 13, 0, 65535, 10, 13, 0, 
	65535, 13, 33, 37, 39, 44, 47, 126, 
	0, 41, 42, 57, 58, 64, 65, 90, 
	91, 94, 95, 122, 123, 65535, 10, 13, 
	0, 65535, 10, 9, 32, 32, 33, 37, 
	39, 73, 105, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 32, 33, 
	37, 39, 80, 112, 126, 42, 43, 45, 
	46, 48, 57, 65, 90, 95, 122, 32, 
	33, 37, 39, 47, 126, 42, 43, 45, 
	57, 65, 90, 95, 122, 48, 57, 46, 
	48, 57, 48, 57, 32, 48, 57, 48, 
	57, 48, 57, 48, 57, 32, 9, 13, 
	37, 61, 95, 126, 32, 33, 36, 59, 
	63, 90, 97, 122, 128, 255, 9, 13, 
	37, 61, 95, 126, 32, 33, 36, 59, 
	63, 90, 97, 122, 128, 255, 48, 57, 
	65, 70, 97, 102, 48, 57, 65, 70, 
	97, 102, 0, 65535, 13, 33, 37, 39, 
	44, 47, 126, 0, 41, 42, 57, 58, 
	64, 65, 90, 91, 94, 95, 122, 123, 
	65535, 13, 0, 65535, 10, 13, 0, 65535, 
	10, 13, 0, 65535, 0
];

_tsip_machine_parser_message_single_lengths = [
	0, 6, 5, 0, 4, 3, 0, 1, 
	2, 2, 2, 1, 0, 1, 0, 1, 
	1, 5, 1, 7, 3, 3, 1, 2, 
	7, 2, 1, 2, 7, 7, 6, 0, 
	1, 0, 1, 0, 0, 0, 1, 6, 
	6, 0, 0, 0, 7, 1, 2, 2
];

_tsip_machine_parser_message_range_lengths = [
	0, 5, 5, 2, 4, 0, 1, 1, 
	0, 0, 0, 0, 1, 1, 1, 1, 
	0, 5, 0, 5, 0, 1, 1, 1, 
	7, 1, 0, 0, 5, 5, 4, 1, 
	1, 1, 1, 1, 1, 1, 0, 5, 
	5, 3, 3, 1, 7, 1, 1, 1
];

_tsip_machine_parser_message_index_offsets = [
	0, 0, 12, 23, 26, 35, 39, 41, 
	44, 47, 50, 53, 55, 57, 60, 62, 
	65, 67, 78, 80, 93, 97, 102, 105, 
	109, 124, 128, 130, 133, 146, 159, 170, 
	172, 175, 177, 180, 182, 184, 186, 188, 
	200, 212, 216, 220, 222, 237, 240, 244
];

_tsip_machine_parser_message_indicies = [
	0, 0, 0, 2, 2, 0, 0, 0, 
	0, 0, 0, 1, 3, 4, 4, 4, 
	4, 4, 4, 4, 4, 4, 1, 5, 
	5, 1, 6, 6, 7, 8, 7, 7, 
	7, 7, 1, 6, 6, 8, 1, 9, 
	1, 10, 9, 1, 11, 11, 1, 12, 
	12, 1, 13, 13, 1, 14, 1, 15, 
	1, 16, 15, 1, 17, 1, 18, 17, 
	1, 19, 1, 20, 21, 21, 21, 21, 
	21, 21, 21, 21, 21, 1, 22, 1, 
	23, 23, 24, 24, 24, 25, 24, 24, 
	24, 24, 24, 24, 1, 23, 23, 25, 
	1, 25, 27, 25, 26, 1, 28, 26, 
	1, 29, 28, 26, 1, 30, 31, 31, 
	31, 26, 26, 31, 26, 31, 26, 31, 
	26, 31, 26, 1, 32, 28, 26, 1, 
	33, 1, 26, 26, 1, 3, 4, 4, 
	4, 34, 34, 4, 4, 4, 4, 4, 
	4, 1, 3, 4, 4, 4, 35, 35, 
	4, 4, 4, 4, 4, 4, 1, 3, 
	4, 4, 4, 36, 4, 4, 4, 4, 
	4, 1, 37, 1, 38, 37, 1, 39, 
	1, 40, 39, 1, 41, 1, 42, 1, 
	43, 1, 44, 1, 45, 46, 47, 45, 
	45, 45, 45, 45, 45, 45, 45, 1, 
	48, 49, 50, 48, 48, 48, 48, 48, 
	48, 48, 48, 1, 51, 51, 51, 1, 
	48, 48, 48, 1, 52, 1, 54, 55, 
	55, 55, 53, 53, 55, 53, 55, 53, 
	55, 53, 55, 53, 1, 56, 53, 1, 
	57, 56, 53, 1, 32, 56, 53, 1, 
	0
];

_tsip_machine_parser_message_trans_targs = [
	2, 0, 28, 3, 2, 4, 5, 4, 
	6, 7, 8, 9, 10, 11, 12, 13, 
	14, 15, 16, 17, 18, 19, 43, 20, 
	19, 21, 22, 26, 23, 24, 25, 22, 
	44, 27, 29, 30, 31, 32, 33, 34, 
	35, 36, 37, 38, 39, 40, 16, 41, 
	40, 16, 41, 42, 43, 45, 47, 45, 
	46, 44
];

_tsip_machine_parser_message_trans_actions = [
	1, 0, 1, 3, 0, 1, 0, 0, 
	0, 0, 5, 1, 0, 0, 0, 0, 
	0, 0, 7, 0, 0, 1, 15, 0, 
	0, 0, 0, 0, 0, 0, 13, 20, 
	15, 0, 0, 0, 0, 0, 0, 0, 
	7, 1, 0, 0, 9, 1, 17, 1, 
	0, 11, 0, 0, 0, 0, 13, 20, 
	0, 0
];

tsip_machine_parser_message_start = 1;
tsip_machine_parser_message_first_final = 43;
tsip_machine_parser_message_error = 0;

tsip_machine_parser_message_en_main = 1;


/* line 99 "./ragel/tsip_parser_message.jrl" */

function tsip_message_parser_init(o_ragel_state){
	var cs = 0;

	// Ragel machine initialization.
	
/* line 172 "./src/parsers/tsip_parser_message.js" */
{
	 cs = tsip_machine_parser_message_start;
} /* JSCodeGen::writeInit */

/* line 105 "./ragel/tsip_parser_message.jrl" */
	
	o_ragel_state.i_cs = cs;
}

function tsip_message_parser_execute(o_ragel_state, o_msg, b_extract_content){
    var cs = o_ragel_state.i_cs;
	var p = o_ragel_state.i_p;
	var pe = o_ragel_state.i_pe;
	var eof = o_ragel_state.i_eof;
	var data = o_ragel_state.o_data;

	
/* line 190 "./src/parsers/tsip_parser_message.js" */
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
	_keys = _tsip_machine_parser_message_key_offsets[cs];
	_trans = _tsip_machine_parser_message_index_offsets[cs];
	_klen = _tsip_machine_parser_message_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsip_machine_parser_message_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsip_machine_parser_message_trans_keys[_mid]) {
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
	  _klen = _tsip_machine_parser_message_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsip_machine_parser_message_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsip_machine_parser_message_trans_keys[_mid+1]) {
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
	_trans = _tsip_machine_parser_message_indicies[_trans];
	cs = _tsip_machine_parser_message_trans_targs[_trans];
	if (_tsip_machine_parser_message_trans_actions[_trans] != 0) {
		_acts = _tsip_machine_parser_message_trans_actions[_trans];
		_nacts = _tsip_machine_parser_message_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsip_machine_parser_message_actions[_acts - 1]) {
case 0:
/* line 14 "./ragel/tsip_parser_message.jrl" */

		o_ragel_state.i_tag_start = p;
			break;
case 1:
/* line 19 "./ragel/tsip_parser_message.jrl" */

	    o_ragel_state.i_tag_end = p;
		if(o_msg.e_type == tsip_message_type_e.UNKNOWN){
			o_msg.e_type = tsip_message_type_e.REQUEST;
			if(!o_msg.line.request.s_method){
			    o_msg.line.request.s_method = tsk_ragel_parser_get_string(o_ragel_state.s_data, p, o_ragel_state.i_tag_start);
				o_msg.line.request.e_type = tsip_message.prototype.GetRequestType(o_msg.line.request.s_method);
			}
		}
		else{
			o_ragel_state.cs = tsip_machine_parser_message_error;
		}
			break;
case 2:
/* line 34 "./ragel/tsip_parser_message.jrl" */

	    o_ragel_state.i_tag_end = p;
		if(!o_msg.line.request.o_uri){
		    var s_uri = tsk_ragel_parser_get_string(o_ragel_state.s_data, p, o_ragel_state.i_tag_start);
			o_msg.line.request.o_uri = tsip_uri.prototype.Parse(s_uri);
		}
			break;
case 3:
/* line 43 "./ragel/tsip_parser_message.jrl" */

	    o_ragel_state.i_tag_end = p;
		o_msg.s_version = tsk_ragel_parser_get_string(o_ragel_state.s_data, p, o_ragel_state.i_tag_start);
			break;
case 4:
/* line 49 "./ragel/tsip_parser_message.jrl" */

	    o_ragel_state.i_tag_end = p;	
		if(o_msg.e_type == tsip_message_type_e.UNKNOWN){
			o_msg.e_type = tsip_message_type_e.RESPONSE;
			var s_status_code = tsk_ragel_parser_get_string(o_ragel_state.s_data, p, o_ragel_state.i_tag_start);
			o_msg.line.response.i_status_code = parseInt(s_status_code);
		}
		else{
			o_ragel_state.i_cs = tsip_machine_parser_message_error;
		}
			break;
case 5:
/* line 62 "./ragel/tsip_parser_message.jrl" */

	    o_ragel_state.i_tag_end = p;
		if(!o_msg.line.response.s_reason_phrase){
			o_msg.line.response.s_reason_phrase = tsk_ragel_parser_get_string(o_ragel_state.s_data, p, o_ragel_state.i_tag_start);
		}
			break;
case 6:
/* line 70 "./ragel/tsip_parser_message.jrl" */

	    o_ragel_state.i_tag_end = p;
		tsip_header_parse(o_ragel_state, o_msg);
			break;
case 7:
/* line 76 "./ragel/tsip_parser_message.jrl" */

		o_ragel_state.i_cs = cs;
		o_ragel_state.i_p = p;
		o_ragel_state.i_pe = pe;
		o_ragel_state.i_eof = eof;

		tsip_message_parser_eoh(o_ragel_state, o_msg, b_extract_content);

		cs = o_ragel_state.i_cs;
		p = o_ragel_state.i_p;
		pe = o_ragel_state.i_pe;
		eof = o_ragel_state.i_eof;
			break;
/* line 351 "./src/parsers/tsip_parser_message.js" */
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

/* line 117 "./ragel/tsip_parser_message.jrl" */

    o_ragel_state.i_cs = cs;
	o_ragel_state.i_p = p;
	o_ragel_state.i_pe = pe;
	o_ragel_state.i_eof = eof;
}

function tsip_message_parser_eoh(o_ragel_state, o_msg, b_extract_content){
    if(o_msg && b_extract_content){
        var i_clen = o_msg.get_content_length();
        if((o_ragel_state.i_p + i_clen) < o_ragel_state.i_pe && !o_msg.o_content){
            var i_start = o_ragel_state.i_p + 1;
            var i_end = (i_start + i_clen);
			o_msg.o_content = new Array((i_end - i_start));
            for(var i = i_start, j = 0; i < i_end; ++i, ++j){
                o_msg.o_content[j] = o_ragel_state.o_data[i];
            }
            o_ragel_state.i_p += i_clen;
        }
        else{
            o_ragel_state.i_p = (o_ragel_state.i_pe - 1);
        }
    }
}

tsip_message.prototype.Parse = function(o_ragel_state, b_extract_content){
    var o_msg = null;
    if(!o_ragel_state || !o_ragel_state.o_data){
        return null;
    }
    
    o_msg = new tsip_message(tsip_message_type_e.UNKNOWN);
    
    // ragel init
    tsip_message_parser_init(o_ragel_state);
    
    // state machine execution
    tsip_message_parser_execute(o_ragel_state, o_msg, b_extract_content);
    
    if( o_ragel_state.i_cs < 
/* line 419 "./src/parsers/tsip_parser_message.js" */
43
/* line 156 "./ragel/tsip_parser_message.jrl" */
 ){
		tsk_utils_log_error("Failed to parse message: " + o_ragel_state.s_data);
		return null;
	}
    
    return o_msg;
}