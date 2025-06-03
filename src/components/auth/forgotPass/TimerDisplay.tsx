import { Stack, Typography } from '@mui/material';

import ClockIcon from '@/components/atoms/Icon/icons/ClockIcon';

interface TimerDisplayProps {
  errors: { otp?: { message?: string } };
  minutes: number;
  seconds: number;
}

export const TimerDisplay = ({ errors, minutes, seconds }: TimerDisplayProps) => (
  <Stack
    alignItems='center'
    flexDirection='row'
    justifyContent='center'
    gap={1}
    height={4}
    aria-live='polite'
    role='timer'>
    {!errors.otp?.message ? (
      <>
        <ClockIcon aria-hidden='true' />
        <Typography
          sx={{ color: 'gray.600', fontWeight: 500, fontSize: '12px' }}
          aria-label={`${minutes} minutes and ${seconds} seconds remaining`}>
          {`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
        </Typography>
      </>
    ) : (
      <Typography variant='caption' sx={{ color: 'red.500', fontSize: '12px' }} role='alert'>
        {errors.otp?.message}
      </Typography>
    )}
  </Stack>
);
