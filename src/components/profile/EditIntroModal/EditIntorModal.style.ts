import { Stack, styled } from '@mui/material';

export const EditIntroStackStyled = styled(Stack)<{ component?: React.ElementType }>`
  width: 100%;
  max-height: calc(100dvh - 138px);
  overflow-y: auto;

  @media (min-width: 768px) {
    width: 672px;
    max-height: calc(100dvh - 280px);
    // padding-right: 12px;
    // padding-left: 12px;
  }

  &::-webkit-scrollbar {
    width: 0px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 99px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #cbd5e1;
  }
`;
