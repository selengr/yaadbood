import * as Yup from 'yup';

const roomSpecialFriendsModelListSchema = Yup.object().shape({
  postTypeEnum: Yup.string().optional(),
  name: Yup.string().optional(),
  relationshipType: Yup.string().optional(),
  phoneNumber: Yup.string().optional(),
  img: Yup.string().optional(),
  massage: Yup.string().optional(),
  password: Yup.string().optional(),
});


export const FormDataSchema = Yup.object().shape({
   // -------------------------- step one
  title: Yup.string().required('عنوان الزامی است'),
  roomTypeEnum: Yup.string().required('این فیلد الزامی است'),
  deadName: Yup.string().required('این فیلد الزامی است'),
  deadImg: Yup.string().nullable(), //required('تصویر متوفی الزامی است'),
  deadAbout: Yup.string().required('توضیحات الزامی است'),
  ceremonyDuration: Yup.mixed().required('مدت مراسم الزامی است'),
  date: Yup.object().shape({
    year: Yup.string(),
    month: Yup.string(),
    day: Yup.string(),
  }).required('تاریخ الزامی است'),
  startTime: Yup.string().required('زمان شروع الزامی است'),

  // -------------------------- step two
  mediaList: Yup.array(), 
  dedicatedSound: Yup.string(),
  roomGalleryModelList: Yup.mixed(),

   // -------------------------- step three

   roomSpecialFriendsModelList: Yup.mixed(),


   // -------------------------- step four
   abilityList: Yup.array(),
   // -------------------------- step five
  isPrivate : Yup.boolean(),
  publicLink : Yup.string(),
  privateLoggedInId : Yup.string(), 
  privateLink : Yup.string(), 
  privatePassword : Yup.string(),
});




