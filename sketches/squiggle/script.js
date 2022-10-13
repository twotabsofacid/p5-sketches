let pointsArr = [];
let w, h;
const r = 250;
const totalPoints = 800;
const noiseScale = 200;

function setup() {
  let w = window.innerWidth;
  let h = window.innerHeight;
  createCanvas(w, h, SVG);
  noFill();
  angleMode(DEGREES);
  noFill();
  runDraw();
}

function runDraw() {
  background(255);
  stroke(0);
  drawSquiggle(50, 100);
}

function drawSquiggle(totalPoints, r) {
  push();
  translate(width / 2, height / 2);
  beginShape();
  for (let i = 0; i < totalPoints; i++) {
    let deg = map(i, 0, totalPoints - 1, 0, 360);
    let xPos = r * cos(deg);
    console.log((noise(sin(i)) - 0.5) * 500);
    let yPos = r * sin(deg);
    let mappedI = abs(map(i, 0, totalPoints - 1, -totalPoints, totalPoints));
    let noiseX = (noise(sin(mappedI)) - 0.5) * 223;
    let noiseY = (noise(cos(mappedI)) - 0.5) * 287;
    vertex(xPos + noiseX, yPos + noiseY);
  }
  endShape();
  pop();
}

function keyReleased(e) {
  console.log(e);
  if (e.code === 'Space') {
    save('squiggle.svg');
  }
}

function mouseClicked() {
  noiseSeed(millis());
  runDraw();
}
