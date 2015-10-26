var mongoose = require('mongoose')
var url = 'mongodb://localhost:27017/webdev'
mongoose.connect(url)
function done() {
	mongoose.connection.close()
}

var commentSchema = new mongoose.Schema({
	commentId: Number, author: String, date: Date, body: String
})
var postSchema = new mongoose.Schema({
	id: Number, author: String, img: String, date: Date, body: String,
	comments: [ commentSchema ]
})
var Post = mongoose.model('post', postSchema)

function findByAuthor(author, callback) {
	Post.find({ author: author }).exec(function(err, items) {
		console.log('There are ' + items.length + ' entries for ' + author)
		var totalLength = 0
		items.forEach(function(post) {
			totalLength += post.body.length
		})
		console.log('average length', totalLength / items.length)		
		callback()
	})
}

findByAuthor('sep1', function() {
	findByAuthor('jmg3', function() {
		done()
	})
})

