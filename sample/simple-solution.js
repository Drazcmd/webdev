var http = require('http')

var host = '127.0.0.1'
var port = 3333

http.createServer(preprocess).listen(port, host)
console.log('Server running at http://' + host + ':' + port)

function preprocess(req, res) {
     var body = ''
     req.on('data', function(chunk) {
          body += chunk
     })
     req.on('end', function() {
          req.body = body
          server(req, res)
     })
}

function server(req, res) {
     console.log('Request method        :', req.method)
     console.log('Request URL           :', req.url)
     console.log('Request content-type  :', req.headers['content-type'])
     console.log('Request payload       :', req.body)

     var payload = { 'hello': 'world' } // default response
     res.setHeader('Content-Type', 'application/json')
     res.statusCode = 200

     if (req.method == 'GET' && req.url == '/posts') {
     	payload = { posts: [ 
     			{ id:1, author:'Scott', body:'A post'},
     			{ id:2, author:'Max'  , body:'A second post'}, 
     			{ id:3, author:'Leo'  , body:'The third post'}
     		] }
     } else if (req.method == 'POST' && req.url == '/login') {
     	var data = JSON.parse(req.body)
     	payload = { username: data.username, result: 'success'}
     } else if (req.method == 'PUT' && req.url == '/logout') {
     	payload = 'OK'
     }

     res.end(JSON.stringify(payload))
}
