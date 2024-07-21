import { Control } from "react-hook-form";


export interface IGetStepContentProps {
  step: 0 | 1 | 2 | 3 | 4 | number;
  delta: number;
  setValue: (name: string, value: any) => void;
  errors: { [key: string]: string | any };
  control: Control<any, any>;
  watch: (name?: string) => any;
  getValues: () => any;
  unregister: (name?: string) => void;
}


export interface Date {
    year: string;
    month: string;
    day: string;
  }
  
  export interface Media {
    mediaTypeEnum: 'IMAGE' | 'VIDEO';
    file: string; // assuming uuid is a string
  }
  
  export interface Presenter {
    postTypeEnum: string;
    name: string;
    relationshipType: string;
    img: string; // assuming uuid is a string
    massage: string;
    phoneNumber : string
    password : string
  }
  
  export interface SpecialGuest {
    name: string;
    postTypeEnum: string;
    img: string; // assuming uuid is a string
    massage: string;
  }



  enum MediaTypeEnum {
    VIDEO,
    IMAGE,
  }
  
  interface MediaModel {
    mediaTypeEnum: MediaTypeEnum;
    media_file: string; // assuming uuid is a string
  }
  
  export interface IRoomGalleryListModel {
    caption: string;
    roomGalleryListModels: MediaModel[];
  }
  

  
  export interface FuneralModel {
    title: string;
    roomTypeEnum: 'FUNERAL'|string;
    deadName: string;
    deadImg?: string | null; // assuming uuid is a string
    deadAbout: string;
    ceremonyDuration: string;
    date: {
      year : string;
      month: string;
      day: string
    } | null;
    startTime: string;
    //Step2 MediaInformationModel
    mediaList?: number[]|null;
    roomGalleryModelList?: IRoomGalleryListModel[];
    dedicatedSound?: string; // assuming uuid is a string
    privateMediaList?: Media[]|null;
    roomSpecialFriendsModelList?: Presenter[]|null;
    specialGuestModelList?: SpecialGuest[]|null;
    abilityList?: null |  
      {
        id: null|number,
        roomAbilityDetailModels: [],
      }[],
      isPrivate? : boolean,
      publicLink? : "",
      privateLoggedInId? : "" ,
      privateLink? : "" ,
      privatePassword? : ""
    }  
  // --------------------------------------
  export interface IRoomTypeEnum {
    value: string;
    caption: string;
    elementStr: string;
    extMap: {};
  }
  
 
  // --------------------------------------step two 
  export interface IAudioContent {
    id: number;
    name: string;
    audio: string; // assuming uuid is a string
    link : string
  }





  // --------------------------------------step four 

  export interface AbilityDetailModel {
    id: number;
    media: string;
    pdf: string;
    name: string;
  }
  
  export interface IContentModel {
    id: number;
    name: string;
    price: string;
    description: string;
    isUploaded: boolean | string;
    isMultipleChoose: boolean | string;
    abilityDetailModelList: AbilityDetailModel[];
  }
  