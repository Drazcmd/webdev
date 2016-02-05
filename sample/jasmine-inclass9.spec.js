describe('Jasmine In Class Exercise', function() {

	beforeEach(function() {
		$('#fixture').remove();      	
      	var html = '<span>This is a span with some color changing text</span>'
      	// add a checkbox to html

        $('body').append('<div id="fixture">' + html + '</div>')

        // this function was defined in jasmine-inclass9.js
        window.setupHandlers($('#fixture'))
	})

	it('should test that 1 is 1', function() {
		expect(1).toBe(1)
	})

	it('should set the span text color to blue on load', function() {
		expect($('span', $('#fixture'))[0].color).toBe('blue')
	})

	it('should set span text color to red when checked', function() {
		// use jQuery to check the box
		// then examine the text color of the span

      	expect(1).toBe(1) // remove this line
    })

	it('should set span text color to green when unchecked', function() {
		// check the box, then uncheck the box
		// examine the text color fo the span

    	expect(1).toBe(1) // remove this line
	})

	//*************************************************//
	// now we do some non-DOM JavaScript testing

	it('should compute the trajectory after 1 second', function() {

      var obj = { x: 5, y: 10, vx: 1, vy: 2, ay: -0.1 }
      
      moveObject(obj, 1.0)
      // expect object at [ 6, 11.95 ]

      moveObject(obj, 1.0); 
      // expect object at [ 7, 13.80 ]

      obj.ax = 0.5; obj.ay = -0.4;
      moveObject(obj, 1.0); 
      // expect object at [ 8.25, 15.40 ]

      expect(1).toBe(1) // remove this line
	})

})
