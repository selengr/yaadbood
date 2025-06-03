import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface CancelCircleIconProps {
  width?: number;
  height?: number;
}

const CancelCircleIcon: React.FC<CancelCircleIconProps> = ({ width = 16, height = 16 }) => {
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
        d="M7.9987 14.6654C11.6654 14.6654 14.6654 11.6654 14.6654 7.9987C14.6654 4.33203 11.6654 1.33203 7.9987 1.33203C4.33203 1.33203 1.33203 4.33203 1.33203 7.9987C1.33203 11.6654 4.33203 14.6654 7.9987 14.6654Z"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.11328 9.88661L9.88661 6.11328"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.88661 9.88661L6.11328 6.11328"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CancelCircleIcon;