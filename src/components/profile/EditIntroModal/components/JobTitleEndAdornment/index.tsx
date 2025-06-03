import React from 'react';
//components
import { Box } from '@mui/material';

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const JobTitleEndAdornment = ({ open, setOpen }: IProps) => {
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box
      onClick={handleClick} // Toggle dropdown on icon click
      sx={{
        position: 'absolute',
        right: 16,
        top: 16,
        cursor: 'pointer'
      }}>
      <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M13.2797 5.9668L8.93306 10.3135C8.41973 10.8268 7.57973 10.8268 7.06639 10.3135L2.71973 5.9668'
          stroke='#64748B'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </Box>
  );
};

export default JobTitleEndAdornment;
