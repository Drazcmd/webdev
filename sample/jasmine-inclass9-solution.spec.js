describe('Jasmine In Class Exercise', function() {

	beforeEach(function() {
		$('#fixture').remove();      	
      	var html = '<span>This is a span with some color changing text</span>'
      		+ '<input type="checkbox">'

        $('body').append('<div id="fixture">' + html + '</div>')

        // this function was defined in jasmine-inclass9.js
        window.setupHandlers($('#fixture'))
	})

	it('should set the span text color to blue on load', function() {
		expect($('span', $('#fixture'))[0].style.color).toBe('blue')
	})

	it('should set span text color to red when checked', function() {
		// there's only one input in the fixture
		$('input', $('#fixture')).trigger('click')
		expect($('span', $('#fixture'))[0].style.color).toBe('red')
    })

	it('should set span text color to green when unchecked', function() {
		$('input', $('#fixture')).trigger('click')
		$('input', $('#fixture')).trigger('click')
		expect($('span', $('#fixture'))[0].style.color).toBe('green')	
	})

	//*************************************************//
	// now we do some non-DOM JavaScript testing

	it('should compute the trajectory after 1 second', function() {

      var obj = { x: 5, y: 10, vx: 1, vy: 2, ay: -0.1 }
    
      // we want this small, but not too small      
      var prec = 0.0001

      moveObject(obj, 1.0) // should be at [ 6, 11.95 ]
      expect(obj.x).toBeCloseTo(6, prec)
      expect(obj.y).toBeCloseTo(11.95, prec)

      moveObject(obj, 1.0); // should be at [ 7, 13.80 ]
      expect(obj.x).toBeCloseTo(7, prec)
      expect(obj.y).toBeCloseTo(13.80, prec)

      obj.ax = 0.5; obj.ay = -0.4;
      moveObject(obj, 1.0); // should be at [ 8.25, 15.40 ]
      expect(obj.x).toBeCloseTo(8.25, prec)
      expect(obj.y).toBeCloseTo(15.40, prec)

	})

})
