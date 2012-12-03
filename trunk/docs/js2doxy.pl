#!/usr/bin/perl

# JsUnit - a JUnit port for JavaScript
# Copyright (C) 1999,2000,2001,2002,2003,2006 Joerg Schaible
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

use strict;

use vars qw( $VERSION );
$VERSION = "2.1";

############ Options ####################

use vars qw(
    $DEB_NONE
    $DEB_PARSER
    $DEB_SCANNER
    $DEB_DETECTOR
    $DEB_DATABASE
    $DEB_DUMP
    %debug_names
    $file );
$DEB_NONE = 0;
$DEB_DUMP = 1;
$DEB_DATABASE = 2;
$DEB_DETECTOR = 4;
$DEB_PARSER = 8;
$DEB_SCANNER = 16;
%debug_names =
(
    $DEB_DATABASE => "Database",
    $DEB_DETECTOR => "Detector",
    $DEB_PARSER => "Parser",
    $DEB_SCANNER => "Scanner"
);


use Getopt::Long;
use Pod::Usage;
my ( $opt_usage, $opt_help, $opt_version, $opt_debug );
$opt_debug = 0;
Getopt::Long::Configure( "no_ignore_case" );
Getopt::Long::GetOptions(
    'questionmark|?' => \$opt_usage,
    'debug:i' => \$opt_debug,
    'help' => \$opt_help,
    'version' => \$opt_version );

print( "Version: $VERSION\n" ) && exit( 0 ) if( $opt_version );
pod2usage( -exitval => 0, -verbose => 2 ) if( $opt_help );
pod2usage( 1 ) if( $opt_usage or ( $#ARGV < 0 && -t ));


####### Error & debug functions #########

sub dump_struct
{
    my ( $struct, $prefix ) = @_;

    sub dump_value
    {
        my ( $prefix, $value ) = @_;
        $value =~ s/\n/\\n/go;
        print( STDERR $prefix, "$value\n" );
    }
   
    $prefix =~ /^(.*)\.$/ || $prefix =~ /^(.*)$/;
    dump_value( $1.": ", $struct );
   
    if( ref $struct eq "HASH" )
    {
        KEY: foreach my $key ( keys %$struct )
        {
            my $value = $struct->{$key};
            if( $key =~ /^(?:scope|base)$/ )
            {
                $value .= " ==> ".
                    (exists $value->{name} ? $value->{name} : "undef");
                dump_value( $prefix.$key.": ", $value );
                next;
            }
            for( ref $value )
            {
                /HASH/  && dump_struct( $value, $prefix.$key."." ) && next KEY;
                /ARRAY/ && dump_struct( $value, $prefix.$key ) && next KEY;
                /.*/    && dump_value( $prefix.$key.": ", $value ) && next KEY;
            }
        }
    }
    elsif( ref $struct eq "ARRAY" )
    {
        I: foreach my $i ( 0 .. $#$struct )
        {
            my $value = $struct->[$i];
            for( ref $value )
            {
                /HASH/  && dump_struct( $value, $prefix."[$i]." ) && next I;
                /ARRAY/ && dump_struct( $value, $prefix."[$i]" ) && next I;
                /.*/    && dump_value( $prefix."[$i]: ", $value ) && next I;
            }
        }
    }
    1;
}

sub debug_msg
{
    my ( $flag, $msg ) = @_;
    print( STDERR $debug_names{$flag}." ($.): $msg\n" )
        if( $opt_debug & $flag );
}

sub syntax_err
{
    print( STDERR $file->{name}." $.: Syntax: @_\n" );
    dump_struct( $file, "FILE." ) if( $opt_debug & $DEB_DUMP );
    exit( 3 );
}

sub warning
{
    print( STDERR $file->{name}." $.: Warning: @_\n" );
}


############ Scanner ####################

use vars qw( @scan_mode_names $scan_mode $string_type );
use vars qw( $S_CODE $S_COMMENT $S_DOC_COMMENT $S_LINE_COMMENT $S_STRING );
# general scanner modes
@scan_mode_names = qw( CODE COMMENT DOC_COMMENT LINE_COMMENT STRING );
$S_CODE = 0;
$S_COMMENT = 1;
$S_DOC_COMMENT = 2;
$S_LINE_COMMENT = 3;
$S_STRING = 4;
$scan_mode = $S_CODE;
$string_type = "";

use vars qw( $identifier $prototype $interface );
$identifier = "[a-zA-Z_]\\w*";

use vars qw( $cur_line @token_patterns $newline_pattern );
# lexer
$cur_line = "";
# recognized tokens
@token_patterns =
(
    "\\\\.",
    "@.",
    quotemeta("/**"),
    quotemeta("/*!"),
    quotemeta("*/"),
    quotemeta("/*"),
    quotemeta("//"),
    "(?:0[xX])?\\d+",
    $identifier,
    "\\s+",
    ".",
);
$newline_pattern = "[\\n\\f]";

use subs qw( switch_scan_mode );

# get next Token according to the @token_patterns array.
# Reads next line, if current line is completed.
sub next_token
{
    my ( $token, $token_pattern, $pattern );
    local $_;

    while( $cur_line eq "" )
    {
        $cur_line = <>;
        $cur_line =~ s/\r//g; # Bug of Perl 5.6.1 for Cygwin on text mounts
        return if(( not $cur_line ) and eof );
    }
   
    if( $cur_line ne "" )
    {
        foreach $token_pattern( @token_patterns )
        {
            if( $cur_line =~ s/^($token_pattern)// )
            {
                $token = $1;
                $pattern = $token_pattern;
                last;
            }
        }
   
        switch_scan_mode( $token );
        if( $opt_debug & $DEB_SCANNER )
        {
            $_ = $token;
            s/\n/\\n/go;
            debug_msg( $DEB_SCANNER, "'$_' ~ '$pattern' "
                .$scan_mode_names[$scan_mode] );
        }
    }

    $token;
}

# get next Token according to the @token_patterns array,
# which is not white-space.
# Reads next line, if current line is completed.
sub next_none_ws_token
{
    my $token = next_token();
    $token = next_token() while( $token =~ /^\s+/ );
    $token;
}

sub skip_line
{
    while( next_token() !~ /^$newline_pattern/ ) {};
    next_token() while( $cur_line =~ /^$newline_pattern/ );
}
 
# handle $scan_mode properly
# recognize comments and strings
sub switch_scan_mode
{
    my $token = shift;

    if( $token ne "" )
    {
        # recognize the mode endings
        if(( $scan_mode == $S_COMMENT ) || ( $scan_mode == $S_DOC_COMMENT ))
        {
            $scan_mode = $S_CODE if( $token eq "*/" );
        }
        elsif( $scan_mode == $S_LINE_COMMENT )
        {
            $scan_mode = $S_CODE if( $token =~ /$newline_pattern/ );
        }
        elsif( $scan_mode == $S_STRING )
        {
            syntax_err( "Unterminated string literal." )
                if( $token =~ /$newline_pattern/ );
            if( $token eq $string_type )
            {
                $string_type = "";
                $scan_mode = $S_CODE;
            }
        }
        # recognize the mode startings
        elsif( $token eq "/*" )
        {
            $scan_mode = $S_COMMENT;
        }
        elsif(( $token eq "/**" ) or ( $token eq "/*!" ))
        {
            $scan_mode = $S_DOC_COMMENT;
        }
        elsif( $token eq "//" )
        {
            $scan_mode = $S_LINE_COMMENT;
        }
        elsif( $token =~ /^[\'\"]$/ )
        {
            $scan_mode = $S_STRING;
            $string_type = $&;
        }
    }
}


############ Parser #####################

use vars qw(
    @parser_stack
    @token_queue
    $last_doc
    @object_type_names );
@parser_stack = ();
@token_queue = ();
@object_type_names = qw(
    FILE
    VARIABLE
    FUNCTION
    CLASS
    INTERFACE
    MEMBER_VARIABLE
    STATIC_MEMBER_VARIABLE
    MEMBER_FUNCTION
    CONSTRUCTOR
);
$object_type_names[-1] = "UNDEF";
use vars qw(
    $OT_UNKNOWN
    $OT_FILE
    $OT_VARIABLE
    $OT_FUNCTION
    $OT_CLASS
    $OT_INTERFACE
    $OT_MEMBERVAR
    $OT_MEMBERSVAR
    $OT_MEMBERFUNC
    $OT_CONSTRUCTOR
);
$OT_UNKNOWN = -1;
$OT_FILE = 0;
$OT_VARIABLE = 1;
$OT_FUNCTION = 2;
$OT_CLASS = 3;
$OT_INTERFACE = 4;
$OT_MEMBERVAR = 5;
$OT_MEMBERSVAR = 6;
$OT_MEMBERFUNC = 7;
$OT_CONSTRUCTOR = 8;

use subs qw( parse next_parser_token parse_interface );

sub parse_string
{
    my $token = shift;
    $token .= next_token() while( $scan_mode == $S_STRING );
    $token;
}

sub parse_comment
{
    my $token;
    $token = next_token()
        while(   ( $scan_mode == $S_COMMENT )
              || ( $scan_mode == $S_LINE_COMMENT ));
    $token;
}

sub parse_doc_comment
{
    my $token = "/**";
    my $doc = { text => "" };
    my $master_doc = $doc;
    local $_;

    sub parse_type
    {
        local $_;
        my $token;
       
        $_ = next_none_ws_token();
        if( /[\'\"]/ )
        {
            my $type = $_;
            my $string;
            while(( $token = next_token()) ne $type )
            {
                syntax_err( "Unterminated string literal." )
                    if( $token =~ /$newline_pattern/ );
                $string .= $token;
            }
            $_ = $string;
        }
        elsif( /^$identifier$/ )
        {
            $_ = $_.$token while(( $token = next_token()) !~ /^\s+/ );
        }
        else
        {
            syntax_err( "Identifier or string literal expected" );
        }

        ( $_, $token );
    }

    LOOP: while( $scan_mode == $S_DOC_COMMENT )
    {
        if( $token =~ /(?:\\|@)/ )
        {
            $_ = $token.next_token();
           
            if( not exists $doc->{otype} )
            {
                $doc->{otype} = $OT_FILE if( /^(?:\\|@)$identifier$/ );
                $doc->{otype} = $OT_FUNCTION if( /^(?:\\|@)fn$/ );
                $doc->{otype} = $OT_INTERFACE if( /^(?:\\|@)interface$/ );
                $doc->{otype} = $OT_CLASS if( /^(?:\\|@)class$/ );
                $doc->{otype} = $OT_VARIABLE if( /^(?:\\|@)var$/ );
                $doc->{otype} = $OT_UNKNOWN if( /^(?:\\|@)internal$/ );
                if( /^(?:\\|@)ctor$/ )
                {
                    $doc->{text} =~ s/^(.+[\n]+)[^\n]+$/\1/s;
                    $doc->{otype} = $OT_CONSTRUCTOR;
                    skip_line();
                    $token = next_token();
                    next;
                }
            }
            else
            {
                /^(?:\\|@)type$/ && do
                {
                    warning( "Return type already defined!" )
                        if( exists $doc->{rtype} );
                    $doc->{text} =~ s/^(.+[\n]+)[^\n]+$/\1/s;
                    ( $doc->{rtype}, $token ) = parse_type();
                    skip_line() if( $token !~ /^$newline_pattern/ );
                    $token = next_token();
                    next LOOP;
                };
                /^(\\|@)treturn$/ && do
                {
                    warning( "Return type already defined!" )
                        if( exists $doc->{rtype} );
                    my $comment = $1;
                    ( $doc->{rtype}, $token ) = parse_type();
                    $_ = $comment."return $token";
                };
                /^(\\|@)tparam$/ && do
                {
                    my $comment = $1;
                    my ( $type, $token ) = parse_type();
                    syntax_err( "Missing identifier" )
                        if( $token =~ /^$newline_pattern/ );
                    my $param = next_none_ws_token();
                    syntax_err( "Identifier expected" )
                        if( $param !~ /^$identifier$/ );
                    $doc->{args}{$param} = $type;
                    $_ = $comment."param $param";
                };
                /^(?:\\|@)ctor$/ && do
                {
                    $doc->{text} .= "*/\n";
                    $doc->{ctor} = { text => "/**\n", otype => $OT_UNKNOWN };
                    $doc = $doc->{ctor};
                    skip_line();
                    $token = next_token();
                    next LOOP;
                };
                /^(?:\\|@)docgen$/ && do
                {
                    my $line;
                    $token = next_token();
                    while( $scan_mode == $S_DOC_COMMENT )
                    {
                        $line .= $token if( $token !~ /$newline_pattern/ );
                        $token = next_token();
                    }
                    $cur_line = $line.$cur_line;
                    last LOOP;
                };
            }
           
            $doc->{text} .= $_;
        }
        else
        {
            $doc->{otype} = $OT_UNKNOWN
                if(    ( not exists $doc->{otype} )
                    && ( $token =~ /^$identifier$/ ));
            $doc->{text} .= $token;
        }
   
        $token = next_token();
    }
    $doc->{text} .= "*/\n";
    debug_msg( $DEB_PARSER, "Document for type "
        .$object_type_names[$doc->{otype}] );
    $last_doc = $master_doc;
}

sub parse_code
{
    my $token;
    while(( $token = (  $#parser_stack >= 0
                      ? pop( @parser_stack )
                      : next_none_ws_token())) ne "" )
    {
        syntax_err( "Unexpected documentation comment." )
            if( $scan_mode == $S_DOC_COMMENT );

        parse_comment(), next
            if(   ( $scan_mode == $S_COMMENT )
               || ( $scan_mode == $S_LINE_COMMENT ));

        unshift( @token_queue, $token );
        pop( @token_queue ) if( $#token_queue > 10 );

        last;
    }
    debug_msg( $DEB_PARSER, "'$token' ".$scan_mode_names[$scan_mode] );
    $token;
}

sub next_parser_token
{
    my $token;
    my $struct = "";

    while(( $token = (  $#parser_stack >= 0
                      ? pop( @parser_stack )
                      : next_none_ws_token())) ne "" )
    {
        parse_comment(), next
            if(   ( $scan_mode == $S_COMMENT )
               || ( $scan_mode == $S_LINE_COMMENT ));

        if( $scan_mode == $S_CODE )
        {
            if( $token =~ /^$identifier$/ )
            {
                my $debug = $opt_debug;
                $opt_debug &= ~$DEB_PARSER;
               
                $struct .= $token;
                while(( $token = parse_code()) eq "." )
                {
                    shift( @token_queue );
                    $struct .= $token;
                    $token = parse_code();
                    if( $token =~ /^$identifier$/ )
                    {
                        $struct .= $token;
                    }
                    else
                    {
                        $struct =~ s/^(.*)\.$/\1/;
                        shift( @token_queue );
                        push( @parser_stack, "." );
                        last;
                    }
                }
                shift( @token_queue );
                push( @parser_stack, $token );
                $token = $struct;

                $opt_debug = $debug;
            }
            last;
        }
        elsif( $scan_mode == $S_STRING )
        {
            $token = parse_string( $token );
            last;
        }
        elsif( $scan_mode == $S_DOC_COMMENT )
        {
            last;
        }
    }

    unshift( @token_queue, $token );
    pop( @token_queue ) if( $#token_queue > 10 );
   
    debug_msg( $DEB_PARSER, "'$token' ".$scan_mode_names[$scan_mode] );
    $token;
}

sub parse_variable
{
    my $context = shift;
    debug_msg( $DEB_DETECTOR, "Find Variable in '".$context->{name}."'." );
    my $token = parse_code();

    if( $context->{otype} == $OT_FILE )
    {
        syntax_err( "Variable name expected, found '$token'." )
            if( $token !~ /^$identifier$/ );

        $context->{objs}{$token} =
        {
            name => $token,
            otype => $OT_VARIABLE,
            scope => $context
        };
        my $varContext = $context->{objs}{$token};
        debug_msg( $DEB_DATABASE, "Variable '$token'" );
        if( $last_doc )
        {
            if( $last_doc->{otype} == $OT_UNKNOWN )
            {
                if( exists $varContext->{doc} )
                {
                    warning( "Comment for '$token' already exists,"
                        ." ignoring new." );
                }
                else
                {
                    $varContext->{doc} = $last_doc;
                    debug_msg( $DEB_PARSER, "Comment for variable '$token'." );
                }
            }
        }
    }
    debug_msg( $DEB_DETECTOR, "Found Variable in '".$context->{name}."'." );
    $last_doc = undef;
    ";";
}

sub parse_this
{
    my ( $context, $token ) = @_;

    debug_msg( $DEB_DETECTOR, "Find member variable in '"
        .$context->{name}."' with token '$token'." );

    if( $token =~ s/^this\.($identifier)$/\1/ )
    {
        if( parse_code() ne "=" )
        {
            debug_msg( $DEB_DETECTOR, "Not found member variable in '"
                .$context->{name}."' with token '$token'." );
            return;
        }
       
        if( not exists $context->{members}{$token} )
        {
            $context->{members}{$token} =
            {
                name => $token,
                otype => $OT_MEMBERVAR,
                scope => $context
            };
           
            debug_msg( $DEB_DATABASE,
                 "Added member variable '$token' to class '"
                .$context->{name}."'." );
        }
        if( $last_doc )
        {
            if( exists $context->{members}{$token}{doc} )
            {
                warning( "Comment for '$token' already exists, ignoring new." );
            }
            else
            {
                $context->{members}{$token}{doc} = $last_doc;
                debug_msg( $DEB_DATABASE,
                    "Comment for member variable '$token'." );
            }
        }
        $last_doc = undef;
    }

    debug_msg( $DEB_DETECTOR, "Found Member variable in '"
        .$context->{name}."'." );
}

sub parse_function
{
    my $context = shift;
    local $_;

    debug_msg( $DEB_DETECTOR, "Find Function Definition in '"
        .$context->{name}."'." );
   
    if( $#token_queue > 1 && $token_queue[1] !~ /(?:^[{}=;]$|^\/\*|^\/\/)/ )
    {
        #dump_struct( \@token_queue, "Stack" );
        #warning( "Function Definition cannot follow '".$token_queue[1]."'." );
        debug_msg( $DEB_DETECTOR, "No Function Definition can follow '"
            .$token_queue[1]."'." );
        return;
    }
   
    my $name;
    my $token = parse_code();
    if( $token ne "(" )
    {
        syntax_err( "Function name expected, found '$token'." )
            if( $token !~ /^$identifier$/ );
        $name = $token;
        $token = parse_code();
    }
    else
    {
        $context->{anonymous} = 0 if( not exists $context->{anonymous} );
        $name = "?".($context->{anonymous}++);
    }

    my $fnContext;
    if( not exists $context->{objs}{$name} )
    {
        $context->{objs}{$name} =
        {
            name => $name,
            otype => $OT_FUNCTION,
            scope => $context
        };
        $fnContext = $context->{objs}{$name};
    }
    else
    {
        $fnContext = $context->{objs}{$name};
        syntax_err( "Function or class expected, found '".
                $object_type_names[$fnContext->{otype}]."'" )
            if(    $fnContext->{otype} != $OT_FUNCTION
                && $fnContext->{otype} != $OT_CLASS );
        delete $fnContext->{unknown}
            if( exists $fnContext->{unknown} );
    }
    debug_msg( $DEB_DATABASE, "Added "
        .( $name =~ /^\?/ ? "anonymous " : "" )."function '$name'." );
    if( $last_doc )
    {
        if( $last_doc->{otype} == $OT_UNKNOWN )
        {
            if( exists $fnContext->{doc} )
            {
                warning( "Comment for '$name' already exists, ignoring new." );
            }
            else
            {
                $fnContext->{doc} = $last_doc;
                debug_msg( $DEB_DATABASE, "Comment for function '$name'." );
            }
        }
        if( $last_doc->{otype} == $OT_CONSTRUCTOR )
        {
            if( exists $fnContext->{ctor} )
            {
                warning( "Constructor comment for '$name'"
                    ." already exists, ignoring new." );
            }
            else
            {
                $fnContext->{ctor} = $last_doc;
                debug_msg( $DEB_DATABASE, "Comment for constructor '$name'." );
            }
        }
        $last_doc = undef;
    }

    syntax_err( "'(' expected, found '$token'." ) if( $token ne "(" );
    $fnContext->{args} = [];
    while(( $token = parse_code()) ne ")" )
    {
        next if( $token eq "," );
        syntax_err( "Function parameter name expected, found '$token'." )
            if( $token !~ /^$identifier$/ );
        push( @{$fnContext->{args}}, { name => $token } );
    }

    syntax_err( "'{' expected, found '$token'." )
        if(( $token = parse_code ) ne "{" );

    my $objs = $fnContext->{objs};
    push( @{$fnContext->{symbol_stack}}, $objs );
    delete $fnContext->{objs};
    $fnContext->{objs}{$_} = $objs->{$_} foreach ( keys %$objs );
    parse( $fnContext );
    delete $fnContext->{objs};
    $fnContext->{objs} = pop( @{$fnContext->{symbol_stack}} );

    debug_msg( $DEB_DETECTOR, "Found Function Definition in '"
        .$context->{name}."'." );

    $name;
}

sub create_base
{
    my ( $context, $base ) = @_;
    my $scope = $context;
    while( $scope && ( not exists $scope->{objs}{$base} ))
    {
        $context = $scope;
        $scope = $scope->{scope};
    }  
    if( not $scope )
    {
        $context->{objs}{$base} =
        {
            name => $base,
            otype => $OT_CLASS,
            scope => $context,
            unknown => 1
        };
        $scope = $context;
        debug_msg( $DEB_DATABASE, "Added missing base class '$base'." );
    }
    return $scope;
}

sub create_static_var
{
    my ( $context, $member ) = @_;
    syntax_err( "Static '$member' already defined as type '"
            .$object_type_names[$context->{members}{$member}{otype}]."'." )
        if(   exists $context->{members}{$member}
           && $context->{members}{$member}{otype} != $OT_MEMBERVAR
           && $context->{members}{$member}{otype} != $OT_MEMBERSVAR );
    $context->{members}{$member} = { otype => $OT_MEMBERSVAR };
    debug_msg( $DEB_DATABASE, "Added static member variable '$member'." );
}

sub find_member
{
    my ( $context, $member ) = @_;
    my $scope;

    $member =~ s/^($identifier)(\.prototype\.(.*))?$/\1/;
    my $struct = $3;

    syntax_err( $context->{name}." is a '".
            $object_type_names[$context->{otype}]."', but not a class" )
        if( $context->{otype} != $OT_CLASS );

    if( not $struct )
    {
        $scope = $context->{members}{$member}
            if( exists $context->{members}{$member} );

        $scope = find_member( $context->{base}, $member )
            if(( not $scope ) && ( exists $context->{base} ));
    }
    else
    {
        $scope = $context->{objs}{$member}
            if(   ( exists $context->{objs} )
               && ( exists $context->{objs}{$member} ));

        if( not $scope )
        {
            $scope = find_member( $context->{base},
                                  "$member.prototype.$struct" )
                if(( not $scope ) && ( exists $context->{base} ));
        }
        else
        {
            $scope = find_member( $scope, $struct );
        }
    }
   
    return $scope;
}

sub parse_prototype
{
    my $context = shift;
    my $token;
    my $name;
    my $member;
    my $fnContext;
    local $_;
   
    $_ = shift;
    debug_msg( $DEB_DETECTOR, "Find Prototype Definition in '"
        .$context->{name}."' with token '$_'." );
    if( parse_code() ne "=" )
    {
        debug_msg( $DEB_DETECTOR, "Not found Prototype Definition in '"
            .$context->{name}."' with token '$_'." );
        return;
    }

       s/^($identifier)\.prototype$//
    || s/^($identifier)\.prototype\.(.*)$/\2/
    || syntax_err( "No a valid identifier '$1' for prototype definition." );

    $name = $1;
   
    if(   ( not exists $context->{objs}{$name} )
       && ( exists $context->{members}{$name} ))
    {
        syntax_err( "Wrong prototype assignment to '$name' of type "
                .$object_type_names[$context->{members}{$name}{otype}]."." )
            if( $context->{members}{$name}{otype} != $OT_MEMBERFUNC );
        $context->{objs}{$name} = $context->{members}{$name};
        delete $context->{members}{$name};
        $context->{objs}{$name}{otype} = $OT_CLASS;
        debug_msg( $DEB_DATABASE, "'$name' is a nested class." );
    }
    if( exists $context->{objs}{$name} )
    {
        $fnContext = $context->{objs}{$name};
    }
    else
    {
        $fnContext = create_base( $context, $name );
        $fnContext = $fnContext->{objs}{$name};
    }
    $fnContext->{otype} = $OT_CLASS if( $fnContext->{otype} == $OT_FUNCTION );
    syntax_err( "Prototype assignment to invalid type '"
            .$object_type_names[$fnContext->{otype}]."'." )
        if(   ( $fnContext->{otype} != $OT_CLASS )
           && ( $fnContext->{otype} != $OT_INTERFACE ));
    debug_msg( $DEB_DATABASE, "'$name' is a class." );

    /^.+\.prototype/ && do
        {
            push( @parser_stack, "=" );
            parse_prototype( $fnContext, $_ );
            debug_msg( $DEB_DETECTOR, "Found Nested Prototype Definition in '"
                .$context->{name}."'." );
            return;
        };
    /^.+\.fulfills$/ && do
        {
            push( @parser_stack, "=" );
            parse_interface( $fnContext, $_ );
            debug_msg( $DEB_DETECTOR, "Found Nested Interface Definition in '"
                .$context->{name}."'." );
            return;
        };
    !/^$identifier$/ and $_ and do
        {
            warning( "Unknown code construction '$_'"
                ." in prototype definition of '$name'." );
            while( parse_code() ne ";" ) {}
            $last_doc = undef;
            debug_msg( $DEB_DETECTOR, "Not found Prototype Definition in '"
                .$context->{name}."'." );
            return;
        };
   
    $member = $_;
    if( $member eq "" )
    {
        syntax_err( "'new' expected, found '$token'." )
            if(( $token = parse_code()) ne "new" );
        syntax_err( "Identifier expected, found '$token'." )
            if(( $token = parse_code()) !~ /^($identifier)$/ );
        my $base = $1;
        while(( $token = parse_code ) =~ /[()]/ ) {}
        syntax_err( "';' expected, found '$token'." ) if( $token ne ";" );
       
        my $scope = create_base( $context, $base );
        $scope->{objs}{$base}{otype} = $OT_CLASS
            if( $scope->{objs}{$base}{otype} == $OT_FUNCTION );
        syntax_err( "'$base' is not of type class, but of type '"
                .$object_type_names[$scope->{objs}{$base}{otype}]."'." )
            if( $scope->{objs}{$base}{otype} != $OT_CLASS );
        $fnContext->{base} = $scope->{objs}{$base};
        debug_msg( $DEB_DATABASE, "Set '$base' as base for class '$name'." );
        if( $last_doc )
        {
            if( exists $fnContext->{doc} )
            {
                warning( "Comment for '$name' already exists, ignoring new." );
            }
            else
            {
                $fnContext->{doc} = $last_doc;
                debug_msg( $DEB_DATABASE, "Comment for class '$name'." );
            }
        }
        $last_doc = undef;
    }
    else
    {
        my $doc = $last_doc;
        $last_doc = undef;
       
        if(( $token = parse_code()) =~ /^$identifier$/ )
        {
            my $base = $token;
            my $end = 1;
            if( $base eq "function" )
            {
                $base = parse_function( $context );
                $end = 0;
            }
            else
            {
                while( $_ = parse_code())
                {
                    /^;$/           && ( $end = 0, last );
                    /^\.$/          && $token =~ /$identifier$/
                                    && ( $token .= $_, next );
                    /^prototype$/   && $token !~ /\.prototype\.$/
                                    && $token =~ /\.$/
                                    && ( $token .= $_, next );
                    /^$identifier$/ && $token =~ /\.prototype\.$/
                                    && !/^prototype$/
                                    && ( $token .= $_, next );
                    $base = "???";
                    #syntax_err( "Unexpected tokens '$token' and '$_'"
                    #   ." in prototype assignment" );
                }
            }
            my $scope = $context;
            $scope = $scope->{scope}
                while( $scope and ( not exists $scope->{objs}{$base} ));
            if( not $scope )
            {
                create_static_var( $fnContext, $member );
                $end and ( $token = parse_code()) ne ";";
            }
            else
            {
                $scope = $scope->{objs}{$base};
                if( $token =~ /\./ )
                {
                    $token =~ s/^$base\.prototype\.(.*)$/\1/;
                    $scope = find_member( $scope, $token );
                }
                else
                {
                    $scope->{otype} = $OT_MEMBERFUNC
                        if( $scope->{otype} == $OT_FUNCTION );
                    $scope->{otype} = $OT_MEMBERSVAR
                        if( $scope->{otype} == $OT_MEMBERVAR );
                    syntax_err( "$base is a '"
                            .$object_type_names[$scope->{otype}]
                            ."' and not a member." )
                        if(   ( $scope->{otype} != $OT_MEMBERFUNC )
                           && ( $scope->{otype} != $OT_MEMBERSVAR )
                           && ( $fnContext->{base} != $scope ));
                }
                if( $fnContext->{base} != $scope )
                {
                    debug_msg( $DEB_DATABASE, "'$member' is a "
                       .(  $scope->{otype} == $OT_MEMBERSVAR
                         ? "static "
                         : "")."member "
                       .(  $scope->{otype} == $OT_MEMBERFUNC
                         ? "function"
                         : "variable")." with global name '"
                       .$scope->{name}."'." );
                    $fnContext->{members}{$member} = $scope;
                }
                syntax_err( "';' expected, found '$token'." )
                    if( $end and ( $token = parse_code()) ne ";" );
            }
        }
        else
        {
            create_static_var( $fnContext, $member );
            while( parse_code() ne ";" ) {}
        }
       
        if( $doc && exists $fnContext->{members}{$member})
        {
            if( exists $fnContext->{members}{$member}{doc} )
            {
                warning( "Comment for '$member' already exists,".
                    " ignoring new." );
            }
            else
            {
                $fnContext->{members}{$member}{doc} = $doc;
                debug_msg( $DEB_DATABASE, "Comment for member '$member'." );
            }
        }
    }
    debug_msg( $DEB_DETECTOR, "Found Prototype Definition in '"
        .$context->{name}."'." );
}

sub parse_interface
{
    my $context = shift;
    my $token;
    local $_;
   
    $_ = shift;
    debug_msg( $DEB_DETECTOR, "Find possible Interface in '"
        .$context->{name}."' with token '$_'." );

       /^($identifier)\.fulfills$/
    or do
        {
            warning( "Interface definition '$_' not supported." );
            $last_doc = undef;
            debug_msg( $DEB_DETECTOR, "Not found Interface in '"
                .$context->{name}."' with token '$_'." );
            return;
        };
   
    my $name = $1;
   
    if(( $token = parse_code()) ne "(" )
    {
        warning( "'(' expected, found '$token'." );
        debug_msg( $DEB_DETECTOR, "Not found Interface in '"
            .$context->{name}."'." );
        return;
    }
    if( not exists $context->{objs}{$name} )
    {
        warning( "Prototype fulfillment, but no constructor of $name." );
        debug_msg( $DEB_DETECTOR, "Not found Interface in '"
            .$context->{name}."'." );
        return;
    }
    my $fnContext = $context->{objs}{$name};
    $fnContext->{fulfills} = {};
    while(( $token = parse_code()) ne ")" )
    {
        next if( $token eq "," );
        if(( $token !~ /^$identifier$/ ) || ( $token =~ /^(?:new|delete)$/ ))
        {
            warning( "Interface name expected, found '$token'." );
            debug_msg( $DEB_DETECTOR, "Not found Interface in '"
                .$context->{name}."'." );
            return;
        }
       
        my $scope = create_base( $context, $token );
        $scope = $scope->{objs}{$token};
        $scope->{otype} = $OT_INTERFACE
            if( $scope->{otype} == $OT_CLASS );
        syntax_err( "$token is a '"
                .$object_type_names[$scope->{otype}]."', but not a class." )
            if( $scope->{otype} != $OT_INTERFACE );
        debug_msg( $DEB_DATABASE, "'$token' is an interface." );
       
        $fnContext->{fulfills}{$token} = $scope;
        debug_msg( $DEB_DATABASE, "'$name' implements '$token'." );
    }
    debug_msg( $DEB_DETECTOR, "Found Interface in '".$context->{name}."'." );
}

sub parse
{
    my $context = shift;
    my $level = 0;
    my $token;
    local $_;

    PARSE: while(( $token = next_parser_token()) ne "" )
    {
        if( $scan_mode == $S_CODE )
        {
            for( $token )
            {
                /^}$/              
                    && do { last PARSE if( --$level < 0 ); };
                /^{$/              
                    && do { ++$level; next; };
                /^var$/ && $level == 0
                    && do { parse_variable( $context ); next; };
                /^this\./          
                    && do { parse_this( $context, $token ); next; };
                /^function$/        
                    && do { parse_function( $context ); next; };
                /^.+\.prototype/    
                    && do { parse_prototype( $context, $token ); next; };
                /^.+\.fulfills$/    
                    && do { parse_interface( $context, $token ); next; };
            }
        }
        elsif( $scan_mode == $S_DOC_COMMENT )
        {
            parse_doc_comment();
            if(   $last_doc->{otype} == $OT_FILE
               || $last_doc->{otype} == $OT_CLASS
               || $last_doc->{otype} == $OT_INTERFACE
               || $last_doc->{otype} == $OT_VARIABLE )
            {
                $file->{doc} = [] if( not exists $file->{doc} );
                push( @{$file->{doc}}, $last_doc->{text} );
                $last_doc = undef;
            }
        }
    }

    syntax_err( "Unbalanced '}' found." ) if( $level < -1 );
    syntax_err( "EOF found. '}' expected." )
        if( $level >= 0 && $context->{otype} != $OT_FILE );

    for( $context->{otype} )
    {
        /^$OT_FUNCTION$/ && do
        {
            $context->{otype} = $OT_CLASS
                if(   ( exists $context->{ctor} )
                   || (   ( exists $context->{doc} )
                       && ( exists $context->{doc}{ctor} )));
        }
    }
}


############ output #####################

my $indent = "\t";

sub generate_file_docs
{
    my $docs = shift;
    local $_;
    print( $docs->[$_]."\n" ) foreach ( 0 .. $#$docs );
}

sub generate_forward_classes
{
    my ( $objects, $pref ) = @_;
    local $_;
    for( keys %$objects )
    {
        next if( !/^$identifier$/ );
        print( $pref."class $_;\n" )
            if( $objects->{$_}{otype} == $OT_CLASS );
        print( $pref."class $_;\n" )
            if( $objects->{$_}{otype} == $OT_INTERFACE );
    }
}

sub generate_function
{
    my ( $func, $name, $pref, $otype ) = @_;
    my $delim = "";
    my $rtype = "void";
    my $argtypes = undef;
    my $doc;
    my $ctor;
    my $npref;
   
    $npref = $1 if( $name =~ s/^($identifier\::)($identifier)$/\2/ );
    return if( $name !~ /^$identifier$/ );
    $doc = $func->{doc}
        if(   exists $func->{doc}
           && (   $func->{otype} == $OT_FUNCTION
               || $func->{otype} == $OT_MEMBERFUNC ));
    $ctor = $func->{ctor}
        if(   exists $func->{ctor}
           && (   $func->{otype} == $OT_CLASS
               || $func->{otype} == $OT_INTERFACE ));
    $ctor = $func->{doc}{ctor}
        if(   exists $func->{doc}
           && exists $func->{doc}{ctor}
           && (   $func->{otype} == $OT_CLASS
               || $func->{otype} == $OT_INTERFACE ));
    if( $doc )
    {
        syntax_err( "Documentation for $npref$name is not for a function." )
            if(   $doc->{otype} != $func->{otype}
               && $doc->{otype} != $OT_UNKNOWN );
        print( "\n".$doc->{text} );
        $rtype = $doc->{rtype} if( exists $doc->{rtype} );
        $argtypes = $doc->{args} if( exists $doc->{args} );
    }
    if( $ctor )
    {
        syntax_err( "Documentation for $npref$name is not for a constructor." )
            if(   $ctor->{otype} != $OT_CONSTRUCTOR
               && $ctor->{otype} != $OT_UNKNOWN );
        print( "\n".$ctor->{text} );
        $rtype = "void";
        $argtypes = $ctor->{args} if( exists $ctor->{args} );
    }
    my $virtual = $otype == $OT_INTERFACE ? "virtual " : "";
    print( $pref.$virtual."$rtype $npref$name(" );
    for my $arg( @{$func->{args}} )
    {
        my $argtype = ( $argtypes and ( exists $argtypes->{$arg->{name}} ))
            ? $argtypes->{$arg->{name}} : "void";
        print( $delim."$argtype ", $arg->{name} );
        $delim = ", ";
    }
    print( ") { ", $rtype eq "void" ? "" : "return ($rtype)0; ", "}\n" );
}

sub generate_variable
{
    my ( $var, $name, $pref ) = @_;
    my $npref;

    $npref = $1 if( $name =~ s/^($identifier\::)($identifier)$/\2/ );
    return if( $name !~ /^$identifier$/ );
    my $rtype = "int";
    if( exists $var->{doc} )
    {
        syntax_err( "Documentation for $npref$name is not for a variable." )
            if(   $var->{doc}{otype} != $var->{otype}
               && $var->{doc}{otype} != $OT_UNKNOWN );
        print( "\n".$var->{doc}{text} );
        $rtype = $var->{doc}{rtype} if( exists $var->{doc}{rtype} );
    }
    print( $pref."$rtype $npref$name;\n" );
}

sub generate_class
{
    my ( $context, $name, $pref ) = @_;
    local $_;
   
    return if( $name !~ /^$identifier$/ );
    if( exists $context->{unknown} )
    {
        for( keys %{$context->{members}} )
        {
            my $member = $context->{members}{$_};
            generate_function( $member, "$name\::$_", $pref, $context->{otype} )
                if( $member->{otype} == $OT_MEMBERFUNC );
            generate_variable( $member, "$name\::$_", $pref."static " )
                if( $member->{otype} == $OT_MEMBERSVAR );
        }
    }
    else
    {
        my $delim = " : ";
        my $type = "class ";
       
        #$type = "interface " if( $context->{otype} == $OT_INTERFACE );
        if( exists $context->{doc} )
        {
            syntax_err( "Documentation for $name is not for a $type." )
                if(   $context->{doc}{otype} != $context->{otype}
                   && $context->{doc}{otype} != $OT_UNKNOWN );
            print( "\n".$context->{doc}{text} );
        }
        print( $pref.$type.$name );
        if( exists $context->{base} )
        {
            print( $delim, "public ", $context->{base}{name} );
            $delim = ", ";
        }
        for my $if( keys %{$context->{fulfills}} )
        {
            print( $delim, "protected $if" );
            $delim = ", ";
        }
        print( "\n$pref"."{\n" );
        print( "$pref"."public:\n" );
        generate_forward_classes( $context->{objs}, $pref.$indent );
        for( keys %{$context->{objs}} )
        {
            my $obj = $context->{objs}{$_};
            generate_class( $obj, $_, $pref.$indent )
                if(   $obj->{otype} == $OT_CLASS
                   || $obj->{otype} == $OT_INTERFACE );
        }
        generate_function( $context, $name, $pref.$indent, $context->{otype} );
        for( keys %{$context->{members}} )
        {
            my $member = $context->{members}{$_};
            generate_function( $member, $_, $pref.$indent, $context->{otype} )
                if( $member->{otype} == $OT_MEMBERFUNC );
            generate_variable( $member, $_, $pref.$indent )
                if( $member->{otype} == $OT_MEMBERVAR );
            generate_variable( $member, $_, $pref.$indent."static " )
                if( $member->{otype} == $OT_MEMBERSVAR );
        }
        print( "$pref};\n\n" );
    }
}

sub generate
{
    sub generate;
    local $_;

    my ( $context, $name, $pref ) = @_;
    for( $context->{otype} )
    {
        /^$OT_FILE$/ && do
        {
            print( "\n" );
            generate_file_docs( $context->{doc} )
                if( exists $context->{doc} );
            generate_forward_classes( $context->{objs}, "" );
            generate( $context->{objs}{$_}, $_, "" )
                for( keys %{$context->{objs}} );
            print( "\n" );
            last;
        };
        /^$OT_FUNCTION$/ && do
        {
            generate_function( $context, $name, $pref, $OT_FUNCTION );
            last;
        };
        /^(?:$OT_CLASS|$OT_INTERFACE)$/ && do
        {
            generate_class( $context, $name, $pref );
            last;
        };
        /^$OT_VARIABLE$/ && do
        {
            generate_variable( $context, $name, $pref );
            last;
        };
    }
}

############ Main #######################

use vars qw( $context );

$context =
{
    name => $ARGV[0],
    otype => $OT_FILE,
    scope => undef
};
$file = $context;

parse( $context );
dump_struct( $context, "FILE." ) if( $opt_debug & $DEB_DUMP );
generate( $context );


############ Manual #####################

__END__

=head1 NAME

js2doxy - utility to convert JavaScript into something Doxygen can understand

=head1 SYNOPSIS

 js2doxy.pl < file.js > file.cpp
 js2doxy.pl [Options] file.js

 Options:

 -?     Print usage
 -d, --debug    Debug mode
 -h, --help Show manual
 -v, --version  Print version

=head1 OPTIONS

=over 8

=item B<-?>

Prints the usage of the script.

=item B<--debug>

Prints internal states to the error stream.
States are triggered by single bits:

 Bit 0: Dump (1)
 Bit 1: Database (2)
 Bit 2: Detector (4)
 Bit 3: Parser (8)
 Bit 4: Scanner (16)

=item B<--help>

Shows the manual pages of the script using perldoc.

=item B<--version>

Print the version of the utility and exits.

=back

=head1 DESCRIPTION

This program will read from standard input or from the given input file
and convert the input into pseudo C++ that can be understood by help
generator Doxygen.
The program parses the JavaScript and tries to attach the correct
documentation comments.
Any unattached comment is placed into file scope.

=head1 HELP COMMANDS

The program will accept some additional help commands to produce better C++:

=over 8

=item B<\ctor>

This command starts the description of the constructor.
It can be placed within the documentation comment for a class.
It may be used also as first command in such a comment.

=item B<\tparam TYPE PARAM COMMENT>

This command sets the type of a parameter.
It is replaced in the documentation comment with the B<\param PARAM COMMENT>
command (without the B<TYPE>).
The program will use the type information in the generated C++ code.  
It may not be the first command in a documentation comment.

=item B<\treturn TYPE COMMENT>

This command sets the return type of a function.
It is replaced in the documentation comment with the B<\return COMMENT>
command (without the B<TYPE>).
The program will use the type information in the generated C++ code.  
It may not be the first command in a documentation comment.
This comand is a short cut of the normal B<\return> command and the B<\type>
command supported by this program.

=item B<\type TYPE>

This command sets the type of a variable or the return type of a function.
It may not be the first command in a documentation comment.

=back

=head1 LIMITATIONS

The program uses internally a has map for the database.
Therefore the sequence of the identified elements is by chance and the
grouping commands of Doxygen are not supported.

The program does currently not support single line documentation blocks
or documentation blocks that *follow* the declaration:

 ///
 //!
 /**< */
 ///<
 /*!< */
 //!< */

=cut