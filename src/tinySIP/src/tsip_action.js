/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
// /!\ never use
var tsip_action_type_common_e =
{
    ACCEPT: 1000, //! Accept incoming call (INVITE) or message (SIP MESSAGE)
	CANCEL: 1001, //! Cancel an outgoing request
	HANGUP: 1002, //! Hangup any SIP dialog (BYE, unREGISTER, unSUBSCRIBE ...). If the dialog is in early state, then it will be canceled
    REJECT: 1002, //! Reject incoming call (INVITE) or message (SIP MESSAGE)
    SHUTDOWN: 1003 //! Shutdown a SIP dialog. Should only be called by the stack
}; 

var tsip_action_type_e =
{
    NONE: -1,
    
    CONFIG: 0,
    DTMF_SEND: 1,
    MUTE: 2,

    /* === REGISTER == */
    REGISTER: 10, /**< Sends SIP REGISTER request */
    UNREGISTER: tsip_action_type_common_e.HANGUP, //! UnRegister by sending SIP REGISTER request with expires value equals to zero

    /* === SUBSCRIBE === */
    SUBSCRIBE: 20, /**< Sends SIP SUBSCRIBE request */
    UNSUBSCRIBE: tsip_action_type_common_e.HANGUP, //! Unsubsribe by sending SIP SUBSCRIBE request with expires value equals to zero

    /* === MESSAGE === */
    MESSAGE: 30, /**< Sends SIP MESSAGE request */

    /* === INFO === */
    INFO: 40,  /**< Sends SIP INFO request */

    /* === PUBLISH === */
    PUBLISH: 50, /**< Sends SIP PUBLISH request */
    UNPUBLISH: tsip_action_type_common_e.HANGUP,//! Unpublish by sending SIP PUBLISH request with expires value equals to zero

    /* === OPTIONS === */
    OPTIONS: 60, /**< Sends SIP OPTIONS request */

    /* === INVITE === */
    INVITE: 70, /**< Sends SIP INVITE/reINVITE request */
	HOLD: 71, /**< Puts the session on hold state */
	RESUME: 72, /**< Resumes a previously held session */
	ECT: 73, /**< Transfer the call */
	ECT_ACCEPT: 74, /**< Accept call transfer request */
	ECT_REJECT: 75, /**< Reject call transfer request */
	ECT_NOTIFY: 76, /**< Intra-Dialog notify. Never called by the end-user */
	LARGE_MESSAGE: 77, /**< Large message (MSRP). The session must be connected */


    /* === COMMON == */
    ACCEPT: tsip_action_type_common_e.ACCEPT,
    CANCEL: tsip_action_type_common_e.CANCEL,
    HANGUP: tsip_action_type_common_e.HANGUP,
    REJECT: tsip_action_type_common_e.REJECT,
    SHUTDOWN: tsip_action_type_common_e.SHUTDOWN
};

function tsip_action(e_type) {
    this.e_type = e_type;
    this.ao_headers = new Array();
    this.o_content = null;

    this.line_resp = {};
    this.line_resp.i_code = 0;
    this.line_resp.s_phrase = null;

    this.media = {};
    this.media.e_type = tmedia_type_e.NONE;
    this.media.ao_params = new Array();

    this.dtmf = {};
    this.dtmf.i_volume = -1;
    this.dtmf.i_event = -1;

    this.ect = {};
    this.ect.s_to = null;

    this.mute = {};
    this.mute.b_muted = false;
    this.mute.s_media = null;
}

tsip_action.prototype.set_line_resp = function (i_code, s_phrase) {
    this.line_resp.i_code = i_code;
    this.line_resp.s_phrase = s_phrase;
}

tsip_action.prototype.set_content = function (o_content) {
    this.o_content = o_content;
}

tsip_action.prototype.get_content = function () {
    return this.o_content;
}

// add_headers(...)
tsip_action.prototype.add_headers = function () {
    for (var i = 0; i < arguments.length; ++i) {
        if (arguments[i]) {
            this.ao_headers.push(arguments[i]);
        }
    }
}