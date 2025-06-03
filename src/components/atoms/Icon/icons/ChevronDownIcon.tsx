import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface ChevronDownIconProps {
  width?: number;
  height?: number;
}

const ChevronDownIcon: React.FC<ChevronDownIconProps> = ({ width = 12, height = 12 }) => {
  const iconColor = useSelector((state: RootState) => state.iconColor.color);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 8.25L2.25 4.5H9.75L6 8.25Z"
        fill={iconColor}
      />
    </svg>
  );
};

export default ChevronDownIcon;