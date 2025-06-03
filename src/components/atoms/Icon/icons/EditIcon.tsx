import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface EditIconProps {
  width?: number;
  height?: number;
}

const EditIcon: React.FC<EditIconProps> = ({ width = 24, height = 24 }) => {
  const iconColor = useSelector((state: RootState) => state.iconColor.color);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.13 2.86055C20.5706 2.31983 19.823 2.01758 19.045 2.01758C18.267 2.01758 17.5194 2.31983 16.96 2.86055L3.96 15.8605L2 22.0005L8.19 20.0005L21.13 7.00055C21.6678 6.44163 21.9682 5.69616 21.9682 4.92055C21.9682 4.14494 21.6678 3.39947 21.13 2.84055V2.86055ZM6.77 18.5705L5.42 17.2305L16.64 6.00055L18 7.35055L6.77 18.5705Z"
        fill={iconColor}
      />
    </svg>
  );
};

export default EditIcon;