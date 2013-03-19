#!/bin/bash

#
# Copyright (C) 2012 Doubango Telecom <http://www.doubango.org>
# License: BSD
# This file is part of Open Source sipML5 solution <http://www.sipml5.org>
#

API_FOLDER_NAME=release
API_FILE_NAME=SIPml-api.js
API_FILE_PATH=$API_FOLDER_NAME/$API_FILE_NAME
i=0

# old
ObfuscateSymbol()
{
	((i++))
	echo "ObfuscateSymbol($1, _$i)"
	sed -i "s/$1/_$i/g" $API_FILE_PATH
}

# project(e.g sdp), name (e.g. M)
ObfuscateSymbolRagelHeader()
{
	ObfuscateSymbol t$1_header_$2
	ObfuscateSymbol _t$1_machine_parser_header_$2_trans_targs
	ObfuscateSymbol _t$1_machine_parser_header_$2_indicies
	ObfuscateSymbol _t$1_machine_parser_header_$2_range_lengths
	ObfuscateSymbol _t$1_machine_parser_header_$2_index_offsets
	ObfuscateSymbol _t$1_machine_parser_header_$2_single_lengths
	ObfuscateSymbol _t$1_machine_parser_header_$2_key_offsets
	ObfuscateSymbol _t$1_machine_parser_header_$2_trans_actions
	ObfuscateSymbol _t$1_machine_parser_header_$2_trans_keys
	ObfuscateSymbol _t$1_machine_parser_header_$2_eof_actions
	ObfuscateSymbol _t$1_machine_parser_header_$2_actions
	ObfuscateSymbol t$1_machine_parser_header_$2_start
	ObfuscateSymbol t$1_machine_parser_header_$2_first_final
	ObfuscateSymbol t$1_machine_parser_header_$2_en_main
	ObfuscateSymbol t$1_machine_parser_header_$2_error
}

for project in sip sdp
do
	if [ $project == "sip" ]
	then
		for hdr in Allow \
			Allow-Events \
			Authorization \
			Call_ID \
			Contact \
			Content_Length \
			Content_Type \
			CSeq \
			Date \
			Dummy \
			Event \
			Expires \
			From \
			Int \
			NameAddr \
			NameAddrArray \
			Max_Forwards \
			Min_Expires \
			Min_SE \
			P_Access_Network_Info \
			P_Asserted_Identity \
			P_Associated_URI \
			P_Charging_Function_Addresses \
			P_Preferred_Identity \
			Path \
			Privacy \
			RAck \
			Refer_To \
			Referred_By \
			Record_Route \
			Require \
			Route \
			RSeq \
			Server \
			Service_Route \
			Expires \
			SIP_ETag \
			SIP_If_Match \
			Str \
			StrArray \
			Subscription_State \
			Supported \
			To \
			User_Agent \
			Via \
			Warning \
			WWW_Authenticate
		do
			ObfuscateSymbolRagelHeader $project $hdr
		done
	elif [ $project == "sdp" ]
	then
		for hdr in Str E I K P R S U Z A B C Dummy M O T V
		do
			ObfuscateSymbolRagelHeader $project $hdr
		done
	fi

done


declare -a symbols=(
tsk_utils_log_info \
tsk_utils_log_warn \
tsk_utils_log_error \
tsk_buff_ab2str \
tsk_buff_u8b2ascii \
tsk_fsm \
i_state_curr \
__i_state_any \
i_state_term \
fn_onterm \
set_debug_enabled \
set_onterm_callback \
CreateAlwaysNothing \
CreateAlways \
tsk_ragel_state_create \
tsk_ragel_parser_get_string \
tsk_ragel_scanner_get_string \
tsk_param_parse \
tsk_string_random_from_dict \
tsk_params_tostring \
tsk_buff_u8b2utf8 \
\
tmedia_session_events_e \
tmedia_session_mgr \
\
tsdp_header_type_e \
get_header_m_by_name \
\
tsip_event_invite_type_e \
tsip_header_type_e \
tsip_transac_type_e \
tsip_transac_layer \
tsip_transac_event_type_e \
tsip_transac_ist_states_e \
tsip_transac_ist_actions_e \
tsip_transac_ict_states_e \
tsip_transac_ict_actions_e \
tsip_transac_nict_states_e \
tsip_transac_nict_actions_e \
tsip_transac_nist_states_e \
tsip_transac_nist_actions_e \
tsip_dialog_register
)

for symbol in ${symbols[@]}
do
	ObfuscateSymbol $symbol
done