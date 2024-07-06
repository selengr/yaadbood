import { RHFCheckbox } from '@/components/hook-form';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

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
            p: 2,
            my: 3,
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
