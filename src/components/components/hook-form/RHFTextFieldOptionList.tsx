import { useFormContext, Controller } from 'react-hook-form';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import Iconify from '../iconify/Iconify';

export default function RHFTextFieldOptionList({ name, watch, setValue, getValues }:any) {
  const { control } = useFormContext();

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginTop={3}
              marginBottom={0.5}
            >
              <Typography sx={{ width: '75%' }}>گزینه ها</Typography>
              <Typography sx={{ width: '12.5%' }}>ارزش</Typography>
              <Typography sx={{ width: '12.5%' }}></Typography>
            </Box>
            <Box display="flex" flexDirection="column" gap={1}>
              {watch(name)?.map((option:any, index:any) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  gap={0.8}
                >
                  <TextField
                    fullWidth
                    sx={{
                      '& input': {
                        padding: 1,
                      },
                    }}
                    placeholder="گزینه جدید"
                    value={option?.title}
                    onChange={(e) => {
                      const newOptions = [...field.value];
                      newOptions[index].title = e.target.value;
                      field.onChange(newOptions);
                    }}
                  />
                  <TextField
                    sx={{
                      width: '20%',
                      '& input': {
                        textAlign: 'center',
                        padding: 1,
                      },
                    }}
                    placeholder="0..99"
                    type="number"
                    value={option?.score}
                    onChange={(e) => {
                      const newOptions = [...field.value];
                      newOptions[index].score = Number(e.target.value);
                      field.onChange(newOptions);
                    }}
                  />
                  <IconButton
                    aria-label="trash"
                    onClick={(e) => {
                      e.preventDefault();
                      if (getValues()?.optionList?.length <= 1) return;
                      const newOptions = [...field.value];
                      newOptions.splice(index, 1);
                      field.onChange(newOptions);
                    }}
                    sx={{
                      marginBottom: 0,
                      borderRadius: '5px',
                      border: '1px solid transparent',
                      borderColor: (theme) => theme.palette.primary.main,
                      color: (theme) => theme.palette.primary.main,
                    }}
                  >
                    <Iconify icon="ph:trash" sx={{ width: 20, height: 20 }} />
                  </IconButton>
                </Box>
              ))}
            </Box>
            <Box
              width="100%"
              display="flex"
              alignItems="center"
              flexDirection="row-reverse"
              justifyContent="space-between"
            >
              <Button
                sx={{
                  width: '100%',
                  left: 0,
                  gap: 2,
                  marginTop: 1.5,
                  '&.MuiButtonBase-root:hover': {
                    bgcolor: (theme) => theme.palette.primary.main,
                  },
                }}
                variant="outlined"
                onClick={(e) => {
                  e.preventDefault(); // avoid submit
                  if (getValues()?.optionList?.length >= 10) return;
                  const newOption = { title: '', score: '' };
                  setValue(name, [...field.value, newOption]);
                }}
              >
                اضافه کردن
              </Button>
            </Box>
            <Typography sx={{ fontSize: '12px', color: 'red' }}>{error?.message}</Typography>
          </Box>
        )}
      />
    </>
  );
}
