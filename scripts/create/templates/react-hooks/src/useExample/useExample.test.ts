import { renderHook, act } from '@testing-library/react-hooks';

import { useExample } from '.';

describe('useExample', () => {
  it('Should increment counter', () => {
    const { result } = renderHook(() => useExample());

    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
  });
});
