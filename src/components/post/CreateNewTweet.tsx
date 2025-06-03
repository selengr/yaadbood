import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Box, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuPencil } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import CloseIcon from '@/components/atoms/Icon/icons/close.svg';
import ImageIcon from '@/components/atoms/Icon/icons/image-icon.svg';
import PullIcon from '@/components/atoms/Icon/icons/pull-icon.svg';
import ScheduleIcon from '@/components/atoms/Icon/icons/schedule-icon.svg';
import { useGetUserData } from '@/hooks/user/useGetUserData';
import useUploadImage from '@/hooks/user/useUploadImage';
import { clearTweetData, TweetCreationState } from '@/redux/slices/tweetCreationSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { TiArrowSortedDown } from "react-icons/ti";
import Button from '../atoms/Button/Button';
import Icon from '../atoms/Icon';
import { icons } from '../atoms/Icon/iconLists';
import Modal from '../atoms/Modal/Modal';
import PhotoEditorModal, { PhotoEditorImage } from '../common/imageEditor/ImageEditorModal';
import PhotoEditingModal from '../common/imageEditor/PhotoEditingModal';
import EmojiPicker from '../explore/EmojiPicker';
import CommentSetting from './CommentSetting';
import CreatePull from './CreatePull';
import ImageData from './ImageData';
import PostSetting, { PrivacyIconMap } from './PostSetting';
import QuestionBox from './QuestionBox';
import ScheduleSetting from './ScheduleSetting';
import DescriptionHandler from '../description-input';

const schema = yup.object({
  description: yup
    .string()
    .min(20, 'At least 20 characters required')
    .max(3000, 'Maximum 3000 characters allowed')
    .required('Description is required')
});

type FormValues = {
  description: string;
};

interface Props {
  open: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
}

export default function CreateNewTweet(props: Props) {
  const { open, onClose, onSubmit } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:768px)');
  const dispatch = useDispatch<AppDispatch>();

  // Access the persisted tweet draft from Redux
  const tweetDraft = useSelector<RootState, TweetCreationState>((state) => state.tweetCreation);

  const {
    control,
    formState: { errors },
    setValue,
    watch
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      description: tweetDraft.description || ''
    }
  });

  const descriptionInputRef = useRef<{ insertSticker: (emoji: string) => void }>(null);
  // const descriptionInputRef = useRef<{ insertSticker: (emoji: string) => void }>(null);

  // Update the Redux tweet draft as the description changes
  const description = watch('description');
  // useEffect(() => {
  //   dispatch(setTweetData({ description }));
  // }, [description, dispatch]);

  // When opening the modal, if there is a draft ask the user if they want to continue
  useEffect(() => {
    if (open && tweetDraft.description) {
      const continueDraft = window.confirm(
        'You have an unfinished tweet. Would you like to continue editing it?'
      );
      if (!continueDraft) {
        dispatch(clearTweetData());
        setValue('description', '');
      }
    }
  }, [open, tweetDraft, dispatch, setValue]);

  // Local state for various modal and image/poll/schedule controls
  const [originalPhotos, setOriginalPhotos] = useState<string[] | null>(null);
  const [editedPhoto, setEditedPhoto] = useState<string | null>(null);
  const [postVisibility, showPostVisibilty] = useState(false);
  const [imageEditor, showImageEditor] = useState(false);
  const [createPull, showCreatePull] = useState(false);
  const [commentSetting, showCommentSetting] = useState(false);
  const [schedule, showSchedule] = useState(false);
  const [openImageHandlerModal, setOpenImageHandlerModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const { data } = useGetUserData();
  const userData = data?.user;

  const { uploadImage } = useUploadImage({});

  const handleSaveEditedPhoto = (photo: Blob | string) => {
    if (typeof photo === 'string') {
      setEditedPhoto(photo);
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        setEditedPhoto(reader.result as string);
      };
      reader.readAsDataURL(photo);
    }
    showImageEditor(false);
  };

  const handleCancelEditing = () => {
    showImageEditor(false);
  };

  const handleSave = async (images: PhotoEditorImage[]) => {
    setIsUploading(true);
    const uploadedUrls: string[] = [];

    for (const image of images) {
      const file = new File([image.src], `${image.id}.png`, {
        type: image.src.type || 'image/png'
      });
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response: string = await uploadImage(formData);
        const parts = response.split(/data:\s*/).filter(Boolean);
        let uploadedUrl = '';
        for (const part of parts) {
          try {
            const parsedPart = JSON.parse(part.trim());
            if (parsedPart?.url) {
              uploadedUrl = parsedPart.url;
              break;
            }
          } catch (error) {
            console.error('Error parsing upload response part:', error);
          }
        }
        if (uploadedUrl) {
          uploadedUrls.push(uploadedUrl);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    setOriginalPhotos(uploadedUrls);
    setIsUploading(false);
    setOpenImageHandlerModal(false);
  };

  const onSubmitForm = (data: FormValues) => {
    const payload = {
      content: {
        ...tweetDraft,
        description: data.description
        // You can add additional fields (images, poll, schedule, etc.) here.
      }
    };
    console.log('Submitting payload:', payload);
    // Submit the payload to your backend here

    // Clear the draft on successful submission
    dispatch(clearTweetData());
    onSubmit?.();
  };

  const inputRef = useRef<HTMLInputElement>(null);

  console.log('inputRef', inputRef.current?.value);

  return (
    <>
      <Modal
        open={
          open &&
          (!schedule || isMobile) &&
          (!createPull || isMobile) &&
          (!postVisibility || isMobile) &&
          (!openImageHandlerModal || isMobile)
        }
        onClose={onClose}
        fullScreenOnMobile>
        <Box
          sx={{
            width: { xs: '100%', md: '620px', lg: '696px' },
            maxHeight: { xs: 'calc(100dvh - 24px)', md: 'calc(100dvh - 138px)' },
            mr: '-8px',
            pr: '8px',
            overflowX: 'hidden',
            overflowY: 'auto',
            '&::-webkit-scrollbar': { width: '6px' },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#CBD5E1',
              borderRadius: '99px'
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#CBD5E1'
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent',
              borderRadius: '99px'
            },
            '&::-webkit-scrollbar-track:hover': {
              backgroundColor: 'transparent'
            },
            '&::-webkit-scrollbar-thumb:active': {
              backgroundColor: '#CBD5E1'
            }
          }}>
          <Stack flexDirection={'column'} >
            <Stack
              mb={theme.spacing(3)}
              flexDirection={{ xs: 'row', md: 'column-reverse' }}
              alignItems={{ xs: 'center', md: 'flex-start' }}
              justifyContent={'space-between'}
              gap={{ xs: theme.spacing(1.5), md: 0 }}>
              <Stack flexDirection={'row'} alignItems={'center'} gap={theme.spacing(1.5)}>
                <IconButton
                  onClick={onClose}
                  sx={{
                    display: { xs: 'flex', md: 'none' },
                    svg: { width: '20px', height: '20px', stroke: theme.palette.gray[700] }
                  }}>
                  <CloseIcon />
                </IconButton>
                <Avatar
                  sx={{ height: { xs: '32px', md: '56px' }, width: { xs: '32px', md: '56px' } }}
                  src={userData?.profilePhoto}
                  alt='User Avatar'
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    sx={{ display: { xs: 'none', md: 'block' }, fontWeight: 500, fontSize: '20px' }}>
                    {userData?.firstName || ''} {userData?.lastName || ''}
                  </Typography>
                  <Stack
                    onClick={() => showPostVisibilty(true)}
                    flexDirection={'row'}
                    gap={theme.spacing(0.75)}
                    alignItems={'center'}
                    sx={{
                      cursor: 'pointer',
                      color: theme.palette.gray[500],
                      fontSize: '14px',
                      fontWeight: theme.typography.fontWeightRegular,
                      // svg: { width: '12px', height: '12px', fill: theme.palette.gray[500] }
                    }}>

                    <Box
                      alignItems={"center"}
                      sx={{ cursor: "pointer", display: 'flex', gap: '3px', color: theme.palette.gray['500'] }}
                      onClick={() => showPostVisibilty(true)}
                    >
                      {
                        !isMobile &&
                        // icons[PrivacyIconMap[tweetDraft.visibility] as keyof typeof icons]
                        <Icon name={PrivacyIconMap[tweetDraft.visibility] as keyof typeof icons} />
                        // <MdRemoveRedEye />
                      }
                      <Typography sx={(_theme) => ({ fontSize: '14px' })}>
                        {tweetDraft.visibility.replace(/(\w)(\w*)/g,
                          function (_g0, g1, g2) { return g1.toUpperCase() + g2.toLowerCase(); })}
                      </Typography>
                      <TiArrowSortedDown />
                    </Box>

                    {/* {!isMobile && <FaEye color={theme.palette.gray[500]} />}
                    <Typography
                      sx={{
                        color: theme.palette.gray[500],
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: '14px',
                        mt: '2px',
                        textTransform: 'capitalize'
                      }}>
                      {tweetDraft?.visibility.toLowerCase().replace(/^\w/, (c) => c.toUpperCase()) ||
                        'Public'}
                    </Typography>
                    <ChevronDownIcon /> */}
                  </Stack>
                </Box>
              </Stack>
              <IconButton
                onClick={onClose}
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  alignSelf: { md: 'end' },
                  svg: { width: '20px', height: '20px', stroke: theme.palette.gray[700] }
                }}>
                <CloseIcon />
              </IconButton>
              <Stack
                display={{ xs: 'flex', md: 'none' }}
                flexDirection={'row'}
                alignItems={'center'}
                gap={theme.spacing(1)}>
                <IconButton
                  onClick={() => showSchedule(true)}
                  sx={{ svg: { width: '20px', height: '20px', fill: theme.palette.gray[700] } }}>
                  <ScheduleIcon />
                </IconButton>
                <Button
                  variant='contained'
                  pill
                  sx={{ minHeight: '32px', height: '32px', px: '16px', fontSize: '12px', fontWeight: 600 }}>
                  Post
                </Button>
              </Stack>
            </Stack>

            <DescriptionHandler ref={descriptionInputRef} />

            <Stack
              sx={{ position: { xs: 'absolute', md: 'static' } }}
              bottom={0}
              left={0}
              right={0}
              flexDirection={'row'}
              gap={2}
              justifyContent={{ xs: 'end', md: 'start' }}>
              <EmojiPicker
                sx={{
                  alignSelf: 'center',
                  p: 0.5,
                  display: { xs: 'none', lg: 'flex' },
                  color: 'gray.700',
                  fontSize: '20px'
                }}
                // handleEmojiClick={(emoji) => descriptionInputRef.current?.insertEmoji(emoji)}
                handleEmojiClick={(emoji) => descriptionInputRef.current?.insertSticker(emoji)}
              />
              <IconButton onClick={() => setOpenImageHandlerModal(true)}>
                <ImageIcon />
              </IconButton>
              <IconButton onClick={() => showCreatePull(true)}>
                <PullIcon />
              </IconButton>
            </Stack>
            <QuestionBox />
            {originalPhotos && originalPhotos.length > 0 && (
              <Box sx={{ mb: '-16px', display: 'flex', alignItems: 'center', justifyContent: 'end', gap: 2 }}>
                <IconButton
                  onClick={() => setOpenImageHandlerModal(true)}
                  sx={{
                    svg: { width: '16px', height: '16px', stroke: theme.palette.neutrals.content },
                    background: theme.palette.gray[900],
                    ':hover': { background: theme.palette.gray[700] }
                  }}>
                  <LuPencil />
                </IconButton>
                <IconButton
                  onClick={() => setOriginalPhotos(null)}
                  sx={{
                    svg: { width: '16px', height: '16px', stroke: theme.palette.neutrals.content },
                    background: theme.palette.gray[900],
                    ':hover': { background: theme.palette.gray[700] }
                  }}>
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
            <ImageData images={originalPhotos} />

            <Stack
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'end'}
              display={{ xs: 'none', md: 'flex' }}
              gap={theme.spacing(1)}>
              <IconButton
                onClick={() => showSchedule(true)}
                sx={{ svg: { width: '20px', height: '20px', fill: theme.palette.gray[700] } }}>
                <ScheduleIcon />
              </IconButton>
              <Button
                variant='contained'
                pill
                disabled
                onClick={() => onSubmitForm({ description })}
                sx={{
                  minHeight: '32px',
                  height: '32px',
                  px: '16px',
                  fontSize: '12px',
                  fontWeight: 600,
                  "&:disabled": {
                    bgcolor: theme.palette.gray["300"],
                    border: "none",
                    color: theme.palette.gray["700"],
                  }
                }}>
                Post
              </Button>
            </Stack>
            <PhotoEditingModal
              open={imageEditor}
              photo={''}
              onSave={handleSaveEditedPhoto}
              onCancel={handleCancelEditing}
            />
          </Stack>
        </Box>
      </Modal>
      <PhotoEditorModal
        open={openImageHandlerModal}
        loading={isUploading}
        onClose={() => setOpenImageHandlerModal(false)}
        onSave={handleSave}
      />
      <Modal
        title={'Create a poll'}
        fullScreenOnMobile
        open={createPull}
        onBack={!isMobile ? () => showCreatePull(false) : undefined}
        onClose={() => showCreatePull(false)}>
        <CreatePull onClose={() => showCreatePull(false)} />
      </Modal>
      <Modal
        title='Comment Control'
        open={commentSetting}
        closeOnOutsideClick={true}
        onClose={() => showCommentSetting(false)}
        onBack={!isMobile ? () => showCommentSetting(false) : undefined}>
        <Box sx={{ width: { xs: '100%', md: '464px' } }}>
          <CommentSetting onClose={() => showCommentSetting(false)} />
        </Box>
      </Modal>
      <Modal
        title='Post settings'
        open={postVisibility && !commentSetting}
        closeOnOutsideClick={true}
        onClose={() => showPostVisibilty(false)}
        onBack={!isMobile ? () => showPostVisibilty(false) : undefined}>
        <PostSetting onCommentControl={() => showCommentSetting(true)} />
      </Modal>
      <Modal
        title='Schedule'
        open={schedule}
        closeOnOutsideClick={true}
        onClose={() => showSchedule(false)}
        onBack={!isMobile ? () => showSchedule(false) : undefined}>
        <ScheduleSetting schedule={schedule} onClose={() => showSchedule(false)} />
      </Modal>
    </>
  );
}
