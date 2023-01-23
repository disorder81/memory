import React from 'react';
import { PropsWithChildren } from 'react';

import clsx from 'clsx';
import Portal from '../Portal';

import './Modal.scss';

const Modal: React.FC<
  PropsWithChildren<{ isOpen?: boolean; className?: string }>
> = ({ children, isOpen, className }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <Portal>
      <div className={clsx('modal', className)} role="dialog" aria-modal="true">
        <div className="modal__content">{children}</div>
      </div>
    </Portal>
  );
};

export default Modal;
