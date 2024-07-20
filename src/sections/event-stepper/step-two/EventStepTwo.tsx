'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
// types
import { IAudioContent } from '@/@types/event_maker';
// _mock
import { _mediaList } from '@/_mock/arrays/_yaadbood';

// components
import SvgColor from '@/components/svg-color';
import ConfirmDialog from '@/components/confirm-dialog';
import AudioPlayer from '@/components/audio-player/AudioPlayer';
import { RHFCheckbox, RHFTextField } from '@/components/hook-form';
import { UppyUploader } from '@/components/mresalatUploader/UppyUploader';
// hooks
import useResponsive from '@/hooks/useResponsive';
// services
import { callApiMediaList } from '@/services/apis/builder';
import { Box, Button, Checkbox, IconButton, Stack, Typography } from '@mui/material';

// --------------------------------------------------------
interface EventStepTwoProps {
  delta: number;
  setValue: (name: string, value: any) => void;
  watch: (name?: string) => any;
  getValues: any;
}
// --------------------------------------------------------

const EventStepTwo = ({ delta, setValue, watch, getValues }: EventStepTwoProps) => {
  const [mediaList, setMediaList] = useState<IAudioContent[]>([]);
  const [roomGallery, setRoomGallery] = useState<any[]>([1]);
  const [indexGallery, setIndexGallery] = useState<number>();
  const [addImage, setAddImage] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const isMobile = useResponsive('down', 'md');

  useEffect(() => {
    async function getMediaList() {
      //--------test
      setMediaList(_mediaList.content);
      //--------test
      try {
        let res = await callApiMediaList();
        setMediaList(res.data.content);
      } catch (error) {
        setMediaList(_mediaList.content);
      }
    }
    getMediaList();
  }, []);

  return (
    <div>
      <motion.div
        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <Box
          sx={{
            p: 3,
            my: 3,
            borderRadius: 3,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
            gap: 3,
            bgcolor: (theme) => theme.palette.primary.lighter,
          }}
        >
          {mediaList?.map((item: IAudioContent, index) => (
            <Stack
              // direction="row"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 3,
                width: '100%',
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              {isMobile && (
                <>
                  <Stack
                    // direction="row"
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'start',
                      width: '100%',
                    }}
                  >
                    <div className="flex flex-row items-center justify-center">
                      <Checkbox
                        value={item.name}
                        checked={getValues(`mediaList`).includes(item.id)}
                        onChange={(event: any) => {
                          const mediaList = getValues('mediaList');
                          if (event.target.checked) {
                            setValue('mediaList', [...mediaList, item.id]);
                          } else {
                            setValue(
                              'mediaList',
                              mediaList.filter((id: number) => id !== item.id)
                            );
                          }
                        }}
                      />

                      <Typography
                        variant="body1"
                        sx={{ color: (theme) => theme.palette.grey[800] }}
                      >
                        {item.name} {index}:
                      </Typography>
                    </div>

                    <AudioPlayer media={item} />
                  </Stack>
                </>
              )}
              {!isMobile && (
                <>
                  <Typography
                    variant="body1"
                    sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}
                  >
                    {item.name} {index}:
                  </Typography>

                  <AudioPlayer media={item} />

                  <Checkbox
                    value={item.name}
                    checked={getValues(`mediaList`).includes(item.id)}
                    onChange={(event: any) => {
                      const mediaList = getValues('mediaList');
                      if (event.target.checked) {
                        setValue('mediaList', [...mediaList, item.id]);
                      } else {
                        setValue(
                          'mediaList',
                          mediaList.filter((id: number) => id !== item.id)
                        );
                      }
                    }}
                  />
                </>
              )}
            </Stack>
          ))}
          <Stack
            direction="column"
            sx={{
              display: 'flex',
              justifyContent: 'start',
            }}
          >
            <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[800], pb: 0 }}>
              صوت اختصاصی:
            </Typography>

            <UppyUploader
              sx={{}}
              getData={(data: any) => {
                setValue('dedicatedSound', data);
              }}
              withoutCamera={true}
              // fileRestriction={}
            />
          </Stack>
        </Box>

        <Box
          sx={{
            p: 3,
            my: 3,
            borderRadius: 3,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
            gap: 3,
            bgcolor: (theme) => theme.palette.primary.lighter,
          }}
        >
          {roomGallery.map((item, index) => {
            let activeLine =
              getValues(`roomGalleryModelList.${index}.caption`)?.length > 0 ||
              getValues(`roomGalleryModelList.${index}.roomGalleryListModels.media_file`)?.length >
                0;
            let activeImage =
              getValues(`roomGalleryModelList.${index}.roomGalleryListModels.media_file`)?.length >
              0;
            return (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'end',
                    flexDirection: 'row',
                    width: '100%',
                    gap: 3,
                  }}
                >
                  <Stack
                    direction="column"
                    sx={{
                      display: 'flex',
                      justifyContent: 'start',
                      width: '80%',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}
                    >
                      شرح تصویر یا ویدیو:
                    </Typography>
                    <RHFTextField
                      name={`roomGalleryModelList.${index}.caption`}
                      placeholder=""
                      sx={{
                        '& .MuiInputBase-colorPrimary': {
                          height: 55,
                        },
                        '& input': {
                          borderStyle: 'dashed !important',
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
                        setIndexGallery(index);
                        setOpenDialog(true);
                      }}
                      sx={{
                        p: 1.5,
                        backgroundColor: 'rgba(44, 223, 201, 0.05)',
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
                        sx={{ color: activeImage ? '#2CDFC9' : '#A8A8A8' }}
                      />
                    </IconButton>
                    {/* <IconButton
              size="small"
              // onClick={togglePlayPause}
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
            </IconButton> */}
                    <IconButton
                      size="small"
                      disabled={!activeLine}
                      onClick={() => {
                        setRoomGallery((pre) => [...pre, index + 1]);
                      }}
                      sx={{
                        p: 1.5,
                        backgroundColor: activeLine ? 'rgba(23, 88, 186, 0.05)' : '#A8A8A8',
                        borderRadius: 1,
                        border: activeLine ? '1px solid #1758BA' : '1px solid #A8A8A8',
                        '&:hover': {
                          // color: '#1758BA',
                        },
                      }}
                    >
                      <SvgColor
                        src={`/assets/icons/svg/ic_add.svg`}
                        // className={styles.forwardBackward}
                        // onClick={backThirty}
                        sx={{ color: activeLine ? '#1758BA' : '#A8A8A8' }}
                      />
                    </IconButton>
                  </Stack>
                </Box>
              </>
            );
          })}
        </Box>
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

                  // fileRestriction={}
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
              //  handleDeleteRows(selected);
              //  handleCloseConfirm();
              setValue(
                `roomGalleryModelList.${indexGallery}.roomGalleryListModels.media_file`,
                addImage
              );
              setValue(
                `roomGalleryModelList.${indexGallery}.roomGalleryListModels.mediaTypeEnum`,
                'IMAGE'
              );
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

export default EventStepTwo;
