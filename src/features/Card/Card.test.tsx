import { fireEvent, render, screen } from '@testing-library/react';
import Card from './Card';
import React from 'react';

describe('<Card />', () => {
  const setup = (props?: Partial<React.ComponentProps<typeof Card>>) => {
    const tools = render(
      <Card
        id="1"
        img="value"
        onClick={props?.onClick}
        canFlip={props?.canFlip}
      />
    );
    const card = screen.getByRole('button', {
      name: /repo contributor avatar 1/i
    });

    return { tools, card };
  };

  describe('flipped', () => {
    it('should flip when the prop changes', () => {
      const {
        tools: { rerender },
        card
      } = setup();

      expect(card).toHaveClass('down');
      rerender(<Card id="1" img="value" flipped={true} />);
      expect(card).toHaveClass('up');
    });
  });

  describe('canFlip', () => {
    it('should call the onClick handler when true', () => {
      const onClick = jest.fn();
      const { card } = setup({ onClick });
      fireEvent.click(card);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should not call the onClick handler when false', () => {
      const onClick = jest.fn();
      const { card } = setup({ onClick, canFlip: false });
      fireEvent.click(card);
      expect(onClick).not.toHaveBeenCalled();
    });
  });
});
