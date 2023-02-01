import { GameContextModel, GameStatus } from "../context/GameContext";

export const initialContext: GameContextModel = {
  state: {
    cards: [],
    deck: [],
    status: GameStatus.NOT_STARTED
  },
  flipCard: jest.fn(),
  gameOver: jest.fn(),
  getImages: jest.fn(),
  newGame: jest.fn(),
  reset: jest.fn()
};

export const mockAvatars = [
  { avatar_url: 'https://avatars.githubusercontent.com/u/8445?v=4' },
  { avatar_url: 'https://avatars.githubusercontent.com/u/810438?v=4' },
  { avatar_url: 'https://avatars.githubusercontent.com/u/6820?v=4' },
  { avatar_url: 'https://avatars.githubusercontent.com/u/3624098?v=4' },
  { avatar_url: 'https://avatars.githubusercontent.com/u/63648?v=4' },
  { avatar_url: 'https://avatars.githubusercontent.com/u/9595985?v=4' },
  { avatar_url: 'https://avatars.githubusercontent.com/u/1519870?v=4' },
  { avatar_url: 'https://avatars.githubusercontent.com/u/29597?v=4' },
  { avatar_url: 'https://avatars.githubusercontent.com/u/239742?v=4' },
  { avatar_url: 'https://avatars.githubusercontent.com/u/1909539?v=4' },
  { avatar_url: 'https://avatars.githubusercontent.com/u/197597?v=4' },
  { avatar_url: 'https://avatars.githubusercontent.com/u/5750?v=4' },
  { avatar_url: 'https://avatars.githubusercontent.com/u/55161?v=4' },
  { avatar_url: 'https://avatars.githubusercontent.com/u/2735514?v=4' },
  { avatar_url: 'https://avatars.githubusercontent.com/u/4117?v=4' },
  { avatar_url: 'https://avatars.githubusercontent.com/u/590904?v=4' },
  { avatar_url: 'https://avatars.githubusercontent.com/u/2440089?v=4' },
  { avatar_url: 'https://avatars.githubusercontent.com/u/239676?v=4' },
  { avatar_url: 'https://avatars.githubusercontent.com/u/1714255?v=4' },
  { avatar_url: 'https://avatars.githubusercontent.com/u/11849?v=4' },
  { avatar_url: 'https://avatars.githubusercontent.com/u/13352?v=4' },
  { avatar_url: 'https://avatars.githubusercontent.com/u/1114467?v=4' },
  { avatar_url: 'https://avatars.githubusercontent.com/u/250407?v=4' },
  { avatar_url: 'https://avatars.githubusercontent.com/u/6886061?v=4' },
  { avatar_url: 'https://avatars.githubusercontent.com/u/12292047?v=4' },
  { avatar_url: 'https://avatars.githubusercontent.com/u/2716369?v=4' },
  { avatar_url: 'https://avatars.githubusercontent.com/in/29110?v=4' },
  { avatar_url: 'https://avatars.githubusercontent.com/u/128431?v=4' },
  { avatar_url: 'https://avatars.githubusercontent.com/u/7623979?v=4' },
  { avatar_url: 'https://avatars.githubusercontent.com/u/249164?v=4' }
];
