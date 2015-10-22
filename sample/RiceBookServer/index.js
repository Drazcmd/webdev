var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json())
app.post('/post', addPost)
app.get('/', hello)

function addPost(req, res) {
    console.log('Payload received', req.body)
    res.send(req.body)
}

function hello(req, res) {
    res.send('Hello World!')
}

//////////////////////////////////////////////////////
var server = app.listen(8080, function() {
     console.log('Server listening at http://%s:%s', 
               server.address().address,
               server.address().port)
})
