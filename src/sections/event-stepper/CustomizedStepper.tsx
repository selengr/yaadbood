import { useMemo, useState } from 'react';
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
     Stack,
     Alert
} from '@mui/material';
// utils
import { bgGradient } from '@/utils/cssStyles';
// components
import OrderStepOne from './step-one/EventStepOne';
import OrderStepTwo from './step-two/EventStepTwo';
import OrderStepThree from './step-three/EventStepThree';
import {
     ColorlibConnector,
     ColorlibStepIcon,
     QontoConnector,
     QontoStepIcon
} from './StepperDesign';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormDataSchema } from './schema';
import FormProvider from '@/components/hook-form/FormProvider';
import { LoadingButton } from '@mui/lab';
import OrderStepFour from './step-four/OrderStepFour';


// ----------------------------------------------------------------------

// const STEPS = ['Select campaign settings', 'Create an ad group', 'Create an ad'];
const STEPS = [
     {
          id: 1,
          name: 'stepOne',
          fields: ['stepOne']
     },
     {
          id: 0,
          name: 'stepTwo',
          fields: ['stepTwo']
     },
     {
          id: 3,
          name: 'stepThree',
          fields: ['stepThree']
     },
     {
          id: 2,
          name: 'stepFour',
          fields: ['stepFour']
     },
     { id: 4, name: 'stepFive' }
];

// --------------------------------------------------------
type FormValuesProps = {
     stepOne: string;
     stepTwo: string;
     stepThree: string;
     stepFour: string;
     stepFive: string;

};
// --------------------------------------------------------

function getStepContent({step,delta}:{step:number,delta:number}) {
     switch (step) {
          case 0:
               return (
                    <EventStepOne delta={delta}/>
               );
          case 1:
               return (
                    <EventStepTwo delta={delta}/>
               );
          case 2:
               return <EventStepThree delta={delta}/>;
          case 3:
               return <EventStepFour delta={delta}/>;
          // case 4:
          //      return <EventStepThree />;
          default:
               return 'Unknown step';
     }
}

export default function CustomizedSteppers() {
     const [previousStep, setPreviousStep] = useState(0);
     const [activeStep, setActiveStep] = useState(3);
     const delta = activeStep - previousStep;

     const defaultValues = useMemo(
          () => ({
               // step one
               requesterUserId: 0,
               areaId: 0,
               dependentId: 0,
               fullAddress: '',

               //step two
               imss: '',
               sid: 0,

               //step three
               stepThree: '',

               country: '',
               street: '',
               city: '',
               state: '',
               zip: ''
          }),
          // eslint-disable-next-line react-hooks/exhaustive-deps
          // [currentUserList]
          []
     );

     const methods = useForm<FormValuesProps>({
          resolver: yupResolver(FormDataSchema),
          defaultValues
     });

     const {
          reset,
          watch,
          control,
          setValue,
          handleSubmit,
          trigger,
          register,
          setError,
          getValues,
          formState: { isSubmitting, errors }
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
               let { requesterUserId, dependentId, areaId, fullAddress } = getValues();
               let data = {
                    requesterUserId,
                    dependentId,
                    areaId,
                    fullAddress
               };
               if (dependentId === 0) {
                    delete data.dependentId;
               }
               try {
                    let res = await callApi().post(`/order`, data);
                    if (window) localStorage.setItem('order-id', res.data.data.id);
                    setPreviousStep(activeStep);
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
               } catch (error) {
                    console.error(error);
               }
          }
          if (activeStep === 1) {
               const { sid } = getValues();
               if (sid === 0 || null) {
                    toast.error('انتخاب خدمت الزامی است');
               } else {
                    setPreviousStep(activeStep);
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
               }
          }
          if (activeStep === 2) {
               setPreviousStep(activeStep);
               setActiveStep((prevActiveStep) => prevActiveStep + 1);
          }
          if (activeStep === 3) {
               let orderId = window && localStorage.getItem('order-id');
               let orderSubService = window && localStorage.getItem('order-sub-service');
               try {
                    let res = await callApi().post(`/order/${orderId}/session`,orderSubService);
                    setPreviousStep(activeStep);
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    localStorage.removeItem('order-sub-service');
               } catch (error) {
                    console.error(error);
               }
          }

          // if (activeStep < STEPS.length - 1) {
          //      if (activeStep === STEPS.length - 2) {
          //           await handleSubmit(onSubmit)();
          //      }
          //      setPreviousStep(activeStep);
          //      setActiveStep((prevActiveStep) => prevActiveStep + 1);
          // }
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
          <Box>
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

               <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                    {STEPS.map((item) => (
                         <Step key={item.id}>
                              <StepLabel StepIconComponent={ColorlibStepIcon}>
                                   {item.name}
                              </StepLabel>
                         </Step>
                    ))}
               </Stepper>

               {!!errors.sid && (
                    <Alert sx={{ direction: 'rtl', m: 1, p: 0 }} severity="error">
                         {errors.sid.message}
                    </Alert>
               )}
               {!!errors.stepThree && (
                    <Alert sx={{ direction: 'rtl', m: 1, p: 0 }} severity="error">
                         {errors.stepThree.message}
                    </Alert>
               )}

               {activeStep === STEPS.length ? (
                    <>
                         <Paper
                              sx={{
                                   p: 3,
                                   my: 3,
                                   minHeight: 120,
                                   bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12)
                              }}
                         >
                              <Typography sx={{ my: 1 }}>
                                   All steps completed - you&apos;re finished
                              </Typography>
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
                                   minHeight: 120
                                   // bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12)
                              }}
                         >
                              {/* Form */}

                              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                                   {getStepContent(
                                        activeStep,
                                        delta
                                   )}
                              </FormProvider>

                              <Stack
                                   alignItems="flex-start"
                                   sx={{ mt: 3, display: 'flex', flexDirection: 'row' }}
                              >
                                   <LoadingButton
                                        onClick={handleNext}
                                        // type="submit"
                                        variant="contained"
                                        // loading={isSubmitting}
                                        sx={{
                                             backgroundColor: '#2563EB',
                                             mr: 2,
                                             ':hover': {
                                                  backgroundColor: '#2563EB'
                                             }
                                        }}
                                   >
                                        {/* {!isEdit ? 'افزودن' : 'ثبت تغیرات'} */}
                                        {activeStep === STEPS.length - 1 ? 'اتمام' : 'بعدی'}
                                   </LoadingButton>
                                   {/* <LoadingButton
                                        type="button"
                                        variant="contained"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{
                                             backgroundColor: 'transparent',
                                             border: (theme) =>
                                                  `solid 2px ${theme.palette.background.neutral}`,
                                             color: '#525252',
                                             ':hover': {
                                                  backgroundColor: 'transparent'
                                             }
                                        }}
                                   >
                                        قبلی
                                   </LoadingButton> */}
                              </Stack>
                         </Paper>

                         {/* <Box sx={{ textAlign: 'right' }}>
                              <Button
                                   disabled={activeStep === 0}
                                   onClick={handleBack}
                                   sx={{ mr: 1 }}
                              >
                                   Back
                              </Button>
                              <Button variant="contained" onClick={handleNext} sx={{ mr: 1 }}>
                                   {activeStep === STEPS.length - 1 ? 'Finish' : 'Next'}
                              </Button>
                         </Box> */}
                    </>
               )}
          </Box>
     );
}
