import { Box, styled, Typography } from '@mui/material';
import { ElementType } from 'react';

interface IContainerStyled {
  component: ElementType;
}

export const ContainerStyled = styled(Box)<IContainerStyled>`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TitleStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.gray[700],
  fontWeight: 600,
  fontSize: '20px'
}));
