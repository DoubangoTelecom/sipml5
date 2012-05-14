./js2doxy.pl < ../src/sipml5.js > src/sipml5.cxx

./js2doxy.pl < ../src/tinySIP/src/api/tsip_api_invite.js > src/tinySIP/src/api/tsip_api_invite.cxx
./js2doxy.pl < ../src/tinySIP/src/api/tsip_api_register.js > src/tinySIP/src/api/tsip_api_register.cxx

./js2doxy.pl < ../src/tinySIP/src/tsip_session.js > src/tinySIP/src/tsip_session.cxx
./js2doxy.pl < ../src/tinySIP/src/tsip_stack.js > src/tinySIP/src/tsip_stack.cxx


"$DOXYGEN_BIN/doxygen" ./Doxyfile