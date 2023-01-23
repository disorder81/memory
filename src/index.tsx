import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './index.scss';
import { GameContextProvider } from './context/GameContext';

const container = document.getElementById('app');

if (!container) {
  throw new Error('No root element found');
}

const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <GameContextProvider>
      <App />
    </GameContextProvider>
  </React.StrictMode>
);
