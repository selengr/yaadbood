import { Box, Button, styled } from '@mui/material';

import DotPulse from '@/components/atoms/DotSpinner/style';

export const ContinueButton = styled(Button)`
  flex: 1;
  padding: 11px 0;
  transition:
    opacity 0.3s ease,
    transform 0.2s ease;

  &:disabled {
    opacity: 0.5;
  }

  &:not(:disabled):hover {
    transform: translateY(-2px);
  }
`;

export const StyledDotPulse = styled(DotPulse)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&::before': { color: theme.palette.primary.main },
  '&::after': { color: theme.palette.primary.main }
}));

export const ForgotPasswordButton = styled(Button)`
  white-space: nowrap;
  flex: 1;
  padding: 11px 0;
  color: ${({ theme }) => theme.palette.primary.main};
  border-color: ${({ theme }) => theme.palette.primary.main};
  transition:
    opacity 0.3s ease,
    background-color 0.3s ease;

  &:disabled {
    opacity: 0.5;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.palette.primary.main};
    outline-offset: 2px;
  }
`;

export const StyledButton = styled(Button)`
  width: 100%;
  font-size: 16px;
  padding: 10px 0;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const DividerLine = styled(Box)`
  width: 90px;
  height: 2px;
  transform: rotate(180deg);
  background: ${({ theme }) =>
    theme.palette.mode === 'light'
      ? `linear-gradient(45deg, transparent, ${theme.palette.gray['200']}, transparent)`
      : `linear-gradient(45deg, white, transparent)`};
  will-change: auto;
`;
