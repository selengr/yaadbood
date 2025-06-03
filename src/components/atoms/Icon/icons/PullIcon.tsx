import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface PullIconProps {
  width?: number;
  height?: number;
}

const PullIcon: React.FC<PullIconProps> = ({ width = 24, height = 24 }) => {
  const iconColor = useSelector((state: RootState) => state.iconColor.color) || "#334155";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23 20V21H1V20H23ZM8 9H2V19H8V9ZM15 3H9V19H15V3ZM22 14H16V19H22V14Z"
        fill={iconColor}
      />
    </svg>
  );
};

export default PullIcon;