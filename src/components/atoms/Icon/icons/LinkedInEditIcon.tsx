import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface LogoIconProps {
  width?: number;
  height?: number;
}

const LinkedInEditIcon: React.FC<LogoIconProps> = ({ width = 24, height = 24 }) => {
  const iconColor = useSelector((state: RootState) => state.iconColor.color);

  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M21.13 2.86006C20.5706 2.31934 19.823 2.01709 19.045 2.01709C18.267 2.01709 17.5194 2.31934 16.96 2.86006L3.96 15.8601L2 22.0001L8.19 20.0001L21.13 7.00006C21.6678 6.44114 21.9682 5.69567 21.9682 4.92006C21.9682 4.14445 21.6678 3.39898 21.13 2.84006V2.86006ZM6.77 18.5701L5.42 17.2301L16.64 6.00006L18 7.35006L6.77 18.5701Z'
        fill={iconColor || "#1DA1F3"}
      />
    </svg>
  );
};

export default LinkedInEditIcon;
