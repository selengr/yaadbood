import * as Yup from 'yup';



export const FormDataSchema = Yup.object().shape({
  title: Yup.string().required('عنوان الزامی است'),
  
  roomTypeEnum: Yup.string().required('این فیلد الزامی است'),
  deadName: Yup.string().required('این فیلد الزامی است'),
  deadImg: Yup.string().nullable(), //required('تصویر متوفی الزامی است'),
  deadAbout: Yup.string().required('توضیحات الزامی است'),
  ceremonyDuration: Yup.mixed().required('مدت مراسم الزامی است'),
  // need to change
  date: Yup.object().shape({
    year: Yup.string(),
    month: Yup.string(),
    day: Yup.string(),
  }).required('تاریخ الزامی است'),
  // 
  startTime: Yup.string().required('زمان شروع الزامی است'),
 //Step2 MediaInformationModel
  mediaList: Yup.array().nullable(), //required('شناسه رسانه الزامی است')),
  roomGalleryModelList: Yup.mixed(),
  dedicatedSound: Yup.string(),

   //Step3
 
  roomSpecialFriendsModelList: Yup.mixed(),

  specialGuestModelList: Yup.mixed().nullable(),
  abilityList: Yup.array(),
  isPrivate : Yup.boolean(),
  publicLink : Yup.string(),
  privateLoggedInId : Yup.string(), 
  privateLink : Yup.string(), 
  privatePassword : Yup.string(),
});




