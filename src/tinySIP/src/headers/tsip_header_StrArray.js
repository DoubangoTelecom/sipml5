
/* line 1 "./ragel/tsip_parser_header_StrArray.jrl" */
/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/

// Parse headers: 'Allow', 'Allow-Events', 'Privacy', 'Require', 'Supported'

var TSIP_HEADER_ALLOW_DEFAULT =	"ACK, BYE, CANCEL, INVITE, MESSAGE, NOTIFY, OPTIONS, PRACK, REFER, UPDATE";

tsip_header_StrArray.prototype = Object.create(tsip_header.prototype);
tsip_header_StrArray.prototype.as_values = null;

tsip_header_Allow.prototype = Object.create(tsip_header_StrArray.prototype);
tsip_header_Allow_Events.prototype = Object.create(tsip_header_StrArray.prototype);
tsip_header_Privacy.prototype = Object.create(tsip_header_StrArray.prototype);
tsip_header_Require.prototype = Object.create(tsip_header_StrArray.prototype);
tsip_header_Supported.prototype = Object.create(tsip_header_StrArray.prototype);


/* line 61 "./ragel/tsip_parser_header_StrArray.jrl" */



/* line 28 "./src/headers/tsip_header_StrArray.js" */
_tsip_machine_parser_header_Allow_actions = [
	0, 1, 0, 1, 1, 1, 2, 1, 
	3, 1, 4, 1, 5, 1, 6, 1, 
	7
];

_tsip_machine_parser_header_Allow_key_offsets = [
	0, 0, 12, 14, 16, 18, 20, 24, 
	27, 44, 45, 61, 65, 66, 68, 71, 
	88, 89, 91, 107, 109, 111, 113, 115, 
	117, 119, 122, 125, 141, 142, 144, 159, 
	176, 180, 181, 183, 186, 199, 202, 204, 
	206, 208, 210, 212, 214, 217, 220, 249, 
	250, 252, 280, 296, 322, 340, 358, 376, 
	394, 412, 430, 448, 450, 470, 488, 506, 
	524, 542, 560, 578, 596, 614, 632, 650, 
	668, 686, 704, 722, 740, 758, 776, 794, 
	812, 830, 832, 834, 836, 838, 840, 842, 
	845, 848, 850, 852, 854, 856, 858, 860, 
	862, 864
];

_tsip_machine_parser_header_Allow_trans_keys = [
	65, 75, 80, 82, 83, 85, 97, 107, 
	112, 114, 115, 117, 76, 108, 76, 108, 
	79, 111, 87, 119, 9, 32, 45, 58, 
	9, 32, 58, 9, 13, 32, 33, 37, 
	39, 126, 42, 43, 45, 46, 48, 57, 
	65, 90, 95, 122, 10, 9, 13, 32, 
	33, 37, 39, 44, 126, 42, 46, 48, 
	57, 65, 90, 95, 122, 9, 13, 32, 
	44, 10, 9, 32, 9, 32, 44, 9, 
	13, 32, 33, 37, 39, 126, 42, 43, 
	45, 46, 48, 57, 65, 90, 95, 122, 
	10, 9, 32, 9, 32, 33, 37, 39, 
	126, 42, 43, 45, 46, 48, 57, 65, 
	90, 95, 122, 69, 101, 86, 118, 69, 
	101, 78, 110, 84, 116, 83, 115, 9, 
	32, 58, 9, 32, 58, 9, 13, 32, 
	33, 37, 39, 45, 126, 42, 43, 48, 
	57, 65, 90, 95, 122, 10, 9, 32, 
	9, 32, 33, 37, 39, 45, 126, 42, 
	43, 48, 57, 65, 90, 95, 122, 9, 
	13, 32, 33, 37, 39, 44, 46, 126, 
	42, 45, 48, 57, 65, 90, 95, 122, 
	9, 13, 32, 44, 10, 9, 32, 9, 
	32, 44, 33, 37, 39, 45, 126, 42, 
	43, 48, 57, 65, 90, 95, 122, 9, 
	32, 58, 82, 114, 73, 105, 86, 118, 
	65, 97, 67, 99, 89, 121, 9, 32, 
	58, 9, 32, 58, 9, 13, 32, 33, 
	37, 39, 67, 72, 73, 78, 83, 85, 
	99, 104, 105, 110, 115, 117, 126, 42, 
	43, 45, 46, 48, 57, 65, 90, 95, 
	122, 10, 9, 32, 9, 32, 33, 37, 
	39, 67, 72, 73, 78, 83, 85, 99, 
	104, 105, 110, 115, 117, 126, 42, 43, 
	45, 46, 48, 57, 65, 90, 95, 122, 
	13, 33, 37, 39, 59, 126, 42, 43, 
	45, 46, 48, 57, 65, 90, 95, 122, 
	33, 37, 39, 67, 72, 73, 78, 83, 
	85, 99, 104, 105, 110, 115, 117, 126, 
	42, 43, 45, 46, 48, 57, 65, 90, 
	95, 122, 13, 33, 37, 39, 59, 82, 
	114, 126, 42, 43, 45, 46, 48, 57, 
	65, 90, 95, 122, 13, 33, 37, 39, 
	59, 73, 105, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 13, 33, 
	37, 39, 59, 84, 116, 126, 42, 43, 
	45, 46, 48, 57, 65, 90, 95, 122, 
	13, 33, 37, 39, 59, 73, 105, 126, 
	42, 43, 45, 46, 48, 57, 65, 90, 
	95, 122, 13, 33, 37, 39, 59, 67, 
	99, 126, 42, 43, 45, 46, 48, 57, 
	65, 90, 95, 122, 13, 33, 37, 39, 
	59, 65, 97, 126, 42, 43, 45, 46, 
	48, 57, 66, 90, 95, 122, 13, 33, 
	37, 39, 59, 76, 108, 126, 42, 43, 
	45, 46, 48, 57, 65, 90, 95, 122, 
	13, 59, 13, 33, 37, 39, 59, 69, 
	73, 101, 105, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 13, 33, 
	37, 39, 59, 65, 97, 126, 42, 43, 
	45, 46, 48, 57, 66, 90, 95, 122, 
	13, 33, 37, 39, 59, 68, 100, 126, 
	42, 43, 45, 46, 48, 57, 65, 90, 
	95, 122, 13, 33, 37, 39, 59, 69, 
	101, 126, 42, 43, 45, 46, 48, 57, 
	65, 90, 95, 122, 13, 33, 37, 39, 
	59, 82, 114, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 13, 33, 
	37, 39, 59, 83, 115, 126, 42, 43, 
	45, 46, 48, 57, 65, 90, 95, 122, 
	13, 33, 37, 39, 59, 84, 116, 126, 
	42, 43, 45, 46, 48, 57, 65, 90, 
	95, 122, 13, 33, 37, 39, 59, 79, 
	111, 126, 42, 43, 45, 46, 48, 57, 
	65, 90, 95, 122, 13, 33, 37, 39, 
	59, 82, 114, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 13, 33, 
	37, 39, 59, 89, 121, 126, 42, 43, 
	45, 46, 48, 57, 65, 90, 95, 122, 
	13, 33, 37, 39, 59, 68, 100, 126, 
	42, 43, 45, 46, 48, 57, 65, 90, 
	95, 122, 13, 33, 37, 39, 59, 79, 
	111, 126, 42, 43, 45, 46, 48, 57, 
	65, 90, 95, 122, 13, 33, 37, 39, 
	59, 78, 110, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 13, 33, 
	37, 39, 59, 69, 101, 126, 42, 43, 
	45, 46, 48, 57, 65, 90, 95, 122, 
	13, 33, 37, 39, 59, 69, 101, 126, 
	42, 43, 45, 46, 48, 57, 65, 90, 
	95, 122, 13, 33, 37, 39, 59, 83, 
	115, 126, 42, 43, 45, 46, 48, 57, 
	65, 90, 95, 122, 13, 33, 37, 39, 
	59, 83, 115, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 13, 33, 
	37, 39, 59, 73, 105, 126, 42, 43, 
	45, 46, 48, 57, 65, 90, 95, 122, 
	13, 33, 37, 39, 59, 79, 111, 126, 
	42, 43, 45, 46, 48, 57, 65, 90, 
	95, 122, 13, 33, 37, 39, 59, 78, 
	110, 126, 42, 43, 45, 46, 48, 57, 
	65, 90, 95, 122, 13, 33, 37, 39, 
	59, 83, 115, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 69, 101, 
	81, 113, 85, 117, 73, 105, 82, 114, 
	69, 101, 9, 32, 58, 9, 32, 58, 
	85, 117, 80, 112, 80, 112, 79, 111, 
	82, 114, 84, 116, 69, 101, 68, 100, 
	0
];

_tsip_machine_parser_header_Allow_single_lengths = [
	0, 12, 2, 2, 2, 2, 4, 3, 
	7, 1, 8, 4, 1, 2, 3, 7, 
	1, 2, 6, 2, 2, 2, 2, 2, 
	2, 3, 3, 8, 1, 2, 7, 9, 
	4, 1, 2, 3, 5, 3, 2, 2, 
	2, 2, 2, 2, 3, 3, 19, 1, 
	2, 18, 6, 16, 8, 8, 8, 8, 
	8, 8, 8, 2, 10, 8, 8, 8, 
	8, 8, 8, 8, 8, 8, 8, 8, 
	8, 8, 8, 8, 8, 8, 8, 8, 
	8, 2, 2, 2, 2, 2, 2, 3, 
	3, 2, 2, 2, 2, 2, 2, 2, 
	2, 0
];

_tsip_machine_parser_header_Allow_range_lengths = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	5, 0, 4, 0, 0, 0, 0, 5, 
	0, 0, 5, 0, 0, 0, 0, 0, 
	0, 0, 0, 4, 0, 0, 4, 4, 
	0, 0, 0, 0, 4, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 5, 0, 
	0, 5, 5, 5, 5, 5, 5, 5, 
	5, 5, 5, 0, 5, 5, 5, 5, 
	5, 5, 5, 5, 5, 5, 5, 5, 
	5, 5, 5, 5, 5, 5, 5, 5, 
	5, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0
];

_tsip_machine_parser_header_Allow_index_offsets = [
	0, 0, 13, 16, 19, 22, 25, 30, 
	34, 47, 49, 62, 67, 69, 72, 76, 
	89, 91, 94, 106, 109, 112, 115, 118, 
	121, 124, 128, 132, 145, 147, 150, 162, 
	176, 181, 183, 186, 190, 200, 204, 207, 
	210, 213, 216, 219, 222, 226, 230, 255, 
	257, 260, 284, 296, 318, 332, 346, 360, 
	374, 388, 402, 416, 419, 435, 449, 463, 
	477, 491, 505, 519, 533, 547, 561, 575, 
	589, 603, 617, 631, 645, 659, 673, 687, 
	701, 715, 718, 721, 724, 727, 730, 733, 
	737, 741, 744, 747, 750, 753, 756, 759, 
	762, 765
];

_tsip_machine_parser_header_Allow_indicies = [
	0, 2, 3, 4, 5, 6, 0, 2, 
	3, 4, 5, 6, 1, 7, 7, 1, 
	8, 8, 1, 9, 9, 1, 10, 10, 
	1, 11, 11, 12, 13, 1, 14, 14, 
	15, 1, 15, 16, 15, 17, 17, 17, 
	17, 17, 17, 17, 17, 17, 1, 18, 
	1, 19, 20, 19, 21, 21, 21, 22, 
	21, 21, 21, 21, 21, 1, 23, 24, 
	23, 25, 1, 26, 1, 27, 27, 1, 
	27, 27, 25, 1, 25, 28, 25, 17, 
	17, 17, 17, 17, 17, 17, 17, 17, 
	1, 29, 1, 30, 30, 1, 30, 30, 
	17, 17, 17, 17, 17, 17, 17, 17, 
	17, 1, 31, 31, 1, 32, 32, 1, 
	33, 33, 1, 34, 34, 1, 35, 35, 
	1, 6, 6, 1, 36, 36, 37, 1, 
	38, 38, 39, 1, 39, 40, 39, 41, 
	41, 41, 41, 41, 41, 41, 41, 41, 
	1, 42, 1, 43, 43, 1, 43, 43, 
	41, 41, 41, 41, 41, 41, 41, 41, 
	41, 1, 44, 20, 44, 45, 45, 45, 
	46, 47, 45, 45, 45, 45, 45, 1, 
	48, 49, 48, 39, 1, 50, 1, 51, 
	51, 1, 51, 51, 39, 1, 45, 45, 
	45, 45, 45, 45, 45, 45, 45, 1, 
	52, 52, 53, 1, 54, 54, 1, 55, 
	55, 1, 56, 56, 1, 57, 57, 1, 
	58, 58, 1, 59, 59, 1, 60, 60, 
	61, 1, 62, 62, 63, 1, 63, 64, 
	63, 65, 65, 65, 66, 67, 68, 69, 
	70, 71, 66, 67, 68, 69, 70, 71, 
	65, 65, 65, 65, 65, 65, 1, 72, 
	1, 73, 73, 1, 73, 73, 65, 65, 
	65, 66, 67, 68, 69, 70, 71, 66, 
	67, 68, 69, 70, 71, 65, 65, 65, 
	65, 65, 65, 1, 20, 74, 74, 74, 
	75, 74, 74, 74, 74, 74, 74, 1, 
	65, 65, 65, 66, 67, 68, 69, 70, 
	71, 66, 67, 68, 69, 70, 71, 65, 
	65, 65, 65, 65, 65, 1, 20, 74, 
	74, 74, 75, 76, 76, 74, 74, 74, 
	74, 74, 74, 1, 20, 74, 74, 74, 
	75, 77, 77, 74, 74, 74, 74, 74, 
	74, 1, 20, 74, 74, 74, 75, 78, 
	78, 74, 74, 74, 74, 74, 74, 1, 
	20, 74, 74, 74, 75, 79, 79, 74, 
	74, 74, 74, 74, 74, 1, 20, 74, 
	74, 74, 75, 80, 80, 74, 74, 74, 
	74, 74, 74, 1, 20, 74, 74, 74, 
	75, 81, 81, 74, 74, 74, 74, 74, 
	74, 1, 20, 74, 74, 74, 75, 82, 
	82, 74, 74, 74, 74, 74, 74, 1, 
	20, 75, 1, 20, 74, 74, 74, 75, 
	83, 84, 83, 84, 74, 74, 74, 74, 
	74, 74, 1, 20, 74, 74, 74, 75, 
	85, 85, 74, 74, 74, 74, 74, 74, 
	1, 20, 74, 74, 74, 75, 86, 86, 
	74, 74, 74, 74, 74, 74, 1, 20, 
	74, 74, 74, 75, 87, 87, 74, 74, 
	74, 74, 74, 74, 1, 20, 74, 74, 
	74, 75, 82, 82, 74, 74, 74, 74, 
	74, 74, 1, 20, 74, 74, 74, 75, 
	88, 88, 74, 74, 74, 74, 74, 74, 
	1, 20, 74, 74, 74, 75, 89, 89, 
	74, 74, 74, 74, 74, 74, 1, 20, 
	74, 74, 74, 75, 90, 90, 74, 74, 
	74, 74, 74, 74, 1, 20, 74, 74, 
	74, 75, 91, 91, 74, 74, 74, 74, 
	74, 74, 1, 20, 74, 74, 74, 75, 
	82, 82, 74, 74, 74, 74, 74, 74, 
	1, 20, 74, 74, 74, 75, 82, 82, 
	74, 74, 74, 74, 74, 74, 1, 20, 
	74, 74, 74, 75, 92, 92, 74, 74, 
	74, 74, 74, 74, 1, 20, 74, 74, 
	74, 75, 93, 93, 74, 74, 74, 74, 
	74, 74, 1, 20, 74, 74, 74, 75, 
	82, 82, 74, 74, 74, 74, 74, 74, 
	1, 20, 74, 74, 74, 75, 94, 94, 
	74, 74, 74, 74, 74, 74, 1, 20, 
	74, 74, 74, 75, 95, 95, 74, 74, 
	74, 74, 74, 74, 1, 20, 74, 74, 
	74, 75, 96, 96, 74, 74, 74, 74, 
	74, 74, 1, 20, 74, 74, 74, 75, 
	97, 97, 74, 74, 74, 74, 74, 74, 
	1, 20, 74, 74, 74, 75, 98, 98, 
	74, 74, 74, 74, 74, 74, 1, 20, 
	74, 74, 74, 75, 82, 82, 74, 74, 
	74, 74, 74, 74, 1, 20, 74, 74, 
	74, 75, 86, 86, 74, 74, 74, 74, 
	74, 74, 1, 99, 99, 1, 100, 100, 
	1, 101, 101, 1, 102, 102, 1, 103, 
	103, 1, 104, 104, 1, 105, 105, 106, 
	1, 107, 107, 25, 1, 108, 108, 1, 
	109, 109, 1, 110, 110, 1, 111, 111, 
	1, 112, 112, 1, 113, 113, 1, 114, 
	114, 1, 2, 2, 1, 1, 0
];

_tsip_machine_parser_header_Allow_trans_targs = [
	2, 0, 37, 38, 81, 89, 25, 3, 
	4, 5, 6, 7, 19, 8, 7, 8, 
	9, 10, 97, 11, 9, 10, 15, 11, 
	12, 15, 13, 14, 16, 17, 18, 20, 
	21, 22, 23, 24, 26, 27, 26, 27, 
	28, 31, 29, 30, 32, 31, 27, 36, 
	32, 33, 34, 35, 7, 8, 39, 40, 
	41, 42, 43, 44, 45, 46, 45, 46, 
	47, 50, 52, 60, 70, 71, 74, 80, 
	48, 49, 50, 51, 53, 54, 55, 56, 
	57, 58, 59, 61, 65, 62, 63, 64, 
	66, 67, 68, 69, 72, 73, 75, 76, 
	77, 78, 79, 82, 83, 84, 85, 86, 
	87, 88, 15, 88, 90, 91, 92, 93, 
	94, 95, 96
];

_tsip_machine_parser_header_Allow_trans_actions = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 5, 0, 5, 0, 0, 
	0, 1, 15, 3, 3, 0, 3, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 7, 7, 0, 0, 
	0, 1, 0, 0, 3, 0, 3, 0, 
	0, 0, 0, 0, 13, 13, 0, 0, 
	0, 0, 0, 0, 9, 9, 0, 0, 
	0, 1, 1, 1, 1, 1, 1, 1, 
	0, 0, 0, 3, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 11, 11, 0, 0, 0, 0, 0, 
	0, 0, 0
];

tsip_machine_parser_header_Allow_start = 1;
tsip_machine_parser_header_Allow_first_final = 97;
tsip_machine_parser_header_Allow_error = 0;

tsip_machine_parser_header_Allow_en_main = 1;


/* line 64 "./ragel/tsip_parser_header_StrArray.jrl" */

function tsip_header_StrArray(e_type, s_value){
	tsip_header.call(this, e_type);
    this.as_values = new Array();
	if(s_value){
		this.as_values.push(s_value);
	}
}

tsip_header_StrArray.prototype.toString = function(){
    var s_str = null;
	var c_sep;
	switch(this.e_type){
		case tsip_header_type_e.Privacy:
			c_sep = ';'; break;
		default: 
			c_sep = ','; 
		break;
	}
    for(var i = 0; i < this.as_values.length; ++i){
        if(i == 0){
            s_str = this.as_values[i];
        }
        else{
            s_str += tsk_string_format("{0}{1}", c_sep, this.as_values[i]);
        }
    }
    return s_str;
};

tsip_header_StrArray.prototype.has_value = function(s_value){
    if(this.as_values && s_value){
        var s_value_i = s_value.toLowerCase();
        for(var i = 0; i < this.as_values.length; ++i){
            if(this.as_values[i].toLowerCase() == s_value_i){
                return true;
            }
        }
    }
    return false;
}

tsip_header_StrArray.prototype.Parse = function(s_str){
    var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;	
	var o_hdr = null;
	
	
/* line 406 "./src/headers/tsip_header_StrArray.js" */
{
	 cs = tsip_machine_parser_header_Allow_start;
} /* JSCodeGen::writeInit */

/* line 116 "./ragel/tsip_parser_header_StrArray.jrl" */
	
/* line 413 "./src/headers/tsip_header_StrArray.js" */
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
/* line 26 "./ragel/tsip_parser_header_StrArray.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 30 "./ragel/tsip_parser_header_StrArray.jrl" */

		if(o_hdr){
			tsk_ragel_parser_add_string(s_str, p, i_tag_start, o_hdr.as_values);
		}
			break;
case 2:
/* line 36 "./ragel/tsip_parser_header_StrArray.jrl" */
 o_hdr = new tsip_header_Allow(); 		break;
case 3:
/* line 37 "./ragel/tsip_parser_header_StrArray.jrl" */
 o_hdr = new tsip_header_Allow_Events(); 		break;
case 4:
/* line 38 "./ragel/tsip_parser_header_StrArray.jrl" */
 o_hdr = new tsip_header_Privacy(); 		break;
case 5:
/* line 39 "./ragel/tsip_parser_header_StrArray.jrl" */
 o_hdr = new tsip_header_Require(); 		break;
case 6:
/* line 40 "./ragel/tsip_parser_header_StrArray.jrl" */
 o_hdr = new tsip_header_Supported(); 		break;
case 7:
/* line 42 "./ragel/tsip_parser_header_StrArray.jrl" */
		break;
/* line 527 "./src/headers/tsip_header_StrArray.js" */
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

/* line 117 "./ragel/tsip_parser_header_StrArray.jrl" */
	
	if( cs < 
/* line 557 "./src/headers/tsip_header_StrArray.js" */
97
/* line 118 "./ragel/tsip_parser_header_StrArray.jrl" */
 ){
		tsk_utils_log_error("Failed to parse header: " + s_str);
		return null;
	}
	
	return o_hdr;
}


function tsip_header_Allow(s_value){ tsip_header_StrArray.call(this, tsip_header_type_e.Allow, s_value); }
function tsip_header_Allow_Events(s_value){ tsip_header_StrArray.call(this, tsip_header_type_e.Allow_Events, s_value); }
function tsip_header_Privacy(s_value){ tsip_header_StrArray.call(this, tsip_header_type_e.Privacy, s_value); }
function tsip_header_Require(s_value){ tsip_header_StrArray.call(this, tsip_header_type_e.Require, s_value); }
function tsip_header_Supported(s_value){ tsip_header_StrArray.call(this, tsip_header_type_e.Supported, s_value); }