import { Box, Button } from '@mui/material';
import { toast } from 'react-toastify';

import { useNotInterestedUser } from '@/hooks/user/useNotInterestedUser';

import DotPulse from '../atoms/DotSpinner/style';

const NotinterestedBtn = ({ username }: { username: string }) => {
  const notInterestedUser = useNotInterestedUser({
    onSuccess: () => {
      toast.success('User not interested successfully');
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    }
  });

  return (
    <Box
      component={Button}
      onClick={() => notInterestedUser.mutate({ username })}
      disabled={notInterestedUser.isPending}
      sx={(theme) => ({
        fontSize: '14px',
        cursor: 'pointer',
        color: theme.palette.gray['600'],
        width: '220px',
        height: '52px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        padding: '12px',
        fontWeight: 400,
        textAlign: 'start'
      })}>
      {notInterestedUser?.isPending ? (
        <Box sx={{ padding: '4px 16px' }}>
          <DotPulse
            sx={{
              color: 'primary.main',
              '&::before': {
                color: 'primary.main'
              },
              '&::after': {
                color: 'primary.main'
              }
            }}
          />
        </Box>
      ) : (
        'Not interested'
      )}
    </Box>
  );
};

export default NotinterestedBtn;
