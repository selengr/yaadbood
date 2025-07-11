import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface MoonIconProps {
  width?: number;
  height?: number;
}

const MoonIcon: React.FC<MoonIconProps> = ({ width = 20, height = 20 }) => {
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
        d="M1.6917 10.35C1.9917 14.6416 5.63337 18.1333 9.9917 18.325C13.0667 18.4583 15.8167 17.025 17.4667 14.7666C18.15 13.8416 17.7834 13.225 16.6417 13.4333C16.0834 13.5333 15.5084 13.575 14.9084 13.55C10.8334 13.3833 7.50003 9.97497 7.48337 5.94997C7.47503 4.86663 7.70003 3.84163 8.10837 2.9083C8.55837 1.87497 8.0167 1.3833 6.97503 1.82497C3.67503 3.21663 1.4167 6.54163 1.6917 10.35Z"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MoonIcon;