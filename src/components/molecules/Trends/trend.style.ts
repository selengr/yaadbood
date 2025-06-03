// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// components
import { Button } from '@/components/atoms';


export const StyledTrendsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.neutrals.content};
  padding: 8px 12px;
  border-radius: 6px;
  overflow: hidden;
  gap: 12px;
`;

export const StyledTrendsHeader = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: -4px;
  justify-content: space-between;
`;

export const StyledTrendsTitle = styled(Typography)`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.gray[700]};
`;

export const StyledToggleButtonGroup = styled(Box)`
  display: flex;
  align-items: center;
  padding: 2px;
  gap: 2px;
  background-color: ${({ theme }) => theme.palette.neutrals.page};
  border-radius: 6px;
`;

const StyledBaseToggleButton = styled(Button)`
  height: 22px;
  font-size: 12px;
  padding: 2px 4px;
  min-height: 22px;
  font-weight: 400;
  border-radius: 4px;
`;

export const StyledActiveToggleButton = styled(StyledBaseToggleButton)(({ theme }) => ({
  color: theme.palette.gray[700],
  backgroundColor: theme.palette.neutrals.content,
  '&:hover': {
    backgroundColor: theme.palette.neutrals.content,
    color: theme.palette.gray[700],
  }
}));

export const StyledInactiveToggleButton = styled(StyledBaseToggleButton)(({ theme }) => ({
  color: theme.palette.gray[500],
  backgroundColor: 'transparent',
  '&:hover': {
    color: theme.palette.gray[400]
  }
}));

export const StyledCoinItem = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.palette.gray[700]};
  font-size: 12px;
  font-weight: 500;
  opacity: 0.5; 
`;

export const StyledCoinInfo = styled(Box)`
  gap: 6px;
  display: flex;
  font-size: 10px;
  font-weight: 400;
  align-items: center;
  justify-content: center;
`;

export const StyledCoinValue = styled(Typography)(({ theme }) => ({
    fontWeight: 400,
    fontSize: '12px',
    display : "flex",
    alignItems : "center",
    color: theme.palette.gray[700],
}));

export const StyledCoinChanges = styled(Typography)(({ theme }) => ({
    fontWeight: 400,
    fontSize: '10px',
    color: theme.palette.red[500],
}));
export const StyledCoinChangesContainer = styled(Box)`
  
  display: flex;
  height : 21px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
export const StyledCoinChangesBox = styled(Box)`
  gap: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;