import { PaperClasses, SxProps } from '@mui/material';
import { ReactNode } from 'react';

export interface IModalProps {
  open: boolean;
  onClose?: () => void;
  onBack?: () => void;
  children: ReactNode;
  title?: ReactNode;
  className?: string;
  paperClassName?: Partial<PaperClasses>;
  closeOnOutsideClick?: boolean;
  backgroundColor?: string;
  noClickOutside?: boolean;
  sx?: SxProps;
  fullScreenOnMobile?: boolean;
}
