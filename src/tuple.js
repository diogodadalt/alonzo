export class Tuple {
  constructor() {
    const n = arguments.length;
    let  i,
      t = {};

    for (i = 0; i < n; i++) {
      t['_' + (i+1)] = arguments[i];
    }

    t.length = n;

    return t;
  }

}