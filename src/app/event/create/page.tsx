import CustomizedSteppers from '@/sections/event-stepper/CustomizedStepper';
import { Box, Stack, Typography } from '@mui/material';

const page = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Stack
        sx={{
          width: '90%',
          borderRadius: 1,
          backgroundColor: '#F7F7FF',
        //   bgcolor: (theme) => theme.palette.background.paper,
          height: 70,
          marginTop: 5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="body1" color="#000000">
        یادبود جدید
        </Typography>
      </Stack>
      <CustomizedSteppers />
    </Box>
  );
};

export default page;
