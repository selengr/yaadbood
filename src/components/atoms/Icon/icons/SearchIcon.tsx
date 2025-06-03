import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface SearchIconProps {
  width?: number;
  height?: number;
}

const SearchIcon: React.FC<SearchIconProps> = ({ width = 16, height = 16 }) => {
  const iconColor = useSelector((state: RootState) => state.iconColor.color) || "#334155";

  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
    >
      <path
        d="M7.66665 13.9999C11.1644 13.9999 14 11.1644 14 7.66659C14 4.16878 11.1644 1.33325 7.66665 1.33325C4.16884 1.33325 1.33331 4.16878 1.33331 7.66659C1.33331 11.1644 4.16884 13.9999 7.66665 13.9999Z"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6666 14.6666L13.3333 13.3333"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SearchIcon;