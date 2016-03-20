var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json())
app.get('/post', getPost)
app.post('/post', addPost)
app.get('/', hello)

var posts = [
  { id:1, author:'Scott', body:'This is my first post'},
  { id:2, author: 'Max', body:"This is Max's post"},
  { id:3, author: 'Leo', body:"This is Leo's post"}
]

function addPost(req, res) {
    console.log('Payload received', req.body)    
    var newPost = { id: posts.length+1, author:req.connection.remoteAddress, body:req.body.body }
    posts.push(newPost)
    res.send(newPost)
}

function getPost(req, res) {
	res.send({ posts: posts })
}

function hello(req, res) {
    res.send({hello:'world'})
}

// Get the port from the environment, i.e., Heroku sets it
var port = process.env.PORT || 3000

//////////////////////////////////////////////////////
var server = app.listen(port, function() {
     console.log('Server listening at http://%s:%s', 
               server.address().address,
               server.address().port)
})
