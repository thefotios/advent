const fs = require('fs');

const noop = data => data;

const getInput = ([,, input, type = 'A'] = []) => new Promise((resolve, reject) => {
  fs.readFile(input, 'utf-8', (err, data) => {
    if (err) { reject(err); }
    const lines = data.split('\n').filter(x => !!x);
    resolve({ data: lines, type });
  });
});

const cleanInput = ({ delimiter, numeric } = {}) => (lines) => {
  let clean = lines.map(x => x.trim().split(delimiter));
  if (numeric) {
    clean = clean.map(x => x.map(y => Number.parseInt(y, 10)));
  }
  return clean.length === 1 ? clean[0] : clean;
};

class Puzzle {
  constructor({
    delimiter = /\s+/,
    numeric = false,
    A = noop,
    B = noop,
  } = {}) {
    this.delimiter = delimiter;
    this.numeric = numeric;

    this.A = A;
    this.B = B;
  }

  set type(type) {
    switch (type.toUpperCase()) {
      case 'A':
        this.processor = this.A;
        break;
      case 'B':
        this.processor = this.B;
        break;
      default:
        throw new Error(`Unknown puzzle type ${this.type}`);
    }
  }

  run() {
    const inputCleaner = cleanInput(this);
    return getInput(process.argv)
      .then(({ data, type }) => {
        this.type = type;
        return data;
      })
      .then(inputCleaner)
      .then(data => this.processor(data));
  }
}

module.exports = Puzzle;
