import { useCallback } from 'react';
import { toast } from 'react-toastify';
// constants
import { GENERAL } from '@/constants';

const useShareLink = () => {
    const { FAILED, COPIED } = GENERAL.SHARE_LINK;
    const shareLink = useCallback(async (url: string) => {
    const link = `${process.env.NEXT_PUBLIC_DOMAIN}${url}`;
    
      if (navigator.share) {
        await navigator.share({ url: link });
      } else {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(link);
            toast.success(COPIED);
          } else {
            toast.error(FAILED);
         }
      }
  }, []);

  return shareLink;
};

export default useShareLink;