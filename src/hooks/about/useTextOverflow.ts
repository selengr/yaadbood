import { useEffect, useRef, useState } from 'react';

const useTextOverflow = (text: string | undefined) => {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = 28;
      const maxHeight = lineHeight * 4;
      const needOverflow = textRef.current.scrollHeight > maxHeight;
      setIsOverflowing(needOverflow);
      setExpanded(!needOverflow);
    }
  }, [text, textRef?.current?.scrollHeight]);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return {
    expanded,
    isOverflowing,
    textRef,
    toggleExpanded
  };
};

export default useTextOverflow;
