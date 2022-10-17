let pointsArr = [];
let w, h;

function setup() {
  w = window.innerWidth;
  h = window.innerHeight;
  createCanvas(w, h, SVG);
  noFill();
  createPoints();
  runDraw();
}

function createPoints() {
  // pointsArr.push({
  //   x: 0,
  //   y: 0
  // });
  // pointsArr.push({
  //   x: width,
  //   y: 0
  // });
  // pointsArr.push({
  //   x: width,
  //   y: height
  // });
  // pointsArr.push({
  //   x: 0,
  //   y: height
  // });
  pointsArr = [];
  pointsArr.push({
    x: random(w / 2),
    y: random(h / 2)
  });
  pointsArr.push({
    x: random(w / 2, w),
    y: random(h / 2)
  });
  pointsArr.push({
    x: random(w / 2, w),
    y: random(h / 2, h)
  });
  pointsArr.push({
    x: random(w / 2),
    y: random(h / 2, h)
  });
  // TODO how to take an arbitrary number of points,
  // divide the screen up into a grid of that size,
  // and place points in that grid so we have a shape
  // that doesnt overlap itself
}

function runDraw() {
  background(255);
  stroke(0);
  fillQuad(pointsArr, 100);
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
    let newPolyCenter = {
      x: polyCenter.x + noise(sin(i / density)) * 900,
      y: polyCenter.y + noise(cos(i / density)) * 900
    };
    translate(newPolyCenter.x, newPolyCenter.y);
    scale(map(i, 0, density - 1, 1, 0));
    //fill(255);
    quad(
      points[0].x - newPolyCenter.x,
      points[0].y - newPolyCenter.y,
      points[1].x - newPolyCenter.x,
      points[1].y - newPolyCenter.y,
      points[2].x - newPolyCenter.x,
      points[2].y - newPolyCenter.y,
      points[3].x - newPolyCenter.x,
      points[3].y - newPolyCenter.y
    );
    pop();
  }
}

function keyReleased(e) {
  console.log(e);
  if (e.code === 'Space') {
    save('quad-fills.svg');
  }
}

function mouseClicked() {
  noiseSeed(millis());
  createPoints();
  runDraw();
}
