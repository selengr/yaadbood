import React from 'react';
// constants
import { PROFILE } from '@/constants';
// types
import { TActiveTab } from '@/types/posts';
// components
import { ArrowRightIcon } from '@/components/atoms';
// style
import { StyledShowAllText, StyledShowAllButton, StyledButtonContainer } from './showAll.style';

interface IProps {
  activeTab: TActiveTab;
}

const ShowAll: React.FC<IProps> = ({ activeTab }) => {
  return (
    <StyledButtonContainer>
      <StyledShowAllButton variant='text'>
        <StyledShowAllText>
          {PROFILE.ACTIVITY.SHOW_ALL} {activeTab}
          <ArrowRightIcon />
        </StyledShowAllText>
      </StyledShowAllButton>
    </StyledButtonContainer>
  );
};

export default ShowAll;
