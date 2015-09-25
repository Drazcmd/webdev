'use strict';

function setupHandlers(root) {

	$('span', root)[0].color = 'blue'

	// find the input and add an event handler
	$('input', root)[0].onclick = function() {
		var span = $('span', root)[0]
		if (this.checked) {
			span.color = 'red'
		} else {
			span.color = 'green'
		}
	}
	// checked box -> red text
	// unchecked box -> green text

}

function moveObject(obj, dt) {
	// check for undefined values
	// and set them to zero
	if (!obj.x) obj.x = 0;
	if (!obj.y) obj.y = 0;
	if (!obj.vx) obj.vx = 0;
	if (!obj.vy) obj.vy = 0;
	if (!obj.ax) obj.ax = 0;
	if (!obj.ay) obj.ay = 0;

	// include the acceleration term
	obj.x = obj.x + dt * obj.vx + 0.5 * obj.ax * dt * dt
	obj.y = obj.y + dt * obj.vy + 0.5 * obj.ay * dt * dt

	// update the velocities
	obj.vx = obj.vx + obj.ax * dt
	obj.vy = obj.vy + obj.ay * dt

}