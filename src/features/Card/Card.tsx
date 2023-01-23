import React from 'react';

import clsx from 'clsx';

import './Card.scss';

const Card: React.FC<{
  id: string;
  img: string;
  flipped?: boolean;
  canFlip?: boolean;
  onClick?: () => void;
  className?: string;
}> = ({ id, img, flipped, canFlip = true, onClick, className }) => {
  const handleClick = () => {
    if (canFlip && onClick) {
      onClick();
    }
  };

  return (
    <div
      className={clsx('card', { up: flipped, down: !flipped }, className)}
      role="button"
      onClick={handleClick}
      data-testid={img}
    >
      <div className="card__front">
        <img src={img} alt={`repo contributor avatar ${id}`} />
      </div>
      <div className="card__back">
        <span>?</span>
      </div>
    </div>
  );
};

export default Card;
