import { Avatar, Box, Typography } from '@mui/material';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';

import Input from '@/components/atoms/Input';
import { useGetUserFollowingsData } from '@/hooks/user/useGetUserFollowingsData';
import { useDebounceSearch } from '@/hooks/util/useDebounceSearch';

import Button from '../../atoms/Button/Button';
import { type PhotoEditorImage } from './ImageEditorModal';

const TagActiveMode = ({
  activeImage,
  setActiveEditMode,
  setActiveImage,
  setImages
}: {
  activeImage: PhotoEditorImage | null;
  setActiveEditMode: Dispatch<SetStateAction<'list' | 'alt' | 'edit' | 'tag'>>;
  setActiveImage: Dispatch<SetStateAction<PhotoEditorImage | null>>;
  setImages: Dispatch<SetStateAction<PhotoEditorImage[]>>;
}) => {
  const [selectedTag, setSelectedTag] = useState(activeImage?.tags || []);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounceSearch(search, 1000);

  const userFollowers = useGetUserFollowingsData({ search: debouncedSearch });
  const followings = userFollowers?.data || [];
  const mockTags = [
    { name: 'Ali Matin', id: '1', avatar: '/images/mock/Avatar.png' },
    { name: 'Dr.Pasha', id: '2', avatar: '/images/mock/Avatar.png' },
    { name: 'Samira Khalili', id: '3', avatar: '/images/mock/Avatar.png' },
    { name: 'MohammadHossein Eghbal', id: '4', avatar: '/images/mock/Avatar.png' },
    { name: 'Neda', id: '5', avatar: '/images/mock/Avatar.png' },
    { name: 'Mona Bozorgi', id: '6', avatar: '/images/mock/Avatar.png' },
    { name: 'Raha', id: '7', avatar: '/images/mock/Avatar.png' },
    { name: 'Smehrk', id: '8', avatar: '/images/mock/Avatar.png' },
    { name: 'Mona Bozorgi', id: '9', avatar: '/images/mock/Avatar.png' },
    { name: 'Raha', id: '10', avatar: '/images/mock/Avatar.png' },
    { name: 'Smehrk', id: '11', avatar: '/images/mock/Avatar.png' }
  ];

  const handleAddTags = () => {
    if (activeImage) {
      const updatedActiveImage = { ...activeImage, tags: selectedTag };
      setActiveImage(updatedActiveImage);

      setImages((prevImages) =>
        prevImages.map((image) => (image.id === activeImage.id ? { ...image, tags: selectedTag } : image))
      );
    }
    setActiveEditMode('list');
  };

  const availableTags = followings.filter((tag) => !selectedTag.includes(tag?.target?.username));

  console.log('availableTags', availableTags);
  return (
    <>
      {/* Left Panel */}
      <Box
        sx={{
          flex: { xs: 1, sm: 2 },
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2
        }}>
        {activeImage?.src ? (
          <img
            src={URL.createObjectURL(activeImage?.src)}
            alt={activeImage?.alt || 'Selected'}
            style={{ width: '100%', height: 'auto', objectFit: 'contain', maxHeight: '70vh' }}
          />
        ) : null}
      </Box>

      {/* Right Panel */}
      <Box
        sx={{
          flex: 1,
          padding: 2,
          backgroundColor: 'neutrals.content',
          borderBottomLeftRadius: 6,
          borderBottomRightRadius: 6,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}>
        <Button
          onClick={() => setActiveEditMode('list')}
          color='gray.500'
          variant='text'
          sx={{
            fontWeight: '400',
            alignSelf: 'start',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            p: 0
          }}>
          <Image src='/icons/photo-editing/arrow-left.svg' width={20} height={20} alt='arrow left' /> Add a
          tag
        </Button>

        {/* Selected Tags */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            maxHeight: '112px',
            mr: '-8px',
            pr: '8px',
            '&::-webkit-scrollbar': {
              width: '6px'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#CBD5E1 ',
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
          {selectedTag.map((tagUsername) => {
            const tag = followings.find((t) => t?.target?.username === tagUsername);
            return (
              tag && (
                <Box
                  key={`selected${tag?.target?.username}`}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    borderRadius: 9999,
                    padding: '0px 16px',
                    color: 'neutrals.content',
                    backgroundColor: 'gray.900',
                    lineHeight: '16px'
                  }}>
                  <Typography sx={{ fontSize: '14px' }}>
                    {tag?.target?.firstName || ''} {tag?.target?.lastName || ''}
                  </Typography>
                  <Button
                    variant='text'
                    color='neutrals.content'
                    sx={{ minWidth: 0, padding: 0, minHeight: '32px' }}
                    onClick={() =>
                      setSelectedTag((prev) => prev.filter((username) => username !== tag?.target?.username))
                    }>
                    ✕
                  </Button>
                </Box>
              )
            );
          })}
        </Box>
        {selectedTag?.length <= 30 ? (
          <>
            {/* Filter Input */}
            <Input
              variant='outlined'
              size='medium'
              placeholder='Type a name or multiple names'
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                borderColor: 'gray.200',
                borderRadius: '12px',
                '.css-18n5bfb-MuiInputBase-root-MuiOutlinedInput-root': {
                  borderRadius: '12px'
                },
                input: { padding: '14px 12px', fontSize: '14px', borderRadius: '12px' }
              }}
            />

            {/* Available Tags */}
            <Box
              sx={{
                overflowY: 'auto',
                overflowX: 'hidden',
                maxHeight: '60vh',
                mr: '-8px',
                pr: '8px',
                '&::-webkit-scrollbar': {
                  width: '6px'
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#CBD5E1 ',
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
                },
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }}>
              {availableTags?.map((tag) => (
                <Box
                  key={tag?.target?.username}
                  sx={{ display: 'flex', gap: 1, cursor: 'pointer' }}
                  onClick={() => setSelectedTag((prev) => [...prev, tag?.target?.username])}>
                  <Avatar
                    sx={{
                      width: '40px',
                      height: '40px'
                    }}
                    src={tag?.target?.profilePhoto}
                  />
                  <Box
                    sx={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      overflow: 'hidden',
                      borderBottomWidth: '1px',
                      borderBottomStyle: 'solid',
                      borderBottomColor: 'gray.200',
                      pb: 1
                    }}>
                    <Typography sx={{ fontSize: '14px', color: 'gray.700' }}>
                      {tag?.target?.firstName || ''} {tag?.target?.lastName || ''}
                    </Typography>
                    <Typography sx={{ fontSize: '12px', color: 'gray.500' }}>
                      {tag?.target?.job || ''}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <svg width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <g clipPath='url(#clip0_1097_41874)'>
                  <path
                    // eslint-disable-next-line max-len
                    d='M18.0254 8.7387L11.7754 2.4887C11.307 2.02307 10.6734 1.76172 10.0129 1.76172C9.35246 1.76172 8.71883 2.02307 8.25042 2.4887L2.00042 8.7387C1.53479 9.20711 1.27344 9.84074 1.27344 10.5012C1.27344 11.1617 1.53479 11.7953 2.00042 12.2637L8.25042 18.5137C8.71883 18.9793 9.35246 19.2407 10.0129 19.2407C10.6734 19.2407 11.307 18.9793 11.7754 18.5137L18.0254 12.2637C18.491 11.7953 18.7524 11.1617 18.7524 10.5012C18.7524 9.84074 18.491 9.20711 18.0254 8.7387ZM8.75042 5.5012H11.2504V11.7512H8.75042V5.5012ZM10.0004 15.8137C9.69139 15.8137 9.38929 15.7221 9.13234 15.5504C8.87539 15.3787 8.67512 15.1347 8.55686 14.8491C8.4386 14.5636 8.40765 14.2495 8.46794 13.9464C8.52823 13.6433 8.67705 13.3649 8.89557 13.1463C9.11408 12.9278 9.3925 12.779 9.69559 12.7187C9.99869 12.6584 10.3129 12.6894 10.5984 12.8076C10.8839 12.9259 11.1279 13.1262 11.2996 13.3831C11.4713 13.6401 11.5629 13.9422 11.5629 14.2512C11.5629 14.6656 11.3983 15.063 11.1053 15.3561C10.8122 15.6491 10.4148 15.8137 10.0004 15.8137Z'
                    fill='#FF2661'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_1097_41874'>
                    <rect width='20' height='20' fill='white' transform='translate(0 0.5)' />
                  </clipPath>
                </defs>
              </svg>
              <Typography sx={{ fontSize: '14px', fontWeight: 500, color: 'red.500' }}>
                You can add up to 30 tags. To add another tag, delete an existing one first.
              </Typography>
            </Box>
          </>
        )}
        <Button
          variant='contained'
          pill
          sx={{
            mt: 'auto',
            alignSelf: 'end',
            textTransform: 'capitalize',
            fontWeight: '500',
            fontSize: '12px',
            padding: '4px 12px',
            lineHeight: '16px',
            minHeight: '32px',
            height: '32px'
          }}
          onClick={handleAddTags}>
          Done
        </Button>
      </Box>
    </>
  );
};

export default TagActiveMode;
