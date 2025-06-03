import { AuthSteps, UserData } from '@/types/auth';

import ForgotPassNewPassStep from './forgotPass/ForgotPassNewPassStep';
import ForgotPassOtpStep from './forgotPass/ForgotPassOtpStep';
import LoginStep from './login/LoginStep';
import RegisterBirthdateStep from './register/RegisterBirthdateStep';
import RegisterGenderStep from './register/RegisterGenderStep';
import RegisterLocationStep from './register/RegisterLocationStep';
import RegisterOtpStep from './register/RegisterOtpStep';

interface AuthContentProps {
  userData: UserData;
  step: AuthSteps;
  onSubmit: (data: UserData, step: AuthSteps, isClose?: boolean) => void;
  forceLogin: boolean;
  onClose: () => void; // Add onClose prop
}

export default function AuthContent({ userData, step, onSubmit, forceLogin, onClose }: AuthContentProps) {
  switch (step) {
    case AuthSteps.login:
      return <LoginStep forceLogin={forceLogin} onSubmit={onSubmit} />;
    case AuthSteps.otp:
      return <RegisterOtpStep onSubmit={onSubmit} userData={userData} />;
    case AuthSteps.forgotPassOtp:
      return <ForgotPassOtpStep userData={userData} onSubmit={onSubmit} />;
    case AuthSteps.forgetPassNew:
      return <ForgotPassNewPassStep onSubmit={onSubmit} userData={userData} />; // Pass onClose prop
    case AuthSteps.gender:
      return <RegisterGenderStep userData={userData} onSubmit={onSubmit} />;
    case AuthSteps.birthdate:
      return <RegisterBirthdateStep userData={userData} onSubmit={onSubmit} />;
    case AuthSteps.location:
      return <RegisterLocationStep userData={userData} onSubmit={onSubmit} onClose={onClose} />;
    default:
      return null;
  }
}
