

import * as Yup from 'yup';


export const FormDataSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  
  roomTypeEnum: Yup.string().oneOf(['FUNERAL']).required('Room type is required'),
  deadName: Yup.string().nullable(),
  deadImg: Yup.string().uuid('Invalid UUID').required('Dead image is required'),
  deadAbout: Yup.string().required('Dead about is required'),
  ceremonyDuration: Yup.number().positive('Ceremony duration must be a positive number').required('Ceremony duration is required'),
  // need to change
  date: Yup.object().shape({
    year: Yup.number().integer('Year must be an integer').required('Year is required'),
    month: Yup.number().integer('Month must be an integer').required('Month is required'),
    day: Yup.number().integer('Day must be an integer').required('Day is required'),
  }).required('Date is required').nullable(),
  // 
  startTime: Yup.string().matches(/^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/, 'Invalid time format').required('Start time is required'),
 //Step2 MediaInformationModel
  mediaList: Yup.array().of(Yup.number().integer('Media ID must be an integer').required('Media ID is required')),
  dedicatedSound: Yup.string().uuid('Invalid UUID').required('Dedicated sound is required'),
  privateMediaList: Yup.array().of(
    Yup.object().shape({
      mediaTypeEnum: Yup.string().oneOf(['IMAGE', 'VIDEO']).required('Media type is required'),
      file: Yup.string().uuid('Invalid UUID').required('File is required'),
    }).nullable(),
  ),
  presentersModelList: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Presenter name is required'),
      relationshipType: Yup.string().required('Relationship type is required'),
      img: Yup.string().uuid('Invalid UUID').required('Presenter image is required'),
      massage: Yup.string().required('Presenter message is required'),
    }).nullable(),
  ),
  specialGuestModelList: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Special guest name is required'),
      postTypeEnum: Yup.string().required('Post type is required'),
      img: Yup.string().uuid('Invalid UUID').required('Special guest image is required'),
      massage: Yup.string().required('Special guest message is required'),
    }).nullable(),
  ),
  abilityList: Yup.array().nullable(),
});

