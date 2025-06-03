
'use client';

import { Box, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import FemaleIcon from '@/components/atoms/Icon/icons/FemaleIcon';
import MaleIcon from '@/components/atoms/Icon/icons/MaleIcon';
import OtherIcon from '@/components/atoms/Icon/icons/OtherIcon';
import { AUTH_MESSAGES, GENERAL_MESSAGES } from '@/constants';
import { AuthSteps, IAuthStepProps } from '@/types/auth';
import { useUpdateProfile } from '@/hooks/auth/useUpdateProfile';
import { toast } from 'react-toastify';

const genderOptions = [
  { label: GENERAL_MESSAGES.GENDER.MALE, value: 'Male', icon: <MaleIcon /> },
  { label: GENERAL_MESSAGES.GENDER.FEMALE, value: 'Female', icon: <FemaleIcon /> },
  { label: GENERAL_MESSAGES.GENDER.OTHER, value: 'Other', icon: <OtherIcon /> }
];

const getGenderBoxStyles = (theme: any) => ({
  transition: 'background-color 0.3s',
  cursor: 'pointer',
  backgroundColor: theme.palette.mode === 'light' ? 'transparent' : '#1D2633',
  color: '#475569',
  fontSize: '14px',
  fontWeight: 500,
  '.genderIcon': {
    transition: 'background-color 0.3s'
  },
  '&:hover': {
    backgroundColor: theme.palette.primary['500'],
    color: 'white',
    '.genderIcon': {
      backgroundColor: 'white'
    }
  }
});

const RegisterGenderStep = ({ userData, onSubmit }: IAuthStepProps) => {
  const { data: session, update } = useSession();

  const updateProfile = useUpdateProfile({
    onSuccess: () => {
      toast.success(AUTH_MESSAGES.GENERAL.INFO_SUBMITTED_SUCCESS);
      onSubmit({ ...userData }, AuthSteps.birthdate);

    },
    onError: (error) => toast.error(error.message)
  });



  const handleSelectGender = (gender: 'Male' | 'Female' | 'Other') => {
    const nextUserData = { ...userData, gender };
    // Use NextAuth session
    const token = session?.user.accessToken;

    if (token) {
      console.log('nextUserData', nextUserData);
      updateProfile.mutate({ gender });
      update({
        ...session?.user,
        gender: gender,

      })
    }
  };

  return (
    <Box>
      <Typography
        px='16px'
        mb='10px'
        sx={(theme) => ({
          color: theme.palette.gray['400'],
          fontSize: '14px',
          fontWeight: 500
        })}>
        Gender
      </Typography>

      <Box display='flex' borderRadius='16px' overflow='hidden' gap='1px'>
        {genderOptions.map((option) => (
          <Box
            key={option.value}
            display='flex'
            gap='8px'
            alignItems='center'
            p='14px'
            width='100%'
            sx={(theme) => getGenderBoxStyles(theme)}
            onClick={() => handleSelectGender(option.value as 'Male' | 'Female' | 'Other')}
          >
            <Box
              width='20px'
              height='20px'
              display='flex'
              alignItems='center'
              justifyContent='center'
              borderRadius='99px'
              className='genderIcon'>
              {option.icon}
            </Box>
            <div>{option.label}</div>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RegisterGenderStep;
