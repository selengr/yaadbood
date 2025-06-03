import { forwardRef } from 'react';
import GoogleReCAPTCHA, { ReCAPTCHA } from 'react-google-recaptcha';

export const ReCaptcha = forwardRef<
  ReCAPTCHA,
  {
    handleRecaptchaChange: (token: string | null) => void;
  }
>(({ handleRecaptchaChange }, ref) => (
  <GoogleReCAPTCHA
    ref={ref}
    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
    onChange={handleRecaptchaChange}
    size='normal'
  />
));

ReCaptcha.displayName = 'ReCaptcha';
