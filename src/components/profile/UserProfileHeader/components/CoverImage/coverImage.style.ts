// @mui
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import {Button} from '@/components/atoms';

export const StyledClickableBanner = styled(Box)(({ theme }) => ({
  width: '100%',
  maxHeight : 170,
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  aspectRatio: '375/93',
  [theme.breakpoints.up('md')]: {
    aspectRatio: '800/170'
  }
}));

export const CaptureButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  width: '32px !important',
  minHeight: '32px !important',
  padding: '0px',
  top: '12px',
  right: '12px',
  background: theme.palette.common.black,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9,
  borderRadius: '50%',
  '&:hover': {
    background: theme.palette.grey[900],
    transform: 'scale(1.05)'
  },
  transition: 'all 0.2s ease-in-out'
}));

export const StyledPreviewContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'red',
  [theme.breakpoints.up('xs')]: {
    width: '100%',
    height:  'calc(100dvh - 80px)'
  },
  [theme.breakpoints.up('md')]: {
    width: '768px',
    height: 'auto',
  },
  [theme.breakpoints.up('lg')]: {
    width: '1080px'
  }
}));

export const StyledImageContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  aspectRatio: '800/170'
});