'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import yup from '@/lib/validation/yupConfig';
//hooks
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateProfile } from '@/hooks/user/useUpdateProfile';
import { useSession } from 'next-auth/react';
import { EDIT_ABOUT } from '@/constants';
//components
import { Icon, Modal } from '@/components/atoms';
import { SaveButton, MaxCharacter, CustomTextField } from './components';
//types
import { descriptionSchema } from '@/types/profile';
//styles
import { EditAboutStackContainer, EditButtonStyle } from './EditAbout.style';
import { UserState } from '@/types/auth';

type DescriptionFormValues = yup.InferType<typeof descriptionSchema>;

interface IProps {
  userData: UserState | undefined;
}

const EditDescription: React.FC<IProps> = ({ userData }) => {
  const [open, setOpen] = useState(false);

  const form = useForm<DescriptionFormValues>({
    resolver: yupResolver(descriptionSchema),
    mode: 'onChange',
    defaultValues: {
      description: userData?.description || ''
    }
  });

  const altInput = form.watch('description');

  const updateUserInfo = useUpdateProfile({
    onSuccess: async () => {
      setOpen(false);
    }
  });

  const onSubmit = (data: DescriptionFormValues) => {
    updateUserInfo.mutate(data);
  };

  const handleOnClick = () => {
    setOpen(true);
  };

  const isDisabledSaveButton = !form.formState.isValid || updateUserInfo.isPending;

  return (
    <>
      <EditButtonStyle icon variant='text' onClick={handleOnClick}>
        <Icon name='edit' w={24} h={24} />
      </EditButtonStyle>
      <Modal open={open} onClose={() => setOpen(false)} title={EDIT_ABOUT.TITLE}>
        <EditAboutStackContainer component='form' onSubmit={form.handleSubmit(onSubmit)}>
          <CustomTextField form={form} />
          <MaxCharacter altInput={altInput} />
          <SaveButton
            isDisabled={isDisabledSaveButton}
            handleOnClick={form.handleSubmit(onSubmit)}
            isPending={updateUserInfo.isPending}
          />
        </EditAboutStackContainer>
      </Modal>
    </>
  );
};

export default EditDescription;
