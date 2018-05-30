import { Memoize } from '../src';

class Test {
  called = 0;
  value = 0;

  @Memoize() get getter() {
    this.called += 1;
    return this.value;
  }
}

const test = new Test();

describe('getter', () => {
  it('works', () => {
    test.value = 1;
    expect(test.getter).toEqual(1);
    expect(test.called).toEqual(1);
    test.value = 100;
    expect(test.getter).toEqual(1);
    expect(test.called).toEqual(1);
  });

  it('multiple instances', () => {
    const test1 = new Test();
    const test2 = new Test();
    test1.value = 1;
    test2.value = 2;
    expect(test1.getter).toEqual(1);
    expect(test1.called).toEqual(1);
    expect(test2.called).toEqual(0);
    expect(test2.getter).toEqual(2);
    expect(test1.called).toEqual(1);
    expect(test2.called).toEqual(1);
  });
});
