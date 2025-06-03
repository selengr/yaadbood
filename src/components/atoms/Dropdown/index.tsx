'use client';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { JSX, useRef, useState } from 'react';

import Icon from '../Icon';

type DropdownOption = {
  label: string;
  value: string | number;
  icon?: JSX.Element;
};

type DropdownProps = {
  options: DropdownOption[] | undefined;
  onSelect: (selectedValue: string) => void;
  label?: string;
  required?: boolean;
  selectedValues?: string;
  sx?: SxProps<Theme>;
  labelsx?: SxProps<Theme>;
  errorMessage?: string;
  placeholder?: string;
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  label,
  required = false,
  selectedValues = '',
  sx,
  labelsx,
  errorMessage,
  placeholder
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string>(selectedValues);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState<{
    anchorOrigin: { vertical: 'top' | 'bottom'; horizontal: 'center' };
    transformOrigin: { vertical: 'top' | 'bottom'; horizontal: 'center' };
  }>({
    anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
    transformOrigin: { vertical: 'top', horizontal: 'center' }
  });

  const handleOpen = () => {
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.bottom + 300 > viewportHeight && rect.top > 300) {
        // Open upwards
        setMenuPosition({
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          transformOrigin: { vertical: 'bottom', horizontal: 'center' }
        });
      } else {
        // Open downwards
        setMenuPosition({
          anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
          transformOrigin: { vertical: 'top', horizontal: 'center' }
        });
      }
    }
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    setSelectedOptions(value);
    onSelect(value);
  };

  return (
    <FormControl
      ref={dropdownRef}
      sx={{
        // minWidth: '200px',
        width: '100%',
        ...sx
      }}>
      {label && (
        <Box display='flex' gap='4px' mb='2px' sx={{ fontWeight: 400, ...labelsx }}>
          {label}
          {required && (
            <Typography
              sx={(theme) => ({
                color: theme.palette.red['500'],
                lineHeight: '15px'
              })}>
              *
            </Typography>
          )}
        </Box>
      )}
      <Select
        value={selectedOptions}
        onOpen={handleOpen}
        onClose={handleClose}
        onChange={handleChange}
        IconComponent={() => null}
        displayEmpty
        endAdornment={
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              transition: 'transform 0.3s',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              position: 'absolute',
              right: 8,
              top: '50%',
              translate: '-50% -50%',
              pointerEvents: 'none'
            }}>
            <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M13.2797 5.9668L8.93306 10.3135C8.41973 10.8268 7.57973 10.8268 7.06639 10.3135L2.71973 5.9668'
                stroke='#64748B'
                strokeWidth='1.5'
                strokeMiterlimit='10'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </Box>
        }
        sx={{
          borderRadius: '12px',
          '& .MuiSelect-select': {
            padding: '12px'
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: isOpen ? 'primary.500 !important' : '#E2E8F0 !important'
          },
          '& .MuiListItemText-root': {
            margin: '0px'
          }
        }}
        MenuProps={{
          disablePortal: true,
          PaperProps: {
            style: {
              maxHeight: 300,
              maxWidth: 400,
              borderRadius: '20px',
              boxShadow: '0px 16px 24px 0px #94A3B83D, 0px 3px 24px 0px #94A3B83D',
              zIndex: 1000003
            }
          },
          anchorOrigin: menuPosition.anchorOrigin,
          transformOrigin: menuPosition.transformOrigin
        }}
        renderValue={(selected) => {
          if (!selected && placeholder) {
            return <Typography sx={{ color: '#94A3B8' }}>{placeholder}</Typography>;
          }
          const selectedOption = options?.find((option) => option.value === selected);
          return selectedOption ? selectedOption.label : '';
        }}>
        {options?.map((option, index) => (
          <MenuItem
            key={`${option?.value}${option?.label}${label}${index}`}
            value={option.value}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              backgroundColor: 'transparent !important',
              color: selectedOptions === option.value ? 'primary.500' : '#475569'
            }}>
            <ListItemText primary={option.label} />
            {selectedOptions === option.value && <Icon name='check' />}
          </MenuItem>
        ))}
      </Select>
      {errorMessage && (
        <Box display='flex' alignItems='center' gap='5px' mt='4px'>
          <Typography variant='caption' sx={{ color: 'red.500' }}>
            {errorMessage}
          </Typography>
        </Box>
      )}
    </FormControl>
  );
};

export default Dropdown;
