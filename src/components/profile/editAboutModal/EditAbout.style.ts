import { styled } from '@mui/material';
//components
import { Button } from '@/components/atoms';

export const EditButtonStyle = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

export const EditAboutStackContainer = styled('div')<{ component?: React.ElementType }>`
  width: 100%;
  @media (min-width: 768px) {
    width: 672px;
  }
`;
