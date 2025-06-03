import { Box, SwipeableDrawer, useTheme } from '@mui/material';

import { IModalProps } from '../Modal/Modal.interface';

const Drawer = ({
  open,
  children,
  backgroundColor = 'background.paper',
  onClose,
  sx,
  fullScreenOnMobile = false // New Prop
}: IModalProps) => {
  const theme = useTheme();

  return (
    <SwipeableDrawer
      sx={{
        ...sx
      }}
      PaperProps={{
        sx: {
          backgroundColor: 'transparent',
          padding: fullScreenOnMobile ? 0 : theme.spacing(2),
          boxShadow: 'none',
          backgroundImage: 'none'
        }
      }}
      anchor='bottom'
      onClose={() => onClose?.()}
      onOpen={() => {}}
      open={open}>
      <Box
        sx={{
          backgroundColor: backgroundColor
            ? backgroundColor
            : theme.palette.mode === 'light'
              ? '#fff'
              : '#10161F',
          padding: fullScreenOnMobile
            ? theme.spacing(1.5)
            : `${theme.spacing(1.5)} ${theme.spacing(2)} ${theme.spacing(2)} ${theme.spacing(2)}`,
          borderRadius: fullScreenOnMobile ? 0 : theme.shape.roundedXl, // No border radius in full screen
          minHeight: fullScreenOnMobile ? '100dvh' : 'auto' // Full screen height
        }}>
        {children}
      </Box>
    </SwipeableDrawer>
  );
};

export default Drawer;
