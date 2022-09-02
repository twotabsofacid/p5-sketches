function setup() {
  createCanvas(800, 800, SVG);
  noStroke();
}

function draw() {
  background(255);
  let xStart = 0;
  let yStart = 200;
  let quadW = width / 2;
  let quadH = 22;
  let quadSkewH = 200;
  let quadSkewW = 20;
  let quadDepth = 100;
  for (let i = 0; i < 20; i++) {
    let noisey =
      noise((i + 10) * 2 * sin(millis() / 10000)) * 5 +
      sin(((i + 10) / 1000) * millis());
    yStart += noisey;
    quadDepth -= noisey;
    fill(0);
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
    fill(255, map(i, 0, 19, 100, 220), map(i, 0, 19, 220, 100));
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

function keyReleased(e) {
  console.log(e);
  if (e.code === 'Space') {
    save('cone.svg');
  }
}
