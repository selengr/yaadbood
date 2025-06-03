import { Box, styled, Tab, Tabs } from '@mui/material';

export const SignalFormHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'space-between',
  position: 'relative'
}));

export const StyledTab = styled(Tab)`
  text-transform: none;
  min-height: 20px;
`;

export const StyledTabs = styled(Tabs)`
  min-height: 20px;
`;

export const DraggableContent = styled(Box)(({ theme }) => ({
  cursor: 'default',
  padding: '16px 24px',
  [theme.breakpoints.down('sm')]: {
    padding: '16px',
    width: '100vw'
  },
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none'
  }
}));

export const SignalProfile = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
}));

export const SignalVisibility = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  display: 'flex',
  gap: '3px',
  alignItems: 'center',
  color: theme.palette.gray['500']
}));

export const MobileSubmitBoxParent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '24px',
  [theme.breakpoints.up('sm')]: {
    paddingRight: '3rem'
  }
}));

export const MobileSubmitBoxContent = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'flex'
  },
  gap: '8px',
  alignItems: 'center'
}));

export const SignalPositionContainer = styled(Box)(({ theme }) => ({
  position: 'relative'
}));

export const SignalPositionContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '4px',
  borderRadius: '12px',
  backgroundColor: theme.palette.neutrals['page'],
  gap: '8px'
}));

export const SpotPositionBox = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '8px',
  borderRadius: '12px',
  textAlign: 'center',
  transition: 'all .3s',
  cursor: 'pointer'
}));

export const FuturePositionBox = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '8px',
  borderRadius: '12px',
  textAlign: 'center',
  transition: 'all .3s',
  cursor: 'pointer'
}));

export const SignalShortLongContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '4px',
  borderRadius: '12px',
  backgroundColor: theme.palette.neutrals['page'],
  gap: '8px'
}));

export const LongPositionBox = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '8px',
  borderRadius: '12px',
  textAlign: 'center',
  transition: 'all .3s',
  cursor: 'pointer'
}));

export const ShortPositionBox = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '8px',
  borderRadius: '12px',
  textAlign: 'center',
  transition: 'all .3s',
  cursor: 'pointer'
}));

export const SelectedMarketContainer = styled(Box)(({ theme }) => ({}));

export const SelectedMarketMobile = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between'
}));

export const SelectedMarketContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.gray['200'],
  borderRadius: '12px',
  padding: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}));

export const SelectedMarketIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '6px'
}));

export const SelectedMarketDetails = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center'
}));

export const TimeFrameContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '12px',
  alignItems: 'flex-end'
}));

export const TimeFrameContent = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '3px',
  color: theme.palette.gray['400']
}));

export const EntryTargetContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '12px'
}));

export const EntryContent = styled(Box)(({ theme }) => ({
  width: '100%',
  flexDirection: 'column',
  gap: '8px'
}));

export const TargetContent = styled(Box)(({ theme }) => ({
  width: '100%',
  flexDirection: 'column',
  gap: '8px'
}));

export const StoplossCapitalContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '12px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column'
  }
}));

export const SubmitContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: '100%',
  padding: '20px',
  bgcolor: 'white',
  display: 'flex',
  gap: '12px',
  backgroundColor: "white",
  justifyContent: 'flex-end',
  alignItems: 'center'
}));

export const CapitalView = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'start',
  gap: '2px'
}));