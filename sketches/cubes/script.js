let w, h;
let nodeSize = 8;
let cubeSize = 10;

class Cube {
  constructor() {
    this.nodes = [
      { x: -cubeSize, y: -cubeSize, z: -cubeSize },
      { x: -cubeSize, y: -cubeSize, z: cubeSize },
      { x: -cubeSize, y: cubeSize, z: -cubeSize },
      { x: -cubeSize, y: cubeSize, z: cubeSize },
      { x: cubeSize, y: -cubeSize, z: -cubeSize },
      { x: cubeSize, y: -cubeSize, z: cubeSize },
      { x: cubeSize, y: cubeSize, z: -cubeSize },
      { x: cubeSize, y: cubeSize, z: cubeSize }
    ];
    this.edges = [
      { begin: this.nodes[0], end: this.nodes[1] },
      { begin: this.nodes[1], end: this.nodes[3] },
      { begin: this.nodes[3], end: this.nodes[2] },
      { begin: this.nodes[2], end: this.nodes[0] },
      { begin: this.nodes[4], end: this.nodes[5] },
      { begin: this.nodes[5], end: this.nodes[7] },
      { begin: this.nodes[7], end: this.nodes[6] },
      { begin: this.nodes[6], end: this.nodes[4] },
      { begin: this.nodes[0], end: this.nodes[4] },
      { begin: this.nodes[1], end: this.nodes[5] },
      { begin: this.nodes[2], end: this.nodes[6] },
      { begin: this.nodes[3], end: this.nodes[7] }
    ];
  }
}
function setup() {
  w = window.innerWidth;
  h = window.innerHeight;
  createCanvas(w, h, SVG);
  rectMode(CENTER);
  noFill();
  runDraw();
}

function rotate3DZ(figure, theta) {
  theta = -theta;
  for (let n = 0; n < figure.nodes.length; n++) {
    const x = figure.nodes[n].x;
    const y = figure.nodes[n].y;
    figure.nodes[n].x = x * Math.cos(theta) - y * Math.sin(theta);
    figure.nodes[n].y = y * Math.cos(theta) + x * Math.sin(theta);
  }
}

function rotate3DX(figure, theta) {
  theta = -theta;
  for (let n = 0; n < figure.nodes.length; n++) {
    const y = figure.nodes[n].y;
    const z = figure.nodes[n].z;
    figure.nodes[n].y = y * Math.cos(theta) - z * Math.sin(theta);
    figure.nodes[n].z = z * Math.cos(theta) + y * Math.sin(theta);
  }
}

function rotate3DY(figure, theta) {
  theta = -theta;
  for (let n = 0; n < figure.nodes.length; n++) {
    const x = figure.nodes[n].x;
    const z = figure.nodes[n].z;
    figure.nodes[n].x = x * Math.cos(theta) - z * Math.sin(theta);
    figure.nodes[n].z = z * Math.cos(theta) + x * Math.sin(theta);
  }
}

function resetRotation(figure) {
  figure.nodes = [
    { x: -cubeSize, y: -cubeSize, z: -cubeSize },
    { x: -cubeSize, y: -cubeSize, z: cubeSize },
    { x: -cubeSize, y: cubeSize, z: -cubeSize },
    { x: -cubeSize, y: cubeSize, z: cubeSize },
    { x: cubeSize, y: -cubeSize, z: -cubeSize },
    { x: cubeSize, y: -cubeSize, z: cubeSize },
    { x: cubeSize, y: cubeSize, z: -cubeSize },
    { x: cubeSize, y: cubeSize, z: cubeSize }
  ];
}

function runDraw() {
  background(255);
  stroke(0);
  for (let y = 0; y < 40; y++) {
    for (let x = 0; x < 60; x++) {
      let mappedX = map(x, 0, 60 - 1, 0, width);
      let mappedY = map(y, 0, 40 - 1, 0, height);
      push();
      translate(mappedX, mappedY);
      let cube = new Cube();
      // console.log(noise(x/60, y/40));
      let noiseyRotateZ = noise(x / 60, y / 40) * 5;
      let noiseyRotateX = map(x, 0, 60 - 1, 0, 2);
      let noiseyRotateY = map(y, 0, 40 - 1, 0, 1.2);
      console.log(noiseyRotateZ, noiseyRotateX, noiseyRotateY);
      rotate3DZ(cube, noiseyRotateZ);
      rotate3DX(cube, noiseyRotateX);
      rotate3DY(cube, noiseyRotateY);
      for (let n = 0; n < cube.edges.length; n++) {
        line(
          cube.edges[n].begin.x,
          cube.edges[n].begin.y,
          cube.edges[n].end.x,
          cube.edges[n].end.y
        );
      }
      pop();
    }
  }
}

function keyReleased(e) {
  console.log(e);
  if (e.code === 'Space') {
    save('cubes.svg');
  }
}

function mouseClicked() {
  noiseSeed(millis());
  runDraw();
}
