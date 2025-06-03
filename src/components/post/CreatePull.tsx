import { yupResolver } from '@hookform/resolvers/yup';
import { Box, IconButton, SxProps, Typography, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { setTweetData } from '@/redux/slices/tweetCreationSlice';
import { AppDispatch, RootState } from '@/redux/store';

import Button from '../atoms/Button/Button';
import Input from '../atoms/Input';
import PollDuration from './PullDuration';
import CancelCircleIcon from '../atoms/Icon/icons/CancelCircleIcon';

interface Props {
  sx?: SxProps;
  onClose?: () => void;
  onSubmit?: () => void;
}

const validationSchema = yup.object().shape({
  expiredAt: yup.string().required('Expired date is required'),
  question: yup
    .string()
    .required('Question is required')
    .max(140, 'You’ve exceeded the maximum character limit'),
  answers: yup
    .array()
    .of(
      yup.object().shape({
        value: yup
          .string()
          .required('Answer is required')
          .max(30, 'You’ve exceeded the maximum character limit.'),
        id: yup.string().required('Answer is required')
      })
    )
    .min(2, 'At least 2 answers are required')
    .max(4, 'Maximum 4 options allowed')
});

interface FormValues {
  expiredAt: string;
  question: string;
  answers: { value: string; id: string }[];
}

export default function CreatePull(props: Props) {
  const { sx, onClose, onSubmit } = props;
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const tweetDraft = useSelector((state: RootState) => state.tweetCreation);
  const defaultValues = {
    expiredAt: tweetDraft?.pole?.expiredAt || 'unlimited',
    question: tweetDraft?.pole?.question || '',
    answers: tweetDraft?.pole?.answers?.map((ans) => ({ value: ans, id: crypto.randomUUID() })) || [
      { value: '', id: crypto.randomUUID() },
      { value: '', id: crypto.randomUUID() }
    ]
  };
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(validationSchema) as Resolver<FormValues>,
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  const questionValue = watch('question');
  const answers = watch('answers');

  const addAnswer = () => {
    if (answers.length < 4) {
      setValue('answers', [...answers, { value: '', id: crypto.randomUUID() }]);
    }
  };

  const removeAnswer = (index: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers.splice(index, 1);
    setValue('answers', updatedAnswers);
  };

  const onConfirm = (data: FormValues) => {
    // Update the redux store with the poll data (named as "pole" in your state)
    dispatch(
      setTweetData({
        pole: {
          question: data.question,
          answers: data.answers.map((answer) => answer.value),
          expiredAt: data.expiredAt
        }
      })
    );

    // Optionally trigger any onSubmit callback passed to this component
    onSubmit?.();
    onClose?.();
  };

  return (
    <Stack
      justifyContent='space-between'
      sx={{
        ...sx,
        width: { xs: '100%', md: '464px' },
        height: { xs: 'calc(100dvh - 72px)', md: 'auto' },
        position: 'relative'
      }}
      flexDirection='column'>
      <Stack gap={theme.spacing(3)}>
        {/* Poll Question Field */}
        <Controller
          name='question'
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              label='Your question'
              placeholder='E.g., How do you predict the market situation?'
              required
              error={!!fieldState.error}
              errorMessage={fieldState.error?.message}
              helperText={`${questionValue.length}/140`}
            />
          )}
        />
        <Stack gap={theme.spacing(1.5)}>
          {/* Poll Options Section */}
          {answers.map((answer, index) => (
            <Controller
              key={answer.id}
              name={`answers.${index}.value`}
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& > fieldset': {
                        borderColor: fieldState.error
                          ? `${theme.palette.error.main} !important`
                          : `${theme.palette.neutrals.page} !important`
                      }
                    },
                    backgroundColor: theme.palette.neutrals.page,
                    borderRadius: theme.spacing(1.5)
                  }}
                  error={!!fieldState.error}
                  errorMessage={
                    fieldState.error?.message || (errors.answers?.[index]?.value?.message as string)
                  }
                  helperText={`${field.value?.length || 0}/30`}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <IconButton
                          onClick={() => removeAnswer(index)}
                          sx={{
                            svg: {
                              width: '16px',
                              height: '16px',
                              stroke: fieldState.error ? theme.palette.error.main : theme.palette.gray[500]
                            },
                            marginRight: '-8px'
                          }}>
                          <CancelCircleIcon />
                        </IconButton>
                      )
                    }
                  }}
                />
              )}
            />
          ))}
          {answers.length < 4 && (
            <Button
              onClick={addAnswer}
              sx={{
                width: '100%',
                borderWidth: '1px',
                borderStyle: 'dashed',
                borderColor: theme.palette.gray[200],
                background: 'transparent',
                fontWeight: 400,
                fontSize: '16px',
                justifyContent: 'start',
                padding: theme.spacing(1.5),
                lineHeight: '22px',
                color: theme.palette.gray[400],
                ':hover': {
                  fontSize: '16px',
                  width: '100%',
                  background: 'transparent',
                  color: theme.palette.gray[400],
                  borderStyle: 'dashed',
                  borderWidth: '1px',
                  borderColor: theme.palette.gray[200]
                }
              }}>
              Add another option…
            </Button>
          )}
        </Stack>
        {/* Poll Duration Component with onChange callback */}
        <PollDuration pollDuration={watch('expiredAt')} setPollDuration={(e) => setValue('expiredAt', e)} />
      </Stack>

      {/* Display global errors for answers array if any */}
      <Stack>
        {errors.answers?.message && (
          <Typography color='red.500' fontSize='14px'>
            {errors.answers.message}
          </Typography>
        )}
      </Stack>

      {/* Action buttons */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
          gap: 1.25,
          pt: 4
        }}>
        <Button
          onClick={onClose}
          variant='outlined'
          color='primary.main'
          sx={{
            display: { xs: 'none', md: 'flex' },
            width: { xs: '100%', md: 'auto' },
            height: { xs: '40px', md: '32px' },
            minHeight: { xs: '40px', md: '32px' },
            fontSize: { xs: '16px', md: '12px' },
            borderColor: 'primary.main',
            borderRadius: { md: 9999 }
          }}>
          Cancel
        </Button>
        <Button
          variant='contained'
          onClick={handleSubmit(onConfirm)}
          disabled={!isValid}
          sx={{
            width: { xs: '100%', md: 'auto' },
            height: { xs: '40px', md: '32px' },
            minHeight: { xs: '40px', md: '32px' },
            fontSize: { xs: '16px', md: '12px' },
            borderRadius: { md: 9999 }
          }}>
          Done
        </Button>
      </Box>
    </Stack>
  );
}
