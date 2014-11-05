	    ___    __                            _     
	   /   |  / /___  ____  ____  ____      (_)____
	  / /| | / / __ \/ __ \/_  / / __ \    / / ___/
	 / ___ |/ / /_/ / / / / / /_/ /_/ /   / (__  ) 
	/_/  |_/_/\____/_/ /_/ /___/\____(_)_/ /____/  
	                                  /___/     


## Overview

Alonzo.js is intended to provide functional features. It was created initially to exercise the functional paradigm concepts and for my personal use. But feel free to give it a try. 

## Examples

#### Currying

```js
var add = function(a, b) { return a + b; },
	fun = lib.Alonzo().curry(add),
	partialAnswer = fun(1),
	answer = partialAnswer(2);
```

#### Composition

```js
var add = function(a, b) { return a + b; },
	multiplyBy3 = function(a) { return a * 3; },
	fun = lib.Alonzo().compose(multiplyBy3, add),
	answer = fun(1, 2);
```

##### Tuples

```js
var tuple = lib.Alonzo().tuple('some string', {a: '', b: 2});
console.log(tuple._1); // 'some string'
console.log(tuple._2); // {a: '', b: 2}
```