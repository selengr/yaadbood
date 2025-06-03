import { AxiosProgressEvent } from 'axios';
import { useState } from 'react';

export const useUploadProgress = () => {
  const [progress, setProgress] = useState(0);

  const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
    setProgress(percentCompleted);
  };

  return { progress, onUploadProgress };
};
