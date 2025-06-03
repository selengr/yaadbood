import { Paper, styled } from '@mui/material';
export const EmojiPickerContainer = styled(Paper)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  // boxShadow: 'none',
  overflow: 'hidden',
  width: 'fit-content',
  '.padding-lr': {
    paddingRight: '8px !important',
    paddingLeft: '8px !important'
  },
  '--rgb-background': '245, 246, 250',
  '--rgb-input': '255, 255, 255',
  '--color-border': 'white',
  '--rgb-accent': '29, 161, 243',
  '--rgb-color': '60, 60, 67, 0.35',
  'em-emoji-picker': {
    section: {
      width: 'calc(100px +(var(--padding) + var(--sidebar-width))) !important'
    }
  }
}));
