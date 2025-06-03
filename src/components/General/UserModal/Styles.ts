import { Menu, MenuItem, styled } from '@mui/material';

export const MenuStyle = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: '16px',
    backgroundColor: theme.palette.neutrals['content'],
    boxShadow: '0px 12px 12px 0px #00000014',
    marginTop: '10px',
    width: '294px'
  },
  '& .MuiList-root': {
    padding: '0px'
  }
}));

export const MenuItemStyle = styled(MenuItem)(({ theme }) => ({
  padding: '12px 16px',
  fontSize: '15px',
  color: theme.palette.gray['600'],
  fontWeight: 500
}));
