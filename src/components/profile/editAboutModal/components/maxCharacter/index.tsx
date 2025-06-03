import React, { FC } from 'react';
//constants
import { EDIT_ABOUT } from '@/constants';
//styles
import { CustomTypography, MaxCharacterContainer } from './maxCharacter.style';

interface IProps {
  altInput?: string;
}

const getCharacterCount = (input?: string): string => {
  return `${input?.length} / ${EDIT_ABOUT.MAX_ChaRACTER}`;
};

const MaxCharacter: FC<IProps> = ({ altInput }) => {
  return (
    <MaxCharacterContainer>
      <CustomTypography>{getCharacterCount(altInput)}</CustomTypography>
    </MaxCharacterContainer>
  );
};

export default MaxCharacter;
