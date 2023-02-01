import React, { useContext, useEffect } from 'react';

import './App.scss';

import Game from './features/Game';

import { GameContext, GameStatus } from './context/GameContext';
import NewGame from './features/NewGame/NewGame';
import Loader from './components/Loader/Loader';
import useFetch from './hooks/useFetch';
import settings from './config/settings';
import { GithubResponse } from './model/api';
import { messages } from './messages';

const getContent = (data?: Array<GithubResponse>, error?: Error) => {
  if (data && data.length > 0) {
    return <NewGame />;
  }

  if (error) {
    // TODO: error component
    return (
      <div
        style={{ textAlign: 'center', backgroundColor: 'red', color: 'white', padding: '1rem' }}
      >
        {messages.fetchError}
      </div>
    );
  }

  return <Loader />;
};

const App: React.FC = () => {
  const {
    state: { status },
    getImages
  } = useContext(GameContext);

  const { data, error } = useFetch<Array<GithubResponse>>(settings.api);

  useEffect(() => {
    if (data) {
      const avatars = data.map((item: GithubResponse) => item.avatar_url);
      getImages(avatars);
    }
  }, [data]);

  const firstPlay = status === GameStatus.NOT_STARTED;

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="title">Github Memory</h1>
      </header>
      {firstPlay ? (
        <div className="landing">{getContent(data, error)}</div>
      ) : (
        <Game />
      )}
    </div>
  );
};

export default App;
