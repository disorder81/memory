import { screen, within } from '@testing-library/react';
import FinishedGameModal from './FinishedGameModal';
import React from 'react';
import { GameState, GameStatus } from '../../context/GameContext';
import { renderWithContext } from '../../test-utils';
import { initialContext } from '../../test/mock';

describe('<FinishedGameModal />', () => {
  const setup = (state: Partial<GameState>) => {
    // TODO: immer
    renderWithContext(<FinishedGameModal />, {
      ...initialContext,
      state: {
        ...initialContext.state,
        ...state
      }
    });

    const dialog = screen.getByRole('dialog');

    return dialog;
  };

  describe('when the game is won', () => {
    it('should show a win message', () => {
      const dialog = setup({ status: GameStatus.WIN });
      expect(dialog).toBeInTheDocument();
      expect(within(dialog).getByText(/you won!/i)).toBeInTheDocument();
    });
  });

  describe('when game over', () => {
    it('should show a game over message', () => {
      const dialog = setup({ status: GameStatus.GAME_OVER });
      expect(dialog).toBeInTheDocument();
      expect(within(dialog).getByText(/game over/i)).toBeInTheDocument();
    });
  });
});
