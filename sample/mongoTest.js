var request = require('request')
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/webdev'
if (process.env.MONGOLAB_URI) {
	url = process.env.MONGOLAB_URI;
}
function mc(execute) {
	var args = Array.prototype.slice.call(arguments, 1)
	MongoClient.connect(url, function(err, db) {
		if (err) {
			console.err('There was a problem', err)
		} else {
			args.unshift(db)
			execute.apply(null, args)
		}
	})
}
exports.mc = mc

function insertDocs(db) {
	request('https://webdev-dummy.herokuapp.com/sample', function(err, res, body) {
		var posts = JSON.parse(body).posts
		// put these into a collection
		var c = db.collection('posts', function() { })
		c.insert(posts, {w:1}, function(err, result) {
			db.close()
		})
	})	
}


function queryDocs(db) {
	var c = db.collection('posts')
	var counts = {}
	c.find({}).toArray(function(err, items) {
		console.log('There are ' + items.length + ' entries')
		items.forEach(function(post) {
			if (!counts[post.author]) {
				counts[post.author] = 0
			}
			counts[post.author] = counts[post.author] + 1
		})
		db.close()
		console.log(counts)
	})
}

function queryByAuthor(db, author) {	
	var c = db.collection('posts')	
	c.find({ author: author }).toArray(function(err, items) {
		console.log('There are ' + items.length + ' entries for ' + author)
		var totalLength = 0
		items.forEach(function(post) {
			totalLength += post.body.length
		})
		console.log('average length', totalLength / items.length)
		db.close()
	})
}

//mc(insertDocs)
//mc(queryDocs)
mc(queryByAuthor, 'sep1')
mc(queryByAuthor, 'jmg3')