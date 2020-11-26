import React from 'react';
import { render } from '@testing-library/react';

import Example from '.';

describe('Example', () => {
  it('Should be in the document', () => {
    const { container } = render(<Example>🔥</Example>);
    expect(container).toBeInTheDocument();
  });
});
