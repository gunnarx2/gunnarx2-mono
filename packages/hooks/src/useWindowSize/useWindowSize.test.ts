import { act, renderHook } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/react';

import { useWindowSize } from '.';

describe('useWindowSize()', () => {
  const size = {
    initial: {
      width: 1024,
      height: 768
    },
    update: {
      width: 375,
      height: 667
    }
  };

  it('Default wait value is 250ms', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useWindowSize());

    act(() => {
      global.innerWidth = size.update.width;
      global.innerHeight = size.update.height;
      fireEvent(window, new Event('resize'));
    });

    expect(result.current.width).toBe(size.initial.width);
    expect(result.current.height).toBe(size.initial.height);

    await waitForNextUpdate();

    expect(result.current.width).toBe(size.update.width);
    expect(result.current.height).toBe(size.update.height);
  });

  it('Set wait value to 0ms to disable debounce', () => {
    const { result } = renderHook(() => useWindowSize(0));

    act(() => {
      global.innerWidth = size.update.width;
      global.innerHeight = size.update.height;
      fireEvent(window, new Event('resize'));
    });

    expect(result.current.width).toBe(size.update.width);
    expect(result.current.height).toBe(size.update.height);
  });
});
