import CustomizedSteppers from '@/sections/event-stepper/CustomizedStepper';
import { Box, Paper, Stack, Typography } from '@mui/material';

const page = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
      }}
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
          // bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12)
        }}
      >
        <Stack
          sx={{
            width: '100%',
            borderRadius: 1,
            backgroundColor: '#F7F7FF',
            //   bgcolor: (theme) => theme.palette.background.paper,
            height: 70,
            // marginTop: 1,
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
      </Paper>
    </Box>
  );
};

export default page;
