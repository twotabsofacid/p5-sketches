let pointsArr = [];
let w, h;
const r = 250;
const totalPoints = 800;
const noiseScale = 200;

function setup() {
  w = window.innerWidth;
  h = window.innerHeight;
  createCanvas(w, h, SVG);
  ellipseMode(CENTER);
  noFill();
  runDraw();
}

function runDraw() {
  background(255);
  stroke(0);
  // How to draw a circle...
  push();
  translate(width / 2, height / 2);
  beginShape();
  for (let i = 0; i < totalPoints; i++) {
    let x = cos(map(i, 0, totalPoints - 1, 0, 2 * Math.PI));
    let y = sin(map(i, 0, totalPoints - 1, 0, 2 * Math.PI));
    console.log((noise((x + y) / 2) - 0.5) * 2);
    let noiseX = (noise((x + y) / 2) - 0.5) * noiseScale;
    let noiseY = (noise((x + y) / 1.4) - 0.5) * noiseScale;
    // let noiseyX = ((noise((x + 1)/100) * 0.5 - 0.5) * 5) + x;
    // let noiseyY = ((noise((y + 1)/100) * 0.5 - 0.5) * 5) + y;
    vertex(x * r + noiseX, y * r + noiseY);
  }
  endShape();
  pop();
}

function keyReleased(e) {
  console.log(e);
  if (e.code === 'Space') {
    save('quad-fills.svg');
  }
}

function mouseClicked() {
  noiseSeed(millis());
  runDraw();
}
