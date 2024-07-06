'use client';

import { useMemo, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import {
  Box,
  Step,
  Paper,
  Button,
  Stepper,
  StepLabel,
  Typography,
  Stack,
  Alert,
} from '@mui/material';
// utils

import {
  ColorlibConnector,
  ColorlibStepIcon,
  QontoConnector,
  QontoStepIcon,
} from './StepperDesign';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormDataSchema } from './schema';
import FormProvider from '@/components/hook-form/FormProvider';
import { LoadingButton } from '@mui/lab';
import OrderStepFour from './step-four/EventStepFour';
import EventStepFive from './step-four/EventStepFour';
import EventStepOne from './step-one/EventStepOne';
import EventStepTwo from './step-two/EventStepTwo';
import EventStepThree from './step-three/EventStepThree';
import EventStepFour from './step-five/EventStepFive';

// ----------------------------------------------------------------------

// const STEPS = ['Select campaign settings', 'Create an ad group', 'Create an ad'];
const STEPS = [
  {
    id: 1,
    name: 'اطلاعات',
    fields: ['stepOne'],
  },
  {
    id: 0,
    name: 'رسانه',
    fields: ['stepTwo'],
  },
  {
    id: 3,
    name: 'میزبان / مهمان',
    fields: ['stepThree'],
  },
  {
    id: 2,
    name: 'امکانات',
    fields: ['stepFour'],
  },
  { id: 4, name: 'ثبت نهایی' },
];

// --------------------------------------------------------
type FormValuesProps = {
  stepOne?: string;
  stepTwo?: string;
  stepThree?: string;
  stepFour?: string;
  stepFive?: string;
};
// --------------------------------------------------------

function getStepContent({ step, delta }: { step: number; delta: number }) {
  switch (step) {
    case 0:
      return <EventStepOne delta={delta} />;
    case 1:
      return <EventStepTwo delta={delta} />;
    case 2:
      return <EventStepThree delta={delta} />;
    case 3:
      return <EventStepFour delta={delta} />;
    case 4:
      return <EventStepFive delta={delta} />;
    default:
      return 'Unknown step';
  }
}

export default function CustomizedSteppers() {
  const [previousStep, setPreviousStep] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const delta: number = activeStep - previousStep;

  const defaultValues = useMemo(
    () => ({
      // step one
      stepOne: '',
      stepTwo: '',
      stepThree: '',
      stepFour: '',
      stepFive: '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // [currentUserList]
    []
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(FormDataSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    trigger,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValuesProps> = (data) => {
    console.log(data);
    reset();
  };

  type FieldName = keyof FormValuesProps;

  const handleNext = async () => {
    const fields = STEPS[activeStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (activeStep === 0) {
    }

    setPreviousStep(activeStep);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setPreviousStep(activeStep);
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box
      sx={{
        width: '90%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {/* <Stepper
                    alternativeLabel
                    activeStep={activeStep}
                    connector={<QontoConnector />}
                    className="overflow-x-scroll"
               >
                    {STEPS.map((item) => (
                         <Step key={item.id}>
                              <StepLabel StepIconComponent={QontoStepIcon}>{item.name}</StepLabel>
                         </Step>
                    ))}
               </Stepper> */}

      <Box sx={{ mb: 5 }} />

      <Stepper
        sx={{
          width: '100%',

          '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel': {
            color: (theme) => theme.palette.primary.main,
          },
          '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel': {
            color: (theme) => theme.palette.primary.main,
          },
        }}
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {STEPS.map((item) => (
          <Step key={item.id}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{item.name}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === STEPS.length ? (
        <>
          <Paper
            sx={{
              p: 3,
              my: 3,
              width: '100%',
              minHeight: 120,
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
            }}
          >
            <Typography sx={{ my: 1 }}>All steps completed - you&apos;re finished</Typography>
          </Paper>

          <Button color="inherit" onClick={handleReset} sx={{ mr: 1 }}>
            Reset
          </Button>
        </>
      ) : (
        <>
          <Paper
            sx={{
              p: 3,
              my: 3,
              width: '100%',
              minHeight: 120,
              // bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12)
            }}
          >
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              {getStepContent({ step: activeStep, delta: delta })}
            </FormProvider>

            <Stack
              alignItems="flex-start"
              sx={{
                mt: 3,
                display: 'flex',
                flexDirection: 'row-reverse',
                justifyContent: 'space-between',
              }}
            >
              <LoadingButton
                onClick={handleNext}
                variant="contained"
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.main,
                  mr: 2,
                  color: '#FFF',
                  ':hover': {
                    backgroundColor: (theme) => theme.palette.primary.main,
                  },
                }}
              >
                {/* {!isEdit ? 'افزودن' : 'ثبت تغیرات'} */}
                {activeStep === STEPS.length - 1 ? 'اتمام' : 'مرحله بعد'}
              </LoadingButton>
              <LoadingButton
                type="button"
                variant="contained"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.main,
                  border: (theme) => `solid 2px ${theme.palette.background.neutral}`,
                  color: '#FFF',
                  ':hover': {
                    backgroundColor: (theme) => theme.palette.primary.main,
                  },
                }}
              >
                مرحله قبل
              </LoadingButton>
            </Stack>
          </Paper>
        </>
      )}
    </Box>
  );
}
