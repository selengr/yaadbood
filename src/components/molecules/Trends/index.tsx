'use client';
// React & libs
import Image from 'next/image';
import { useState } from 'react';
import { Box, Typography } from '@mui/material';

// style
import {
  StyledCoinItem,
  StyledCoinInfo,
  StyledCoinValue,
  StyledCoinChanges,
  StyledTrendsTitle,
  StyledTrendsHeader,
  StyledCoinChangesBox,
  StyledTrendsContainer,
  StyledToggleButtonGroup,
  StyledActiveToggleButton,
  StyledCoinChangesContainer,
  StyledInactiveToggleButton
} from './trend.style';
// types
import { ITrendsProps, ITrendTab } from './types';
// constants
import { PROFILE } from '@/constants';
// public
import { ArrowDownIcon } from '../../../../public/icons/home/ArrowDownIcon';
import { FluctuateChartIcon } from '../../../../public/icons/home/FluctuateChartIcon';

const Trends: React.FC<ITrendsProps> = ({
  coins,
  onTabChange,
  defaultActiveTab = PROFILE.TREND.CRYPTO as ITrendTab
}) => {
  const [activeTab, setActiveTab] = useState<ITrendTab>(defaultActiveTab);

    const handleTabChange = (tab: ITrendTab) => {
      setActiveTab(tab);
      onTabChange?.(tab);
    };

    const { TITLE, CRYPTO, FOREX, LOCAL } = PROFILE.TREND;

  const renderButton = (tab: ITrendTab, label: string) => {
    const isActive = activeTab === tab;
    const ButtonComponent = isActive ? StyledActiveToggleButton : StyledInactiveToggleButton;

    const handleClick = () => handleTabChange(tab);

    return (
      <ButtonComponent variant='contained' onClick={handleClick}>
        {label}
      </ButtonComponent>
    );
  };

  return (
    <StyledTrendsContainer>
      <StyledTrendsHeader>
        <StyledTrendsTitle>{TITLE}</StyledTrendsTitle>
        <StyledToggleButtonGroup>
          {renderButton('Crypto', CRYPTO)}
          {renderButton('Forex', FOREX)}
          {renderButton('Local', LOCAL)}
        </StyledToggleButtonGroup>
      </StyledTrendsHeader>

      {coins?.map((coin, coinIdx) => (
        <StyledCoinItem key={coin?.id}>
          <StyledCoinInfo>
            {coinIdx + 1} <Image src={coin?.icon} width={20} height={20} alt={`${coin?.name} image`} />
            <Typography sx={{ fontSize: 12 }}>{coin?.name}</Typography>
          </StyledCoinInfo>

          <Box sx={{ display: 'flex', flexDirection: 'row' }} gap={2}>
            <StyledCoinValue>${coin?.value}</StyledCoinValue>
            <StyledCoinChangesContainer>
              <FluctuateChartIcon width={'100%'} />
              <StyledCoinChangesBox>
                <ArrowDownIcon />
                <StyledCoinChanges>3.05%</StyledCoinChanges>
              </StyledCoinChangesBox>
            </StyledCoinChangesContainer>
          </Box>
        </StyledCoinItem>
      ))}
    </StyledTrendsContainer>
  );
};

export default Trends;
