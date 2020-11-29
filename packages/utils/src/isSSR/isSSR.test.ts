import { isSSR } from '.';

describe('Server side rendering', () => {
  it('Should return false', () => {
    expect(isSSR).toBe(false);
  });
});
