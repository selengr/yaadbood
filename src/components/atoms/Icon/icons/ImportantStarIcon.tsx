import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface ImportantStarIconProps {
  width?: number;
  height?: number;
}

const ImportantStarIcon: React.FC<ImportantStarIconProps> = ({ width = 8, height = 7 }) => {
  const iconColor = useSelector((state: RootState) => state.iconColor.color);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 8 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.44 1.576C4.44 1.992 4.41333 2.44 4.36 2.92C4.89333 2.70667 5.30933 2.54667 5.608 2.44L6.984 1.992L7.384 3.224L6.008 3.672C5.73067 3.75733 5.544 3.81067 5.448 3.832C5.21333 3.88533 4.968 3.944 4.712 4.008C5.10667 4.46667 5.38933 4.81333 5.56 5.048L6.424 6.248L5.368 7L4.52 5.8C4.36 5.576 4.232 5.38933 4.136 5.24C4.05067 5.09067 3.93867 4.904 3.8 4.68C3.74667 4.76533 3.592 5.01067 3.336 5.416L3.064 5.8L2.216 7L1.176 6.248L2.024 5.048C2.184 4.824 2.46667 4.47733 2.872 4.008C2.73333 3.976 2.58933 3.944 2.44 3.912C2.29067 3.88 2.14133 3.84267 1.992 3.8C1.85333 3.75733 1.71467 3.71467 1.576 3.672L0.216 3.224L0.616 1.992L1.976 2.44C2.328 2.55733 2.744 2.71733 3.224 2.92L3.192 2.488C3.16 2.06133 3.144 1.75733 3.144 1.576V0.12H4.44V1.576Z"
        fill={iconColor || "#FF2661"}
      />
    </svg>
  );
};

export default ImportantStarIcon;