import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface DeleteIconProps {
  width?: number;
  height?: number;
}

const DeleteIcon: React.FC<DeleteIconProps> = ({ width = 25, height = 24 }) => {
  const iconColor = useSelector((state: RootState) => state.iconColor.color);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_515_25425)">
        <path
          d="M20.5 4V5H4.5V4C4.5 3.73478 4.60536 3.48043 4.79289 3.29289C4.98043 3.10536 5.23478 3 5.5 3H9.5C9.5 2.73478 9.60536 2.48043 9.79289 2.29289C9.98043 2.10536 10.2348 2 10.5 2H14.5C14.7652 2 15.0196 2.10536 15.2071 2.29289C15.3946 2.48043 15.5 2.73478 15.5 3H19.5C19.7652 3 20.0196 3.10536 20.2071 3.29289C20.3946 3.48043 20.5 3.73478 20.5 4ZM5.5 6H19.5V19C19.5 19.7956 19.1839 20.5587 18.6213 21.1213C18.0587 21.6839 17.2956 22 16.5 22H8.5C7.70435 22 6.94129 21.6839 6.37868 21.1213C5.81607 20.5587 5.5 19.7956 5.5 19V6ZM14.5 18H15.5V8H14.5V18ZM9.5 18H10.5V8H9.5V18Z"
          fill={iconColor}
        />
      </g>
      <defs>
        <clipPath id="clip0_515_25425">
          <rect width="24" height="24" fill="white" transform="translate(0.5)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default DeleteIcon;