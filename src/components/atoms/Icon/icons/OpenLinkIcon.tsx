import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface OpenLinkIconProps {
  width?: number;
  height?: number;
}

const OpenLinkIcon: React.FC<OpenLinkIconProps> = ({ width = 12, height = 13 }) => {
  const iconColor = useSelector((state: RootState) => state.iconColor.color);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.11555 3H3.62533C2.31911 3 1.5 3.92489 1.5 5.23378V8.7662C1.5 10.0751 2.31511 11 3.62533 11H7.3738C8.68445 11 9.5 10.0751 9.5 8.7662V7.49245"
        stroke={iconColor || "#1DA1F3"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 4.56583V2M10.5 2H7.9342M10.5 2L6.5 6"
        stroke={iconColor || "#1DA1F3"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default OpenLinkIcon;