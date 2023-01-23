import { PropsWithChildren, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const createWrapper = (id: string) => {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('id', id);
  document.body.appendChild(wrapper);
  return wrapper;
};

const Portal: React.FC<PropsWithChildren<{ id?: string }>> = ({
  children,
  id = 'portal'
}) => {
  const [wrapper, setWrapper] = useState<HTMLElement | undefined>(undefined);

  useLayoutEffect(() => {
    let element = document.getElementById(id);
    if (!element) {
      element = createWrapper(id);
    }
    setWrapper(element);

    return () => {
      if(element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    }
  }, [id])

  if(!wrapper) return null;

  return createPortal(children, wrapper);
};

export default Portal;
