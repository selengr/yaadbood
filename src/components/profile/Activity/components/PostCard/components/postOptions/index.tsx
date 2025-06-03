'use client';

// types
import { Post } from '@/types/posts';
// constants
import { PROFILE } from '@/constants';
//components
import { DropdownMenu } from '@/components/molecules';
// styles
import { StyledMenuContainer } from './postOptions.styled';

const PostOptions = ({ post }: { post: Post }) => {
  const { EDIT, COPY_LINK, DELETE } = PROFILE.ACTIVITY.POST;

  return (
    <StyledMenuContainer>
      <DropdownMenu
        items={[
          { label: COPY_LINK, icon: '', onClick: () => console.log(COPY_LINK) },
          { label: EDIT, icon: '', onClick: () => console.log(EDIT) },
          { label: DELETE, icon: '', onClick: () => console.log(DELETE), sx: { color: 'red' } }
        ]}
      />
    </StyledMenuContainer>
  );
};

export default PostOptions;
