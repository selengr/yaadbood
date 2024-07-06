import { Theme } from '@mui/material/styles';
//

import Input from './Input';
import Checkbox from './Checkbox';
import Typography from './Typography';
// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme: Theme) {
  return Object.assign(
    Input(theme),
    Checkbox(theme),
    Typography(theme)
  );
}
