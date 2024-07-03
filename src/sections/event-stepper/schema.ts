import * as Yup from 'yup';

export const FormDataSchema = Yup.object().shape({
  // step one

  stepOne: Yup.string(),
  stepTwo: Yup.string(),
  stepThree: Yup.string(),
  stepFour: Yup.string(),
  stepFive: Yup.string(),

})



