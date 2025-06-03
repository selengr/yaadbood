import { Avatar as MuiAvatar } from '@mui/material';

const Avatar = ({
  color,
  image,
  text,
  width,
  height
}: {
  color?: string;
  image?: string;
  text?: string;
  width?: number | string;
  height?: number | string;
}) => {
  function getFirstCharacter(str: string) {
    if (!str) return '';
    return str.trim().charAt(0).toUpperCase();
  }

  const defSize = { width: width || { xs: "32px", sm: "56px" }, height: height || { xs: "32px", sm: "56px" } };

  return image ? (
    <MuiAvatar sx={defSize} src={image} />
  ) : getFirstCharacter(text || '') ? (
    <MuiAvatar sx={{ ...defSize, bgcolor: color }}>
      {getFirstCharacter(text || '')}
    </MuiAvatar>
  ) : (
    <MuiAvatar sx={{ ...defSize, bgcolor: color }} />
  );
};

export default Avatar;
