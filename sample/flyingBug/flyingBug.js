
window.onload = function() {
	
	// upfront cache the two images
	var bugL = new Image()
	var bugR = new Image()
	bugL.src = "bugL.gif"
	bugR.src = "bugR.gif"

	var boxDiv = document.getElementById("box");
	var boxStyle = getComputedStyle(boxDiv)		
	var boxWidth = parseFloat(boxStyle.width.replace("px", ""))
	var boxHeight = parseFloat(boxStyle.height.replace("px", ""))

	var dt = 0
	var score = 0
	var scoreSpan = document.getElementById("bugCount")	
	var bugCount = 0

	boxDiv.onclick = function(e) {		
		if ("IMG" === e.target.tagName) {			
			e.target.kill()			
			scoreSpan.innerHTML = ++score			
			if (bugCount === 0) {
				resetBugs();
			}
		}
	}
	
	var addBug = function() { 			
		var img = document.createElement("IMG")
		img.src = "bugL.gif"	
		img.className = "bugImage"
		// make it hidden, but it'll take space
		img.style.visibility = "hidden"
		boxDiv.appendChild(img);		

		// determine the size of the image
		var imgStyle = getComputedStyle(img)
		var imgWidth = parseFloat(imgStyle.width.replace("px", ""))
		var imgHeight = parseFloat(imgStyle.height.replace("px", ""))

		var x = (boxWidth-imgWidth)*Math.random() 
		var y = (boxHeight-imgHeight)*Math.random()
		
		img.style.left = x + "px"		
		img.style.top = y + "px"

		// now make it appear		
		img.style.visibility = "visible"

		var xVelocity = Math.random() * 10
		var yVelocity = Math.random() * 10

		var alive = true
		img.kill = function() { 
			console.log('splat!'); 
			boxDiv.removeChild(img)
			alive = false 
			--bugCount
		}
		var moveBug = function() {
			if (x > boxWidth - imgWidth || x < 0) {
				xVelocity *= -1				
				img.src = xVelocity < 0 ? "bugR.gif" : "bugL.gif"
			}
			if (y > boxHeight - imgHeight || y < 0) {
				yVelocity *= -1
			}
			x = x + xVelocity * dt
			y = y + yVelocity * dt
			img.style.left = x + "px"		
			img.style.top = y + "px"
			
			if (alive) {
				setTimeout(moveBug, 30)
			}
		}
		setTimeout(moveBug, 0); // move now
		++bugCount
	}

	var resetBugs = function() {
		var allBugs = document.getElementsByClassName("bugImage")
		for (var i = 0; i < allBugs.length; ++i) {
			allBugs[i].kill()
		}

		for (var i = 0; i < 5 + Math.random()*10; ++i) {
			addBug()
		}		

		dt += 0.5
	}			

	var buttons = document.getElementsByTagName("input");
	for (var i = 0; i < buttons.length; ++i) {
		switch(buttons[i].value) {
			case "Reset":
				buttons[i].onclick = resetBugs
				break;
			case "Pause":
				buttons[i].onclick = function() { 
					if (this.value == "Pause") {
						this.value = "Resume"
						dt = 0
					} else {
						this.value = "Pause"
						dt = 1
					}
				}
				break;				
		}
	}

	resetBugs()

}