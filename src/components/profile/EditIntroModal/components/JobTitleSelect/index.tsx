import React from 'react';
//constants
import { EDIT_INTRO_MODAL } from '@/constants';
import { jobCategories } from '@/constants/jobTitles';
//components
import Icon from '@/components/atoms/Icon';
import { Autocomplete, Box, ListItemText, Typography } from '@mui/material';
import { JobTitleEndAdornment } from '../';
//styles
import { JobTitleInputStyled, JobTitlePaperComponentStyled, MenuItemStyled } from './JobTitleSelect.style';

interface IProps {
  value: string;
  setValue: (e: string) => void;
}

const JobTitleSelect = ({ value, setValue }: IProps) => {
  const [open, setOpen] = React.useState(false);

  const jobOptions = jobCategories.flatMap((category) => category.options);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChange = (_: React.SyntheticEvent, newValue: string | null) => {
    setValue(newValue || '');
  };
  const filterOptions = (options: string[], { inputValue }: { inputValue: string }) => {
    return options.filter((option) => option.toLowerCase().includes(inputValue.toLowerCase()));
  };

  return (
    <Box>
      <Typography variant='body2' color='gray.700'>
        {EDIT_INTRO_MODAL.JOB.LABEL}
      </Typography>
      <Autocomplete
        value={value}
        onChange={onChange}
        options={jobOptions}
        filterOptions={filterOptions}
        disablePortal
        open={open}
        onOpen={onOpen}
        onClose={onClose}
        renderInput={(params) => (
          <JobTitleInputStyled
            {...params}
            placeholder={EDIT_INTRO_MODAL.JOB.PLACEHOLDER}
            variant='outlined'
            fullWidth
            slotProps={{
              input: {
                ...params.InputProps,
                endAdornment: <JobTitleEndAdornment open={open} setOpen={setOpen} />
              }
            }}
          />
        )}
        renderOption={(props, option) => (
          <MenuItemStyled
            sx={{
              color: value === option ? 'primary.500' : 'inherit'
            }}
            {...props}
            key={option}>
            <ListItemText primary={option} />
            {value === option && <Icon name='check' />}
          </MenuItemStyled>
        )}
        PaperComponent={({ children }) => (
          <JobTitlePaperComponentStyled>{children}</JobTitlePaperComponentStyled>
        )}
      />
    </Box>
  );
};

export default JobTitleSelect;
