import Styled from '@emotion/styled';
import { Box } from '@mui/material';

import Input from '../Input';

export const StyledCalendar = Styled(Box)`
       position: absolute;
       left: 0;
       top: -180px;
       width: 100%;
       height: 200px;
       display: flex;
       padding: 12px;
       background-color: #fff;
       z-index: 999;
       box-shadow: 2px 2px 5px #ccc;
       > div {
              flex-grow: 1;
       }
`;

export const StyledInput = Styled(Input)`
       width: 100%;
       flex-grow: 1;
        fieldset {
        border: none;
        outline: none;
        }
`;

import { IconButton, styled } from '@mui/material';

export const CalenderButtonStyled = styled(IconButton)(({ theme }) => ({
  width: '28px',
  height: '28px',
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '5px',
  svg: {
    width: 16,
    height: 16,
    fill: 'none',
    stroke: 'none'
  }
}));
