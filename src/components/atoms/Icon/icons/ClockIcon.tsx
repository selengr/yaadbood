import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface ClockIconProps {
  width?: number;
  height?: number;
}

const ClockIcon: React.FC<ClockIconProps> = ({ width = 13, height = 12 }) => {
  const iconColor = useSelector((state: RootState) => state.iconColor.color);
  
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.5 1C3.745 1 1.5 3.245 1.5 6C1.5 8.755 3.745 11 6.5 11C9.255 11 11.5 8.755 11.5 6C11.5 3.245 9.255 1 6.5 1ZM8.675 7.785C8.605 7.905 8.48 7.97 8.35 7.97C8.285 7.97 8.22 7.955 8.16 7.915L6.61 6.99C6.225 6.76 5.94 6.255 5.94 5.81V3.76C5.94 3.555 6.11 3.385 6.315 3.385C6.52 3.385 6.69 3.555 6.69 3.76V5.81C6.69 5.99 6.84 6.255 6.995 6.345L8.545 7.27C8.725 7.375 8.785 7.605 8.675 7.785Z"
        fill={iconColor}
      />
    </svg>
  );
};

export default ClockIcon;