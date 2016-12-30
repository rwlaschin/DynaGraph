DynaGraph
# Building the bundle.js

config: config/dev.json
command: node_modules/.bin/webpack -d --config webpack.react-components.config.js --config-file dev
command: node_modules/.bin/webpack -d --config webpack.react-components.config.js --sort-modules-by --display-modules --config-file dev
command: node_modules/.bin/webpack -p --config webpack.react-components.config.js --config-file prod

command: node_modules/.bin/webpack -d --config webpack.react-hot-loader.config.js --config-file dev
command: node_modules/.bin/webpack -d --config webpack.react-hot-loader.config.js --sort-modules-by --display-modules --config-file dev

# starting the server
config: config/dev.json
command: npm start -- -config-file dev

# run the unit tests
command: npm test

# Configs
Location config/.*
Basename of config is used for the config-file argument
