describe('In class End to End Exercise', function() {
	'use strict'

	beforeEach(function() {
		browser.get('e2e/index.html')
	})

	it('should work and have header text', function() {		
		expect(element.all(by.css('h1')).first().getText()).toMatch("Dummy Server Example")		
	})

	function login() {
		expect(element(by.css('.message')).getText()).toMatch('You are Not Logged In')
		element(by.model('vm.username')).sendKeys('sep1test')
		element(by.model('vm.password')).sendKeys('native-web-tester')
		element(by.css('[value="Login"]')).click()
	}

	function logout() {
		element(by.css('[value="logout"]')).click()
		expect(element(by.css('.message')).getText()).toMatch('You are Not Logged In')
	}	

	it('should log in as my test user and validate my status message', function() {
		login()		
		expect(element.all(by.id('username')).first().getText()).toMatch("sep1test")
		// Here I *assume* the value for the status.
		// This is okay so long as it never changes...
		var status = "Test Account"
		expect(element.all(by.id('status')).first().getText()).toMatch(status)
		logout()
	})

	function setStatus(value) {
		var el = element.all(by.model('vm.newStatus'))
		el.clear().then(el.sendKeys(value))
		element.all(by.css('[value="Update Status"]')).click()
	}

	it('should update the status and then set it back', function() {
		login()		
		var status = "Test Account"
		var el = element.all(by.id('status')).first()
		// getText() is a promise.  
		// It will return the value in the field
		// as the argument to the callback
		el.getText().then(function(status) {
			// change the status
			var newStatus = "A new status message"
			setStatus(newStatus)
			expect(el.getText()).toMatch(newStatus)
			// put it back the way you found it
			setStatus(status)
			expect(el.getText()).toMatch(status)
			// all done
			logout()
		})
	})


})
