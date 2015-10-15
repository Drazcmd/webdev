var casper = require('casper').create({
	viewportSize: {width: 1024, height: 768}
})

casper.start('https://www.google.com', function() {
	this.echo(this.getTitle())
})

casper.run()
