/**
 * alonzo
 *
 *    Library test
 */

'use strict';

var assert = require('assert'),
lib = require('../src/alonzo');

describe('Basic library test', function() {
	it('should answer all questions with YO!', function() {
		var answer = lib.Alonzo().msg('Should I tickle this unicorn?');
		assert.equal(answer, 'YO!');
	});
});

describe('Curry test: only the function as parameter', function() {
	it('should curry a function with variable ammount of arguments', function() {
		var add = function(a, b) { return a + b; },
		  fun = lib.Alonzo().curry(add),
		  partialAnswer = fun(1),
		  answer = partialAnswer(2);
		
    assert.equal(answer, 3);
	});
});

describe('Curry test: function and one argument as parameter separated by comma (partial application)', function() {
  it('should curry a function with variable ammount of arguments', function() {
    var add = function(a, b) { return a + b; },
      partialAnswer = lib.Alonzo().curry(add, 1),
      answer = partialAnswer(2);
    
    assert.equal(answer, 3);
  });
});

describe('function and all arguments as parameter separated by comma (total application)', function() {
  it('should curry a function with variable ammount of arguments', function() {
    var add = function(a, b) { return a + b; },
      answer = lib.Alonzo().curry(add, 1, 2);

    assert.equal(answer, 3);
  });
});

describe('Curry test: function and one argument as parameter separated by parenthesis (partial application)', function() {
  it('should curry a function with variable ammount of arguments', function() {
    var add = function(a, b) { return a + b; },
      partialAnswer = lib.Alonzo().curry(add)(1),
      answer = partialAnswer(2);

    assert.equal(answer, 3);
  });
});

describe('Curry test: function and all arguments as parameter separated by parenthesis (total application)', function() {
  it('should curry a function with variable ammount of arguments', function() {
    var add = function(a, b) { return a + b; },
    answer = lib.Alonzo().curry(add)(1)(2);

    assert.equal(answer, 3);
  });
});