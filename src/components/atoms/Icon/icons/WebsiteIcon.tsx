import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface WebsiteIconProps {
  width?: number;
  height?: number;
}

const WebsiteIcon: React.FC<WebsiteIconProps> = ({ width = 24, height = 24 }) => {
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
        d="M13.0598 10.9404C15.3098 13.1904 15.3098 16.8304 13.0598 19.0704C10.8098 21.3104 7.16985 21.3204 4.92985 19.0704C2.68985 16.8204 2.67985 13.1804 4.92985 10.9404"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.59 13.4099C8.24996 11.0699 8.24996 7.26988 10.59 4.91988C12.93 2.56988 16.73 2.57988 19.08 4.91988C21.43 7.25988 21.42 11.0599 19.08 13.4099"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default WebsiteIcon;