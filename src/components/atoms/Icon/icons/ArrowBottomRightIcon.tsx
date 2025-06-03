import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface ArrowBottomRightIconProps {
  width?: number;
  height?: number;
}

const ArrowBottomRightIcon: React.FC<ArrowBottomRightIconProps> = ({ width = 25, height = 24 }) => {
  const iconColor = useSelector((state: RootState) => state.iconColor.color);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.9805 21L21.5 17.4804L17.9805 13.9609"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.5 17.4804H11.0419C8.82039 17.4804 7.01953 15.6796 7.01953 13.4581V3"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowBottomRightIcon;