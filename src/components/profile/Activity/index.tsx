'use client';
import { useState } from 'react';
import { Box } from '@mui/material';
// hooks
import { useGetUserContent } from '@/hooks/user';
// constants
import { PROFILE } from '@/constants';
// components
import { CommentCard, PostCard, Tabs, ShowAll } from './components';
// style
import {
  StyledTitle,
  StyledSection,
  StyledDotPulse,
  StyledNotDataFound,
  StyledLoaderContainer
} from './activity.style';
// types 
import { UserContentBody, UserContentEnum, TActiveTab } from '@/types/posts';

type IProps = {
  username?: string;
};

const VISIBLE_ITEMS_LIMIT = 3;

const Activity: React.FC<IProps> = ({ username }) => {
  const { LATEST, ERROR, POST : { TABS } } = PROFILE.ACTIVITY;
  const [activeTab, setActiveTab] = useState<TActiveTab>('Posts');

  const userContentBody : UserContentBody = {
    username,
    types: [UserContentEnum.ANALYSIS, UserContentEnum.BLOG, UserContentEnum.SIGNAL, UserContentEnum.TWEET],
    markets: ['Forex'],
    i_bookmarked: activeTab === TABS.SAVED,
    i_commented: activeTab === TABS.COMMENTS,
    i_liked: activeTab === TABS.LIKES,
    i_reposted: activeTab === TABS.POSTS
  }; 

  const userContent = useGetUserContent(userContentBody);
  
  const handleChangeTab = (tab: TActiveTab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    if (userContent?.isLoading) {
      return (
        <StyledLoaderContainer>
          <StyledDotPulse />
        </StyledLoaderContainer>
      );
    }

    if (userContent?.error) {
      return <div>{ERROR}</div>;
    }

    if (!userContent?.data?.length) {
      return <StyledNotDataFound> <div>No {activeTab.toLowerCase()} found</div> </StyledNotDataFound>;
    }

    return userContent.data
      .slice(0, VISIBLE_ITEMS_LIMIT)
      .map((post) =>
        activeTab === 'Comments' ? (
          <CommentCard post={post} key={post._id} />
        ) : (
          <PostCard post={post} key={post._id}>
            <PostCard.Header />
            <PostCard.Content />
            <PostCard.Footer />
         </PostCard>
        )
      );
  };

  return (
    <StyledSection>
      <StyledTitle>{LATEST}</StyledTitle>

      <Box component='main'>
       <Tabs activeTab={activeTab} handleChangeTab={handleChangeTab} />
        {renderContent()}
      </Box>

      {!userContent?.error && userContent.data && userContent.data?.length > VISIBLE_ITEMS_LIMIT && (
      <ShowAll activeTab={activeTab} />
    )}

    </StyledSection>
  );
}

export default Activity