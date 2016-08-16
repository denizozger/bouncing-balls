function OutOfBoundariesException(ball) {
   this.ball = ball;
   this.name = "OutOfBoundariesException";
}

function getRandomNumberInRange(min, max) {
  return Math.random() * (max - min) + min;
}