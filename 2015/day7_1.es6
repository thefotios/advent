'use strict';
var PromiseExt = require('./promiseExt.es6');

let functions = {
  AND: (a, b) => {
    return [a, b, (res) => {
      return res[a] & res[b]
    }];
  },
  OR: (a, b) => {
    return [a, b, (res) => {
      return res[a] | res[b]
    }];
  },
  LSHIFT: (a, shift) => {
    return [a, (res) => {
      return res[a] << shift;
    }];
  },
  RSHIFT: (a, shift) => {
    return [a, (res) => {
      return res[a] >> shift;
    }];
  },
  NOT: (a) => {
    return [a, (res) => {
      return Math.pow(2,16) + ~res[a];
    }];
  },
  SET: (a) => {
    let x;
    x = Number.parseInt(a);
    if(Number.isInteger(x)) {
      return Promise.resolve(x);
    } else {
      return [a, (res) => {
        return res[a];
      }];
    }
  }
}

var processLine = (operations, line) => {
  let parts = line.split(/\s/);
  let target = parts.pop();
  // Remove the ->
  parts.pop();

  let src1, operation, src2;
  switch(parts.length) {
    case 1:
      operation = 'SET';
      src1 = parts.shift();
      break;
    case 2:
      operation = parts.shift();
      src1 = parts.shift();
      break;
    case 3:
      src1 = parts.shift();
      operation = parts.shift();
      src2 = parts.shift();
      break;
    default:
      throw new Error("This shouldn't happen", parts);
  }

  // Explicitly set undefined numbers
  [src1, src2].forEach((a) => {
    let x;
    x = Number.parseInt(a);
    if (Number.isInteger(x)) {
      operations[x] = functions['SET'](x);
      // Set the string version as well in case something requires that one
      operations[a] = functions['SET'](x);
    }
  });

  operations[target] = functions[operation](src1, src2);
}

let operations = {};

var rl = require('readline').createInterface({
  input: process.stdin
});

rl.on('line', (line) => {
  processLine(operations, line);
});

rl.on('close', () => {
  PromiseExt.auto(operations).then((res) => {
    Object.keys(res).sort().forEach((k) => {
      console.log(`${k}: ${res[k]} - ${res[k].toString(2)}`);
    })
  });
});
