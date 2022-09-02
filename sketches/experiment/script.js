const numSpots = 100;
const posArr = [];
const antsArr = [];
let antDir = 0;
let w, h;

function setup() {
  w = window.innerWidth;
  h = window.innerHeight;
  createCanvas(w, h, SVG);
  // Creating a starting position matrix
  for (let x = 0; x < numSpots; x++) {
    for (let y = 0; y < numSpots; y++) {
      if (y === 0) {
        posArr.push([]);
      }
      posArr[x][y] = 0;
    }
  }
  // Place a bunch of random ants
  for (let i = 0; i < 20; i++) {
    let ranX = Math.floor(random(0, numSpots));
    let ranY = Math.floor(random(0, numSpots));
    let ranDir = Math.floor(random(0, 4)) * 90;
    antsArr.push(new Ant(ranX, ranY, ranDir));
  }
  // frameRate(2);
}

function draw() {
  background(255);
  // Grid
  // for (let i = 0; i < numSpots; i++) {
  //   let xPos = map(i, 0, numSpots - 1, width / numSpots, width);
  //   let yPos = map(i, 0, numSpots - 1, height / numSpots, height);
  //   line(xPos, 0, xPos, height);
  //   line(0, yPos, width, yPos);
  // }
  for (let x = 0; x < numSpots; x++) {
    for (let y = 0; y < numSpots; y++) {
      // if our ant is standing here
      let foundAnt = antsArr.findIndex((ant) => ant.x === x && ant.y === y);
      if (foundAnt > -1) {
        // if the current square is white,
        if (posArr[x][y] === 0) {
          // Paint it black
          posArr[x][y] = 1;
          // And turn to the right
          antsArr[foundAnt].dir =
            antsArr[foundAnt].dir - 90 < 0 ? 270 : antsArr[foundAnt].dir - 90;
        } else {
          // Paint it white
          posArr[x][y] = 0;
          // And turn to the left
          antsArr[foundAnt].dir = (antsArr[foundAnt].dir + 90) % 360;
        }
      }
      if (posArr[x][y] === 1) {
        noFill();
        stroke(0);
        rect((x * width) / numSpots - 100, (y * height) / numSpots - 100, 200, 200);
        // circle(
        //   (x * width) / numSpots,
        //   (y * height) / numSpots,
        //   260
        // );
      }
    }
  }
  antsArr.forEach((ant) => {
    switch (ant.dir) {
      case 0:
        ant.x = (ant.x + 1) % numSpots;
        break;
      case 90:
        ant.y = ant.y - 1 < 0 ? numSpots - 1 : ant.y - 1;
        break;
      case 180:
        ant.x = ant.x - 1 < 0 ? numSpots - 1 : ant.x - 1;
        break;
      case 270:
        ant.y = (ant.y + 1) % numSpots;
        break;
      default:
        break;
    }
  });
}

class Ant {
  constructor(x, y, dir) {
    this.x = x;
    this.y = y;
    this.dir = dir;
  }
}

function keyReleased(e) {
  console.log(e);
  if (e.code === 'Space') {
    save('cone.svg');
  }
}
