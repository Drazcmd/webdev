exports.config = {
	allScriptsTimeout: 11000,
	specs: [ 'scenarios.js' ],
	capabilities: {
		'browserName': 'chrome'
	},
	
	directConnect: true,
	baseUrl: 'http://localhost:8080/',

	framework: 'jasmine2',
	jasmineNodeOpts: {
		defaultTimeoutInterval: 30000
	}
}
