import { Memoize } from '../src';

class Test {
  called = 0;

  @Memoize() fn(arg: number) {
    this.called += 1;
    return arg;
  }
}

describe('function', () => {
  it('works', () => {
    const test = new Test();
    expect(test.fn(1)).toEqual(1);
    expect(test.called).toEqual(1);
    expect(test.fn(1)).toEqual(1);
    expect(test.called).toEqual(1);
  });

  it('different arguments', () => {
    const test = new Test();
    expect(test.fn(1)).toEqual(1);
    expect(test.called).toEqual(1);
    expect(test.fn(100)).toEqual(100);
    expect(test.called).toEqual(2);
  });

  it('multiple instances', () => {
    const test1 = new Test();
    const test2 = new Test();
    expect(test1.fn(1)).toEqual(1);
    expect(test1.called).toEqual(1);
    expect(test2.called).toEqual(0);
    expect(test2.fn(2)).toEqual(2);
    expect(test1.called).toEqual(1);
    expect(test2.called).toEqual(1);
  });
});
