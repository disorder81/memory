import { GameStatus } from './context/GameContext';

const gameStatus: { [key in GameStatus]?: string } = {
  [GameStatus.WIN]: 'You won!',
  [GameStatus.GAME_OVER]: '☠️ Game over! ☠️'
};

export const messages: { [key in string]: string } = {
  fetchError: 'There was some error fetching data, please try again',
  newGame: 'New game',
  outOfTime: 'Out of time!',
  ...gameStatus
};
