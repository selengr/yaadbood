import { Box, Chip, styled, Typography } from '@mui/material';

export const ContainerStyled = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const BrandInfoStyled = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const BrandNameContainerStyled = styled(Box)`
  display: flex;
  align-items: center;
  gap: 2px;
  svg {
    width: 12px;
    height: 12px;
  }
`;

export const AdChipStyled = styled(Chip)(({ theme }) => ({
  fontSize: '10px',
  borderRadius: '4px',
  padding: '1px 8px',
  fontWeight: 500,
  color: theme.palette.gray['400'],
  backgroundColor: theme.palette.gray['100']
}));
export const AdAndOptionContainerStyled = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`;
export const BrandNameStyled = styled(Typography)`
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
`;
