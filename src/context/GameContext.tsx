import React, { PropsWithChildren, useMemo, useReducer } from 'react';
import { shuffle } from '../utils';
import settings from '../config/settings';

export enum GameStatus {
  NOT_STARTED = 'NOT_STARTED',
  PLAYING = 'PLAYING',
  GAME_OVER = 'GAME_OVER',
  WIN = 'WIN'
}

export type CardModel = {
  id: string;
  value: string;
  flipped?: boolean;
  matched?: boolean;
};

export type GameState = {
  deck: string[];
  cards: CardModel[];
  score?: number;
  locked?: boolean;
  result?: {
    cards: string[];
    match: boolean;
  };
  status: GameStatus;
};

export type GameContextModel = {
  flipCard: (card: CardModel) => void;
  gameOver: () => void;
  getImages: (imgs: Array<string>) => void;
  newGame: () => void;
  reset: () => void;
  state: GameState;
};

enum ActionKind {
  GET_IMAGES = 'GET_IMAGES',
  INIT = 'INIT',
  FLIP_CARD = 'FLIP_CARD',
  RESET = 'RESET',
  GAME_OVER = 'GAME_OVER'
}

type FlipCardAction = {
  type: ActionKind.FLIP_CARD;
  payload: CardModel;
};

type GetImagesAction = {
  type: ActionKind.GET_IMAGES;
  payload: Array<string>;
};

type InitAction = {
  type: ActionKind.INIT;
};

type ResetAction = {
  type: ActionKind.RESET;
};

type GameOverAction = {
  type: ActionKind.GAME_OVER;
};

type Actions =
  | FlipCardAction
  | GetImagesAction
  | InitAction
  | ResetAction
  | GameOverAction;

export const initialState: GameState = {
  deck: [],
  cards: [],
  score: 0,
  status: GameStatus.NOT_STARTED
};

const getCards = (imgs: string[]): CardModel[] => {
  const selection = shuffle(imgs).slice(0, settings.numImages);
  const duplicated = shuffle([...selection, ...selection]);
  return duplicated.map((img, index) => ({
    id: (index + 1).toString(),
    value: img,
    flipped: false,
    matched: false
  }));
};

const putAllCardsFaceDown = (cards: CardModel[]) =>
  cards.map((card) => {
    if (!card.matched) {
      return { ...card, flipped: false };
    }
    return card;
  });

const countFlippedCards = (cards: CardModel[]) =>
  cards.filter(({ flipped, matched }) => flipped && !matched).length;

const getScore = (cards: CardModel[]) =>
  (cards.filter((card) => card.matched).length / 2) * 100;

const gameReducer = (state: GameState, action: Actions): GameState => {
  switch (action.type) {
    case ActionKind.GET_IMAGES: {
      return {
        ...state,
        deck: action.payload
      };
    }
    case ActionKind.INIT: {
      return {
        ...state,
        cards: getCards(state.deck),
        score: 0,
        status: GameStatus.PLAYING
      };
    }
    case ActionKind.FLIP_CARD: {
      const cards = state.cards.map((card) => {
        if (card.id === action.payload.id) {
          return { ...card, flipped: true };
        }
        return { ...card };
      });

      const flippedCards = cards.filter(
        ({ flipped, matched }) => flipped && !matched
      );

      let result;

      if (flippedCards.length === 2) {
        if (flippedCards[0].value === flippedCards[1].value) {
          const a = cards.findIndex((card) => card.id === flippedCards[0].id);
          const b = cards.findIndex((card) => card.id === flippedCards[1].id);
          cards[a].matched = true;
          cards[b].matched = true;
          result = {
            cards: [flippedCards[0].id, flippedCards[1].id],
            match: true
          };
        } else {
          result = {
            cards: [flippedCards[0].id, flippedCards[1].id],
            match: false
          };
        }
      }

      const status = cards.every(({ matched }) => matched)
        ? GameStatus.WIN
        : GameStatus.PLAYING;

      return {
        ...state,
        cards,
        locked: countFlippedCards(cards) === 2,
        result,
        score: getScore(cards),
        status
      };
    }
    case ActionKind.RESET: {
      return {
        ...state,
        cards: putAllCardsFaceDown(state.cards),
        locked: false,
        result: undefined
      };
    }
    case ActionKind.GAME_OVER: {
      return {
        ...state,
        status: GameStatus.GAME_OVER
      };
    }
    /* istanbul ignore next */
    default: {
      return state;
    }
  }
};

const GameContext = React.createContext<GameContextModel>(
  {} as GameContextModel
);

const GameContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const value = useMemo<GameContextModel>(() => {
    const result: GameContextModel = {
      state,
      flipCard: (card: CardModel) => {
        dispatch({ type: ActionKind.FLIP_CARD, payload: card });
      },
      gameOver: () => {
        dispatch({ type: ActionKind.GAME_OVER });
      },
      getImages: (imgs: Array<string>) => {
        dispatch({ type: ActionKind.GET_IMAGES, payload: imgs });
      },
      newGame: () => {
        dispatch({ type: ActionKind.INIT });
      },
      reset: () => {
        dispatch({ type: ActionKind.RESET });
      }
    };

    return result;
  }, [state, dispatch]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export { GameContext, GameContextProvider };
