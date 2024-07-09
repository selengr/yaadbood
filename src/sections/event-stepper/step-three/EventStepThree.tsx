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
  IconButton,
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

const OPTIONS_TEST = [{ name: 'میزبان' }, { name: 'میهان' }];

import { motion } from 'framer-motion';
import { RHFSelect, RHFTextField } from '@/components/hook-form';
import SvgColor from '@/components/svg-color/SvgColor';

const EventStepThree = ({ delta }: { delta: number }) => {
  return (
    <div>
      <motion.div
        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(5, 1fr)',
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
              سمت:
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
              نام :
            </Typography>
            <RHFTextField
              name="title"
              placeholder="مثلاً: علی علیزاده"
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
              عنوان:
            </Typography>
            <RHFTextField
              name="deadName"
              placeholder="مثلاً: برادر یا مجری"
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
              تلفن تماس:
            </Typography>
            <RHFTextField
              name="deadName"
              placeholder="مثلاً: برادر یا مجری"
              sx={{
                '& .MuiInputBase-colorPrimary': {
                  height: 55,
                },
              }}
            />
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'end',
              pb: 0.6,
            }}
          >
            {' '}
            <IconButton
              size="small"
              // onClick={togglePlayPause}
              sx={{
                p: 1.5,
                backgroundColor: 'rgba(44, 223, 201, 0.05)',
                borderRadius: 1,
                border: '1px solid #2CDFC9',
                '&:hover': {
                  // color: '#2CDFC9',
                },
              }}
            >
              <SvgColor
                src={`/assets/icons/svg/ic_uploader.svg`}
                // className={styles.forwardBackward}
                // onClick={backThirty}
                sx={{ color: '#2CDFC9' }}
              />
            </IconButton>
            <IconButton
              size="small"
              // onClick={togglePlayPause}
              sx={{
                p: 1.5,
                backgroundColor: 'rgba(250, 77, 86, 0.05)',
                borderRadius: 1,
                border: '1px solid #FA4D56',
                '&:hover': {
                  // color: '#FA4D56',
                },
              }}
            >
              <SvgColor src={`/assets/icons/svg/ic_trash.svg`} sx={{ color: '#FA4D56' }} />
            </IconButton>
            <IconButton
              size="small"
              // onClick={togglePlayPause}
              sx={{
                p: 1.5,
                backgroundColor: 'rgba(23, 88, 186, 0.05)',
                borderRadius: 1,
                border: '1px solid #1758BA',
                '&:hover': {
                  // color: '#1758BA',
                },
              }}
            >
              <SvgColor
                src={`/assets/icons/svg/ic_add.svg`}
                // className={styles.forwardBackward}
                // onClick={backThirty}
                sx={{ color: '#1758BA' }}
              />
            </IconButton>
          </Stack>
        </Box>

        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            // width : "80%"
          }}
          sx={{ pt: 3 }}
        >
          <Stack
            // gridColumn={8}
            direction="column"
            sx={{
              display: 'flex',
              justifyContent: 'start',
              // width : "80%"
            }}
          >
            <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}>
              پیام:
            </Typography>
            <RHFTextField
              name="title"
              placeholder="مثلاً: به رویداد ما خوش آمدید"
              sx={{
                '& .MuiInputBase-colorPrimary': {
                  height: 55,
                },
              }}
            />
          </Stack>
          <Stack
            direction="column"
            // gridColumn={4}
            sx={{
              display: 'flex',
              justifyContent: 'start',
            }}
          >
            <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}>
              رمز ورود:
            </Typography>
            <RHFTextField
              name="title"
              placeholder=""
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

export default EventStepThree;
