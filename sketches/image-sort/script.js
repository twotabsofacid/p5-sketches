let w, h;
let buffer;
let img;

function preload() {
  img = loadImage('egon-full.jpg');
}

function setup() {
  console.log(img);
  w = img.width;
  h = img.height;
  createCanvas(w, h);
  console.log('real w, h', w, h);
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
  let colorArr = [];
  for (let i = 0; i < buffer.pixels.length; i += 4) {
    colorArr.push([
      buffer.pixels[i],
      buffer.pixels[i + 1],
      buffer.pixels[i + 2]
    ]);
  }
  colorArr = colorArr.sort((a, b) => {
    return (a[0] + a[1] + a[2]) / 3 - (b[0] + b[1] + b[2]) / 3;
  });
  for (let i = 0; i < colorArr.length; i++) {
    let x = i % w;
    let y = floor(i/w);
    stroke(colorArr[i][0], colorArr[i][1], colorArr[i][2]);
    rect(x, y, 1, 1);
  }
}

function keyReleased(e) {
  console.log(e);
  if (e.code === 'Space') {
    save('out.jpg');
  }
}

function mouseClicked() {
  noiseSeed(millis());
  // drawOnce();
}
