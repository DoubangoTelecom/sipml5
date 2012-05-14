# Ragel generator
# For more information about Ragel: http://www.complang.org/ragel/

export OPTIONS="-E -L -T0"

# SIP/SIPS/TEL URI parser
#ragel.exe $OPTIONS -o ./src/parsers/tsip_parser_uri.js ./ragel/tsip_parser_uri.jrl

# SIP Message
ragel.exe $OPTIONS -o ./src/parsers/tsip_parser_message.js ./ragel/tsip_parser_message.jrl


# SIP message (both requests an responses) parser.
#ragel.exe $OPTIONS -o ./src/parsers/tsip_parser_message.js ./ragel/tsip_parser_message.jrl

# SIP headers parser
ragel.exe $OPTIONS -o ./src/parsers/tsip_parser_header.js ./ragel/tsip_parser_header.jrl

# ==Allow
ragel.exe $OPTIONS -o ./src/headers/tsip_header_Allow.js ./ragel/tsip_parser_header_Allow.jrl

# ==Allow-Events
ragel.exe $OPTIONS -o ./src/headers/tsip_header_Allow_Events.js ./ragel/tsip_parser_header_Allow_Events.jrl

# ==Authorization
ragel.exe $OPTIONS -o ./src/headers/tsip_header_Authorization.js ./ragel/tsip_parser_header_Authorization.jrl

# ==Call-ID
ragel.exe $OPTIONS -o ./src/headers/tsip_header_Call_ID.js ./ragel/tsip_parser_header_Call_ID.jrl

# ==Contact
ragel.exe $OPTIONS -o ./src/headers/tsip_header_Contact.js ./ragel/tsip_parser_header_Contact.jrl

# ==Content-Length
ragel.exe $OPTIONS -o ./src/headers/tsip_header_Content_Length.js ./ragel/tsip_parser_header_Content_Length.jrl

# ==Content-Type
ragel.exe $OPTIONS -o ./src/headers/tsip_header_Content_Type.js ./ragel/tsip_parser_header_Content_Type.jrl

# ==CSeq
ragel.exe $OPTIONS -o ./src/headers/tsip_header_CSeq.js ./ragel/tsip_parser_header_CSeq.jrl

# ==Date
ragel.exe $OPTIONS -o ./src/headers/tsip_header_Date.js ./ragel/tsip_parser_header_Date.jrl

# ==Dummy
ragel.exe $OPTIONS -o ./src/headers/tsip_header_Dummy.js ./ragel/tsip_parser_header_Dummy.jrl

# ==Event
ragel.exe $OPTIONS -o ./src/headers/tsip_header_Event.js ./ragel/tsip_parser_header_Event.jrl

# ==Expires
ragel.exe $OPTIONS -o ./src/headers/tsip_header_Expires.js ./ragel/tsip_parser_header_Expires.jrl

# ==From
ragel.exe $OPTIONS -o ./src/headers/tsip_header_From.js ./ragel/tsip_parser_header_From.jrl

# ==Max-Forwards
ragel.exe $OPTIONS -o ./src/headers/tsip_header_Max_Forwards.js ./ragel/tsip_parser_header_Max_Forwards.jrl

# ==Min-Expires
ragel.exe $OPTIONS -o ./src/headers/tsip_header_Min_Expires.js ./ragel/tsip_parser_header_Min_Expires.jrl

# ==Min-SE
ragel.exe $OPTIONS -o ./src/headers/tsip_header_Min_SE.js ./ragel/tsip_parser_header_Min_SE.jrl

# ==P-Access-Network-Info
ragel.exe $OPTIONS -o ./src/headers/tsip_header_P_Access_Network_Info.js ./ragel/tsip_parser_header_P_Access_Network_Info.jrl

# ==P-Asserted-Identity
ragel.exe $OPTIONS -o ./src/headers/tsip_header_P_Asserted_Identity.js ./ragel/tsip_parser_header_P_Asserted_Identity.jrl

# ==P-Associated-URI
ragel.exe $OPTIONS -o ./src/headers/tsip_header_P_Associated_URI.js ./ragel/tsip_parser_header_P_Associated_URI.jrl

# ==P-Charging-Function-Addresses
ragel.exe $OPTIONS -o ./src/headers/tsip_header_P_Charging_Function_Addresses.js ./ragel/tsip_parser_header_P_Charging_Function_Addresses.jrl

# ==P-Preferred-Identity
ragel.exe $OPTIONS -o ./src/headers/tsip_header_P_Preferred_Identity.js ./ragel/tsip_parser_header_P_Preferred_Identity.jrl

# ==Path
ragel.exe $OPTIONS -o ./src/headers/tsip_header_Path.js ./ragel/tsip_parser_header_Path.jrl

# ==Privacy
ragel.exe $OPTIONS -o ./src/headers/tsip_header_Privacy.js ./ragel/tsip_parser_header_Privacy.jrl

# ==RAck
ragel.exe $OPTIONS -o ./src/headers/tsip_header_RAck.js ./ragel/tsip_parser_header_RAck.jrl

# ==Refer-Sub
ragel.exe $OPTIONS -o ./src/headers/tsip_header_Refer_Sub.js ./ragel/tsip_parser_header_Refer_Sub.jrl

# ==Refer-To
ragel.exe $OPTIONS -o ./src/headers/tsip_header_Refer_To.js ./ragel/tsip_parser_header_Refer_To.jrl

# ==Referred-By
ragel.exe $OPTIONS -o ./src/headers/tsip_header_Referred_By.js ./ragel/tsip_parser_header_Referred_By.jrl

# ==Record-Route
ragel.exe $OPTIONS -o ./src/headers/tsip_header_Record_Route.js ./ragel/tsip_parser_header_Record_Route.jrl

# ==Require
ragel.exe $OPTIONS -o ./src/headers/tsip_header_Require.js ./ragel/tsip_parser_header_Require.jrl

# ==Route
ragel.exe $OPTIONS -o ./src/headers/tsip_header_Route.js ./ragel/tsip_parser_header_Route.jrl

# ==RSeq
ragel.exe $OPTIONS -o ./src/headers/tsip_header_RSeq.js ./ragel/tsip_parser_header_RSeq.jrl

# ==Server
ragel.exe $OPTIONS -o ./src/headers/tsip_header_Server.js ./ragel/tsip_parser_header_Server.jrl

# ==Service-Route
ragel.exe $OPTIONS -o ./src/headers/tsip_header_Service_Route.js ./ragel/tsip_parser_header_Service_Route.jrl

# ==Session-Expires
ragel.exe $OPTIONS -o ./src/headers/tsip_header_Session_Expires.js ./ragel/tsip_parser_header_Session_Expires.jrl

# ==SIP-ETag
ragel.exe $OPTIONS -o ./src/headers/tsip_header_SIP_ETag.js ./ragel/tsip_parser_header_SIP_ETag.jrl

# == SIP-If-Match
ragel.exe $OPTIONS -o ./src/headers/tsip_header_SIP_If_Match.js ./ragel/tsip_parser_header_SIP_If_Match.jrl

# == Subscription-State
ragel.exe $OPTIONS -o ./src/headers/tsip_header_Subscription_State.js ./ragel/tsip_parser_header_Subscription_State.jrl

# ==Supported
ragel.exe $OPTIONS -o ./src/headers/tsip_header_Supported.js ./ragel/tsip_parser_header_Supported.jrl

# ==Supported
ragel.exe $OPTIONS -o ./src/headers/tsip_header_To.js ./ragel/tsip_parser_header_To.jrl

# == User-Agent
ragel.exe $OPTIONS -o ./src/headers/tsip_header_User_Agent.js ./ragel/tsip_parser_header_User_Agent.jrl

# ==Via
ragel.exe $OPTIONS -o ./src/headers/tsip_header_Via.js ./ragel/tsip_parser_header_Via.jrl

# == Warning
ragel.exe $OPTIONS -o ./src/headers/tsip_header_Warning.js ./ragel/tsip_parser_header_Warning.jrl

# == WWW-Authenticate
ragel.exe $OPTIONS -o ./src/headers/tsip_header_WWW_Authenticate.js ./ragel/tsip_parser_header_WWW_Authenticate.jrl