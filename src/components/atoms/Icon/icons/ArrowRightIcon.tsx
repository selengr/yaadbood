import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface ArrowRightIconProps {
  width?: number;
  height?: number;
}

const ArrowRightIcon: React.FC<ArrowRightIconProps> = ({ width = 16, height = 16 }) => {
  const iconColor = useSelector((state: RootState) => state.iconColor.color);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.62 3.95312L13.6667 7.99979L9.62 12.0465"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.33337 8H13.5534"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowRightIcon;