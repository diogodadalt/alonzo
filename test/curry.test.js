/**
 * alonzo
 *
 *    Currying functionality
 * Requirements:
 * - handle receiving only a function
 * - handle receiving a function with less parameters than the total supported by the function (partial application)
 * - handle receiving a function with all the parameters supported by the function (application)
 * - handle arguments separated by comma and parenthesis
 * - handle successive partial application of functions
 */

'use strict';

var assert = require('assert'),
  lib = require('../build/src/alonzo'),
  Alonzo = new lib.Alonzo();

describe('Curry test: only the function as parameter', function() {
	it('should curry a function with variable ammount of arguments.', function() {
		var add = function(a, b) { return a + b; },
		  fun = Alonzo.curry(add),
		  partialAnswer = fun(1),
		  answer = partialAnswer(2);
		
    assert.equal(answer, 3);
	});
});

describe('Curry test: function and one argument as parameter separated by comma (partial application)', function() {
  it('should curry a function with variable ammount of arguments.', function() {
    var add = function(a, b) { return a + b; },
      partialAnswer = Alonzo.curry(add, 1),
      answer = partialAnswer(2);
    
    assert.equal(answer, 3);
  });
});

describe('function and all arguments as parameter separated by comma (application)', function() {
  it('should curry a function with variable ammount of arguments.', function() {
    var add = function(a, b) { return a + b; },
      answer = Alonzo.curry(add, 1, 2);

    assert.equal(answer, 3);
  });
});

describe('Curry test: function and one argument as parameter separated by parenthesis (partial application)', function() {
  it('should curry a function with variable ammount of arguments.', function() {
    var add = function(a, b) { return a + b; },
      partialAnswer = Alonzo.curry(add)(1),
      answer = partialAnswer(2);

    assert.equal(answer, 3);
  });
});

describe('Curry test: function and all arguments as parameter separated by parenthesis (application)', function() {
  it('should curry a function with variable ammount of arguments.', function() {
    var add = function(a, b) { return a + b; },
      answer = Alonzo.curry(add)(1)(2);

    assert.equal(answer, 3);
  });
});

describe('Curry test: multiple calls to a curried function', function() {
  it('should curry a function with variable ammount of arguments.', function() {
    var add = function(a, b) { return a + b; },
      add1 = Alonzo.curry(add)(1);

    assert.equal(add1(2), 3);
    assert.equal(add1(2), 3);
    assert.equal(add1(3), 4);
    assert.equal(add1(4), 5);
  });
});