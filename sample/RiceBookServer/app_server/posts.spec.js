/*
 * Test suite for posts.js
 */
var request = require('request')
var post = require('./posts.js')

function url(path) {
	return "http://localhost:3000" + path
}

describe('Validate Post Functionality', function() {

	it('should give me three or more posts', function(done) {		
		// fill it in
		expect(1).toBe(2)
		done()
 	}, 200)

	it('should add two posts with successive post ids, and return the post each time', function(done) {
		// add a new post
		// verify you get the post back with an id
		// verify the content of the post
		// add a second post
		// verify the post id increases by one
		// verify the second post has the correct content
		expect(1).toBe(2)
		done()
 	}, 200)

	it('should return a post with a specified id', function(done) {
		// call GET /posts first to find an id, perhaps one at random
		// then call GET /posts/id with the chosen id
		// validate that only one post is returned
		expect(1).toBe(2)
		done()
	}, 200)

	it('should return nothing for an invalid id', function(done) {
		// call GET /posts/id where id is not a valid post id, perhaps 0
		// confirm that you get no results
		expect(1).toBe(2)
		done()
	}, 200)


});