let w, h;
function setup() {
  w = window.innerWidth;
  h = window.innerHeight;
  createCanvas(w, h, SVG);
  rectMode(CENTER);
  angleMode(DEGREES);
  noFill();
  drawOnce();
}

function draw() {}

function drawOnce() {
  background(255);
  let center = 0;
  let startCircleSize = w/2;
  let circleSize = startCircleSize;
  let iterations = w/20;
  for (let i = 0; i < iterations; i++) {
    center += noise(i/millis()) * 5;
    push();
    translate(width / 2, height / 2);
    circle(center, center, circleSize);
    pop();
    circleSize = circleSize - startCircleSize / iterations;
  }
}

function keyReleased(e) {
  console.log(e);
  if (e.code === 'Space') {
    save('cone.svg');
  }
}

function mouseClicked() {
  noiseSeed(millis());
  drawOnce();
}