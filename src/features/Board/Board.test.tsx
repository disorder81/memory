import { fireEvent, render, screen, within } from '@testing-library/react';
import React from 'react';

import { act } from 'react-dom/test-utils';
import App from '../../App';
import { GameContextProvider } from '../../context/GameContext';

describe('<Board />', () => {
  const setup = async () => {
    const tools = await act(async () =>
      render(
        <GameContextProvider>
          <App />
        </GameContextProvider>
      )
    );

    const newGame = screen.getByRole('button', { name: /new game/i });
    fireEvent.click(newGame);

    return tools;
  };

  it('should render cards', async () => {
    await act(async () => {
      render(
        <GameContextProvider>
          <App />
        </GameContextProvider>
      );
    });

    const newGame = screen.getByRole('button', { name: /new game/i });
    fireEvent.click(newGame);

    expect(
      screen.getAllByRole('button', { name: /repo contributor avatar/ })
    ).toHaveLength(12);
  });

  describe('when flipping a card', () => {
    const flipMatchingCards = () => {
      // Pick some card
      const img = screen.getAllByRole('img', {
        name: /repo contributor avatar/
      })[4];

      const pair = screen.getAllByTestId(img.getAttribute('src') ?? '');

      fireEvent.click(pair[0]);
      fireEvent.click(pair[1]);

      return pair;
    };

    describe('when 2 cards are flipped', () => {
      describe('if they match', () => {
        it('cards should be highlighted and stay flipped', async () => {
          await setup();
          const pair = flipMatchingCards();
          expect(pair[0]).toHaveClass('up', 'ok');
          expect(pair[1]).toHaveClass('up', 'ok');
        });

        it('should update the score', async () => {
          await setup();
          flipMatchingCards();
          expect(screen.getByText(/score: 100/i)).toBeInTheDocument();
        });
      });

      describe(`if they don't match`, () => {
        it('should put cards back down after a second', async () => {
          jest.useFakeTimers();

          await setup();

          const card1 = screen.getAllByRole('button', {
            name: /repo contributor avatar/
          })[3];
          const card2 = screen.getAllByRole('button', {
            name: /repo contributor avatar/
          })[4];

          fireEvent.click(card1);
          fireEvent.click(card2);

          expect(card1).toHaveClass('up');
          expect(card2).toHaveClass('up');

          act(() => {
            jest.advanceTimersByTime(1000);
          });

          expect(card1).toHaveClass('down');
          expect(card2).toHaveClass('down');

          act(() => {
            jest.runOnlyPendingTimers();
          });

          jest.useRealTimers();
        });
      });

      describe('when every card is matched', () => {
        beforeEach(() => {
          fetchMock.mockResponseOnce(
            JSON.stringify([
              { avatar_url: 'https://avatars.githubusercontent.com/u/8445?v=4' }
            ])
          );
        });

        it('should show a win dialog', async () => {
          await setup();
          const cards = screen.getAllByRole('button', {
            name: /repo contributor avatar/
          });
          cards.forEach((card) => {
            fireEvent.click(card);
          });
          const dialog = screen.getByRole('dialog');
          expect(within(dialog).getByText(/you won/i)).toBeInTheDocument();
        });
      });

      describe('when time is out', () => {
        it('should show a game over dialog', async () => {
          jest.useFakeTimers();
          await setup();
          act(() => {
            jest.advanceTimersByTime(60 * 1000);
          });
          const dialog = screen.getByRole('dialog');
          expect(within(dialog).getByText(/game over/i)).toBeInTheDocument();
          act(() => {
            jest.runOnlyPendingTimers();
          });
          jest.useRealTimers();
        });
      });
    });
  });
});
