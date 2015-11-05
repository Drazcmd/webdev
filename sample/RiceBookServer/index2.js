var express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')

var app = express()
app.use(logger('default'))
app.use(bodyParser.json())

//require('./app_server/posts.js').setup(app)
require('./app_server/hello.js').setup(app)

// Get the port from the environment, i.e., Heroku sets it
var port = process.env.PORT || 3000

//////////////////////////////////////////////////////
var server = app.listen(port, function() {
     console.log('Server listening at http://%s:%s', 
               server.address().address,
               server.address().port)
})
