const 
	canvas = document.getElementById('skyline'),
	gravity = 1,
	rateOfTimeflowInMs = 20; // In this application we favour Newton over Einstein ;)

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function renderBall(ball) {
	try {
	   ball.tick(gravity);
	} catch (e) {
		if (e.name !== 'OutOfBoundariesException') {
			console.error(e.stack);	
		}
	   return;
	}
	// even if rateOfTimeflowInMs = 0, setTimeout needs to stay to free the V8 event loop
	setTimeout(() => renderBall(ball), rateOfTimeflowInMs);
}

document.getElementById('container').addEventListener('click', event => 
	renderBall(new Ball(event.clientX, event.clientY, canvas)));
