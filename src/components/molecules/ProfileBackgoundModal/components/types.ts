export interface IBackgroundEditingModalProps {
  open: boolean;
  onClose: VoidFunction;
  cropShape?: 'rect' | 'round';
  handleUpload: (result: string) => void;
  backgroundPhoto: string;
}
export type TControlTypeState = 'zoom' | 'rotate';

export interface ICroppedAreaPixelsState {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IProfileBackgoundProps {
    open: boolean;
    onClose: VoidFunction;
    backgroundPhoto: string;
  }