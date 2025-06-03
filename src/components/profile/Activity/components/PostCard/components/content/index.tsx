import React from 'react';
import Image from 'next/image';
//hooks
import { usePostCard } from '@/hooks/post';
//components
import PostOptions from '../postOptions';
//styles
import {
  BodyStyled,
  TitleStyled,
  ContainerStyled,
  DescriptionStyled,
  ImageContainerStyled
} from './content.styled';

const Content = () => {
  const { post, post : { coverImage, title, description } } = usePostCard();
  
  return (
    <ContainerStyled>
     {coverImage && <ImageContainerStyled>
        <Image width={92} height={92} alt='thumbnail' src={coverImage || ''} />
      </ImageContainerStyled>
     }
      <BodyStyled>
        <TitleStyled variant='body1'>{title}</TitleStyled>
        <DescriptionStyled variant='caption'>{description}</DescriptionStyled>
      </BodyStyled>
      <PostOptions post={post} />
    </ContainerStyled>
  );
};

export default Content;
