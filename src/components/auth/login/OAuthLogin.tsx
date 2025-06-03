import { Stack } from '@mui/material';
import { Typography } from '@mui/material';
import { signIn } from 'next-auth/react';

import { GENERAL_MESSAGES } from '@/constants';
import { AUTH_MESSAGES } from '@/constants';

import Icon from '../../atoms/Icon';
import { DividerLine } from './style';
import { StyledButton } from './style';

export const OAuthLogin = () => (
  <>
    <StyledButton
      variant='outlined'
      onClick={() => signIn('google', { redirect: false })}
      startIcon={<Icon name='google' w={25} h={25} aria-hidden='true' />}
      aria-label='Continue with Google'
      data-testid='google-login-button'>
      <Typography color='gray.700'>{AUTH_MESSAGES.AUTH.CONTINUE_WITH_GOOGLE}</Typography>
    </StyledButton>
    <Stack alignItems='center' flexDirection='row' gap={1.5} role='separator' aria-orientation='horizontal'>
      <DividerLine />
      <Typography color='gray.300'>{GENERAL_MESSAGES.ACTIONS.OR}</Typography>
      <DividerLine />
    </Stack>
  </>
);
