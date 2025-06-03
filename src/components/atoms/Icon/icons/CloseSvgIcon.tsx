import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface CloseSvgIconProps {
  width?: number;
  height?: number;
}

const CloseSvgIcon: React.FC<CloseSvgIconProps> = ({ width = 20, height = 20 }) => {
  const iconColor = useSelector((state: RootState) => state.iconColor.color);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 5L15 15L5 5Z" fill={iconColor} />
      <path
        d="M5 5L15 15"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M15 5L5 15L15 5Z" fill={iconColor} />
      <path
        d="M15 5L5 15"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CloseSvgIcon;