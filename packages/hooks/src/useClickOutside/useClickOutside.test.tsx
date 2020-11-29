import React, { useRef } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render, fireEvent, screen } from '@testing-library/react';

import { useClickOutside } from '.';

describe('useClickOutside()', () => {
  it('Trigger callback when click outside element', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useRef(null));

    render(
      <main>
        <article ref={result.current}>
          <h1>Text inside</h1>
        </article>
        <aside>
          <p>Text outside</p>
        </aside>
      </main>
    );
    renderHook(() => useClickOutside(result.current.current, callback));

    fireEvent.click(screen.getByText('Text inside'));
    expect(callback).toHaveBeenCalledTimes(0);

    fireEvent.click(screen.getByText('Text outside'));
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
