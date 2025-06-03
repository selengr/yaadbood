// @mui
import { Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import { DotSpinner } from '@/components/atoms';

const StyledBaseFollowButton = styled(Button)(({ theme }) => ({
  disPlay : "flex",
  justifyContent : "center",
  alignItems : "center",
  height: '28px',
  fontWeight: 400,
  fontSize: '14px',
  minHeight: '28px',
  maxHeight: '28px',
  borderRadius: '35px',
  padding: '2.5px 15px',
  paddingTop: '5px',
  border: `1px solid ${theme.palette.gray[200]}`,
  textTransform: 'none',
  transition: theme.transitions.create(['background-color', 'border-color'], {
    duration: theme.transitions.duration.short
  })
}));

export const StyledSubscribedButton = styled(StyledBaseFollowButton)(({ theme }) => ({
  color: theme.palette.primary[500],
  borderColor: theme.palette.primary[500],
  '&:hover': {
    backgroundColor: theme.palette.primary[50],
    borderColor: theme.palette.primary[600]
  },
  '&:disabled': {
    color: theme.palette.primary[300],
    borderColor: theme.palette.primary[300]
  }
}));

export const StyledSubscribeButton = styled(StyledBaseFollowButton)(({ theme }) => ({
  color: theme.palette.neutrals.content,
  backgroundColor: theme.palette.primary[500],
  '&:hover': {
    backgroundColor: theme.palette.primary[600]
  },
  '&:disabled': {
    backgroundColor: theme.palette.primary[300]
  }
}));

export const StyledLoadingContainer = styled(Box)({
  padding: '2.5px 28px'
});

export const StyledDotSpinner = styled(DotSpinner)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&::before, &::after': {
    color: theme.palette.primary.main
  }
}));