'use strict';

function setupHandlers(root) {

	$('span', root)[0].color = 'blue'

	// find the input and add an event handler
	// checked box -> red text
	// unchecked box -> green text

}

function moveObject(obj, dt) {
	// check for undefined values
	// and set them to zero

	// include the acceleration term
	obj.x = obj.x + dt * obj.vx
	obj.y = obj.y + dt * obj.vy

	// update the velocities

}