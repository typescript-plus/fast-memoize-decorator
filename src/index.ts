import fm = require('fast-memoize');

export function Memoize() {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: {}, propertyKey: string, descriptor: PropertyDescriptor): void => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const value = descriptor.value;
    if (typeof value === 'function') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      descriptor.value = newFunction(propertyKey, value as () => any);
      return;
    }
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const get = descriptor.get;
    if (get != null) {
      descriptor.get = newGetter(propertyKey, get);
    }
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function newFunction(name: string, fn: () => any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (this: any, ...args: any[]) {
    const bound = fn.bind(this);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (fm as unknown as (...args: any[]) => (...args: any[]) => any)(bound);
    Object.defineProperty(this, name, { value });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return value(...args);
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function newGetter(name: string, fn: () => any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (this: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const value = fn.apply(this);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    Object.defineProperty(this, name, { value });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return value;
  };
}
