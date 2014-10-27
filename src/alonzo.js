// Uses AMD or browser globals to create a module.

// Grabbed from https://github.com/umdjs/umd/blob/master/amdWeb.js.
// Check out https://github.com/umdjs/umd for more patterns.

// Defines a module "alonzo".
// Note that the name of the module is implied by the file name. It is best
// if the file name and the exported global have matching names.

// If you do not want to support the browser global path, then you
// can remove the `root` use and the passing `this` as the first arg to
// the top function.

(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else {
        // Browser globals
        root.alonzo = factory();
    }
}(this, function () {
    'use strict';

    /*** YOUR LIBRARY CODE GOES HERE! ***/

    function alonzo() {        
        return {
            msg: function(complicated_question) {
                return (complicated_question === 'The life, universe and everything?') ? 'YO!' : 'YO!';
            },
            curry: function(fun) {
                // base the solution of this on the length property of functions
                var args = Array.prototype.slice.call(arguments, 1);
                return function() {
                    var internalArgs = Array.prototype.slice.call(arguments, 0);
                    return fun.apply(this, args.concat(internalArgs));
                };
            }
        };
    }

    // Return a value to define the module export.
    // This example returns a functions, but the module
    // can return an object as the exported value.
    return alonzo;
}));


/*'use strict'

;(function() {
	return function() {
		var Monad = {};
		Monad.prototype.unit = function(value) {

		};
	};	
}.call(this));*/