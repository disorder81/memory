import React, { useContext, useEffect } from 'react';

import './Board.scss';

import clsx from 'clsx';
import { GameContext, CardModel } from '../../context/GameContext';

import Card from '../Card/Card';
import FinishedGameModal from '../FinishedGameModal/FinishedGameModal';

const Board: React.FC = () => {
  const {
    state: { cards, result, locked },
    flipCard,
    reset
  } = useContext(GameContext);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (result) {
        reset();
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [result]);

  const handleFlip = (card: CardModel) => () => {
    flipCard(card);
  };

  return (
    <div className="board">
      {cards.map((card) => {
        const canFlip = !locked && !card.flipped;
        let className = '';

        if (card.flipped && result?.cards?.includes(card.id)) {
          className = clsx({
            ok: result?.match,
            error: !result?.match
          });
        }

        return (
          <div className="flippable" key={card.id}>
            <Card
              key={card.id}
              id={card.id}
              img={card.value}
              flipped={card.flipped}
              className={className}
              canFlip={canFlip}
              onClick={handleFlip(card)}
            />
          </div>
        );
      })}
      <FinishedGameModal />
    </div>
  );
};

export default Board;
