import { render } from '@testing-library/react';

import React from 'react';
import { GameContextModel, GameContext } from './context/GameContext';

export const renderWithContext = (
  component: React.ReactElement,
  value: GameContextModel
) =>
  render(
    <GameContext.Provider value={value}>{component}</GameContext.Provider>
  );
