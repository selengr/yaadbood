import { useRef, Dispatch, SetStateAction } from 'react';
import { Box } from '@mui/material';
// constants
import { PROFILE } from '@/constants';
// components
import { Modal } from '@/components/atoms';
// style
import {
  StyledButton,
  StyledTitleText,
  HiddenFileInput,
  StyledSubtitleText,
  StyledModalContainer,
  StyledButtonContainer
} from './addbackgroundModal.style';

export interface IProps {
  open: boolean;
  onClose: VoidFunction;
  setImage: Dispatch<SetStateAction<string>>;
}
const AddbackgroundModal: React.FC<IProps> = ({ open, onClose, setImage }) => {
  const { TITLE, SUB_TITLE, EDIT, HEADER } = PROFILE.ADD_BACKGROUND.MODAL;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
          onClose();
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      <Modal open={open} onClose={onClose} title={TITLE}>
        <StyledModalContainer>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <StyledTitleText>{HEADER} </StyledTitleText>
          </Box>
          <StyledSubtitleText>{SUB_TITLE}</StyledSubtitleText>
        </StyledModalContainer>
        <StyledButtonContainer>
          <StyledButton pill onClick={() => fileInputRef.current?.click()}>
            {EDIT}
          </StyledButton>

          <HiddenFileInput type='file' accept='image/jpeg, image/png, image/gif' ref={fileInputRef} onChange={handleFileChange} />
        </StyledButtonContainer>
      </Modal>
    </>
  );
};

export default AddbackgroundModal;
