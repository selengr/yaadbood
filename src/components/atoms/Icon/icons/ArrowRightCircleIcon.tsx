import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface ArrowRightCircleIconProps {
  width?: number;
  height?: number;
}

const ArrowRightCircleIcon: React.FC<ArrowRightCircleIconProps> = ({ width = 32, height = 33 }) => {
  const iconColor = useSelector((state: RootState) => state.iconColor.color);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 29.8333C23.3638 29.8333 29.3333 23.8638 29.3333 16.5C29.3333 9.13616 23.3638 3.16663 16 3.16663C8.63621 3.16663 2.66667 9.13616 2.66667 16.5C2.66667 23.8638 8.63621 29.8333 16 29.8333Z"
        stroke={iconColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.3333 16.5H19.3333"
        stroke={iconColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.6667 20.5L20.6667 16.5L16.6667 12.5"
        stroke={iconColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowRightCircleIcon;