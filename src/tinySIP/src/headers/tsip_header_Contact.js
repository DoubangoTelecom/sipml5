
/* line 1 "./ragel/tsip_parser_header_Contact.jrl" */
/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
tsip_header_Contact.prototype = Object.create(tsip_header.prototype);

/* line 74 "./ragel/tsip_parser_header_Contact.jrl" */




/* line 16 "./src/headers/tsip_header_Contact.js" */
_tsip_machine_parser_header_Contact_actions = [
	0, 1, 0, 1, 1, 1, 2, 1, 
	3, 1, 4, 1, 5, 1, 6, 1, 
	7, 2, 1, 0, 2, 3, 6, 2, 
	4, 6, 2, 5, 6
];

_tsip_machine_parser_header_Contact_key_offsets = [
	0, 0, 4, 6, 8, 10, 12, 14, 
	16, 19, 40, 41, 43, 64, 65, 67, 
	71, 74, 75, 79, 91, 94, 96, 99, 
	104, 109, 110, 112, 116, 137, 138, 140, 
	161, 162, 164, 167, 184, 202, 206, 207, 
	209, 217, 218, 220, 224, 230, 250, 269, 
	274, 276, 283, 302, 303, 305, 323, 341, 
	347, 348, 350, 355, 374, 375, 377, 396, 
	397, 399, 402, 410, 411, 413, 418, 424, 
	441, 448, 456, 464, 472, 474, 481, 490, 
	492, 495, 497, 500, 502, 505, 508, 509, 
	512, 513, 516, 517, 526, 535, 543, 551, 
	559, 567, 569, 575, 584, 593, 602, 604, 
	607, 610, 611, 612, 632, 652, 672, 692, 
	712, 732, 750, 756, 757, 759, 764, 783, 
	784, 786, 805, 812, 829, 847, 851
];

_tsip_machine_parser_header_Contact_trans_keys = [
	67, 77, 99, 109, 79, 111, 78, 110, 
	84, 116, 65, 97, 67, 99, 84, 116, 
	9, 32, 58, 9, 13, 32, 33, 34, 
	37, 39, 42, 43, 60, 126, 45, 46, 
	48, 57, 65, 90, 95, 96, 97, 122, 
	10, 9, 32, 9, 13, 32, 33, 34, 
	37, 39, 42, 43, 60, 126, 45, 46, 
	48, 57, 65, 90, 95, 96, 97, 122, 
	10, 9, 32, 9, 32, 42, 60, 9, 
	13, 32, 10, 65, 90, 97, 122, 9, 
	32, 43, 58, 45, 46, 48, 57, 65, 
	90, 97, 122, 9, 32, 58, 0, 65535, 
	62, 0, 65535, 9, 13, 32, 44, 59, 
	9, 13, 32, 44, 59, 10, 9, 32, 
	9, 32, 44, 59, 9, 13, 32, 33, 
	34, 37, 39, 60, 126, 42, 43, 45, 
	46, 48, 57, 65, 90, 95, 96, 97, 
	122, 10, 9, 32, 9, 13, 32, 33, 
	34, 37, 39, 60, 126, 42, 43, 45, 
	46, 48, 57, 65, 90, 95, 96, 97, 
	122, 10, 9, 32, 9, 32, 60, 9, 
	13, 32, 33, 37, 39, 126, 42, 43, 
	45, 46, 48, 57, 65, 90, 95, 122, 
	9, 13, 32, 33, 37, 39, 60, 126, 
	42, 43, 45, 46, 48, 57, 65, 90, 
	95, 122, 9, 13, 32, 60, 10, 9, 
	32, 9, 13, 34, 92, 32, 126, 128, 
	255, 10, 9, 32, 9, 13, 32, 60, 
	0, 9, 11, 12, 14, 127, 9, 13, 
	32, 33, 37, 39, 42, 43, 58, 126, 
	45, 46, 48, 57, 65, 90, 95, 96, 
	97, 122, 9, 13, 32, 33, 37, 39, 
	58, 60, 126, 42, 43, 45, 46, 48, 
	57, 65, 90, 95, 122, 9, 13, 32, 
	58, 60, 0, 65535, 9, 13, 32, 44, 
	59, 0, 65535, 9, 13, 32, 33, 37, 
	39, 69, 101, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 10, 9, 
	32, 9, 32, 33, 37, 39, 69, 101, 
	126, 42, 43, 45, 46, 48, 57, 65, 
	90, 95, 122, 9, 13, 32, 33, 37, 
	39, 44, 59, 61, 126, 42, 46, 48, 
	57, 65, 90, 95, 122, 9, 13, 32, 
	44, 59, 61, 10, 9, 32, 9, 32, 
	44, 59, 61, 9, 13, 32, 33, 34, 
	37, 39, 91, 126, 42, 43, 45, 46, 
	48, 57, 65, 90, 95, 122, 10, 9, 
	32, 9, 13, 32, 33, 34, 37, 39, 
	91, 126, 42, 43, 45, 46, 48, 57, 
	65, 90, 95, 122, 10, 9, 32, 9, 
	32, 34, 9, 13, 34, 92, 32, 126, 
	128, 255, 10, 9, 32, 9, 13, 32, 
	44, 59, 0, 9, 11, 12, 14, 127, 
	9, 13, 32, 33, 37, 39, 44, 59, 
	126, 42, 46, 48, 57, 65, 90, 95, 
	122, 58, 48, 57, 65, 70, 97, 102, 
	58, 93, 48, 57, 65, 70, 97, 102, 
	58, 93, 48, 57, 65, 70, 97, 102, 
	58, 93, 48, 57, 65, 70, 97, 102, 
	58, 93, 58, 48, 57, 65, 70, 97, 
	102, 46, 58, 93, 48, 57, 65, 70, 
	97, 102, 48, 57, 46, 48, 57, 48, 
	57, 46, 48, 57, 48, 57, 93, 48, 
	57, 93, 48, 57, 93, 46, 48, 57, 
	46, 46, 48, 57, 46, 46, 58, 93, 
	48, 57, 65, 70, 97, 102, 46, 58, 
	93, 48, 57, 65, 70, 97, 102, 58, 
	93, 48, 57, 65, 70, 97, 102, 58, 
	93, 48, 57, 65, 70, 97, 102, 58, 
	93, 48, 57, 65, 70, 97, 102, 58, 
	93, 48, 57, 65, 70, 97, 102, 58, 
	93, 48, 57, 65, 70, 97, 102, 46, 
	58, 93, 48, 57, 65, 70, 97, 102, 
	46, 58, 93, 48, 57, 65, 70, 97, 
	102, 46, 58, 93, 48, 57, 65, 70, 
	97, 102, 48, 57, 46, 48, 57, 46, 
	48, 57, 46, 58, 9, 13, 32, 33, 
	37, 39, 44, 59, 61, 88, 120, 126, 
	42, 46, 48, 57, 65, 90, 95, 122, 
	9, 13, 32, 33, 37, 39, 44, 59, 
	61, 80, 112, 126, 42, 46, 48, 57, 
	65, 90, 95, 122, 9, 13, 32, 33, 
	37, 39, 44, 59, 61, 73, 105, 126, 
	42, 46, 48, 57, 65, 90, 95, 122, 
	9, 13, 32, 33, 37, 39, 44, 59, 
	61, 82, 114, 126, 42, 46, 48, 57, 
	65, 90, 95, 122, 9, 13, 32, 33, 
	37, 39, 44, 59, 61, 69, 101, 126, 
	42, 46, 48, 57, 65, 90, 95, 122, 
	9, 13, 32, 33, 37, 39, 44, 59, 
	61, 83, 115, 126, 42, 46, 48, 57, 
	65, 90, 95, 122, 9, 13, 32, 33, 
	37, 39, 44, 59, 61, 126, 42, 46, 
	48, 57, 65, 90, 95, 122, 9, 13, 
	32, 44, 59, 61, 10, 9, 32, 9, 
	32, 44, 59, 61, 9, 13, 32, 33, 
	34, 37, 39, 91, 126, 42, 43, 45, 
	46, 48, 57, 65, 90, 95, 122, 10, 
	9, 32, 9, 13, 32, 33, 34, 37, 
	39, 91, 126, 42, 43, 45, 46, 48, 
	57, 65, 90, 95, 122, 9, 13, 32, 
	44, 59, 48, 57, 9, 13, 32, 33, 
	37, 39, 126, 42, 43, 45, 46, 48, 
	57, 65, 90, 95, 122, 9, 13, 32, 
	33, 37, 39, 60, 126, 42, 43, 45, 
	46, 48, 57, 65, 90, 95, 122, 9, 
	13, 32, 60, 0
];

_tsip_machine_parser_header_Contact_single_lengths = [
	0, 4, 2, 2, 2, 2, 2, 2, 
	3, 11, 1, 2, 11, 1, 2, 4, 
	3, 1, 0, 4, 3, 0, 1, 5, 
	5, 1, 2, 4, 9, 1, 2, 9, 
	1, 2, 3, 7, 8, 4, 1, 2, 
	4, 1, 2, 4, 0, 10, 9, 5, 
	0, 5, 9, 1, 2, 8, 10, 6, 
	1, 2, 5, 9, 1, 2, 9, 1, 
	2, 3, 4, 1, 2, 5, 0, 9, 
	1, 2, 2, 2, 2, 1, 3, 0, 
	1, 0, 1, 0, 1, 1, 1, 1, 
	1, 1, 1, 3, 3, 2, 2, 2, 
	2, 2, 0, 3, 3, 3, 0, 1, 
	1, 1, 1, 12, 12, 12, 12, 12, 
	12, 10, 6, 1, 2, 5, 9, 1, 
	2, 9, 5, 7, 8, 4, 0
];

_tsip_machine_parser_header_Contact_range_lengths = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 5, 0, 0, 5, 0, 0, 0, 
	0, 0, 2, 4, 0, 1, 1, 0, 
	0, 0, 0, 0, 6, 0, 0, 6, 
	0, 0, 0, 5, 5, 0, 0, 0, 
	2, 0, 0, 0, 3, 5, 5, 0, 
	1, 1, 5, 0, 0, 5, 4, 0, 
	0, 0, 0, 5, 0, 0, 5, 0, 
	0, 0, 2, 0, 0, 0, 3, 4, 
	3, 3, 3, 3, 0, 3, 3, 1, 
	1, 1, 1, 1, 1, 1, 0, 1, 
	0, 1, 0, 3, 3, 3, 3, 3, 
	3, 0, 3, 3, 3, 3, 1, 1, 
	1, 0, 0, 4, 4, 4, 4, 4, 
	4, 4, 0, 0, 0, 0, 5, 0, 
	0, 5, 1, 5, 5, 0, 0
];

_tsip_machine_parser_header_Contact_index_offsets = [
	0, 0, 5, 8, 11, 14, 17, 20, 
	23, 27, 44, 46, 49, 66, 68, 71, 
	76, 80, 82, 85, 94, 98, 100, 103, 
	109, 115, 117, 120, 125, 141, 143, 146, 
	162, 164, 167, 171, 184, 198, 203, 205, 
	208, 215, 217, 220, 225, 229, 245, 260, 
	266, 268, 275, 290, 292, 295, 309, 324, 
	331, 333, 336, 342, 357, 359, 362, 377, 
	379, 382, 386, 393, 395, 398, 404, 408, 
	422, 427, 433, 439, 445, 448, 453, 460, 
	462, 465, 467, 470, 472, 475, 478, 480, 
	483, 485, 488, 490, 497, 504, 510, 516, 
	522, 528, 531, 535, 542, 549, 556, 558, 
	561, 564, 566, 568, 585, 602, 619, 636, 
	653, 670, 685, 692, 694, 697, 703, 718, 
	720, 723, 738, 745, 758, 772, 777
];

_tsip_machine_parser_header_Contact_indicies = [
	0, 2, 0, 2, 1, 3, 3, 1, 
	4, 4, 1, 5, 5, 1, 6, 6, 
	1, 7, 7, 1, 2, 2, 1, 2, 
	2, 8, 1, 9, 10, 9, 11, 12, 
	11, 11, 13, 11, 14, 11, 11, 11, 
	15, 11, 15, 1, 16, 1, 17, 17, 
	1, 18, 19, 18, 11, 12, 11, 11, 
	13, 11, 14, 11, 11, 11, 15, 11, 
	15, 1, 20, 1, 21, 21, 1, 21, 
	21, 22, 23, 1, 22, 24, 22, 1, 
	25, 1, 26, 26, 1, 27, 27, 28, 
	29, 28, 28, 28, 28, 1, 27, 27, 
	29, 1, 30, 1, 31, 30, 1, 32, 
	33, 32, 34, 35, 1, 36, 37, 36, 
	38, 35, 1, 39, 1, 40, 40, 1, 
	40, 40, 38, 35, 1, 41, 42, 41, 
	11, 12, 11, 11, 14, 11, 11, 11, 
	11, 15, 11, 15, 1, 43, 1, 44, 
	44, 1, 45, 46, 45, 11, 12, 11, 
	11, 14, 11, 11, 11, 11, 15, 11, 
	15, 1, 47, 1, 48, 48, 1, 48, 
	48, 23, 1, 49, 50, 49, 51, 51, 
	51, 51, 51, 51, 51, 51, 51, 1, 
	52, 53, 52, 51, 51, 51, 54, 51, 
	51, 51, 51, 51, 51, 1, 55, 56, 
	55, 23, 1, 57, 1, 49, 49, 1, 
	58, 59, 60, 61, 58, 58, 1, 62, 
	1, 58, 58, 1, 52, 53, 52, 54, 
	1, 58, 58, 58, 1, 63, 50, 63, 
	51, 51, 51, 51, 64, 65, 51, 64, 
	64, 64, 51, 64, 1, 66, 53, 66, 
	51, 51, 51, 65, 54, 51, 51, 51, 
	51, 51, 51, 1, 67, 56, 67, 65, 
	23, 1, 68, 1, 69, 70, 69, 71, 
	72, 68, 1, 35, 73, 35, 74, 74, 
	74, 75, 75, 74, 74, 74, 74, 74, 
	74, 1, 76, 1, 77, 77, 1, 77, 
	77, 74, 74, 74, 75, 75, 74, 74, 
	74, 74, 74, 74, 1, 78, 79, 78, 
	80, 80, 80, 81, 82, 83, 80, 80, 
	80, 80, 80, 1, 84, 85, 84, 38, 
	35, 83, 1, 86, 1, 87, 87, 1, 
	87, 87, 38, 35, 83, 1, 83, 88, 
	83, 89, 90, 89, 89, 91, 89, 89, 
	89, 89, 89, 89, 1, 92, 1, 93, 
	93, 1, 93, 94, 93, 89, 90, 89, 
	89, 91, 89, 89, 89, 89, 89, 89, 
	1, 95, 1, 96, 96, 1, 96, 96, 
	90, 1, 90, 97, 98, 99, 90, 90, 
	1, 100, 1, 90, 90, 1, 101, 79, 
	101, 81, 82, 1, 90, 90, 90, 1, 
	101, 79, 101, 89, 89, 89, 81, 82, 
	89, 89, 89, 89, 89, 1, 103, 102, 
	102, 102, 1, 105, 98, 104, 104, 104, 
	1, 105, 98, 106, 106, 106, 1, 105, 
	98, 107, 107, 107, 1, 105, 98, 1, 
	109, 108, 102, 102, 1, 110, 105, 98, 
	111, 104, 104, 1, 112, 1, 113, 114, 
	1, 115, 1, 116, 117, 1, 118, 1, 
	98, 119, 1, 98, 120, 1, 98, 1, 
	116, 121, 1, 116, 1, 113, 122, 1, 
	113, 1, 110, 105, 98, 123, 106, 106, 
	1, 110, 105, 98, 107, 107, 107, 1, 
	125, 98, 124, 124, 124, 1, 127, 98, 
	126, 126, 126, 1, 127, 98, 128, 128, 
	128, 1, 127, 98, 129, 129, 129, 1, 
	127, 98, 1, 130, 124, 124, 1, 110, 
	127, 98, 131, 126, 126, 1, 110, 127, 
	98, 132, 128, 128, 1, 110, 127, 98, 
	129, 129, 129, 1, 133, 1, 110, 134, 
	1, 110, 135, 1, 110, 1, 109, 1, 
	78, 79, 78, 80, 80, 80, 81, 82, 
	83, 136, 136, 80, 80, 80, 80, 80, 
	1, 78, 79, 78, 80, 80, 80, 81, 
	82, 83, 137, 137, 80, 80, 80, 80, 
	80, 1, 78, 79, 78, 80, 80, 80, 
	81, 82, 83, 138, 138, 80, 80, 80, 
	80, 80, 1, 78, 79, 78, 80, 80, 
	80, 81, 82, 83, 139, 139, 80, 80, 
	80, 80, 80, 1, 78, 79, 78, 80, 
	80, 80, 81, 82, 83, 140, 140, 80, 
	80, 80, 80, 80, 1, 78, 79, 78, 
	80, 80, 80, 81, 82, 83, 141, 141, 
	80, 80, 80, 80, 80, 1, 142, 79, 
	142, 80, 80, 80, 81, 82, 143, 80, 
	80, 80, 80, 80, 1, 144, 145, 144, 
	38, 35, 143, 1, 146, 1, 147, 147, 
	1, 147, 147, 38, 35, 143, 1, 143, 
	148, 143, 89, 90, 89, 89, 91, 89, 
	89, 89, 149, 89, 89, 1, 150, 1, 
	151, 151, 1, 151, 94, 151, 89, 90, 
	89, 89, 91, 89, 89, 89, 149, 89, 
	89, 1, 152, 153, 152, 154, 156, 155, 
	1, 157, 24, 157, 51, 51, 51, 51, 
	51, 51, 51, 51, 51, 1, 158, 24, 
	158, 51, 51, 51, 54, 51, 51, 51, 
	51, 51, 51, 1, 159, 24, 159, 23, 
	1, 1, 0
];

_tsip_machine_parser_header_Contact_trans_targs = [
	2, 0, 8, 3, 4, 5, 6, 7, 
	9, 9, 10, 35, 40, 123, 18, 45, 
	11, 12, 12, 13, 14, 15, 16, 18, 
	17, 126, 19, 20, 19, 21, 22, 23, 
	24, 17, 28, 50, 24, 25, 28, 26, 
	27, 28, 29, 30, 31, 31, 32, 33, 
	34, 36, 38, 35, 37, 32, 18, 37, 
	32, 39, 40, 41, 43, 44, 42, 46, 
	45, 48, 47, 47, 49, 24, 17, 28, 
	50, 51, 54, 107, 52, 53, 55, 17, 
	54, 28, 50, 59, 55, 56, 57, 58, 
	60, 71, 66, 72, 61, 62, 63, 64, 
	65, 67, 69, 70, 68, 24, 73, 106, 
	74, 77, 75, 76, 78, 93, 79, 91, 
	80, 81, 89, 82, 83, 87, 84, 85, 
	86, 88, 90, 92, 94, 102, 95, 98, 
	96, 97, 99, 100, 101, 103, 104, 105, 
	108, 109, 110, 111, 112, 113, 114, 118, 
	114, 115, 116, 117, 119, 122, 120, 121, 
	24, 17, 28, 122, 50, 124, 125, 125
];

_tsip_machine_parser_header_Contact_trans_actions = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 3, 3, 17, 17, 17, 3, 17, 
	0, 0, 3, 3, 0, 0, 0, 0, 
	0, 15, 1, 0, 0, 0, 0, 7, 
	13, 13, 13, 0, 0, 0, 0, 0, 
	0, 3, 3, 0, 0, 3, 3, 0, 
	0, 0, 0, 0, 5, 5, 5, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 5, 0, 0, 20, 20, 20, 
	7, 0, 1, 1, 0, 0, 26, 26, 
	0, 26, 11, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 26, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 26, 0, 
	0, 0, 0, 0, 0, 1, 0, 0, 
	23, 23, 23, 0, 9, 0, 5, 0
];

tsip_machine_parser_header_Contact_start = 1;
tsip_machine_parser_header_Contact_first_final = 126;
tsip_machine_parser_header_Contact_error = 0;

tsip_machine_parser_header_Contact_en_main = 1;


/* line 78 "./ragel/tsip_parser_header_Contact.jrl" */

function tsip_header_Contact(){
	tsip_header.call(this, tsip_header_type_e.Contact);
    this.s_display_name = null;
    this.o_uri = null;
    this.i_expires = -1;
}

tsip_header_Contact.prototype.toString = function(){
    var s_str = tsip_uri_tostring(this.o_uri, true, true);
    if(s_str && this.i_expires >= 0){
        s_str += tsk_string_format(";expires={0}", this.i_expires);
    }
    return s_str;
}

// returns an array of 'Contact' headers
tsip_header_Contact.prototype.Parse = function(s_str){
    var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_i_tag_start;
	var hdr_contacts = new Array();
	var curr_contact = null;
	
	
/* line 393 "./src/headers/tsip_header_Contact.js" */
{
	 cs = tsip_machine_parser_header_Contact_start;
} /* JSCodeGen::writeInit */

/* line 106 "./ragel/tsip_parser_header_Contact.jrl" */
	
/* line 400 "./src/headers/tsip_header_Contact.js" */
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
	_keys = _tsip_machine_parser_header_Contact_key_offsets[cs];
	_trans = _tsip_machine_parser_header_Contact_index_offsets[cs];
	_klen = _tsip_machine_parser_header_Contact_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsip_machine_parser_header_Contact_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsip_machine_parser_header_Contact_trans_keys[_mid]) {
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
	  _klen = _tsip_machine_parser_header_Contact_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsip_machine_parser_header_Contact_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsip_machine_parser_header_Contact_trans_keys[_mid+1]) {
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
	_trans = _tsip_machine_parser_header_Contact_indicies[_trans];
	cs = _tsip_machine_parser_header_Contact_trans_targs[_trans];
	if (_tsip_machine_parser_header_Contact_trans_actions[_trans] != 0) {
		_acts = _tsip_machine_parser_header_Contact_trans_actions[_trans];
		_nacts = _tsip_machine_parser_header_Contact_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsip_machine_parser_header_Contact_actions[_acts - 1]) {
case 0:
/* line 13 "./ragel/tsip_parser_header_Contact.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 17 "./ragel/tsip_parser_header_Contact.jrl" */

		if(!curr_contact){
			curr_contact = new tsip_header_Contact();
		}
			break;
case 2:
/* line 23 "./ragel/tsip_parser_header_Contact.jrl" */

		if(curr_contact){
		    curr_contact.s_display_name = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
            curr_contact.s_display_name = tsk_string_unquote_2(curr_contact.s_display_name);
		}
			break;
case 3:
/* line 30 "./ragel/tsip_parser_header_Contact.jrl" */

		if(curr_contact && !curr_contact.o_uri){
		    var s_uri = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			if((curr_contact.o_uri = tsip_uri.prototype.Parse(s_uri)) && curr_contact.s_display_name){
				curr_contact.o_uri.s_display_name = tsk_strdup(curr_contact.s_display_name);
			}
		}
			break;
case 4:
/* line 39 "./ragel/tsip_parser_header_Contact.jrl" */

		if(curr_contact){
		    curr_contact.i_expires = tsk_ragel_parser_get_int(s_str, p, i_tag_start);
		}
			break;
case 5:
/* line 45 "./ragel/tsip_parser_header_Contact.jrl" */

		if(curr_contact){
		    tsk_ragel_add_param(s_str, p, i_tag_start, curr_contact.ao_params);
		}
			break;
case 6:
/* line 51 "./ragel/tsip_parser_header_Contact.jrl" */

		if(curr_contact){
		    hdr_contacts.push(curr_contact);
		    curr_contact = null;
		}
			break;
case 7:
/* line 58 "./ragel/tsip_parser_header_Contact.jrl" */

			break;
/* line 540 "./src/headers/tsip_header_Contact.js" */
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

/* line 107 "./ragel/tsip_parser_header_Contact.jrl" */
	
	if( cs < 
/* line 570 "./src/headers/tsip_header_Contact.js" */
126
/* line 108 "./ragel/tsip_parser_header_Contact.jrl" */
 ){
		tsk_utils_log_error("Failed to parse 'Contact' header: " + s_str);
		return null;
	}
	
	return hdr_contacts;
}
