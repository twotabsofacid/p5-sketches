function setup() {
  createCanvas(window.innerWidth, window.innerHeight, SVG);
  noFill();
  stroke(0);
  angleMode(DEGREES);
  drawOnce(color(0, 255, 0));
  // drawOnce(color(0, 0, 255));
  // drawOnce(color(0, 255, 0));
}

function drawOnce(col) {
  //background(255);
  let numSteps = 10;
  stroke(col);
  let xStart, yStart, quadW, quadH, quadSkewH, quadSkewW, quadDepth;
  xStart = 0;
  yStart = 400;
  quadH = 22;
  quadSkewH = 200;
  quadSkewW = 20;
  quadDepth = 100;
  quadW = width - quadSkewW * numSteps;
  for (let i = 0; i < numSteps; i++) {
    let noisey =
      noise((i + 10) * 2 * sin(millis() / 10000)) * 5 +
      sin(((i + 10) / 1000) * millis());
    noisey = noisey * random(-40, 40);
    yStart += noisey;
    quadDepth -= noisey;
    quad(
      xStart,
      yStart,
      xStart + quadSkewW,
      yStart + quadH,
      xStart + quadSkewW,
      yStart + quadH + quadDepth,
      xStart,
      yStart + quadDepth
    );
    quad(
      xStart + quadSkewW,
      yStart + quadH,
      xStart + quadW + quadSkewW,
      yStart - quadSkewH + quadH,
      xStart + quadW + quadSkewW,
      yStart - quadSkewH + quadH + quadDepth,
      xStart + quadSkewW,
      yStart + quadH + quadDepth
    );
    quad(
      xStart,
      yStart,
      xStart + quadW,
      yStart - quadSkewH,
      xStart + quadW + quadSkewW,
      yStart - quadSkewH + quadH,
      xStart + quadSkewW,
      yStart + quadH
    );
    yStart += quadH;
    xStart += quadSkewW;
  }
}

function mouseReleased(e) {
  console.log(e);
  background(255);
  drawOnce(color(0, 255, 0));
}

function keyReleased(e) {
  console.log(e);
  if (e.code === 'Space') {
    save('steps.svg');
  }
}
