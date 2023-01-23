import { render, screen, within } from '@testing-library/react';
import Modal from './Modal';
import React from 'react';

describe('<Modal />', () => {
  it('should not render if not open', () => {
    render(<Modal />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should render the content if open', () => {
    render(<Modal isOpen>Modal Content</Modal>);

    const dialog = screen.getByRole('dialog');

    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText('Modal Content')).toBeInTheDocument();
  });
});
