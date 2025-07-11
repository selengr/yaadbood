import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface LogoIconProps {
  width?: number;
  height?: number;
}

const LinkedInCameraIcon: React.FC<LogoIconProps> = ({ width = 24, height = 24 }) => {
  const iconColor = useSelector((state: RootState) => state.iconColor.color);

  return (
    <svg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_2108_8367)'>
        <path
          d='M16.5 13C16.5 13.7911 16.2654 14.5645 15.8259 15.2223C15.3864 15.8801 14.7616 16.3928 14.0307 16.6955C13.2998 16.9983 12.4956 17.0775 11.7196 16.9231C10.9437 16.7688 10.231 16.3878 9.67157 15.8284C9.11216 15.269 8.7312 14.5563 8.57686 13.7804C8.42252 13.0044 8.50173 12.2002 8.80448 11.4693C9.10723 10.7384 9.61992 10.1136 10.2777 9.67412C10.9355 9.2346 11.7089 9 12.5 9C13.5609 9 14.5783 9.42143 15.3284 10.1716C16.0786 10.9217 16.5 11.9391 16.5 13ZM22.5 9V20H2.5V9C2.5 8.20435 2.81607 7.44129 3.37868 6.87868C3.94129 6.31607 4.70435 6 5.5 6H6.8L8 3H17L18.2 6H19.5C20.2956 6 21.0587 6.31607 21.6213 6.87868C22.1839 7.44129 22.5 8.20435 22.5 9ZM17.5 13C17.5 12.0111 17.2068 11.0444 16.6573 10.2221C16.1079 9.3999 15.327 8.75904 14.4134 8.3806C13.4998 8.00216 12.4945 7.90315 11.5245 8.09607C10.5546 8.289 9.66373 8.7652 8.96447 9.46447C8.2652 10.1637 7.789 11.0546 7.59607 12.0245C7.40315 12.9945 7.50216 13.9998 7.8806 14.9134C8.25904 15.827 8.8999 16.6079 9.72215 17.1573C10.5444 17.7068 11.5111 18 12.5 18C13.8261 18 15.0979 17.4732 16.0355 16.5355C16.9732 15.5979 17.5 14.3261 17.5 13Z'
          fill={iconColor || '#1DA1F3'}
        />
      </g>
      <defs>
        <clipPath id='clip0_2108_8367'>
          <rect width='24' height='24' fill='white' transform='translate(0.5)' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default LinkedInCameraIcon;
