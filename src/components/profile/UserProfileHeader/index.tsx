'use client';
import { useState } from 'react';
// hooks
import { useGetUserData } from '@/hooks/user';
// components
import { EditIntro } from '..';
import { Button, Icon } from '@/components/atoms';
import UserOptions from './components/UserOptions';
import { CoverImage, UserAvatar, ContactInfo, MutualConnections, FollowToggleButton } from './components';
// style
import {
  StyledJobTitle,
  StyledUserName,
  StyledWebsiteText,
  StyledWebsiteLink,
  StyledLocationText,
  StyledProfileContent,
  StyledSubscribersLink,
  StyledProfileContainer,
  StyledActionsContainer,
  StyledUserInfoContainer,
  StyledLocationContainer,
  StyledUserActionsContainer
} from './userProfileHeader.style';
// constants
import { PROFILE } from '@/constants';


// ---------------------------------- fake data for test
const mutualFriends = [
  {
    profilePhoto: 'data:image/jpeg;base64,/9j/4AAQSkZJRgAB',
    username: 'john_doe'
  },
  {
    profilePhoto: 'data:image/jpeg;base64,/9j/4AAQSkZJRgAB',
    username: 'jane_smith'
  },
  {
    profilePhoto: 'https://encrypted-tbn0.gstatic.com/images',
    username: 'alice_johnson'
  }
];

const _mutual = {
  "mutualCount": 8,
  "mutualFriends": [
    {
      "username": "john_doe",
      "profilePhoto": "https://avatars.githubusercontent.com/u/32909227"
    },
    {
      "username": "john_doe",
      "profilePhoto": "https://avatars.githubusercontent.com/u/32909227"
    },
    {
      "username": "john_doe",
      "profilePhoto": "https://avatars.githubusercontent.com/u/32909227"
    },
    {
      "username": "john_doe",
      "profilePhoto": "https://avatars.githubusercontent.com/u/32909227"
    },
    {
      "username": "john_doe",
      "profilePhoto": "https://avatars.githubusercontent.com/u/32909227"
    },
    {
      "username": "john_doe",
      "profilePhoto": "https://avatars.githubusercontent.com/u/32909227"
    },
    {
      "username": "john_doe",
      "profilePhoto": "https://avatars.githubusercontent.com/u/32909227"
    },
  ]
}

const mutualCount = 5;
// ----------------------------------

interface IProps {
  userProfile?: boolean;
}

const UserProfileHeader: React.FC<IProps> = ({ userProfile = "chynacarroll9517" }) => {
  const { SUBSCRIBED, VISIT_WEBSITE } = PROFILE.HEADER;
  const [isFollowing, setIsFollowing] = useState<any>(false);

  const { data } = useGetUserData();
  if (!data) return null;

  if (data.user?.isFollowing !== undefined && isFollowing !== Boolean(data?.user?.isFollowing)) {
    setIsFollowing(Boolean(data.user.isFollowing));
  }

  const { website, job, firstName, lastName, country, city, backgroundPhoto, profilePhoto } = data.user ?? {};
  const subscribedCount = data.subscribes?.followersCount || 0;
  // const subscribedCount = data.subscribes?.followersCount || 0;
  const fullName = `${firstName || ''} ${lastName || ''}`.trim();
  const location = country ? `${country} ${city || ''}`.trim() : null;
  const backPhoto = backgroundPhoto || '/imgs/cover-place-holder.png';
  console.log('================>',data);

  const toggleSubscribe = () => {
    setIsFollowing((prev: boolean) => !prev);
  };

  return (
    <StyledProfileContainer>

      <CoverImage backgroundPhoto={backPhoto} userProfile={userProfile} />

      <StyledProfileContent>

        <UserAvatar profilePhoto={profilePhoto || ''} fullname={fullName}/>
        <StyledActionsContainer>
          <Button type='button' icon variant='text'>
            <Icon w={24} h={24} name='premium' />
          </Button>

          {userProfile ? <UserProfileButtons /> : <MyProfileButtons />}
        </StyledActionsContainer>
        <StyledUserInfoContainer>
          <StyledUserName variant='h5'>{fullName}</StyledUserName>
          <StyledJobTitle variant='caption'>{job}</StyledJobTitle>
          <StyledLocationContainer>
            {location && (
              <>
                <StyledLocationText>{location}</StyledLocationText>
                <StyledLocationText>∙</StyledLocationText>
              </>
            )}
            <ContactInfo userData={data.user}/>
          </StyledLocationContainer>
          {website && (
            <StyledWebsiteLink href={website} target='_blank'>
              <StyledWebsiteText variant='caption'>{VISIT_WEBSITE}</StyledWebsiteText>
              <Icon
                name='openLink'
                iconStyle={{
                  svg: { fill: 'none' }
                }}
                w={16}
                h={16}
              />
            </StyledWebsiteLink>
          )}
          <StyledSubscribersLink href='/profile/subscribed'>
            {`${subscribedCount}+ ${SUBSCRIBED}`}
          </StyledSubscribersLink>
        </StyledUserInfoContainer>

        {userProfile && (
          <>
            <MutualConnections mutualFriends={_mutual.mutualFriends} mutualCount={_mutual.mutualCount} />
            <StyledUserActionsContainer>
              <FollowToggleButton userData={{ ...data?.user, isFollowing }} onToggle={toggleSubscribe} />
              <UserOptions
                userData={data?.user}
                isFollowing={isFollowing}
                onToggle={toggleSubscribe}
              />
            </StyledUserActionsContainer>
          </>
        )}
      </StyledProfileContent>
    </StyledProfileContainer>
  );
};

const UserProfileButtons = () => (
  <Button type='button' icon variant='text'>
    <Icon w={24} h={16} name='notification' />
  </Button>
);

const MyProfileButtons = () => (
  <>
    <EditIntro />
    <Button
      type='button'
      icon
      variant='text'
      sx={{ display: { xs: 'none', md: 'flex' } }}
      aria-label='Settings'>
      <Icon w={24} h={24} name='setting' />
    </Button>
  </>
);

export default UserProfileHeader;
