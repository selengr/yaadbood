import { Control, Controller, ControllerRenderProps, FieldErrors } from 'react-hook-form';
//constants
import { EDIT_INTRO_MODAL } from '@/constants';
//components
import React from 'react';
import { RenderDatePicker } from '../';
//types
import { EditIntroForm } from '@/types/profile';
import { Box, Typography } from '@mui/material';
interface IProps {
  control: Control<EditIntroForm>;
  errors: FieldErrors<EditIntroForm>;
}

const DateOfBirthInput = ({ control, errors }: IProps) => {
  const renderDateOfBirthInput = ({
    field
  }: {
    field: ControllerRenderProps<EditIntroForm, 'dateOfBirth'>;
  }) => {
    return <RenderDatePicker field={field} errors={errors} />;
  };

  return (
    <Box>
      <Typography variant='body2' color='gray.700'>
        {EDIT_INTRO_MODAL.DATE_OF_BIRTH.LABEL}
      </Typography>
      <Controller
        control={control}
        name={EDIT_INTRO_MODAL.DATE_OF_BIRTH.NAME}
        render={renderDateOfBirthInput}
      />
    </Box>
  );
};

export default DateOfBirthInput;
