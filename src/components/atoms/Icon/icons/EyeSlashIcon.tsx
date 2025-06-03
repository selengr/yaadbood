import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface EyeSlashIconProps {
  width?: number;
  height?: number;
}

const EyeSlashIcon: React.FC<EyeSlashIconProps> = ({ width = 17, height = 16 }) => {
  const iconColor = useSelector((state: RootState) => state.iconColor.color);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.1866 6.31328L6.81328 9.68661C6.37995 9.25328 6.11328 8.65995 6.11328 7.99995C6.11328 6.67995 7.17995 5.61328 8.49995 5.61328C9.15995 5.61328 9.75328 5.87995 10.1866 6.31328Z"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.3799 3.84633C11.2132 2.96633 9.8799 2.48633 8.4999 2.48633C6.14656 2.48633 3.95323 3.87299 2.42656 6.27299C1.82656 7.21299 1.82656 8.793 2.42656 9.733C2.95323 10.5597 3.56656 11.273 4.23323 11.8463"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.11328 13.0204C6.87328 13.3404 7.67995 13.5138 8.49995 13.5138C10.8533 13.5138 13.0466 12.1271 14.5733 9.72711C15.1733 8.78711 15.1733 7.20711 14.5733 6.26711C14.3533 5.92044 14.1133 5.59378 13.8666 5.28711"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.8409 8.4668C10.6676 9.4068 9.90094 10.1735 8.96094 10.3468"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.81398 9.6875L1.83398 14.6675"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.1675 1.33398L10.1875 6.31398"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default EyeSlashIcon;