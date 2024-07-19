// import { type WebcamMode } from "@uppy/webcam/types";

export interface IUploader {
  mode?: any;
  facingMode?: "user" | "environment";
  fileRestriction?: IFileRestriction;
  withoutCamera?: boolean;
  enableCompressor?: boolean;
  compressorQuality?: 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
}

export interface IFileRestriction {
  maxFileSize?: number;
  minNumberOfFiles?: number;
  maxNumberOfFiles?: number;
  maxTotalFileSize?: number;
  minFileSize?: number;
  allowedFileTypes?: Array<TAllowedFileTypes>;
}

type TAllowedFileTypes = ".xls" | ".xlsx" | ".png" | ".jpeg" | ".jpg" | "video/*";
