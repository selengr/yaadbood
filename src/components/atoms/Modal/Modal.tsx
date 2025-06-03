import { Box, Dialog as MUIModal, IconButton, Stack, SwipeableDrawer, useTheme } from '@mui/material';

import { IModalProps } from './Modal.interface';
import useModal from './useModal';
import ArrowLeft from '../Icon/icons/ArrowLeftIcon';
import CloseIcon from '../Icon/icons/CloseIcon';

const Modal = ({
  open,
  children,
  title,
  backgroundColor = 'background.paper',
  noClickOutside,
  onClose,
  onBack,
  sx,
  fullScreenOnMobile = false // New Prop
}: IModalProps) => {
  const { isMobile } = useModal();
  const theme = useTheme();

  const renderChild = () => (
    <>
      {title && (
        <Stack
          id='modal-header'
          sx={{
            position: 'sticky',
            top: 0,
            backgroundColor,
            zIndex: 1
          }}
          flexDirection={'row'}
          gap={1}
          alignItems={'center'}
          marginBottom={theme.spacing(3)}>
          {onBack && (
            <IconButton
              onClick={onBack}
              sx={{
                p: 0.5,
                mb: '3px',
                svg: {
                  width: '20px',
                  height: '20px',
                  // stroke : '#fff',
                  stroke: theme.palette.mode === 'dark' ? '#fff' : theme.palette.gray[700]
                }
              }}>
              <ArrowLeft />
            </IconButton>
          )}

          <Box
            flex={1}
            sx={{
              color:
                backgroundColor === 'black'
                  ? theme.palette.neutrals.content
                  : theme.palette.mode === 'light'
                    ? theme.palette.gray['700']
                    : '#fff',
              fontWeight: '600',
              fontSize: '20px'
            }}>
            {title}
          </Box>

          {onClose && (
            <IconButton
              sx={{
                p: 0.25,
                svg: {
                  width: '20px',
                  height: '20px',
                  stroke:
                    backgroundColor === 'black' ? theme.palette.neutrals.content : theme.palette.gray[700]
                }
              }}
              onClick={onClose}>
              <CloseIcon />
            </IconButton>
          )}
        </Stack>
      )}
      {children}
    </>
  );

  return isMobile ? (
    <SwipeableDrawer
      anchor='bottom'
      open={open}
      onClose={
        noClickOutside
          ? () => {}
          : (event: React.SyntheticEvent) => {
              if (onClose) onClose();
            }
      }
      onOpen={() => {}}
      disableSwipeToOpen={noClickOutside}
      ModalProps={{
        keepMounted: true,
        onBackdropClick: noClickOutside ? undefined : onClose
      }}
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
      }}>
      <Box
        sx={{
          backgroundColor: backgroundColor
            ? backgroundColor
            : theme.palette.mode === 'light'
              ? '#fff'
              : '#10161F',
          padding: fullScreenOnMobile
            ? theme.spacing(2)
            : `${theme.spacing(1.5)} ${theme.spacing(2)} ${theme.spacing(2)} ${theme.spacing(2)}`,
          borderRadius: fullScreenOnMobile ? 0 : theme.shape.roundedXl, // No border radius in full screen
          minHeight: fullScreenOnMobile ? '100dvh' : 'auto' // Full screen height
        }}>
        {renderChild()}
      </Box>
    </SwipeableDrawer>
  ) : (
    <MUIModal
      maxWidth='xl'
      open={open}
      onClose={
        noClickOutside
          ? () => {}
          : (event: React.SyntheticEvent) => {
              if (onClose) onClose();
            }
      }
      sx={{
        '& .MuiDialog-paper': {
          padding: { xs: theme.spacing(1), sm: theme.spacing(3) },
          borderRadius: theme.shape.roundedXs,
          backgroundColor: 'transparent',
          boxShadow: 'none',
          backgroundImage: 'none',
          '&::-webkit-scrollbar': {
            width: '5px',
            marginRight: '5px'
          },
          '&::-webkit-scrollbar-track': {
            background: theme.palette.grey[200]
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme.palette.grey[400]
          }
        },
        ...sx
      }}>
      <Box
        sx={{
          backgroundColor: backgroundColor
            ? backgroundColor
            : theme.palette.mode === 'light'
              ? '#fff'
              : '#10161F',
          padding: fullScreenOnMobile
            ? theme.spacing(3)
            : `${theme.spacing(1.5)} ${theme.spacing(2)} ${theme.spacing(2)} ${theme.spacing(2)}`,
          borderRadius: theme.shape.roundedXl // No border radius in full screen
          // minHeight: fullScreenOnMobile ? '100dvh' : 'auto' // Full screen height
        }}>
        {renderChild()}
      </Box>
    </MUIModal>
  );
};

export default Modal;
