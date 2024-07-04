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
     stepConnectorClasses
} from '@mui/material';
import { StepIconProps } from '@mui/material/StepIcon';
// utils
import { bgGradient } from '@/utils/cssStyles';
import Iconify from '@/components/iconify/Iconify';


export const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
         top: 10,
         left: 'calc(-50% + 16px)',
         right: 'calc(50% + 16px)'
    },
    [`&.${stepConnectorClasses.active}`]: {
         [`& .${stepConnectorClasses.line}`]: {
          //     borderColor: theme.palette.success.main
              borderColor: '#1758BA'
         }
    },
    [`&.${stepConnectorClasses.completed}`]: {
         [`& .${stepConnectorClasses.line}`]: {
              borderColor: theme.palette.success.main
         }
    },
    [`& .${stepConnectorClasses.line}`]: {
         borderRadius: 1,
         borderTopWidth: 3,
         borderColor: theme.palette.divider
    }
}));

export const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
         height: 22,
         display: 'flex',
         alignItems: 'center',
         color: theme.palette.text.disabled,
         ...(ownerState.active && {
              color: theme.palette.success.main
         }),
         '& .QontoStepIcon-completedIcon': {
              zIndex: 1,
              fontSize: 18,
              color: theme.palette.success.main
         },
         '& .QontoStepIcon-circle': {
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: 'currentColor'
         }
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

export const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
         top: 22
    },
    [`&.${stepConnectorClasses.active}`]: {
         [`& .${stepConnectorClasses.line}`]: {
              ...bgGradient({
                   startColor: theme.palette.error.light,
                   endColor: theme.palette.error.main
              })
         }
    },
    [`&.${stepConnectorClasses.completed}`]: {
         [`& .${stepConnectorClasses.line}`]: {
              ...bgGradient({
                   startColor: theme.palette.error.light,
                   endColor: theme.palette.error.main
              })
         }
    },
    [`& .${stepConnectorClasses.line}`]: {
         height: 3,
         border: 0,
         borderRadius: 1,
         backgroundColor: theme.palette.divider
    }
}));

export const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
    zIndex: 1,
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.disabled,
    backgroundColor:
         theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
    ...(ownerState.active && {
         boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
         color: theme.palette.common.white,
         ...bgGradient({
              startColor: theme.palette.error.light,
              endColor: theme.palette.error.main
         })
    }),
    ...(ownerState.completed && {
         color: theme.palette.common.white,
         ...bgGradient({
              startColor: theme.palette.error.light,
              endColor: theme.palette.error.main
         })
    })
}));

export function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className, icon } = props;

    const icons: { [index: string]: React.ReactElement } = {
         1: <Iconify icon="eva:settings-2-outline" width={24} />,
         2: <Iconify icon="eva:person-add-outline" width={24} />,
         3: <Iconify icon="eva:monitor-outline" width={24} />
    };

    return (
         <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
              {icons[String(icon)]}
         </ColorlibStepIconRoot>
    );
}