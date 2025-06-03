import { Button, styled } from '@mui/material';

export const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => (size === 'small' ? '100px' : size === 'large' ? '200px' : '150px')};
  gap: ${({ theme }) => theme.spacing(1)};
`;
