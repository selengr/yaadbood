import React, { FC } from 'react';
//constants
import { EDIT_ABOUT } from '@/constants';
//styles
import DotPulse from '@/components/atoms/DotSpinner/style';
import { SaveButtonStyle } from './SaveButton.style';

interface IProps {
  isPending: boolean;
  handleOnClick: () => void;
  isDisabled?: boolean;
}

const renderChildren = (isPending: boolean) => {
  if (isPending) return <DotPulse />;
  return EDIT_ABOUT.SAVE;
};

const SaveButton: FC<IProps> = ({ isPending, handleOnClick, isDisabled }) => {
  return (
    <SaveButtonStyle onClick={handleOnClick} disabled={isDisabled} type='submit'>
      {renderChildren(isPending)}
    </SaveButtonStyle>
  );
};

export default SaveButton;
