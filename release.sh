#!/bin/bash

#
# Copyright (C) 2012-2018 Doubango Telecom <http://www.doubango.org>
# License: BSD
# This file is part of Open Source sipML5 solution <http://www.sipml5.org>
#

API_VERSION=2.1.4
API_FOLDER_NAME=release
API_FILE_NAME=SIPml-api.js
API_FILE_PATH=$API_FOLDER_NAME/$API_FILE_NAME

# src dst
CompressFile()
{	
	echo Compressing ... $1 to $2
	if [ ${1: -3} == ".js" ]
	then
		# java -jar google-closure-compiler.jar --js $1 --js_output_file $2 --charset utf-8
		java -cp . -jar yuicompressor-2.4.7.jar $1 -o $2 --charset utf-8
	else
		java -cp . -jar yuicompressor-2.4.7.jar $1 -o $2 --charset utf-8
	fi
}

# src dst
AppendFile()
{
	echo Appending... $1 to $2
	cat $1 >> $2
}

#dst
AppendScripts()
{
	echo "var __b_release_mode = true;" > $1
	
	AppendFile src/adapter.js $1
	AppendFile src/tinySAK/src/tsk_base64.js $1
    AppendFile src/tinySAK/src/tsk_buff.js $1
    AppendFile src/tinySAK/src/tsk_fsm.js $1
    AppendFile src/tinySAK/src/tsk_md5.js $1
    AppendFile src/tinySAK/src/tsk_param.js $1
    AppendFile src/tinySAK/src/tsk_ragel.js $1
    AppendFile src/tinySAK/src/tsk_string.js $1
    AppendFile src/tinySAK/src/tsk_utils.js $1
    
	# at this step 'tsk_utils_log_info' is defined
	echo "tsk_utils_log_info('SIPML5 API version = $API_VERSION');" >> $1
    
    AppendFile src/tinyMEDIA/src/tmedia_common.js $1
		AppendFile src/tinyMEDIA/src/tmedia_webrtc4all.js $1 #include_in<tmedia_common.js>
		AppendFile src/tinyMEDIA/src/tmedia_defaults.js $1 #include_in<tmedia_common.js>
		AppendFile src/tinyMEDIA/src/tmedia_session.js $1 #include_in<tmedia_common.js>
			AppendFile src/tinyMEDIA/src/tmedia_session_jsep.js $1 #include_in<tmedia_session.js>
			AppendFile src/tinyMEDIA/src/tmedia_session_roap.js $1 #include_in<tmedia_session.js>
			AppendFile src/tinyMEDIA/src/tmedia_session_ghost.js $1 #include_in<tmedia_session.js>
    AppendFile src/tinyMEDIA/src/tmedia_param.js $1
    AppendFile src/tinyMEDIA/src/tmedia_qos.js $1
    
    
    AppendFile src/tinySDP/src/headers/tsdp_header.js $1
		AppendFile src/tinySDP/src/headers/tsdp_header_A.js $1 #include_in<tsdp_header.js>
		AppendFile src/tinySDP/src/headers/tsdp_header_C.js $1 #include_in<tsdp_header.js>
		AppendFile src/tinySDP/src/headers/tsdp_header_M.js $1 #include_in<tsdp_header.js>
		AppendFile src/tinySDP/src/headers/tsdp_header_O.js $1 #include_in<tsdp_header.js>
		AppendFile src/tinySDP/src/headers/tsdp_header_Str.js $1 #include_in<tsdp_header.js>
		AppendFile src/tinySDP/src/headers/tsdp_header_V.js $1 #include_in<tsdp_header.js>
    AppendFile src/tinySDP/src/tsdp_message.js $1
		AppendFile src/tinySDP/src/tsdp_parser_message.js $1 #include_in<tsdp_message.js>
    
    
    AppendFile src/tinySIP/src/tsip_action.js $1
	AppendFile src/tinySIP/src/tsip_event.js $1
	AppendFile src/tinySIP/src/tsip_message.js $1
		AppendFile src/tinySIP/src/parsers/tsip_parser_message.js $1 #include_in<tsip_message.js>
	AppendFile src/tinySIP/src/tsip_session.js $1
		AppendFile src/tinySIP/src/api/tsip_api_common.js $1 #include_in<tsip_session.js>
		AppendFile src/tinySIP/src/api/tsip_api_info.js $1 #include_in<tsip_session.js>
		AppendFile src/tinySIP/src/api/tsip_api_invite.js $1 #include_in<tsip_session.js>
		AppendFile src/tinySIP/src/api/tsip_api_message.js $1 #include_in<tsip_session.js>
		AppendFile src/tinySIP/src/api/tsip_api_options.js $1 #include_in<tsip_session.js>
		AppendFile src/tinySIP/src/api/tsip_api_publish.js $1 #include_in<tsip_session.js>
		AppendFile src/tinySIP/src/api/tsip_api_register.js $1 #include_in<tsip_session.js>
		AppendFile src/tinySIP/src/api/tsip_api_subscribe.js $1 #include_in<tsip_session.js>
	AppendFile src/tinySIP/src/tsip_stack.js $1
	AppendFile src/tinySIP/src/tsip_timers.js $1
	AppendFile src/tinySIP/src/tsip_uri.js $1
		AppendFile src/tinySIP/src/parsers/tsip_parser_uri.js $1 #include_in<tsip_uri.js>
	
	AppendFile src/tinySIP/src/authentication/tsip_auth.js $1
	AppendFile src/tinySIP/src/authentication/tsip_challenge.js $1
	
	AppendFile src/tinySIP/src/dialogs/tsip_dialog.js $1
		AppendFile src/tinySIP/src/dialogs/tsip_dialog_generic.js $1 #include_in<tsip_dialog.js>
			AppendFile src/tinySIP/src/dialogs/tsip_dialog_generic__message.js $1 #include_in<tsip_dialog_generic.js>
			AppendFile src/tinySIP/src/dialogs/tsip_dialog_generic__publish.js $1 #include_in<tsip_dialog_generic.js>
			AppendFile src/tinySIP/src/dialogs/tsip_dialog_generic__subscribe.js $1 #include_in<tsip_dialog_generic.js>
		AppendFile src/tinySIP/src/dialogs/tsip_dialog_invite.js $1 #include_in<tsip_dialog.js>
			AppendFile src/tinySIP/src/dialogs/tsip_dialog_invite__client.js $1 #include_in<tsip_dialog_invite.js>
			AppendFile src/tinySIP/src/dialogs/tsip_dialog_invite__ect.js $1 #include_in<tsip_dialog_invite.js>
			AppendFile src/tinySIP/src/dialogs/tsip_dialog_invite__hold.js $1 #include_in<tsip_dialog_invite.js>
			AppendFile src/tinySIP/src/dialogs/tsip_dialog_invite__server.js $1 #include_in<tsip_dialog_invite.js>
			AppendFile src/tinySIP/src/dialogs/tsip_dialog_invite__timers.js $1 #include_in<tsip_dialog_invite.js>
		AppendFile src/tinySIP/src/dialogs/tsip_dialog_register.js $1 #include_in<tsip_dialog.js>
    AppendFile src/tinySIP/src/dialogs/tsip_dialog_layer.js $1
    
    AppendFile src/tinySIP/src/headers/tsip_header.js $1
		AppendFile src/tinySIP/src/headers/tsip_header_Int.js $1 #include_in<tsip_header.js>
		AppendFile src/tinySIP/src/headers/tsip_header_NameAddr.js $1 #include_in<tsip_header.js>
			AppendFile src/tinySIP/src/headers/tsip_header_NameAddrArray.js $1 #include_in<tsip_header_NameAddr.js>
		AppendFile src/tinySIP/src/headers/tsip_header_Str.js $1 #include_in<tsip_header.js>
		AppendFile src/tinySIP/src/headers/tsip_header_StrArray.js $1 #include_in<tsip_header.js>
		AppendFile src/tinySIP/src/headers/tsip_header_Authorization.js $1 #include_in<tsip_header.js>
		AppendFile src/tinySIP/src/headers/tsip_header_Contact.js $1 #include_in<tsip_header.js>
		AppendFile src/tinySIP/src/headers/tsip_header_Content_Type.js $1 #include_in<tsip_header.js>
		AppendFile src/tinySIP/src/headers/tsip_header_CSeq.js $1 #include_in<tsip_header.js>
		AppendFile src/tinySIP/src/headers/tsip_header_RAck.js $1 #include_in<tsip_header.js>
		AppendFile src/tinySIP/src/headers/tsip_header_Refer_Sub.js $1 #include_in<tsip_header.js>
		AppendFile src/tinySIP/src/headers/tsip_header_Session_Expires.js $1 #include_in<tsip_header.js>
		AppendFile src/tinySIP/src/headers/tsip_header_Subscription_State.js $1 #include_in<tsip_header.js>
		AppendFile src/tinySIP/src/headers/tsip_header_Via.js $1 #include_in<tsip_header.js>
		AppendFile src/tinySIP/src/headers/tsip_header_WWW_Authenticate.js $1 #include_in<tsip_header.js>
    
    AppendFile src/tinySIP/src/parsers/tsip_parser_header.js $1
    # src/tinySIP/src/parsers/tsip_parser_message.js $1
    # src/tinySIP/src/parsers/tsip_parser_uri.js $1
    
    AppendFile src/tinySIP/src/transactions/tsip_transac.js $1
		AppendFile src/tinySIP/src/transactions/tsip_transac_ict.js $1 #include_in<tsip_transac.js>
		AppendFile src/tinySIP/src/transactions/tsip_transac_ist.js $1 #include_in<tsip_transac.js>
		AppendFile src/tinySIP/src/transactions/tsip_transac_layer.js $1 #include_in<tsip_transac.js>
		AppendFile src/tinySIP/src/transactions/tsip_transac_nict.js $1 #include_in<tsip_transac.js>
		AppendFile src/tinySIP/src/transactions/tsip_transac_nist.js $1 #include_in<tsip_transac.js>
	
	AppendFile src/tinySIP/src/transports/tsip_transport.js $1
	AppendFile src/tinySIP/src/transports/tsip_transport_layer.js $1
	
	
	AppendFile SIPml.js $1
}

# src dst
DeployFile()
{
	if [ ${1: -3} == ".js" ] || [ ${1: -4} == ".css" ]
	then
		CompressFile $1 $2
	else
		echo copying to... $2
		cp -f $1 $2
	fi
}

# folder
DeployFolder()
{
	for src_file in $(find $1 -name '*.js' -o -name '*.htm' -o -name '*.html' -o -name '*.css' -o -name '*.wav' -o -name '*.png' -o -name '*.bmp')
	do 
		name=`basename $src_file`
		src_dir=`dirname "$src_file"`
		base=${src_file%/*}
		
		dest_dir=$API_FOLDER_NAME/${src_dir: 0}
		dest_file=$dest_dir/$name
		mkdir -p $dest_dir
		
		DeployFile $src_file $dest_file
	done
}

# deploy assets
DeployFolder assets

# deploy images
DeployFolder images

# deploy sounds
DeployFolder sounds

# deploy html files
for file in call.htm contact.htm error.htm expert.htm index.html
do
	DeployFile $file $API_FOLDER_NAME/$file
done

# append JS scripts
AppendScripts $API_FILE_PATH.tmp.js
# compress JS scripts
CompressFile $API_FILE_PATH.tmp.js $API_FILE_PATH
rm -rf $API_FILE_PATH.tmp.js

# generate and deploy documentation
./docgen.sh
DeployFolder docgen


