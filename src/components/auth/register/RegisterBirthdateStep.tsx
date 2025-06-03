'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, Typography } from '@mui/material';
import { Resolver, useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

import Button from '@/components/atoms/Button/Button';
import DateTimePicker from '@/components/atoms/DateTimePicker';
import Input from '@/components/atoms/Input';
import { GENERAL_MESSAGES } from '@/constants';
import { AUTH_MESSAGES } from '@/constants/auth';
import { userInfoSchema as registerBirthdateSchema } from '@/lib/validation/auth';
import { AuthSteps, IAuthStepProps } from '@/types/auth';
import { useUpdateProfile } from '@/hooks/auth/useUpdateProfile';
import { useRef } from 'react';

type RegisterBirthdateForm = {
  first_name: string;
  last_name: string;
  birth_date: string;
};

const RegisterBirthdateStep = ({ userData, onSubmit }: IAuthStepProps) => {
  const { data: session, update } = useSession();
  const formDataRef = useRef<RegisterBirthdateForm | null>(null);

  const updateProfile = useUpdateProfile({
    onSuccess: () => {
      onSubmit({ ...userData }, AuthSteps.location, true);
      const data = formDataRef.current; // 👈 Use stored data here
      if (!data) return;
      update({
        ...session?.user,
        firstName: data.first_name,
        lastName: data.last_name,
        dateOfBirth: data.birth_date || '1926-01-01'
      })
      toast.success(AUTH_MESSAGES.GENERAL.INFO_SUBMITTED_SUCCESS);

    },
    onError: (error) => toast.error(error.message)
  });

  const {
    setValue,
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch
  } = useForm<RegisterBirthdateForm>({
    resolver: yupResolver(registerBirthdateSchema) as Resolver<RegisterBirthdateForm>,
    mode: 'onChange'
  });

  const submit = (data: RegisterBirthdateForm) => {


    const birthDate = data.birth_date || '1926-01-01';
    formDataRef.current = { ...data, birth_date: birthDate };

    const nextUserData = {
      ...userData,
      first_name: data.first_name,
      last_name: data.last_name,
      birthdate: birthDate
    };

    const token = session?.user.accessToken;

    if (token) {
      updateProfile.mutate({
        firstName: data.first_name,
        lastName: data.last_name,
        dateOfBirth: birthDate

      });
    } else {
      // loginMutation.mutate({
      //   email: userData.email!,
      //   password: userData.password!
      // });
    }

    onSubmit(nextUserData, AuthSteps.location);
  };

  return (
    <Stack component='form' spacing='12px' onSubmit={handleSubmit(submit)}>
      <Input
        label={AUTH_MESSAGES.GENERAL.FIRST_NAME}
        {...register('first_name')}
        error={!!errors.first_name}
        helperText={errors.first_name?.message}
      />
      <Input
        label={AUTH_MESSAGES.GENERAL.LAST_NAME}
        {...register('last_name')}
        error={!!errors.last_name}
        helperText={errors.last_name?.message}
      />
      <DateTimePicker.DatePicker onChange={(data: string) => setValue('birth_date', data)} />
      <Button disabled={!isValid} type='submit'>
        {GENERAL_MESSAGES.ACTIONS.CONTINUE}
      </Button>
    </Stack>
  );
};

export default RegisterBirthdateStep;
