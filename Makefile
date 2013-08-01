project=altonimbus
instance=\033[32;01m${project}\033[m

watch:
	@if ! which supervisor > /dev/null; then echo "supervisor required, installing..."; sudo npm install -g supervisor; fi
	@supervisor -w app.js,routes,lib,views,assets -n exit app.js

