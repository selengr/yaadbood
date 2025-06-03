'use client';

//components
import { TopRated } from '@/components/profile';
import { Header, Title, Content, AdImage } from './components';
//styles
import { ContainerStyled, TopContainerStyled, WrapperStyled } from './Styles';

const AdBar = ({
  showTopRated,
  display = 'flex'
}: {
  showTopRated?: boolean;
  display?: { xs: string; lg: string } | string;
}) => {
  return (
    <WrapperStyled sx={{ display }}>
      <ContainerStyled>
        <TopContainerStyled>
          <Header />
          <Title />
          <Content content={'test content for ad bar'} />
        </TopContainerStyled>
        <AdImage />
      </ContainerStyled>
      {showTopRated ? <TopRated /> : null}
    </WrapperStyled>
  );
};

export default AdBar;
