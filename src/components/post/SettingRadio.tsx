import { FormControlLabel, Radio, Stack, SxProps, Typography, useTheme } from '@mui/material';

import Icon from '../atoms/Icon';
import { IconsListType } from '../atoms/Icon/iconLists';

interface AppRadioProps {
  title: string;
  subtitle?: string;
  value: string;
  icon?: IconsListType;
  sx?: SxProps;
  labelsx?: SxProps;
}

export default function SettingRadio(props: AppRadioProps) {
  const theme = useTheme();
  const {
    title,
    subtitle,
    value,
    icon,
    sx,
    labelsx = { fontWeight: 500, fontSize: '16px', lineHeight: '16px', mt: '5px', color: theme.palette.gray["600"] }
  } = props;
  return (
    <FormControlLabel
      sx={{
        ...sx
      }}
      value={value}
      control={
        <Radio
          sx={{ py: 0, px: '10px' }}
          checkedIcon={
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z'
                fill='#1DA1F3'
              />
            </svg>
          }
        />
      }
      label={
        <div>
          <Stack flexDirection={'row'} alignItems={'center'} gap={0.5}>
            <Typography sx={labelsx} variant='body2'>
              {title}
            </Typography>
            {icon && <Icon name={icon} w={20} h={20} />}
          </Stack>
          {subtitle && (
            <Typography
              variant='caption'
              fontSize={'12px'}
              sx={{
                fontWeight: 500,
                color: theme.palette.gray[500]
              }}>
              {subtitle}
            </Typography>
          )}
        </div>
      }
    />
  );
}
