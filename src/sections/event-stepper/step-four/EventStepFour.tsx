import { RHFCheckbox } from '@/components/hook-form';
import { Paper, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const EventStepFour = ({ delta }: { delta: number }) => {
  return (
    <div>
      <motion.div
        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <Paper
          sx={{
            p: 3,
            my: 3,
            width: '95%',
            minHeight: 120,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
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
              {/* <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}>
                پوشش زنده
              </Typography> */}
            </Stack>
          </>
          <Typography variant="caption" sx={{ color: (theme) => theme.palette.grey[500], pb: 1 }}>
            پوشش زندتوضیح پوشش زنده، توضیح پوشش زنده، توضیح پوشش زنده، توضیح پوشش زنده، توضیح پوشش
            زنده، توضیح پوشش زنده،
          </Typography>
        </Paper>
        EventStepFour fivekjfenf
      </motion.div>
    </div>
  );
};

export default EventStepFour;
