java \
-cp . \
-Djsdoc.dir=./jsdoc-toolkit \
-jar ./jsdoc-toolkit/jsrun.jar \
./jsdoc-toolkit/app/run.js \
-t=./jsdoc-toolkit/templates/jsdoc \
-r=4 \
./SIPml.js \
-d=docgen \
-D="title:SIPml Library" \
-D"index:files"

cp docgen.index.html docgen/index.html

sed -i 's/="assets/="..\/assets/g' docgen/index.html
sed -i 's/="docgen\//="/g' docgen/index.html
sed -i 's/="images/="..\/images/g' docgen/index.html

sed -i 's/Namespace /AnonymousClass /g' docgen/symbols/SIPml.Session.Configuration.html
sed -i 's/Namespace /AnonymousClass /g' docgen/symbols/SIPml.Stack.Configuration.html