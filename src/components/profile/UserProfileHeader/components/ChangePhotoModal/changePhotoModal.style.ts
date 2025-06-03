import { styled } from '@mui/material/styles';
import { Box, Typography, FormLabel } from '@mui/material';

export const StyledModalContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '644px'
  }
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.gray['700'],
  fontWeight: 600,
  fontSize: '24px',
  textAlign: 'center'
}));

export const StyledDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.gray['500'],
  fontWeight : 325,
  fontSize: '14px',
  textAlign: 'center'
}));

export const StyledAvatarContainer = styled(Box)`
  display: flex;
  justify-content: center;
`;

export const StyledActionsContainer = styled(Box)`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const StyledUploadLabel = styled(FormLabel)(({ theme }) => ({
  borderRadius: 9999,
  backgroundColor: theme.palette.primary['500'],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.palette.neutrals.content,
  cursor: 'pointer',
  height: '32px',
  minHeight: '32px',
  padding: '0 12px',
  fontWeight: 600,
  fontSize: '12px',
  '&:hover': {
    backgroundColor: theme.palette.primary['600']
  }
}));

export const HiddenFileInput = styled('input')`
  display: none;
`;