function setup() {
  let w = window.innerWidth;
  let h = window.innerHeight;
  createCanvas(w, h, SVG);
  noFill();
  const shapes = runSetup();
  runDraw(shapes);
}

const runSetup = () => {
  noiseSeed(millis());
  const shapes = [];
  const totalShapes = floor(random(15, 200));
  for (let i = 0; i < totalShapes; i++) {
    const totalVertices = floor(random(15, 20));
    const positions = [];
    for (let j = 0; j < totalVertices; j++) {
      const noiseyX = noise(cos(((j/100 + i + 1) * millis()) / 100));
      const noiseyY = noise(sin(((j/240 - i - 1) * millis()) / 100));
      positions.push({
        x: cos(map(j, 0, totalVertices, 0, PI * 2)) * 550 * noiseyX,
        y: sin(map(j, 0, totalVertices, 0, PI * 2)) * 550 * noiseyY
      });
    }
    shapes[i] = positions;
  }
  return shapes;
};

const runDraw = (shapes) => {
  background(255, 89, random(100, 255));
  background(255);
  translate(width / 2, height / 2);
  for (let i = 0; i < shapes.length; i++) {
    const len = shapes[i].length;
    push();
    rotate(map(i, 0, shapes.length, 0, 360));
    beginShape();
    for (let j = 0; j < len; j++) {
      curveVertex(shapes[i][j].x, shapes[i][j].y);
    }
    for (let j = 0; j < len; j++) {
      curveVertex(shapes[i][j].x, shapes[i][j].y);
    }
    endShape();
    pop();
  }
  translate(-width / 2, -height / 2);
};

function keyReleased(e) {
  console.log(e);
  if (e.code === 'Space') {
    save('butthole.svg');
  }
}

function mouseClicked() {
  const shapes = runSetup();
  runDraw(shapes);
}
