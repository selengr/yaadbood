import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// components
import { Button } from '@/components/atoms';

export const ModalContent = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    width: '420px'
  }
}));

export const PolicyTitle = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 500,
  color: theme.palette.gray['700']
}));

export const CategoriesContainer = styled(Box)`
  gap: 8px;
  display: flex;
  flex-wrap: wrap;
`;

export const CategoryButton = styled(Button)(({ theme }) => ({
  height: '32px',
  fontSize: '12px',
  minHeight: '32px',
  margin : '2px 0',
  padding: '7px 12px',
  '&.MuiButton-contained': {
    backgroundColor: theme.palette.primary['500'],
    // color: theme.palette.neutrals.white
  },
  '&.MuiButton-outlined': {
    borderColor: theme.palette.gray['200'],
    color: theme.palette.gray['500']
  }
}));

export const ActionsContainer = styled(Box)`
  gap: 10px;
  display: flex;
  align-self: flex-end;
`;

export const CancelButton = styled(Button)(({ theme }) => ({
  height: '32px',
  fontWeight: 500,
  fontSize: '12px',
  minHeight: '32px',
  padding: '0 12px',
  borderColor: '#1DA1F3',
  color: '#1DA1F3',
  '&:hover': {
    borderColor: '#1DA1F3',
    backgroundColor: 'rgba(29, 161, 243, 0.1)'
  }
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  height: '32px',
  fontSize: '12px',
  fontWeight: 500,
  minHeight: '32px',
  padding: '0 12px',
  '&:disabled': {
    backgroundColor: theme.palette.gray['300'],
    color: theme.palette.gray['700']
  }
}));

export const LoadingContainer = styled(Box)`
  padding: 4px 16px;
`;