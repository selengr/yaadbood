import React, { PropsWithChildren } from 'react';
// types
import { Post } from '@/types/posts';
// conponents
import { Header, Content, Footer } from './components';

// styles
import { 
  ContainerStyled
} from './post.styled';

interface IPost {
  post: Post;
};

export const PostCardContext = React.createContext<IPost | null>(null);

export default function PostCard({ post, children }: PropsWithChildren<IPost>) {
  return (
    <PostCardContext.Provider value={{ post }}>
      <ContainerStyled>{children}</ContainerStyled>
    </PostCardContext.Provider>
  );
}

PostCard.Header = Header;
PostCard.Content = Content;
PostCard.Footer = Footer;
