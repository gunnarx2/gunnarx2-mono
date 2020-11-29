import React, { useRef } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render, fireEvent } from '@testing-library/react';

import { useEventListener } from '.';

describe('useEventListener()', () => {
  it('Listener is executed when correct type is triggered', () => {
    const listener = jest.fn();
    const { result } = renderHook(() => useRef(null));
    const { getByText } = render(<div ref={result.current}>Lorem ipsum</div>);

    renderHook(() =>
      useEventListener({
        type: 'click',
        listener,
        element: result.current
      })
    );

    fireEvent.click(getByText('Lorem ipsum'));
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('Listener is not executed when incorrect type is triggered', () => {
    const listener = jest.fn();
    const { result } = renderHook(() => useRef(null));
    const { getByText } = render(<div ref={result.current}>Lorem ipsum</div>);

    renderHook(() =>
      useEventListener({
        type: 'resize',
        listener,
        element: result.current
      })
    );

    fireEvent.click(getByText('Lorem ipsum'));
    expect(listener).toHaveBeenCalledTimes(0);
  });

  it('Listener is not executed when incorrect element is triggered', () => {
    const listener = jest.fn();
    const { result: result1 } = renderHook(() => useRef(null));
    render(<div ref={result1.current}>Lorem ipsum 1</div>);
    const { result: result2 } = renderHook(() => useRef(null));
    const { getByText } = render(
      <div ref={result2.current}>Lorem ipsum 2</div>
    );

    renderHook(() =>
      useEventListener({
        type: 'scroll',
        listener,
        element: result1.current
      })
    );

    fireEvent.scroll(getByText('Lorem ipsum 2'));
    expect(listener).toHaveBeenCalledTimes(0);
  });

  it('Does not add event listener if element is null', () => {
    const listener = jest.fn();
    const spyAddEventListener = jest.spyOn(global, 'addEventListener');

    renderHook(() =>
      useEventListener({
        type: 'mouseleave',
        listener,
        element: null
      })
    );

    expect(spyAddEventListener).not.toBeCalledWith(
      'mouseleave',
      expect.any(Function)
    );
  });

  it('Element falls back to window if undefined', () => {
    const listener = jest.fn();
    const spyAddEventListener = jest.spyOn(global, 'addEventListener');

    renderHook(() =>
      useEventListener({
        type: 'resize',
        listener
      })
    );

    expect(spyAddEventListener).toBeCalled();
  });

  it('Options are passed to event listener', () => {
    const listener = jest.fn();
    const spyAddEventListener = jest.spyOn(global, 'addEventListener');
    const options = {
      capture: true,
      passive: true,
      once: true
    };

    renderHook(() =>
      useEventListener({
        type: 'mouseenter',
        listener,
        options
      })
    );

    expect(spyAddEventListener).toBeCalledWith(
      'mouseenter',
      expect.any(Function),
      expect.objectContaining(options)
    );
  });
});
