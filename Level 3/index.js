let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 4;

getRandomColor = () => {
  var letters = "0123456789ABCDEF"; //hexadecimal
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]; //math.random=>0 to 1 => this into 16 => anyrhing between 0 to 16.
  }
  return color;
};
let c = canvas.getContext("2d");

class Circle {
  constructor(x, y, radius, color, velocityX, velocityY) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
  }

  drawCircle = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.stroke();
    c.fillStyle = this.color;
    c.fill();
  };

  updatePosition = () => {
    this.x += this.velocityX;
    this.y += this.velocityY;
    if (this.x > innerWidth - this.radius || this.x < 0)
      this.velocityX = -this.velocityX;
    if (this.y > innerHeight - this.radius || this.y < 0)
      this.velocityY = -this.velocityY;
    this.drawCircle();
  };

  updateSpeed = (condition) => {
    if (condition == "INC") {
      this.velocityX <= 0 ? (this.velocityX -= 6) : (this.velocityX += 6);
      this.velocityY <= 0 ? (this.velocityY -= 6) : (this.velocityY += 6);
    } else {
      this.velocityX <= 0 ? (this.velocityX += 6) : (this.velocityX -= 6);
      this.velocityY <= 0 ? (this.velocityY += 6) : (this.velocityY -= 6);
    }
  };
}
let circlesArray = [];

document.querySelector(".inc").addEventListener("click", () => {
  for (i = 0; i < 100; i++) circlesArray[i].updateSpeed("INC");
});

document.querySelector(".dec").addEventListener("click", () => {
  for (i = 0; i < 100; i++) circlesArray[i].updateSpeed("DEC");
});

document.querySelector(".refresh").addEventListener("click", () => {
  location.reload();
});

for (i = 0; i < 200; i++) {
  x = Math.floor(Math.random() * innerWidth);
  y = Math.floor(Math.random() * innerHeight);
  radius = Math.floor(Math.random() * 50);
  velocityX = Math.floor(Math.random() * 8);
  velocityY = Math.floor(Math.random() * 8);

  if (x < radius) x += radius;
  if (x > innerWidth - radius) x -= radius;
  if (y < radius) y += radius;
  if (y > innerHeight - radius) y -= radius;
  color = getRandomColor();
  circlesArray.push(new Circle(x, y, radius, color, velocityX, velocityY));
}

for (i = 0; i < 200; i++) {
  circlesArray[i].drawCircle();
}

let animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (i = 0; i < 100; i++) circlesArray[i].updatePosition();
};
animate();
