let buildings = [];
const gridSize = {
  x: 50,
  y: 50
};
let maxFloors = 100;
let totalBuildings = 100;
let w, h;
let numPresses = 0;
let channels = [];
let pg;

function setup() {
  w = window.innerWidth;
  h = window.innerHeight;
  createCanvas(w, h, SVG);
  imageMode(CENTER);
  // pg = createGraphics(w * 2, h * 2);
  console.log(pg);
  fill(255);
  noFill();
  stroke(0);
  strokeWeight(8);
  rectMode(CENTER);
  angleMode(DEGREES);
  channels.push(color(255, 255, 0, 128));
  channels.push(color(255, 255, 0, 128));
  channels.push(color(255, 255, 0, 128));
  createBuildings();
  drawOnce();
}

function createBuildings() {
  buildings = [];
  for (let i = 0; i < totalBuildings; i++) {
    let newBuilding = new Building(
      floor(random(gridSize.x)),
      floor(random(gridSize.y)),
      max(1, floor(random(gridSize.x / 5))),
      max(1, floor(random(gridSize.y / 5))),
      max(4, floor(random(maxFloors))),
      floor(random(0, channels.length))
    );
    if (buildings.length) {
      if (doesItCollide(newBuilding, buildings)) {
      } else {
        buildings.push(newBuilding);
      }
    } else {
      buildings.push(newBuilding);
    }
  }
  buildings = buildings.sort((a, b) => {
    return a.y - b.y;
  });
}

function doesItCollide(building, buildingsArr) {
  let collisionArr = buildingsArr.map((buildingFromArr) => {
    // if we're over to the left of existing buildings,
    // or we're over to the right of them
    if (
      building.x + building.w/2 <= buildingFromArr.x - buildingFromArr.w/2 ||
      building.x - building.w/2 >= buildingFromArr.x + buildingFromArr.w/2
    ) {
      return false;
    }
    // if we're above the existing buildings...
    // or below them
    if (
      building.y + building.h/2 <= buildingFromArr.y - buildingFromArr.h/2 ||
      building.y - building.h/2 >= buildingFromArr.y + buildingFromArr.h/2
    ) {
      return false;
    }
    return true;
  });
  return !collisionArr.every((item) => item === false);
}

function drawOnce() {
  background(255);
  buildings.forEach((building) => {
    building.draw();
  });
}

function drawChannel(elim) {
  background(255);
  console.log('we should eliminate stuff?', elim, numPresses);
  buildings.forEach((building) => {
    if (!elim || building.channelNumber === numPresses % channels.length) {
      building.draw();
    }
  });
}

function keyReleased(e) {
  if (e.code === 'Space') {
    save('buildings.svg');
  } else if (e.key === 'c') {
    numPresses++;
    drawChannel(true);
  } else if (e.key === 'x') {
    drawChannel(false);
  }
}

function mouseClicked() {
  createBuildings();
  drawOnce();
}

class Building {
  constructor(_x, _y, _w, _h, _floors, _channelNumber) {
    this.x = _x;
    this.y = _y;
    this.w = _w;
    this.h = _h;
    this.rotation = random(-2, 2);
    this.floors = _floors;
    this.floorHeight = 5;
    this.channelNumber = _channelNumber;
  }
  draw() {
    push();
    translate(width/2, height/2);
    rotate(35);
    for (let i = 0; i < this.floors; i++) {
      push();
      stroke(channels[this.channelNumber])
      let x = map(this.x, 0, gridSize.x - 1, -width/2, width * 2);
      let y = map(this.y, 0, gridSize.y - 1, -height/2, height * 2);
      let w = map(this.w, 0, gridSize.x - 1, 0, width * 2);
      let h = map(this.h, 0, gridSize.y - 1, 0, height * 2);
      translate(x - i * this.floorHeight/1.3 - width/2, y - i * this.floorHeight - height/2);
      rotate(this.rotation);
      // rotate(this.rotation);
      rect(0, 0, w, h);
      pop();
    }
    pop();
  }
}
