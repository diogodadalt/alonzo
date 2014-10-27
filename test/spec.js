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
    var answer = lib.alonzo().msg('Should I tickle this unicorn?');
    assert.equal(answer, 'YO!');
  });
});

describe('Curry test', function() {
  it('should curry a function with variable ammount of arguments', function() {
  	var add = function(a, b) { return a + b; },
    	fun = lib.alonzo().curry(add),
    	partialAnswer = fun(1),
    	answer = partialAnswer(2);
    assert.equal(answer, 3);
  });
});