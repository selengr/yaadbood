import { useMediaQuery } from '@mui/material';

const useModal = () => {
  const isMobile = useMediaQuery('(max-width:768px)');

  return { isMobile };
};

export default useModal;
