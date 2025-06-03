import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface TypeIconProps {
  width?: number;
  height?: number;
}

const TypeIcon: React.FC<TypeIconProps> = ({ width = 26, height = 26 }) => {
  const iconColor = useSelector((state: RootState) => state.iconColor.color) || "#334155";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.361 1.21777H0.959961C1.30726 2.91961 2.23072 4.44909 3.57418 5.54754C4.91765 6.64599 6.59865 7.246 8.33291 7.2461H9.83759V25.1876C11.4203 24.8728 12.86 24.0564 13.9438 22.859C15.0276 21.6616 15.6982 20.1468 15.8563 18.5384V7.2461H25.018C24.3211 3.80634 21.0011 1.21777 17.361 1.21777Z"
        fill={iconColor}
      />
    </svg>
  );
};

export default TypeIcon;