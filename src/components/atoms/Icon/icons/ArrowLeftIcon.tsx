import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface ArrowLeftProps {
  width?: number;
  height?: number;
}

const ArrowLeft: React.FC<ArrowLeftProps> = ({ width = 24, height = 24 }) => {
  const iconColor = useSelector((state: RootState) => state.iconColor.color); 

  return (
    <svg  viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.9998 20.4201L8.47984 13.9001C7.70984 13.1301 7.70984 11.8701 8.47984 11.1001L14.9998 4.58008"  strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

    
  );
};

export default ArrowLeft;