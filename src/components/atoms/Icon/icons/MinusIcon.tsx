import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface MinusIconProps {
  width?: number;
  height?: number;
}

const MinusIcon: React.FC<MinusIconProps> = ({ width = 20, height = 20 }) => {
  const iconColor = useSelector((state: RootState) => state.iconColor.color);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 10H15"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MinusIcon;