import { render } from '@testing-library/react';

import NextPageArticles from './next:page articles';

describe('NextPageArticles', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NextPageArticles />);
    expect(baseElement).toBeTruthy();
  });
});
