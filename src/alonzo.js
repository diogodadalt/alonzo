//import Tuple from 'tuple';

//=============================================================================
// Internal classes/functions
//=============================================================================
function arraySlice(arr, begin, end) {
  'use strict';
  return Array.prototype.slice.call(arr, begin, end);
}

function applyValueToComposedFunctions(result, source) {
  'use strict';
  const ARGS_BEFORE_ARRAY = 2;
  let functions = arraySlice(arguments, ARGS_BEFORE_ARRAY),
    i;
  for (i = functions.length - 1; i >= 0; i--) {
      result = functions[i].call(source, result);
  }
  return result;
}

function curryWithCallback(fun, callback, source) {
  'use strict';
  const ARGS_BEFORE_ARRAY = 3;
  let args = arraySlice(arguments, ARGS_BEFORE_ARRAY),
    applicableFunction = function() {
      var internalArgs = arraySlice(arguments, 0);

      if (internalArgs.length >= fun.length) {
        if (!!callback)
          return callback(fun.apply(this, internalArgs));
        else
          return fun.apply(this, internalArgs);
      }
      
      return function() {
        return applicableFunction.apply(this, internalArgs.concat(arraySlice(arguments, 0)));
      };
  };

  return applicableFunction.apply(source, args);
}

//=============================================================================
// Exposed classes/functions
//=============================================================================

export class Alonzo {
  constructor() {}

  curry(fun) {
    return curryWithCallback.apply(this, [fun, null, this].concat(arraySlice(arguments, 1)));
  }

  compose() {
    let functions = arguments;
    
    return function() {
      let result,
        args = arguments;

      if (functions.length > 0) {
        if (functions[functions.length-1].length > arguments.length) {
          return curryWithCallback.apply(this, [functions[functions.length-1]].concat([function(res) {
              return applyValueToComposedFunctions.apply(this, [res, this].concat(arraySlice(functions, 0, -1)));
          }, this]).concat(arraySlice(args, 0)));              
        } else {
          result = functions[functions.length - 1].apply(this, arraySlice(arguments, 0));
          result = applyValueToComposedFunctions.apply(this, [result, this].concat(arraySlice(functions, 0, -1)));
        }
      }
      return result;
    };
  }

  /*tuple() {
    new Tuple(...arguments);
  }*/
}