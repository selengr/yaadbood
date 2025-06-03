import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';

export const Main = (props: PropsWithChildren) => {
  return (
    <Box sx={{ marginTop: '75px', marginBottom: '20px' }} component='main'>
      {props.children}
    </Box>
  );
};
