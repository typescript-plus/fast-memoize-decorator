import { capture } from '@typescript-plus/stream-capture-20211002';
import { Memoize } from '../../src';

class Tomorrow {
  @Memoize() when(today: Date) {
    console.log('compute!');
    const date = new Date(today.getTime());
    date.setDate(date.getDate() + 1);
    return date;
  }
}

it('README - Usage', () => {
  let captured: string;
  const tomorrow = new Tomorrow();

  // tslint:disable-next-line:no-unsafe-any
  captured = capture(process.stdout, (buffer) => {
    expect(tomorrow.when(new Date(2000, 4, 1))).toEqual(new Date(2000, 4, 2));
    return buffer.join('');
  });
  expect(captured).toEqual('compute!\n');

  // tslint:disable-next-line:no-unsafe-any
  captured = capture(process.stdout, (buffer) => {
    expect(tomorrow.when(new Date(2000, 4, 1))).toEqual(new Date(2000, 4, 2));
    return buffer.join('');
  });
  expect(captured).toEqual('');

  // tslint:disable-next-line:no-unsafe-any
  captured = capture(process.stdout, (buffer) => {
    expect(tomorrow.when(new Date(2000, 4, 2))).toEqual(new Date(2000, 4, 3));
    return buffer.join('');
  });
  expect(captured).toEqual('compute!\n');
});
