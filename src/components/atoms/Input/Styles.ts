'use client';
import { styled, TextField } from '@mui/material';

interface CustomTextFieldProps {
  $isError?: boolean | undefined;
}

export const TextFieldStyled = styled(TextField, {
  shouldForwardProp: (prop) => prop !== '$isError'
})<CustomTextFieldProps>(({ theme, $isError }) => ({
  width: '100%',
  '& input': {
    padding: '13px 16px'
  },
  '& .MuiInputBase-root': {
    borderRadius: '12px'
  },
  '& fieldset': {
    borderWidth: '1px !important',
    borderColor: `${$isError ? theme.palette.red['500'] : theme.palette.gray['200']} !important`
  },
  '&:focus-within fieldset': {
    borderColor: `${$isError ? theme.palette.red['500'] : theme.palette.primary['500']} !important`
  }
}));
