import { useState } from 'react';

// mui
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogTitle,
  Divider,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Rating,
  Stack,
  Typography,
} from '@mui/material';

import { DatePickerMui } from '@/components/datePicker/DatePickerMui';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';

const OPTIONS_TEST = [{ name: 'FUNERAL' }, { name: 'test2' }, { name: 'test3' }];
const CEREMONY_DURATION = [
  { id: 1, value: '30دقیقه' },
  { id: 1, value: 'ساعت1' },
  { id: 1, value: 'ساعت2' },
  { id: 1, value: '3ساعت' },
  { id: 1, value: '4ساعت' },
];

// other
import { motion } from 'framer-motion';

// components
import { RHFRadioGroup, RHFSelect, RHFTextField } from '@/components/hook-form';

// sections

const EventStepOne = ({ delta, setValue }: { delta: number; setValue: any }) => {
  return (
    <div className="flex w-full items-end flex-col">
      <motion.div
        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ width: '100%' }}
      >
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
          sx={{ pt: 3 }}
        >
          <Stack
            direction="column"
            sx={{
              display: 'flex',
              justifyContent: 'start',
            }}
          >
            <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}>
              نام یادبود:
            </Typography>
            <RHFTextField
              name="title"
              placeholder="مجلس ترحیم"
              sx={{
                '& .MuiInputBase-colorPrimary': {
                  height: 55,
                },
              }}
            />
          </Stack>
          <Stack
            direction="column"
            sx={{
              display: 'flex',
              justifyContent: 'start',
            }}
          >
            <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}>
              نوع یادبود:
            </Typography>

            <RHFSelect name="roomTypeEnum" placeholder="مجلس ترحیم">
              <MenuItem sx={{ direction: 'ltr !important' }} value="">
                یک گزینه انتخاب کنید
              </MenuItem>
              <Divider sx={{ borderStyle: 'dashed' }} />
              {OPTIONS_TEST.map((option) => (
                <MenuItem
                  sx={{
                    direction: 'ltr !important',
                  }}
                  key={option.name}
                  value={option.name}
                >
                  {option.name}
                </MenuItem>
              ))}
            </RHFSelect>
          </Stack>

          <Stack
            direction="column"
            sx={{
              display: 'flex',
              justifyContent: 'start',
            }}
          >
            <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}>
              نام متوفی:
            </Typography>
            <RHFTextField
              name="deadName"
              placeholder="مثلاً: اسماعیل چیت چیان"
              sx={{
                '& .MuiInputBase-colorPrimary': {
                  height: 55,
                },
              }}
            />
          </Stack>
        </Box>
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
          }}
          sx={{ pt: 3 }}
        >
          <Stack
            direction="column"
            sx={{
              display: 'flex',
              justifyContent: 'start',
            }}
          >
            <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}>
              درباره متوفی:
            </Typography>
            <RHFTextField
              name="deadAbout"
              rows={3}
              multiline={true}
              placeholder="مثلاً: پدری مهربان و دلسوز، استاد دانشگاه و ... ."
            />
          </Stack>
        </Box>
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
          sx={{ pt: 3 }}
        >
          <Stack
            direction="column"
            sx={{
              display: 'flex',
              justifyContent: 'start',
            }}
          >
            <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}>
              مدت زمان برگزاری:
            </Typography>
            <RHFSelect name="ceremonyDuration" placeholder="مجلس ترحیم">
              <MenuItem sx={{ direction: 'ltr !important' }} value="">
                یک گزینه انتخاب کنید
              </MenuItem>
              <Divider sx={{ borderStyle: 'dashed' }} />
              {CEREMONY_DURATION.map((option) => (
                <MenuItem
                  sx={{
                    direction: 'ltr !important',
                  }}
                  key={option.value}
                  value={option.value}
                >
                  {option.value}
                </MenuItem>
              ))}
            </RHFSelect>
          </Stack>
          <Stack
            direction="column"
            sx={{
              display: 'flex',
              justifyContent: 'start',
            }}
          >
            <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}>
              تاریخ برگزاری:
            </Typography>
            {/* <RHFTextField
              name="date"
              sx={{
                '& .MuiInputBase-colorPrimary': {
                  height: 55,
                },
              }}
            /> */}

            <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
              <DatePickerMui
                onChange={(date: any) => {
                  let val = new Date(date).toISOString().split('T')[0].toString();

                  setValue('date', val);
                }}
                // onChange={(date: any) => {
                //   setValue('date', new Date(date).toISOString().split('T')[0].toString())
                // }}
                placeholder="تاریخ برگزاری:"
              />
            </LocalizationProvider>
          </Stack>

          <Stack
            direction="column"
            sx={{
              display: 'flex',
              justifyContent: 'start',
            }}
          >
            <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}>
              ساعت برگزاری:
            </Typography>
            <RHFTextField
              name="startTime"
              sx={{
                '& .MuiInputBase-colorPrimary': {
                  height: 55,
                },
              }}
            />
          </Stack>
        </Box>
      </motion.div>
    </div>
  );
};

export default EventStepOne;
