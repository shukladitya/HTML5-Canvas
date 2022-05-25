getRandomColor = () => {
  var letters = "0123456789ABCDEF"; //hexadecimal
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]; //math.random=>0 to 1 => this into 16 => anyrhing between 0 to 16.
  }
  return color;
};
//how HEX works https://www.youtube.com/watch?v=c56x1aj2CPA

let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");

let brush = 0;
let clickNo = 0;
h1 = document.querySelector("h1");
h1.addEventListener("click", (e) => {
  brush++;
  clickNo = 0;
  h1.innerText = `Toggle ${
    brush % 3 == 0 ? "Line" : brush % 3 == 1 ? "Circle" : "Square"
  }`;
});

let mousePrevPosX, mousePrevPosY;
canvas.addEventListener("click", (e) => {
  if (brush % 3 == 0) {
    //fill rectangle
    c.fillStyle = getRandomColor();
    c.fillRect(e.clientX - 25, e.clientY - 25, 50, 50);
  } else if (brush % 3 == 1) {
    //fill line
    c.beginPath();
    clickNo++;
    if (clickNo === 1) {
      mousePrevPosX = e.clientX;
      mousePrevPosY = e.clientY;
    } else {
      c.moveTo(mousePrevPosX, mousePrevPosY);
      c.lineTo(e.clientX, e.clientY);
      c.strokeStyle = getRandomColor();
      c.stroke();
    }
    mousePrevPosX = e.clientX;
    mousePrevPosY = e.clientY;
  } else {
    //draw circles
    let randomRadius = Math.floor(Math.random() * 50) + 30;
    c.beginPath();
    c.arc(e.clientX, e.clientY, randomRadius, 0, Math.PI * 2, false);
    c.strokeStyle = getRandomColor();
    c.stroke();
  }
});
