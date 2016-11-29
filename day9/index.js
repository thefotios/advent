const fs = require('fs');

const calculate = (distances,type) => {
  const names = Object.keys(distances)
  const start = process.hrtime()
  let min;
  for(let perm of genPermutation(names)) {
    let dist = 0;
    for(let pair of pairWise(perm)) {
      const [from,to] = pair
      const distance = distances[from][to]
      dist += distance
    }
    if (!min ||
      (type === 'min' && dist < min) ||
      (type === 'max' && dist > min)
    ) {
      min = dist
    }
  }
  console.log(min)
  const done = process.hrtime(start)
  console.info("Execution time (hr): %ds %dms", done[0], done[1]/1000000);
}

function* genPermutation(arr) {
  if(arr.length === 1) {
    yield [arr[0]]
  } else {
    for(let i = 0; i < arr.length; i++) {
      const x = [...arr]
      const val = x.splice(i,1)[0]
      for (let n of genPermutation(x)) {
        yield [val, ...n]
      }
    }
  }
}

function* pairWise(arr) {
  for(let i = 0; i < arr.length - 1; i++) {
    yield [arr[i], arr[i+1]]
  }
}

const [,,file,type] = process.argv
fs.readFile(file, 'utf-8', (err, data) => {
  const lines = data.split(/\n/).filter(x => x);
  const distances = lines.reduce((acc, line) => {
    const [from,,to,,_dist] = line.split(/ /)
    const dist = Number.parseInt(_dist)
    acc[from] = acc[from] || {};
    acc[to] = acc[to] || {};
    acc[from][to] = dist;
    acc[to][from] = dist;
    return acc
  }, {});
  calculate(distances, type);
})
