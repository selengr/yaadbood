// @mui
import { Dialog, Button, DialogTitle, DialogActions, DialogContent } from '@mui/material';
//
import { ConfirmDialogProps } from './types';

// ----------------------------------------------------------------------

export default function ConfirmDialog({
  title,
  content,
  action,
  open,
  onClose,
  cancelText,
  cancelStatus = true,
  ...other
}: ConfirmDialogProps) {
  return (
    <Dialog fullWidth dir="rtl" maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

      {content && <DialogContent sx={{ typography: 'body2' }}> {content} </DialogContent>}

      <DialogActions>
        {cancelStatus && (
          <Button variant="outlined" color="inherit" sx={{ ml: 2 }} onClick={onClose}>
            {cancelText ?? 'نه، منصرف شدم'}
          </Button>
        )}

        {action}
      </DialogActions>
    </Dialog>
  );
}

// <Dialog
// open={openDialog}
// dir="ltr"
// sx={{
//   overflow: 'hidden',
//   scrollbarWidth: 'none',
//   '& .MuiPaper-root': {
//     margin: '10px',
//     boxShadow: (theme) => theme?.customShadows?.dialog,
//   },
//   '& .MuiDialog-container': {
//     backdropFilter: 'blur(4px)',
//     backgroundColor: 'hsl(0deg 0% 100% / 50%)',
//   },
// }}
// >

// <DialogContent
//   dir="rtl"
//   sx={{
//     maxHeight: '75vh',
//     height: 'auto',
//     scrollbarWidth: 'none',
//     maxWidth: '100%',
//     width: '450px',
//     paddingX: 1,
//     paddingBottom: 1,
//     paddingTop: 0,
//   }}
// >

// </DialogContent>
// </Dialog>
