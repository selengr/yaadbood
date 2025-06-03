import { useRef, useState } from 'react';
import { ReCAPTCHA } from 'react-google-recaptcha';

export const useReCaptcha = () => {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const resetReCaptcha = () => {
    setCaptchaToken(null);
    recaptchaRef.current?.reset();
  };

  return { captchaToken, setCaptchaToken, recaptchaRef, resetReCaptcha };
};
