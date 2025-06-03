import { FormControl, RadioGroup, Stack, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { setTweetData } from '@/redux/slices/tweetCreationSlice';
import { RootState } from '@/redux/store';

import Button from '../atoms/Button/Button';
import Icon from '../atoms/Icon';
import { IconsListType } from '../atoms/Icon/iconLists';
import { commentAuthorities } from './CommentSetting';
import SettingRadio from './SettingRadio';
import { BorderedCard } from './style';

// Define the available visibility options.
// Note: The values match the format stored in your Redux slice.
const postVisibility = [
  {
    title: 'Public',
    subtitle: 'Anyone can search for and view',
    value: 'PUBLIC',
    icon: 'publicIcon'
  },
  {
    title: 'VIP',
    subtitle: 'Everyone can find your tweet, but only members can watch it',
    value: 'VIP',
    icon: 'vipIcon'
  },
  {
    title: 'Private',
    subtitle: 'Only people you choose can view',
    value: 'PRIVATE',
    icon: 'privateIcon'
  }
];

export const PrivacyIconMap: Record<string, string> = {
    "PUBLIC": "publicIcon",
    "PRIVATE": "privateIcon",
    "VIP": "vipIcon",
}

interface Props {
  onCommentControl?: () => void;
}

export default function PostSetting({ onCommentControl }: Props) {
  const theme = useTheme();
  const dispatch = useDispatch();

  // Get the current tweet draft from Redux
  const tweetDraft = useSelector((state: RootState) => state.tweetCreation);

  // Use the current visibility from the store as the controlled value.
  // (Make sure the stored value matches one of the radio button values.)
  const currentVisibility = tweetDraft.visibility;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    // Dispatch an action to update the tweet creation state.
    dispatch(setTweetData({ visibility: newValue as 'PUBLIC' | 'PRIVATE' | 'VIP' }));
  };

  return (
    <Stack sx={{ width: { xs: '100%', md: '512px' } }} flexDirection={'column'} gap={1}>
      <div>
        <Typography variant='h6' fontWeight={600} fontSize={'18px'}>
          Visibility
        </Typography>
        <Typography
          variant='subtitle1'
          fontSize={'14px'}
          fontWeight={500}
          sx={{ color: theme.palette.gray[500] }}>
          Choose when to publish and who can see your tweet
        </Typography>
      </div>
      <BorderedCard flexDirection={'column'}>
        <FormControl>
          <RadioGroup
            aria-labelledby='post-setting-radio-buttons-group'
            name='post-setting-radio-buttons-group'
            value={currentVisibility} // Set the default from store
            onChange={handleChange}
            sx={{ gap: theme.spacing(2) }}>
            {postVisibility.map((item) => (
              <SettingRadio
                key={item.value}
                title={item.title}
                subtitle={item.subtitle}
                value={item.value}
                icon={item.icon as IconsListType}
                sx={{ alignItems: 'start' }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </BorderedCard>
      <BorderedCard
        sx={{ cursor: 'pointer' }}
        onClick={onCommentControl}
        flexDirection={'row'}
        justifyContent={'space-between'}
        marginTop={2}
        marginBottom={3}
        alignItems={'center'}>
        <div>
          <Typography variant='h6' fontWeight={600} fontSize={'14px'} color={theme.palette.gray["700"]}>
            Comment Control
          </Typography>
          <Typography
            variant='caption'
            fontSize={'12px'}
            fontWeight={500}
            sx={{ color: theme.palette.gray[500] }}>
            {commentAuthorities?.find((com) => com?.value === tweetDraft?.commentOption)?.title}
          </Typography>
        </div>
        <Icon name={'chevronRight'} w={20} h={20} />
      </BorderedCard>
      <Stack flexDirection={'row'} justifyContent={'end'}>
        <Button
          variant='contained'
          sx={{
            height: { xs: '40px', sm: '32px' },
            minHeight: '32px',
            fontWeight: 600,
            fontSize: { xs: '16px', sm: '12px' },
            width: { xs: '100%', sm: 'auto' },
            borderRadius: { xs: '12px', sm: 9999 }
          }}>
          Confirm
        </Button>
      </Stack>
    </Stack>
  );
}
