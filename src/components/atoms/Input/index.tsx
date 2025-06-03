import { Box, Stack, Typography } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField';
import { ReactNode } from 'react';

import Icon from '@/components/atoms/Icon';

import * as S from './Styles';
import ErrorIcon from '../Icon/icons/Error';

interface IntProps {
  errorMessage?: ReactNode;
  label?: string | React.ReactNode;
  required?: boolean;
  startHelper?: ReactNode;
}

export default function Input({
  errorMessage,
  label,
  required,
  error,
  helperText,
  startHelper,
  ...props
}: IntProps & TextFieldProps) {
  const isError = !!errorMessage || !!error;

  return (
    <div data-test-id='custom-text-field'>
      <Box display='flex' gap='4px' mb='2px' sx={{ fontWeight: 500 }}>
        <Typography variant='body2' color='gray.700'>
          {label}
        </Typography>
        {required && (
          <Typography
            sx={(theme) => ({
              color: theme.palette.red['500'],
              lineHeight: '15px'
            })}>
            *
          </Typography>
        )}
      </Box>

      <S.TextFieldStyled
        $isError={isError}
        variant='outlined'
        {...props}
        sx={(theme) => ({
          width: '100%',
          '& input': {
            padding: { xs: '5.94px', sm: '5.94px', md: '6.5px' },
            fontSize: { xs: '14px', sm: '14px', md: '16px' },
            textAlign: 'start', // Center placeholder text
            height: '30px',
            color: isError ? 'rgba(255, 38, 96,1)' : theme.palette.mode === 'dark' ? 'white' : 'black'
          },
          '& .MuiInputBase-root': {
            backgroundColor: isError
              ? 'rgba(255, 38, 96, 0.12)' // Red background when there's an error
              : theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, 0.8)'
                : 'rgba(129, 140, 153, 0.12)',
            alignItems: 'center', // Vertically center input content
            display: 'flex',

            justifyContent: 'center'
          },
          '& .MuiInputAdornment-root': {
            margin: '0px !important'
          },
          '& fieldset': {
            borderColor: isError ? 'rgba(255, 38, 96, 1)' : 'transparent' // Red border when there's an error
          },
          '& .MuiInputBase-input::placeholder': {
            color: theme.palette.mode === 'dark' ? 'rgba(85, 97, 112)' : 'rgba(129, 140, 153, 0.8)',
            opacity: 1
          },
          '& input:-webkit-autofill, & input:-webkit-autofill:focus, & input:-webkit-autofill:hover': {
            WebkitBoxShadow: `0 0 0 1000px ${
              theme.palette.mode === 'light' ? 'transparent' : 'transparent'
            } inset !important`,
            transition: 'background-color 5000s ease-in-out 0s'
          }
        })}
      />

      <Stack
        flexDirection={'row'}
        sx={{
          paddingX: '.5rem',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
        {errorMessage ? (
          <Typography
            variant='caption'
            sx={(theme) => ({
              color: theme.palette.red['500'],
              display: 'flex',
              justifyContent: 'center',
              gap: '2px',
              mt: '4px'
            })}>
            <ErrorIcon />
            {errorMessage}
          </Typography>
        ) : (
          <Typography variant='caption' sx={(theme) => ({ color: 'rgba(0, 0, 0, 0.8)' })}>
            {startHelper}
          </Typography>
        )}
        <Typography variant='caption' sx={(theme) => ({ color: 'rgba(0, 0, 0, 0.8)' })}>
          {helperText}
        </Typography>
      </Stack>
    </div>
  );
}
