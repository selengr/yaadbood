import React from "react";

const DashedBorderSVG: React.FC = () => {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 100 40"
    preserveAspectRatio="none"
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
    }}
  >
    <rect
      x="1"
      y="1"
      width="calc(100% - 2px)"
      height="calc(100% - 2px)"
      rx="8"
      ry="8"
      fill="transparent"
      stroke="#CBD5E1BF"
      strokeWidth="1.5"
      strokeDasharray="10,7"  
      strokeLinecap="round" 
    />
  </svg>
  );
};

export default DashedBorderSVG;
