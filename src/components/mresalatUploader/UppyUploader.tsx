'use client';
import { useRef } from 'react';
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
// @ts-ignore
// @ts-nocheck
import Persian from '@uppy/locales/lib/fa_IR';
import CustomUppy from './CustomeUppy';
import { fileUploaderRestrictions } from './fileUploader.config';
import { type IUploader } from './types';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/image-editor/dist/style.min.css';
import { toast } from 'sonner';

export function UppyUploader({
  fileRestriction = fileUploaderRestrictions,
  sx = {},
  getData,
}: IUploader) {
  // @ts-nocheck
// @ts-ignore
  const uppy : any = useRef(
    new Uppy({
      debug: true,
      locale: Persian,
    }).use(Tus, { endpoint: 'http://172.16.11.24:8080/filemanager/upload' })
  );
  uppy.current.setOptions({ restrictions: fileRestriction });
  uppy.current.on('complete', ({ successful, failed }:any) => {
    if (failed.length > 0) {
      toast.error('خطا! بارگذاری انجام نشد');
      return;
    }
    if (successful.length > 0) {
      getData(
        successful.map((item:any) => {
          return item.uploadURL.split('/').pop();
        })
      );
    }
  });

  return <CustomUppy uppy={uppy.current} sx={sx} />;
}
