import { useContext } from 'react';

import React from 'react';
import { GameContext } from '../../context/GameContext';

const Score: React.FC = () => {
  const {
    state: { score }
  } = useContext(GameContext);

  return <div className="score">Score: {score ?? 0}</div>;
};

export default Score;
