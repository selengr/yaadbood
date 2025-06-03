import React from 'react';
import Image from 'next/image';
// constants
import { PROFILE } from '@/constants'
// style
import {
    StyledLoadingText,
    StyledLoadingOverlay,
    StyledLoadingSpinner,
  } from './loadingOverlay.style';

interface IProps {
  loadingText?: string;
  spinnerSize?: number;
  spinnerImage?: string;
}

const LoadingOverlay: React.FC<IProps> = ({
    loadingText = PROFILE.PROFILE_PHOTO.SAVING,
    spinnerSize = 32,
    spinnerImage = '/icons/white-loading.svg',
    ...props
  }) => {
    return (
      <StyledLoadingOverlay {...props}>
        <StyledLoadingSpinner>
          <Image 
            src={spinnerImage} 
            width={spinnerSize} 
            height={spinnerSize} 
            alt={loadingText} 
          />
        </StyledLoadingSpinner> 
        <StyledLoadingText>{loadingText}</StyledLoadingText>
      </StyledLoadingOverlay>
    );
  };

export default LoadingOverlay