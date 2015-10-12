var express = require('express')
var app = express()

app.get('/', hello)

function hello(req, res) {
    res.send('Hello World!')
}

//////////////////////////////////////////////////////
var server = app.listen(8080, function() {
     console.log('Server listening at http://%s:%s', 
               server.address().address,
               server.address().port)
})
