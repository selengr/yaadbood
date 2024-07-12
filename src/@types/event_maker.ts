

export interface Date {
    year: number;
    month: number;
    day: number;
  }
  
  export interface Media {
    mediaTypeEnum: 'IMAGE' | 'VIDEO';
    file: string; // assuming uuid is a string
  }
  
  export interface Presenter {
    name: string;
    relationshipType: string;
    img: string; // assuming uuid is a string
    massage: string;
  }
  
  export interface SpecialGuest {
    name: string;
    postTypeEnum: string;
    img: string; // assuming uuid is a string
    massage: string;
  }
  
  export interface FuneralModel {
    title: string;
    roomTypeEnum: 'FUNERAL'|string;
    deadName: string | null;
    deadImg: string; // assuming uuid is a string
    deadAbout: string;
    ceremonyDuration: number;
    date: Date|null;
    startTime: string;
    //Step2 MediaInformationModel
    mediaList: number[]|null;
    dedicatedSound: string; // assuming uuid is a string
    privateMediaList: Media[]|null;
    presentersModelList: Presenter[]|null;
    specialGuestModelList: SpecialGuest[]|null;
    abilityList: null | any[]; // assuming abilityList can be null or an array of any type
  }