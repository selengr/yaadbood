import { IContentModel } from '@/@types/event_maker';
import ConfirmDialog from '@/components/confirm-dialog';
import { RHFCheckbox } from '@/components/hook-form';
import { Box, Button, Checkbox, Divider, Radio, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const EventStepSix = ({
  delta,
  control,
  watch,
  getValues,
  setValue,
}: {
  delta: number;
  control: any;
  watch: any;
  getValues: any;
  setValue: any;
}) => {
  return (
    // <ConfirmDialog
    //   open={true}
    //   onClose={() => console.log('object')}
    //   title="test"
    //   content={
    //     <>
    //       <Box
    //         sx={{
    //           display: 'flex',
    //           p: 3,
    //           flexDirection: 'column',
    //         }}
    //       >
    //         <Stack
    //           direction="column"
    //           sx={{
    //             display: 'flex',
    //             justifyContent: 'start',
    //           }}
    //         >
    //           <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[800], pb: 0 }}>
    //             test
    //           </Typography>
    //         </Stack>
    //       </Box>
    //     </>
    //   }
    //   cancelText="نه، منصرف شدم"
    //   action={
    //     <Button
    //       variant="contained"
    //       sx={{
    //         color: '#FFF',
    //         backgroundColor: (theme) => theme.palette.primary.main,
    //         '&:hover': {
    //           backgroundColor: (theme) => theme.palette.primary.main,
    //         },
    //       }}
    //       onClick={() => {
    //         // setOpenDialog(false);
    //       }}
    //     >
    //       افزودن
    //     </Button>
    //   }
    // />
    <></>
  );
};

export default EventStepSix;
