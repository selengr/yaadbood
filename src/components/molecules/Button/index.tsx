import React from 'react';
//components
import { ButtonProps, Tooltip, Typography } from '@mui/material';
//styles
import { StyledButton } from './Button.style';
interface IButtonProps extends ButtonProps {
  children?: React.ReactNode;
  label?: string;
  isLoading?: boolean;
  tooltip?: string;
}

const Button: React.FC<IButtonProps> = (props) => {
  const {
    children,
    label,
    isLoading,
    disabled,
    variant = 'primary',
    size = 'medium',
    tooltip,
    ...restProps
  } = props;
  return (
    <Tooltip title={tooltip} placement='top'>
      <StyledButton variant={variant} size={size} disabled={disabled || isLoading} {...restProps}>
        {isLoading && <Typography>...</Typography>}
        {children}
        {label}
      </StyledButton>
    </Tooltip>
  );
};

export default Button;
