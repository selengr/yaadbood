import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { useReportUser } from '@/hooks/user';

import Button from '../atoms/Button/Button';
import DotPulse from '../atoms/DotSpinner/style';
import Modal from '../atoms/Modal/Modal';

const catOptions = [
  'Harassment',
  'Fraud or scam',
  'Spam',
  'Misinformation',
  'Hateful speech',
  'Threats or violence',
  'Self-harm',
  'Graphic content',
  'Dangerous or extremist organization',
  'Sexual content',
  'Fake account',
  'Hacked account',
  'Child exploiting',
  'Illegal goods and services',
  'Infringement'
];

const ReportUserModal = ({ username }: { username: string }) => {
  const [contactModal, setContactModal] = useState(false);
  const [cat, setCat] = useState<string>();

  const reportUser = useReportUser({
    onSuccess: () => {
      toast.success('Thanks for your report!');
      setContactModal(false);
      setCat(undefined);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    }
  });
  return (
    <>
      <Box
        onClick={() => setContactModal(true)}
        sx={(theme) => ({
          fontSize: '14px',
          cursor: 'pointer',
          color: theme.palette.gray['600'],
          width: '220px',
          height: '52px',
          display: 'flex',
          alignItems: 'center',
          padding: '12px'
        })}>
        Report
      </Box>
      <Modal open={contactModal} onClose={() => setContactModal(false)} title='Report this profile'>
        <Box
          sx={{
            width: { xs: '100%', md: '420px' },
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}>
          <Typography
            sx={(theme) => ({ fontSize: '16px', fontWeight: 500, color: theme.palette.gray['700'] })}>
            Select our policy that applies
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {catOptions?.map((catOption) => (
              <Button
                onClick={() => setCat(catOption)}
                variant={cat === catOption ? 'contained' : 'outlined'}
                color={cat === catOption ? 'primary.500' : 'gray.500'}
                key={catOption}
                pill
                sx={{ height: '32px', minHeight: '32px', px: '12px', fontSize: '12px' }}>
                {catOption}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: 'flex', alignSelf: 'end', gap: '10px' }}>
            <Button
              onClick={() => setContactModal(false)}
              pill
              variant='outlined'
              color='#1DA1F3'
              sx={{ height: '32px', minHeight: '32px', px: '12px', fontSize: '12px' }}>
              Cancel
            </Button>
            <Button
              pill
              onClick={() => cat && reportUser.mutate({ username, cat })}
              disabled={reportUser?.isPending || !cat}
              sx={{ height: '32px', minHeight: '32px', px: '12px', fontSize: '12px' }}>
              {reportUser?.isPending ? (
                <Box sx={{ padding: '4px 16px' }}>
                  <DotPulse />
                </Box>
              ) : (
                'Submit Report'
              )}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ReportUserModal;
