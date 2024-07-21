import { useState } from 'react';

// mui
import { Box, Button, Divider, IconButton, MenuItem, Stack, Typography } from '@mui/material';

import { motion } from 'framer-motion';
// components
import ConfirmDialog from '@/components/confirm-dialog';
import SvgColor from '@/components/svg-color/SvgColor';
import { RHFSelect, RHFTextField } from '@/components/hook-form';
import { UppyUploader } from '@/components/mresalatUploader/UppyUploader';

// --------------------------------------------------------
const OPTIONS_POST_TYPE = [
  { name: 'HOST', label: 'میزبان' },
  { name: 'GUEST', label: 'میهان' },
];
interface EventStepThreeProps {
  delta: number;
  setValue: (name: string, value: any) => void;
  watch: (name?: string) => any;
  getValues: any;
  unregister: (name: string) => void;
  control: { [key: string]: any };
}
// --------------------------------------------------------

const EventStepThree = ({
  delta,
  setValue,
  watch,
  getValues,
  unregister,
  control,
}: EventStepThreeProps) => {
  const [indexPresenters, setIndexPresenters] = useState<number>();
  const [addImage, setAddImage] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [PresentersList, setPresentersList] = useState<any[]>([1]);

  const handleDelete = (index: number) => {
    const values = getValues();
    const newRoomSpecialFriendsModelList = values.roomSpecialFriendsModelList.filter(
      (_: any, i: number) => i !== index
    );
    setValue('roomSpecialFriendsModelList', newRoomSpecialFriendsModelList);
    setPresentersList(PresentersList.filter((_, i) => i !== index));
  };

  return (
    <div>
      <motion.div
        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {PresentersList.map((item, index) => {
          let activeAdd = PresentersList.length - 1;
          let activeImage = getValues(`roomSpecialFriendsModelList.${index}.img`)?.length > 0;
          return (
            <>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  lg: 'repeat(5, 1fr)',
                }}
                sx={{ pt: 3 }}
              >
                <Stack
                  direction="column"
                  sx={{
                    display: 'flex',
                    justifyContent: 'start',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}
                  >
                    سمت:
                  </Typography>

                  <RHFSelect
                    name={`roomSpecialFriendsModelList.${index}.postTypeEnum`}
                    placeholder="یک گزینه انتخاب کنید"
                  >
                    <MenuItem sx={{ direction: 'ltr !important' }} value="">
                      یک گزینه انتخاب کنید
                    </MenuItem>
                    <Divider sx={{ borderStyle: 'dashed' }} />
                    {OPTIONS_POST_TYPE.map((option) => (
                      <MenuItem
                        sx={{
                          direction: 'ltr !important',
                        }}
                        key={option.name}
                        value={option.name}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                </Stack>
                <Stack
                  direction="column"
                  sx={{
                    display: 'flex',
                    justifyContent: 'start',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}
                  >
                    نام :
                  </Typography>
                  <RHFTextField
                    name={`roomSpecialFriendsModelList.${index}.name`}
                    placeholder="مثلاً: علی علیزاده"
                    sx={{
                      '& .MuiInputBase-colorPrimary': {
                        height: 55,
                      },
                    }}
                  />
                </Stack>

                <Stack
                  direction="column"
                  sx={{
                    display: 'flex',
                    justifyContent: 'start',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}
                  >
                    عنوان:
                  </Typography>
                  <RHFTextField
                    name={`roomSpecialFriendsModelList.${index}.relationshipType`}
                    placeholder="مثلاً: برادر یا مجری"
                    sx={{
                      '& .MuiInputBase-colorPrimary': {
                        height: 55,
                      },
                    }}
                  />
                </Stack>
                <Stack
                  direction="column"
                  sx={{
                    display: 'flex',
                    justifyContent: 'start',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}
                  >
                    تلفن تماس:
                  </Typography>
                  <RHFTextField
                    name={`roomSpecialFriendsModelList.${index}.phoneNumber`}
                    sx={{
                      '& .MuiInputBase-colorPrimary': {
                        height: 55,
                      },
                    }}
                  />
                </Stack>

                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'end',
                    pb: 0.6,
                  }}
                >
                  {' '}
                  <IconButton
                    size="small"
                    onClick={() => {
                      setIndexPresenters(index);
                      setOpenDialog(true);
                    }}
                    sx={{
                      p: 1.5,
                      backgroundColor: activeImage ? 'rgba(23, 88, 186, 0.05)' : '',
                      borderRadius: 1,
                      border: activeImage ? '1px solid #2CDFC9' : '1px solid #A8A8A8',
                      '&:hover': {
                        // color: '#2CDFC9',
                      },
                    }}
                  >
                    <SvgColor
                      src={`/assets/icons/svg/ic_uploader.svg`}
                      // className={styles.forwardBackward}
                      // onClick={backThirty}
                      sx={{ color: '#2CDFC9' }}
                    />
                  </IconButton>
                  {activeAdd !== index && (
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(index)}
                      sx={{
                        p: 1.5,
                        backgroundColor: 'rgba(250, 77, 86, 0.05)',
                        borderRadius: 1,
                        border: '1px solid #FA4D56',
                        '&:hover': {
                          // color: '#FA4D56',
                        },
                      }}
                    >
                      <SvgColor src={`/assets/icons/svg/ic_trash.svg`} sx={{ color: '#FA4D56' }} />
                    </IconButton>
                  )}
                  {activeAdd === index && (
                    <IconButton
                      size="small"
                      onClick={() => {
                        setPresentersList((pre) => [...pre, index + 1]);
                      }}
                      sx={{
                        p: 1.5,
                        backgroundColor: 'rgba(23, 88, 186, 0.05)',
                        borderRadius: 1,
                        border: '1px solid #1758BA',
                        '&:hover': {
                          // color: '#1758BA',
                        },
                      }}
                    >
                      <SvgColor src={`/assets/icons/svg/ic_add.svg`} sx={{ color: '#1758BA' }} />
                    </IconButton>
                  )}
                </Stack>
              </Box>

              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  // width : "80%"
                }}
                sx={{ pt: 3 }}
              >
                <Stack
                  // gridColumn={8}
                  direction="column"
                  sx={{
                    display: 'flex',
                    justifyContent: 'start',
                    // width : "80%"
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}
                  >
                    پیام:
                  </Typography>
                  <RHFTextField
                    name={`roomSpecialFriendsModelList.${index}.massage`}
                    placeholder="مثلاً: به رویداد ما خوش آمدید"
                    sx={{
                      '& .MuiInputBase-colorPrimary': {
                        height: 55,
                      },
                    }}
                  />
                </Stack>

                <Stack
                  direction="column"
                  // gridColumn={4}
                  sx={{
                    display: 'flex',
                    justifyContent: 'start',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}
                  >
                    رمز ورود:
                  </Typography>
                  <RHFTextField
                    name={`roomSpecialFriendsModelList.${index}.password`}
                    placeholder=""
                    sx={{
                      '& .MuiInputBase-colorPrimary': {
                        height: 55,
                      },
                    }}
                  />
                </Stack>
              </Box>
            </>
          );
        })}
      </motion.div>

      <ConfirmDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        title="افزودن تصویر"
        content={
          <>
            <Box
              sx={{
                display: 'flex',
                p: 3,
                flexDirection: 'column',
              }}
            >
              <Stack
                direction="column"
                sx={{
                  display: 'flex',
                  justifyContent: 'start',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: (theme) => theme.palette.grey[800], pb: 0 }}
                >
                  تصویر:
                </Typography>

                <UppyUploader
                  sx={{}}
                  getData={(data: any) => {
                    setAddImage(data);
                  }}
                  withoutCamera={true}
                />
              </Stack>
            </Box>
          </>
        }
        cancelText="نه، منصرف شدم"
        action={
          <Button
            variant="contained"
            sx={{
              color: '#FFF',
              backgroundColor: (theme) => theme.palette.primary.main,
              '&:hover': {
                backgroundColor: (theme) => theme.palette.primary.main,
              },
            }}
            onClick={() => {
              setValue(`roomSpecialFriendsModelList.${indexPresenters}.img`, addImage);
              setOpenDialog(false);
            }}
          >
            افزودن
          </Button>
        }
      />
    </div>
  );
};

export default EventStepThree;
