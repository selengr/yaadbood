
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { enqueueSnackbar } from 'notistack';
import Iconify from '@/components/iconify/Iconify';
import SvgColor from '@/components/svg-color/SvgColor';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  IconButton,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'true',
    icon: <Iconify icon="eva:heart-fill" width={24} />,
    label: 'خصوصی',
  },
  {
    value: 'false',
    icon: <Iconify icon="eva:phone-call-fill" width={24} />,
    label: 'عمومی',
  },
];
// ----------------------------------------------------------------------

const EventStepSixModal = ({
  handleNext,
  openDialog,
  setValue,
  setLoading,
  loading,
}: {
  handleNext: any;
  openDialog: any;
  setValue: any;
  setLoading: any;
  loading: any;
}) => {
  const [currentTab, setCurrentTab] = useState('false');

  const [link, setLink] = useState('https://mresalat.ir/yaadbood/event/1');

  const { copy } = useCopyToClipboard();

  const onCopy = (text: string) => {
    if (text) {
      copy(text);
      enqueueSnackbar('کپی انجام شد', { variant: 'default' });
    }
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={openDialog}
        //  onClose={handleCloseConfirm}
        sx={{
          borderRadius: 5,
          '& .MuiDialog-container': {
            backdropFilter: 'blur(4px)',
            backgroundColor: 'hsl(0deg 0% 100% / 50%)',
          },
        }}
      >
        <>
          <Box
            sx={{
              display: 'flex',
              p: 3,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Stack
              spacing={2}
              direction="row"
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                mb: 3,
              }}
            >
              <Tabs
                value={currentTab}
                onChange={(event, newValue) => {
                  setCurrentTab(newValue);
                  setValue('isPrivate', JSON.parse(newValue));
                  if (newValue) {
                    setValue('privateLink', link);
                  } else {
                    setValue('publicLink', link);
                    setValue('privateLoggedInId', '');
                    setValue('privatePassword', '');
                  }
                }}
                sx={{
                  border: '1px solid #DDE1E6',
                  borderRadius: 2,
                  minWidth: 190,
                  maxWidth: 200,
                  p: 1,
                  mx: 0,
                }}
                scrollButtons={false}
              >
                {TABS.slice(0, 3).map((tab) => (
                  <Tab
                    defaultValue={'false'}
                    key={tab.value}
                    label={tab.label}
                    value={tab.value}
                    sx={{
                      borderRadius: 2,
                      margin: 0,
                      // height : '30px !important',
                      '&.MuiTab-root': {
                        border: 'none',
                        transition: '#1758BA 0.2s ease-in-out',
                        margin: 0,
                        // height : '30px !important',
                        color: '#161616',
                        width: '49%',
                        fontWeight: 400,
                      },

                      '&.MuiButtonBase-root': {
                        // height : '30px !important',
                      },
                      '&.MuiTab-root.Mui-selected': {
                        backgroundColor: '#1758BA',
                        color: 'white',
                        border: 'none !important',
                        margin: 0,
                        width: '49%',
                        height: '30px !important',
                      },
                      '&.MuiTabs-indicator': {
                        display: 'none !important',
                        height: 0,
                      },
                      '&.rtl-1ckgshk-MuiTabs-indicator': {
                        display: 'none !important',
                        height: 0,
                      },
                    }}
                  />
                ))}
              </Tabs>
              <TextField
                name={`publicLink`}
                placeholder=""
                // onClick={()=>setValue('isPrivate',  JSON.parse(newValue))}
                disabled={true}
                value={link}
                sx={{
                  width: '100%',
                  '& .MuiInputBase-colorPrimary': {
                    height: 65,
                  },
                  '& input': {
                    borderStyle: 'dashed !important',
                  },
                }}
              />
              <IconButton
                size="small"
                onClick={() => {
                  onCopy(link);
                }}
                sx={{
                  p: 1.5,
                  backgroundColor: 'rgba(23, 88, 186, 0.05)',
                  borderRadius: 1,
                  border: '1px solid #1758BA',
                  '&:hover': {
                    // color: '#2CDFC9',
                  },
                }}
              >
                <SvgColor
                  src={`/assets/icons/svg/ic_share.svg`}
                  // className={styles.forwardBackward}
                  sx={{ color: '#1758BA', mx: 1 }}
                />
              </IconButton>
            </Stack>

            {currentTab === 'true' && (
              <Stack sx={{ display: 'flex', flexDirection: 'column', width: '100%' }} spacing={2}>
                <TextField
                  name={`publicLink`}
                  placeholder="شماره همراه یا شناسه ورود"
                  onChange={(e) => setValue('privateLoggedInId', e.target.value)}
                  sx={{
                    mt: 3,
                    mb: 2,
                    width: '100%',
                    '& .MuiInputBase-colorPrimary': {
                      height: 55,
                    },
                    '& input': {
                      borderStyle: 'dashed !important',
                    },
                  }}
                />
                <TextField
                  name={`publicLink`}
                  placeholder="رمز عبور"
                  onChange={(e) => setValue('privatePassword', e.target.value)}
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-colorPrimary': {
                      height: 55,
                    },
                    '& input': {
                      borderStyle: 'dashed !important',
                    },
                  }}
                />
              </Stack>
            )}

            <LoadingButton
              onClick={() => handleNext('link')}
              variant="contained"
              loading={loading}
              sx={{
                maxWidth: 200,
                width: 180,
                py: 2,
                mt: 2,
                color: '#FFF',
                fontWeight: 400,
                backgroundColor: (theme) => theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.primary.main,
                },
              }}
            >
              تایید
            </LoadingButton>
          </Box>
        </>
      </Dialog>
    </>
  );
};

export default EventStepSixModal;
