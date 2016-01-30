'use strict'

var createApp = function(canvas) { 
	var c = canvas.getContext("2d");

	// Create the ground
	var floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'] 

	// I refactored the build() function to separate
	// the painting from building creation
	function paintBuilding(building) {		
		var x0 = building.x
		var blgHeight = building.height
		var blgWidth = building.width

		c.fillStyle= building.color
		
		c.fillRect(x0, floor - blgHeight, blgWidth, blgHeight)
		
		for (var y = floor - floorSpacing; y > floor - blgHeight; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < blgWidth - windowWidth; x += windowSpacing + windowWidth) {
				c.fillStyle = Math.random() > 0.5 ? "yellow" : "black"
				c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight)
			}
		}
	}

	// Sometimes we have to make executive decisions!
	// I'm putting the buildings in a line with *NO* overlap.
	var buildings = []

	// can we build a building at x of width w?
	function overlap(x, width) {
		return buildings.some(function(building) { 
			var b_left = building.x, b_right = building.x + building.width
			return (b_left < x && x < b_right) || 
				(b_left < x+width && x+width < b_right) ||
				(x < b_left && b_left < x + width) ||
				(x < b_right && b_right < x + width)
		})
	}

	//build a building
	var build = function() {
		var blgHeight = 2*(windowHeight + floorSpacing) + Math.random()*canvas.height/2

		// while loop might go infinite...
		// because I have a fixed size, I give up adding new buildings at some point.
		var counter = 0, MAX_COUNT = 100
		var x0, blgWidth;
		do {
			x0 = Math.random()*canvas.width
			blgWidth = (windowWidth+windowSpacing) * (Math.floor(Math.random()*10) + 3)			
			if (++counter > MAX_COUNT) {				
				console.log("I give up and won't build a building")
				return; // we just give up			
			}
		} while (overlap(x0, blgWidth));
		
		var building = {
			x:x0, height:blgHeight, width:blgWidth, 
			color:blgColors[Math.floor(Math.random()*blgColors.length)]
		}
		buildings.push(building)		
		moveSun()
	}

	// click on a building to make it grow (and repaint of course)
	var click = function(event) {
		// we want the (x,y) coordinates relative inside our canvas		
		var x = event.layerX + canvas.offsetLeft
		var y = event.layerY + canvas.offsetTop
		buildings.forEach(function(building) { 
			if (building.x < x && x < building.x + building.width &&
				floor - building.height < y && y < floor)
			{
				// grow the building
				building.height += windowHeight + floorSpacing				
				// commented out because paintCar() makes the call for me.
				//moveSun()
			}
		})		
	}

	var theSun = {x: 10, y: 10, r: 15, t: 0 }
	function moveSun() {
		// we have to erase the previous position
		// hopefully a building didn't grow there...
		c.fillStyle = "white"
		c.beginPath()
		c.arc(theSun.x, theSun.y, 1.5*theSun.r, 0, 2*Math.PI)
  		c.closePath()
  		c.fill()	
  		
  		//theSun.y = Math.random()*canvas.height/10 + theSun.r
  		theSun.t += 5  		
  		theSun.y = theSun.r + canvas.height / 10 * (1 + Math.sin(Math.PI * theSun.t/180))  		  		
		theSun.x += 5;
		if (theSun.x > canvas.width) {
  			theSun.x = 0
  		}  		

		c.fillStyle = "#ffbb00"
		c.beginPath()
		c.arc(theSun.x, theSun.y, theSun.r, 0, 2*Math.PI)		
  		c.closePath()
  		c.fill()

  		buildings.forEach(function(b) { paintBuilding(b) })  		
	}

	var carX = 0, carHeight = 15, carWidth = 40, carOffset = 2.5
	function paintCar() {

		// For a *real* game you will want to repaint
		// perhaps as fast as possible.  Therefore do this:		
		//requestAnimationFrame(paintCar)
		// If you care about physics, then you'll want to know
		// how much time has elapsed between each frame

		// erase the car
		c.fillStyle="white"
		c.fillRect(carX, floor - carHeight - 3, carWidth, carHeight + 3)

		// draw everything
		moveSun()

		// move the car
		carX += 5
		if (carX > canvas.width) { 
			carX = 0
		}

		// paint a fancy car... more of a van I guess...
		c.fillStyle = "black";
		c.fillRect(carX, floor - carHeight - carOffset, carWidth, carHeight)
		c.fillStyle = "red"
		c.beginPath();c.arc(carX+10, floor - 5, 5, 0, 2*Math.PI);c.closePath();c.fill()
		c.beginPath();c.arc(carX+carWidth-7, floor - 5, 5, 0, 2*Math.PI);c.closePath();c.fill()
		c.fillStyle = "cyan"
		c.fillRect(carX+carWidth * 0.8, floor - carHeight - carOffset, carWidth * 0.2, 5)
		
		// update every ~0.1 seconds
		setTimeout(paintCar, 100)

		// now we could think about adding buildings automatically
		// having them grow over time, etc.		
	}	

	return {
		build: build, 
		click: click,
		go: paintCar
	}
}

window.onload = function() {
	var canvas = document.querySelector("canvas");
	var app = createApp(canvas)
	canvas.addEventListener("mousedown", app.click, false)
	document.getElementById("build").onclick = app.build
	// let's start with some buildings so I don't have to click a lot
	for (var i = 0; i < 10; i++) {
		app.build()
	}
	// The car moves by itself!
	// To make this happen, we go ahead and repaint the world.
	// This actually isn't that slow to do.	
	app.go()
}


