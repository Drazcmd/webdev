/*
 * Test suite for hello.js
 */
var request = require('request')
var hello = require('./hello.js')

function url(path) {
	return "http://localhost:3000" + path
}

describe('Validate Hello Functionality', function() {

	it('should say Hello Somebody!', function(done) {
		request(url("/"), function(err, res, body) {
			expect(res.statusCode).toBe(200);			
			expect(body).toEqual("Hello Somebody!");
			done()
		})
 	}, 500)

	it('should say Hello Me!', function(done) {
		request(url("/Me"), function(err, res, body) {
			expect(res.statusCode).toBe(200);
			expect(body).toEqual("Hello Me!");
			done()
		})
 	}, 500)

});