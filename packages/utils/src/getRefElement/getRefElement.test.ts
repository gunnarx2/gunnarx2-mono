import { getRefElement } from '.';

describe('Get ref element', () => {
  it('Return element if passed as ref', () => {
    expect(getRefElement({ current: window })).toBe(window);
  });

  it('Return itself if passed as element', () => {
    expect(getRefElement(window)).toBe(window);
  });
});
