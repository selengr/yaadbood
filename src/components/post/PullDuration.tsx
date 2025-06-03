import { IconButton, Stack, Typography, useTheme } from '@mui/material';
import { useState } from 'react';

import Modal from '../atoms/Modal/Modal';
import TimeMenu from './TimeMenu';
import ArrowDown2Icon from '../atoms/Icon/icons/ArrowDown2Icon';

export default function PollDuration({
  pollDuration,
  setPollDuration
}: {
  pollDuration: string;
  setPollDuration: (value: string) => void;
}) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  // Handle selection change from TimeMenu
  const handleTimeChange = (time: string) => {
    setPollDuration(time);
    setOpen(false);
  };

  return (
    <Stack gap={0.5} mt={1}>
      <Typography variant='body1' color='gray.700' fontWeight={400} fontSize='14px'>
        Poll Duration
      </Typography>
      <Stack
        onClick={() => setOpen(true)}
        sx={{
          borderRadius: theme.spacing(1.5),
          border: `1px solid ${theme.palette.gray[200]}`,
          paddingX: theme.spacing(1),
          paddingY: theme.spacing(0.5)
        }}
        flexDirection='row'
        alignItems='center'
        justifyContent='space-between'>
        <Typography variant='body1' color='gray.700' fontWeight={400} fontSize='14px'>
          {pollDuration}
        </Typography>
        <IconButton
          sx={{
            svg: {
              width: '16px',
              height: '16px',
              stroke: theme.palette.gray[700]
            }
          }}>
          <ArrowDown2Icon />
        </IconButton>
      </Stack>
      <Typography variant='caption' color='gray.600' fontWeight={400} fontSize='14px' mt='4px'>
        We don’t allow requests for political opinions, medical information or other sensitive data.
      </Typography>
      <Modal title='Poll Duration' open={open} closeOnOutsideClick onClose={() => setOpen(false)}>
        <TimeMenu value={pollDuration} onChange={handleTimeChange} />
      </Modal>
    </Stack>
  );
}
