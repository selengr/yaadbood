import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface Edit2IconProps {
  width?: number;
  height?: number;
}

const Edit2Icon: React.FC<Edit2IconProps> = ({ width = 16, height = 16 }) => {
  const iconColor = useSelector((state: RootState) => state.iconColor.color);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.83958 2.4008L3.36624 8.19413C3.15958 8.41413 2.95958 8.84746 2.91958 9.14746L2.67291 11.3075C2.58624 12.0875 3.14624 12.6208 3.91958 12.4875L6.06624 12.1208C6.36624 12.0675 6.78624 11.8475 6.99291 11.6208L12.4662 5.82746C13.4129 4.82746 13.8396 3.68746 12.3662 2.29413C10.8996 0.914129 9.78624 1.4008 8.83958 2.4008Z"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.92578 3.36719C8.21245 5.20719 9.70578 6.61385 11.5591 6.80052"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 14.666H14"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Edit2Icon;