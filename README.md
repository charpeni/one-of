# @charpeni/one-of

<img height="125" src="https://github.com/user-attachments/assets/34f0670b-491e-4a1c-a1a8-373a252a16b5" alt="library's logo" align="right">

<p>
  <a href="https://www.npmjs.org/package/@charpeni/one-of">
    <img src="https://badge.fury.io/js/%40charpeni%2Fone-of.svg" alt="Current npm package version." />
  </a>
  <a href="https://www.npmjs.org/package/@charpeni/one-of">
    <img src="https://img.shields.io/npm/dm/%40charpeni%2Fone-of" alt="Monthly downloads" />
  </a>
  <a href="https://codecov.io/gh/charpeni/one-of" > 
    <img src="https://codecov.io/gh/charpeni/one-of/graph/badge.svg?token=KXQCYOMPYH"/> 
  </a>
  <a href="https://makeapullrequest.com">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome!" />
  </a>
  <a href="https://github.com/charpeni/one-of/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="@charpeni/one-of is released under the MIT license." />
  </a>
</p>

Type-safe and tested utilities to return a random element from an array or random entry from an object.

<br />

## Installation

```sh
npm install @charpeni/one-of
```

## Usage

`oneOf` is a function accepting either an array or an object and returning a random element or entry from it.

It was built mostly to be used in tests or for generating random data (it can also be used safely for any other type of behaviors, including production apps), e.g.:

```tsx
<Card color={oneOf(['red', 'blue', 'green'])}>{/* ... */}</Card>
```

<!-- prettier-ignore-start -->
> [!NOTE]
> `oneOf` is a type-safe function. It will infer the type of the array or object passed as an argument and return the corresponding type to ensure the return type is a union of possibilities rather than a primitive type (`1 | 2` instead of `number[]`).
>
> If the input is passed inlined, the `const` modifier will be applied and therefore the type will be inferred as `ReadonlyArray` or readonly `Record`. Otherwise, using `as const` is suggested.
<!-- prettier-ignore-end -->

```ts
import { oneOf } from '@charpeni/one-of';

// Returns a random element from the array
const element = oneOf([1, 2, 3]); // 2
//    ^? const element: 1 | 2 | 3

// Returns a random entry from the object
const entry = oneOf({ a: 1, b: 2, c: 3 }); // ['b', 2]
//    ^? const entry: ['a', 1] | ['b', 2] | ['c', 3]
```

Specific functions are also available: `oneElementOf` and `oneEntryOf`, that's what `oneOf` uses under the hood:

```ts
import { oneElementOf, oneEntryOf } from '@charpeni/one-of';

// Returns a random element from the array
const element = oneElementOf([1, 2, 3]); // 2
//    ^? const element: 1 | 2 | 3

// Returns a random entry from the object
const entry = oneEntryOf({ a: 1, b: 2, c: 3 }); // ['b', 2]
//    ^? const entry: ['a', 1] | ['b', 2] | ['c', 3]
```

## License

@charpeni/one-of is [MIT licensed](LICENSE).
