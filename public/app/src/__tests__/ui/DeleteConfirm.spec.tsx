import React from 'react';
import DeleteConfirm from 'components/DeleteConfirm';
import { unmountComponentAtNode, render } from 'react-dom';
import { act } from 'react-dom/test-utils';

describe('DeleteConfirm component specs', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
  });

  it('should show modal with defaul text', () => {
    act(() => {
      render(<DeleteConfirm open={true} onClose={() => {}} />, container);
      expect(container.textContent).toBe('Tem certeza que deseja realizar essa exclusão?');
    });
  });
});
