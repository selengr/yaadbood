import { Box, Typography, useTheme } from '@mui/material';

import Button from '../Button/Button';
import DotPulse from '../DotSpinner/style';
import Modal from '../Modal/Modal';

interface IConfirmation {
  handleClose: () => void;
  handleSubmit: () => void;
  open: boolean;
  title: string;
  description: string;
  cancelText: string;
  submitText: string;
  loading?: boolean;
  confirmBtnColor?: string;
  cancelBtnColor?: string;
  additionalStyles?: object;
}

const Confirmation = ({
  handleClose,
  handleSubmit,
  open,
  title,
  description,
  cancelText,
  submitText,
  loading = false,
  confirmBtnColor = 'primary.500',
  cancelBtnColor = 'primary.500',
  additionalStyles
}: IConfirmation) => {
  const theme = useTheme();

  return (
    <Modal open={open} onClose={handleClose} title={title}>
      <Box
        sx={{
          width: { xs: '100%', md: '372px' },
          backgroundColor: theme.palette.mode === 'light' ? '#fff' : 'transparent',
          color: theme.palette.mode === 'light' ? theme.palette.gray['600'] : theme.palette.gray['300'],
          ...additionalStyles
        }}>
        <Typography
          sx={(theme) => ({
            color: {
              xs: theme.palette.mode === 'light' ? theme.palette.gray['600'] : theme.palette.gray['300']
            },
            lineHeight: { xs: '21px', md: '24px' },
            fontSize: { xs: '14px', md: '16px' }
          })}>
          {description}
        </Typography>
        <Box
          sx={{
            height: '64px',
            display: 'flex',
            mt: '0px',
            gap: '10px',
            justifyContent: 'flex-end',
            alignItems: 'end'
          }}>
          <Button
            sx={{ fontSize: '12px', minHeight: '32px', maxHeight: '32px', height: '32px', fontWeight: '500' }}
            onClick={handleClose}
            pill
            variant='text'
            color={cancelBtnColor}
            disabled={loading}>
            {cancelText}
          </Button>
          <Button
            sx={{ fontSize: '12px', minHeight: '32px', maxHeight: '32px', height: '32px', fontWeight: '500' }}
            color={confirmBtnColor}
            onClick={handleSubmit}
            pill
            disabled={loading}>
            {loading ? (
              <Box sx={{ padding: '8px 16px ' }}>
                <DotPulse />
              </Box>
            ) : (
              submitText
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default Confirmation;
