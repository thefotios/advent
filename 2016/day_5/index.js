const Puzzle = require('@thefotios/advent_puzzle');
const crypto = require('crypto');

function getHash(input, id) {
  const hash = crypto.createHash('md5');
  hash.update(`${input}${id}`);
  return hash.digest('hex');
}

function* hashSequence(input, id = 0) {
  let i = 0;
  while (true) {
    yield { hash: getHash(input, id + i), i: id + i };
    i += 1;
  }
}

const p = new Puzzle({ delimiter: /,\s*/ });

p.A = ([input, length, numZeroes]) => {
  const zeroString = Array(Number.parseInt(numZeroes, 10) + 1).join('0');
  const hasher = hashSequence(input);
  const pass = [];

  for (const { hash } of hasher) {
    if (hash.startsWith(zeroString)) {
      pass.push(hash[numZeroes]);
      console.log({ hash, pass });
    }
    if (pass.filter(x => !!x).length === Number.parseInt(length, 10)) {
      break;
    }
  }

  return pass.join('');
};

function* validSeq({ input, args }) {
  const [length, numZeroes, starting] = [args, 0].map(x => Number.parseInt(x, 10));

  const zeroString = Array(numZeroes + 1).join('0');
  const hasher = hashSequence(input, starting);
  const pass = new Array(length);
}

p.B = ([input, ...args]) => {
  const g = validSeq({ input, args });
  const [length, numZeroes, starting] = [...args, 0].map(x => Number.parseInt(x, 10));

  const zeroString = Array(numZeroes + 1).join('0');
  const hasher = hashSequence(input, starting);
  const pass = new Array(length);

  for (const { hash } of hasher) {
    if (hash.startsWith(zeroString)) {
      const index = hash[numZeroes];
      const val = hash[numZeroes + 1];

      if (index < length && typeof pass[index] === 'undefined') {
        pass[index] = val;
      }
      console.log({ hash, pass, index, val, length });
    }
    if (pass.filter(x => !!x).length === length) {
      break;
    }
  }

  return pass.join('');
};

// p.run({ data: 'abbhdwsy,8,5', type: 'A' });
// p.run({ data: 'abbhdwsy,8,5', type: 'B' });

// p.run({ data: 'abbhdwsy,2,5', type: 'A' });
p.run({ data: 'abbhdwsy,2,5', type: 'B' });
