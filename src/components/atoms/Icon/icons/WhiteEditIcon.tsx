import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface WhiteEditIconProps {
  width?: number;
  height?: number;
}

const WhiteEditIcon: React.FC<WhiteEditIconProps> = ({ width = 24, height = 24 }) => {
  const iconColor = useSelector((state: RootState) => state.iconColor.color) || "white";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.13 2.85957C20.5706 2.31885 19.823 2.0166 19.045 2.0166C18.267 2.0166 17.5194 2.31885 16.96 2.85957L3.96 15.8596L2 21.9996L8.19 19.9996L21.13 6.99957C21.6678 6.44065 21.9682 5.69518 21.9682 4.91957C21.9682 4.14396 21.6678 3.39849 21.13 2.83957V2.85957ZM6.77 18.5696L5.42 17.2296L16.64 5.99957L18 7.34957L6.77 18.5696Z"
        fill={iconColor}
      />
    </svg>
  );
};

export default WhiteEditIcon;