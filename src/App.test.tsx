import React from 'react';
import App from './App';

import { renderWithContext } from './test-utils';
import { screen } from '@testing-library/react';
import { initialContext } from './test/mock';
import { GameStatus } from './context/GameContext';

describe('<App />', () => {
  describe('when playing for the first time', () => {
    it('should show only the new game button if the deck is loaded', () => {
      // TODO: immer
      renderWithContext(<App />, {
        ...initialContext,
        state: { ...initialContext.state, status: GameStatus.NOT_STARTED, deck: ['1'] }
      });
      expect(screen.getByText(/new game/i)).toBeInTheDocument();
    });

    it('should show a loader if the deck is not yet loaded', () => {
      // TODO: immer
      renderWithContext(<App />, {
        ...initialContext,
        state: { ...initialContext.state, status: GameStatus.NOT_STARTED }
      });

      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
  });

  describe('when already played', () => {
    it('should show the game board', () => {
      // TODO: immer
      renderWithContext(<App />, {
        ...initialContext,
        state: {
          ...initialContext.state,
          status: GameStatus.PLAYING,
          cards: []
        }
      });
      expect(screen.queryByText(/new game/i)).not.toBeInTheDocument();
    });
  });
});
