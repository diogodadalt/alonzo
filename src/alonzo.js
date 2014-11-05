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
      var API = {
        tuple: function() {
          var n = arguments.length,
            i,
            t = {};

          for (i = 0; i < n; i++) {
            t['_' + (i+1)] = arguments[i];
          }

          t.length = n;

          return t;
        },
        curry: function(fun) {
          return curryWithCallback.apply(API, [fun, null].concat(arraySlice(arguments, 1)));
        },
        compose: function() {
          var functions = arguments;
          
          return function() {
            var result,
              args = arguments;

            if (functions.length > 0) {
              if (functions[functions.length-1].length > arguments.length) {
                return curryWithCallback.apply(API, [functions[functions.length-1]].concat([function(res) {
                    return applyValueToComposedFunctions.apply(API, [res].concat(arraySlice(functions, 0, -1)));
                }]).concat(arraySlice(args, 0)));              
              } else {
                result = functions[functions.length - 1].apply(API, arraySlice(arguments, 0));
                result = applyValueToComposedFunctions.apply(API, [result].concat(arraySlice(functions, 0, -1)));                
              }
            }
            return result;
          };
        }
      };

      function arraySlice(arr, begin, end) {
        return Array.prototype.slice.call(arr, begin, end);
      }

      function curryWithCallback(fun, callback) {
        var args = arraySlice(arguments, 2),
          applicableFunction = function() {
            var internalArgs = arraySlice(arguments, 0);

            if (internalArgs.length >= fun.length) {
              if (!!callback)
                return callback(fun.apply(API, internalArgs));
              else
                return fun.apply(API, internalArgs);
            }
            
            return function() {
              return applicableFunction.apply(API, internalArgs.concat(arraySlice(arguments, 0)));
            };
        };

        return applicableFunction.apply(API, args);
      }

      function applyValueToComposedFunctions(result) {
        var functions = arraySlice(arguments, 1),
          i;
        for (i = functions.length - 1; i >= 0; i--) {
            result = functions[i].call(API, result);
        }
        return result;
      }

      return API;
    }

    // Return a value to define the module export.
    // This example returns as functions, but the module
    // can return an object as the exported value.
    return Alonzo;
  })
);