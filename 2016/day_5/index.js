const Puzzle = require('@thefotios/advent_puzzle');
const crypto = require('crypto');

function getHash(input, id) {
  const hash = crypto.createHash('md5');
  hash.update(`${input}${id}`);
  return hash.digest('hex');
}

function* hashSequence(input, id = 0) {
  let i = id;
  while (true) {
    i += 1;
    yield getHash(input, i);
  }
}

const findPass = validate => ([input, ...args]) => {
  const [length, numZeroes, starting] = [...args, 0].map(x => Number.parseInt(x, 10));

  const zeroString = Array(numZeroes + 1).join('0');
  let pass = new Array(length);

  const hasher = hashSequence(input, starting);

  for (const hash of hasher) {
    if (hash.startsWith(zeroString)) {
      const index = hash[numZeroes];
      const val = hash[numZeroes + 1];

      pass = validate({ index, length, pass, val });
    }
    if (pass.filter(x => !!x).length === length) {
      break;
    }
  }

  return pass.join('');
};

const p = new Puzzle({ delimiter: /,\s*/ });

p.A = findPass(({ pass, index: val }) => [...pass, val]);

p.B = findPass(({ index, length, pass, val }) => {
  const pass1 = pass;
  if (index < length && typeof pass[index] === 'undefined') {
    pass1[index] = val;
  }
  return pass1;
});

p.run({ data: 'abbhdwsy,8,5', type: 'A' });
p.run({ data: 'abbhdwsy,8,5', type: 'B' });
