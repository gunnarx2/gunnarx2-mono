import { renderHook } from '@testing-library/react-hooks';
import { fireEvent, waitFor } from '@testing-library/react';

import { useResize } from '.';

describe('useResize()', () => {
  it('Default wait value is 250ms', async () => {
    const callback = jest.fn();

    renderHook(() => useResize(callback));

    fireEvent(window, new Event('resize'));
    expect(callback).toHaveBeenCalledTimes(0);

    await waitFor(
      () => {
        expect(callback).toHaveBeenCalledTimes(0);
      },
      { timeout: 200 }
    );

    await waitFor(() => {
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  it('Set wait value to 0ms to disable debounce', async () => {
    const callback = jest.fn();

    renderHook(() => useResize(callback, 0));

    fireEvent(window, new Event('resize'));
    expect(callback).toHaveBeenCalledTimes(1);

    await waitFor(
      () => {
        expect(callback).toHaveBeenCalledTimes(1);
      },
      { timeout: 200 }
    );
  });
});
