import { useState } from 'react';
// components
import { RHFTextField } from '@/components/hook-form';
import SvgColor from '@/components/svg-color/SvgColor';
import ConfirmDialog from '@/components/confirm-dialog/ConfirmDialog';
import { UppyUploader } from '@/components/mresalatUploader/UppyUploader';
// mui
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';

export const GalleryItem = ({
  item,
  index,
  setValue,
  getValues,
  roomGallery,
  setRoomGallery,
}: {
  item: any;
  index: number;
  roomGallery: any;
  getValues: (key?: string) => any;
  setRoomGallery: (gallery: any) => void;
  setValue: (name: string, value: any) => void;
}) => {
  const [addImage, setAddImage] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [indexGallery, setIndexGallery] = useState<number>();

  const caption = getValues(`roomGalleryModelList.${index}.caption`);
  const mediaFile = getValues(`roomGalleryModelList.${index}.roomGalleryListModels.media_file`);
  const activeLine = caption?.length > 0 || mediaFile?.length > 0;
  const activeImage = mediaFile?.length > 0;
  let activeAdd = roomGallery.length - 1;

  const handleDelete = (index: number) => {
    const values = getValues();
    const roomGalleryModelList = values.roomGalleryModelList.filter(
      (_: any, i: number) => i !== index
    );
    setValue('roomGalleryModelList', roomGalleryModelList);
    setRoomGallery(roomGallery.filter((_: number, i: number) => i !== index));
  };

  return (
    <Box
      key={Math.floor(Math.random() * 1)}
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
        <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}>
          شرح تصویر یا ویدیو:
        </Typography>
        <RHFTextField
          onChange={(e) => setValue(`roomGalleryModelList.${index}.caption`, e.target.value)}
          disabled={!activeImage}
          name={``}
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
            sx={{ color: activeImage ? '#2CDFC9' : '#A8A8A8' }}
          />
        </IconButton>

        {activeAdd === index && (
          <IconButton
            size="small"
            onClick={() => {
              setRoomGallery((pre: any) => [...pre, index + 1]);
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
      </Stack>

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
    </Box>
  );
};

// {roomGallery.map((item, index) => {
//   let activeLine =
//     getValues(`roomGalleryModelList.${index}.caption`)?.length > 0 ||
//     getValues(`roomGalleryModelList.${index}.roomGalleryListModels.media_file`)?.length >
//       0;
//   let activeImage =
//     getValues(`roomGalleryModelList.${index}.roomGalleryListModels.media_file`)?.length >
//     0;
//   return (
//     <>
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'end',
//           flexDirection: 'row',
//           width: '100%',
//           gap: 3,
//         }}
//       >
//         <Stack
//           direction="column"
//           sx={{
//             display: 'flex',
//             justifyContent: 'start',
//             width: '80%',
//           }}
//         >
//           <Typography
//             variant="body2"
//             sx={{ color: (theme) => theme.palette.grey[800], pb: 1 }}
//           >
//             شرح تصویر یا ویدیو:
//           </Typography>
//           <RHFTextField
//             name={`roomGalleryModelList.${index}.caption`}
//             placeholder=""
//             sx={{
//               '& .MuiInputBase-colorPrimary': {
//                 height: 55,
//               },
//               '& input': {
//                 borderStyle: 'dashed !important',
//               },
//             }}
//           />
//         </Stack>

//         <Stack
//           direction="row"
//           spacing={2}
//           sx={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'end',
//             pb: 0.6,
//           }}
//         >
//           {' '}
//           <IconButton
//             size="small"
//             onClick={() => {
//               setIndexGallery(index);
//               setOpenDialog(true);
//             }}
//             sx={{
//               p: 1.5,
//               backgroundColor: 'rgba(44, 223, 201, 0.05)',
//               borderRadius: 1,
//               border: activeImage ? '1px solid #2CDFC9' : '1px solid #A8A8A8',
//               '&:hover': {
//                 // color: '#2CDFC9',
//               },
//             }}
//           >
//             <SvgColor
//               src={`/assets/icons/svg/ic_uploader.svg`}
//               // className={styles.forwardBackward}
//               // onClick={backThirty}
//               sx={{ color: activeImage ? '#2CDFC9' : '#A8A8A8' }}
//             />
//           </IconButton>

//           <IconButton
//             size="small"
//             disabled={!activeLine}
//             onClick={() => {
//               setRoomGallery((pre) => [...pre, index + 1]);
//             }}
//             sx={{
//               p: 1.5,
//               backgroundColor: activeLine ? 'rgba(23, 88, 186, 0.05)' : '#A8A8A8',
//               borderRadius: 1,
//               border: activeLine ? '1px solid #1758BA' : '1px solid #A8A8A8',
//               '&:hover': {
//               },
//             }}
//           >
//             <SvgColor
//               src={`/assets/icons/svg/ic_add.svg`}

//               sx={{ color: activeLine ? '#1758BA' : '#A8A8A8' }}
//             />
//           </IconButton>
//         </Stack>
//       </Box>
//     </>
//   );
// })}
