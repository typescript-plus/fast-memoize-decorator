# fast-memoize Decorator

A TypeScript decorator for memoizing properties using [fast-memoize].

## Install

```bash
$ npm i @typescript-plus/fast-memoize-decorator --save
```

## Usage

```ts
import { Memoize } from '@typescript-plus/fast-memoize-decorator';

class Tomorrow {
  @Memoize() when(today: Date) {
    console.log('compute!');
    const date = new Date(today.getTime());
    date.setDate(date.getDate() + 1);
    return date;
  }
}

const tomorrow = new Tomorrow();

// returns 2nd Apr. 2000 and prints "compute!"
tomorrow.when(new Date(2000, 4, 1));

// returns 2nd Apr. 2000 and prints nothing
tomorrow.when(new Date(2000, 4, 1));

// returns 3rd Apr. 2000 and prints "compute!"
tomorrow.when(new Date(2000, 4, 2));
```

[fast-memoize]: https://www.npmjs.com/package/fast-memoize
