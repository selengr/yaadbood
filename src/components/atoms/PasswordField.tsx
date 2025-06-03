import { Box } from '@mui/material';
import { useState } from 'react';
import { ChangeHandler } from 'react-hook-form';

import EyeIcon from './Icon/icons/EyeIcon';
import EyeSlashIcon from './Icon/icons/EyeSlashIcon';
import Input from './Input';

interface IntProps {
  value?: string;
  onChange?: (v: string) => void | ChangeHandler;
  autoComplete?: boolean;
  errorMessage?: string;
  id?: string;
  placeholder?: string;
  error?: boolean;
  label?: string;
  required?: boolean;
}

export const PasswordField = ({
  value,
  onChange,
  autoComplete = true,
  errorMessage,
  id,
  error = false,
  placeholder = 'Enter password',
  label,
  required = false
}: IntProps) => {
  // Show password state
  const [show, setShow] = useState(false);

  // Handle on click eye-slash
  const onClick = () => {
    setShow((i) => !i);
  };

  return (
    <Input
      id={id}
      data-test-id='password-field'
      errorMessage={errorMessage}
      value={value}
      autoComplete={`${autoComplete}`}
      placeholder={placeholder}
      onChange={onChange ? (value) => onChange(value.target.value) : () => {}}
      type={show ? 'text' : 'password'}
      error={error}
      label={label}
      required={required}
      InputProps={{
        endAdornment: (
          <Box onClick={onClick} sx={{ cursor: 'pointer' }}>
            {show ? <EyeIcon width={13.05} height={11.03} /> : <EyeSlashIcon width={13.05} height={11.03} />}
            {/* <Icon name={show ? 'eye' : 'eyeSlash'} w={16} h={16} view='0 0 16 16' /> */}
          </Box>
        )
      }}
    />
  );
};
