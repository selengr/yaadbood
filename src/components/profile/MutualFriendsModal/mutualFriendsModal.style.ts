import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledModalContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    minHeight : 400,
    overflowY : "scroll",
    flexDirection: 'column',
    maxHeight : "500px !important",
  [theme.breakpoints.up('md')]: {
    width: '744px'
  }
}));