import { TypographyProps } from '@mui/material';
import React from 'react';
import { TypographyStyle } from './typography.style';

interface IProps extends TypographyProps {
  children: React.ReactNode;
}

const Typography: React.FC<IProps> = ({ children, variant = 'body1', ...rest }) => {
  return (
    <TypographyStyle variant={variant} {...rest}>
      {children}
    </TypographyStyle>
  );
};

export default Typography;
