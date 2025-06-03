import React from 'react';

import { PROFILE } from '@/constants';
import { PostCardContext } from '@/components/profile/Activity/components/PostCard';

const usePostCard = () => {
  const context = React.useContext(PostCardContext);
  if (!context) {
    throw new Error(PROFILE.ACTIVITY.POST.POST_CARD_CONTEXT_ERROR);
  }
  return context;
};

export default usePostCard;
