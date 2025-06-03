import { Box, styled, Typography } from '@mui/material';
import { ElementType } from 'react';

interface IProps {
  expanded: boolean;
  component: ElementType;
  isOverflowing: boolean;
}

export const DescriptionTypography = styled(Typography)<Omit<IProps, 'isOverflowing'>>(
  ({ theme, expanded }) => ({
    color: theme.palette.gray[500],
    fontSize: '16px',
    lineHeight: '28px',
    fontWeight: 400,
    overflow: expanded ? 'visible' : 'hidden',
    textOverflow: 'ellipsis',
    display: expanded ? 'inline-block' : '-webkit-box',
    WebkitLineClamp: expanded ? 'none' : 4,
    WebkitBoxOrient: 'vertical',
    position: 'relative'
  })
);

export const TruncateBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'expanded' && prop !== 'isOverflowing'
})<IProps>(({ theme, expanded, isOverflowing }) => ({
  position: expanded ? 'relative' : 'absolute',
  right: expanded ? '0' : '-10px',
  bottom: 0,
  paddingLeft: '4px',
  cursor: 'pointer',
  width: 80,
  height: 20,
  zIndex: 99999,
  '&::after': isOverflowing
    ? {
        content: '"... see more"',
        color: theme.palette.gray[700],
        cursor: 'pointer',
        marginLeft: '4px',
        position: 'absolute',
        right: 0,
        bottom: 0,
        background: theme.palette.neutrals['content'],
        paddingLeft: '4px',
        width: 90
      }
    : {}
}));
