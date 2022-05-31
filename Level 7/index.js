/*
When you call noise() defined in perlin.js it generates a large array of numbers between 0 and 1
that are random but controlled random eg:[0.23,0.26,0.27,0.4....]
to use these numbers use noise(0) returns 0 index perlin, if you need numbers closer to each other pass values like noise(0.001),noise(0.002),noise(0.003)=>0.123,0.125,0.128
else noise(1),noise(2),noise(3)=> 0.123,0.224,0.563  etc
*/

canvas = document.querySelector("canvas");
canvas.height = innerHeight - 4;
canvas.width = innerWidth;

c = canvas.getContext("2d");

class bodyBall {
  constructor(x, y, color, offset) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.iterator = 0;
    this.offset = offset; //adding sligt variation in each ball else all balls will overlap each other, if this value is large perlin values of each ball will be very far apart if very small they will look like overlaping.
  }

  draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, 20, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  };

  updatePosition = () => {
    this.iterator += 0.004; //0.004 so that valuse remain very close and then multiplying with height gives closer y values otherwise it will not be a smooth transition.
    this.y = noise(this.iterator + this.offset) * innerHeight;
    this.x = noise(this.iterator + 20 + this.offset) * innerWidth; //adding 20 gives other set of values which are very far ahead in array else if x y both will get same perlin they will just move in digonal line.
    this.draw();
  };
}

bodyArray = [];
for (i = 0; i < 20; i++)
  bodyArray.push(
    new bodyBall(400, 50, `hsl(${Math.random() * 255},30%,50%)`, i * 0.05)
  );

let animate = () => {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(0,0,0,0.01)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  bodyArray.forEach((bodyPart) => {
    bodyPart.updatePosition();
  });
};
animate();
