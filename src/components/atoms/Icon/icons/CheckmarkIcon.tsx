import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface CheckmarkIconProps {
  width?: number;
  height?: number;
}

const CheckmarkIcon: React.FC<CheckmarkIconProps> = ({ width = 16, height = 16 }) => {
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
        d="M12.6663 4.79199L6.24967 11.2087L3.33301 8.29199"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckmarkIcon;