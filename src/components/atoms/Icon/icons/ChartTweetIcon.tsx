import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface ChartTweetIconProps {
  width?: number;
  height?: number;
}

const ChartTweetIcon: React.FC<ChartTweetIconProps> = ({ width = 21, height = 23 }) => {
  const iconColor = useSelector((state: RootState) => state.iconColor.color);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 21 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.0001 7.89001L10.9301 9.75001C10.6901 10.16 10.8901 10.5 11.3601 10.5H12.6301C13.1101 10.5 13.3001 10.84 13.0601 11.25L12.0001 13.11"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.29938 18.0401V16.8801C5.99938 15.4901 4.10938 12.7801 4.10938 9.90005C4.10938 4.95005 8.65938 1.07005 13.7994 2.19005C16.0594 2.69005 18.0394 4.19005 19.0694 6.26005C21.1594 10.4601 18.9594 14.9201 15.7294 16.8701V18.0301C15.7294 18.3201 15.8394 18.9901 14.7694 18.9901H9.25938C8.15938 19.0001 8.29938 18.5701 8.29938 18.0401Z"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 22C10.79 21.35 13.21 21.35 15.5 22"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChartTweetIcon;