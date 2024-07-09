'use client';

import AudioPlayer from '@/components/audio-player/AudioPlayer';
import { RHFCheckbox } from '@/components/hook-form';
import useResponsive from '@/hooks/useResponsive';
import { Box, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const EventStepTwo = ({ delta }: { delta: number }) => {
  const isMobile = useResponsive('down', 'sm');

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
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
            gap: 3,
            bgcolor: (theme) => theme.palette.primary.lighter,
          }}
        >
          {[1, 2, 3].map((item, index) => (
            <Stack
              // direction="row"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 3,
                width: '100%',
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              {isMobile && (
                <>
                  <Stack
                    // direction="row"
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'start',
                      width: '100%',
                    }}
                  >
                    <div className="flex flex-row items-center justify-center">
                      <RHFCheckbox name="checkbox" label="" />
                      <Typography
                        variant="body1"
                        sx={{ color: (theme) => theme.palette.grey[800] }}
                      >
                        صوت شماره {index}:
                      </Typography>
                    </div>

                    <AudioPlayer />
                  </Stack>
                </>
              )}
              {!isMobile && (
                <>
                  <Typography
                    variant="body1"
                    sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}
                  >
                    صوت شماره {index}:
                  </Typography>

                  <AudioPlayer />

                  <RHFCheckbox name="checkbox" label="" />
                </>
              )}
            </Stack>
          ))}
        </Box>
      </motion.div>
    </div>
  );
};

export default EventStepTwo;
