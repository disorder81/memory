import { renderWithContext } from '../../test-utils';
import NewGame from './NewGame';
import React from 'react';

import { fireEvent, screen } from '@testing-library/react';
import { initialContext } from '../../test/mock';

describe('<NewGame />', () => {
  const newGame = jest.fn();
  it('should call the new game action', async () => {
    // TODO: immer
    renderWithContext(<NewGame />, { ...initialContext, newGame });
    const newGameButton = screen.getByRole('button', { name: /new game/i });
    fireEvent.click(newGameButton);
    expect(newGame).toHaveBeenCalled();
  });
});
