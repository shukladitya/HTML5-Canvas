canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight - 4;

const gui = new dat.GUI();

let waveProperties = {
  y: innerHeight / 2,
  waveLength: 0.01,
  amplitude: 100,
  movementX: 0.01,
};

let backgroundProperties = {
  red: 0,
  green: 0,
  blue: 0,
  opacity: 0.01,
};

let waveColor = {
  hue: 255,
  saturation: 50,
  light: 50,
};

const waveFolder = gui.addFolder("waveProperties");
waveFolder.add(waveProperties, "y", 0, innerHeight);
waveFolder.add(waveProperties, "waveLength", -0.1, 0.1);
waveFolder.add(waveProperties, "amplitude", -300, 300);
waveFolder.add(waveProperties, "movementX", 0.01, 1);
waveFolder.open();

const backgroundColor = gui.addFolder("backgroundProperties");
backgroundColor.add(backgroundProperties, "red", 0, 255);
backgroundColor.add(backgroundProperties, "green", 0, 255);
backgroundColor.add(backgroundProperties, "blue", 0, 255);
backgroundColor.add(backgroundProperties, "opacity", 0, 1);
backgroundColor.open();

const waveStroke = gui.addFolder("waveColor");
waveStroke.add(waveColor, "hue", 0, 255);
waveStroke.add(waveColor, "saturation", 0, 50);
waveStroke.add(waveColor, "light", 0, 50);
waveStroke.open();

let c = canvas.getContext("2d");

let increment = waveProperties.movementX;
let drawWave = () => {
  c.beginPath();
  c.moveTo(0, innerHeight / 2);
  for (i = 0; i < innerWidth; i++) {
    c.lineTo(
      i,
      Math.sin(i * waveProperties.waveLength + increment) *
        waveProperties.amplitude *
        Math.sin(increment) +
        waveProperties.y
    );
  }
  c.strokeStyle = `hsl(${waveColor.hue * Math.sin(increment)},${
    waveColor.saturation
  }%,${waveColor.light}%)`;
  //how hsl works https://www.youtube.com/watch?v=Ceur-ARJ4Wc
  //hue= 0-255  saturation 0%-50% lightness 0%-50%
  c.stroke();
  increment += waveProperties.movementX;
};
drawWave();

let animate = () => {
  requestAnimationFrame(animate);
  c.fillStyle = `rgba(${backgroundProperties.red},${backgroundProperties.green},${backgroundProperties.blue},${backgroundProperties.opacity})`;
  c.fillRect(0, 0, innerWidth, innerHeight);
  drawWave();
};

animate();
