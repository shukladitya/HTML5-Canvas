let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 4;

let c = canvas.getContext("2d");

let colors = ["#511845", "#900C3F", "#C70039", "#FF5733"];

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let gravity = 3;

mouse = {
  x: undefined,
  y: undefined,
};
document.addEventListener("click", (event) => {
  (mouse.x = event.x), (mouse.y = event.y);
  for (i = 0; i < 100; i++) {
    ballArray[i].blast();
  }
});

class Ball {
  constructor(x, y, radius, color, velocityX, velocityY, eOfGround) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.eOfGround = eOfGround;
    this.color = color;
  }

  draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    c.stroke();
    c.fillStyle = this.color;
    c.fill();
  };

  moveBall = () => {
    if (this.y + this.radius + this.velocityY > canvas.height - 4) {
      this.velocityY = -this.velocityY * this.eOfGround;
    } else {
      this.velocityY += gravity;
    }

    this.y += this.velocityY;
    this.draw();

    //right left motion
    this.x += this.velocityX;
    if (this.x < 0 || this.x > canvas.width) this.velocityX = -this.velocityX;
  };

  blast = () => {
    if (Math.abs(mouse.x - this.x) < 50 && Math.abs(mouse.y - this.y) < 50) {
      console.log(this.velocityX);
      this.velocityY += 50;
      console.log(this.velocityX);
    }
  };
}

let ballArray = [];
for (i = 0; i < 100; i++) {
  let color = colors[Math.floor(Math.random() * 4)];
  ballArray.push(
    new Ball(
      Math.floor(Math.random() * innerWidth),
      Math.floor(Math.random() * innerWidth * 0.4),
      randomIntFromRange(30, 50),
      color,

      randomIntFromRange(-5, 5),
      5,
      0.95
    )
  );
  ballArray[i].draw();
}

let animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (i = 0; i < 100; i++) ballArray[i].moveBall();
};

animate();
