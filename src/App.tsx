import React, { useContext } from 'react';

import './App.scss';

import Game from './features/Game';

import { GameContext, GameStatus } from './context/GameContext';
import NewGame from './features/NewGame/NewGame';
import Loader from './components/Loader/Loader';

const getContent = (deck: string[]) => deck?.length > 0 ? <NewGame /> : <Loader />;

const App: React.FC = () => {
  const {
    state: { status, deck }
  } = useContext(GameContext);

  const firstPlay = status === GameStatus.NOT_STARTED;

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="title">Github Memory</h1>
      </header>
      {firstPlay ? <div className="landing">{getContent(deck)}</div> : <Game />}
    </div>
  );
};

export default App;
