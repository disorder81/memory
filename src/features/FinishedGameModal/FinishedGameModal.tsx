import React, { useContext } from 'react';

import { GameContext, GameStatus } from '../../context/GameContext';
import { messages } from '../../messages';

import NewGame from '../NewGame/NewGame';

import Score from '../Score/Score';
import Modal from '../../components/Modal/Modal';

import './FinishedGameModal.scss';

const FinishedGameModal = () => {
  const {
    state: { status }
  } = useContext(GameContext);
  return (
    <Modal
      isOpen={status === GameStatus.WIN || status === GameStatus.GAME_OVER}
      className="finished-game-modal"
    >
      <h2>{messages[status]}</h2>
      <Score />
      <NewGame />
    </Modal>
  );
};

export default FinishedGameModal;
