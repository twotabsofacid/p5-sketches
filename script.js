// convert a color image into a cyan and magenta print
let img;

function preload() {
  img = loadImage('/img/water.png');
}

function setup() {
  let w = window.innerWidth;
  let h = window.innerHeight;
  createCanvas(w, h);

  let one = new Riso('seablue');
  one.fill(220);
  let two = new Riso('seafoam');
  two.fill(110);
  let three = new Riso('fluorescentorange');
  three.fill(220);

  let justBlues = extractRGBChannel(img, 'blue');
  let justGreens = extractRGBChannel(img, 'green');
  let justReds = extractRGBChannel(img, 'red');

  one.image(justBlues, 0, 0, w, h);
  two.image(justGreens, 0, 0, w, h);
  three.image(justReds, 0, 0, w, h);

  drawRiso();
}
