let w, h;
let buffer;
let img;

function preload() {
  img = loadImage('img.png');
}

function setup() {
  console.log(img);
  w = img.width;
  h = img.height;
  createCanvas(w, h, SVG);
  noFill();
  pixelDensity(1);
  buffer = createGraphics(img.width, img.height);
  buffer.background(255);
  buffer.image(img, 0, 0, img.width, img.height);
  buffer.loadPixels();
  console.log(buffer.pixels);
  drawOnce();
}

function drawOnce() {
  background(255);
  for (let i = 0; i < buffer.pixels.length; i += 4) {
    let x = floor(i / 4) % img.width;
    let y = floor(i / 4 / img.width);
    stroke(buffer.pixels[i], buffer.pixels[i + 1], buffer.pixels[i + 2]);
    point(x, y);
    console.log(
      'we doing something',
      x,
      y,
      buffer.pixels[i],
      buffer.pixels[i + 1],
      buffer.pixels[i + 2]
    );
  }
}

function keyReleased(e) {
  console.log(e);
  if (e.code === 'Space') {
    save('image-to-svg.svg');
  }
}

function mouseClicked() {
  noiseSeed(millis());
  // drawOnce();
}
