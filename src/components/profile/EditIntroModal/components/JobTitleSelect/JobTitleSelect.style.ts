import { Box, MenuItem, styled, TextField } from '@mui/material';

export const JobTitleInputStyled = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    height: '49px', // Set height
    padding: '0px 8px',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.gray[200] // Maintain same color on hover
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary[500] // Focus effect
    }
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.gray[200] // Default border color
  },
  '& .MuiAutocomplete-endAdornment': {
    marginRight: '14px'
  }
}));

export const JobTitlePaperComponentStyled = styled(Box)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: '0px 16px 24px 0px #94A3B83D, 0px 3px 24px 0px #94A3B83D',
  padding: '8px',
  backgroundColor: 'white'
}));

export const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  backgroundColor: 'transparent !important',
  '&:hover': {
    backgroundColor: theme.palette.primary[50]
  }
}));
