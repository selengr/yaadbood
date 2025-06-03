import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface ProfileIconProps {
  width?: number;
  height?: number;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ width = 21, height = 20 }) => {
  const iconColor = useSelector((state: RootState) => state.iconColor.color) || "#6A7890";

  return (
    <svg
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
    >
      <path
        d="M10.2318 9.05768C10.1484 9.04935 10.0484 9.04935 9.95677 9.05768C7.97344 8.99102 6.39844 7.36602 6.39844 5.36602C6.39844 3.32435 8.04844 1.66602 10.0984 1.66602C12.1401 1.66602 13.7984 3.32435 13.7984 5.36602C13.7901 7.36602 12.2151 8.99102 10.2318 9.05768Z"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.06328 12.134C4.04661 13.484 4.04661 15.684 6.06328 17.0257C8.35495 18.559 12.1133 18.559 14.4049 17.0257C16.4216 15.6757 16.4216 13.4757 14.4049 12.134C12.1216 10.609 8.36328 10.609 6.06328 12.134Z"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ProfileIcon;