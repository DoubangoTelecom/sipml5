/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
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

