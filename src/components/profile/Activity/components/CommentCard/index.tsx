import React from 'react';
import moment from 'moment';
// types
import { Post } from '@/types/posts';
// constants
import { PROFILE } from '@/constants';
// components
import { DropdownMenu } from '@/components/molecules';
// style
import { 
  StyledTitle, 
  StyledUsername, 
  StyledTimestamp, 
  StyledCommentCard, 
  StyledDescription, 
  StyledCommentHeader, 
  StyledCommentContent, 
  StyledMenuContainer ,
  StyledCommentContainer, 
  StyledCommentTextContainer, 
} from './commentCard.style'

type IProps = {
  post: Post;
};

const CommentCard: React.FC<IProps> = ({ post: { description, createdAt, user, title } }) => {
  const { REPORT, RESTRICT, BLOCK, REMOVE } = PROFILE.ACTIVITY.COMMENT;

  return (
    <StyledCommentCard>
      <StyledCommentContainer>
        <StyledCommentHeader>
          <StyledUsername variant='caption'>{user?.username}</StyledUsername>
          <StyledTimestamp>∙ {moment(createdAt).fromNow()}</StyledTimestamp>
        </StyledCommentHeader>
        <StyledCommentContent>
          <StyledCommentTextContainer>
            <StyledTitle>{title}</StyledTitle>
            <StyledDescription>{description}</StyledDescription>
          </StyledCommentTextContainer>

          <StyledMenuContainer>
            <DropdownMenu
              items={[
                { label: REPORT, icon: '', onClick: () => console.log(REPORT) },
                { label: RESTRICT, icon: '', onClick: () => console.log(RESTRICT) },
                { label: BLOCK, icon: '', onClick: () => console.log(BLOCK) },
                { label: REMOVE, icon: '', onClick: () => console.log(REMOVE), sx: { color: '#FF2661 !important' } }
              ]}
            />
          </StyledMenuContainer>
        </StyledCommentContent>
      </StyledCommentContainer>
    </StyledCommentCard>
  );
};

export default CommentCard;
