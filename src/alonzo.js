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
      function arraySlice(arr, pos) {
        return Array.prototype.slice.call(arr, pos);
      }

      function curryWithCallback(fun, callback) {
        var args = arraySlice(arguments, 2),
          applicableFunction = function() {
            var internalArgs = arraySlice(arguments, 0);
            
            console.log(!!callback ? callback.length: "");

            if (internalArgs.length >= fun.length) {
              if (!!callback)
                return callback(fun.apply(this, internalArgs));
              else
                return fun.apply(this, internalArgs);
            }
            
            return function() {
              console.log(!!callback ? callback.length: "");
              return applicableFunction.apply(this, internalArgs.concat(arraySlice(arguments, 0)));
            };
        };

        return applicableFunction.apply(this, args);
      }

      function composeWithNoApplication() {
        var functions = arguments,
            that = this;
          
        return function() {
          var i,
            result,
            args = arguments;

          if (functions.length > 0 && functions[functions.length-1].length > arguments.length) {
            return curryWithCallback.apply(that, [functions[functions.length-1]].
              concat(arraySlice(args, 0)), function cb(res) {
                for (i = functions.length - 1; i >= 0; i--) {
                  if (i === functions.length - 1)
                    continue;
                  else
                    res = functions[i].call(this, res);
                }
                return res;
            });              
          } else {
            for (i = functions.length - 1; i >= 0; i--) {
              if (i === functions.length - 1)
                result = functions[i].apply(this, arraySlice(arguments, 0)); //functions[i].apply(this, arguments);
              else
                result = functions[i].call(this, result);
            }
          }
          return result;
        };
      }

      return {
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
          // base the solution of this on the length property of functions
          /*var args = arraySlice(arguments, 1),
            applicableFunction = function() {
              var internalArgs = arraySlice(arguments, 0);
              
              if (internalArgs.length >= fun.length) {
                return fun.apply(this, internalArgs);
              }
              
              return function() {
                return applicableFunction.apply(this, internalArgs.concat(arraySlice(arguments, 0)));
              };
          };

          return applicableFunction.apply(this, args);*/
          console.log([fun, null].concat(arraySlice(arguments, 1)));
          return curryWithCallback.apply(this, [fun, null].concat(arraySlice(arguments, 1)));
        },
        compose: function() {
          var functions = arguments,
            that = this;
          
          return function() {
            var i,
              result,
              args = arguments;

            if (functions.length > 0 && functions[functions.length-1].length > arguments.length) {
              return curryWithCallback.apply(that, [functions[functions.length-1]].
                concat(arraySlice(args, 0)), function cb(res) {
                  for (i = functions.length - 1; i >= 0; i--) {
                    if (i === functions.length - 1)
                      continue;
                    else
                      res = functions[i].call(this, res);
                  }
                  return res;
              });              
            } else {
              for (i = functions.length - 1; i >= 0; i--) {
                if (i === functions.length - 1)
                  result = functions[i].apply(this, arraySlice(arguments, 0)); //functions[i].apply(this, arguments);
                else
                  result = functions[i].call(this, result);
              }
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