import { Button as MuiButton, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

type BaseButtonProps = {
  color?: string;
  startIcon?: ReactNode;
  className?: string;
  endIcon?: ReactNode;
  variant?: 'text' | 'contained' | 'outlined' | 'dashed';
  disabled?: boolean;
  pill?: boolean;
  children?: ReactNode;
  icon?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  sx?: SxProps<Theme>;
  type?: 'button' | 'submit' | 'reset' | undefined;
};

const Button = ({
  color,
  variant = 'contained',
  disabled,
  className,
  startIcon,
  endIcon,
  pill,
  children,
  icon,
  onClick,
  sx,
  type = 'button'
}: BaseButtonProps) => {
  return (
    <MuiButton
      variant={variant === 'dashed' ? 'text' : variant}
      disabled={disabled}
      className={className}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      type={type}
      sx={{
        bgcolor: variant === 'contained' ? color : 'transparent',
        color:
          variant === 'text' ? color : variant === 'outlined' ? color : variant === 'dashed' ? color : '#fff',
        border:
          variant === 'outlined'
            ? `1px solid ${color}`
            : variant === 'dashed'
              ? `1px dashed ${color}`
              : 'none',
        '&:hover': {
          bgcolor: variant === 'contained' ? `${color}CC` : 'transparent',
          color: variant === 'text' ? `${color}CC` : variant === 'outlined' ? `${color}CC` : '#fff',
          border:
            variant === 'outlined'
              ? `1px solid ${color}`
              : variant === 'dashed'
                ? `1px dashed ${color}`
                : 'none'
        },
        '&:disabled': {
          bgcolor: variant === 'contained' ? color : 'transparent',
          color:
            variant === 'text'
              ? color
              : variant === 'outlined'
                ? color
                : variant === 'dashed'
                  ? color
                  : '#fff',
          border:
            variant === 'outlined'
              ? `1px solid ${color}`
              : variant === 'dashed'
                ? `1px dashed ${color}`
                : 'none'
        },
        borderRadius: pill || icon ? '99px' : '12px',
        aspectRatio: icon ? '1' : '',
        minWidth: '0px',
        padding: icon ? '8px' : '8px 16px',
        ...sx
      }}>
      {children}
    </MuiButton>
  );
};

export default Button;
