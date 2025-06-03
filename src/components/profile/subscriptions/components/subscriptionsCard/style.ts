import { Avatar, Box, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface IProps {
  isUndoing: boolean;
}

export const SubscriptionCardStyled = styled(Box)<IProps>(({ theme, isUndoing }) => ({
  padding: '8px 20px',
  [theme.breakpoints.down('sm')]: {
    padding: '8px'
  },
  display: 'flex',
  gap: 1,
  alignItems: 'center',
  borderBottom: '1px solid',
  borderColor: theme.palette.gray['100'],
  opacity: isUndoing ? 0.5 : 1,
  transition: 'opacity 0.3s ease-out'
}));

export const AvatarStyled = styled(Avatar)(({ theme }) => ({
  width: '72px',
  height: '72px',
  [theme.breakpoints.down('sm')]: {
    width: '48px',
    height: '48px'
  }
}));

export const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  textDecoration: 'none',
  gap: theme.spacing(2)
}));

export const UserInfoStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5)
}));

export const UserNameStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.gray['700'],
  fontSize: '16px',
  lineHeight: '24px'
}));

export const UserJobStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.gray['500'],
  fontSize: '12px',
  fontWeight: 400,
  lineHeight: '18px'
}));
