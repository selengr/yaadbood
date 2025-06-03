import { FormControl, RadioGroup, Stack, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setTweetData } from '@/redux/slices/tweetCreationSlice';
import { RootState } from '@/redux/store';

import Button from '../atoms/Button/Button';
import SettingRadio from './SettingRadio';
import { BorderedCard } from './style';

export const commentAuthorities = [
  {
    title: 'Everyone',
    value: 'EVERY_ONE'
  },
  {
    title: 'Subscribers',
    value: 'SUBSCRIBERS'
  },
  {
    title: 'No one',
    value: 'NO_ONE'
  }
];

export default function CommentSetting({ onClose }: { onClose: () => void }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  // Get the current tweet creation state from Redux.
  const tweetDraft = useSelector((state: RootState) => state.tweetCreation);

  // Local state to store the selected radio value temporarily.
  const [selectedCommentOption, setSelectedCommentOption] = useState(tweetDraft.commentOption);

  // Update local state when a radio button is selected.
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCommentOption(event.target.value);
  };

  // Dispatch the Redux action when Confirm is clicked.
  const handleConfirm = () => {
    dispatch(setTweetData({ commentOption: selectedCommentOption }));
    onClose();
  };

  return (
    <Stack flexDirection='column' gap={2}>
      <div>
        <Typography
          variant='subtitle1'
          fontSize='14px'
          sx={{ fontWeight: 500, color: theme.palette.gray[500] }}>
          Who can published comment
        </Typography>
      </div>
      <BorderedCard flexDirection='column'>
        <FormControl>
          <RadioGroup
            aria-labelledby='comment-setting-radio-buttons-group'
            name='comment-setting-radio-buttons-group'
            value={selectedCommentOption} // use local state as the controlled value
            onChange={handleChange}
            sx={{ gap: theme.spacing(2) }}>
            {commentAuthorities.map((item) => (
              <SettingRadio
                key={item.value}
                sx={{ alignItems: 'center' }}
                labelsx={{
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '16px',
                  mt: '3px',
                  color: 'gray.600'
                }}
                title={item.title}
                value={item.value}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </BorderedCard>
      <Stack flexDirection='row' justifyContent='end'>
        <Button
          variant='contained'
          pill
          sx={{
            fontWeight: 600,
            mt: '16px',
            height: { xs: '40px', sm: '32px' },
            minHeight: '32px',
            fontSize: { xs: '16px', sm: '12px' },
            width: { xs: '100%', sm: 'auto' },
            borderRadius: { xs: '12px', sm: 9999 }
          }}
          onClick={handleConfirm}>
          Confirm
        </Button>
      </Stack>
    </Stack>
  );
}
