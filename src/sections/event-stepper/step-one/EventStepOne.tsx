// mui
import { Box, Divider, MenuItem, Stack, Typography } from '@mui/material';

import dayjs from 'dayjs';

// other
import { motion } from 'framer-motion';

// mui
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';

// components
import { DatePickerMui } from '@/components/datePicker/DatePickerMui';
import { UppyUploader } from '@/components/mresalatUploader/UppyUploader';
import { RHFSelect, RHFTextField } from '@/components/hook-form';
import { useEffect, useState } from 'react';
import { _dataList } from '@/_mock/arrays/_yaadbood';
import { callApiRoomType } from '@/services/apis/builder';
import { IRoomTypeEnum } from '@/@types/event_maker';

// --------------------------------------------------------
const OPTIONS_TEST = [{ name: 'FUNERAL', label: 'مجلس ترحیم' }];
const CEREMONY_DURATION = [
  // { id: 1, value: '30دقیقه' },
  { id: 1, value: 'ساعت1' },
  { id: 2, value: 'ساعت2' },
  { id: 3, value: '3ساعت' },
  { id: 4, value: '4ساعت' },
];

interface EventStepOneProps {
  delta: number;
  setValue: (name: string, value: any) => void;
  errors: any;
}

// --------------------------------------------------------
const EventStepOne = ({ delta, setValue, errors }: EventStepOneProps) => {
  const [dataListCombo, setDataListCombo] = useState<IRoomTypeEnum[]>([]);

  useEffect(() => {
    async function getMediaList() {
      //--------test
      // setDataListCombo(_dataList.dataList);
      //--------test
      try {
        let res = await callApiRoomType();
        setDataListCombo(res.data.dataList);
      } catch (error) {
        // setDataListCombo(_dataList.dataList);
      }
    }
    getMediaList();
  }, []);

  // _dataList
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
            // md: 'repeat(3, 1fr)',
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
              placeholder="مثلاً: مراسم بزرگداشت شهید شریعتی"
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

            <RHFSelect name="roomTypeEnum">
              <MenuItem sx={{ direction: 'ltr !important' }} value="">
                یک گزینه انتخاب کنید
              </MenuItem>
              <Divider sx={{ borderStyle: 'dashed' }} />
              {dataListCombo.map((option: IRoomTypeEnum) => (
                <MenuItem
                  sx={{
                    direction: 'ltr !important',
                  }}
                  key={option.caption}
                  value={option.caption}
                >
                  {option.caption}
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
              نام متوفی/بزرگداشت/یادبود:
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
          <Stack
            direction="column"
            sx={{
              display: 'flex',
              justifyContent: 'start',
            }}
          >
            <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[800], pb: 0 }}>
              تصویر متوفی/بزرگداشت/یادبود:
            </Typography>

            <UppyUploader
              sx={{}}
              getData={(data: any) => {
                setValue('deadImg', data);
              }}
            />
            <span style={{ fontSize: '12px', color: '#D21425' }}>
              {errors.deadImg ? errors.deadImg.message : ''}
            </span>
          </Stack>
        </Box>
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
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
              توضیحات:
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
                  key={option.id}
                  value={option.id}
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
                disablePast={true}
                onChange={(date: any) => {
                  // let val = new Date(date).toISOString().split('T')[0].toString();
                  const result = {
                    year: date.getFullYear() - 621, // subtract 621 to get the Persian year (e.g., 1402)
                    month: date.getMonth() + 1, // getMonth() returns 0-based month, so add 1
                    day: date.getDate(),
                  };
                  setValue('date', result);
                }}
                placeholder="تاریخ برگزاری:"
              />
            </LocalizationProvider>
            <span style={{ fontSize: '12px', color: '#D21425', paddingTop: '5px' }}>
              {errors.date ? errors.date.message : ''}
            </span>
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
            {/* <RHFTextField
              name="startTime"
              sx={{
                '& .MuiInputBase-colorPrimary': {
                  height: 55,
                },
              }}
            /> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileTimePicker
                defaultValue={dayjs()}
                localeText={{
                  okButtonLabel: 'ثبت',
                  cancelButtonLabel: 'انصراف',
                  toolbarTitle: 'ساعت',
                }}
                onChange={(time: any) => {
                  const formattedTime = dayjs(time).format('HH:mm');
                  setValue('startTime', formattedTime);
                }}
              />
            </LocalizationProvider>
            <span style={{ fontSize: '12px', color: '#D21425', paddingTop: '5px' }}>
              {errors.startTime ? errors.startTime.message : ''}
            </span>
          </Stack>
        </Box>
      </motion.div>
    </div>
  );
};

export default EventStepOne;
