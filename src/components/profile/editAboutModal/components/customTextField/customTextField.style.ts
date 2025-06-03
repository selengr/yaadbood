import { styled, Typography } from '@mui/material';
//components
import { Input } from '@/components/atoms';

export const CustomTextFieldStyle = styled(Input)`
  width: 100%;
  margin-top: 5px;
  & .MuiInputBase-root {
    padding: 12px;
    border-radius: 12px;
    background-color: transparent !important;
  }
`;

export const EditAboutTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.gray['400'],
  fontSize: '14px',
  fontWeight: 400
}));
