var express = require('express')
var app = express()

app.get('/post', function(req, res) {
    res.send({'posts':[
         { 'id':1, 'author':'Scott', 'body':'this is my first post' },
         { 'id':2, 'author':'Max', 'body':"this is Max's first post" },
         { 'id':3, 'author':'Leo', 'body':"this is Leo's first post" },
        ]}) 
})

app.get('/:name*?', function(req, res) {
     var name = req.params.name
     if (!name){ name = "Somebody" }
     res.send("Hello " + name + "!")
})

//////////////////////////////////////////////////////
var port = 8080
if (process.argv.length == 3) {
     port = parseInt(process.argv[2])
}
var server = app.listen(port, function() {
     console.log('Server listening at http://%s:%s', 
               server.address().address,
               server.address().port)
})
