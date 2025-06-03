import React from 'react';
import moment from 'moment';
// hooks
import { usePostCard } from '@/hooks/post';
// styles
import { ContainerStyled, TimeStyled, UsernameStyled } from './header.style';

const Header = () => {
  const { post : { type, createdAt, user } } = usePostCard();

  return (
    <ContainerStyled>
      <UsernameStyled variant='caption'>{user?.username}</UsernameStyled>
      <TimeStyled variant='caption'>
        {type} ∙ {moment(createdAt).fromNow()}
      </TimeStyled>
    </ContainerStyled>
  );
};

export default Header;
