const circleDiam = 40;
const xCircles = 40;
const yCircles = 20;
function setup() {
  let w = window.innerWidth;
  let h = window.innerHeight;
  createCanvas(w, h, SVG);
}

function draw() {
  background(255);
  fill(0);
  noStroke();
  for (let x = 0; x < xCircles; x++) {
    for (let y = 0; y < yCircles; y++) {
      let xPos = map(x, 0, xCircles - 1, circleDiam, width - circleDiam);
      let yPos = map(y, 0, yCircles - 1, circleDiam, height - circleDiam);
      circle(xPos, yPos, circleDiam * Math.abs(noise((x + y * 2 + 5)/100000 * millis())));
    }
  }
}

function keyReleased(e) {
  console.log(e);
  if (e.code === 'Space') {
    save('circle-grid.svg');
  }
}