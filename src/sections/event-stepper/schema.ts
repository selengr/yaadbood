import * as Yup from 'yup';


const mediaSchema = Yup.object().shape({
  mediaTypeEnum: Yup.string().oneOf(['VIDEO', 'IMAGE']),
  media_file: Yup.string(),
});

const roomGalleryListModelSchema = Yup.object().shape({
  caption: Yup.string(),
  roomGalleryListModels: Yup.array().of(mediaSchema),
});


// export const FormDataSchema = Yup.object().shape({
//   title: Yup.string(), //required('عنوان الزامی است'),
  
//   roomTypeEnum: Yup.string(), //required('این فیلد الزامی است'),
//   deadName: Yup.string(), //required('این فیلد الزامی است'),
//   deadImg: Yup.string().uuid('فرمت UUID نامعتبر است'), //required('تصویر متوفی الزامی است'),
//   deadAbout: Yup.string(), //required('درباره متوفی الزامی است'),
//   ceremonyDuration: Yup.string(), //required('مدت مراسم الزامی است'),
//   // need to change
//   date: Yup.object().shape({
//     year: Yup.string(),
//     month: Yup.string(),
//     day: Yup.string(),
//   }), //required('تاریخ الزامی است'),
//   // 
//   startTime: Yup.string(), //required('زمان شروع الزامی است'),
//  //Step2 MediaInformationModel
//   mediaList: Yup.array().of(Yup.number()), //required('شناسه رسانه الزامی است')),
//   roomGalleryModelList: Yup.array().of(roomGalleryListModelSchema),
//   dedicatedSound: Yup.string(),

//    //Step3
 
//   privateMediaList: Yup.array().of(
//     Yup.object().shape({
//       mediaTypeEnum: Yup.string().oneOf(['IMAGE', 'VIDEO']),//requi,//ed('نوع رسانه الزامی است'),
//       file: Yup.string().uuid('فرمت UUID نامعتبر است'),//.required('فایل الزامی است'),
//     }).nullable(),
//   ),
//   roomSpecialFriendsModelList: Yup.array().of(
//     Yup.object().shape({
//       postTypeEnum  : Yup.string(),
//       name: Yup.string(),//.required('نام مجری الزامی است'),
//       relationshipType: Yup.string(),//.required('نوع رابطه الزامی است'),
//       img: Yup.string().uuid('فرمت UUID نامعتبر است'),//.required('تصویر مجری الزامی است'),
//       massage: Yup.string(),//.required('پیام مجری الزامی است'),
//       phoneNumber : Yup.string(),
//       password : Yup.string(),

//     }).nullable(),
//   ),
//   specialGuestModelList: Yup.array().of(
//     Yup.object().shape({
//       name: Yup.string(),//required('نام مهمان ویژه الزامی است'),
//       postTypeEnum: Yup.string(),//required('نوع پست الزامی است'),
//       img: Yup.string().uuid('فرمت UUID نامعتبر است'),//required('تصویر مهمان ویژه الزامی است'),
//       massage: Yup.string(),//required('پیام مهمان ویژه الزامی است'),
//     }).nullable(),
//   ),
//   abilityList: Yup.array(),
// });



