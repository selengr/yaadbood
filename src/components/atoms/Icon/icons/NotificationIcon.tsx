import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface NotificationProps {
  width?: number;
  height?: number;
}

const Notification: React.FC<NotificationProps> = ({ width = 24, height = 24 }) => {
  const iconColor = useSelector((state: RootState) => state.iconColor.color); 

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.0166 2.42505C7.25828 2.42505 5.01662 4.66672 5.01662 7.42505V9.83338C5.01662 10.3417 4.79995 11.1167 4.54162 11.55L3.58328 13.1417C2.99162 14.125 3.39995 15.2167 4.48328 15.5834C8.07495 16.7834 11.95 16.7834 15.5416 15.5834C16.55 15.25 16.9916 14.0584 16.4416 13.1417L15.4833 11.55C15.2333 11.1167 15.0166 10.3417 15.0166 9.83338V7.42505C15.0166 4.67505 12.7666 2.42505 10.0166 2.42505Z"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        fill={iconColor}
      />
      <path
        d="M11.5583 2.6667C11.3 2.5917 11.0333 2.53337 10.7583 2.50003C9.95831 2.40003 9.19164 2.45837 8.47498 2.6667C8.71664 2.05003 9.31664 1.6167 10.0166 1.6167C10.7166 1.6167 11.3166 2.05003 11.5583 2.6667Z"
        fill={iconColor}
        stroke={iconColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5167 15.8833C12.5167 17.2583 11.3917 18.3833 10.0167 18.3833C9.33339 18.3833 8.70006 18.1 8.25006 17.65C7.80006 17.2 7.51672 16.5666 7.51672 15.8833"
        stroke={iconColor}
        strokeMiterlimit="10"
        fill={iconColor}
      />
    </svg>
  );
};

export default Notification;