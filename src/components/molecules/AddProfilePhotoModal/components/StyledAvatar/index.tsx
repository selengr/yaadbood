// @mui
import { Avatar } from '@mui/material';

interface IProps {
    size?: 'small' | 'medium' | 'large';
    src?: string;
}

export interface AvatarConfig {
  size: 'small' | 'medium' | 'large';
  src: string;
}
  
  const StyledAvatar = ({ size = 'medium', ...props }: IProps) => {
    const sizes = {
      small: { xs: '31px', md: '56px' },
      medium: { xs: '50px', md: '88px' },
      large: { xs: '60px', md: '106px' }
    };
  
    return (
      <Avatar
        sx={{
          width: sizes[size],
          height: sizes[size]
        }}
        {...props}
      />
    );
  };

  export default StyledAvatar