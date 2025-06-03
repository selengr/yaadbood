// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Typography } from '@mui/material';
// components
import { Icon } from '@/components/atoms';

// ----------------------------------------------------------------------

export const StyledProfileContainer = styled(Box)`
  display: flex;
  position: relative;
  flex-direction: column;
  overflow: hidden;
  ${({ theme }) => ({
    borderRadius: theme.breakpoints.up('md') ? '6px' : '0px',
    backgroundColor: theme.palette.neutrals.content
  })}
`;

export const StyledProfileContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: 20,
  paddingBottom: 8,
  paddingRight: 12,
  [theme.breakpoints.up('md')]: {
    paddingLeft: 20,
    paddingRight: 12,
    paddingBottom: 20,

  },
}));

export const StyledActionsContainer = styled(Box)`
  gap : 4px;
  display: flex;
  flex-direction: row;
  align-self: flex-end;
`;

export const StyledUserInfoContainer = styled(Box)(({ theme }) => ({
  gap: '0px',
  display: 'flex',
  flexDirection: 'column',
  marginTop: 30,
  [theme.breakpoints.up('md')]: {
    marginTop: 0, 
  },
}));

export const StyledUserName = styled(Typography)`
  font-size: 24px;
  font-weight: 500;
  white-space: wrap;
  word-break: break-word;
  color: ${({ theme }) => theme.palette.gray[900]};
`;

export const StyledJobTitle = styled(Typography)(({ theme }) => [
  {
    fontSize: '16px',
    fontWeight: '400',
    color: theme.palette.gray[600],
  },
  theme.applyStyles('dark', {
    color: theme.palette.gray[300],
  }),
]);

export const StyledLocationContainer = styled(Box)`
  gap: 4px;
  display: flex;
  align-items: center;
`;

export const StyledLocationText = styled(Typography)(({ theme }) => [
  {
  fontSize: 14,
  fontWeight: 400,
  color: theme.palette.gray[500],
  [theme.breakpoints.up('md')]: {
    fontWeight: 325,
  },
  },
  theme.applyStyles('dark', {
    color: theme.palette.gray[400],
  }),
]);

export const StyledIcon = styled(Icon)(({ theme }) => ({
  '* svg' : {
    width: 20,
    height: 20,
    [theme.breakpoints.up('md')]: {
      width: 24,
      height: 24
    }
  }
}));

export const StyledWebsiteLink = styled(Link)`
  gap: 4px;
  display: flex;
  cursor: pointer;
  align-items: center;
  text-decoration: none;
`;

export const StyledWebsiteText = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: '14px',
  marginTop: '4px',
  lineHeight: '18px',
  whiteSpace: 'wrap',
  wordBreak: 'break-word',
  color: theme.palette.primary[500],
}));

export const StyledSubscribersLink = styled(Link)(({ theme }) => ({
  marginTop: 4,
  fontWeight: 400,
  textDecoration: 'none',
  color: theme.palette.primary[500],
  fontSize: 12,
  [theme.breakpoints.up('md')]: {
    fontSize: 14, 
  },
}));

export const StyledUserActionsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1), 
  marginTop: theme.spacing(2) 
}));