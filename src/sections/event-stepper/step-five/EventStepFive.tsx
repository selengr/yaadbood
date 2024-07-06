import { RHFCheckbox } from '@/components/hook-form';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';

const EventStepFive = ({ delta }: { delta: number }) => {
  return (
    <div>
      <motion.div
        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <Box
          sx={{
            p: 3,
            my: 3,
            borderRadius: 3,
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'start',
            flexDirection: 'column',
            width: '100%',
            position: 'relative',
            bgcolor: (theme) => theme.palette.primary.lighter,
          }}
        >
          <Stack
            direction="row"
            sx={{
              display: 'flex',
              justifyContent: 'start',
              width: '100%',
              pb: 2,
            }}
          >
            <Typography variant="body2" sx={{ color: '#000' }}>
              عنوان یادبود:
            </Typography>
            <Typography variant="body2" sx={{ color: '#393939' }}>
              چهلمین روز درگذشت مهندس چیت چیان
            </Typography>
          </Stack>
          <Stack
            direction="row"
            sx={{
              display: 'flex',
              justifyContent: 'start',
              width: '100%',
            }}
          >
            <Typography variant="body2" sx={{ color: '#000' }}>
              زمان برگزاری:
            </Typography>
            <Typography variant="body2" sx={{ color: '#393939' }}>
              ۳ شهریورماه ۱۴۰۳ از ساعت ۱۴:۰۰ به مدت ۲ ساعت
            </Typography>
          </Stack>

          <Stack
            sx={{
              position: 'absolute',
              backgroundColor: 'white',
              width: 110,
              height: 110,
              right: 40,
              bottom: -40,
              borderRadius: '50px 50px 0 0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image src="/assets/images/svg/yaadboodPerson.svg" alt="ddl" width={90} height={90} />
          </Stack>
        </Box>
        <Box
          sx={{
            p: 2,
            my: 3,
            mt: 6,
            borderRadius: 3,
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'start',
            flexDirection: 'column',
            width: '100%',
            bgcolor: (theme) => theme.palette.primary.lighter,
          }}
        >
          <>
            <Stack
              direction="row"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <RHFCheckbox name="checkbox" label="پوشش زنده" />
              <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}>
                2,000,000 ریالء
              </Typography>
            </Stack>
            <Divider sx={{ mb: 2, width: '100%' }} />
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                flexDirection: 'column',
              }}
            >
              <Stack
                direction="row"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <RHFCheckbox name="checkbox" label="دریافت گزارش" />
                <Typography
                  variant="body2"
                  sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}
                >
                  2,000,000 ریالء
                </Typography>
              </Stack>
              <RHFCheckbox name="checkbox" sx={{ ml: 6 }} label="گزارش تفصیلی" />
            </Box>

            <Divider sx={{ mb: 2, pt: 1, width: '100%' }} />
            <Stack
              direction="row"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <RHFCheckbox name="checkbox" label="گفت و گو" />
              <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}>
                2,000,000 ریالء
              </Typography>
            </Stack>
            <Divider sx={{ mb: 2, pt: 1, width: '100%' }} />
            <Stack
              direction="row"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <RHFCheckbox name="checkbox" label="صوت پس زمینه" />
              <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}>
                0 ریالء
              </Typography>
            </Stack>
            <Divider sx={{ mb: 2, width: '100%' }} />
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                flexDirection: 'column',
              }}
            >
              <Stack
                direction="row"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <RHFCheckbox name="checkbox" label="گفت و گو" />
                <Typography
                  variant="body2"
                  sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}
                >
                  2,000,000 ریالء
                </Typography>
              </Stack>
              <RHFCheckbox name="checkbox" sx={{ ml: 6 }} label="فیلتر کلمات نامناسب" />
            </Box>
            <Divider sx={{ mb: 2, width: '100%' }} />
            <Stack
              direction="row"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <RHFCheckbox name="checkbox" label="زمان برگزاری: ۲ ساعت" />
              <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}>
                2 x 1,000,000 ریالء
              </Typography>
            </Stack>
          </>
        </Box>
      </motion.div>
    </div>
  );
};

export default EventStepFive;
