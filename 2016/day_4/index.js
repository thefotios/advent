const Puzzle = require('@thefotios/advent_puzzle');

const compareArray = (arr1, arr2) => arr1.length === arr2.length
      && arr1.every((u, i) => u === arr2[i]);

const p = new Puzzle({
  delimiter: '\n',
});

const re = new RegExp(/(.*?)(\d+)\[([a-z]{5})]/);

const getRealRooms = lines => Promise.resolve(lines.reduce((results, line) => {
  const parts = re.exec(line);
  const [, string] = parts;
  let [, , sectorId, checksum] = parts;

  checksum = checksum.split('');
  sectorId = Number.parseInt(sectorId, 10);

  const letters = string.split('-').reduce((a, x) => {
    const acc = a;
    acc.push(...(x.split('')));
    return acc;
  }, []);

  const counts = letters.reduce((a, letter) => {
    const acc = a;
    acc[letter] = acc[letter] || 0;
    acc[letter] += 1;
    return acc;
  }, {});

  const sorted = Object.keys(counts).sort((a, b) => {
    let index = counts[b] - counts[a];
    if (index === 0) {
      index = a.charCodeAt() - b.charCodeAt();
    }
    return index;
  });

  const compareTo = sorted.splice(0, checksum.length);

  if (compareArray(checksum, compareTo)) {
    results.push({ string, sectorId });
  }
  return results;
}, []));

const CODE_A = 'a'.charCodeAt();

p.A = lines => getRealRooms(lines)
  .then(data => data.reduce((acc, { sectorId }) => acc + sectorId, 0));

p.B = lines => getRealRooms(lines)
  .then(data => data.map(({ string, sectorId }) => {
    const words = string.split('-');
    words.pop();
    const rotated = words.map((word) => {
      const letters = word.split('');
      return letters.map((letter) => {
        const code = (letter.charCodeAt() - CODE_A) + sectorId;
        return String.fromCharCode((code % 26) + CODE_A);
      }).join('');
    });
    return { str: rotated.join(' '), sectorId };
  }))
  .then(results => results.filter(({ str }) => str.match(/pole/)))
  .then(([{ sectorId }]) => sectorId);
p.run();
