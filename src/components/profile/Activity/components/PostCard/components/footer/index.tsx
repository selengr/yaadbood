import React from 'react';
// constants
import { PROFILE } from '@/constants';
// hooks
import { usePostCard } from '@/hooks/post';
// styles
import { ContainerStyled } from './footer.style';

const Footer = () => {
  const { post : { commentCount } } = usePostCard();
  
  return (
    <ContainerStyled>
      {commentCount ?? 0} {PROFILE.ACTIVITY.POST.COMMENTS}
    </ContainerStyled>
  );
};

export default Footer;
