/**
 * alonzo
 *
 *    Compose functionality
 */

'use strict';

var assert = require('assert'),
  lib = require('../src/alonzo');

describe('Composition test: only the function as parameter', function() {
	it('should compose functions according with the order they are passed.', function() {
    var add = function(a, b) { return a + b; },
      multiplyBy3 = function(a) { return a * 3; },
      fun = lib.Alonzo().compose2(multiplyBy3, add),
      answer = fun(1, 2);

    assert.equal(answer, 9);
  });
});