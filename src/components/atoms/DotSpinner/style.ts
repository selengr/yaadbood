import { keyframes, styled } from '@mui/material/styles';

const dotPulseBefore = keyframes`
  0% {
    box-shadow: 9984px 0 0 -5px;
  }
  30% {
    box-shadow: 9984px 0 0 2px;
  }
  60%, 100% {
    box-shadow: 9984px 0 0 -5px;
  }
`;

const dotPulse = keyframes`
  0% {
    box-shadow: 9999px 0 0 -5px;
  }
  30% {
    box-shadow: 9999px 0 0 2px;
  }
  60%, 100% {
    box-shadow: 9999px 0 0 -5px;
  }
`;

const dotPulseAfter = keyframes`
  0% {
    box-shadow: 10014px 0 0 -5px;
  }
  30% {
    box-shadow: 10014px 0 0 2px;
  }
  60%, 100% {
    box-shadow: 10014px 0 0 -5px;
  }
`;

const DotPulse = styled('div')(({ theme }) => ({
  position: 'relative',
  left: '-9999px',
  width: '0.375rem',
  height: '0.375rem',
  borderRadius: '0.375rem',
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.white,
  boxShadow: '9999px 0 0 1px',
  animation: `${dotPulse} 1.5s infinite linear`,
  animationDelay: '0.25s',
  '&::before': {
    content: "''",
    display: 'inline-block',
    left: '1px',
    position: 'absolute',
    top: 0,
    width: '0.375rem',
    height: '0.375rem',
    borderRadius: '0.375rem',
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.white,
    boxShadow: '9984px 0 0 -5px',
    animation: `${dotPulseBefore} 1.5s infinite linear`,
    animationDelay: '0s'
  },
  '&::after': {
    content: "''",
    display: 'inline-block',
    left: '1px',
    position: 'absolute',
    top: 0,
    width: '0.375rem',
    height: '0.375rem',
    borderRadius: '0.375rem',
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.white,
    boxShadow: '10014px 0 0 -5px',
    animation: `${dotPulseAfter} 1.5s infinite linear`,
    animationDelay: '0.5s'
  }
}));

export default DotPulse;
