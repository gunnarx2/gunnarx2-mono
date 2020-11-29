import React, { useRef } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { fireEvent, render } from '@testing-library/react';

import { useScroll } from '.';

describe('useScroll()', () => {
  it('Initial values', () => {
    const { result } = renderHook(() => useScroll());
    expect(result.current.y).toBe(0);
    expect(result.current.direction).toBe(undefined);
  });

  it(`'y' value updates with default wait value 250ms`, async () => {
    const { result, waitForNextUpdate } = renderHook(() => useScroll());
    expect(result.current.y).toBe(0);

    let pageYOffset = 600;
    await act(async () => {
      fireEvent.scroll(window, { target: { pageYOffset } });
      await waitForNextUpdate();
    });
    expect(result.current.y).toBe(pageYOffset);

    pageYOffset = 300;
    await act(async () => {
      fireEvent.scroll(window, { target: { pageYOffset } });
      await waitForNextUpdate();
    });
    expect(result.current.y).toBe(pageYOffset);
  });

  it(`Direction changes from 'undefined', 'down' and 'up' with wait value 0ms to disable throttle`, () => {
    const { result } = renderHook(() => useScroll({ wait: 0 }));
    expect(result.current.direction).toBe(undefined);

    act(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 1000 } });
    });
    expect(result.current.direction).toBe('down');

    act(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 500 } });
    });
    expect(result.current.direction).toBe('up');
  });

  it(`Scroll x axis on defined element`, () => {
    const loremIpsum = 'Lorem ipsum';
    const { result: resultRef } = renderHook(() => useRef(null));
    const { getByText } = render(
      <div ref={resultRef.current}>{loremIpsum}</div>
    );
    const { result: resultHook } = renderHook(() =>
      useScroll({ wait: 0, element: resultRef.current })
    );
    expect(resultHook.current.direction).toBe(undefined);

    act(() => {
      fireEvent.scroll(getByText(loremIpsum), {
        target: { scrollLeft: 456 }
      });
    });
    expect(resultHook.current.direction).toBe('right');
    expect(resultHook.current.x).toBe(456);

    act(() => {
      fireEvent.scroll(getByText(loremIpsum), {
        target: { scrollLeft: 123 }
      });
    });
    expect(resultHook.current.direction).toBe('left');
    expect(resultHook.current.x).toBe(123);
  });
});
