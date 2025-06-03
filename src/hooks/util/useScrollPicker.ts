import { useCallback, useRef, useState } from 'react';

export default function useScrollPicker<T>() {
  const [dragging, setDragging] = useState(false);

  const isDragging = useRef(false);

  const touchStartY = useRef(0);
  const handleWheel = useCallback(
    (
      deltaY: number,
      selected: T | null,
      setSelected: React.Dispatch<React.SetStateAction<T>>,
      items: (T | null)[],
      refs: React.MutableRefObject<HTMLDivElement[]>
    ) => {
      const currentIndex = items.indexOf(selected);
      const threshold = 10; // Minimum delta threshold

      // Debounce rapid scroll events
      if (Math.abs(deltaY) < threshold) return;

      // Calculate next index with bounds checking
      const nextIndex =
        deltaY > 0 ? Math.min(currentIndex + 1, items.length - 1) : Math.max(currentIndex - 1, 0);

      // Only update if we have a valid item
      if (items[nextIndex] !== null) {
        setSelected(items[nextIndex]!);
        // Use requestAnimationFrame for smooth scrolling
        requestAnimationFrame(() => {
          refs.current[nextIndex]?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        });
      }
    },
    []
  );

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (
    e: React.TouchEvent<HTMLDivElement>,
    selected: T | null,
    setSelected: React.Dispatch<React.SetStateAction<T>>,
    items: (T | null)[],
    refs: React.MutableRefObject<HTMLDivElement[]>
  ) => {
    const deltaY = touchStartY.current - e.touches[0].clientY;
    if (Math.abs(deltaY) > 50) {
      handleWheel(deltaY, selected, setSelected, items, refs);
      touchStartY.current = e.touches[0].clientY;
    }
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    selected: T | null,
    setSelected: React.Dispatch<React.SetStateAction<T>>,
    items: (T | null)[],
    refs: React.MutableRefObject<HTMLDivElement[]>
  ) => {
    switch (e.key) {
      case 'ArrowUp':
        handleWheel(-1, selected, setSelected, items, refs);
        break;
      case 'ArrowDown':
        handleWheel(1, selected, setSelected, items, refs);
        break;
      case 'Tab':
        // Prevent default tab behavior
        e.preventDefault();
        // Move focus between columns
        if (e.shiftKey) {
          // Focus previous column
          (e.currentTarget.previousElementSibling as HTMLElement)?.focus();
        } else {
          // Focus next column
          (e.currentTarget.nextElementSibling as HTMLElement)?.focus();
        }
        break;
      // case 'Home':
      //   // Jump to first valid item
      //   const firstValid = items.findIndex((item) => item !== null);
      //   if (firstValid >= 0) {
      //     setSelected(items[firstValid]!);
      //     refs.current[firstValid]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      //   }
      //   break;
      // case 'End':
      //   // Jump to last valid item
      //   const lastValid = items.findLastIndex((item) => item !== null);
      //   if (lastValid >= 0) {
      //     setSelected(items[lastValid]!);
      //     refs.current[lastValid]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      //   }
      //   break;
    }
  };
  const getClassForItem = (index: number, selectedIndex: number) => {
    const distance = Math.abs(index - selectedIndex);
    if (distance === 0) return 'selected';
    if (distance === 1) return 'near';
    if (distance === 2) return 'far';
    return '';
  };

  const handleMouseDown = () => {
    isDragging.current = true;
    setDragging(true);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    setDragging(false);
  };
  const deltaAccumulator = useRef(0);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    selected: T | null,
    setSelected: React.Dispatch<React.SetStateAction<T>>,
    items: (T | null)[],
    refs: React.MutableRefObject<HTMLDivElement[]>
  ) => {
    if (!isDragging.current) return;

    deltaAccumulator.current += e.movementY;

    if (Math.abs(deltaAccumulator.current) > 10) {
      const deltaY = deltaAccumulator.current > 0 ? -1 : 1;
      deltaAccumulator.current = 0;
      handleWheel(deltaY, selected, setSelected, items, refs);
    }
  };

  return {
    dragging,
    handleKeyDown,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchStart,
    getClassForItem,
    handleWheel
  };
}
