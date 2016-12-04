const Puzzle = require('../../libs/puzzle');

const directions = ['N', 'E', 'S', 'W'];
const orientations = {
  R: 1,
  L: -1,
};
const deltas = {
  N: ['x', 1],
  E: ['y', 1],
  S: ['x', -1],
  W: ['y', -1],
};

class Turtle {
  constructor() {
    this.coords = { x: 0, y: 0 };
    this.orientation = 0;
    this.visited = {};
    this.done = false;
  }

  turn(dir) {
    this.orientation += orientations[dir];

    if (this.orientation < 0) {
      this.orientation = 4 + this.orientation;
    }

    this.orientation = this.orientation % 4;
  }

  move(val, detectDupe) {
    const [axis, delta] = deltas[this.direction];

    let x = 0;
    do {
      x += 1;
      this.coords[axis] += delta;
      this.visit(this.coords);
    } while (x < val && !(this.done && detectDupe));
  }

  visit({ x, y }) {
    this.visited[x] = this.visited[x] || {};
    this.visited[x][y] = this.visited[x][y] + 1 || 1;

    if (this.visited[x][y] > 1) {
      this.done = true;
    }
  }

  get direction() {
    return directions[this.orientation];
  }

  get distance() {
    return Math.abs(this.coords.x) + Math.abs(this.coords.y);
  }
}

const process = stopAtTwice =>
  (input) => {
    const turtle = new Turtle();
    for (let i = 0; i < input.length; i += 1) {
      const x = input[i];
      const [dir, ...val] = x.split('');
      turtle.turn(dir);
      turtle.move(Number.parseInt(val.join(''), 10), stopAtTwice);
      if (turtle.done && stopAtTwice) {
        break;
      }
    }
    return turtle.distance;
  };

const p = new Puzzle({
  delimiter: /,\s+/,
  singleLine: true,
  A: process(false),
  B: process(true),
});


p.run().then(console.log);
