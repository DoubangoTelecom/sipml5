/*
* Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
* License: BSD
* This file is part of Open Source sipML5 solution <http://www.sipml5.org>
*/
var tsip_header_type_e =
{
    Accept: { i_id: 0, s_name: "Accept" },
    Accept_Contact: { i_id: 1, s_name: "Accept-Contact" },
    Accept_Encoding: { i_id: 2, s_name: "Accept-Encoding" },
    Accept_Language: { i_id: 3, s_name: "Accept-Language" },
    Accept_Resource_Priority: { i_id: 4, s_name: "Accept-Resource-Priority" },
    Alert_Info: { i_id: 5, s_name: "Alert-Info" },
    Allow: { i_id: 6, s_name: "Allow" },
    Allow_Events: { i_id: 7, s_name: "Allow-Events" },
    Authentication_Info: { i_id: 8, s_name: "Authentication-Info" },
    Authorization: { i_id: 9, s_name: "Authorization" },
    Call_ID: { i_id: 10, s_name: "Call-ID" },
    Call_Info: { i_id: 11, s_name: "Call-Info" },
    Contact: { i_id: 12, s_name: "Contact" },
    Content_Disposition: { i_id: 13, s_name: "Content-Disposition" },
    Content_Encoding: { i_id: 14, s_name: "Content-Encoding" },
    Content_Language: { i_id: 15, s_name: "Content-Language" },
    Content_Length: { i_id: 16, s_name: "Content-Length" },
    Content_Type: { i_id: 17, s_name: "Content-Type" },
    CSeq: { i_id: 18, s_name: "CSeq" },
    Date: { i_id: 19, s_name: "Date" },
    Dummy: { i_id: 20, s_name: null },
    Error_Info: { i_id: 21, s_name: "Error-Info" },
    Event: { i_id: 22, s_name: "Event" },
    Expires: { i_id: 23, s_name: "Expires" },
    From: { i_id: 24, s_name: "From" },
    History_Info: { i_id: 25, s_name: "History-Info" },
    Identity: { i_id: 26, s_name: "Identity" },
    Identity_Info: { i_id: 27, s_name: "Identity-Info" },
    In_Reply_To: { i_id: 28, s_name: "In-Reply-To" },
    Join: { i_id: 29, s_name: "Join" },
    Max_Forwards: { i_id: 30, s_name: "Max-Forwards" },
    MIME_Version: { i_id: 31, s_name: "MIME-Version" },
    Min_Expires: { i_id: 32, s_name: "Min-Expires" },
    Min_SE: { i_id: 33, s_name: "Min-SE" },
    Organization: { i_id: 34, s_name: "Organization" },
    Path: { i_id: 35, s_name: "Path" },
    Priority: { i_id: 36, s_name: "Priority" },
    Privacy: { i_id: 37, s_name: "Privacy" },
    Proxy_Authenticate: { i_id: 38, s_name: "Proxy-Authenticate" },
    Proxy_Authorization: { i_id: 39, s_name: "Proxy-Authorization" },
    Proxy_Require: { i_id: 40, s_name: "Proxy-Require" },
    RAck: { i_id: 41, s_name: "RAck" },
    Reason: { i_id: 42, s_name: "Reason" },
    Record_Route: { i_id: 43, s_name: "Record-Route" },
    Refer_Sub: { i_id: 44, s_name: "Refer-Sub" },
    Refer_To: { i_id: 45, s_name: "Refer-To" },
    Referred_By: { i_id: 46, s_name: "Referred-By" },
    Reject_Contact: { i_id: 47, s_name: "Reject-Contact" },
    Replaces: { i_id: 48, s_name: "Replaces" },
    Reply_To: { i_id: 49, s_name: "Reply-To" },
    Request_Disposition: { i_id: 50, s_name: "Request-Disposition" },
    Require: { i_id: 51, s_name: "Require" },
    Resource_Priority: { i_id: 52, s_name: "Resource-Priority" },
    Retry_After: { i_id: 53, s_name: "Retry-After" },
    Route: { i_id: 54, s_name: "Route" },
    RSeq: { i_id: 55, s_name: "RSeq" },
    Security_Client: { i_id: 56, s_name: "Security-Client" },
    Security_Server: { i_id: 57, s_name: "Security-Server" },
    Security_Verify: { i_id: 58, s_name: "Security-Verify" },
    Server: { i_id: 59, s_name: "Server" },
    Service_Route: { i_id: 60, s_name: "Service-Route" },
    Session_Expires: { i_id: 61, s_name: "Session-Expires" },
    SIP_ETag: { i_id: 62, s_name: "SIP-ETag" },
    SIP_If_Match: { i_id: 63, s_name: "SIP-If-Match" },
    Subject: { i_id: 64, s_name: "Subject" },
    Subscription_State: { i_id: 65, s_name: "Subscription-State" },
    Supported: { i_id: 66, s_name: "Supported" },
    Target_Dialog: { i_id: 67, s_name: "Target-Dialog" },
    Timestamp: { i_id: 68, s_name: "Timestamp" },
    To: { i_id: 69, s_name: "To" },
    Unsupported: { i_id: 70, s_name: "Unsupported" },
    User_Agent: { i_id: 71, s_name: "User-Agent" },
    Via: { i_id: 72, s_name: "Via" },
    Warning: { i_id: 73, s_name: "Warning " },
    WWW_Authenticate: { i_id: 74, s_name: "WWW-Authenticate" },
    P_Access_Network_Info: { i_id: 75, s_name: "P-Access-Network-Info" },
    P_Answer_State: { i_id: 76, s_name: "P-Answer-State" },
    P_Asserted_Identity: { i_id: 77, s_name: "P-Asserted-Identity" },
    P_Associated_URI: { i_id: 78, s_name: "P-Associated-URI" },
    P_Called_Party_ID: { i_id: 79, s_name: "P-Called-Party-ID" },
    P_Charging_Function_Addresses: { i_id: 80, s_name: "P-Charging-Function-Addresses" },
    P_Charging_Vector: { i_id: 81, s_name: "P-Charging-Vector" },
    P_DCS_Billing_Info: { i_id: 82, s_name: "P-DCS-Billing-Info" },
    P_DCS_LAES: { i_id: 83, s_name: "P-DCS-LAES" },
    P_DCS_OSPS: { i_id: 84, s_name: "P-DCS-OSPS" },
    P_DCS_Redirect: { i_id: 85, s_name: "P-DCS-Redirect" },
    P_DCS_Trace_Party_ID: { i_id: 86, s_name: "P-DCS-Trace-Party-ID" },
    P_Early_Media: { i_id: 87, s_name: "P-Early-Media" },
    P_Media_Authorization: { i_id: 88, s_name: "P-Media-Authorization" },
    P_Preferred_Identity: { i_id: 89, s_name: "P-Preferred-Identity" },
    P_Profile_Key: { i_id: 90, s_name: "P-Profile-Key" },
    P_User_Database: { i_id: 91, s_name: "P-User-Database" },
    P_Visited_Network_ID: { i_id: 92, s_name: "P-Visited-Network-ID" }
};

function tsip_header(e_type) {
    this.e_type = e_type;
    this.ao_params = new Array();
}

tsip_header.prototype.get_name = function () {
    if (this.e_type.i_id == tsip_header_type_e.Dummy.i_id) {
        return this.s_name;
    }
    return this.e_type.s_name;
}

tsip_header.prototype.get_param_separator = function() {
    switch (this.e_type) {
        case tsip_header_type_e.Authorization:
        case tsip_header_type_e.Proxy_Authorization:
        case tsip_header_type_e.Proxy_Authenticate:
        case tsip_header_type_e.WWW_Authenticate:
            {
                return ',';
            }

        default:
            {
                return ';';
            }
    }
}

tsip_header.prototype.add_param = function(s_name, s_value){
    tsk_params_add(this.ao_params, s_name, s_value);
}

// name: value;params
tsip_header.prototype.tostring_full = function() {
    var c_separator;

    /* Header name */
    var s_str = tsk_string_format("{0}: ", this.get_name());

    /*  Header value (likes calling tsip_header_value_tostring() ) */
    s_str += this;

    /* Parameters */
    for (var i = 0; i < this.ao_params.length; ++i) {
        c_separator = this.get_param_separator();
        s_str += tsk_string_format("{0}{1}", c_separator, tsk_param_tostring(this.ao_params[i]));
    }

    /* CRLF */
    s_str += "\r\n";

    return s_str;
}

tsip_header.prototype.IndexOfByType = function (ao_headers, e_type) {
    if (ao_headers) {
        for (var i = 0; i < ao_headers.length; ++i) {
            if (ao_headers[i].e_type.i_id == e_type.i_id) {
                return i;
            }
        }
    }
    return -1;
}

tsip_header.prototype.IndexOfByName = function(ao_headers, s_name) {
    if (ao_headers && s_name) {
        var s_name_i = s_name.toLowerCase();
        for (var i = 0; i < ao_headers.length; ++i) {
            var s_name_curr = ao_headers[i].get_name();
            if (s_name_curr && s_name_curr.toLowerCase() == s_name_i) {
                return i;
            }
        }
    }
    return -1;
}

tsip_header.prototype.FindByType = function(ao_headers, e_type) {
    if (ao_headers) {
        for (var i = 0; i < ao_headers.length; ++i) {
            if (ao_headers[i].e_type.i_id == e_type.i_id) {
                return ao_headers[i];
            }
        }
    }
    return null;
}

if(!window.__b_release_mode){
    tsip_api_add_js_scripts('head',
        'src/tinySIP/src/headers/tsip_header_Int.js', // 'Content-Length', 'Expires', 'Max-Forwards', 'Min_Expires', 'Min-SE', 'RSeq'
        'src/tinySIP/src/headers/tsip_header_NameAddr.js', // 'From', 'To', 'Refer-To', 'Referred-By'
        // 'src/tinySIP/src/headers/tsip_header_NameAddrArray.js', #include_in<tsip_header_NameAddr.js> // 'P-Asserted-Identity', 'P-Associated-URI', 'P-Preferred-Identity', 'Path', 'Record-Route', 'Route', 'Service-Route'
        'src/tinySIP/src/headers/tsip_header_Str.js', // Call-ID, 'Date', 'Event', 'P-Access-Network-Info', 'P-Charging-Function-Addresses', 'Server', SIP-ETag, SIP-If-Match, User-Agent, Warning, Dummy
        'src/tinySIP/src/headers/tsip_header_StrArray.js', // 'Allow', 'Allow-Events', 'Privacy', 'Require', 'Supported'

        'src/tinySIP/src/headers/tsip_header_Authorization.js',
        'src/tinySIP/src/headers/tsip_header_Contact.js',
        'src/tinySIP/src/headers/tsip_header_Content_Type.js',
        'src/tinySIP/src/headers/tsip_header_CSeq.js',
        'src/tinySIP/src/headers/tsip_header_RAck.js',
        'src/tinySIP/src/headers/tsip_header_Refer_Sub.js',
        'src/tinySIP/src/headers/tsip_header_Session_Expires.js',
        'src/tinySIP/src/headers/tsip_header_Subscription_State.js',
        'src/tinySIP/src/headers/tsip_header_Via.js',
        'src/tinySIP/src/headers/tsip_header_WWW_Authenticate.js'
    );
}