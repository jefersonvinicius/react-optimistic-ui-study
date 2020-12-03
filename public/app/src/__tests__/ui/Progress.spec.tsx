import React from 'react';
import { render } from '@testing-library/react';
import Progress from 'components/Progress';

describe('Progress component specs', () => {
  it('should render correct progress percent', () => {
    const progress = 50;
    const { getByText } = render(<Progress progress={progress} />);
    const element = getByText(`${progress}% Concluído`);
    expect(element).not.toBeNull();
  });
});
