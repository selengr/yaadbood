import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// components
import { Button } from '@/components/atoms';

export const StyledButtonContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledShowAllButton = styled(Button)({
  marginTop: '8px',
  alignItems: 'center',
  gap: '0px',
  height: '30px',
  minHeight: '30px',
  whiteSpace: 'nowrap',
  width: 'fit-content',
  display: 'inline-flex',
  lineHeight: '10px'
});

export const StyledShowAllText = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  color: theme.palette.gray[700],
  fontSize: '12px',
  fontWeight: '500',
  whiteSpace: 'nowrap',
  '& svg': {
    width: '16px',
    height: '16px',
    stroke: `${theme.palette.gray[500]} !important`
  },
  variant: 'caption'
}));