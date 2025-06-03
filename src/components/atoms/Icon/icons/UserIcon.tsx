import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface UserIconProps {
  width?: number;
  height?: number;
}

const UserIcon: React.FC<UserIconProps> = ({ width = 20, height = 20 }) => {
  const iconColor = useSelector((state: RootState) => state.iconColor.color) || "#334155";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 10.0001C12.3012 10.0001 14.1667 8.1346 14.1667 5.83341C14.1667 3.53223 12.3012 1.66675 10 1.66675C7.69885 1.66675 5.83337 3.53223 5.83337 5.83341C5.83337 8.1346 7.69885 10.0001 10 10.0001Z"
        fill={iconColor}
        stroke="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.1583 18.3333C17.1583 15.1083 13.95 12.5 10 12.5C6.05001 12.5 2.84167 15.1083 2.84167 18.3333"
        fill={iconColor}
        stroke="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UserIcon;