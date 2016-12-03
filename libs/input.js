const fs = require('fs');

const getInput = (cb) => {
  const [,, input, ...args] = process.argv;
  fs.readFile(input, 'utf-8', (err, data) => {
    const lines = data.split('\n').filter(x => !!x);
    cb(err, lines, args);
  });
};

module.exports = {
  getInput,
};
