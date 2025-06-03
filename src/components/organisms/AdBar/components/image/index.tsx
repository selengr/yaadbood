import React from 'react';
//styles
import { ImageStyled } from './image.style';

const AdImage = () => {
  return (
    <ImageStyled src='/imgs/rightBarImage.png' width={270} height={225} alt='sidebar banner' loading='lazy' />
  );
};

export default AdImage;
