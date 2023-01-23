export enum ActionKind {
  GET_IMAGES = 'GET_IMAGES',
  INIT = 'INIT',
  FLIP_CARD = 'FLIP_CARD',
  RESET = 'RESET',
  GAME_OVER = 'GAME_OVER'
}

export type Action = {
  type: ActionKind;
  payload?: any;
};
