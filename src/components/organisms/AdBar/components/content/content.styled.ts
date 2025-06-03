import { styled, Typography } from '@mui/material';

export const ContentStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: '12px',
  color: theme.palette.gray['400'],
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  lineClamp: 2,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical'
}));
