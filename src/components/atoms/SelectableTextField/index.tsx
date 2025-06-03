import { Box } from '@mui/material';

import Icon from '../Icon';
import Input from '../Input';

interface IntProps {
  onClick: () => void;
  value: string | undefined;
  label: string;
  errorMessage?: string | undefined;
}

export default function SelectableTextField({ onClick, value, label, errorMessage }: IntProps) {
  return (
    <Box position='relative' data-test-id='selectable-container' onClick={onClick} mt='0px'>
      <Input
        key={value}
        label={label}
        defaultValue={value}
        errorMessage={errorMessage}
        InputProps={{
          endAdornment: (
            <Icon test-id='selectable-text-icon' name='selectArrow' w={16} h={16} view='0 0 16 16' />
          )
        }}
      />

      <Box
        sx={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          cursor: 'pointer'
        }}
      />
    </Box>
  );
}
