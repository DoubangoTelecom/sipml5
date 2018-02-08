
/* line 1 "./ragel/tsip_parser_header_NameAddr.jrl" */
/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/

// Parse headers: 'From', 'To', 'Refer-To'
tsip_header_NameAddr.prototype = Object.create(tsip_header.prototype);
tsip_header_NameAddr.prototype.s_display_name = null;
tsip_header_NameAddr.prototype.o_uri = null;
tsip_header_NameAddr.prototype.s_tag = null;

tsip_header_From.prototype = Object.create(tsip_header_NameAddr.prototype);
tsip_header_To.prototype = Object.create(tsip_header_NameAddr.prototype);
tsip_header_Refer_To.prototype = Object.create(tsip_header_NameAddr.prototype);
tsip_header_Referred_By.prototype = Object.create(tsip_header_NameAddr.prototype);


/* line 78 "./ragel/tsip_parser_header_NameAddr.jrl" */




/* line 27 "./src/headers/tsip_header_NameAddr.js" */
_tsip_machine_parser_header_NameAddr_actions = [
	0, 1, 0, 1, 1, 1, 2, 1, 
	3, 1, 4, 1, 5, 1, 6, 1, 
	7, 1, 8, 1, 9
];

_tsip_machine_parser_header_NameAddr_key_offsets = [
	0, 0, 8, 11, 14, 35, 36, 38, 
	59, 60, 62, 65, 69, 81, 84, 86, 
	89, 93, 97, 98, 100, 103, 122, 123, 
	125, 143, 162, 167, 168, 170, 174, 193, 
	194, 196, 215, 216, 218, 221, 229, 230, 
	232, 236, 237, 243, 261, 268, 276, 284, 
	292, 294, 301, 310, 312, 315, 317, 320, 
	322, 325, 328, 329, 332, 333, 336, 337, 
	346, 355, 363, 371, 379, 387, 389, 395, 
	404, 413, 422, 424, 427, 430, 431, 432, 
	453, 474, 493, 498, 499, 501, 505, 524, 
	525, 527, 546, 564, 581, 599, 603, 604, 
	606, 614, 615, 617, 621, 627, 647, 666, 
	671, 673, 679, 684, 686, 688, 691, 696, 
	698, 700, 702, 705, 707, 709, 712, 714, 
	716, 717, 719, 721, 726, 729
];

_tsip_machine_parser_header_NameAddr_trans_keys = [
	66, 70, 82, 84, 98, 102, 114, 116, 
	9, 32, 58, 9, 32, 58, 9, 13, 
	32, 33, 34, 37, 39, 60, 126, 42, 
	43, 45, 46, 48, 57, 65, 90, 95, 
	96, 97, 122, 10, 9, 32, 9, 13, 
	32, 33, 34, 37, 39, 60, 126, 42, 
	43, 45, 46, 48, 57, 65, 90, 95, 
	96, 97, 122, 10, 9, 32, 9, 32, 
	60, 65, 90, 97, 122, 9, 32, 43, 
	58, 45, 46, 48, 57, 65, 90, 97, 
	122, 9, 32, 58, 0, 65535, 62, 0, 
	65535, 9, 13, 32, 59, 9, 13, 32, 
	59, 10, 9, 32, 9, 32, 59, 9, 
	13, 32, 33, 37, 39, 84, 116, 126, 
	42, 43, 45, 46, 48, 57, 65, 90, 
	95, 122, 10, 9, 32, 9, 32, 33, 
	37, 39, 84, 116, 126, 42, 43, 45, 
	46, 48, 57, 65, 90, 95, 122, 9, 
	13, 32, 33, 37, 39, 59, 61, 126, 
	42, 43, 45, 46, 48, 57, 65, 90, 
	95, 122, 9, 13, 32, 59, 61, 10, 
	9, 32, 9, 32, 59, 61, 9, 13, 
	32, 33, 34, 37, 39, 91, 126, 42, 
	43, 45, 46, 48, 57, 65, 90, 95, 
	122, 10, 9, 32, 9, 13, 32, 33, 
	34, 37, 39, 91, 126, 42, 43, 45, 
	46, 48, 57, 65, 90, 95, 122, 10, 
	9, 32, 9, 32, 34, 9, 13, 34, 
	92, 32, 126, 128, 255, 10, 9, 32, 
	9, 13, 32, 59, 10, 0, 9, 11, 
	12, 14, 127, 9, 13, 32, 33, 37, 
	39, 59, 126, 42, 43, 45, 46, 48, 
	57, 65, 90, 95, 122, 58, 48, 57, 
	65, 70, 97, 102, 58, 93, 48, 57, 
	65, 70, 97, 102, 58, 93, 48, 57, 
	65, 70, 97, 102, 58, 93, 48, 57, 
	65, 70, 97, 102, 58, 93, 58, 48, 
	57, 65, 70, 97, 102, 46, 58, 93, 
	48, 57, 65, 70, 97, 102, 48, 57, 
	46, 48, 57, 48, 57, 46, 48, 57, 
	48, 57, 93, 48, 57, 93, 48, 57, 
	93, 46, 48, 57, 46, 46, 48, 57, 
	46, 46, 58, 93, 48, 57, 65, 70, 
	97, 102, 46, 58, 93, 48, 57, 65, 
	70, 97, 102, 58, 93, 48, 57, 65, 
	70, 97, 102, 58, 93, 48, 57, 65, 
	70, 97, 102, 58, 93, 48, 57, 65, 
	70, 97, 102, 58, 93, 48, 57, 65, 
	70, 97, 102, 58, 93, 48, 57, 65, 
	70, 97, 102, 46, 58, 93, 48, 57, 
	65, 70, 97, 102, 46, 58, 93, 48, 
	57, 65, 70, 97, 102, 46, 58, 93, 
	48, 57, 65, 70, 97, 102, 48, 57, 
	46, 48, 57, 46, 48, 57, 46, 58, 
	9, 13, 32, 33, 37, 39, 59, 61, 
	65, 97, 126, 42, 43, 45, 46, 48, 
	57, 66, 90, 95, 122, 9, 13, 32, 
	33, 37, 39, 59, 61, 71, 103, 126, 
	42, 43, 45, 46, 48, 57, 65, 90, 
	95, 122, 9, 13, 32, 33, 37, 39, 
	59, 61, 126, 42, 43, 45, 46, 48, 
	57, 65, 90, 95, 122, 9, 13, 32, 
	59, 61, 10, 9, 32, 9, 32, 59, 
	61, 9, 13, 32, 33, 34, 37, 39, 
	91, 126, 42, 43, 45, 46, 48, 57, 
	65, 90, 95, 122, 10, 9, 32, 9, 
	13, 32, 33, 34, 37, 39, 91, 126, 
	42, 43, 45, 46, 48, 57, 65, 90, 
	95, 122, 9, 13, 32, 33, 37, 39, 
	59, 126, 42, 43, 45, 46, 48, 57, 
	65, 90, 95, 122, 9, 13, 32, 33, 
	37, 39, 126, 42, 43, 45, 46, 48, 
	57, 65, 90, 95, 122, 9, 13, 32, 
	33, 37, 39, 60, 126, 42, 43, 45, 
	46, 48, 57, 65, 90, 95, 122, 9, 
	13, 32, 60, 10, 9, 32, 9, 13, 
	34, 92, 32, 126, 128, 255, 10, 9, 
	32, 9, 13, 32, 60, 0, 9, 11, 
	12, 14, 127, 9, 13, 32, 33, 37, 
	39, 42, 43, 58, 126, 45, 46, 48, 
	57, 65, 90, 95, 96, 97, 122, 9, 
	13, 32, 33, 37, 39, 58, 60, 126, 
	42, 43, 45, 46, 48, 57, 65, 90, 
	95, 122, 9, 13, 32, 58, 60, 0, 
	65535, 9, 13, 32, 59, 0, 65535, 9, 
	32, 58, 82, 114, 79, 111, 77, 109, 
	9, 32, 58, 9, 32, 58, 69, 101, 
	70, 102, 69, 101, 82, 114, 45, 82, 
	114, 84, 116, 79, 111, 9, 32, 58, 
	69, 101, 68, 100, 45, 66, 98, 89, 
	121, 9, 32, 58, 79, 111, 9, 32, 
	58, 0
];

_tsip_machine_parser_header_NameAddr_single_lengths = [
	0, 8, 3, 3, 9, 1, 2, 9, 
	1, 2, 3, 0, 4, 3, 0, 1, 
	4, 4, 1, 2, 3, 9, 1, 2, 
	8, 9, 5, 1, 2, 4, 9, 1, 
	2, 9, 1, 2, 3, 4, 1, 2, 
	4, 1, 0, 8, 1, 2, 2, 2, 
	2, 1, 3, 0, 1, 0, 1, 0, 
	1, 1, 1, 1, 1, 1, 1, 3, 
	3, 2, 2, 2, 2, 2, 0, 3, 
	3, 3, 0, 1, 1, 1, 1, 11, 
	11, 9, 5, 1, 2, 4, 9, 1, 
	2, 9, 8, 7, 8, 4, 1, 2, 
	4, 1, 2, 4, 0, 10, 9, 5, 
	0, 4, 5, 2, 2, 3, 5, 2, 
	2, 2, 3, 2, 2, 3, 2, 2, 
	1, 2, 2, 5, 3, 0
];

_tsip_machine_parser_header_NameAddr_range_lengths = [
	0, 0, 0, 0, 6, 0, 0, 6, 
	0, 0, 0, 2, 4, 0, 1, 1, 
	0, 0, 0, 0, 0, 5, 0, 0, 
	5, 5, 0, 0, 0, 0, 5, 0, 
	0, 5, 0, 0, 0, 2, 0, 0, 
	0, 0, 3, 5, 3, 3, 3, 3, 
	0, 3, 3, 1, 1, 1, 1, 1, 
	1, 1, 0, 1, 0, 1, 0, 3, 
	3, 3, 3, 3, 3, 0, 3, 3, 
	3, 3, 1, 1, 1, 0, 0, 5, 
	5, 5, 0, 0, 0, 0, 5, 0, 
	0, 5, 5, 5, 5, 0, 0, 0, 
	2, 0, 0, 0, 3, 5, 5, 0, 
	1, 1, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0
];

_tsip_machine_parser_header_NameAddr_index_offsets = [
	0, 0, 9, 13, 17, 33, 35, 38, 
	54, 56, 59, 63, 66, 75, 79, 81, 
	84, 89, 94, 96, 99, 103, 118, 120, 
	123, 137, 152, 158, 160, 163, 168, 183, 
	185, 188, 203, 205, 208, 212, 219, 221, 
	224, 229, 231, 235, 249, 254, 260, 266, 
	272, 275, 280, 287, 289, 292, 294, 297, 
	299, 302, 305, 307, 310, 312, 315, 317, 
	324, 331, 337, 343, 349, 355, 358, 362, 
	369, 376, 383, 385, 388, 391, 393, 395, 
	412, 429, 444, 450, 452, 455, 460, 475, 
	477, 480, 495, 509, 522, 536, 541, 543, 
	546, 553, 555, 558, 563, 567, 583, 598, 
	604, 606, 612, 618, 621, 624, 628, 634, 
	637, 640, 643, 647, 650, 653, 657, 660, 
	663, 665, 668, 671, 677, 681
];

_tsip_machine_parser_header_NameAddr_indicies = [
	0, 2, 3, 4, 0, 2, 3, 4, 
	1, 5, 5, 6, 1, 7, 7, 8, 
	1, 8, 9, 8, 10, 11, 10, 10, 
	12, 10, 10, 10, 10, 13, 10, 13, 
	1, 14, 1, 15, 15, 1, 15, 16, 
	15, 10, 11, 10, 10, 12, 10, 10, 
	10, 10, 13, 10, 13, 1, 17, 1, 
	18, 18, 1, 18, 18, 12, 1, 19, 
	19, 1, 20, 20, 21, 22, 21, 21, 
	21, 21, 1, 20, 20, 22, 1, 23, 
	1, 24, 23, 1, 25, 26, 25, 27, 
	1, 25, 28, 25, 27, 1, 29, 1, 
	30, 30, 1, 30, 30, 27, 1, 27, 
	31, 27, 32, 32, 32, 33, 33, 32, 
	32, 32, 32, 32, 32, 1, 34, 1, 
	35, 35, 1, 35, 35, 32, 32, 32, 
	33, 33, 32, 32, 32, 32, 32, 32, 
	1, 36, 37, 36, 38, 38, 38, 39, 
	40, 38, 38, 38, 38, 38, 38, 1, 
	41, 42, 41, 27, 40, 1, 43, 1, 
	44, 44, 1, 44, 44, 27, 40, 1, 
	40, 45, 40, 46, 47, 46, 46, 48, 
	46, 46, 46, 46, 46, 46, 1, 49, 
	1, 50, 50, 1, 50, 51, 50, 46, 
	47, 46, 46, 48, 46, 46, 46, 46, 
	46, 46, 1, 52, 1, 53, 53, 1, 
	53, 53, 47, 1, 47, 54, 55, 56, 
	47, 47, 1, 57, 1, 47, 47, 1, 
	58, 37, 58, 39, 1, 59, 1, 47, 
	47, 47, 1, 58, 37, 58, 46, 46, 
	46, 39, 46, 46, 46, 46, 46, 46, 
	1, 61, 60, 60, 60, 1, 63, 55, 
	62, 62, 62, 1, 63, 55, 64, 64, 
	64, 1, 63, 55, 65, 65, 65, 1, 
	63, 55, 1, 67, 66, 60, 60, 1, 
	68, 63, 55, 69, 62, 62, 1, 70, 
	1, 71, 72, 1, 73, 1, 74, 75, 
	1, 76, 1, 55, 77, 1, 55, 78, 
	1, 55, 1, 74, 79, 1, 74, 1, 
	71, 80, 1, 71, 1, 68, 63, 55, 
	81, 64, 64, 1, 68, 63, 55, 65, 
	65, 65, 1, 83, 55, 82, 82, 82, 
	1, 85, 55, 84, 84, 84, 1, 85, 
	55, 86, 86, 86, 1, 85, 55, 87, 
	87, 87, 1, 85, 55, 1, 88, 82, 
	82, 1, 68, 85, 55, 89, 84, 84, 
	1, 68, 85, 55, 90, 86, 86, 1, 
	68, 85, 55, 87, 87, 87, 1, 91, 
	1, 68, 92, 1, 68, 93, 1, 68, 
	1, 67, 1, 36, 37, 36, 38, 38, 
	38, 39, 40, 94, 94, 38, 38, 38, 
	38, 38, 38, 1, 36, 37, 36, 38, 
	38, 38, 39, 40, 95, 95, 38, 38, 
	38, 38, 38, 38, 1, 96, 37, 96, 
	38, 38, 38, 39, 97, 38, 38, 38, 
	38, 38, 38, 1, 98, 99, 98, 27, 
	97, 1, 100, 1, 101, 101, 1, 101, 
	101, 27, 97, 1, 97, 102, 97, 103, 
	47, 103, 103, 48, 103, 103, 103, 103, 
	103, 103, 1, 104, 1, 105, 105, 1, 
	105, 51, 105, 103, 47, 103, 103, 48, 
	103, 103, 103, 103, 103, 103, 1, 106, 
	107, 106, 108, 108, 108, 109, 108, 108, 
	108, 108, 108, 108, 1, 110, 111, 110, 
	112, 112, 112, 112, 112, 112, 112, 112, 
	112, 1, 113, 114, 113, 112, 112, 112, 
	115, 112, 112, 112, 112, 112, 112, 1, 
	116, 16, 116, 12, 1, 117, 1, 110, 
	110, 1, 118, 119, 120, 121, 118, 118, 
	1, 122, 1, 118, 118, 1, 113, 114, 
	113, 115, 1, 118, 118, 118, 1, 123, 
	111, 123, 112, 112, 112, 112, 124, 125, 
	112, 124, 124, 124, 112, 124, 1, 126, 
	114, 126, 112, 112, 112, 125, 115, 112, 
	112, 112, 112, 112, 112, 1, 127, 16, 
	127, 125, 12, 1, 128, 1, 129, 130, 
	129, 131, 128, 1, 132, 132, 133, 134, 
	134, 1, 135, 135, 1, 136, 136, 1, 
	132, 132, 133, 1, 137, 137, 138, 139, 
	139, 1, 140, 140, 1, 141, 141, 1, 
	142, 142, 1, 143, 144, 144, 1, 145, 
	145, 1, 146, 146, 1, 137, 137, 138, 
	1, 147, 147, 1, 148, 148, 1, 149, 
	1, 150, 150, 1, 0, 0, 1, 151, 
	151, 152, 153, 153, 1, 151, 151, 152, 
	1, 1, 0
];

_tsip_machine_parser_header_NameAddr_trans_targs = [
	2, 0, 106, 110, 123, 3, 4, 3, 
	4, 5, 91, 96, 11, 101, 6, 7, 
	8, 9, 10, 12, 13, 12, 14, 15, 
	16, 17, 41, 21, 18, 19, 20, 22, 
	25, 79, 23, 24, 26, 41, 25, 21, 
	30, 26, 27, 28, 29, 31, 43, 37, 
	44, 32, 33, 34, 35, 36, 38, 40, 
	42, 39, 17, 125, 45, 78, 46, 49, 
	47, 48, 50, 65, 51, 63, 52, 53, 
	61, 54, 55, 59, 56, 57, 58, 60, 
	62, 64, 66, 74, 67, 70, 68, 69, 
	71, 72, 73, 75, 76, 77, 80, 81, 
	82, 86, 82, 83, 84, 85, 87, 90, 
	88, 89, 17, 41, 90, 21, 92, 94, 
	91, 93, 8, 11, 93, 95, 96, 97, 
	99, 100, 98, 102, 101, 104, 103, 103, 
	105, 17, 41, 21, 3, 4, 107, 108, 
	109, 3, 4, 111, 112, 113, 114, 115, 
	118, 116, 117, 119, 120, 121, 122, 3, 
	4, 124
];

_tsip_machine_parser_header_NameAddr_trans_actions = [
	0, 0, 0, 0, 0, 17, 17, 0, 
	0, 0, 1, 1, 0, 1, 0, 0, 
	0, 0, 0, 1, 0, 0, 0, 0, 
	3, 0, 0, 0, 0, 0, 0, 0, 
	1, 1, 0, 0, 9, 9, 0, 9, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 9, 19, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	9, 0, 0, 0, 0, 0, 0, 1, 
	0, 0, 7, 7, 0, 7, 0, 0, 
	0, 5, 5, 5, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 5, 0, 
	0, 3, 3, 3, 11, 11, 0, 0, 
	0, 15, 15, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 13, 
	13, 0
];

tsip_machine_parser_header_NameAddr_start = 1;
tsip_machine_parser_header_NameAddr_first_final = 125;
tsip_machine_parser_header_NameAddr_error = 0;

tsip_machine_parser_header_NameAddr_en_main = 1;


/* line 82 "./ragel/tsip_parser_header_NameAddr.jrl" */

function tsip_header_NameAddr(e_type, o_uri, s_tag){
	tsip_header.call(this, e_type);
    this.s_display_name = o_uri ? o_uri.s_display_name : null;
	this.o_uri = o_uri;
	this.s_tag = s_tag;
}

tsip_header_NameAddr.prototype.toString = function(){
    var s_str = tsip_uri_tostring(this.o_uri, true, true);
    if(s_str && this.s_tag){
        s_str += tsk_string_format(";tag={0}", this.s_tag);
    }
    return s_str;
}

tsip_header_NameAddr.prototype.Parse = function(s_str){
    var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;	
	var o_hdr;
	
	
/* line 374 "./src/headers/tsip_header_NameAddr.js" */
{
	 cs = tsip_machine_parser_header_NameAddr_start;
} /* JSCodeGen::writeInit */

/* line 108 "./ragel/tsip_parser_header_NameAddr.jrl" */
	
/* line 381 "./src/headers/tsip_header_NameAddr.js" */
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
	_keys = _tsip_machine_parser_header_NameAddr_key_offsets[cs];
	_trans = _tsip_machine_parser_header_NameAddr_index_offsets[cs];
	_klen = _tsip_machine_parser_header_NameAddr_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsip_machine_parser_header_NameAddr_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsip_machine_parser_header_NameAddr_trans_keys[_mid]) {
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
	  _klen = _tsip_machine_parser_header_NameAddr_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsip_machine_parser_header_NameAddr_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsip_machine_parser_header_NameAddr_trans_keys[_mid+1]) {
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
	_trans = _tsip_machine_parser_header_NameAddr_indicies[_trans];
	cs = _tsip_machine_parser_header_NameAddr_trans_targs[_trans];
	if (_tsip_machine_parser_header_NameAddr_trans_actions[_trans] != 0) {
		_acts = _tsip_machine_parser_header_NameAddr_trans_actions[_trans];
		_nacts = _tsip_machine_parser_header_NameAddr_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsip_machine_parser_header_NameAddr_actions[_acts - 1]) {
case 0:
/* line 24 "./ragel/tsip_parser_header_NameAddr.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 28 "./ragel/tsip_parser_header_NameAddr.jrl" */

	    if(o_hdr && !o_hdr.o_uri){
		    var s_uri = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			if((o_hdr.o_uri = tsip_uri.prototype.Parse(s_uri)) && o_hdr.s_display_name){
				o_hdr.o_uri.s_display_name = tsk_strdup(o_hdr.s_display_name);
			}
		}
			break;
case 2:
/* line 37 "./ragel/tsip_parser_header_NameAddr.jrl" */

		if(o_hdr){
			o_hdr.s_display_name = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			o_hdr.s_display_name = tsk_string_unquote_2(o_hdr.s_display_name);
		}
			break;
case 3:
/* line 44 "./ragel/tsip_parser_header_NameAddr.jrl" */

		if(o_hdr){
			o_hdr.s_tag = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
		}
			break;
case 4:
/* line 50 "./ragel/tsip_parser_header_NameAddr.jrl" */

	    tsk_ragel_add_param(s_str, p, i_tag_start, o_hdr.ao_params);
			break;
case 5:
/* line 54 "./ragel/tsip_parser_header_NameAddr.jrl" */
 o_hdr = new tsip_header_From(); 		break;
case 6:
/* line 55 "./ragel/tsip_parser_header_NameAddr.jrl" */
 o_hdr = new tsip_header_To(); 		break;
case 7:
/* line 56 "./ragel/tsip_parser_header_NameAddr.jrl" */
 o_hdr = new tsip_header_Refer_To(); 		break;
case 8:
/* line 57 "./ragel/tsip_parser_header_NameAddr.jrl" */
 o_hdr = new tsip_header_Referred_By(); 		break;
case 9:
/* line 59 "./ragel/tsip_parser_header_NameAddr.jrl" */
 		break;
/* line 515 "./src/headers/tsip_header_NameAddr.js" */
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

/* line 109 "./ragel/tsip_parser_header_NameAddr.jrl" */
	
	if( cs < 
/* line 545 "./src/headers/tsip_header_NameAddr.js" */
125
/* line 110 "./ragel/tsip_parser_header_NameAddr.jrl" */
 ){
		tsk_utils_log_error("Failed to parse header: " + s_str);
		return null;
	}
	
	return o_hdr;
}

function tsip_header_From(o_uri, s_tag){ tsip_header_NameAddr.call(this, tsip_header_type_e.From, o_uri, s_tag); }
function tsip_header_To(o_uri, s_tag){ tsip_header_NameAddr.call(this, tsip_header_type_e.To, o_uri, s_tag); }
function tsip_header_Refer_To(o_uri){ tsip_header_NameAddr.call(this, tsip_header_type_e.Refer_To, o_uri); }
function tsip_header_Referred_By(o_uri){ tsip_header_NameAddr.call(this, tsip_header_type_e.Referred_By, o_uri); }

if(!window.__b_release_mode){
	tsip_api_add_js_scripts('head',
		'src/tinySIP/src/headers/tsip_header_NameAddrArray.js' // 'P-Asserted-Identity', 'P-Associated-URI', 'Path', 'Record-Route', 'Route', 'Service-Route'
	);
}

