import { useEffect } from 'react';

interface RefObject {
  current: HTMLElement | null;
}

type EventHandler = (event: MouseEvent | TouchEvent) => void;

export function useOnClickOutside(ref: RefObject, handler: EventHandler) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
