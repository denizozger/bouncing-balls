/**
 * A ball object with coordinate, radius, colour and vertical and horizantal velocity vectors
 * All units are in pixels unless stated otherwise
 * Velocity in both x and y dimensions are positive to have the balls travel in
 *		top-right direction, try setting ranges [-15, 15] to see balls in all directions.
 */

class Ball {
	constructor(x, y, canvas) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
		this.coordinate = new Coordinate(x, y);
		this.velocityX = getRandomNumberInRange(5, 15);
		this.velocityY = getRandomNumberInRange(15, 25);
		this.radius = 2;
		const randomColour = new RColor().get();
		this.colour = `rgb(${randomColour[0]}, ${randomColour[1]}, ${randomColour[2]})`;
	}

	paintBall() {
		this.ctx.beginPath();
		this.ctx.fillStyle = this.colour;
		this.ctx.strokeStyle = this.colour;
		this.ctx.arc(this.coordinate.x, this.coordinate.y, this.radius, 0, Math.PI*2, true);
		this.ctx.closePath();
		this.ctx.fill();
	}

	paintTrajectoryLine(startCoordinates) {
		this.ctx.beginPath();
		this.ctx.moveTo(startCoordinates.x, startCoordinates.y);
		this.ctx.strokeStyle = this.colour;
		this.ctx.closePath();
		this.ctx.lineTo(this.coordinate.x, this.coordinate.y);
		this.ctx.stroke();
	}

	getNextTickCoordinates() {
		return new Coordinate(this.coordinate.x + this.velocityX, 
			this.coordinate.y - this.velocityY);
	}

	applyGravity(gravity) {
		this.velocityY = this.velocityY - gravity;	
	}

	getBouncingBallNextTickCoordinates() {
		this.velocityY = this.velocityY * -1;

		// move the ball back to screen boundaries in y direction
		const yOffset = Math.abs(canvas.height - this.coordinate.y);

		// adjust the ball's position in x direction based on y adjustment amount
		const yOffsetRatio = yOffset / this.velocityY;
		const xOffset = this.velocityX * yOffsetRatio;

		return new Coordinate(this.coordinate.x - xOffset, this.coordinate.y - yOffset);
	}

	// pass the time: move the ball to the next position
	tick(gravity) {
		if (this.coordinate.x < 0 || this.coordinate.x > this.canvas.width) {
			throw new OutOfBoundariesException(this);
		}

		const bounceThisTick = this.coordinate.y > canvas.height;
		const initialCoordinate = new Coordinate(this.coordinate.x, this.coordinate.y);
		let newCoordinates;

		if (!bounceThisTick) {
			Ball.eraseBall(this);
			this.applyGravity(gravity);
			newCoordinates = this.getNextTickCoordinates();
		} else {
			newCoordinates = this.getBouncingBallNextTickCoordinates();
		}

		this.coordinate = newCoordinates;
		this.paintBall();

		// no need to draw a line if the ball is momentarily stationary
		if (!this.bouncedInPreviousTick) {
			this.paintTrajectoryLine(this.previousCoordinates);
		}

		// set up some flags keeping the ball's previous state
		this.bouncedInPreviousTick = bounceThisTick;
		this.previousCoordinates = initialCoordinate;
	}

	static eraseBall(ball) {
		ball.ctx.beginPath();
		ball.ctx.moveTo(ball.coordinate.x, ball.coordinate.y);
		ball.ctx.fillStyle = 'white';
		ball.ctx.arc(ball.coordinate.x, ball.coordinate.y, ball.radius+1, 0, Math.PI*2, true);
		ball.ctx.closePath();
		ball.ctx.fill();
	}

	get previousCoordinates() {
		return this._previousCoordinates || this.coordinate
	}

	set previousCoordinates(coordinates) {
		this._previousCoordinates = Object.assign({}, coordinates);
	}
}
