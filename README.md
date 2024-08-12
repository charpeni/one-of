<p align="center">
  <img height="100" src="TODO" alt="library's logo">
</p>

<h3 align="center">
  one-of
</h3>

<p align="center">
  Type-safe and tested utilities to return a random element from an array or random entry from an object.
</p>

<p align="center">
  <a href="https://www.npmjs.org/package/one-of">
    <img src="https://badge.fury.io/js/one-of.svg" alt="Current npm package version." />
  </a>
  <a href="https://www.npmjs.org/package/one-of">
    <img src="https://img.shields.io/npm/dm/one-of" alt="Monthly downloads" />
  </a>
  <a href="https://circleci.com/gh/charpeni/one-of">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome!" />
  </a>
  <a href="https://github.com/charpeni/one-of/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="one-of is released under the MIT license." />
  </a>
</p>

<hr />

### Installation

```sh
npm install one-of
```

### Usage

`oneOf` is a function accepting either an array or an object and returning a random element or entry from it.

<!-- prettier-ignore-start -->
> [!NOTE]
> `oneOf` is a type-safe function. It will infer the type of the array or object passed as an argument and return the corresponding type to ensure the return type is a union of possibilities rather than a primitive type (`1 | 2` instead of `number[]`).
>
> If the input is passed inlined, the `const` modifier will be applied and therefore the type will be inferred as `ReadonlyArray` or readonly `Record`. Otherwise, using `as const` is suggested.
<!-- prettier-ignore-end -->

```ts
import { oneOf } from 'one-of';

// Returns a random element from the array
const element = oneOf([1, 2, 3]); // 2
//    ^? const element: 1 | 2 | 3

// Returns a random entry from the object
const entry = oneOf({ a: 1, b: 2, c: 3 }); // ['b', 2]
//    ^? const entry: ['a', 1] | ['b', 2] | ['c', 3]
```

Specific functions are also available: `oneElementOf` and `oneEntryOf`, that's what `oneOf` uses under the hood:

```ts
import { oneElementOf, oneEntryOf } from 'one-of';

// Returns a random element from the array
const element = oneElementOf([1, 2, 3]); // 2
//    ^? const element: 1 | 2 | 3

// Returns a random entry from the object
const entry = oneEntryOf({ a: 1, b: 2, c: 3 }); // ['b', 2]
//    ^? const entry: ['a', 1] | ['b', 2] | ['c', 3]
```

It was built mostly to be used in tests or for generating random data (it can also be used safely for any other type of behaviors, including production apps), e.g.:

```tsx
<Card color={oneOf(['red', 'blue', 'green'])}>{/* ... */}</Card>
```

## License

one-of is [MIT licensed](LICENSE).
