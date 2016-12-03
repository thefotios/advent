const fs = require('fs');

const noop = data => data;

class Puzzle {
  constructor({
    delimiter = /\s+/,
    numeric = false,
    A = noop,
    B = noop,
  } = {}) {
    this.numeric = numeric;
    this.delimiter = delimiter;

    this.A = A;
    this.B = B;
  }

  run() {
    return this.getInput()
      .then(({ data, type }) => {
        this.type = type.toUpperCase();
        return this.cleanInput(data);
      })
      .then((data) => {
        if (this.type === 'A') {
          return this.A(data);
        } else if (this.type === 'B') {
          return this.B(data);
        } else {
          throw new Error(`Unknown puzzle type ${this.type}`);
        }
      });
  }

  cleanInput(lines) {
    let clean = lines.map(x => x.trim().split(this.delimiter));
    if (this.numeric) {
      clean = clean.map(x => x.map(y => Number.parseInt(y, 10)));
    }
    return clean;
  }

  getInput() {
    return new Promise((resolve, reject) => {
      const [,, input, type = 'A'] = process.argv;
      fs.readFile(input, 'utf-8', (err, data) => {
        if (err) { reject(err); }
        const lines = data.split('\n').filter(x => !!x);
        resolve({ data: lines, type });
      });
    });
  }
}

module.exports = Puzzle;
