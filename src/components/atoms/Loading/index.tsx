import React from 'react';
//components
import { CircularProgress, CircularProgressProps, SxProps, Theme } from '@mui/material';
//styles
import { LoadingWrapper } from './Loading.style';

interface LoadingProps extends CircularProgressProps {
  wrapperSx?: SxProps<Theme>;
  type?: 'circle' | 'liner';
}

const Loading: React.FC<LoadingProps> = ({
  size = 40,
  thickness = 4,
  color = 'primary',
  wrapperSx,
  type = 'circle',
  variant = 'indeterminate',
  ...rest
}) => {
  const LadingTypes = {
    circle: <CircularProgress size={size} thickness={thickness} color={color} variant={variant} {...rest} />
  };

  return <LoadingWrapper sx={wrapperSx}>{LadingTypes[type as keyof typeof LadingTypes]}</LoadingWrapper>;
};

export default Loading;
