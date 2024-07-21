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
import { GalleryItem } from './GalleryItem';

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

  const isMobile = useResponsive('down', 'md');

  useEffect(() => {
    async function getMediaList() {
      //--------test
      // setMediaList(_mediaList.content);
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
              fileRestriction={{ allowedFileTypes: ['mp3'] }}
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
          {roomGallery.map((item, index) => (
            <GalleryItem
              key={index}
              item={item}
              index={index}
              getValues={getValues}
              setValue={setValue}
              roomGallery={roomGallery}
              setRoomGallery={setRoomGallery}
            />
          ))}
        </Box>
      </motion.div>
    </div>
  );
};

export default EventStepTwo;
