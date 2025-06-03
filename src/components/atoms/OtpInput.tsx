'use client';
import { alpha, styled } from '@mui/material/styles';
import { default as ReactOtpInput } from 'react-otp-input';

import { lightColors } from '@/themes/colors';

interface IntProps {
  value: string;
  length?: number;
  onChange: (v: string) => void;
  errorMessage?: string;
}

const StyledInput = styled('input')(({ theme }) => ({
  width: '2rem',
  height: '2rem',
  fontSize: theme.spacing(1.5),
  borderRadius: theme.shape.roundedMd,
  margin: '0px 2px',
  textAlign: 'center',
  fontWeight: 700,
  borderWidth: '1px',
  borderStyle: 'solid',
  userSelect: 'none',
  outline: 'none',
  '@media (min-width: 400px)': {
    width: '3rem',
    height: '3rem',
    margin: '0px 4px',
    fontSize: theme.spacing(2.5),
    borderRadius: theme.shape.roundedLg
  },
  '&.error': {
    color: lightColors.red['500'],
    backgroundColor: alpha(lightColors.red['50'], 0.12),
    outlineColor: lightColors.red['500'],
    outlineWidth: '1px',
    outlineStyle: 'solid'
  },
  '&:not(.error)': {
    color: theme.palette.mode === 'dark' ? '#fff' : lightColors.gray['700'],
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(129, 140, 153,0.12)' : 'transparent',
    borderColor: theme.palette.mode === 'dark' ? 'rgba(129, 140, 153,0.12)' : lightColors.gray['200'],
    '&:focus': {
      outlineColor: lightColors.primary['500'],
      outlineWidth: '1px',
      outlineStyle: 'solid',
      borderColor: 'transparent'
    }
  }
}));

export function matchIsNumeric(text: string) {
  const isNumber = typeof text === 'number';
  const isString = typeof text === 'string';
  return (isNumber || (isString && text !== '')) && !isNaN(Number(text));
}

export const OtpInput = ({ value, length = 6, onChange, errorMessage }: IntProps) => (
  <ReactOtpInput
    value={value}
    numInputs={length}
    onChange={onChange}
    renderInput={(props) => (
      <StyledInput
        {...props}
        type='number'
        inputMode='numeric'
        className={`${props.className} ${errorMessage ? 'error' : ''}`}
        style={{}}
      />
    )}
  />
);
