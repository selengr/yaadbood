import Link from 'next/link';

//style
import {
  StyledAvatar,
  StyledUserJob,
  StyledUserLink,
  StyledUserName,
  StyledFriendItem,
  StyledOnlineBadge,
  StyledActionButton,
  StyledActionsContainer
} from './mutualFriendItem.style';
// constants
import { PROFILE } from '@/constants';
// type
import { IMutualFriendItemProps } from '../type';
// components
import MutualFriendIOption  from '../MutualFriendIOption';


const MutualFriendItem: React.FC<IMutualFriendItemProps> = ({
  onUndo,
  following,
  isUndoing,
  onUnsubscribe
}) => {
  const { SUBSCRIBE, SUBSCRIBED } = PROFILE.MUTUAL_FRIENDS;

  const target = following?.target;
  const job = target?.job || '';
  const lastName = target?.lastName || '';
  const username = target?.username || '';
  const firstName = target?.firstName || '';
  const profilePhoto = target?.profilePhoto || '';

  const FULL_NAME = `${firstName || ''} ${lastName || ''}`.trim();
  const userProfileUrl = `/c/${username}`;

  const handleUnsubscribeClick = () => {
    if (isUndoing) {
      onUndo();
    } else {
      onUnsubscribe();
    }
  };

  // this line are gonna remove afterfinding online key
  const isOnline = true

  return (
    <StyledFriendItem isUndoing={isUndoing}>    
      <Link href={userProfileUrl} style={{ position: "relative" }}>
        <StyledAvatar src={profilePhoto} />
        {isOnline && <StyledOnlineBadge />}
      </Link>
      <StyledUserLink href={userProfileUrl}>
        <StyledUserName variant='h6'>{FULL_NAME}</StyledUserName>
        <StyledUserJob variant='caption'>{job}</StyledUserJob>
      </StyledUserLink>
      <StyledActionsContainer>
        <StyledActionButton onClick={handleUnsubscribeClick}>
          {isUndoing ? SUBSCRIBE : SUBSCRIBED}
        </StyledActionButton>

        <MutualFriendIOption username={username}/>

      </StyledActionsContainer>
    </StyledFriendItem>
  );
};
export default MutualFriendItem;
