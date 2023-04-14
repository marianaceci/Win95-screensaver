//set up our canvas
//gives access to drawing properties
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); //what type of canvas to use

//innerWidth refer to the viewport
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

//function to generate random number
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate a random RGB color
function randomRGB() {
  return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
}

//building balls
class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath(); //start drawing shape
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  //what happens when ball hits the ends of the screen:
  update() {
    if (/* hits right of screen */ this.x + this.size >= width) {
      this.velX = -this.velX; /* sends it back to the other direction */
    }

    if (/* hits left of screen */ this.x - this.size <= 0) {
      this.velX = -this.velX;
    }

    if (/* hits top of screen */ this.y + this.size >= height) {
      this.velY = -this.velY;
    }

    if (/* hits bottom of screen */ this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    //redraw/move the ball:
    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball)) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.ball = randomRGB();
        }
      }
    }
  }
}

const balls = [];

while (balls.length < 20) {
  const size = random(10, 20);
  const ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-10, 7),
    random(-10, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
}

function loop() {
  ctx.fillStyle = "rgba(0,0,0,0.08)"; //background color
  ctx.fillRect(0, 0, width, height);
  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  requestAnimationFrame(loop); //recursion
}

loop();
