'use client';

import { useEffect, useRef, useState } from 'react';

interface useDragModalProps {
  isOpen: boolean;
  defaultSizes: {
    w: string;
    h: string;
  };
}

const useDragModal = ({ isOpen, defaultSizes }: useDragModalProps) => {
  const draggableRef = useRef<HTMLDivElement>(null);
  const resizeableBoxRef = useRef<HTMLDivElement>(null);
  const [sizeReduced, setSizeReduced] = useState(true);

  const params = useRef({
    isDraging: false,
    isResizing: false,
    initialMouseX: 0,
    initialMouseY: 0,
    initialWidth: 0,
    initialHeight: 0
  });

  const resetSize = () => {
    setSizeReduced(false);
    if (resizeableBoxRef.current) {
      resizeableBoxRef.current.style.width = defaultSizes.w;
      resizeableBoxRef.current.style.height = defaultSizes.h;
    }
  };

  const onMouseUp = () => {
    params.current.isDraging = false;
    params.current.isResizing = false;
    if (resizeableBoxRef.current) {
      const isReducedSize = window.innerHeight - resizeableBoxRef.current.clientHeight > 20;
      setSizeReduced(isReducedSize);
    }
  };

  const dragElement = (/* elmnt: HTMLDivElement */) => {
    const elmnt = resizeableBoxRef.current!;
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    const resetPosition = () => {
      elmnt.style.top = '';
      elmnt.style.left = '';
      elmnt.style.width = '';
      elmnt.style.height = '';
    };

    const handleResize = () => {
      if (window.innerWidth <= 512) {
        resetPosition();
        elmnt.removeEventListener('mousedown', dragMouseDown);
        elmnt.removeEventListener('touchstart', dragMouseDown);
      } else {
        elmnt.addEventListener('mousedown', dragMouseDown);
        elmnt.addEventListener('touchstart', dragMouseDown);
      }
    };

    const dragMouseDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;

      if (target.id === 'resize-area') {
        params.current.isResizing = true;
        if (resizeableBoxRef.current) {
          params.current.initialWidth = resizeableBoxRef.current.offsetWidth;
          params.current.initialHeight = resizeableBoxRef.current.offsetHeight;
          if (e instanceof MouseEvent) {
            params.current.initialMouseX = e.clientX;
            params.current.initialMouseY = e.clientY;
          } else {
            params.current.initialMouseX = e.touches[0].clientX;
            params.current.initialMouseY = e.touches[0].clientY;
          }
        }
        return;
      }

      if (target.id !== 'drag-area') return;

      params.current.isDraging = true;
      e.preventDefault();

      if (e instanceof MouseEvent) {
        pos3 = e.clientX;
        pos4 = e.clientY;
      } else {
        pos3 = e.touches[0].clientX;
        pos4 = e.touches[0].clientY;
      }
    };

    const elementDrag = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;

      if (params.current.isResizing && resizeableBoxRef.current) {
        const deltaX = clientX - params.current.initialMouseX;
        const deltaY = clientY - params.current.initialMouseY;

        const newWidth = Math.max(200, params.current.initialWidth + deltaX);
        const newHeight = Math.max(200, params.current.initialHeight + deltaY);

        const maxWidth = window.innerWidth - resizeableBoxRef.current.offsetLeft;
        const maxHeight = window.innerHeight - resizeableBoxRef.current.offsetTop;

        resizeableBoxRef.current.style.width = Math.min(newWidth, maxWidth) + 'px';
        resizeableBoxRef.current.style.height = Math.min(newHeight, maxHeight) + 'px';
        return;
      }

      if (!params.current.isDraging) return;

      pos1 = pos3 - clientX;
      pos2 = pos4 - clientY;
      pos3 = clientX;
      pos4 = clientY;

      const top = elmnt.offsetTop - pos2;
      const left = elmnt.offsetLeft - pos1;
      if (top > -200 && top - 200 < window.innerHeight - elmnt.offsetHeight) elmnt.style.top = top + 'px';
      if (left > -200 && left - 200 < window.innerWidth - elmnt.offsetWidth) elmnt.style.left = left + 'px';
    };

    elmnt.addEventListener('mousedown', dragMouseDown);
    elmnt.addEventListener('touchstart', dragMouseDown);

    window.addEventListener('mousemove', elementDrag);
    window.addEventListener('touchmove', elementDrag);

    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchend', onMouseUp);

    window.addEventListener('resize', handleResize);

    return () => {
      elmnt.removeEventListener('mousedown', dragMouseDown);
      elmnt.removeEventListener('touchstart', dragMouseDown);
      window.removeEventListener('mousemove', elementDrag);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchend', onMouseUp);
      window.removeEventListener('touchmove', elementDrag);
    };
  };

  useEffect(() => {
    setTimeout(() => {
      if (draggableRef.current) {

        const cleanup = dragElement();
        return () => {
          cleanup();
        };
      }
    }, 0);
  }, [isOpen]);

  return { draggableRef, resizeableBoxRef, sizeReduced, resetSize };
};

export default useDragModal;
