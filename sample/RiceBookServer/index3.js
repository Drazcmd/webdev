var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json())
app.get('/post', getPost)
app.post('/post', addPost)
app.get('/', hello)

function addPost(req, res) {
    console.log('Payload received', req.body)
    res.send(req.body)
}

function getPost(req, res) {
	res.send({ posts: [
		{ author:'Scott', body:'This is my first post', id: 1 },
		{ author: 'Max', body:"This is Max's post", id:2},
		{ author: 'Leo', body:"This is Leo's post", id:3}
		]})
}

function hello(req, res) {
    res.send({'hello':'world'})
}

// Get the port from the environment, i.e., Heroku sets it
var port = process.env.PORT || 3000

//////////////////////////////////////////////////////
var server = app.listen(port, function() {
     console.log('Server listening at http://%s:%s', 
               server.address().address,
               server.address().port)
})
