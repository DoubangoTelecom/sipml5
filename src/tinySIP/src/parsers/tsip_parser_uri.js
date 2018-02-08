/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
/* line 1 "./ragel/tsip_parser_uri.jrl" */

/* line 105 "./ragel/tsip_parser_uri.jrl" */



/* line 9 "./src/parsers/tsip_parser_uri.js" */
_tsip_machine_parser_uri_actions = [
	0, 1, 0, 1, 5, 1, 7, 1, 
	9, 1, 11, 1, 12, 1, 13, 1, 
	14, 1, 17, 1, 18, 1, 20, 1, 
	21, 1, 22, 1, 23, 2, 1, 15, 
	2, 2, 15, 2, 4, 6, 2, 7, 
	10, 2, 7, 16, 2, 8, 10, 2, 
	9, 16, 2, 9, 19, 2, 13, 0, 
	2, 13, 6, 3, 0, 8, 10, 3, 
	13, 0, 6, 3, 13, 3, 0
];

_tsip_machine_parser_uri_key_offsets = [
	0, 0, 7, 15, 22, 28, 34, 40, 
	53, 66, 72, 78, 80, 93, 99, 105, 
	118, 124, 130, 143, 156, 162, 168, 182, 
	196, 202, 208, 229, 231, 247, 262, 278, 
	292, 300, 306, 320, 336, 350, 366, 380, 
	388, 396, 404, 420, 436, 452, 468, 484, 
	500, 506, 508, 525, 540, 554, 568, 582, 
	592, 602, 613, 613, 622, 622, 632, 642, 
	651, 654, 669, 683, 698, 714, 730, 746, 
	750, 765, 782, 788, 795, 801, 808, 814, 
	821, 828, 831, 838, 841, 848, 851, 868, 
	885, 901, 917, 933, 949, 953, 967, 984, 
	1001, 1018, 1024, 1031, 1038, 1041, 1044
];

_tsip_machine_parser_uri_trans_keys = [
	45, 48, 57, 65, 90, 97, 122, 45, 
	46, 48, 57, 65, 90, 97, 122, 45, 
	48, 57, 65, 90, 97, 122, 48, 57, 
	65, 90, 97, 122, 48, 57, 65, 70, 
	97, 102, 48, 57, 65, 70, 97, 102, 
	33, 37, 93, 95, 126, 36, 43, 45, 
	58, 65, 91, 97, 122, 33, 37, 93, 
	95, 126, 36, 43, 45, 58, 65, 91, 
	97, 122, 48, 57, 65, 70, 97, 102, 
	48, 57, 65, 70, 97, 102, 0, 65535, 
	33, 37, 93, 95, 126, 36, 43, 45, 
	58, 65, 91, 97, 122, 48, 57, 65, 
	70, 97, 102, 48, 57, 65, 70, 97, 
	102, 33, 37, 93, 95, 126, 36, 43, 
	45, 58, 65, 91, 97, 122, 48, 57, 
	65, 70, 97, 102, 48, 57, 65, 70, 
	97, 102, 33, 37, 59, 61, 63, 95, 
	126, 36, 57, 65, 90, 97, 122, 33, 
	37, 58, 61, 64, 95, 126, 36, 59, 
	63, 90, 97, 122, 48, 57, 65, 70, 
	97, 102, 48, 57, 65, 70, 97, 102, 
	33, 37, 61, 64, 95, 126, 36, 46, 
	48, 57, 65, 90, 97, 122, 33, 37, 
	61, 64, 95, 126, 36, 46, 48, 57, 
	65, 90, 97, 122, 48, 57, 65, 70, 
	97, 102, 48, 57, 65, 70, 97, 102, 
	58, 59, 83, 84, 91, 115, 116, 0, 
	47, 48, 57, 60, 64, 65, 90, 92, 
	96, 97, 122, 123, 65535, 0, 65535, 45, 
	46, 0, 47, 48, 57, 58, 64, 65, 
	90, 91, 96, 97, 122, 123, 65535, 45, 
	0, 47, 48, 57, 58, 64, 65, 90, 
	91, 96, 97, 122, 123, 65535, 45, 46, 
	0, 47, 48, 57, 58, 64, 65, 90, 
	91, 96, 97, 122, 123, 65535, 0, 47, 
	48, 57, 58, 64, 65, 90, 91, 96, 
	97, 122, 123, 65535, 45, 46, 48, 57, 
	65, 90, 97, 122, 48, 57, 65, 90, 
	97, 122, 0, 47, 48, 57, 58, 64, 
	65, 90, 91, 96, 97, 122, 123, 65535, 
	45, 46, 0, 47, 48, 57, 58, 64, 
	65, 90, 91, 96, 97, 122, 123, 65535, 
	0, 47, 48, 57, 58, 64, 65, 90, 
	91, 96, 97, 122, 123, 65535, 45, 46, 
	0, 47, 48, 57, 58, 64, 65, 90, 
	91, 96, 97, 122, 123, 65535, 0, 47, 
	48, 57, 58, 64, 65, 90, 91, 96, 
	97, 122, 123, 65535, 45, 46, 48, 57, 
	65, 90, 97, 122, 45, 46, 48, 57, 
	65, 90, 97, 122, 45, 46, 48, 57, 
	65, 90, 97, 122, 45, 46, 0, 47, 
	48, 57, 58, 64, 65, 90, 91, 96, 
	97, 122, 123, 65535, 45, 46, 0, 47, 
	48, 57, 58, 64, 65, 90, 91, 96, 
	97, 122, 123, 65535, 45, 46, 0, 47, 
	48, 57, 58, 64, 65, 90, 91, 96, 
	97, 122, 123, 65535, 45, 46, 0, 47, 
	48, 57, 58, 64, 65, 90, 91, 96, 
	97, 122, 123, 65535, 45, 46, 0, 47, 
	48, 57, 58, 64, 65, 90, 91, 96, 
	97, 122, 123, 65535, 45, 46, 0, 47, 
	48, 57, 58, 64, 65, 90, 91, 96, 
	97, 122, 123, 65535, 0, 47, 48, 57, 
	58, 65535, 48, 57, 33, 37, 44, 92, 
	94, 96, 126, 0, 35, 36, 58, 59, 
	64, 65, 122, 123, 65535, 33, 37, 59, 
	61, 93, 95, 126, 36, 43, 45, 58, 
	65, 91, 97, 122, 33, 37, 59, 93, 
	95, 126, 36, 43, 45, 58, 65, 91, 
	97, 122, 0, 47, 48, 57, 58, 64, 
	65, 70, 71, 96, 97, 102, 103, 65535, 
	0, 47, 48, 57, 58, 64, 65, 70, 
	71, 96, 97, 102, 103, 65535, 45, 46, 
	73, 105, 48, 57, 65, 90, 97, 122, 
	45, 46, 80, 112, 48, 57, 65, 90, 
	97, 122, 45, 46, 58, 83, 115, 48, 
	57, 65, 90, 97, 122, 45, 46, 58, 
	48, 57, 65, 90, 97, 122, 45, 46, 
	69, 101, 48, 57, 65, 90, 97, 122, 
	45, 46, 76, 108, 48, 57, 65, 90, 
	97, 122, 45, 46, 58, 48, 57, 65, 
	90, 97, 122, 59, 0, 65535, 33, 37, 
	59, 61, 93, 95, 126, 36, 43, 45, 
	58, 65, 91, 97, 122, 33, 37, 59, 
	93, 95, 126, 36, 43, 45, 58, 65, 
	91, 97, 122, 58, 0, 47, 48, 57, 
	59, 64, 65, 70, 71, 96, 97, 102, 
	103, 65535, 58, 93, 0, 47, 48, 57, 
	59, 64, 65, 70, 71, 96, 97, 102, 
	103, 65535, 58, 93, 0, 47, 48, 57, 
	59, 64, 65, 70, 71, 96, 97, 102, 
	103, 65535, 58, 93, 0, 47, 48, 57, 
	59, 64, 65, 70, 71, 96, 97, 102, 
	103, 65535, 58, 93, 0, 65535, 58, 0, 
	47, 48, 57, 59, 64, 65, 70, 71, 
	96, 97, 102, 103, 65535, 46, 58, 93, 
	0, 47, 48, 57, 59, 64, 65, 70, 
	71, 96, 97, 102, 103, 65535, 0, 47, 
	48, 57, 58, 65535, 46, 0, 47, 48, 
	57, 58, 65535, 0, 47, 48, 57, 58, 
	65535, 46, 0, 47, 48, 57, 58, 65535, 
	0, 47, 48, 57, 58, 65535, 93, 0, 
	47, 48, 57, 58, 65535, 93, 0, 47, 
	48, 57, 58, 65535, 93, 0, 65535, 46, 
	0, 47, 48, 57, 58, 65535, 46, 0, 
	65535, 46, 0, 47, 48, 57, 58, 65535, 
	46, 0, 65535, 46, 58, 93, 0, 47, 
	48, 57, 59, 64, 65, 70, 71, 96, 
	97, 102, 103, 65535, 46, 58, 93, 0, 
	47, 48, 57, 59, 64, 65, 70, 71, 
	96, 97, 102, 103, 65535, 58, 93, 0, 
	47, 48, 57, 59, 64, 65, 70, 71, 
	96, 97, 102, 103, 65535, 58, 93, 0, 
	47, 48, 57, 59, 64, 65, 70, 71, 
	96, 97, 102, 103, 65535, 58, 93, 0, 
	47, 48, 57, 59, 64, 65, 70, 71, 
	96, 97, 102, 103, 65535, 58, 93, 0, 
	47, 48, 57, 59, 64, 65, 70, 71, 
	96, 97, 102, 103, 65535, 58, 93, 0, 
	65535, 0, 47, 48, 57, 58, 64, 65, 
	70, 71, 96, 97, 102, 103, 65535, 46, 
	58, 93, 0, 47, 48, 57, 59, 64, 
	65, 70, 71, 96, 97, 102, 103, 65535, 
	46, 58, 93, 0, 47, 48, 57, 59, 
	64, 65, 70, 71, 96, 97, 102, 103, 
	65535, 46, 58, 93, 0, 47, 48, 57, 
	59, 64, 65, 70, 71, 96, 97, 102, 
	103, 65535, 0, 47, 48, 57, 58, 65535, 
	46, 0, 47, 48, 57, 58, 65535, 46, 
	0, 47, 48, 57, 58, 65535, 46, 0, 
	65535, 58, 0, 65535, 0
];

_tsip_machine_parser_uri_single_lengths = [
	0, 1, 2, 1, 0, 0, 0, 5, 
	5, 0, 0, 0, 5, 0, 0, 5, 
	0, 0, 7, 7, 0, 0, 6, 6, 
	0, 0, 7, 0, 2, 1, 2, 0, 
	2, 0, 0, 2, 0, 2, 0, 2, 
	2, 2, 2, 2, 2, 2, 2, 2, 
	0, 0, 7, 7, 6, 0, 0, 4, 
	4, 5, 0, 3, 0, 4, 4, 3, 
	1, 7, 6, 1, 2, 2, 2, 2, 
	1, 3, 0, 1, 0, 1, 0, 1, 
	1, 1, 1, 1, 1, 1, 3, 3, 
	2, 2, 2, 2, 2, 0, 3, 3, 
	3, 0, 1, 1, 1, 1, 0
];

_tsip_machine_parser_uri_range_lengths = [
	0, 3, 3, 3, 3, 3, 3, 4, 
	4, 3, 3, 1, 4, 3, 3, 4, 
	3, 3, 3, 3, 3, 3, 4, 4, 
	3, 3, 7, 1, 7, 7, 7, 7, 
	3, 3, 7, 7, 7, 7, 7, 3, 
	3, 3, 7, 7, 7, 7, 7, 7, 
	3, 1, 5, 4, 4, 7, 7, 3, 
	3, 3, 0, 3, 0, 3, 3, 3, 
	1, 4, 4, 7, 7, 7, 7, 1, 
	7, 7, 3, 3, 3, 3, 3, 3, 
	3, 1, 3, 1, 3, 1, 7, 7, 
	7, 7, 7, 7, 1, 7, 7, 7, 
	7, 3, 3, 3, 1, 1, 0
];

_tsip_machine_parser_uri_index_offsets = [
	0, 0, 5, 11, 16, 20, 24, 28, 
	38, 48, 52, 56, 58, 68, 72, 76, 
	86, 90, 94, 105, 116, 120, 124, 135, 
	146, 150, 154, 169, 171, 181, 190, 200, 
	208, 214, 218, 226, 236, 244, 254, 262, 
	268, 274, 280, 290, 300, 310, 320, 330, 
	340, 344, 346, 359, 371, 382, 390, 398, 
	406, 414, 423, 424, 431, 432, 440, 448, 
	455, 458, 470, 481, 490, 500, 510, 520, 
	524, 533, 544, 548, 553, 557, 562, 566, 
	571, 576, 579, 584, 587, 592, 595, 606, 
	617, 627, 637, 647, 657, 661, 669, 680, 
	691, 702, 706, 711, 716, 719, 722
];

_tsip_machine_parser_uri_indicies = [
	1, 2, 2, 2, 0, 3, 4, 5, 
	5, 5, 0, 3, 5, 5, 5, 0, 
	5, 2, 2, 0, 7, 7, 7, 6, 
	8, 8, 8, 6, 9, 10, 9, 9, 
	9, 9, 9, 9, 9, 6, 11, 12, 
	11, 11, 11, 11, 11, 11, 11, 6, 
	13, 13, 13, 6, 11, 11, 11, 6, 
	14, 0, 16, 17, 16, 16, 16, 16, 
	16, 16, 16, 15, 18, 18, 18, 15, 
	19, 19, 19, 15, 20, 21, 20, 20, 
	20, 20, 20, 20, 20, 15, 22, 22, 
	22, 15, 20, 20, 20, 15, 23, 25, 
	23, 23, 23, 23, 23, 23, 23, 23, 
	24, 26, 27, 28, 26, 29, 26, 26, 
	26, 26, 26, 24, 30, 30, 30, 24, 
	26, 26, 26, 24, 31, 32, 31, 33, 
	31, 31, 31, 31, 31, 31, 24, 34, 
	35, 34, 36, 34, 34, 34, 34, 34, 
	34, 24, 37, 37, 37, 24, 34, 34, 
	34, 24, 40, 41, 43, 44, 45, 43, 
	44, 38, 39, 38, 42, 38, 42, 38, 
	24, 38, 46, 47, 48, 38, 49, 38, 
	50, 38, 50, 38, 46, 47, 38, 50, 
	38, 50, 38, 50, 38, 46, 47, 51, 
	38, 50, 38, 50, 38, 50, 38, 46, 
	38, 50, 38, 2, 38, 2, 38, 46, 
	1, 53, 2, 2, 2, 52, 5, 2, 
	2, 52, 38, 54, 38, 2, 38, 2, 
	38, 46, 47, 55, 38, 56, 38, 50, 
	38, 50, 38, 46, 38, 57, 38, 2, 
	38, 2, 38, 46, 47, 58, 38, 59, 
	38, 50, 38, 50, 38, 46, 38, 60, 
	38, 2, 38, 2, 38, 46, 3, 4, 
	61, 5, 5, 52, 3, 4, 62, 5, 
	5, 52, 3, 4, 5, 5, 5, 52, 
	47, 58, 38, 63, 38, 50, 38, 50, 
	38, 46, 47, 58, 38, 50, 38, 50, 
	38, 50, 38, 46, 47, 55, 38, 64, 
	38, 50, 38, 50, 38, 46, 47, 55, 
	38, 50, 38, 50, 38, 50, 38, 46, 
	47, 48, 38, 65, 38, 50, 38, 50, 
	38, 46, 47, 48, 38, 50, 38, 50, 
	38, 50, 38, 46, 38, 66, 38, 46, 
	66, 67, 9, 68, 38, 38, 38, 38, 
	9, 38, 9, 38, 9, 38, 46, 8, 
	70, 71, 72, 8, 8, 8, 8, 8, 
	8, 8, 69, 11, 12, 71, 11, 11, 
	11, 11, 11, 11, 11, 69, 38, 73, 
	38, 73, 38, 73, 38, 46, 38, 8, 
	38, 8, 38, 8, 38, 46, 1, 53, 
	74, 74, 2, 2, 2, 52, 1, 53, 
	75, 75, 2, 2, 2, 52, 1, 53, 
	76, 77, 77, 2, 2, 2, 52, 78, 
	1, 53, 79, 2, 2, 2, 52, 80, 
	1, 53, 81, 81, 2, 2, 2, 52, 
	1, 53, 82, 82, 2, 2, 2, 52, 
	1, 53, 83, 2, 2, 2, 52, 86, 
	85, 84, 19, 88, 89, 90, 19, 19, 
	19, 19, 19, 19, 19, 87, 20, 21, 
	89, 20, 20, 20, 20, 20, 20, 20, 
	87, 92, 38, 91, 38, 91, 38, 91, 
	38, 46, 94, 95, 38, 93, 38, 93, 
	38, 93, 38, 46, 94, 95, 38, 96, 
	38, 96, 38, 96, 38, 46, 94, 95, 
	38, 97, 38, 97, 38, 97, 38, 46, 
	94, 95, 38, 46, 99, 38, 98, 38, 
	91, 38, 91, 38, 46, 100, 94, 95, 
	38, 101, 38, 93, 38, 93, 38, 46, 
	38, 102, 38, 46, 103, 38, 104, 38, 
	46, 38, 105, 38, 46, 106, 38, 107, 
	38, 46, 38, 108, 38, 46, 95, 38, 
	109, 38, 46, 95, 38, 110, 38, 46, 
	95, 38, 46, 106, 38, 111, 38, 46, 
	106, 38, 46, 103, 38, 112, 38, 46, 
	103, 38, 46, 100, 94, 95, 38, 113, 
	38, 96, 38, 96, 38, 46, 100, 94, 
	95, 38, 97, 38, 97, 38, 97, 38, 
	46, 115, 95, 38, 114, 38, 114, 38, 
	114, 38, 46, 117, 95, 38, 116, 38, 
	116, 38, 116, 38, 46, 117, 95, 38, 
	118, 38, 118, 38, 118, 38, 46, 117, 
	95, 38, 119, 38, 119, 38, 119, 38, 
	46, 117, 95, 38, 46, 38, 120, 38, 
	114, 38, 114, 38, 46, 100, 117, 95, 
	38, 121, 38, 116, 38, 116, 38, 46, 
	100, 117, 95, 38, 122, 38, 118, 38, 
	118, 38, 46, 100, 117, 95, 38, 119, 
	38, 119, 38, 119, 38, 46, 38, 123, 
	38, 46, 100, 38, 124, 38, 46, 100, 
	38, 125, 38, 46, 100, 38, 46, 99, 
	38, 46, 24, 0
];

_tsip_machine_parser_uri_trans_targs = [
	26, 1, 32, 3, 4, 2, 26, 6, 
	51, 51, 5, 52, 9, 10, 64, 26, 
	65, 13, 14, 65, 66, 16, 17, 19, 
	0, 20, 19, 20, 22, 102, 21, 23, 
	24, 102, 23, 24, 102, 25, 27, 28, 
	48, 50, 32, 55, 61, 67, 26, 29, 
	34, 46, 30, 31, 26, 33, 35, 36, 
	44, 37, 38, 42, 39, 40, 41, 43, 
	45, 47, 49, 26, 53, 26, 5, 7, 
	8, 54, 56, 57, 58, 59, 26, 60, 
	26, 62, 63, 11, 26, 64, 12, 26, 
	13, 12, 15, 68, 101, 69, 72, 26, 
	70, 71, 73, 88, 74, 86, 75, 76, 
	84, 77, 78, 82, 79, 80, 81, 83, 
	85, 87, 89, 97, 90, 93, 91, 92, 
	94, 95, 96, 98, 99, 100
];

_tsip_machine_parser_uri_trans_actions = [
	25, 0, 13, 0, 0, 0, 27, 0, 
	13, 53, 1, 13, 0, 0, 67, 23, 
	53, 1, 0, 13, 13, 0, 0, 1, 
	0, 1, 0, 0, 5, 38, 0, 1, 
	1, 59, 0, 0, 44, 0, 0, 35, 
	0, 0, 56, 63, 56, 3, 21, 0, 
	0, 0, 0, 0, 17, 13, 0, 0, 
	0, 0, 0, 0, 13, 13, 13, 0, 
	0, 0, 0, 19, 1, 50, 0, 7, 
	0, 0, 13, 13, 0, 13, 29, 0, 
	32, 13, 13, 0, 41, 13, 5, 47, 
	0, 7, 0, 0, 0, 0, 0, 15, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0
];

_tsip_machine_parser_uri_to_state_actions = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 9, 0, 0, 0, 0, 0, 
	0, 0, 9, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0
];

_tsip_machine_parser_uri_from_state_actions = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 11, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0
];

_tsip_machine_parser_uri_eof_trans = [
	0, 1, 1, 1, 1, 7, 7, 7, 
	7, 7, 7, 1, 16, 16, 16, 16, 
	16, 16, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 47, 47, 47, 47, 47, 
	53, 53, 47, 47, 47, 47, 47, 53, 
	53, 53, 47, 47, 47, 47, 47, 47, 
	47, 68, 47, 70, 70, 47, 47, 53, 
	53, 53, 79, 53, 81, 53, 53, 53, 
	85, 88, 88, 47, 47, 47, 47, 47, 
	47, 47, 47, 47, 47, 47, 47, 47, 
	47, 47, 47, 47, 47, 47, 47, 47, 
	47, 47, 47, 47, 47, 47, 47, 47, 
	47, 47, 47, 47, 47, 47, 0
];

tsip_machine_parser_uri_start = 26;
tsip_machine_parser_uri_first_final = 26;
tsip_machine_parser_uri_error = 0;

tsip_machine_parser_uri_en_sip_usrinfo = 18;
tsip_machine_parser_uri_en_main = 26;


/* line 108 "./ragel/tsip_parser_uri.jrl" */

tsip_uri.prototype.Parse = function(s_str){
    var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;	
	var uri = new tsip_uri(tsip_uri_type_e.unknown);
	
	
/* line 421 "./src/parsers/tsip_parser_uri.js" */
{
	 cs = tsip_machine_parser_uri_start;
	 ts = null;
	 te = null;
	 act = 0;
} /* JSCodeGen::writeInit */

/* line 120 "./ragel/tsip_parser_uri.jrl" */
	
/* line 431 "./src/parsers/tsip_parser_uri.js" */
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
	_acts = _tsip_machine_parser_uri_from_state_actions[cs];
	_nacts = _tsip_machine_parser_uri_actions[_acts];
	_acts += 1;
	while (_nacts > 0) {
		_nacts -= 1;
		_acts += 1;
		switch (_tsip_machine_parser_uri_actions[_acts - 1]) {
			case 12:
/* line 1 "NONE" */
ts = p
		break;
/* line 467 "./src/parsers/tsip_parser_uri.js" */
		} 
	}
	if (_trigger_goto) {
		continue;
	}
	_keys = _tsip_machine_parser_uri_key_offsets[cs];
	_trans = _tsip_machine_parser_uri_index_offsets[cs];
	_klen = _tsip_machine_parser_uri_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsip_machine_parser_uri_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsip_machine_parser_uri_trans_keys[_mid]) {
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
	  _klen = _tsip_machine_parser_uri_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsip_machine_parser_uri_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsip_machine_parser_uri_trans_keys[_mid+1]) {
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
	_trans = _tsip_machine_parser_uri_indicies[_trans];
	}
	if (_goto_level <= _eof_trans) {
	cs = _tsip_machine_parser_uri_trans_targs[_trans];
	if (_tsip_machine_parser_uri_trans_actions[_trans] != 0) {
		_acts = _tsip_machine_parser_uri_trans_actions[_trans];
		_nacts = _tsip_machine_parser_uri_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsip_machine_parser_uri_actions[_acts - 1]) {
case 0:
/* line 8 "./ragel/tsip_parser_uri.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 13 "./ragel/tsip_parser_uri.jrl" */

	    uri.e_type = tsip_uri_type_e.sip;
	    uri.s_scheme = uri.e_type.s_scheme;
			break;
case 2:
/* line 17 "./ragel/tsip_parser_uri.jrl" */
 
	    uri.e_type = tsip_uri_type_e.sips;
	    uri.s_scheme = uri.e_type.s_scheme;
			break;
case 3:
/* line 21 "./ragel/tsip_parser_uri.jrl" */
 
	    uri.e_type = tsip_uri_type_e.tel;
	    uri.s_scheme = uri.e_type.s_scheme;
			break;
case 4:
/* line 27 "./ragel/tsip_parser_uri.jrl" */
 
	    uri.e_host_type = tsip_host_type_e.ipv4; 
			break;
case 5:
/* line 30 "./ragel/tsip_parser_uri.jrl" */
 
	    uri.e_host_type = tsip_host_type_e.ipv6; 
			break;
case 6:
/* line 33 "./ragel/tsip_parser_uri.jrl" */
 
	    uri.e_host_type = tsip_host_type_e.hostname; 
			break;
case 7:
/* line 41 "./ragel/tsip_parser_uri.jrl" */

	    uri.s_user_name = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			break;
case 8:
/* line 45 "./ragel/tsip_parser_uri.jrl" */

	    uri.s_password = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			break;
case 9:
/* line 57 "./ragel/tsip_parser_uri.jrl" */

	    var o_param = tsk_ragel_parser_get_param(s_str, p, i_tag_start);
        if (o_param){
            uri.ao_params.push(o_param);
        }
			break;
case 10:
/* line 70 "./ragel/tsip_parser_uri.jrl" */
 	{
		cs = 26;
		_trigger_goto = true;
		_goto_level = _again;
		break;
	}
 		break;
case 13:
/* line 1 "NONE" */
te = p+1
		break;
case 14:
/* line 83 "./ragel/tsip_parser_uri.jrl" */
te = p+1
 {
							    uri.s_host = tsk_ragel_scanner_get_string(s_str, ts, te);
								if(uri.e_host_type.i_id == tsip_host_type_e.ipv6.i_id){
								    uri.s_host = tsk_string_unquote(uri.s_host, '[', ']');
								}
							 }
		break;
case 15:
/* line 74 "./ragel/tsip_parser_uri.jrl" */
te = p
p = p - 1; {
								if(tsk_string_contains(s_str.substring(te), (pe - te), "@")){
										{
		cs = 18;
		_trigger_goto = true;
		_goto_level = _again;
		break;
	}

								}
							 }
		break;
case 16:
/* line 80 "./ragel/tsip_parser_uri.jrl" */
te = p
p = p - 1; {  }
		break;
case 17:
/* line 83 "./ragel/tsip_parser_uri.jrl" */
te = p
p = p - 1; {
							    uri.s_host = tsk_ragel_scanner_get_string(s_str, ts, te);
								if(uri.e_host_type.i_id == tsip_host_type_e.ipv6.i_id){
								    uri.s_host = tsk_string_unquote(uri.s_host, '[', ']');
								}
							 }
		break;
case 18:
/* line 91 "./ragel/tsip_parser_uri.jrl" */
te = p
p = p - 1; {
								ts++;
								uri.i_port = tsk_ragel_scanner_get_int(s_str, ts, te);
							 }
		break;
case 19:
/* line 96 "./ragel/tsip_parser_uri.jrl" */
te = p
p = p - 1; {   }
		break;
case 20:
/* line 97 "./ragel/tsip_parser_uri.jrl" */
te = p
p = p - 1; {   }
		break;
case 21:
/* line 80 "./ragel/tsip_parser_uri.jrl" */
 { p = ((te))-1; }
 {  }
		break;
case 22:
/* line 83 "./ragel/tsip_parser_uri.jrl" */
 { p = ((te))-1; }
 {
							    uri.s_host = tsk_ragel_scanner_get_string(s_str, ts, te);
								if(uri.e_host_type.i_id == tsip_host_type_e.ipv6.i_id){
								    uri.s_host = tsk_string_unquote(uri.s_host, '[', ']');
								}
							 }
		break;
case 23:
/* line 96 "./ragel/tsip_parser_uri.jrl" */
 { p = ((te))-1; }
 {   }
		break;
/* line 681 "./src/parsers/tsip_parser_uri.js" */
			} /* action switch */
		}
	}
	if (_trigger_goto) {
		continue;
	}
	}
	if (_goto_level <= _again) {
	_acts = _tsip_machine_parser_uri_to_state_actions[cs];
	_nacts = _tsip_machine_parser_uri_actions[_acts];
	_acts += 1;
	while (_nacts > 0) {
		_nacts -= 1;
		_acts += 1;
		switch (_tsip_machine_parser_uri_actions[_acts - 1]) {
case 11:
/* line 1 "NONE" */
ts = null;		break;
/* line 700 "./src/parsers/tsip_parser_uri.js" */
		}
	}
	if (_trigger_goto) {
		continue;
	}
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
	if (_tsip_machine_parser_uri_eof_trans[cs] > 0) {
		_trans = _tsip_machine_parser_uri_eof_trans[cs] - 1;
		_goto_level = _eof_trans;
		continue;
	}
}
	}
	if (_goto_level <= _out) {
		break;
	}
	}
	}

/* line 121 "./ragel/tsip_parser_uri.jrl" */
	
	if( cs < 
/* line 734 "./src/parsers/tsip_parser_uri.js" */
26
/* line 122 "./ragel/tsip_parser_uri.jrl" */
 ){
		tsk_utils_log_error("Failed to parse SIP/SIPS/TEL URI: " + s_str);
		return null;
	}
	
	return uri;
}
