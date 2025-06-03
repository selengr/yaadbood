import { useRef, useState } from 'react';
import { Controller, ControllerRenderProps, UseFormReturn } from 'react-hook-form';
//constants
import { EDIT_INTRO_MODAL } from '@/constants';
//components
import { Confirmation } from '@/components/atoms';
import { RenderUsernameField } from '../';
//types
import { EditIntroForm } from '@/types/profile';

interface IProps {
  form: UseFormReturn<EditIntroForm>;
}

const UsernameField: React.FC<IProps> = ({ form }) => {
  const [disable, setDisable] = useState(true);
  const [confirmModal, setConfirmModal] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleConfirmEdit = () => {
    setConfirmModal(false);
    setDisable(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const renderUsernameField = ({ field }: { field: ControllerRenderProps<EditIntroForm, 'username'> }) => (
    <RenderUsernameField
      field={field}
      form={form}
      disable={disable}
      setConfirmModal={setConfirmModal}
      ref={inputRef}
    />
  );

  const handleCloseConfirmModal = () => {
    setConfirmModal(false);
  };

  return (
    <>
      <Controller control={form.control} name={EDIT_INTRO_MODAL.USERNAME.NAME} render={renderUsernameField} />
      <Confirmation
        open={confirmModal}
        title={EDIT_INTRO_MODAL.CONFIRM_MODAL.TITLE}
        description={EDIT_INTRO_MODAL.CONFIRM_MODAL.DESCRIPTION}
        submitText={EDIT_INTRO_MODAL.CONFIRM_MODAL.SUBMIT_TEXT}
        cancelText={EDIT_INTRO_MODAL.CONFIRM_MODAL.CANCEL_TEXT}
        handleClose={handleCloseConfirmModal}
        handleSubmit={handleConfirmEdit}
      />
    </>
  );
};

export default UsernameField;
