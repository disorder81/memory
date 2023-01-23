import React from 'react';

import settings from '../config/settings';
import Board from './Board/Board';
import Timer from './Timer/Timer';
import Score from './Score/Score';

const Game: React.FC = () => (
  <div className="game">
    <Board />
    <div className="game-info">
      <Timer initialTime={settings.time} />
      <Score />
    </div>
  </div>
);

export default Game;
