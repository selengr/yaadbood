import { useState } from 'react';
// @mui
import { styled, alpha } from '@mui/material/styles';
import {
  Box,
  Step,
  Paper,
  Button,
  Stepper,
  StepLabel,
  Typography,
  StepConnector,
  stepConnectorClasses,
} from '@mui/material';
import { StepIconProps } from '@mui/material/StepIcon';
// utils
// import { bgGradient } from '@/utils/cssStyles';
import Iconify from '@/components/components/iconify/Iconify';





export const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      //     borderColor: theme.palette.success.main
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.success.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderRadius: 1,
    borderTopWidth: 3,
    borderColor: theme.palette.divider,
  },
}));

export const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    height: 22,
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.disabled,
    ...(ownerState.active && {
      color: theme.palette.success.main,
    }),
    '& .QontoStepIcon-completedIcon': {
      zIndex: 1,
      fontSize: 18,
      color: theme.palette.success.main,
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  })
);

export function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Iconify
          icon="eva:checkmark-fill"
          className="QontoStepIcon-completedIcon"
          width={24}
          height={24}
        />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

// here ===== con
export const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 17,
    padding: '0 10px',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
      borderStyle: 'dotted',
      borderTopWidth: 5,
      width: '100%',

      // ...bgGradient({
      //   startColor: theme.palette.primary.main,
      //   endColor: theme.palette.primary.main,
      // }),
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
      borderStyle: 'dotted',
      borderTopWidth: 5,
      width: '100%',
      // ...bgGradient({
      //   startColor: theme.palette.primary.main,
      //   endColor: theme.palette.primary.main,
      // }),
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.divider,
    borderStyle: 'dotted',
    borderTopWidth: 5,
    width: '100%',
  },
}));

export const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  zIndex: 1,
  width: 32,
  height: 32,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.disabled,
  border: '2px solid var(--text-colors-disable, #A8A8A8)',

  ...(!ownerState.active &&
    ownerState.completed && {
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
      color: theme.palette.common.white,
      border: '2px solid var(--Color1, #1758BA)',
      // ...bgGradient({
      //   endColor: theme.palette.error.main,
      // }),
    }),

  ...(ownerState.completed && {
    color: theme.palette.common.white,
    // ...bgGradient({
    //   endColor: theme.palette.error.main,
    // }),
  }),
}));

export function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className, icon } = props;
  let stepIcon = () => (
    <Box
      sx={{
        width: 11,
        height: 11,
        borderRadius: 50,
        backgroundColor: active || completed ? '#1758BA' : '#A8A8A8',
      }}
    ></Box>
  );
  const icons: { [index: string]: React.ReactElement } = {
    1: stepIcon(),
    2: stepIcon(),
    3: stepIcon(),
    4: stepIcon(),
    5: stepIcon(),
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(icon)]}
    </ColorlibStepIconRoot>
  );
}
