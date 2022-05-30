let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 4;

let c = canvas.getContext("2d");

let colors = ["#03045e", "#0077b6", "#00b4d8", "#0b525b"];

mouse = {
  x: undefined,
  y: undefined,
};

document.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

class Particle {
  constructor(x, y, radius, velocity, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocity = velocity;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.circlesDistanceFromCenter = Math.floor(Math.random() * 350) + 20;
    this.previousX = x;
    this.previousY = y;
  }

  draw = () => {
    c.beginPath();
    c.moveTo(this.previousX, this.previousY);
    c.lineTo(this.x, this.y);
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.stroke();
    this.previousX = this.x;
    this.previousY = this.y;
  };

  moveParticle = () => {
    this.radians += this.velocity;
    this.x = mouse.x + Math.cos(this.radians) * this.circlesDistanceFromCenter;
    this.y = mouse.y + Math.sin(this.radians) * this.circlesDistanceFromCenter;
    this.draw();
  };
}

let particlesArray = [];
for (i = 0; i < 80; i++)
  particlesArray.push(
    new Particle(
      innerWidth / 2,
      innerHeight / 2,
      Math.random() * 7 + 1,
      0.02,
      colors[Math.floor(Math.random() * colors.length)]
    )
  );

let animation = () => {
  requestAnimationFrame(animation);
  c.fillStyle = "rgba(255,255,255,0.05)";
  c.fillRect(0, 0, innerWidth, innerHeight);
  for (i = 0; i < 80; i++) particlesArray[i].moveParticle();
};

animation();
