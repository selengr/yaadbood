import { styled } from '@mui/material/styles';
import { Box, Typography, Button, Link, Avatar } from '@mui/material';

interface StyledFriendItemProps {
  isUndoing?: boolean;
}

export const StyledFriendItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isUndoing'
})<StyledFriendItemProps>(({ theme, isUndoing }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    alignItems: 'center',
    opacity: isUndoing ? 0.5 : 1,
    transition: 'opacity 0.3s ease-out',
    padding: theme.breakpoints.up('sm') ? '8px 16px' : '8px',
    paddingTop : "16px",
    [theme.breakpoints.down('md')]: {
        marginBottom : "16px",
        borderTop: '1px solid',
        borderColor: theme.palette.gray['100'],
    }
}));

export const StyledUserLink = styled(Link)({
  display: 'flex',
  textDecoration: 'none',
  flexDirection: 'column',
});

export const StyledUserName = styled(Typography)(({ theme }) => ({
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
    color: theme.palette.gray['700'],
}));

export const StyledUserJob = styled(Typography)(({ theme }) => ({
    fontSize: '12px',
    fontWeight: 325,
    lineHeight: '18px',
    color: theme.palette.gray['500'],
}));

export const StyledActionsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginLeft: 'auto',
  alignSelf: 'center',
  alignItems: 'center',
//   gap: theme.breakpoints.up('sm') ? theme.spacing(1) : 0,
}));

export const StyledActionButton = styled(Button)(({ theme }) => ({
  height: '20px',
  fontSize: '10px',
  minHeight: '20px',
  lineHeight: '15px',
  borderRadius: '35px',
  padding: '2.5px 8.5px',
  paddingTop: '6px',
  border: '1px solid #e2e8f0',
  backgroundColor: 'transparent',
  color: theme.palette.gray['500'],
  '&:hover': {
    borderColor: theme.palette.gray['300']
  }
}));

export const StyledAvatar = styled(Avatar)({
  width: '48px',
  height: '48px'
});



export const StyledOnlineBadge = styled(Box)(({ theme }) => ({
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "14px",
    height: "14px",
    backgroundColor: theme.palette.green[500],
    borderRadius: "50%",
    border: "2px solid white",
    zIndex: 9999999,
  }))
  
