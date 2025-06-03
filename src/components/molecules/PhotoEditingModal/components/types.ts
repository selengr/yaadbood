export interface IPhotoEditingModalProps {
    open : boolean;
    isLoading : boolean;
    profilePhoto? : string;
    handleCancel: () => void;
    cropShape?: 'rect' | 'round';
    handleSave: (photo: string) => void;
  }
  
  export interface ICropState {
    x: number;
    y: number;
  }
 
  export interface ICroppedAreaPixelsState {
    x: number;
    y: number;
    width: number;
    height: number;
  }