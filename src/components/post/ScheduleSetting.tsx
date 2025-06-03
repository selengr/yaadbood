import { yupResolver } from '@hookform/resolvers/yup';
import { IconButton, Stack, Typography } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import React, { useMemo } from 'react';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { useContries } from '@/hooks/constants/useContriesCities';
import { setTweetData } from '@/redux/slices/tweetCreationSlice';
import { RootState } from '@/redux/store';

import Button from '../atoms/Button/Button';
import Dropdown from '../atoms/Dropdown';
import ArrowRightIcon from '../atoms/Icon/icons/ArrowRightIcon';

// Define your form data type
interface ScheduleFormData {
  date: Dayjs | null;
  time: Dayjs | null;
  timezone: string;
}

// Validation schema that accepts Dayjs objects
export const scheduleSchema = yup.object().shape({
  date: yup
    .mixed<Dayjs>()
    .required('Date is required')
    .test('is-dayjs', 'Invalid date', (value) =>
      Boolean(value && typeof value.isValid === 'function' && value.isValid())
    )
    .test('min-date', 'Date cannot be in the past', (value) =>
      Boolean(value && typeof value.isValid === 'function' && value.isValid() && value.toDate() >= new Date())
    ),
  time: yup
    .mixed<Dayjs>()
    .required('Time is required')
    .test('is-dayjs', 'Invalid time', (value) =>
      Boolean(value && typeof value.isValid === 'function' && value.isValid())
    ),
  timezone: yup.string().required('Timezone is required')
});

interface Props {
  onClose: () => void;
  schedule: boolean;
}

export default function ScheduleSetting({ schedule, onClose }: Props) {
  const dispatch = useDispatch();
  const tweetDraft = useSelector((state: RootState) => state.tweetCreation);
  const { data: countries } = useContries();

  const defaultValues = useMemo(
    () => ({
      date: tweetDraft.publish_date ? dayjs(tweetDraft.publish_date) : null,
      time: tweetDraft.publish_date ? dayjs(tweetDraft.publish_date) : null,
      timezone: tweetDraft.timezone || 'UTC+03:30'
    }),
    [tweetDraft.publish_date, tweetDraft.timezone]
  );

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<ScheduleFormData>({
    resolver: yupResolver(scheduleSchema) as Resolver<ScheduleFormData>,
    defaultValues
  });
  const { date, time, timezone } = watch();

  // Create a dynamically formatted string
  const formattedString = useMemo(() => {
    if (date && time && timezone) {
      // Combine date and time using Dayjs
      const combined = date.hour(time.hour()).minute(time.minute());
      // Format as "Thu, Dec 19, 5:00 AM"
      const formattedDate = combined.format('ddd, MMM D, h:mm A');

      // Map raw timezone values (e.g., "UTC+03:30") to friendly names
      const timezoneMapping: Record<string, string> = {
        'UTC+03:30': 'Iran Standard Time',
        'UTC+01:00': 'Central European Time'
        // Add more mappings as needed
      };

      const friendlyTimezone = timezoneMapping[timezone] || timezone;
      return `${formattedDate} ${friendlyTimezone}, based on your location`;
    }
    return '';
  }, [date, time, timezone]);

  // Dispatch update only when the user confirms
  const onFormSubmit = (data: ScheduleFormData) => {
    if (data.date && data.time) {
      const combinedDateTime = data.date.hour(data.time.hour()).minute(data.time.minute()).toISOString();
      dispatch(setTweetData({ publish_date: combinedDateTime, timezone: data.timezone }));
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Stack sx={{ width: { xs: '100%', md: '512px' } }} flexDirection='column' gap={2}>
        <div>
          <Typography variant='h6' fontWeight={500} fontSize='18px'>
            {`Select a date to make your content ${tweetDraft?.visibility?.toLowerCase()}`}
          </Typography>
          {/* Live formatted string */}
          {formattedString && (
            <Typography variant='subtitle1' fontSize='14px' sx={{ color: 'gray' }}>
              {formattedString}
            </Typography>
          )}
        </div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack direction='row' spacing={2}>
            <Controller
              name='date'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  {...field}
                  slotProps={{
                    textField: {
                      error: !!error,
                      helperText: error ? error.message : ''
                    }
                  }}
                />
              )}
            />

            <Controller
              name='time'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TimePicker
                  {...field}
                  slotProps={{
                    textField: {
                      error: !!error,
                      helperText: error ? error.message : ''
                    }
                  }}
                />
              )}
            />
          </Stack>
        </LocalizationProvider>

        <Controller
          name='timezone'
          control={control}
          render={({ field }) => (
            <Dropdown
              labelsx={{ color: 'gray.700', fontSize: '16px' }}
              selectedValues={field.value}
              errorMessage=''
              label='Time Zone'
              onSelect={(value) => field.onChange(value)}
              options={
                countries?.countries?.map((country) => ({
                  label: `${country?.capital} ${country?.timezone}`,
                  value: country?.timezone
                })) || []
              }
            />
          )}
        />

        <Stack flexDirection='row' alignItems='center'>
          <Typography color='gray.500' lineHeight='18px' variant='caption'>
            View all scheduled posts
          </Typography>
          <IconButton sx={{ svg: { width: '16px', height: '16px', stroke: 'gray' } }}>
            <ArrowRightIcon />
          </IconButton>
        </Stack>

        <Stack flexDirection='row' justifyContent='end' alignItems='center'>
          <Button
            type='submit'
            sx={{
              height: { xs: '40px', sm: '32px' },
              minHeight: '32px',
              fontWeight: 600,
              fontSize: { xs: '16px', sm: '12px' },
              width: { xs: '100%', sm: 'auto' },
              borderRadius: { xs: '12px', sm: 9999 }
            }}>
            Confirm
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
