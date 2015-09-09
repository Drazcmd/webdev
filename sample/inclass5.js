/* Everything here is within the onload.  This means
 * we wait for the document and window to complete loading,
 * then we go looking for elements in the DOM and add our
 * event handling to them.  Otherwise if we go looking before
 * the DOM is loaded, then elements will not exist.
 */
window.onload = function() {

	// we need two "global" booleans (they are not true globals
	// as we will learn when we discuss scope next week).
	var gameWon = false;
	var ctrlPressed = false;

	// these are the two elements we want to control.  Go find 
	// them now and keep references to them for later.
	var btn = document.getElementById('btn')
	var div = document.getElementById('div')

	var gameReset = function() {
		gameWon = false		
		div.style.display = 'none'
		btn.value = "Click Me"		
		moveButton()
	}

	var winGame = function() {
		gameWon = true
		div.style.display = 'block';
		btn.value = "Play Again"
	}

	// set it up for play
	gameReset();

	// if ctrl didn't work you could use shift instead
	var magicKey = 17; // ctrl

	// Instead of writing this twice I made a function
	function random() {
		return Math.random() * scale * ( Math.random() > 0.5 ? 1 : -1 )
	}

	// I move the button a random amount scaled by this value
	// we could pick a fixed fraction of the window instead
	var scale = 50;

	// here I figure out how big the button is
	// I don't want the button to move off the screen.
	// alternatively I could bound the button with a div
	// and then the button must remain inside the div
	var computedStyle = window.getComputedStyle(btn)
	var btnWidth = computedStyle.width.replace('px','')
	var btnHeight = computedStyle.height.replace('px','')

	function moveButton() {
		// "event" will be in scope when this is called
		// except for the first time, where event.clientX = NaN
		// but that's okay because the button will still appear
		// somewhere on the screen
		var x = event.clientX + random()
		var y = event.clientY + random()

		// just in case we push off the edge of the window
		while (x < 0 || x > window.innerWidth - btnWidth*3) {
			x = Math.random()*window.innerWidth
		}
		while (y < 0 || y > window.innerHeight - btnHeight*5) {
			y = Math.random()*window.innerHeight
		}

		// Remember to have set btn.style.position = fixed		
		btn.style.left = x + 'px'
		btn.style.top = y + 'px'			
	}

	// Note I might instead have the button inside a div
	// with some size instead of the btn itself
	// that actually might be a better solution!
	btn.onmouseover = function(event) {
		if (!ctrlPressed && !gameWon) {
			moveButton()
		}
	}

	// we could inline these functions, but it's many times nicer not to
	btn.onclick = function() {		
		if (gameWon) {
			gameReset()
		} else {
			winGame()
		}
	}

	// I put these event handlers on the document itself
	// this means they are "global" event handlers.
	// when initially writing, use console.log() statements
	// to see what is going on in your program.
	// Then remember to remove the logging before you publish.
	document.onkeydown = function(event) {
		if (event.keyCode === magicKey) {
			ctrlPressed = true;
		}	
	}

	document.onkeyup = function(event) {
		if (event.keyCode === magicKey) {
			ctrlPressed = false;
		}
	}


}