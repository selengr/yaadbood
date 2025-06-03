import { Box, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import SearchIcon from '../Icon/icons/SearchIcon';
import CloseCircleIcon from '../Icon/icons/CloseCircleIcon';

const GlobalSearch = ({
  backgroundColor,
  placeholder,
  textColor,
  value = ''
}: {
  backgroundColor?: string;
  placeholder?: string;
  textColor?: string;
  value?: string;
}) => {
  const [searchInput, setSearchInput] = useState(value);
  return (
    <TextField
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      sx={(theme) => ({
        width: '100%',
        maxWidth: '320px',
        minWidth: '160px',
        '& input': {
          padding: { xs: '5.94px', sm: '5.94px', md: '6.5px' },
          color: textColor || theme.palette.gray['400'],
          fontSize: { xs: '14px', sm: '14px', md: '16px' },
          lineHeight: { xs: '22px', sm: '22px', md: '25px' }
        },
        '& .MuiInputBase-root': {
          paddingLeft: searchInput ? '2px' : '12px',
          paddingRight: '9px',
          backgroundColor: backgroundColor || (theme.palette.mode === 'light' ? '#fff' : '#1D2633'),
          borderRadius: '999px',
          '&:hover': {
            backgroundColor: backgroundColor || (theme.palette.mode === 'light' ? '#fff' : '#1D2633')
          }
        },
        '& .MuiInputAdornment-root': {
          margin: '0px !important',
          marginRight: '3.5px !important'
        },
        '& fieldset': {
          borderColor: 'transparent'
        },
        '& .MuiOutlinedInput-root': {
          '&:hover fieldset': {
            borderColor: 'transparent'
          },
          '&.Mui-focused fieldset': {
            borderColor: 'transparent'
          }
        },
        '& .MuiInputBase-input::placeholder': {
          color: theme.palette.gray['400'],
          opacity: 1
        }
      })}
      placeholder={placeholder || 'Search'}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            {!searchInput && (
              <Box
                sx={(theme) => ({
                  stroke: textColor || theme.palette.gray['400'],
                  display: 'flex',
                  alignItems: 'center',
                  pb: '2px',
                  width: { xs: '12px', sm: '12px', md: '16px' },
                  height: { xs: '12px', sm: '12px', md: '16px' }
                })}
              >
                <SearchIcon />
              </Box>
            )}
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position='end'>
            {searchInput && (
              <Box
                onClick={() => setSearchInput('')}
                sx={(theme) => ({
                  stroke: textColor || theme.palette.gray['400'],
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer'
                })}
              >
                <CloseCircleIcon />
              </Box>
            )}
          </InputAdornment>
        )
      }}
    />
  );
};

export default GlobalSearch;