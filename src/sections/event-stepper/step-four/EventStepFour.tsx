import { RHFCheckbox } from '@/components/hook-form';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const EventStepFour = ({ delta }: { delta: number }) => {
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
            borderRadius: 2,
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'start',
            flexDirection: 'column',
            bgcolor: (theme) => theme.palette.primary.lighter,
          }}
        >
          <>
            <Stack
              direction="column"
              sx={{
                display: 'flex',
                justifyContent: 'start',
              }}
            >
              <RHFCheckbox name="checkbox" label="پوشش زنده" />
            </Stack>
          </>
          <Typography variant="caption" sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}>
            پوشش زندتوضیح پوشش زنده، توضیح پوشش زنده، توضیح پوشش زنده، توضیح پوشش زنده، توضیح پوشش
            زنده، توضیح پوشش زنده،
          </Typography>
        </Box>
        <Box
          sx={{
            p: 2,
            my: 3,
            borderRadius: 2,
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'start',
            flexDirection: 'column',
            bgcolor: (theme) => theme.palette.primary.lighter,
          }}
        >
          <>
            <Stack
              direction="column"
              sx={{
                display: 'flex',
                justifyContent: 'start',
              }}
            >
              <RHFCheckbox name="checkbox" label="دریافت گزارش" />
            </Stack>
          </>
          <Typography variant="caption" sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}>
            توضیح دریافت گزارش، توضیح دریافت گزارش، توضیح دریافت گزارش، توضیح دریافت گزارش، توضیح
            دریافت گزارش، توضیح
          </Typography>
        </Box>
        <Box
          sx={{
            p: 2,
            my: 3,
            borderRadius: 2,
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'start',
            flexDirection: 'column',
            bgcolor: (theme) => theme.palette.primary.lighter,
          }}
        >
          <>
            <Stack
              direction="column"
              sx={{
                display: 'flex',
                justifyContent: 'start',
              }}
            >
              <RHFCheckbox name="checkbox" label="گفت و گو" />
            </Stack>
          </>
          <Typography variant="caption" sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}>
            توضیح گفت و گو و چت، توضیح گفت و گو و چت، توضیح گفت و گو و چت، توضیح گفت و گو و چت،
            توضیح گفت و گو و چت،
          </Typography>

          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            }}
          >
            <RHFCheckbox
              name="checkbox"
              sx={{ color: (theme) => theme.palette.grey[500] }}
              label="فیلتر کلمات نامناسب"
            />
            <RHFCheckbox
              name="checkbox"
              sx={{ color: (theme) => theme.palette.grey[500] }}
              label="نظارت بر پیام‌های ارسالی"
            />
            <RHFCheckbox
              name="checkbox"
              sx={{ color: (theme) => theme.palette.grey[500] }}
              label="ارسال مدیا"
            />
            <RHFCheckbox
              name="checkbox"
              sx={{ color: (theme) => theme.palette.grey[500] }}
              label="ارسال پیام صوتی"
            />
          </Box>
        </Box>
        <Box
          sx={{
            p: 2,
            my: 3,
            borderRadius: 2,
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'start',
            flexDirection: 'column',
            bgcolor: (theme) => theme.palette.primary.lighter,
          }}
        >
          <>
            <Stack
              direction="column"
              sx={{
                display: 'flex',
                justifyContent: 'start',
              }}
            >
              <RHFCheckbox name="checkbox" label="صوت پس زمینه" />
            </Stack>
          </>
          <Typography variant="caption" sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}>
            توضیح صوت پس زمینه، توضیح صوت پس زمینه، توضیح صوت پس زمینه
          </Typography>
        </Box>
        <Box
          sx={{
            p: 2,
            my: 3,
            borderRadius: 2,
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'start',
            flexDirection: 'column',
            bgcolor: (theme) => theme.palette.primary.lighter,
          }}
        >
          <>
            <Stack
              direction="column"
              sx={{
                display: 'flex',
                justifyContent: 'start',
              }}
            >
              <RHFCheckbox name="checkbox" label="ادعیه و ختم قرآن" />
            </Stack>
          </>
          <Typography variant="caption" sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}>
            توضیح گفت و گو و چت، توضیح گفت و گو و چت، توضیح گفت و گو و چت، توضیح گفت و گو و چت،
            توضیح گفت و گو و چت،
          </Typography>

          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            }}
          >
            <RHFCheckbox
              name="checkbox"
              sx={{ color: (theme) => theme.palette.grey[500] }}
              label="ابوحمزه ثمالی"
            />
            <RHFCheckbox
              name="checkbox"
              sx={{ color: (theme) => theme.palette.grey[500] }}
              label="دعای ۲"
            />
            <RHFCheckbox
              name="checkbox"
              sx={{ color: (theme) => theme.palette.grey[500] }}
              label="دعای ۳"
            />
          </Box>
        </Box>
      </motion.div>
    </div>
  );
};

export default EventStepFour;
