# Ragel generator
# For more information about Ragel: http://www.complang.org/ragel/

export OPTIONS="-E -L -T0"

# SDP Message parser
ragel.exe $OPTIONS -o ./src/tsdp_parser_message.js ./ragel/tsdp_parser_message.jrl
# ==Str (E, I, K, P, S, U)
ragel.exe $OPTIONS -o ./src/headers/tsdp_header_Str.js ./ragel/tsdp_parser_header_Str.jrl

# ==A
ragel.exe $OPTIONS -o ./src/headers/tsdp_header_A.js ./ragel/tsdp_parser_header_A.jrl

# ==B
ragel.exe $OPTIONS -o ./src/headers/tsdp_header_B.js ./ragel/tsdp_parser_header_B.jrl

# ==C
ragel.exe $OPTIONS -o ./src/headers/tsdp_header_C.js ./ragel/tsdp_parser_header_C.jrl

# ==Dummy
ragel.exe $OPTIONS -o ./src/headers/tsdp_header_Dummy.js ./ragel/tsdp_parser_header_Dummy.jrl

# ==E
#ragel.exe $OPTIONS -o ./src/headers/tsdp_header_E.js ./ragel/tsdp_parser_header_E.jrl

# ==I
#ragel.exe $OPTIONS -o ./src/headers/tsdp_header_I.js ./ragel/tsdp_parser_header_I.jrl

# ==K
#ragel.exe $OPTIONS -o ./src/headers/tsdp_header_K.js ./ragel/tsdp_parser_header_K.jrl

# ==M
ragel.exe $OPTIONS -o ./src/headers/tsdp_header_M.js ./ragel/tsdp_parser_header_M.jrl

# ==O
ragel.exe $OPTIONS -o ./src/headers/tsdp_header_O.js ./ragel/tsdp_parser_header_O.jrl

# ==P
#ragel.exe $OPTIONS -o ./src/headers/tsdp_header_P.js ./ragel/tsdp_parser_header_P.jrl

# ==R
ragel.exe $OPTIONS -o ./src/headers/tsdp_header_R.js ./ragel/tsdp_parser_header_R.jrl

# ==S
#ragel.exe $OPTIONS -o ./src/headers/tsdp_header_S.js ./ragel/tsdp_parser_header_S.jrl

# ==T
ragel.exe $OPTIONS -o ./src/headers/tsdp_header_T.js ./ragel/tsdp_parser_header_T.jrl

# ==U
#ragel.exe $OPTIONS -o ./src/headers/tsdp_header_U.js ./ragel/tsdp_parser_header_U.jrl

# ==V
ragel.exe $OPTIONS -o ./src/headers/tsdp_header_V.js ./ragel/tsdp_parser_header_V.jrl

# ==Z
ragel.exe $OPTIONS -o ./src/headers/tsdp_header_Z.js ./ragel/tsdp_parser_header_Z.jrl

