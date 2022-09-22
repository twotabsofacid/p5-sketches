let p1 = {
  x: 10,
  y: 10
};
let p2 = {
  x: 600,
  y: 250
};
let p3 = {
  x: 500,
  y: 640
};
let p4 = {
  x: 40,
  y: 720
};

function setup() {
  let w = window.innerWidth;
  let h = window.innerHeight;
  createCanvas(w, h, SVG);
  noFill();
  runDraw();
}

function runDraw() {
  background(255);
  stroke(0);
  fillQuad([p1, p2, p3, p4], 100);
}

// TODO:
// if we want this to actually be density
// we need to find the area of the polygon
// (https://algorithmtutor.com/Computational-Geometry/Area-of-a-polygon-given-a-set-of-points/)
// and then figure out how many lines we want to draw
// inside of the polygon to mimic density of lines
function fillQuad(points, density) {
  let polyCenter = {
    x:
      points.reduce((partialSum, point) => partialSum + point.x, 0) /
      points.length,
    y:
      points.reduce((partialSum, point) => partialSum + point.y, 0) /
      points.length
  };
  for (let i = 0; i < density; i++) {
    push();
    translate(polyCenter.x, polyCenter.y);
    scale(map(i, 0, density - 1, 1, 0));
    quad(
      p1.x - polyCenter.x,
      p1.y - polyCenter.y,
      p2.x - polyCenter.x,
      p2.y - polyCenter.y,
      p3.x - polyCenter.x,
      p3.y - polyCenter.y,
      p4.x - polyCenter.x,
      p4.y - polyCenter.y
    );
    pop();
  }
}
