import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface LogoIconProps {
  width?: number;
  height?: number;
}

const LinkedInTrashIcon: React.FC<LogoIconProps> = ({ width = 24, height = 24 }) => {
  const iconColor = useSelector((state: RootState) => state.iconColor.color); 

  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_2108_8373)">
      <path d="M20 4V5H4V4C4 3.73478 4.10536 3.48043 4.29289 3.29289C4.48043 3.10536 4.73478 3 5 3H9C9 2.73478 9.10536 2.48043 9.29289 2.29289C9.48043 2.10536 9.73478 2 10 2H14C14.2652 2 14.5196 2.10536 14.7071 2.29289C14.8946 2.48043 15 2.73478 15 3H19C19.2652 3 19.5196 3.10536 19.7071 3.29289C19.8946 3.48043 20 3.73478 20 4ZM5 6H19V19C19 19.7956 18.6839 20.5587 18.1213 21.1213C17.5587 21.6839 16.7956 22 16 22H8C7.20435 22 6.44129 21.6839 5.87868 21.1213C5.31607 20.5587 5 19.7956 5 19V6ZM14 18H15V8H14V18ZM9 18H10V8H9V18Z" 
        fill={iconColor || "#1DA1F3"}/>
      </g>
      <defs>
      <clipPath id="clip0_2108_8373">
      <rect width="24" height="24" fill="white"/>
      </clipPath>
      </defs>
    </svg>
  );
};

export default LinkedInTrashIcon;