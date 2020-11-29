# `@gunnarx2/hooks`

[![npm version](https://img.shields.io/npm/v/@gunnarx2/hooks.svg)](https://www.npmjs.com/package/@gunnarx2/hooks)
[![npm downloads](https://img.shields.io/npm/dm/@gunnarx2/hooks.svg)](https://www.npmjs.com/package/@gunnarx2/hooks)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@gunnarx2/hooks)](https://www.npmjs.com/package/@gunnarx2/hooks)
[![npm license](https://img.shields.io/npm/l/@gunnarx2/hooks)](https://www.npmjs.com/package/@gunnarx2/hooks)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

Collection of [React hooks](https://reactjs.org/docs/hooks-intro.html). Every hook supports [TypeScript](https://www.typescriptlang.org/) and Server-Side Rendering.

## Installation

```
yarn add @gunnarx2/hooks
```

## Usage

- [useEventListener()](#event-listener) - Event listener
- [useResize()](#resize) - Resize
- [useWindowSize()](#window-size) - Window size
- [useClickOutside()](#click-outside) - Click outside
- [useScroll()](#scroll) - Scroll
- [useTrapFocus()](#trap-focus) - Trap focus

### Event listener

#### Example - Event listener

```tsx
import React from 'react';
import { useEventListener } from '@gunnarx2/hooks';

const Component = () => {
  const ref = useRef(null);

  useEventListener({
    type: 'click',
    listener: (event) => console.log(event),
    element: ref,
    options: { passive: true }
  });

  return <div ref={ref} />;
};

export default Component;
```

#### Reference - Event listener

Default value for *element* is `window` if [isSSR](https://github.com/gunnarx2/gunnarx2-mono/tree/master/packages/utils#server-side-rendering) returns `false`.

```ts
interface UseEventListener {
  type: keyof WindowEventMap;
  listener: EventListener;
  element?: RefObject<Element> | Document | Window | null;
  options?: AddEventListenerOptions;
}

const useEventListener = ({
  type,
  listener,
  element = isSSR ? undefined : window,
  options
}: UseEventListener): void => {};
```

### Resize

#### Example - Resize

```tsx
import React from 'react';
import { useResize } from '@gunnarx2/hooks';

const Component = () => {
  useResize((event) => {
    console.log(event);
  }, 666);

  return null;
};

export default Component;
```

#### Reference - Resize

It uses [useEventListener()](#event-listener) to listen for *resize*. Will trigger `callback` on window resize. Passed `wait` parameter will [debounce](https://lodash.com/docs/4.17.20#debounce) the `callback` parameter.

```ts
const useResize = (
  callback: (event: Event) => void,
  wait: number = 250
): void => {};
```

### Window size

#### Example - Window size

```tsx
import React, { useEffect } from 'react';
import { useWindowSize } from '@gunnarx2/hooks';

const Component = () => {
  const { width, height } = useWindowSize(1337);

  useEffect(() => {
    console.log(width, height);
  }, [width, height]);

  return null;
};

export default Component;
```

#### Reference - Window size

It uses [useResize()](#resize) to listen for *resize*. Passed `wait` parameter will [debounce](https://lodash.com/docs/4.17.20#debounce) the `callback` parameter.

```ts
const useWindowSize = (
  wait: number = 250
): {
  width?: number;
  height?: number;
} => {};
```

### Click outside

#### Example - Click outside

```tsx
import React, { useRef } from 'react';
import { useClickOutside } from '@gunnarx2/hooks';

const Component = () => {
  const ref = useRef(null);

  useClickOutside(ref, (event) => {
    console.log(event);
  });

  return <div ref={ref} />;
};

export default Component;
```

#### Reference - Click outside

It uses [useEventListener()](#event-listener) to listen for *click*.

```ts
const useClickOutside = (
  element: RefObject<Element> | null,
  callback: (event: MouseEvent) => void
): void => {};
```

### Scroll

#### Example - Scroll

```tsx
import React, { useEffect, useRef } from 'react';
import { useScroll } from '@gunnarx2/hooks';

const Component = () => {
  const ref = useRef(null);
  const { y, x, direction } = useScroll({
    wait: 420,
    element: ref
  });

  useEffect(() => {
    console.log(y, x, direction);
  }, [y, x, direction]);

  return <div ref={ref} />;
};

export default Component;
```

#### Reference - Scroll

It uses [useEventListener()](#event-listener) to listen for *scroll*, so default *element* is `window`. Passed `wait` parameter will [throttle](https://lodash.com/docs/4.17.20#throttle) the `callback` parameter.

```ts
interface Scroll {
  y?: number;
  x?: number;
  direction?: 'up' | 'right' | 'down' | 'left';
}

interface UseScroll {
  wait?: number;
  element?: RefObject<Element> | Window | null;
}

export const useScroll = (options?: UseScroll): Scroll => {};
```

### Trap focus

#### Example - Trap focus

```tsx
import React, { useRef } from 'react';
import { useTrapFocus } from '@gunnarx2/hooks';

const Component = () => {
  const initialFocusRef = useRef(null);
  const trapRef = useTrapFocus({
    includeContainer: true,
    initialFocus: initialFocusRef.current,
    returnFocus: true,
    updateNodes: false
  });

  return (
    <div ref={trapRef} tabIndex={0}>
      Lorem ipsum{' '}
      <button type="button" ref={initialFocusRef}>
        dolor
      </button>
    </div>
  );
};

export default Component;
```

#### Reference - Trap focus

It uses [useEventListener()](#event-listener) to listen for *keydown*.

##### Include container

Include container in the tabbable nodes. In the example above it would result in `trapRef`.  
Default: `false`.

##### Initial focus

Set *node* or *'container'* as initial focus. For *'container'* to work you need to set `includeContainer: true`.  
Default: `null`.

##### Return focus

Return focus to the element that had focus before trapped. This will be executed when component unmounts.  
Default: `true`.

##### Update nodes

Update tabbable nodes on each tab, can be useful if nodes is rendered dynamically in some way.  
Default: `false`.

```ts
type Node = HTMLDivElement | null;

interface UseTrapFocus {
  includeContainer?: boolean;
  initialFocus?: 'container' | Node;
  returnFocus?: boolean;
  updateNodes?: boolean;
}

const useTrapFocus = (
  options?: UseTrapFocus
): MutableRefObject<Node> => {};
```
