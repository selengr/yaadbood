import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import Confirmation from '@/components/atoms/Confirmation';
import { GENERAL_MESSAGES } from '@/constants';
import { AUTH_MESSAGES } from '@/constants/auth';
import useAuthStep from '@/hooks/auth/useAuthStep';
import { AuthSteps, UserData } from '@/types/auth';
import {
  getLoginTimestamp,
  getPartialRegistration,
  getPartialStep,
  removeLoginTimestamp,
  removePartialRegistration,
  removePartialStep,
  storePartialRegistration,
  storePartialStep
} from '@/utils/auth/authUtils';

import Modal from '../atoms/Modal/Modal';
import AuthContent from './AuthContent';
import { useSession } from 'next-auth/react';
import { useUsageLimitModal } from '@/hooks/auth';

export interface IAuthStepProps {
  onSubmit: (data: UserData, step: AuthSteps, isClose?: boolean) => void;
  userData: UserData;
}


const ALL_STEPS = [
  AuthSteps.login,
  AuthSteps.register,
  AuthSteps.forgotPassOtp,
  AuthSteps.forgetPassNew,
  AuthSteps.otp,
  AuthSteps.location,
  AuthSteps.gender,
  AuthSteps.birthdate
];

export const AuthModal = ({
  forceLogin,
  onClose,
  showLoginModal,
  manualStep
}: {
  forceLogin: boolean;
  showLoginModal: boolean;
  onClose: () => void;
  manualStep: AuthSteps;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isInProfile = pathname === '/profile';
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(showLoginModal);
  // const [isModalVisible, setIsModalVisible] = useState(showLoginModal);

  const { data: session, status } = useSession();
  const { step, onChangeStep, userData, setUserData, authModalTitle, onBackStep } = useAuthStep();

  useEffect(() => {
    setIsModalVisible(showLoginModal);
  }, [showLoginModal]);

  useUsageLimitModal(
    status,
    session?.user?.accessToken,
    isModalVisible,
    setIsModalVisible,
    session,
    onChangeStep
  );

  useEffect(() => {
    const savedData = getPartialRegistration();
    const savedStep = getPartialStep();
    if (savedData) {
      setUserData(JSON.parse(savedData));
      if (savedStep && ALL_STEPS.includes(savedStep as AuthSteps)) {
        onChangeStep(savedStep as AuthSteps);
      }
    }

    const loginTimestamp = getLoginTimestamp();
    if (loginTimestamp) {
      const currentTime = new Date().getTime();
      const timeElapsed = currentTime - parseInt(loginTimestamp, 10);
      const tenhour = 10 * 60 * 60 * 1000;

      if (timeElapsed > tenhour) {
        // Force login again
        removeLoginTimestamp();
        onChangeStep(AuthSteps.login);
      }
    }
  }, [setUserData, onChangeStep]);

  const handleBack = () => {


    if (step === AuthSteps.location) {
      // If the current step is location, go back to birthdate
      onChangeStep(AuthSteps.birthdate);
      storePartialStep(AuthSteps.birthdate);
      // removePartialRegistration();
      // removePartialStep();
    } else if (step === AuthSteps.birthdate) {
      // storePartialStep(AuthSteps.gender);
      // // If the current step is birthdate, go back to gender
      // onChangeStep(AuthSteps.gender);

      onChangeStep(AuthSteps.gender);
      storePartialStep(AuthSteps.gender);
    }
    //  else if (step === AuthSteps.gender) {
    //   // If the current step is gender, go back to login
    //   removePartialRegistration();
    //   removePartialStep();
    //   onChangeStep(AuthSteps.login);
    // }
    else {
      storePartialStep(AuthSteps.login);
      storePartialRegistration(userData);
      onChangeStep(AuthSteps.login);
    }
  };

  const handleUserDataUpdate = (data: Partial<UserData>, nextStep: AuthSteps, isClose?: boolean) => {
    const updatedData = { ...userData, ...data };
    storePartialRegistration(updatedData);
    // if (isInProfile) {
    //   setIsModalVisible(false);
    //   return;
    // }
    storePartialStep(nextStep);

    if (nextStep === AuthSteps.login || nextStep === AuthSteps.register) {
      // Clear local storage and navigate to profile
      // removePartialRegistration();
      // removePartialStep();
      setIsModalVisible(false); // Hide the modal
      // router.push('/profile');
    } else if (step === AuthSteps.location) {
      // } else if (nextStep === AuthSteps.location) {
      removePartialRegistration();
      removePartialStep();
    }

    if (isClose) return onClose();
    setUserData(updatedData);
    onChangeStep(nextStep);
  };

  const handleClose = () => {
    if (step === AuthSteps.forgetPassNew) {
      setShowDiscardModal(true);
      return;
    }
    if (step === AuthSteps.location) {
      // Check if location step is completed
      if (userData.location) {
        handleUserDataUpdate(userData, AuthSteps.location, true);
        setIsModalVisible(false)
      } else {
        // Prompt user to complete the registration
        setIsModalVisible(false)
        return;
      }
    }
    storePartialRegistration(userData);
    storePartialStep(step);
    setIsModalVisible(false)
    onClose();
  };

  // Determine if the current step is the first step
  const isFirstStep = step === ALL_STEPS[0];

  // Determine if the current step is the gender step
  const isGenderStep = step === AuthSteps.gender;

  // Determine if the current step is one of the steps where the close button should be removed
  const isCloseDisabled = [
    AuthSteps.otp,
    AuthSteps.location,
    AuthSteps.gender,
    AuthSteps.birthdate,
    AuthSteps.forgotPassOtp
    // AuthSteps.forgetPassNew // Add forgetPassNew to disable back button
  ].includes(step);

  return (
    <>
      <Modal
        open={isModalVisible}
        onClose={isCloseDisabled || forceLogin ? undefined : handleClose}
        onBack={isFirstStep || isGenderStep || step === AuthSteps.forgetPassNew ? undefined : handleBack}
        title={authModalTitle()}
        noClickOutside={true}>
        <AuthContent
          userData={userData}
          step={step}
          onSubmit={handleUserDataUpdate}
          forceLogin={forceLogin}
          onClose={handleClose}
        />
      </Modal>
      <Confirmation
        open={showDiscardModal}
        title={AUTH_MESSAGES.PASSWORD.DISCARD_TITLE}
        description={AUTH_MESSAGES.PASSWORD.DISCARD_DESCRIPTION}
        cancelText={GENERAL_MESSAGES.ACTIONS.GO_BACK}
        submitText={GENERAL_MESSAGES.ACTIONS.DISCARD}
        handleClose={() => setShowDiscardModal(false)}
        handleSubmit={() => {
          setShowDiscardModal(false);
          // removePartialRegistration();
          // removePartialStep();
          onClose();
        }}
      />
    </>
  );
};
