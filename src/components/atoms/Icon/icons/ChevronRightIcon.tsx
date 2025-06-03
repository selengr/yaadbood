import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface ChevronRightIconProps {
  width?: number;
  height?: number;
}

const ChevronRightIcon: React.FC<ChevronRightIconProps> = ({ width = 12, height = 12 }) => {
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
        d="M4.45312 9.95906L7.71313 6.69906C8.09813 6.31406 8.09813 5.68406 7.71313 5.29906L4.45312 2.03906"
        stroke={iconColor}
        strokeWidth="1.25"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronRightIcon;