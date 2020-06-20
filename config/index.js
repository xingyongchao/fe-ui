var dev = require('./dev')
var build = require('./prod')

var configs = {
	dev: dev,
	build: build,
}

module.exports = function (key) {
	var config = configs[key];
	process.env.NODE_ENV = JSON.parse(config.env)
	return config;
}
