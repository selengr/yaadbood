import { styled } from '@mui/material';
//components
import { Button } from '@/components/atoms';

export const SaveButtonStyle = styled(Button)(({ theme }) => ({
  marginTop: '32px',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    marginTop: '24px'
  }
}));
