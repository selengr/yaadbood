import React from 'react';
//components
import { Avatar, VerifyIcon } from '@/components/atoms';
import { ActionOptions } from '../';
//styles
import {
  AdAndOptionContainerStyled,
  AdChipStyled,
  BrandInfoStyled,
  BrandNameContainerStyled,
  BrandNameStyled,
  ContainerStyled
} from './header.style';

const Header = () => {
  return (
    <ContainerStyled>
      <BrandInfoStyled>
        <Avatar color='red' width={32} height={32} />
        <BrandNameContainerStyled>
          <BrandNameStyled>{`{Brand name}`}</BrandNameStyled>
          <VerifyIcon fill='#1DA1F3' />
        </BrandNameContainerStyled>
      </BrandInfoStyled>
      <AdAndOptionContainerStyled>
        <AdChipStyled label='AD' size='small' />
        <ActionOptions />
      </AdAndOptionContainerStyled>
    </ContainerStyled>
  );
};

export default Header;
