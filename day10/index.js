let [,,input,iter] = process.argv

const processInput = (val) => {
  const vals = val.split('')
  const a = vals.shift();
  const retval = vals.reduce((acc, x) => {
    const len = acc.length
    const lastVal = acc[len - 1]

    if (x === lastVal) {
      acc[len - 2]++
    } else {
      acc.push(1, x)
    }

    return acc;
  }, [1, a])
  return retval.join('')
}

for(let x = 0; x < iter; x++ ) {
  input = processInput(input)
}

console.log(input.length)
