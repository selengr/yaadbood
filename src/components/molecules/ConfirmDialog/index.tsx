// @mui
import { SxProps } from '@mui/material';
// components
import { Modal } from '@/components/atoms';
import DotSpinner from '@/components/atoms/DotSpinner';
 // constants
 import { PROFILE } from '@/constants';
// style
import { 
  StyledContent,
  StyledModalContent,
  StyledCancelButton,
  StyledConfirmButton,
  StyledActionsContainer
 } from './confirmDialog.style';

// ----------------------------------------------------------------------

interface IProps {
  open: boolean;
  title?: string;
  cancelText?: string;
  submitText?: string;
  isLoading?: boolean;
  onClose: VoidFunction;
  cancelBtnStyle?: SxProps;
  submitBtnStyle?: SxProps;
  handleSubmit: VoidFunction;
  description?: React.ReactNode;
}

const ConfirmDialog = ({
  open,
  title,
  onClose,
  isLoading,
  cancelText = PROFILE.CONFIRM_DIALOG.CANCEL,
  submitText = PROFILE.CONFIRM_DIALOG.DELETE,
  description,
  handleSubmit,
  cancelBtnStyle,
  submitBtnStyle,
  ...props
}: IProps) => {

  return (
    <Modal open={open} onClose={onClose} title={title} >
      <StyledModalContent {...props}>
        <StyledContent>
          {description}
        </StyledContent>
        <StyledActionsContainer>
            
          <StyledCancelButton
            onClick={onClose}
            pill
            variant='text'
            sx={{ ...cancelBtnStyle }}>
            {cancelText}
          </StyledCancelButton>
          <StyledConfirmButton
            pill
            variant='contained'
            sx={{ ...submitBtnStyle }}
            disabled={isLoading}
            onClick={handleSubmit}>
            {isLoading ? <DotSpinner /> : submitText}
          </StyledConfirmButton>
        </StyledActionsContainer>
      </StyledModalContent>
    </Modal>
  );
};

export default ConfirmDialog;
