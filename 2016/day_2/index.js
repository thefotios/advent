const input = require('../../libs/input');
const Puzzle = require('../../libs/puzzle');

const deltas = {
  U: ['y', 1],
  R: ['x', 1],
  D: ['y', -1],
  L: ['x', -1],
};

const otherAxis = {
  x: 'y',
  y: 'x',
};

class Lock {
  constructor({ x = 0, y = 0 } = {}) {
    this.coords = { x, y };
  }

  move(dir) {
    const [axis, delta] = deltas[dir];
    this.coords[axis] += delta;
    this.validate(axis, delta);
  }
}

class LockA extends Lock {
  validate(axis, delta) {
    if (delta < 0) {
      this.coords[axis] = Math.max(this.coords[axis], delta);
    } else {
      this.coords[axis] = Math.min(this.coords[axis], delta);
    }
  }

  get position() {
    let { x, y } = this.coords;
    x += 2;
    y = -(y - 1);
    return (y * 3) + x;
  }
}

class LockB extends Lock {
  constructor() {
    super({ x: -2 });
    this.grid = [
      [1],
      [2, 3, 4],
      [5, 6, 7, 8, 9],
      ['A', 'B', 'C'],
      ['D'],
    ];
  }

  validate(axis, delta) {
    const curAxis = otherAxis[axis];
    const axisPos = this.coords[curAxis];
    const limit = (2 - Math.abs(axisPos)) * delta;

    if (delta < 0) {
      this.coords[axis] = Math.max(this.coords[axis], limit);
    } else {
      this.coords[axis] = Math.min(this.coords[axis], limit);
    }
  }

  get position() {
    let { x, y } = this.coords;
    y = 4 - (y + 2);
    const row = this.grid[y];
    x = Math.floor(row.length / 2) + x;
    const val = row[x];

    return val;
  }
}

const p = new Puzzle({
  delimiter: '',
  A: lines => ({ lines, lock: new LockA() }),
  B: lines => ({ lines, lock: new LockB() }),
});

p.run().then(({ lines, lock }) => lines.reduce((acc, parts) => {
  parts.forEach(x => lock.move(x));
  acc.push(lock.position);
  return acc;
}, []).join('')).then(result => console.log(result));

// input.getInput((err, lines, [puzzle = 'A']) => {
//   const lock = (puzzle.toUpperCase() === 'B') ? new LockB() : new LockA();
//   const result = lines.reduce((acc, line) => {
//     const parts = line.split('');
//     parts.forEach(x => lock.move(x));
//     acc.push(lock.position);
//     return acc;
//   }, []).join('');
//   console.log(result);
// });
