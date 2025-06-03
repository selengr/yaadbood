import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface RotateLeftIconProps {
  width?: number;
  height?: number;
}

const RotateLeftIcon: React.FC<RotateLeftIconProps> = ({ width = 24, height = 24 }) => {
  const iconColor = useSelector((state: RootState) => state.iconColor.color) || "#475569";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.07957 11H3.05957C3.24957 9.27 3.93957 7.68 4.97957 6.39L6.40957 7.82C5.71957 8.74 5.25957 9.82 5.08957 11H5.07957ZM5.07957 13H3.05957C3.24957 14.73 3.93957 16.31 4.97957 17.61L6.39957 16.19C5.70957 15.28 5.24957 14.19 5.07957 13ZM12.0396 3L13.9996 0H11.6296L9.39957 3.39L8.99957 4L9.87957 5.34L11.6196 8H13.9896L12.0296 5C15.8696 5.02 18.9896 8.15 18.9896 12C18.9896 15.52 16.3796 18.43 12.9896 18.92V20.94C17.4796 20.44 20.9896 16.62 20.9896 12C20.9896 7.05 16.9696 3.02 12.0296 3H12.0396ZM6.38957 19.02C7.71368 20.0832 9.31222 20.749 10.9996 20.94V18.92C9.84603 18.7522 8.75282 18.2985 7.81957 17.6L6.38957 19.03V19.02Z"
        fill={iconColor}
      />
    </svg>
  );
};

export default RotateLeftIcon;