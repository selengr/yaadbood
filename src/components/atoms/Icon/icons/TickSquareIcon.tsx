import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface TickSquareIconProps {
  width?: number;
  height?: number;
}

const TickSquareIcon: React.FC<TickSquareIconProps> = ({ width = 20, height = 20 }) => {
  const iconColor = useSelector((state: RootState) => state.iconColor.color) || "#1DA1F3";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.493 1.66699H6.50964C3.4763 1.66699 1.66797 3.47533 1.66797 6.50866V13.4837C1.66797 16.5253 3.4763 18.3337 6.50964 18.3337H13.4846C16.518 18.3337 18.3263 16.5253 18.3263 13.492V6.50866C18.3346 3.47533 16.5263 1.66699 13.493 1.66699ZM13.9846 8.08366L9.25963 12.8087C9.14297 12.9253 8.98464 12.992 8.81797 12.992C8.6513 12.992 8.49297 12.9253 8.3763 12.8087L6.01797 10.4503C5.7763 10.2087 5.7763 9.80866 6.01797 9.56699C6.25963 9.32533 6.65964 9.32533 6.9013 9.56699L8.81797 11.4837L13.1013 7.20033C13.343 6.95866 13.743 6.95866 13.9846 7.20033C14.2263 7.44199 14.2263 7.83366 13.9846 8.08366Z"
        fill={iconColor}
      />
    </svg>
  );
};

export default TickSquareIcon;