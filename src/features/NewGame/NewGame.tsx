import React, { useContext } from 'react';

import { messages } from '../../messages';
import { GameContext } from '../../context/GameContext';
import './NewGame.scss';

const NewGame: React.FC = () => {
  const { newGame } = useContext(GameContext);
  return (
    <button className="new-game" onClick={() => newGame()}>
      {messages.newGame}
    </button>
  );
};

export default NewGame;
