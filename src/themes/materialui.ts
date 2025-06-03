import { createTheme } from '@mui/material/styles';

import { LinkBehaviour } from '@/components/common/LinkBehaviour';
import { darkColors, lightColors } from './colors';
import { dialog } from './dialog';
import { input } from './input';
import { typography } from './designsystem/atoms';
import { buttons } from './designsystem/atoms';

export const lightTheme = createTheme({
  typography: {
    fontFamily: 'Ravi, Arial, sans-serif'
  },
  palette: {
    mode: 'light',
    ...lightColors
  },
  components: {
    MuiButton: {
      ...buttons
    },
    MuiFilledInput: { ...input },
    MuiDialog: { ...dialog },
    MuiLink: {
      defaultProps: {
        component: LinkBehaviour
      }
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehaviour
      }
    },
    MuiTypography: {
      ...typography
    }
  },
  zIndex: {
    drawer: 1000003,
    modal: 1000002,
    snackbar: 1000002
  },
  shape: {
    roundedXs: '6px',
    roundedSm: '8px',
    roundedMd: '12px',
    roundedLg: '16px',
    roundedXl: '20px'
  }
});

export const darkTheme = createTheme({
  typography: {
    fontFamily: 'Ravi, Arial, sans-serif'
  },
  palette: {
    mode: 'dark',
    ...darkColors
  },
  components: {
    MuiButton: { ...buttons },
    MuiFilledInput: { ...input },
    MuiDialog: { ...dialog },
    MuiLink: {
      defaultProps: {
        component: LinkBehaviour
      }
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehaviour
      }
    }
  },
  zIndex: {
    drawer: 1000001,
    modal: 1000002,
    snackbar: 1000002
  },
  shape: {
    roundedXs: '6px',
    roundedSm: '8px',
    roundedMd: '12px',
    roundedLg: '16px',
    roundedXl: '20px'
  }
});

declare module '@mui/material/styles' {
  interface PaletteColor {
    '50': string;
    '100': string;
    '200': string;
    '300': string;
    '400': string;
    '500': string;
    '600': string;
    '700': string;
    '800': string;
    '900': string;
    '950': string;
    light: string;
    main: string;
    dark: string;
    page: string;
    content: string;
  }
  interface Palette {
    primary: Palette['primary'];
    green: Palette['primary'];
    info: Palette['primary'];
    warning: Palette['primary'];
    red: Palette['primary'];
    indigo: Palette['primary'];
    purple: Palette['primary'];
    gray: Palette['primary'];
    neutrals: Palette['primary'];
  }
  interface PaletteOptions {
    green: PaletteOptions['primary'];
    red: PaletteOptions['primary'];
    indigo: PaletteOptions['primary'];
    purple: PaletteOptions['primary'];
    gray: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    gray: true;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsColorOverrides {
    darkGray: true;
  }
}

// Extend the default theme type to include our custom border radius values
declare module '@mui/material/styles' {
  interface Theme {
    shape: {
      roundedXs: string;
      roundedSm: string;
      roundedMd: string;
      roundedLg: string;
      roundedXl: string;
    };
  }
  interface ThemeOptions {
    shape?: {
      roundedXs?: string;
      roundedSm?: string;
      roundedMd?: string;
      roundedLg?: string;
      roundedXl?: string;
    };
  }
}
