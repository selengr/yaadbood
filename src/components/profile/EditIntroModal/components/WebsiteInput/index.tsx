import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
//constants
import { EDIT_INTRO_MODAL } from '@/constants';
//components
import Input from '@/components/atoms/Input';
import { Box, Typography } from '@mui/material';
//types
import { EditIntroForm } from '@/types/profile';

interface IProps {
  control: Control<EditIntroForm>;
  errors: FieldErrors<EditIntroForm>;
}

const WebsiteInput = ({ control, errors }: IProps) => {
  return (
    <Controller
      control={control}
      name={EDIT_INTRO_MODAL.WEBSITE.NAME}
      render={({ field }) => (
        <Box
          sx={() => ({
            display: 'flex',
            flexDirection: 'column',
            gap: '0px'
          })}>
          <Typography sx={{ color: 'gray.700', fontSize: '14px', fontWeight: 400 }}>
            {EDIT_INTRO_MODAL.WEBSITE.LABEL}
          </Typography>
          <Typography sx={{ color: 'gray.400', fontSize: '14px' }}>
            {EDIT_INTRO_MODAL.WEBSITE.DESCRIPTION}
          </Typography>
          <Input
            placeholder={EDIT_INTRO_MODAL.WEBSITE.PLACEHOLDER}
            {...field}
            errorMessage={errors.website?.message}
          />
        </Box>
      )}
    />
  );
};

export default WebsiteInput;
