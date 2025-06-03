import React from 'react';

interface PremiumIconProps {
  width?: number;
  height?: number;
}

const PremiumIcon: React.FC<PremiumIconProps> = ({ width = 24, height = 24 }) => {
  // The premium icon uses fixed colors as per design.
  const backgroundColor = "#FFA216";
  const pathFill = "white";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" fill={backgroundColor} />
      <path
        d="M14.5442 5H5C5.2021 5.99399 5.73949 6.88731 6.52128 7.52887C7.30308 8.17044 8.2813 8.52089 9.2905 8.52095H10.1661V19C11.0871 18.8161 11.9249 18.3393 12.5556 17.6399C13.1863 16.9406 13.5765 16.0558 13.6686 15.1164V8.52095H19C18.5944 6.5119 16.6625 5 14.5442 5Z"
        fill={pathFill}
      />
    </svg>
  );
};

export default PremiumIcon;