import React from 'react';
import App from './App';

import { renderWithContext } from './test-utils';
import { logDOM, screen } from '@testing-library/react';
import { initialContext } from './test/mock';
import { GameStatus } from './context/GameContext';
import { act } from 'react-dom/test-utils';

describe('<App />', () => {
  describe('when playing for the first time', () => {
    it('should fetch cards and show a loader', async () => {
      // TODO: immer
      renderWithContext(<App />, {
        ...initialContext
      });
      expect(fetchMock.mock.calls).toHaveLength(1);
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(await screen.findByText(/new game/i)).toBeInTheDocument();
    });

    describe(`when there's an error fetching data`, () => {
      it('should show an error message', async () => {
        fetchMock.mockRejectedValueOnce('error');
        // TODO: immer
        await act(async () => {
          renderWithContext(<App />, {
            ...initialContext
          });
        });

        expect(fetchMock.mock.calls).toHaveLength(1);
        expect(
          screen.getByText(/There was some error fetching data/i)
        ).toBeInTheDocument();
      });
    });
  });

  describe('when already played', () => {
    it('should show the game board', async () => {
      // TODO: immer
      await act(async () => {
        renderWithContext(<App />, {
          ...initialContext,
          state: {
            ...initialContext.state,
            status: GameStatus.PLAYING,
            cards: []
          }
        });
      });

      expect(screen.queryByText(/new game/i)).not.toBeInTheDocument();
    });
  });
});
