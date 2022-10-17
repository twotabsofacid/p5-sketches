let img;
let buffer;
let imgW = 50;
let imgH = 66;
let squareSize = 24;

function preload() {
  img = loadImage('img.jpg');
}

function setup() {
  w = window.innerWidth;
  h = window.innerHeight;
  createCanvas(w, h, SVG);
  noFill();
  pixelDensity(1);
  buffer = createGraphics(imgW, imgH);
  buffer.background(255);
  buffer.image(img, 0, 0, imgW, imgH);
  rectMode(CENTER);
  ellipseMode(CENTER);
  angleMode(DEGREES);
  runDraw();
}

function runDraw() {
  background(255);
  stroke(0);
  buffer.loadPixels();
  console.log(buffer.pixels);
  let grayscaleValues = [];
  for (let i = 0; i < buffer.pixels.length; i+=4) {
    let r = buffer.pixels[i];
    let g = buffer.pixels[i + 1];
    let b = buffer.pixels[i + 2];
    let c = (r + g + b)/3;
    grayscaleValues.push(c);
  }
  for (let y = 0; y < imgH; y++) {
    for (let x = 0; x < imgW; x++) {
      let flatPos = imgW * y + x;
      let c = grayscaleValues[flatPos];
      // console.log(c);
      // We have 20x20 area to work in...
      let mappedC = parseInt(map(c, 0, 255, squareSize/2, 0));
      console.log(mappedC);
      for (let i = 0; i < mappedC; i++) {
        push();
        translate(y * squareSize - squareSize, x * squareSize - squareSize);
        // scale(map(i, 0, mappedC - 1, 1, 0.05));
        scale(map(i, 0, squareSize/2, 0.5, 12));
        rotate(360/(i + 6));
        arc(0, 0, squareSize, squareSize, 0, 180);
        // ellipse(0, 0, squareSize);
        pop();
      }
    }
  }
}

function keyReleased(e) {
  console.log(e);
  if (e.code === 'Space') {
    save('quad-fills.svg');
  }
}

function mouseClicked() {
  // noiseSeed(millis());
  // runDraw();
}
