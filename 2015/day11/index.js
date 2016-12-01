const [,, input] = process.argv;

const doubles = /(?<=\1(.).*\2(.))/g
const ambiguous = /^[^iol]+$/;

const hasDoubles = str => (doubles.exec(str) ? true : false)

const isAmbiguous = str => (ambiguous.exec(str) ? true : false)

const increasing = (str) => {
  const chars = str.split('');
  let acc = [];
  for (const x of chars) {
    const code = x.charCodeAt();
    const lastChar = acc[acc.length - 1];
    if (code === lastChar + 1) {
      acc.push(code);
    } else {
      acc = [code];
    }
    if (acc.length === 3) {
      retval = true;
      break;
    }
  }
  return acc.length === 3;
};

const tests = [
  increasing,
  hasDoubles,
  isAmbiguous,
];

const runTests = (str) => {
  const results = tests.map(x => x(str));
  const failedTests = results.filter(x => !x).length;
  return failedTests === 0;
};

const LOWER_A = 'a'.charCodeAt();

const toArr = str =>
  str.split('').map(x => x.charCodeAt() - LOWER_A);

const fromArr = arr =>
  arr.map(x => String.fromCharCode(x + LOWER_A));

const incArr = (arr, inc, base = 26) => {
  const vals = arr.reverse();
  for (let i = 0; i < inc.length; i += 1) {
    vals[i] = (vals[i] + inc[i]) % base;
  }
  return vals.reverse();
};

const toRadix = (N, radix) => {
  const vals = [];
  let Q = Math.floor(Math.abs(N));
  let R;

  while (Q !== 0) {
    R = Q % radix;
    vals.push(R);
    Q = (Q - R) / radix;
  }
  return vals;
};

const incrementString = (str, i) => {
  const arr = toArr(str);
  const inc = toRadix(i, 26);

  const newVal = fromArr(incArr(arr, inc));
  return newVal.join('');
};

const str = input;
let i = 0;
while(true) {
  i++
  const newVal = incrementString(str, i)
  const passes = runTests(newVal)
  if (i % 1000 === 0) {
    console.log({i, newVal})
  }
  if (passes) {
    console.log(newVal)
    break
  }
}

// let i = 0;
// for(let pw of pwCombinations(input)){
//   if ( i > 100 ) {
//     break
//   }
//   console.log(pw)
//   i++
// }
