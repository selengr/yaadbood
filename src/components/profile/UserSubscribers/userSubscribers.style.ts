import { styled } from '@mui/material/styles';
import { Box, Typography, Link, Avatar } from '@mui/material';
import { Button, DotPulse } from '@/components/atoms';


export const StyledContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column'
});

export const StyledMainContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
});

export const StyledLoadingContainer = styled(Box)({
  padding: '20px',
  display: 'flex',
  justifyContent: 'center'
});

export const StyledDotPulse = styled(DotPulse)(({ theme }) => ({
    color: theme.palette.primary.main,
    '&::before': {
      color: theme.palette.primary.main
    },
    '&::after': {
      color: theme.palette.primary.main
    }
  }));

  export const StyledUserAvatar = styled(Avatar)(({ theme }) => ({
    width: '48px',
    height: '48px',
    [theme.breakpoints.up('sm')]: {
      width: '72px',
      height: '72px'
    }
  }));
  
export const StyledFollowingItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isUndoing'
})<{ isUndoing?: boolean }>(({ theme, isUndoing }) => ({
  padding: theme.breakpoints.up('sm') ? '8px 20px' : '8px',
  display: 'flex',
  gap: theme.spacing(1),
  alignItems: 'center',
  borderBottom: '1px solid',
  borderColor: theme.palette.gray['100'],
  opacity: isUndoing ? 0.5 : 1,
  transition: 'opacity 0.3s ease-out'
}));

export const StyledUserInfoContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  textDecoration: 'none'
});

export const StyledUserNameLink = styled(Link)(({ theme }) => ({
  color: theme.palette.gray['700'],
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: '24px',
  textDecoration: 'none'
}));

export const StyledUserJob = styled(Typography)(({ theme }) => ({
  color: theme.palette.gray['500'],
  fontSize: '12px',
  fontWeight: 400,
  lineHeight: '18px'
}));

export const StyledMutualConnectionsContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '10px',
  cursor: 'pointer'
});

export const StyledMutualAvatarWrapper = styled(Box)(({ theme }) => ({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: theme.palette.neutrals.content,
  marginLeft: '-10px'
}));

export const StyledMutualAvatar = styled(Avatar)({
  width: '25px',
  height: '25px'
});

export const StyledMutualCountText = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: theme.palette.gray['500'],
  paddingLeft: '8px',
  paddingRight: '8px'
}));

export const StyledActionsContainer = styled(Box)(({ theme }) => ({
  marginLeft: 'auto',
  alignSelf: 'center',
  justifySelf: 'center',
  display: 'flex',
  gap: theme.breakpoints.up('sm') ? theme.spacing(1) : 0,
  alignItems: 'center'
}));

export const StyledViewProfileLink = styled(Link)(({ theme }) => ({
  whiteSpace: 'nowrap',
  textDecoration: 'none',
  border: '1px solid #e2e8f0',
  borderRadius: '35px',
  fontSize: '10px',
  color: theme.palette.gray['500'],
  lineHeight: '10px',
  padding: '2.5px 9.5px',
  backgroundColor: 'transparent',
  height: '25px',
  minHeight: '25px',
  display: 'none',
  alignItems: 'center',
  marginLeft: 'auto',
  fontWeight: '500',
  [theme.breakpoints.up('sm')]: {
    display: 'flex'
  }
}));

export const StyledSubscribeButton = styled(Button)(({ theme }) => ({
  border: '1px solid #e2e8f0',
  borderRadius: '35px',
  fontSize: '10px',
  fontWeight: 500,
  color: theme.palette.gray['500'],
  lineHeight: '10px',
  padding: '2.5px 9.5px',
  backgroundColor: 'transparent',
  height: '25px',
  minHeight: '25px'
}));

export const StyledUndoButton = styled(Button)(({ theme }) => ({
    width: '100%',
    border: '1px solid',
    borderColor: theme.palette.gray['200'],
    borderRadius: '6px',
    fontSize: '12px',
    color: '#ffffff',
    lineHeight: '15px',
    padding: '2.5px 7px',
    backgroundColor: theme.palette.primary.main,
    height: '25px',
    fontWeight: 500,
    minHeight: '25px',
    '&:hover': {
      border: '1px solid',
      borderColor: theme.palette.gray['200'],
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: 500,
      color: '#ffffff',
      lineHeight: '15px',
      padding: '2.5px 7px',
      backgroundColor: theme.palette.primary.main,
      height: '25px',
      minHeight: '25px'
    },
    [theme.breakpoints.up('lg')]: {
      width: 'auto',
      borderRadius: '36px',
      color: theme.palette.primary.main,
      backgroundColor: 'transparent',
      '&:hover': {
        borderRadius: '36px',
        color: theme.palette.primary.main,
        backgroundColor: 'transparent'
      }
    }
  }));