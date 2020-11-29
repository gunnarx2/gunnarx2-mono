# `@gunnarx2/utils`

[![npm version](https://img.shields.io/npm/v/@gunnarx2/utils.svg)](https://www.npmjs.com/package/@gunnarx2/utils)
[![npm downloads](https://img.shields.io/npm/dm/@gunnarx2/utils.svg)](https://www.npmjs.com/package/@gunnarx2/utils)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@gunnarx2/utils)](https://www.npmjs.com/package/@gunnarx2/utils)
[![npm license](https://img.shields.io/npm/l/@gunnarx2/utils)](https://www.npmjs.com/package/@gunnarx2/utils)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

Collection of utilities. Every utility supports [TypeScript](https://www.typescriptlang.org/) and Server-side rendering.

## Installation

```
yarn add @gunnarx2/utils
```

## Usage

- [isSSR](#server-side-rendering) - Server-side rendering
- [getRefElement()](#get-ref-element) - Get ref element

### Server-side rendering

#### Example - Server-side rendering

```ts
import { isSSR } from '@gunnarx2/utils';

if (isSSR) {
  console.log('SSR in action 🔥');
}
```

#### Reference - Server-side rendering

Will return a boolean that indicates if Server-side rendering is present.

```ts
const isSSR: boolean = {};
```

### Get ref element

#### Example - Get ref element

```tsx
import React, { useRef } from 'react';
import { getRefElement } from '@gunnarx2/utils';

const Component = () => {
  const ref = useRef(null);

  useEffect(() => {
    console.log(getRefElement(ref));
  }, []);

  return (
    <div ref={ref} />
  );
};

export default Component;
```

#### Reference - Get ref element

Will return element from ref. If it isn't wrapped in a ref it will return itself.

```ts
const getRefElement = <T>(
  element?: RefObject<Element> | T
): Element | T | undefined | null => {};
```
