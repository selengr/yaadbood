import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProviderProps } from '@mui/material/styles';
import { useMemo } from 'react';

import { useAppSelector } from '@/hooks/util/redux.hooks';
import { RootState } from '@/redux/store';
import { darkTheme, lightTheme } from '@/themes/materialui';

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const mode = useAppSelector((state: RootState) => state.theme.mode);
  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};
