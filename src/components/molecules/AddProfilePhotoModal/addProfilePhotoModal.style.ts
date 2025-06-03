// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography, Divider } from '@mui/material';
// components
import { Button } from '@/components/atoms';

export const StyledModalContainer = styled(Box)(({ theme }) => ({
  gap: '20px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    width: '744px',
    gap: '32px',
  },
}));

export const StyledCameraAccessDeniedContainer = styled(Box)`
  gap: 4px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const StyledCameraBlockedTitle = styled(Typography)`
  font-weight: 500;
  font-size: 24px;
  margin-top: 16px;
  color: ${({ theme }) => theme.palette.gray[900]};
  text-align: center;
`;

export const StyledCameraBlockedDescription = styled(Typography)`
  color: ${({ theme }) => theme.palette.gray[500]};
  font-size: 16px;
  text-align: center;
  margin-bottom: 16px;
`;

export const StyledActionsBox = styled(Box)`
  align-self: end;
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
`;

export const StyledCameraButton = styled(Button)(
    ({ theme }) => `
      border-color: ${theme.palette.primary.main};
      min-height: 32px;
      height: 32px;
      font-size: 12px;
      font-weight: 600;
      padding-left: ${theme.spacing(1.5)};
      padding-right: ${theme.spacing(1.5)};
  
      &:disabled {
        color: ${theme.palette.gray[700]};
        border-color: ${theme.palette.gray[300]};
        background-color: ${theme.palette.gray[300]};
        opacity: 0.5;
        padding-left: ${theme.spacing(1.5)};
        padding-right: ${theme.spacing(1.5)};
      }
    `
  );

export const StyledUploadButton = styled(Button)`
  min-height: 32px;
  height: 32px;
  font-size: 12px;
  font-weight: 600;
  padding-left: ${({ theme }) => theme.spacing(1.5)};
  padding-right: ${({ theme }) => theme.spacing(1.5)};
`;

export const StyledTitleTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.gray[900],
  fontWeight: 500,
  fontSize: '16px',
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    fontSize: '24px',
    marginTop: '16px',
  },
}));

export const StyledAvatarsContainer = styled(Box)(`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`);

export const StyledDescriptionTypography = styled(Typography)(({ theme }) =>  [
    {
        color: theme.palette.gray['500'],
        fontWeight: 400,
        fontSize: '14px',
        textAlign: 'center',
        maxWidth: '500px',
        marginBottom : 8,
        paddingLeft: 24,
        paddingRight: 24,
        [theme.breakpoints.up('md')]: {
          fontSize: '16px'
        },
    },
    theme.applyStyles('dark', {
        color: theme.palette.gray['400'],
    }),
  ]);

  export const StyledBottomActionsBox = styled(Box)(({ theme }) => ({
    gap: '10px',
    display: 'flex',
    alignSelf: 'stretch',
    marginTop : "16px",
    [theme.breakpoints.up('md')]: {
      alignSelf: 'end',
      marginTop : 0
    },
  }));

  export const StyledResponsiveButton = styled(Button)(({ theme }) => ({
    width: '50%',
    minHeight: '32px',
    height: '32px',
    fontSize: '12px',
    fontWeight: 500,
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    [theme.breakpoints.up('md')]: {
      width: 'auto',
    },
  }));

  export const StyledDivider = styled(Divider)(({ theme }) => ({
    width: '100%',
    borderColor: 'transparent',
    [theme.breakpoints.up('md')]: {
      borderColor: theme.palette.gray[200],
    },
  }));