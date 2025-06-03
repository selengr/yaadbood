import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const StyledCommentCard = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const StyledCommentContainer = styled(Box)(({ theme }) => ({
  padding: '16px 0',
  borderBottom: `1px solid ${theme.palette.gray[200]}`
}));

export const StyledCommentHeader = styled(Box)`
  gap: 4px;
  display: flex;
  font-size: 14px;
  padding-bottom: 8px;
  align-items: center;
`;

export const StyledCommentContent = styled(Box)`
  gap: 8px;
  display: flex;
  display: flex;
  position : relative;
  align-items: center;
  align-items: flex-start;
`;

export const StyledCommentTextContainer = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const StyledUsername = styled(Typography)(({ theme }) => ({
  fontSize : 12,
  fontWeight: 400,
  variant: 'caption',
  color: theme.palette.gray[600],
}));

export const StyledTimestamp = styled(Typography)(({ theme }) => ({
  color: theme.palette.gray[500],
  fontWeight: 325,
  fontSize: '12px',
  variant: 'caption'
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.gray[600]
}));

export const StyledDescription = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 325,
  WebkitLineClamp: 4,
  overflow: 'hidden',
  variant: 'caption',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  color: theme.palette.gray[600],
}));

  export const StyledMenuContainer = styled(Typography)`
    top : -6;
    right:0;
    position : absolute;
`;