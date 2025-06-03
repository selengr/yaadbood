'use client';
// types
import { UserState } from '@/types/auth';
// constants
import { PROFILE } from '@/constants';
// components
import { DotSpinner } from '@/components/atoms';
// style
import {
  StyledDotSpinner,
  StyledSubscribeButton,
  StyledSubscribedButton,
  StyledLoadingContainer
} from './followToggleButton.style';
// hooks
import { useFollowActions } from '@/hooks/user';

interface IProps {
  userData: UserState;
  onToggle?: () => void; 
}
const FollowToggleButton: React.FC<IProps> = ({ userData, onToggle }) => {

  const { SUBSCRIBED, SUBSCRIBE } = PROFILE.HEADER;
  const isFollowing = userData?.isFollowing;
  const buttonText = isFollowing ? SUBSCRIBED : SUBSCRIBE;

  const { handleFollowAction, isLoading } = useFollowActions(onToggle);

  const renderButtonContent = () => {
    if (isLoading) {
      return (
        <StyledLoadingContainer>{isFollowing ? <StyledDotSpinner /> : <DotSpinner />}</StyledLoadingContainer>
      );
    }
    return buttonText;
  };

  const ButtonComponent = !isFollowing ? StyledSubscribedButton : StyledSubscribeButton;

  const renderButton = () => {
    return (
      <ButtonComponent
        variant={!isFollowing ? 'outlined' : 'contained'}
        onClick={() => handleFollowAction(Boolean(!isFollowing), userData.id, userData.isFollowing)}
        disabled={isLoading}>
        {renderButtonContent()}
      </ButtonComponent>
    );
  };

  return renderButton();
};

export default FollowToggleButton;
