// Uses AMD or browser globals to create a module.

// Grabbed from https://github.com/umdjs/umd/blob/master/amdWeb.js.
// Check out https://github.com/umdjs/umd for more patterns.

// Defines a module "Alonzo".
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
      root.Alonzo = factory();
    }
  }(this, function () {
    'use strict';

    /*** YOUR LIBRARY CODE GOES HERE! ***/

    function Alonzo() {
      return {
        msg: function(complicated_question) {
          return (complicated_question === 'The life, universe and everything?') ? 'YO!' : 'YO!';
        },
        curry: function(fun) {
          // base the solution of this on the length property of functions
          var args = Array.prototype.slice.call(arguments, 1),
            applicableFunction = function() {
              var internalArgs = Array.prototype.slice.call(arguments, 0);
              
              args = args.concat(internalArgs);
              //console.log(args);
              //console.log(args.length);
              //console.log(fun.length);
              if (args.length === fun.length) {
                return fun.apply(this, args);
              } else {
                return applicableFunction;
              }
          };

          return applicableFunction();
        }
      };
    }

    // Return a value to define the module export.
    // This example returns as functions, but the module
    // can return an object as the exported value.
    return Alonzo;
  }));


/*'use strict'

;(function() {
  return function() {
    var Monad = {};
    Monad.prototype.unit = function(value) {

    };
  };  
}.call(this));*/