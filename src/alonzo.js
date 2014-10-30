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
        curry: function(fun) {
          // base the solution of this on the length property of functions
          var args = Array.prototype.slice.call(arguments, 1),
            applicableFunction = function() {
              var internalArgs = Array.prototype.slice.call(arguments, 0);
              
              if (internalArgs.length >= fun.length)
                return fun.apply(this, internalArgs);
              
              return function() {
                return applicableFunction.apply(this, internalArgs.concat(Array.prototype.slice.call(arguments, 0)));
              };
          };

          return applicableFunction.apply(this, args);
        },
        compose: function(f, g) {
          return function() {
            return f(g.apply(this, arguments));
          };
        },
        compose2: function() {
          var functions = arguments;
          
          return function() {
            var i,
              result;

            for (i = functions.lentgh - 1; i >= 0; i--) {
              if (i === functions.lentgh - 1)
                result = functions[i].apply(this, arguments);
              else
                result = functions[i].call(this, result);
            }

            return result;
          };
        }
      };
    }

    // Return a value to define the module export.
    // This example returns as functions, but the module
    // can return an object as the exported value.
    return Alonzo;
  })
);