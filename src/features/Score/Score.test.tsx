import { act, screen } from '@testing-library/react';

import Score from './Score';
import React from 'react';
import { renderWithContext } from '../../test-utils';
import { initialContext } from '../../test/mock';

describe('<Score />', () => {
  it('should render the current score', async () => {
    await act(async () => {
      // TODO: immer
      renderWithContext(<Score />, {
        ...initialContext,
        state: { ...initialContext.state, score: 60 }
      });
    });

    // TODO: narrow scope
    expect(screen.getByText(/score: 60/i)).toBeInTheDocument();
  });

  describe('when the score is undefined', () => {
    it('should render 0', async () => {
      await act(async () => {
        // TODO: immer
        renderWithContext(<Score />, {
          ...initialContext,
          state: { ...initialContext.state, score: undefined }
        });
      });

      // TODO: narrow scope
      expect(screen.getByText(/score: 0/i)).toBeInTheDocument();
    });
  });
});
