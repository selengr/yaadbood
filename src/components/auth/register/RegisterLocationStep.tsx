'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/atoms/Button/Button';
import DotSpinner from '@/components/atoms/DotSpinner';
import Modal from '@/components/atoms/Modal/Modal';
import SelectableTextField from '@/components/atoms/SelectableTextField';
import { AUTH_MESSAGES, GENERAL_MESSAGES, ROUTES } from '@/constants';
import { useUpdateProfile } from '@/hooks/auth/useUpdateProfile';
import { locationSchema } from '@/lib/validation/auth';
import { AuthSteps, IAuthStepProps } from '@/types/auth';
import {
  fetchUserLocation,
  handleLoginSuccess,
  handleSubmit,
  handleUpdateProfileSuccess
} from '@/utils/auth/authUtils';

import GetLocation from './GetLocation';
import { useSession } from 'next-auth/react';

interface LocationForm {
  location: string;
}

const RegisterLocationStep = ({ userData, onSubmit, onClose = () => { } }: IAuthStepProps) => {
  const theme = useTheme();
  const router = useRouter();
  const [isActive, setActive] = useState(false);
  const { data: session, update } = useSession();

  const {
    control,
    watch,
    setValue,
    handleSubmit: handleFormSubmit,
    formState: { errors }
  } = useForm<LocationForm>({
    resolver: yupResolver(locationSchema) as Resolver<LocationForm>
  });

  useEffect(() => {
    // fetchUserLocation(setValue); // Use utility function
  }, [setValue]);



  // const updateProfile = useUpdateProfile({
  //   onSuccess: () => {      
  //     handleUpdateProfileSuccess(userData, router); // Use utility function
  //   },
  //   onError: (error) => toast.error(error.message)
  // });
  const pathname = usePathname();

  const updateProfile = useUpdateProfile({
    onSuccess: async (responseData: any) => {
      const isOnProfilePage = pathname === ROUTES.PROFILE.INDEX;

      if (session?.user) {
        const updatedCity = responseData?.data?.city;
        const updatedCountry = responseData?.data?.country;
        toast.success(AUTH_MESSAGES.GENERAL.INFO_SUBMITTED_SUCCESS);
        await update({
          ...session?.user,
          city: updatedCity,    // Use form city if response does not have it
          country: updatedCountry, // Use form country if response does not have it
        })

      }
      if (!isOnProfilePage) {
        setTimeout(() => {
          window.location.href = ROUTES.PROFILE.INDEX;
        }, 1500); 
      }
    },
    onError: (error) => toast.error(error.message)
  });

  return (
    <Stack
      component='form'
      spacing='1.5rem'
      onSubmit={handleFormSubmit((e) => handleSubmit(e, userData, updateProfile.mutate, router))}>
      {' '}
      {/* Use utility function */}
      <Controller
        control={control}
        name='location'
        render={({ field: { onChange, value } }) => (
          <>
            <Box display='flex' gap='4px' sx={{ mb: '-24px !important', mt: '24px !important' }}>
              <Typography
                sx={(theme) => ({
                  color: theme.palette.mode === 'light' ? theme.palette.gray['700'] : '#fff',
                  fontSize: '16px',
                  fontWeight: '400'
                })}>
                Location{' '}
              </Typography>
              <Typography
                sx={(theme) => ({
                  color: theme.palette.red['500']
                })}>
                *
              </Typography>
            </Box>

            <SelectableTextField
              errorMessage={errors.location?.message}
              label=''
              value={value}
              onClick={() => setActive(true)}
            />
            <Modal
              open={isActive}
              onBack={() => setActive(false)}
              title={GENERAL_MESSAGES.LOCATION.CHOOSE}
              sx={{
                '& .MuiDialog-paper': {
                  padding: 0,
                  gap: 0,
                  marginBottom: 0,
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  backgroundImage: 'none',
                  '&::-webkit-scrollbar': {
                    width: '2px',
                    marginRight: '5px'
                  },
                  '&::-webkit-scrollbar-track': {
                    background: theme.palette.grey[200]
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: theme.palette.grey[400]
                  },
                  '#modal-header': {
                    padding: { xs: theme.spacing(1), sm: theme.spacing(3) },
                    marginBottom: 0
                  }
                }
              }}>
              <Box sx={{ padding: { xs: theme.spacing(1), sm: theme.spacing(3) } }}>
                <GetLocation
                  defaultSearch={''}
                  onChange={(e) => {
                    onChange(e);
                    setActive(false);
                  }}
                />
              </Box>
            </Modal>
            <Button type='submit' disabled={!watch('location')}>
              {updateProfile?.isPending ? <DotSpinner /> : GENERAL_MESSAGES.ACTIONS.CONFIRM}
            </Button>
          </>
        )}
      />
    </Stack>
  );
};

export default RegisterLocationStep;
