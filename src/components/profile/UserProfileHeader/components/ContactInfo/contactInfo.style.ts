// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography, Link } from '@mui/material';

export const StyledContactLink = styled(Box)`
  font-size: 14px;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.primary['500']};
`;

export const StyledModalContainer = styled(Box)`
  width: 100%;
  ${({ theme }) => theme.breakpoints.up('md')} {
    width: 420px;
  }
`;

export const StyledModalHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledContactTitle = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  color: theme.palette.gray['500']
}));

export const StyledContactItem = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0px;
`;

export const StyledContactLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.gray['700'],
  fontWeight: 500,
  fontSize: '14px'
}));

export const StyledContactLinkText = styled(Link)(({ theme }) => ({
  color: theme.palette.primary['500'],
  fontSize: '12px',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline'
  }
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary['500'],
  fontSize: '12px',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline'
  }
}));

export const StyledSecondaryLink = styled(Link)(({ theme }) => ({
    color: theme.palette.gray['500'],
    fontSize: '12px',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  }));

export const StyledSecondaryText = styled(Typography)(({ theme }) => ({
  color: theme.palette.gray['400'],
  fontSize: '12px'
}));

export const StyledColContainer = styled(Box)`
    display: flex;
    flex-direction: column;
`;

export const StyledInlineContainer = styled(Box)`
  display: flex;
  gap: 2px;
`;

//-------------------------------

export const ContactInfoButton = styled(Box)(({ theme }) => ({
  fontSize: '14px',
  cursor: 'pointer',
  color: theme.palette.primary[500],
  fontWeight: theme.typography.fontWeightRegular,
  display: 'inline-block',
  '&:hover': {
    textDecoration: 'underline',
    color: theme.palette.primary[600]
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary[300]}`,
    outlineOffset: '2px'
  }
}));