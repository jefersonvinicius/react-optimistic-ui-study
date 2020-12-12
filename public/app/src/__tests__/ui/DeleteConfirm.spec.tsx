import React from 'react';
import DeleteConfirm from 'components/DeleteConfirm';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe.skip('DeleteConfirm component testes', () => {
  it('should show modal with default content', () => {
    act(() => {
      const { getByText } = render(<DeleteConfirm open={true} onClose={() => {}} onDelete={() => {}} />);
      const element = getByText(/Tem certeza que deseja realizar essa exclusão?/i);
      expect(element).toBeInTheDocument();
    });
  });
});
