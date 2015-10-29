
exports.setup = function(app) {
	app.get('/:user*?', helloUser)
}

function helloUser(req, res) {
	var user = req.params.user
	if (!user) { user = 'Somebody' }
	res.send('Hello ' + user + '!')
}