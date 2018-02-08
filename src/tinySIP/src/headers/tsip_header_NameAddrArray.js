
/* line 1 "./ragel/tsip_parser_header_NameAddrArray.jrl" */
/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/

// Parse headers: 'P-Asserted-Identity', 'P-Associated-URI', 'P-Preferred-Identity', 'Path', 'Record-Route', 'Route', 'Service-Route'

tsip_header_P_Asserted_Identity.prototype = Object.create(tsip_header_NameAddr.prototype);
tsip_header_P_Associated_URI.prototype = Object.create(tsip_header_NameAddr.prototype);
tsip_header_P_Preferred_Identity.prototype = Object.create(tsip_header_NameAddr.prototype);
tsip_header_Path.prototype = Object.create(tsip_header_NameAddr.prototype);
tsip_header_Record_Route.prototype = Object.create(tsip_header_NameAddr.prototype);
tsip_header_Route.prototype = Object.create(tsip_header_NameAddr.prototype);
tsip_header_Service_Route.prototype = Object.create(tsip_header_NameAddr.prototype);

function tsip_header_P_Asserted_Identity(o_uri){ tsip_header_NameAddr.call(this, tsip_header_type_e.P_Asserted_Identity, o_uri); }
function tsip_header_P_Associated_URI(o_uri){ tsip_header_NameAddr.call(this, tsip_header_type_e.P_Associated_URI, o_uri); }
function tsip_header_P_Preferred_Identity(o_uri){ tsip_header_NameAddr.call(this, tsip_header_type_e.P_Preferred_Identity, o_uri); }
function tsip_header_Path(o_uri){ tsip_header_NameAddr.call(this, tsip_header_type_e.Path, o_uri); }
function tsip_header_Record_Route(o_uri){ tsip_header_NameAddr.call(this, tsip_header_type_e.Record_Route, o_uri); }
function tsip_header_Route(o_uri){ tsip_header_NameAddr.call(this, tsip_header_type_e.Route, o_uri); }
function tsip_header_Service_Route(o_uri){ tsip_header_NameAddr.call(this, tsip_header_type_e.Service_Route, o_uri); }


/* line 100 "./ragel/tsip_parser_header_NameAddrArray.jrl" */



/* line 33 "./src/headers/tsip_header_NameAddrArray.js" */
_tsip_machine_parser_header_NameAddrArray_actions = [
	0, 1, 0, 1, 1, 1, 2, 1, 
	3, 1, 4, 1, 5, 1, 6, 1, 
	7, 1, 8, 1, 9, 1, 10, 1, 
	11, 1, 12, 1, 13, 2, 1, 0, 
	2, 3, 5
];

_tsip_machine_parser_header_NameAddrArray_key_offsets = [
	0, 0, 6, 9, 13, 15, 17, 21, 
	23, 25, 27, 29, 30, 32, 34, 36, 
	38, 40, 42, 44, 46, 49, 52, 73, 
	74, 76, 97, 98, 100, 103, 107, 119, 
	122, 124, 127, 132, 137, 138, 140, 144, 
	161, 162, 164, 180, 198, 204, 205, 207, 
	212, 231, 232, 234, 253, 254, 256, 259, 
	267, 268, 270, 275, 276, 282, 299, 306, 
	314, 322, 330, 332, 339, 348, 350, 353, 
	355, 358, 360, 363, 366, 367, 370, 371, 
	374, 375, 384, 393, 401, 409, 417, 425, 
	427, 433, 442, 451, 460, 462, 465, 468, 
	469, 470, 487, 505, 509, 510, 512, 520, 
	521, 523, 527, 533, 553, 572, 577, 579, 
	586, 588, 590, 592, 594, 596, 598, 599, 
	601, 603, 605, 608, 610, 612, 614, 616, 
	618, 620, 622, 624, 625, 627, 629, 631, 
	633, 635, 637, 639, 641, 644, 646, 648, 
	651, 655, 657, 659, 661, 663, 664, 666, 
	668, 670, 672, 674, 677, 679, 681, 683, 
	686, 688, 690, 692, 694, 696, 698, 699, 
	701, 703, 705, 707, 709, 712
];

_tsip_machine_parser_header_NameAddrArray_trans_keys = [
	80, 82, 83, 112, 114, 115, 45, 65, 
	97, 65, 80, 97, 112, 83, 115, 83, 
	115, 69, 79, 101, 111, 82, 114, 84, 
	116, 69, 101, 68, 100, 45, 73, 105, 
	68, 100, 69, 101, 78, 110, 84, 116, 
	73, 105, 84, 116, 89, 121, 9, 32, 
	58, 9, 32, 58, 9, 13, 32, 33, 
	34, 37, 39, 60, 126, 42, 43, 45, 
	46, 48, 57, 65, 90, 95, 96, 97, 
	122, 10, 9, 32, 9, 13, 32, 33, 
	34, 37, 39, 60, 126, 42, 43, 45, 
	46, 48, 57, 65, 90, 95, 96, 97, 
	122, 10, 9, 32, 9, 32, 60, 65, 
	90, 97, 122, 9, 32, 43, 58, 45, 
	46, 48, 57, 65, 90, 97, 122, 9, 
	32, 58, 0, 65535, 62, 0, 65535, 9, 
	13, 32, 44, 59, 9, 13, 32, 44, 
	59, 10, 9, 32, 9, 32, 44, 59, 
	9, 13, 32, 33, 37, 39, 126, 42, 
	43, 45, 46, 48, 57, 65, 90, 95, 
	122, 10, 9, 32, 9, 32, 33, 37, 
	39, 126, 42, 43, 45, 46, 48, 57, 
	65, 90, 95, 122, 9, 13, 32, 33, 
	37, 39, 44, 59, 61, 126, 42, 46, 
	48, 57, 65, 90, 95, 122, 9, 13, 
	32, 44, 59, 61, 10, 9, 32, 9, 
	32, 44, 59, 61, 9, 13, 32, 33, 
	34, 37, 39, 91, 126, 42, 43, 45, 
	46, 48, 57, 65, 90, 95, 122, 10, 
	9, 32, 9, 13, 32, 33, 34, 37, 
	39, 91, 126, 42, 43, 45, 46, 48, 
	57, 65, 90, 95, 122, 10, 9, 32, 
	9, 32, 34, 9, 13, 34, 92, 32, 
	126, 128, 255, 10, 9, 32, 9, 13, 
	32, 44, 59, 10, 0, 9, 11, 12, 
	14, 127, 9, 13, 32, 33, 37, 39, 
	44, 59, 126, 42, 46, 48, 57, 65, 
	90, 95, 122, 58, 48, 57, 65, 70, 
	97, 102, 58, 93, 48, 57, 65, 70, 
	97, 102, 58, 93, 48, 57, 65, 70, 
	97, 102, 58, 93, 48, 57, 65, 70, 
	97, 102, 58, 93, 58, 48, 57, 65, 
	70, 97, 102, 46, 58, 93, 48, 57, 
	65, 70, 97, 102, 48, 57, 46, 48, 
	57, 48, 57, 46, 48, 57, 48, 57, 
	93, 48, 57, 93, 48, 57, 93, 46, 
	48, 57, 46, 46, 48, 57, 46, 46, 
	58, 93, 48, 57, 65, 70, 97, 102, 
	46, 58, 93, 48, 57, 65, 70, 97, 
	102, 58, 93, 48, 57, 65, 70, 97, 
	102, 58, 93, 48, 57, 65, 70, 97, 
	102, 58, 93, 48, 57, 65, 70, 97, 
	102, 58, 93, 48, 57, 65, 70, 97, 
	102, 58, 93, 48, 57, 65, 70, 97, 
	102, 46, 58, 93, 48, 57, 65, 70, 
	97, 102, 46, 58, 93, 48, 57, 65, 
	70, 97, 102, 46, 58, 93, 48, 57, 
	65, 70, 97, 102, 48, 57, 46, 48, 
	57, 46, 48, 57, 46, 58, 9, 13, 
	32, 33, 37, 39, 126, 42, 43, 45, 
	46, 48, 57, 65, 90, 95, 122, 9, 
	13, 32, 33, 37, 39, 60, 126, 42, 
	43, 45, 46, 48, 57, 65, 90, 95, 
	122, 9, 13, 32, 60, 10, 9, 32, 
	9, 13, 34, 92, 32, 126, 128, 255, 
	10, 9, 32, 9, 13, 32, 60, 0, 
	9, 11, 12, 14, 127, 9, 13, 32, 
	33, 37, 39, 42, 43, 58, 126, 45, 
	46, 48, 57, 65, 90, 95, 96, 97, 
	122, 9, 13, 32, 33, 37, 39, 58, 
	60, 126, 42, 43, 45, 46, 48, 57, 
	65, 90, 95, 122, 9, 13, 32, 58, 
	60, 0, 65535, 9, 13, 32, 44, 59, 
	0, 65535, 67, 99, 73, 105, 65, 97, 
	84, 116, 69, 101, 68, 100, 45, 85, 
	117, 82, 114, 73, 105, 9, 32, 58, 
	82, 114, 69, 101, 70, 102, 69, 101, 
	82, 114, 82, 114, 69, 101, 68, 100, 
	45, 73, 105, 68, 100, 69, 101, 78, 
	110, 84, 116, 73, 105, 84, 116, 89, 
	121, 9, 32, 58, 84, 116, 72, 104, 
	9, 32, 58, 69, 79, 101, 111, 67, 
	99, 79, 111, 82, 114, 68, 100, 45, 
	82, 114, 79, 111, 85, 117, 84, 116, 
	69, 101, 9, 32, 58, 85, 117, 84, 
	116, 69, 101, 9, 32, 58, 69, 101, 
	82, 114, 86, 118, 73, 105, 67, 99, 
	69, 101, 45, 82, 114, 79, 111, 85, 
	117, 84, 116, 69, 101, 9, 32, 58, 
	0
];

_tsip_machine_parser_header_NameAddrArray_single_lengths = [
	0, 6, 3, 4, 2, 2, 4, 2, 
	2, 2, 2, 1, 2, 2, 2, 2, 
	2, 2, 2, 2, 3, 3, 9, 1, 
	2, 9, 1, 2, 3, 0, 4, 3, 
	0, 1, 5, 5, 1, 2, 4, 7, 
	1, 2, 6, 10, 6, 1, 2, 5, 
	9, 1, 2, 9, 1, 2, 3, 4, 
	1, 2, 5, 1, 0, 9, 1, 2, 
	2, 2, 2, 1, 3, 0, 1, 0, 
	1, 0, 1, 1, 1, 1, 1, 1, 
	1, 3, 3, 2, 2, 2, 2, 2, 
	0, 3, 3, 3, 0, 1, 1, 1, 
	1, 7, 8, 4, 1, 2, 4, 1, 
	2, 4, 0, 10, 9, 5, 0, 5, 
	2, 2, 2, 2, 2, 2, 1, 2, 
	2, 2, 3, 2, 2, 2, 2, 2, 
	2, 2, 2, 1, 2, 2, 2, 2, 
	2, 2, 2, 2, 3, 2, 2, 3, 
	4, 2, 2, 2, 2, 1, 2, 2, 
	2, 2, 2, 3, 2, 2, 2, 3, 
	2, 2, 2, 2, 2, 2, 1, 2, 
	2, 2, 2, 2, 3, 0
];

_tsip_machine_parser_header_NameAddrArray_range_lengths = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 6, 0, 
	0, 6, 0, 0, 0, 2, 4, 0, 
	1, 1, 0, 0, 0, 0, 0, 5, 
	0, 0, 5, 4, 0, 0, 0, 0, 
	5, 0, 0, 5, 0, 0, 0, 2, 
	0, 0, 0, 0, 3, 4, 3, 3, 
	3, 3, 0, 3, 3, 1, 1, 1, 
	1, 1, 1, 1, 0, 1, 0, 1, 
	0, 3, 3, 3, 3, 3, 3, 0, 
	3, 3, 3, 3, 1, 1, 1, 0, 
	0, 5, 5, 0, 0, 0, 2, 0, 
	0, 0, 3, 5, 5, 0, 1, 1, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0
];

_tsip_machine_parser_header_NameAddrArray_index_offsets = [
	0, 0, 7, 11, 16, 19, 22, 27, 
	30, 33, 36, 39, 41, 44, 47, 50, 
	53, 56, 59, 62, 65, 69, 73, 89, 
	91, 94, 110, 112, 115, 119, 122, 131, 
	135, 137, 140, 146, 152, 154, 157, 162, 
	175, 177, 180, 192, 207, 214, 216, 219, 
	225, 240, 242, 245, 260, 262, 265, 269, 
	276, 278, 281, 287, 289, 293, 307, 312, 
	318, 324, 330, 333, 338, 345, 347, 350, 
	352, 355, 357, 360, 363, 365, 368, 370, 
	373, 375, 382, 389, 395, 401, 407, 413, 
	416, 420, 427, 434, 441, 443, 446, 449, 
	451, 453, 466, 480, 485, 487, 490, 497, 
	499, 502, 507, 511, 527, 542, 548, 550, 
	557, 560, 563, 566, 569, 572, 575, 577, 
	580, 583, 586, 590, 593, 596, 599, 602, 
	605, 608, 611, 614, 616, 619, 622, 625, 
	628, 631, 634, 637, 640, 644, 647, 650, 
	654, 659, 662, 665, 668, 671, 673, 676, 
	679, 682, 685, 688, 692, 695, 698, 701, 
	705, 708, 711, 714, 717, 720, 723, 725, 
	728, 731, 734, 737, 740, 744
];

_tsip_machine_parser_header_NameAddrArray_indicies = [
	0, 2, 3, 0, 2, 3, 1, 4, 
	5, 5, 1, 6, 7, 6, 7, 1, 
	8, 8, 1, 9, 9, 1, 10, 11, 
	10, 11, 1, 12, 12, 1, 13, 13, 
	1, 14, 14, 1, 15, 15, 1, 16, 
	1, 17, 17, 1, 18, 18, 1, 19, 
	19, 1, 20, 20, 1, 21, 21, 1, 
	22, 22, 1, 23, 23, 1, 24, 24, 
	1, 25, 25, 26, 1, 27, 27, 28, 
	1, 29, 30, 29, 31, 32, 31, 31, 
	33, 31, 31, 31, 31, 34, 31, 34, 
	1, 35, 1, 36, 36, 1, 37, 38, 
	37, 31, 32, 31, 31, 33, 31, 31, 
	31, 31, 34, 31, 34, 1, 39, 1, 
	40, 40, 1, 40, 40, 41, 1, 42, 
	42, 1, 43, 43, 44, 45, 44, 44, 
	44, 44, 1, 43, 43, 45, 1, 46, 
	1, 47, 46, 1, 48, 49, 48, 50, 
	51, 1, 52, 53, 52, 28, 54, 1, 
	55, 1, 56, 56, 1, 56, 56, 28, 
	54, 1, 54, 57, 54, 58, 58, 58, 
	58, 58, 58, 58, 58, 58, 1, 59, 
	1, 60, 60, 1, 60, 60, 58, 58, 
	58, 58, 58, 58, 58, 58, 58, 1, 
	61, 62, 61, 63, 63, 63, 64, 65, 
	66, 63, 63, 63, 63, 63, 1, 67, 
	68, 67, 28, 54, 66, 1, 69, 1, 
	70, 70, 1, 70, 70, 28, 54, 66, 
	1, 66, 71, 66, 72, 73, 72, 72, 
	74, 72, 72, 72, 72, 72, 72, 1, 
	75, 1, 76, 76, 1, 76, 77, 76, 
	72, 73, 72, 72, 74, 72, 72, 72, 
	72, 72, 72, 1, 78, 1, 79, 79, 
	1, 79, 79, 73, 1, 73, 80, 81, 
	82, 73, 73, 1, 83, 1, 73, 73, 
	1, 84, 62, 84, 64, 65, 1, 85, 
	1, 73, 73, 73, 1, 84, 62, 84, 
	72, 72, 72, 64, 65, 72, 72, 72, 
	72, 72, 1, 87, 86, 86, 86, 1, 
	89, 81, 88, 88, 88, 1, 89, 81, 
	90, 90, 90, 1, 89, 81, 91, 91, 
	91, 1, 89, 81, 1, 93, 92, 86, 
	86, 1, 94, 89, 81, 95, 88, 88, 
	1, 96, 1, 97, 98, 1, 99, 1, 
	100, 101, 1, 102, 1, 81, 103, 1, 
	81, 104, 1, 81, 1, 100, 105, 1, 
	100, 1, 97, 106, 1, 97, 1, 94, 
	89, 81, 107, 90, 90, 1, 94, 89, 
	81, 91, 91, 91, 1, 109, 81, 108, 
	108, 108, 1, 111, 81, 110, 110, 110, 
	1, 111, 81, 112, 112, 112, 1, 111, 
	81, 113, 113, 113, 1, 111, 81, 1, 
	114, 108, 108, 1, 94, 111, 81, 115, 
	110, 110, 1, 94, 111, 81, 116, 112, 
	112, 1, 94, 111, 81, 113, 113, 113, 
	1, 117, 1, 94, 118, 1, 94, 119, 
	1, 94, 1, 93, 1, 120, 121, 120, 
	122, 122, 122, 122, 122, 122, 122, 122, 
	122, 1, 123, 124, 123, 122, 122, 122, 
	125, 122, 122, 122, 122, 122, 122, 1, 
	126, 127, 126, 41, 1, 128, 1, 120, 
	120, 1, 129, 130, 131, 132, 129, 129, 
	1, 133, 1, 129, 129, 1, 123, 124, 
	123, 125, 1, 129, 129, 129, 1, 134, 
	121, 134, 122, 122, 122, 122, 135, 136, 
	122, 135, 135, 135, 122, 135, 1, 137, 
	124, 137, 122, 122, 122, 136, 125, 122, 
	122, 122, 122, 122, 122, 1, 138, 127, 
	138, 136, 41, 1, 139, 1, 140, 141, 
	140, 142, 143, 139, 1, 144, 144, 1, 
	145, 145, 1, 146, 146, 1, 147, 147, 
	1, 148, 148, 1, 149, 149, 1, 150, 
	1, 151, 151, 1, 152, 152, 1, 153, 
	153, 1, 154, 154, 155, 1, 156, 156, 
	1, 157, 157, 1, 158, 158, 1, 159, 
	159, 1, 160, 160, 1, 161, 161, 1, 
	162, 162, 1, 163, 163, 1, 164, 1, 
	165, 165, 1, 166, 166, 1, 167, 167, 
	1, 168, 168, 1, 169, 169, 1, 170, 
	170, 1, 171, 171, 1, 172, 172, 1, 
	173, 173, 174, 1, 175, 175, 1, 176, 
	176, 1, 177, 177, 178, 1, 179, 180, 
	179, 180, 1, 181, 181, 1, 182, 182, 
	1, 183, 183, 1, 184, 184, 1, 185, 
	1, 186, 186, 1, 187, 187, 1, 188, 
	188, 1, 189, 189, 1, 190, 190, 1, 
	191, 191, 192, 1, 193, 193, 1, 194, 
	194, 1, 195, 195, 1, 196, 196, 197, 
	1, 198, 198, 1, 199, 199, 1, 200, 
	200, 1, 201, 201, 1, 202, 202, 1, 
	203, 203, 1, 204, 1, 205, 205, 1, 
	206, 206, 1, 207, 207, 1, 208, 208, 
	1, 209, 209, 1, 210, 210, 211, 1, 
	1, 0
];

_tsip_machine_parser_header_NameAddrArray_trans_targs = [
	2, 0, 144, 160, 3, 141, 4, 123, 
	5, 6, 7, 112, 8, 9, 10, 11, 
	12, 13, 14, 15, 16, 17, 18, 19, 
	20, 21, 22, 21, 22, 22, 23, 97, 
	102, 29, 107, 24, 25, 25, 26, 27, 
	28, 29, 30, 31, 30, 32, 33, 34, 
	35, 59, 22, 39, 35, 36, 39, 37, 
	38, 40, 43, 41, 42, 44, 59, 43, 
	22, 39, 48, 44, 45, 46, 47, 49, 
	61, 55, 62, 50, 51, 52, 53, 54, 
	56, 58, 60, 57, 35, 173, 63, 96, 
	64, 67, 65, 66, 68, 83, 69, 81, 
	70, 71, 79, 72, 73, 77, 74, 75, 
	76, 78, 80, 82, 84, 92, 85, 88, 
	86, 87, 89, 90, 91, 93, 94, 95, 
	98, 100, 97, 99, 26, 29, 99, 26, 
	101, 102, 103, 105, 106, 104, 108, 107, 
	110, 109, 109, 111, 35, 59, 22, 39, 
	113, 114, 115, 116, 117, 118, 119, 120, 
	121, 122, 21, 22, 124, 125, 126, 127, 
	128, 129, 130, 131, 132, 133, 134, 135, 
	136, 137, 138, 139, 140, 21, 22, 142, 
	143, 21, 22, 145, 156, 146, 147, 148, 
	149, 150, 151, 152, 153, 154, 155, 21, 
	22, 157, 158, 159, 21, 22, 161, 162, 
	163, 164, 165, 166, 167, 168, 169, 170, 
	171, 172, 21, 22
];

_tsip_machine_parser_header_NameAddrArray_trans_actions = [
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 13, 13, 0, 0, 3, 3, 29, 
	29, 3, 29, 0, 0, 3, 3, 0, 
	0, 0, 1, 0, 0, 0, 0, 7, 
	11, 11, 11, 11, 0, 0, 0, 0, 
	0, 0, 1, 0, 0, 9, 9, 0, 
	9, 9, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 9, 27, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 5, 5, 5, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 5, 0, 0, 32, 32, 32, 32, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 15, 15, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 17, 17, 0, 
	0, 19, 19, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 21, 
	21, 0, 0, 0, 23, 23, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 25, 25
];

tsip_machine_parser_header_NameAddrArray_start = 1;
tsip_machine_parser_header_NameAddrArray_first_final = 173;
tsip_machine_parser_header_NameAddrArray_error = 0;

tsip_machine_parser_header_NameAddrArray_en_main = 1;


/* line 103 "./ragel/tsip_parser_header_NameAddrArray.jrl" */

tsip_header_P_Asserted_Identity.prototype.Parse =
tsip_header_P_Associated_URI.prototype.Parse =
tsip_header_P_Preferred_Identity.prototype.Parse =
tsip_header_Path.prototype.Parse =
tsip_header_Record_Route.prototype.Parse =
tsip_header_Route.prototype.Parse =
tsip_header_Service_Route.prototype.Parse =
function(s_str){
    var cs = 0;
	var p = 0;
	var pe = s_str.length;
	var eof = pe;
	var data = tsk_buff_str2ib(s_str);
	var i_tag_start;
	var ao_hdrs = new Array();
	var o_curr_hdr = null;
	var t_curr_class = null;
	
	
/* line 420 "./src/headers/tsip_header_NameAddrArray.js" */
{
	 cs = tsip_machine_parser_header_NameAddrArray_start;
} /* JSCodeGen::writeInit */

/* line 123 "./ragel/tsip_parser_header_NameAddrArray.jrl" */
	
/* line 427 "./src/headers/tsip_header_NameAddrArray.js" */
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
	_keys = _tsip_machine_parser_header_NameAddrArray_key_offsets[cs];
	_trans = _tsip_machine_parser_header_NameAddrArray_index_offsets[cs];
	_klen = _tsip_machine_parser_header_NameAddrArray_single_lengths[cs];
	_break_match = false;
	
	do {
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + _klen - 1;

	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + ( (_upper - _lower) >> 1 );

	        if (data[p] < _tsip_machine_parser_header_NameAddrArray_trans_keys[_mid]) {
	           _upper = _mid - 1;
	        } else if (data[p] > _tsip_machine_parser_header_NameAddrArray_trans_keys[_mid]) {
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
	  _klen = _tsip_machine_parser_header_NameAddrArray_range_lengths[cs];
	  if (_klen > 0) {
	     _lower = _keys;
	     _upper = _keys + (_klen << 1) - 2;
	     while (true) {
	        if (_upper < _lower) { break; }
	        _mid = _lower + (((_upper-_lower) >> 1) & ~1);
	        if (data[p] < _tsip_machine_parser_header_NameAddrArray_trans_keys[_mid]) {
	          _upper = _mid - 2;
	         } else if (data[p] > _tsip_machine_parser_header_NameAddrArray_trans_keys[_mid+1]) {
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
	_trans = _tsip_machine_parser_header_NameAddrArray_indicies[_trans];
	cs = _tsip_machine_parser_header_NameAddrArray_trans_targs[_trans];
	if (_tsip_machine_parser_header_NameAddrArray_trans_actions[_trans] != 0) {
		_acts = _tsip_machine_parser_header_NameAddrArray_trans_actions[_trans];
		_nacts = _tsip_machine_parser_header_NameAddrArray_actions[_acts];
		_acts += 1;
		while (_nacts > 0) {
			_nacts -= 1;
			_acts += 1;
			switch (_tsip_machine_parser_header_NameAddrArray_actions[_acts - 1]) {
case 0:
/* line 31 "./ragel/tsip_parser_header_NameAddrArray.jrl" */

		i_tag_start = p;
			break;
case 1:
/* line 35 "./ragel/tsip_parser_header_NameAddrArray.jrl" */

		if(!o_curr_hdr){
			o_curr_hdr = new t_curr_class();
		}
			break;
case 2:
/* line 41 "./ragel/tsip_parser_header_NameAddrArray.jrl" */

	    if(o_curr_hdr){			
			o_curr_hdr.s_display_name = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
            o_curr_hdr.s_display_name = tsk_string_unquote_2(o_curr_hdr.s_display_name);
		}
			break;
case 3:
/* line 48 "./ragel/tsip_parser_header_NameAddrArray.jrl" */

		if(o_curr_hdr && !o_curr_hdr.o_uri){
		    var s_uri = tsk_ragel_parser_get_string(s_str, p, i_tag_start);
			if((o_curr_hdr.o_uri = tsip_uri.prototype.Parse(s_uri)) && o_curr_hdr.s_display_name){
				o_curr_hdr.o_uri.s_display_name = tsk_strdup(o_curr_hdr.s_display_name);
			}
		}
			break;
case 4:
/* line 57 "./ragel/tsip_parser_header_NameAddrArray.jrl" */

		if(o_curr_hdr){
			tsk_ragel_add_param(s_str, p, i_tag_start, o_curr_hdr.ao_params);
		}
			break;
case 5:
/* line 63 "./ragel/tsip_parser_header_NameAddrArray.jrl" */

		if(o_curr_hdr){
	        ao_hdrs.push(o_curr_hdr);
	        o_curr_hdr = null;
	    }
			break;
case 6:
/* line 70 "./ragel/tsip_parser_header_NameAddrArray.jrl" */
 t_curr_class = tsip_header_P_Asserted_Identity; 		break;
case 7:
/* line 71 "./ragel/tsip_parser_header_NameAddrArray.jrl" */
 t_curr_class = tsip_header_P_Associated_URI; 		break;
case 8:
/* line 72 "./ragel/tsip_parser_header_NameAddrArray.jrl" */
 t_curr_class = tsip_header_P_Preferred_Identity; 		break;
case 9:
/* line 73 "./ragel/tsip_parser_header_NameAddrArray.jrl" */
 t_curr_class = tsip_header_Path; 		break;
case 10:
/* line 74 "./ragel/tsip_parser_header_NameAddrArray.jrl" */
 t_curr_class = tsip_header_Record_Route; 		break;
case 11:
/* line 75 "./ragel/tsip_parser_header_NameAddrArray.jrl" */
 t_curr_class = tsip_header_Route; 		break;
case 12:
/* line 76 "./ragel/tsip_parser_header_NameAddrArray.jrl" */
 t_curr_class = tsip_header_Service_Route; 		break;
case 13:
/* line 78 "./ragel/tsip_parser_header_NameAddrArray.jrl" */
 		break;
/* line 580 "./src/headers/tsip_header_NameAddrArray.js" */
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

/* line 124 "./ragel/tsip_parser_header_NameAddrArray.jrl" */
	
	if( cs < 
/* line 610 "./src/headers/tsip_header_NameAddrArray.js" */
173
/* line 125 "./ragel/tsip_parser_header_NameAddrArray.jrl" */
 ){
		tsk_utils_log_error("Failed to parse header: " + s_str);
		return null;
	}
	
	return ao_hdrs;
}