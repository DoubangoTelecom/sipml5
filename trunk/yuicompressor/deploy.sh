#!/bin/bash

DEPLOY_FOLDER=./deploy
for src_file in $(find ../ -name '*.js' -o -name '*.htm' -o -name '*.html' -o -name '*.css' -o -name '*.wav' -o -name '*.png')
do 
	name=`basename $src_file`
	src_dir=`dirname "$src_file"`
	base=${src_file%/*}
	
	if [ ${src_dir} != ../yuicompressor ] && [ ${src_dir} != ../tests ] && [ ${src_dir} != ../asterisk ] && [ ${src_dir} != ../docs ]
	then
		dest_dir=$DEPLOY_FOLDER/${src_dir: 3}
		dest_file=$dest_dir/$name
		mkdir -p $dest_dir
		cp -f $src_file $dest_file
		echo Processing: $dest_dir/$name
		
		if [ ${name: -3} == ".js" ] || [ ${name: -4} == ".css" ]
		then		
			java -jar ./yuicompressor-2.4.7.jar $dest_file -o $dest_file --charset utf-8
		fi
	fi
	
done