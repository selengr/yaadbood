import { Box, IconButton, Popover, styled } from '@mui/material';

export const IconButtonStyled = styled(IconButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: start;
  flex-shrink: 0;
  p: 0.5;
`;

export const PopoverStyled = styled(Popover)`
  & .MuiPaper-rounded {
    border-radius: 6px;
    box-shadow: 0px 16px 24px 0px #94a3b83d;
  }
`;

export const PopoverItemStyled = styled(Box)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 'medium',
  cursor: 'pointer',
  color: theme.palette.gray[600],
  width: '120px',
  display: 'flex',
  alignItems: 'center',
  padding: '0px 16px',
  height: '40px',
  minHeight: '40px'
}));
