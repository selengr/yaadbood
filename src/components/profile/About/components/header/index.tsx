import React from 'react';
import { UserState } from '@/types/auth';
//components
import { EditDescription } from '@/components/profile';
//styles
import { ContainerStyled, TitleStyled } from './header.style';
//constants
import { EDIT_ABOUT } from '@/constants';

interface Props {
  userData: UserState | undefined;
}

const Header: React.FC<Props> = ({ userData }) => {
  return (
    <ContainerStyled component='header'>
      <TitleStyled variant='h1'>{EDIT_ABOUT.ABOUT}</TitleStyled>
      <EditDescription userData={userData} />
    </ContainerStyled>
  );
};

export default Header;
