import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface SunIconProps {
  width?: number;
  height?: number;
}

const SunIcon: React.FC<SunIconProps> = ({ width = 20, height = 20 }) => {
  const iconColor = useSelector((state: RootState) => state.iconColor.color) || "#556170";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 15.4166C12.9916 15.4166 15.4167 12.9915 15.4167 9.99992C15.4167 7.00838 12.9916 4.58325 10 4.58325C7.0085 4.58325 4.58337 7.00838 4.58337 9.99992C4.58337 12.9915 7.0085 15.4166 10 15.4166Z"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.8416 4.15841L15.95 4.05008L15.8416 4.15841ZM4.04996 15.9501L4.15829 15.8417L4.04996 15.9501ZM9.99996 1.73341V1.66675V1.73341ZM9.99996 18.3334V18.2667V18.3334ZM1.73329 10.0001H1.66663H1.73329ZM18.3333 10.0001H18.2666H18.3333ZM4.15829 4.15841L4.04996 4.05008L4.15829 4.15841ZM15.95 15.9501L15.8416 15.8417L15.95 15.9501Z"
        fill={iconColor}
      />
      <path
        d="M15.95 15.9501L15.8416 15.8417M15.8416 4.15841L15.95 4.05008L15.8416 4.15841ZM4.04996 15.9501L4.15829 15.8417L4.04996 15.9501ZM9.99996 1.73341V1.66675V1.73341ZM9.99996 18.3334V18.2667V18.3334ZM1.73329 10.0001H1.66663H1.73329ZM18.3333 10.0001H18.2666H18.3333ZM4.15829 4.15841L4.04996 4.05008L4.15829 4.15841Z"
        stroke={iconColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SunIcon;