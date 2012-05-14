/*
* Copyright (C) 2012 Doubango Telecom <http://www.doubango.org>
*
* Contact: Mamadou Diop <diopmamadou(at)doubango[dot]org>
*	
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*
* sipML5 is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as publishd by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*	
* sipML5 is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*	
* You should have received a copy of the GNU General Public License
* along with sipML5.
*/
var tmedia_qos_status_e =
{
    CURR: 0,
    DEST: 1,
    CONF: 3
};

var tmedia_qos_ptype_e =
{
    QOS: 0
};

var tmedia_qos_stype_e =
{
    NONE: 0,
    SEGMENTED: 1,
    E2E: 2
};

var tmedia_qos_strength_e =
{
    NONE: 0,
    FAILURE: 1,
    UNKNOWN: 2,
    OPTIONAL: 3,
    MANDATORY: 4
};

var tmedia_qos_direction_e =
{
    NONE: 0x00,
    SEND: (0x01 << 1),
    RECV: (0x01 << 2),
    SEND_RECV: (0x01 << 1) | (0x01 << 2)// (SEND | RECV)
};

