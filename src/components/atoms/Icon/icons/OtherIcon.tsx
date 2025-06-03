import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface OtherIconProps {
  width?: number;
  height?: number;
}

const OtherIcon: React.FC<OtherIconProps> = ({ width = 17, height = 17 }) => {
  const iconColor = useSelector((state: RootState) => state.iconColor.color) || "#94A3B8";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.16536 8.50065C10.0063 8.50065 11.4987 7.00827 11.4987 5.16732C11.4987 3.32637 10.0063 1.83398 8.16536 1.83398C6.32442 1.83398 4.83203 3.32637 4.83203 5.16732C4.83203 7.00827 6.32442 8.50065 8.16536 8.50065Z"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.8928 15.1667C13.8928 12.5867 11.3261 10.5 8.16612 10.5C5.00612 10.5 2.43945 12.5867 2.43945 15.1667"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default OtherIcon;