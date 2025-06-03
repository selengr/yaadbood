//styles
import { ContentStyled } from './content.styled';
interface IProps {
  content?: string;
}

const Content = ({ content }: IProps) => {
  return <ContentStyled>{content}</ContentStyled>;
};

export default Content;
