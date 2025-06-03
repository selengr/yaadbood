import React from 'react';
// types
import { TActiveTab } from '@/types/posts';

// style
import { StyledTabButton, StyledTabContainer } from './tabs.style';

interface IProps {
  activeTab: TActiveTab;
  handleChangeTab: (tab: TActiveTab) => void;
}

const TAB_TYPES: TActiveTab[] = ['Posts', 'Comments'];

const Tabs: React.FC<IProps> = ({ activeTab, handleChangeTab }) => {
  return (
    <StyledTabContainer>
      {TAB_TYPES.map((type) => (
        <StyledTabButton
          onClick={handleChangeTab.bind(null, type)}
          key={type}
          variant='outlined'
          active={activeTab === type}
          aria-selected={activeTab === type}>
          {type}
        </StyledTabButton>
      ))}
    </StyledTabContainer>
  );
};

export default Tabs;
