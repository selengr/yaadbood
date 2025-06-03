import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface WhiteCloseIconProps {
  width?: number;
  height?: number;
}

const WhiteCloseIcon: React.FC<WhiteCloseIconProps> = ({ width = 16, height = 16 }) => {
  const iconColor = useSelector((state: RootState) => state.iconColor.color) || "white";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4L12 12"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 4L4 12"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default WhiteCloseIcon;