import { Box, styled, Typography } from '@mui/material';

export const ContainerStyled = styled(Box)`
  gap: 8px;
  display: flex;
  padding : 8px 0
  align-items: center;
  position: relative;
`;

export const ImageContainerStyled = styled(Box)`
  width: 92px;
  height: 92px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  object-fit: cover;
`;

export const BodyStyled = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const TitleStyled = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.gray[600]
}));

export const DescriptionStyled = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 325,
  WebkitLineClamp: 4,
  overflow: 'hidden',
  variant: 'caption',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  color: theme.palette.gray[600],
}));
