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
    var answer = lib.alonzo('Should I tickle this unicorn?');
    assert.equal(answer,'YO!');
  });
});
