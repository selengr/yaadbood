import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const AvatarContainer = styled(Box)(({ theme }) => ({
  width: '120px',
  height: '120px',
  cursor: 'pointer',
  overflow: 'hidden',
  marginTop: '-45px',
  border: '4px solid',
  borderRadius: '100%',
  position: 'relative',
  marginBottom: '-70px',
  borderColor: theme.palette.neutrals.content,

  [theme.breakpoints.up('md')]: {
    width: '136px',
    height: '136px',
    marginLeft: '8px',
    marginTop: '-105px',
    marginBottom: '-32px',
  }
}));