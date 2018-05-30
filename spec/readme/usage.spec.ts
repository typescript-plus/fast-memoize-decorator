import { captureSync } from '@typescript-plus/stream-capture';
import { Memoize } from '../../src';

class Tomorrow {
  @Memoize() when(today: Date) {
    // tslint:disable-next-line:no-console
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
  captured = captureSync(process.stdout, () => {
    expect(tomorrow.when(new Date(2000, 4, 1))).toEqual(new Date(2000, 4, 2));
  });
  expect(captured).toEqual('compute!\n');

  // tslint:disable-next-line:no-unsafe-any
  captured = captureSync(process.stdout, () => {
    expect(tomorrow.when(new Date(2000, 4, 1))).toEqual(new Date(2000, 4, 2));
  });
  expect(captured).toEqual('');

  // tslint:disable-next-line:no-unsafe-any
  captured = captureSync(process.stdout, () => {
    expect(tomorrow.when(new Date(2000, 4, 2))).toEqual(new Date(2000, 4, 3));
  });
  expect(captured).toEqual('compute!\n');
});
