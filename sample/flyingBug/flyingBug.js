
// Record number of times you've visited this site
const updateCookie = () => {
    const key = 'visitCount'
    const cookie = document.cookie.split(';').filter(kv => kv.indexOf(key) >= 0)[0]
    const visitCount = 1 + (cookie ? parseInt(cookie.split('=')[1]) : 0)
    const visitSpan = document.querySelector('#visitCount')
    visitSpan.innerHTML = visitCount
    document.cookie = `${key}=${visitCount}`
}

// upfront cache the two images
const bugL = new Image()
const bugR = new Image()
bugL.src = 'bugL.gif'
bugR.src = 'bugR.gif'

window.onload = function() {
	const boxDiv = document.getElementById('box');
	const boxStyle = getComputedStyle(boxDiv)		
	const boxWidth = parseFloat(boxStyle.width.replace('px', ''))
	const boxHeight = parseFloat(boxStyle.height.replace('px', ''))
	const scoreSpan = document.getElementById('bugCount')	

	let dt = 0
    let score = 0
	let bugCount = 0

	boxDiv.onclick = (e) => {
		if ('IMG' === e.target.tagName) {			
			e.target.kill()			
			scoreSpan.innerHTML = ++score			
			if (bugCount === 0) {
				resetBugs();
			}
		}
	}
	
	const addBug = () => {
		const img = document.createElement('IMG')
		img.src = 'bugL.gif'	
		img.className = 'bugImage'
		// make it hidden, but it'll take space
		img.style.visibility = 'hidden'
		boxDiv.appendChild(img);		

		// determine the size of the image
		const imgStyle = getComputedStyle(img)
		const imgWidth = parseFloat(imgStyle.width.replace('px', ''))
		const imgHeight = parseFloat(imgStyle.height.replace('px', ''))

		let x = (boxWidth-imgWidth)*Math.random() 
	    let y = (boxHeight-imgHeight)*Math.random()
		
		img.style.left = x + 'px'		
		img.style.top = y + 'px'

		// now make it appear		
		img.style.visibility = 'visible'

		let xVelocity = Math.random() * 10
		let yVelocity = Math.random() * 10

		let alive = true
		img.kill = () => { 
			console.log('splat!'); 
			boxDiv.removeChild(img)
			alive = false 
			--bugCount
		}
		const moveBug = () => {
			if (x > boxWidth - imgWidth || x < 0) {
				xVelocity *= -1				
				img.src = xVelocity < 0 ? 'bugR.gif' : 'bugL.gif'
			}
			if (y > boxHeight - imgHeight || y < 0) {
				yVelocity *= -1
			}
			x = x + xVelocity * dt
			y = y + yVelocity * dt
			img.style.left = x + 'px'		
			img.style.top = y + 'px'
			
			if (alive) {
				setTimeout(moveBug, 30)
			}
		}
		setTimeout(moveBug, 0); // move now
		++bugCount
	}

	const resetBugs = () => {
		const allBugs = document.getElementsByClassName('bugImage');
        [].forEach.call(allBugs, bug => bug.kill())
        Array(5 + Math.floor(Math.random()*10)).fill(1).forEach(addBug)
        // make the game go faster!
		dt += 0.5
	}			

	const buttons = document.getElementsByTagName('input');
    [].forEach.call(buttons, button => {
		switch(button.value) {
			case 'Reset':
				button.onclick = resetBugs
				break;
			case 'Pause':
				button.onclick = function() { 
					if (this.value == 'Pause') {
						this.value = 'Resume'
						dt = 0
					} else {
						this.value = 'Pause'
						dt = 1
					}
				}
				break;				
		}
    })

	resetBugs()
    updateCookie()

}
