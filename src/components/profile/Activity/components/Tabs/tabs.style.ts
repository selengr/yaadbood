import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
// components
import { Button } from '@/components/atoms';

interface TabButtonProps {
    active?: boolean;
  }

export const StyledTabContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const StyledTabButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active'
})<TabButtonProps>(({ theme, active }) => ({
  fontSize: '14px',
  lineHeight: '14px',
  fontWeight: 500,
  borderRadius: '9999px',
  padding: '8px 12px',
  textDecoration: 'none',
  textTransform: 'capitalize',
  height: '32px',
  minHeight: '32px',
  border: active ? '0' : `1px solid ${theme.palette.gray[200]}`,
  backgroundColor: active ? theme.palette.primary[500] : theme.palette.neutrals.content,
  color: active ? theme.palette.neutrals.content : theme.palette.gray[500],
  '&:hover': {
    backgroundColor: active ? theme.palette.primary[500] : theme.palette.neutrals.content,
    color: active ? theme.palette.neutrals.content : theme.palette.gray[500],
    border: active ? '0' : `1px solid ${theme.palette.gray[200]}`
  }
}));