'use client';
// .next
// import { useSnackbar } from 'notistack';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
// @mui
import { LoadingButton } from '@mui/lab';
import { alpha } from '@mui/material/styles';
import { Box, Step, Paper, Button, Stepper, StepLabel, Typography, Stack } from '@mui/material';
// utils
// Steppe
import { ColorlibConnector, ColorlibStepIcon } from './StepperDesign';

// routes
import { PATH_PAGE } from '@/routes/paths';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { Control, SubmitHandler, useForm } from 'react-hook-form';
import { FormDataSchema } from './schema';

// components
import FormProvider from '@/components/components/hook-form/FormProvider';

// step
import EventStepOne from './step-one/EventStepOne';
import EventStepTwo from './step-two/EventStepTwo';
import EventStepThree from './step-three/EventStepThree';
import EventStepFour from './step-four/EventStepFour';
import EventStepFive from './step-five/EventStepFive';
import EventStepSixModal from './step-six-modal/EventStepSixModal';
// types
import { FuneralModel, IGetStepContentProps } from '@/@types/event_maker';

// services
import { callApiCreateRoom } from '@/services/apis/builder';
import { AnyListenerPredicate } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const STEPS = [
  {
    id: 1,
    name: 'اطلاعات',
    fields: [
      'title',
      'roomTypeEnum',
      'deadName',
      'deadAbout',
      'ceremonyDuration',
      'date',
      'startTime',
    ],
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
  { id: 4, name: 'ثبت نهایی', fields: ['stepFive'] },
];

// --------------------------------------------------------
interface FormValuesProps extends FuneralModel {}
// --------------------------------------------------------

function getStepContent({
  step,
  delta,
  setValue,
  errors,
  watch,
  getValues,
  unregister,
  control,
}: IGetStepContentProps) {
  switch (step) {
    case 0:
      return <EventStepOne delta={delta} setValue={setValue} errors={errors} />;
    case 1:
      return <EventStepTwo delta={delta} setValue={setValue} watch={watch} getValues={getValues} />;
    case 2:
      return (
        <EventStepThree
          delta={delta}
          setValue={setValue}
          watch={watch}
          getValues={getValues}
          unregister={unregister}
          control={control}
        />
      );
    case 3:
      return (
        <EventStepFour
          delta={delta}
          control={control}
          getValues={getValues}
          watch={watch}
          setValue={setValue}
        />
      );
    case 4:
      return (
        <EventStepFive
          delta={delta}
          control={control}
          getValues={getValues}
          watch={watch}
          setValue={setValue}
        />
      );
    default:
      return 'Unknown step';
  }
}

export default function CustomizedSteppers() {
  const { push } = useRouter();
  const [previousStep, setPreviousStep] = useState(0);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const delta: number = activeStep - previousStep;

  const defaultValues = useMemo(
    () => ({
      // -------------------------- step one
      title: '',
      roomTypeEnum: '',
      deadName: '',
      deadImg: null,
      deadAbout: '',
      ceremonyDuration: '',
      date: null,
      startTime: '',

      // -------------------------- step two
      mediaList: [],
      dedicatedSound: '',
      roomGalleryModelList: [],
      // -------------------------- step three

      roomSpecialFriendsModelList: [],

      // -------------------------- step four
      abilityList: [],
      // -------------------------- step five

      isPrivate: false,
      publicLink: '',
      privateLoggedInId: '',
      privateLink: '',
      privatePassword: '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // [currentUserList]
    []
  );

  const methods = useForm<FormValuesProps | any>({
    resolver: yupResolver(FormDataSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    trigger,
    setValue,
    unregister,
    watch,
    control,
    getValues,
    formState: { isSubmitting, errors },
  } = methods;

  console.log('errors :>> ', errors);
  console.log('watch() the result :>> ', watch());

  const processForm: any = async (data: FormValuesProps) => {
    setLoading(true);
    // debugger
    if (data.roomSpecialFriendsModelList) {
      const result = data.roomSpecialFriendsModelList
        .filter((obj: any) => Object.values(obj).some((val) => val !== undefined))
        .map((obj: any) =>
          Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [key, value === undefined ? '' : value])
          )
        );
      data.roomSpecialFriendsModelList = result;
    }

    try {
      await callApiCreateRoom(data);
      setTimeout(() => {
        push(PATH_PAGE.event.crate);
        reset();
      }, 1000);
    } finally {
      setLoading(false);
    }
  };
  type FieldName = keyof FormValuesProps;

  const handleNext = async (link?: any) => {
    if (link !== 'link') {
      const fields = STEPS[activeStep].fields;
      const output = await trigger(fields as FieldName[], { shouldFocus: true });
      if (!output) return;
    }

    if (activeStep < 4) {
      setPreviousStep(activeStep);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    if (activeStep === 4) {
      setOpenDialog(true);
    }
    if (link === 'link') {
      await handleSubmit(processForm)();
    }
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
        width: '100%',
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
        <Stack
          sx={{
            width: '95%',
          }}
        >
          {/* <Paper
            sx={{
              p: 3,
              my: 3,
              width: '100%',
              minHeight: 120,
              // bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12)
            }}
          > */}
          <FormProvider methods={methods} onSubmit={handleSubmit(processForm)}>
            {getStepContent({
              step: activeStep,
              delta: delta,
              setValue: setValue,
              errors: errors,
              watch: watch,
              getValues: getValues,
              unregister: unregister,
              control: control,
            })}
          </FormProvider>

          <Stack
            alignItems="flex-start"
            sx={{
              mt: 10,
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
                paddingY: 1.5,
                paddingX: { xs: 3, sm: 6 },
                fontWeight: 400,
              }}
            >
              {/* {!isEdit ? 'افزودن' : 'ثبت تغیرات'} */}
              {activeStep === STEPS.length - 1 ? 'اشتراک گذاری' : 'مرحله بعد'}
            </LoadingButton>
            <LoadingButton
              type="button"
              variant="contained"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{
                backgroundColor: (theme) => theme.palette.primary.main,
                // border: (theme) => `solid 2px ${theme.palette.background.neutral}`, // please change
                color: '#FFF',
                ':hover': {
                  backgroundColor: (theme) => theme.palette.primary.main,
                },
                paddingY: 1.5,
                paddingX: { xs: 3, sm: 3, md: 6 },
                fontWeight: 400,
                // fontSize :10
              }}
            >
              مرحله قبل
            </LoadingButton>
          </Stack>
          {/* </Paper> */}
        </Stack>
      )}

      <EventStepSixModal
        loading={loading}
        setLoading={setLoading}
        handleNext={handleNext}
        openDialog={openDialog}
        setValue={setValue}
      />
    </Box>
  );
}
