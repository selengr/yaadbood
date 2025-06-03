import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface ArrowDownIconProps {
  width?: number;
  height?: number;
}

const ArrowDownIcon: React.FC<ArrowDownIconProps> = ({ width = 20, height = 20 }) => {
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
        d="M16.6004 7.4585L11.1671 12.8918C10.5254 13.5335 9.47539 13.5335 8.83372 12.8918L3.40039 7.4585"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowDownIcon;