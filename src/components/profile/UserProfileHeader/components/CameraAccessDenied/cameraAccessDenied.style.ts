import { styled } from '@mui/material/styles';
import { Box, Typography, Divider } from '@mui/material';
  // components
  import { Button } from '@/components/atoms';
  
export const CameraBlockedContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

export const StyledDivider = styled(Divider)`
  width: 100%;
`;

export const ErrorTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.gray['900'],
  fontSize: '24px',
  fontWeight: 500,
  textAlign: 'center',
  marginBottom: '16px'
}));

export const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.gray['700'],
  fontSize: '16px',
  textAlign: 'center',
  marginBottom: '16px'
}));

export const ActionButtonsContainer = styled(Box)`
  display: flex;
  align-self: flex-end;
  gap: 8px;
`;

export const CameraButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  borderColor: theme.palette.primary.main,
  minHeight: '32px',
  height: '32px',
  fontSize: '12px',
  fontWeight: '600',
  '&:disabled': {
    color: theme.palette.gray['700'],
    borderColor: theme.palette.gray['300'],
    backgroundColor: theme.palette.gray['300'],
    opacity: 0.5,
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5)
  }
}));

export const UploadButton = styled(Button)`
  min-height: 32px;
  height: 32px;
  font-size: 12px;
  font-weight: 600;
  padding-left: ${({ theme }) => theme.spacing(1.5)};
  padding-right: ${({ theme }) => theme.spacing(1.5)};
`;

export const HiddenFileInput = styled('input')`
  display: none;
`;