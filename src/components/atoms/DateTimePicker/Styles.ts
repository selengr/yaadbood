import { styled } from '@mui/material';

export const DatePicker = styled('div')`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // gap: 50px;
  width: 100%;
  min-width: 200px;
`;
export const ScrollColumn = styled('div')`
  height: 200px;
  flex: 1;
  overflow-y: hidden;
  scroll-snap-type: y mandatory;
  position: relative;
  z-index: 2;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;

  /* Optimize performance */
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;

  &::-webkit-scrollbar {
    display: none;
  }

  .item {
    height: 40px;
    min-width: 77px;
    display: flex;
    justify-content: center;
    align-items: center;
    scroll-snap-align: center;
    font-size: 12px;
    color: ${({ theme }) => theme.palette.gray['400']};
    position: relative;
    transition:
      color 0.3s,
      font-size 0.3s;
  }

  .selected {
    font-weight: 500;
    font-size: 16px;
    color: ${({ theme }) =>
      theme.palette.mode === 'light' ? theme.palette.gray['800'] : theme.palette.gray['200']};
  }

  .no-select {
    user-select: none;
    cursor: grabbing;
  }

  .default-cursor {
    cursor: grab;
  }

  .near {
    font-weight: 400;
    font-size: 14px;
    color: ${({ theme }) => theme.palette.gray['500']};
  }

  .far {
    font-weight: 400;
    font-size: 12px;
    color: ${({ theme }) => theme.palette.gray['400']};
  }

  .item:empty {
    visibility: hidden;
  }
`;

export const SelectedContainer = styled('span')(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '40px',
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.gray['100'] : theme.palette.gray['800'],
  borderRadius: '8px',
  top: '50%',
  transform: 'translateY(-50%)'
}));
