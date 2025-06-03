import { Box, SxProps, Typography } from '@mui/material';
import { icons, IconsListType } from './iconLists';
import { useIconColor } from './IconColorContext'; // Import the custom hook
import React from 'react';

interface IntProps {
  name: IconsListType;
  w?: number;
  h?: number;
  style?: SxProps;
  view?: string;
  text?: string;
  textColor?: string;
  iconClassName?: string;
  textClassName?: string;
  iconStyle?: SxProps;
}

const Icon = ({
  name,
  w,
  h,
  style,
  view,
  text,
  textColor,
  iconClassName,
  textClassName,
  iconStyle
}: IntProps) => {
  const { iconColor } = useIconColor(); // Use the global icon color

  return (
    <div style={{ display: 'flex' }}>
      <Box
        className={iconClassName ? iconClassName : ''}
        sx={{
          width: w ? `${w}px` : 'auto',
          height: h ? `${h}px` : 'auto',
          display: view === 'block' || !view ? '' : view,
          ...iconStyle
        }}>
        {React.cloneElement(icons[name], { fill: iconColor })}
      </Box>
      {text ? (
        <Typography className={textClassName ? textClassName : ''} color={textColor} fontSize={12} sx={style}>
          {text}
        </Typography>
      ) : null}
    </div>
  );
};

export default Icon;
