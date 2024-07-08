'use client';
import { MobileDatePicker } from '@mui/x-date-pickers';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { RTL } from './RTL';

interface Props {
     title?: string;
     defaultValue?: Date | any;
     disablePast?: boolean;
     onChange: (value: Date | null) => void;
     placeholder: string;
}

export const DatePickerMui = ({
     title,
     defaultValue,
     onChange,
     disablePast = false,
     placeholder
}: Props) => {
     return (
          <Box
               className={'date-picker-container'}
               sx={{
                    '& .MuiPickersDay-root': {
                         backgroundColor: '#0EAD97'
                    }
               }}
          >
               {/* <Typography mb={1} textAlign={'right'}>
                    {title ?? ''}
               </Typography> */}
               <RTL>
                    <MobileDatePicker
                         onAccept={(value) => {
                              onChange(value);
                         }}
                         disablePast={disablePast}
                         defaultValue={defaultValue}
                         label={placeholder}
                         localeText={{
                              okButtonLabel: 'ثبت',
                              cancelButtonLabel: 'انصراف',
                              toolbarTitle: 'تاریخ'
                         }}
                         slotProps={{
                              day: {
                                   sx: {
                                        '&.Mui-selected': {
                                             backgroundColor: (theme) => theme.palette.primary.main,
                                             color: '#FFF !important'
                                        }
                                   }
                              },
                              actionBar: {
                                   sx: {
                                        // '&>:first-child': { backgroundColor: 'error.main' },
                                        // gap: 1,
                                        justifyContent: 'flex-end',
                                        flexDirection: 'row-reverse',
                                        color: '#FFF'
                                   }
                              }
                         }}
                         sx={{
                              '& .MuiInputBase-root input': {
                                   width: '100%',
                                   textAlign: 'right'
                              },

                              width: '100%'
                         }}
                    />
               </RTL>
          </Box>
     );
};
