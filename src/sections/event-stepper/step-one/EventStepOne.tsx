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

const OPTIONS_TEST = [{ name: 'test1' }, { name: 'test2' }, { name: 'test3' }];

// other
import { motion } from 'framer-motion';

// components
import { RHFRadioGroup, RHFSelect, RHFTextField } from '@/components/hook-form';

// sections

const EventStepOne = ({ delta }: { delta: number }) => {
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
              name="insuranceTitle"
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

            <RHFSelect name="areaId" placeholder="مجلس ترحیم">
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
              name="insuranceTitle"
              placeholder="مثلاً: اسماعیل چیت چیان"
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
