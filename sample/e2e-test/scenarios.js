describe('RiceBookApp', function() {
	'use strict'

	beforeEach(function() {
		browser.get('e2e/index.html')
	})

	it('should work and have header text', function() {		
		expect(element.all(by.css('h1')).first().getText()).toMatch("Dummy Server Example")		
	})

	function login() {
		// grab the current "message" and validate it is "You are Not Logged In"
		// log in by sending username and password for your test account
		// click the login button
	}

	function logout() {
		// click the logout button
		// grab the current "message" and validate it is "You are Not Logged In"
	}

	it('should log in as my test user and validate my status message', function() {		
		login()		
		// validate your username and status message
		logout()
	})

	function setStatus(value) {
		// find the new status input
		// type in the new "value"
		// click the update button
	}

	it('should update the status and then set it back', function() {
		login()

		// validate the current status message in the <span>

		var newStatus = "A new status message"
		setStatus(newStatus)
		// validate the new status message in the <span>

		// revert back to the old status message
		// setStatus(status)
		// validate it is correctly reverted in the <span>

		logout()
	})

})
