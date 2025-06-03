import { Box, styled } from '@mui/material';
export const DraggableBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    top: '100px',
    left: '25%'
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: '100vh'
  },
  height: '720px',
  minHeight: '320px',
  maxHeight: '100vh',
  userSelect: 'none',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '6px',
  position: 'relative',
  overflowY: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none'
}));

export const ResizeBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  justifyContent: 'flex-end',
  paddingRight: "20px",
}));

export const DraggableArea = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '30px',
  height: '30px',
  cursor: 'move'
}));

export const ResizeArea = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: '20px',
  height: '20px',
  cursor: 'se-resize',
  zIndex: 10
}));
