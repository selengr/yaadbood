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
  Radio,
  RadioGroup,
  Rating,
  Stack,
  Typography,
} from '@mui/material';

// other
import { motion } from 'framer-motion';

// components
import { RHFRadioGroup } from '@/components/hook-form';

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
            lg: 'repeat(4, 1fr)',
          }}
          sx={{ direction: 'rtl', pt: 3 }}
        >
          <Stack
            direction="row"
            sx={{
              display: 'flex',
              justifyContent: 'start',
            }}
          >
            <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[500] }}>
              شناسه :
            </Typography>
            <Typography sx={{ color: (theme) => theme.palette.grey[700] }} variant="body2">
              &nbsp; {'---'}
            </Typography>
          </Stack>
        </Box>
      </motion.div>
    </div>
  );
};

export default EventStepOne;
