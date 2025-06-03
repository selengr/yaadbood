import { UserState } from '@/types/auth';
import React from 'react';
//hooks
import { useTextOverflow } from '@/hooks/about';
//conponents
import { Box } from '@mui/material';
//styles
import { DescriptionTypography, TruncateBox } from './main.style';
import { useSession } from 'next-auth/react';

interface IProps {
  userData: UserState | undefined;
}

const Main: React.FC<IProps> = ({ userData }) => {
  const userDescription = userData?.description;

  const { expanded, isOverflowing, textRef, toggleExpanded } = useTextOverflow(userDescription);

  const renderTruncate = (isOverflowing: boolean) => {
    if (isOverflowing && !expanded)
      return (
        <TruncateBox
          component='span'
          onClick={toggleExpanded}
          expanded={expanded??false}
          isOverflowing={isOverflowing}
        />
      );
    return null;
  };

  return (
    <Box component='main'>
      <div>
        {userDescription ? userDescription : '...'}
        {renderTruncate(isOverflowing)}
      </div>
    </Box>
  );
};

export default Main;
