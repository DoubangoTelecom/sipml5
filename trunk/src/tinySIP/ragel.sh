# Ragel generator
# For more information about Ragel: http://www.complang.org/ragel/

# folder (./src/headers) jsname(tsip_header_Authorization) jrlname (tsip_parser_header_Authorization)
ProcessFile()
{
	ragel-js.exe $OPTIONS -o $1/$2.js ./ragel/$3.jrl
	sed -i 's/const _tsip_machine_parser_/_tsip_machine_parser_/g' $1/$2.js
	sed -i 's/const tsip_machine_parser_/tsip_machine_parser_/g' $1/$2.js
	# sed -i -b 's/if (_goto_level <= _test_eof) {$1/$2.js}//g' $1/$2.js
}

export OPTIONS="-E -L -T0"

# SIP/SIPS/TEL URI parser
#ragel.exe $OPTIONS -o ./src/parsers/tsip_parser_uri.js ./ragel/tsip_parser_uri.jrl

# SIP Message
ProcessFile "./src/parsers" "tsip_parser_message" "tsip_parser_message"

# SIP headers parser
ProcessFile "./src/parsers" "tsip_parser_header" "tsip_parser_header"

# ==Allow see StrArray)
#ragel.exe $OPTIONS -o ./src/headers/tsip_header_Allow.js ./ragel/tsip_parser_header_Allow.jrl

# ==Allow-Events (see StrArray)
#ragel.exe $OPTIONS -o ./src/headers/tsip_header_Allow_Events.js ./ragel/tsip_parser_header_Allow_Events.jrl

# ==Authorization
ProcessFile "./src/headers" "tsip_header_Authorization" "tsip_parser_header_Authorization"

# ==Call-ID (see Str)
# ragel.exe $OPTIONS -o ./src/headers/tsip_header_Call_ID.js ./ragel/tsip_parser_header_Call_ID.jrl

# ==Contact
ProcessFile "./src/headers" "tsip_header_Contact" "tsip_parser_header_Contact"

# ==Content-Length (see Int)
#ragel.exe $OPTIONS -o ./src/headers/tsip_header_Content_Length.js ./ragel/tsip_parser_header_Content_Length.jrl

# ==Content-Type
ProcessFile "./src/headers" "tsip_header_Content_Type" "tsip_parser_header_Content_Type"

# ==CSeq
ProcessFile "./src/headers" "tsip_header_CSeq" "tsip_parser_header_CSeq"

# ==Date (see Str)
#ProcessFile "./src/headers" "tsip_header_Date" "tsip_parser_header_Date"

# ==Dummy (see Str)
#ProcessFile "./src/headers" "tsip_header_Dummy" "tsip_parser_header_Dummy"

# ==Event (see Str)
#ragel.exe $OPTIONS -o ./src/headers/tsip_header_Event.js ./ragel/tsip_parser_header_Event.jrl

# ==Expires (see Int)
#ragel.exe $OPTIONS -o ./src/headers/tsip_header_Expires.js ./ragel/tsip_parser_header_Expires.jrl

# ==From (See NameAddr)
#ragel.exe $OPTIONS -o ./src/headers/tsip_header_From.js ./ragel/tsip_parser_header_From.jrl

# ==Int (Content-Length, Expires, Max-Forwards, Min-Expires, Min-SE, RSeq)
ProcessFile "./src/headers" "tsip_header_Int" "tsip_parser_header_Int"

# ==NameAddr (From, To, Refer-To, Referred-By)
ProcessFile "./src/headers" "tsip_header_NameAddr" "tsip_parser_header_NameAddr"

# ==NameAddrArray ('P-Asserted-Identity', 'P-Associated-URI', 'Path', 'Record-Route', 'Route', 'Service-Route')
ProcessFile "./src/headers" "tsip_header_NameAddrArray" "tsip_parser_header_NameAddrArray"

# ==Max-Forwards (see Int)
#ragel.exe $OPTIONS -o ./src/headers/tsip_header_Max_Forwards.js ./ragel/tsip_parser_header_Max_Forwards.jrl

# ==Min-Expires (see Int)
#ragel.exe $OPTIONS -o ./src/headers/tsip_header_Min_Expires.js ./ragel/tsip_parser_header_Min_Expires.jrl

# ==Min-SE (see Int)
#ragel.exe $OPTIONS -o ./src/headers/tsip_header_Min_SE.js ./ragel/tsip_parser_header_Min_SE.jrl

# ==P-Access-Network-Info (see Str)
#ragel.exe $OPTIONS -o ./src/headers/tsip_header_P_Access_Network_Info.js ./ragel/tsip_parser_header_P_Access_Network_Info.jrl

# ==P-Asserted-Identity (see NameAddrArray)
#ragel.exe $OPTIONS -o ./src/headers/tsip_header_P_Asserted_Identity.js ./ragel/tsip_parser_header_P_Asserted_Identity.jrl

# ==P-Associated-URI (see NameAddrArray)
#ragel.exe $OPTIONS -o ./src/headers/tsip_header_P_Associated_URI.js ./ragel/tsip_parser_header_P_Associated_URI.jrl

# ==P-Charging-Function-Addresses (see Str)
#ProcessFile "./src/headers" "tsip_header_P_Charging_Function_Addresses" "tsip_parser_header_P_Charging_Function_Addresses"

# ==P-Preferred-Identity (see NameAddrArray)
#ProcessFile "./src/headers" "tsip_header_P_Preferred_Identity" "tsip_parser_header_P_Preferred_Identity"

# ==Path (see NameAddrArray)
#ragel.exe $OPTIONS -o ./src/headers/tsip_header_Path.js ./ragel/tsip_parser_header_Path.jrl

# ==Privacy (se StrArray)
#ragel.exe $OPTIONS -o ./src/headers/tsip_header_Privacy.js ./ragel/tsip_parser_header_Privacy.jrl

# ==RAck
ProcessFile "./src/headers" "tsip_header_RAck" "tsip_parser_header_RAck"

# ==Refer-Sub
ProcessFile "./src/headers" "tsip_header_Refer_Sub" "tsip_parser_header_Refer_Sub"

# ==Refer-To (see NameAddr)
#ragel.exe $OPTIONS -o ./src/headers/tsip_header_Refer_To.js ./ragel/tsip_parser_header_Refer_To.jrl

# ==Referred-By (see NameAddr)
#ragel.exe $OPTIONS -o ./src/headers/tsip_header_Referred_By.js ./ragel/tsip_parser_header_Referred_By.jrl

# ==Record-Route (see NameAddrArray)
#ragel.exe $OPTIONS -o ./src/headers/tsip_header_Record_Route.js ./ragel/tsip_parser_header_Record_Route.jrl

# ==Require (see StrArray)
#ragel.exe $OPTIONS -o ./src/headers/tsip_header_Require.js ./ragel/tsip_parser_header_Require.jrl

# ==Route (see NameAddrArray)
#ragel.exe $OPTIONS -o ./src/headers/tsip_header_Route.js ./ragel/tsip_parser_header_Route.jrl

# ==RSeq (see Int)
#ragel.exe $OPTIONS -o ./src/headers/tsip_header_RSeq.js ./ragel/tsip_parser_header_RSeq.jrl

# ==Server (see Str)
#ragel.exe $OPTIONS -o ./src/headers/tsip_header_Server.js ./ragel/tsip_parser_header_Server.jrl

# ==Service-Route (see NameAddrArray)
#ragel.exe $OPTIONS -o ./src/headers/tsip_header_Service_Route.js ./ragel/tsip_parser_header_Service_Route.jrl

# ==Session-Expires
ProcessFile "./src/headers" "tsip_header_Session_Expires" "tsip_parser_header_Session_Expires"

# ==SIP-ETag (see Str)
#ragel.exe $OPTIONS -o ./src/headers/tsip_header_SIP_ETag.js ./ragel/tsip_parser_header_SIP_ETag.jrl

# == SIP-If-Match (See Str)
#ragel.exe $OPTIONS -o ./src/headers/tsip_header_SIP_If_Match.js ./ragel/tsip_parser_header_SIP_If_Match.jrl

# == Str (Call-ID, Event, P-Access-Network-Info, Server, SIP-ETag, SIP-If-Match, User-Agent)
ProcessFile "./src/headers" "tsip_header_Str" "tsip_parser_header_Str"

# == StrArray (Allow, Allow-Events, Privacy, Require, Supported)
ProcessFile "./src/headers" "tsip_header_StrArray" "tsip_parser_header_StrArray"

# == Subscription-State
ProcessFile "./src/headers" "tsip_header_Subscription_State" "tsip_parser_header_Subscription_State"

# ==Supported (see StrArray)
#ragel.exe $OPTIONS -o ./src/headers/tsip_header_Supported.js ./ragel/tsip_parser_header_Supported.jrl

# ==To (see NameAddr)
#ragel.exe $OPTIONS -o ./src/headers/tsip_header_To.js ./ragel/tsip_parser_header_To.jrl

# == User-Agent (see Str)
#ragel.exe $OPTIONS -o ./src/headers/tsip_header_User_Agent.js ./ragel/tsip_parser_header_User_Agent.jrl

# ==Via
ProcessFile "./src/headers" "tsip_header_Via" "tsip_parser_header_Via"

# == Warning (see Str)
#ProcessFile "./src/headers" "tsip_header_Warning" "tsip_parser_header_Warning"

# == WWW-Authenticate
ProcessFile "./src/headers" "tsip_header_WWW_Authenticate" "tsip_parser_header_WWW_Authenticate"