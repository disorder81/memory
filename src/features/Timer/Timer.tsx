import React, { useContext, useEffect, useState } from 'react';
import { GameContext, GameStatus } from '../../context/GameContext';
import usePrevious from '../../hooks/usePrevious';
import { messages } from '../../messages';

const Timer: React.FC<{ initialTime: number }> = ({ initialTime }) => {
  const {
    state: { status },
    gameOver
  } = useContext(GameContext);
  const [time, setTime] = useState<number>(initialTime);

  const previous = usePrevious(status);

  const getSeconds = () => {
    setTime((seconds) => seconds - 1);
  };

  const reset = () => {
    setTime(initialTime);
  };

  // TODO: countdown to hook
  useEffect(() => {
    let interval: number | undefined;
    if (status === GameStatus.PLAYING) {
      interval = window.setInterval(() => getSeconds(), 1000);
    } else {
      clearInterval(interval);
    }

    if (
      status === GameStatus.PLAYING &&
      (previous === GameStatus.GAME_OVER || previous === GameStatus.WIN)
    ) {
      reset();
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [status]);

  useEffect(() => {
    if (time <= 0) {
      gameOver();
    }
  }, [time]);

  return (
    <div className="time-left">
      {time > 0 ? `Time: ${time} seconds` : messages.outOfTime}
    </div>
  );
};

export default Timer;
