'use client';
import { Box, colors, Typography } from '@mui/material';
import { useRef, useState } from 'react';

import { useOnClickOutside } from '@/hooks/util/useOnClickOutside';

import DateTimePicker from '../DateTimePicker';
import Icon from '../Icon';
import { CalenderButtonStyled, StyledCalendar, StyledInput } from './style';

interface DatePickerProps {
  label?: string;
  error?: string;
  value?: string; // Prop to pass the current value
  onChange?: (date: string) => void; // Callback to return the selected value
  initialValue?: string;
  placeholder?: string;
}

export default function DatePicker({
  label,
  error,
  value,
  onChange,
  initialValue,
  placeholder
}: DatePickerProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  const handleShowCalendar = () => {
    setShowCalendar(true);
  };

  const handleCloseCalendar = () => {
    setShowCalendar(false);
  };

  const handleDateChange = (date: string) => {
    if (onChange) {
      onChange(date); // Notify the parent about the selected date
    }
  };

  useOnClickOutside(calendarRef, handleCloseCalendar);

  return (
    <Box ref={calendarRef} sx={{ display: 'flex', position: 'relative', flexDirection: 'column' }}>
      {!!label && (
        <Typography
          variant='caption'
          sx={{ fontWeight: 400, fontSize: '14px', lineHeight: '24px', color: colors.grey[700] }}>
          <label>{label}</label>
        </Typography>
      )}

      {showCalendar && (
        <StyledCalendar>
          <DateTimePicker.DatePicker onChange={handleDateChange} initialValue={initialValue} />
        </StyledCalendar>
      )}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexGrow: 1,
          border: `1px solid ${colors.grey[300]}`,
          borderRadius: '12px',
          paddingRight: '12px',
          '> div': {
            flexGrow: 1
          }
        }}>
        <StyledInput
          value={value || ''}
          onFocus={handleShowCalendar}
          sx={{ flexGrow: 1, border: 'none', outline: 'none' }}
          placeholder={placeholder}
        />
        <CalenderButtonStyled onClick={handleShowCalendar}>
          <Icon name='calendar' />
        </CalenderButtonStyled>
      </Box>

      <Typography
        variant='caption'
        sx={{
          display: error ? 'flex' : 'none',
          alignItems: 'center',
          gap: '8px',
          color: colors.red[500],
          fontWeight: 400,
          fontSize: '12px'
        }}>
        <Icon name='error' w={16} h={16} />
        <span>{error}</span>
      </Typography>
    </Box>
  );
}
