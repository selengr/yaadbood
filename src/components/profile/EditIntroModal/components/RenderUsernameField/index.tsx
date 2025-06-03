import { forwardRef } from 'react';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { debounce } from 'lodash';
import { useCheckUsername } from '@/hooks/user/useCheckUsername';
//constants
import { EDIT_INTRO_MODAL } from '@/constants';
//components
import { Box, Typography } from '@mui/material';
import { Icon, LoadingIcon } from '@/components/atoms';
import { EditIntroForm } from '@/types/profile';
//style
import {
  BoxContainerSpin,
  CloseIconButtonStyled,
  EditIconButtonStyled,
  IconButtonStyled,
  UsernameFieldStyled
} from './RenderUsernameField.style';

interface IProps {
  field: ControllerRenderProps<EditIntroForm, 'username'>;
  form: UseFormReturn<EditIntroForm>;
  disable: boolean;

  setConfirmModal: (value: boolean) => void;
}

const RenderUsernameField = forwardRef<HTMLInputElement, IProps>(
  ({ field, form, disable, setConfirmModal }, ref) => {
    const { data: session } = useSession();
    const checkUsername = useCheckUsername();
    const handleEditClick = () => {
      if (!session?.user?.username_updated) {
        setConfirmModal(true);
      }
    };

    const checkUserNameValidation = (username: string) => {
      if (!username) return;

      if (session?.user?.username === username) {
        form.clearErrors('username');
      } else {
        if (!form.formState.errors.username?.message) {
          checkUsername.mutate(
            { username },
            {
              onSuccess: () => {
                form.clearErrors('username');
              },
              onError: () => {
                form.setError('username', {
                  type: 'manual',
                  message: 'Username is not available'
                });
              }
            }
          );
        }
      }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      field.onChange(e);
      debouncedValidation(e.target.value);
    };

    const debouncedValidation = debounce(checkUserNameValidation, 500);
    return (
      <Box position='relative'>
        <UsernameFieldStyled
          label={EDIT_INTRO_MODAL.USERNAME.LABEL}
          placeholder={EDIT_INTRO_MODAL.USERNAME.PLACEHOLDER}
          errorMessage={form.formState.errors.username?.message as string}
          {...field}
          inputRef={ref}
          error={!!form.formState.errors.username?.message}
          onChange={onChange}
          disabled={disable}
          sx={{
            borderColor: !form.formState.errors.username?.message ? 'primary.500' : 'red.500'
          }}
          slotProps={{
            input: {
              startAdornment: (
                <Typography component='span' sx={{ color: 'gray.400' }}>
                  www.tradido.com/c/
                </Typography>
              ),
              endAdornment: (
                <Box position='absolute' right='10px' top={12}>
                  {disable && !session?.user?.username_updated ? (
                    <EditIconButtonStyled onClick={handleEditClick}>
                      <Icon name='edit' />
                    </EditIconButtonStyled>
                  ) : checkUsername?.isPending ? (
                    <BoxContainerSpin>
                      <LoadingIcon width={16} height={16} />
                    </BoxContainerSpin>
                  ) : !form.formState.errors.username?.message ? (
                    <IconButtonStyled>
                      <Icon name='check' />
                    </IconButtonStyled>
                  ) : (
                    <CloseIconButtonStyled>
                      <Icon name='close' />
                    </CloseIconButtonStyled>
                  )}
                </Box>
              )
            }
          }}
        />
      </Box>
    );
  }
);

export default RenderUsernameField;
