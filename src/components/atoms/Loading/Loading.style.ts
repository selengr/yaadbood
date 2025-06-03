import { Box, styled } from '@mui/material';
import { ElementType } from 'react';

interface LoadingWrapperProps {
  component?: ElementType;
}

export const LoadingWrapper = styled(Box)<LoadingWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
`;
