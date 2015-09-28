describe('RiceBookApp', function() {
	'use strict'

	beforeEach(function() {
		browser.get('/index.html')
	})

	it('should work and have header text', function() {		
		expect(element.all(by.css('h2')).first().getText()).toMatch("This is RiceBook")		
	})

	it('should delete a post', function() {		
		expect(element.all(by.css('[value="Delete"]')).count()).toEqual(3)
		element.all(by.css('[value="Delete"]')).first().click();
		expect(element.all(by.css('[value="Delete"]')).count()).toEqual(2)
	})

	it('should filter to none', function() {
		element(by.css('#search')).sendKeys('zzzzz')
		expect(element.all(by.css('[value="Delete"]')).count()).toEqual(0)	
	})

	it('should filter to two', function() {
		element(by.css('#search')).sendKeys('d')
		expect(element.all(by.css('[value="Delete"]')).count()).toEqual(2)	
	})

	it('should add a post', function() {
		element(by.css('[placeholder="post title"]')).sendKeys('Test Title')
		element(by.css('[placeholder="post body"]')).sendKeys('Test Body')
		element(by.css('[value="Post"]')).click()
		expect(element.all(by.css('[value="Delete"]')).count()).toEqual(4)		
	})

})