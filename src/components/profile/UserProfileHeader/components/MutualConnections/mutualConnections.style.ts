// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const StyledMutualFriendsContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer'
});

export const StyledFriendAvatarWrapper = styled(Box)(({ theme }) => ({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: theme.palette.neutrals.content,
  marginLeft: '-10px',
  '&:first-of-type': {
    marginLeft: 0
  }
}));

export const StyledMutualFriendsText = styled(Typography)(({ theme }) => ({
  color: theme.palette.gray[500],
  paddingLeft: '8px',
  paddingRight: '8px',
  'span' : {
    fontWeight : 325,
  },
  fontWeight: 400,
  fontSize: 12,
  [theme.breakpoints.up('md')]: {
    fontSize: 14, 
  },
}));