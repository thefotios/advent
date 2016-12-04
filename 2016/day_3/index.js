const Puzzle = require('../../libs/puzzle');

const validTriangle = (sides) => {
  const [max, ...others] = sides.sort((a, b) => b - a);
  const valid = others.reduce((acc, x) => acc + x, 0) > max;
  return valid;
};

const p = new Puzzle({
  numeric: true,
});

p.B = (data) => {
  const grouped = [];
  while (data.length) {
    const group = data.splice(0, 3);
    const y = group.reduce((acc, arr) => {
      arr.forEach((val, i) => {
        acc[i].push(val);
      });
      return acc;
    }, [[], [], []]);
    grouped.push(...y);
  }
  return grouped;
};

p.run()
.then(data => data.filter(validTriangle).length)
.then(console.log);
