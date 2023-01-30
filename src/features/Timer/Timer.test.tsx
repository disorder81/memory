import React from 'react';

import Timer from './Timer';
import { screen, act } from '@testing-library/react';
import { initialContext } from '../../test/mock';
import { GameStatus } from '../../context/GameContext';
import { renderWithContext } from '../../test-utils';

describe('<Timer />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  const tick = (ms = 1000) => {
    act(() => {
      jest.advanceTimersByTime(ms);
    });
  };

  it('should show the time left', () => {
    // TODO: immer
    renderWithContext(<Timer initialTime={60} />, {
      ...initialContext,
      state: { ...initialContext.state, status: GameStatus.PLAYING }
    });
    tick(5000);
    expect(screen.getByText(/Time: 55 seconds/i)).toBeInTheDocument();
  });

  it('should decrease time each second', () => {
    // TODO: immer
    renderWithContext(<Timer initialTime={60} />, {
      ...initialContext,
      state: { ...initialContext.state, status: GameStatus.PLAYING }
    });
    const timer = screen.getByText(/Time: 60 seconds/i);
    tick();
    expect(timer).toHaveTextContent(/Time: 59 seconds/i);
    tick();
    expect(timer).toHaveTextContent(/Time: 58 seconds/i);
    tick();
    expect(timer).toHaveTextContent(/Time: 57 seconds/i);
  });

  describe('when time is 0', () => {
    it('should show an out of time message', () => {
      // TODO: immer
      renderWithContext(<Timer initialTime={1} />, {
        ...initialContext,
        state: { ...initialContext.state, status: GameStatus.PLAYING }
      });
      tick(1000);
      expect(screen.getByText(/out of time!/i));
    });
  });
});
