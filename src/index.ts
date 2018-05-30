// tslint:disable-next-line:no-require-imports
import fm = require('fast-memoize');

export function Memoize() {
  return (target: {}, propertyKey: string, descriptor: PropertyDescriptor) => {
    const value = descriptor.value;
    if (typeof value === 'function') {
      descriptor.value = newFunction(propertyKey, value as () => any);
      return;
    }
    const get = descriptor.get;
    if (get != null) {
      descriptor.get = newGetter(propertyKey, get);
    }
  };
}

function newFunction(name: string, fn: () => any) {
  return function(this: any, ...args: any[]) {
    const bound = fn.bind(this);
    const value = (fm as (...args: any[]) => ((...args: any[]) => any))(bound);
    Object.defineProperty(this, name, {value});
    return value(...args);
  };
}

function newGetter(name: string, fn: () => any) {
  return function(this: any) {
    const value = fn.apply(this);
    Object.defineProperty(this, name, {value});
    return value;
  };
}
