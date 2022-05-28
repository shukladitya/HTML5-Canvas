let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 4;

let colors = ["#511845", "#900C3F", "#C70039", "#FF5733"];

let c = canvas.getContext("2d");

let mouse = {
  x: undefined,
  y: undefined,
};

document.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

class Circle {
  constructor(x, y, minRadius, maxRadius, color, velocityX, velocityY) {
    this.x = x;
    this.y = y;
    this.minRadius = minRadius;
    this.maxRadius = maxRadius;
    this.tempRadius = minRadius;
    this.color = color;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
  }

  drawCircle = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.minRadius, 0, Math.PI * 2, false);
    c.strokeStyle = this.color;
    c.stroke();
    c.fillStyle = this.color;
    c.fill();
  };

  updatePositionAndRadius = () => {
    this.x += this.velocityX;
    this.y += this.velocityY;
    if (this.x > innerWidth - this.minRadius || this.x < 0)
      this.velocityX = -this.velocityX;
    if (this.y > innerHeight - this.minRadius || this.y < 0)
      this.velocityY = -this.velocityY;

    //interactivity with mouse

    if (Math.abs(this.x - mouse.x) < 50 && Math.abs(this.y - mouse.y) < 50) {
      if (this.minRadius <= this.maxRadius) this.minRadius += 4;
    } else if (this.minRadius > this.tempRadius) this.minRadius--;
    this.drawCircle();
  };
}
let circlesArray = [];

for (i = 0; i < 1600; i++) {
  x = Math.floor(Math.random() * innerWidth);
  y = Math.floor(Math.random() * innerHeight);
  minRadius = Math.floor(Math.random() * 4) + 1;
  maxRadius = 50;
  velocityX = Math.floor(Math.random() * 3) + 1;
  velocityY = Math.floor(Math.random() * 3) + 1;

  if (x < minRadius) x += minRadius;
  if (x > innerWidth - minRadius) x -= minRadius;
  if (y < minRadius) y += minRadius;
  if (y > innerHeight - minRadius) y -= minRadius;
  color = colors[Math.floor(Math.random() * 4)];
  circlesArray.push(
    new Circle(x, y, minRadius, maxRadius, color, velocityX, velocityY)
  );
}

for (i = 0; i < 1600; i++) {
  circlesArray[i].drawCircle();
}

let animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (i = 0; i < 1600; i++) circlesArray[i].updatePositionAndRadius();
};
animate();
