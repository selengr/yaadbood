// @mui
import { styled } from '@mui/material/styles';
import { Box, IconButton, Popover } from '@mui/material';

export const StyledIconButton = styled(IconButton)`
  flex-shrink: 0;
  aspect-ratio: 1/1;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-style: solid;
`;

export const StyledPopover = styled(Popover)(({ theme }) => ({
  '& .MuiPaper-rounded': {
    borderRadius: '6px',
    boxShadow: '0px 16px 24px 0px #94A3B83D'
  }
}));

export const StyledPopoverPaper = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  align-items: center;
  border-radius: 8px;
  margin-top: 16px;
`;

export const StyledPopoverItem = styled(Box)(({ theme }) => ({
  fontSize: '14px',
  cursor: 'pointer',
  color: theme.palette.gray['600'],
  width: '220px',
  height: '52px',
  display: 'flex',
  alignItems: 'center',
  padding: '12px',
  fontWeight: 500
}));