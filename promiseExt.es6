'use strict';

var EventEmitter = require('events').EventEmitter;

class PromiseExt extends Promise {
  static map(promises) {
    let keys = [];
    let values = [];

    Object.keys(promises).forEach((k) => {
      keys.push(k);
      values.push(promises[k]);
    });

    return Promise.all(values).then((results) => {
      return results.reduce(function(x, val, i) {
        let key = keys[i];
        x[key] = val;
        return x;
      }, {});
    });
  };

  static auto(obj) {
    function setPromise(promises, definitions, key) {
      // Only do things if the promise is not defined
      if (!promises[key]) {
        let vals = definitions[key];
        // If it's an array, it means that there are dependent steps
        if (Array.isArray(vals)) {
          // The last one is the promise we care about
          let promise = vals.pop();

          let _promises = vals.reduce((x, k) => {
            x[k] = setPromise(promises, definitions, k);
            return x;
          }, {});
          promises[key] = PromiseExt.map(_promises).then(promise);
        } else {
          // This is a single promise, we should set and return it
          promises[key] = vals;
        }
      }

      return promises[key];
    }

    let promises = Object.keys(obj).reduce((promises, key) => {
      setPromise(promises, obj, key);
      return promises;
    }, {});

    return PromiseExt.map(promises);
  }
}
module.exports = PromiseExt;

/**
 * Example usage
 */
 /*
PromiseExt.auto({
  b: ['a', (res) => {
    return res.a + 1;
  }],
  a: Promise.resolve(2),
  c: ['a', 'b', (res) => {
    return res.a * res.b
  }],
}).then((res) => {
  console.log(res);
});
*/
