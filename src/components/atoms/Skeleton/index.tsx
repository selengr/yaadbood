import React from 'react';
//components
import { Skeleton as MuiSkeleton, SkeletonProps as MuiSkeletonProps } from '@mui/material';

export interface SkeletonProps extends MuiSkeletonProps {
  isLoading?: boolean;
  children?: React.ReactNode;
}

const Skeleton: React.FC<SkeletonProps> = ({
  isLoading = false,
  variant = 'text',
  width,
  height,
  animation = 'pulse',
  sx,
  children,
  ...rest
}) => {
  if (!isLoading && children) return <>{children}</>;

  return (
    <MuiSkeleton variant={variant} width={width} height={height} animation={animation} sx={sx} {...rest} />
  );
};

export default Skeleton;
