# Ragel generator
# For more information about Ragel: http://www.complang.org/ragel/

# folder (./src/headers) jsname(tsdp_parser_message) jrlname (tsdp_parser_message)
ProcessFile()
{
	ragel-js $OPTIONS -o $1/$2.js ./ragel/$3.jrl
	sed -i 's/const _tsdp_machine_/_tsdp_machine_/g' $1/$2.js
	sed -i 's/const tsdp_machine_/tsdp_machine_/g' $1/$2.js
	# sed -i -b 's/if (_goto_level <= _test_eof) {$1/$2.js}//g' $1/$2.js
}

export OPTIONS="-E -L -T0"

# SDP Message parser
ProcessFile "./src" "tsdp_parser_message" "tsdp_parser_message"

# ==Str (E, I, K, P, R, S, U, Z)
ProcessFile "./src/headers" "tsdp_header_Str" "tsdp_parser_header_Str"

# ==A
ProcessFile "./src/headers" "tsdp_header_A" "tsdp_parser_header_A"

# ==B
#ProcessFile "./src/headers" "tsdp_header_B" "tsdp_parser_header_B"

# ==C
ProcessFile "./src/headers" "tsdp_header_C" "tsdp_parser_header_C"

# ==Dummy
#ProcessFile "./src/headers" "tsdp_header_Dummy" "tsdp_parser_header_Dummy"

# ==E
#ragel.exe $OPTIONS -o ./src/headers/tsdp_header_E.js ./ragel/tsdp_parser_header_E.jrl

# ==I
#ragel.exe $OPTIONS -o ./src/headers/tsdp_header_I.js ./ragel/tsdp_parser_header_I.jrl

# ==K
#ragel.exe $OPTIONS -o ./src/headers/tsdp_header_K.js ./ragel/tsdp_parser_header_K.jrl

# ==M
ProcessFile "./src/headers" "tsdp_header_M" "tsdp_parser_header_M"

# ==O
ProcessFile "./src/headers" "tsdp_header_O" "tsdp_parser_header_O"

# ==P
#ragel.exe $OPTIONS -o ./src/headers/tsdp_header_P.js ./ragel/tsdp_parser_header_P.jrl

# ==R
#ProcessFile "./src/headers" "tsdp_header_R" "tsdp_parser_header_R"

# ==S
#ragel.exe $OPTIONS -o ./src/headers/tsdp_header_S.js ./ragel/tsdp_parser_header_S.jrl

# ==T
#ProcessFile "./src/headers" "tsdp_header_T" "tsdp_parser_header_T"

# ==U
#ragel.exe $OPTIONS -o ./src/headers/tsdp_header_U.js ./ragel/tsdp_parser_header_U.jrl

# ==V
ProcessFile "./src/headers" "tsdp_header_V" "tsdp_parser_header_V"

# ==Z
#ProcessFile "./src/headers" "tsdp_header_Z" "tsdp_parser_header_Z"

