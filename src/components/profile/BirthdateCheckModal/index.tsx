'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { AuthModal } from '@/components/auth/AuthModal';
import { AuthSteps } from '@/types/auth';
import { storePartialStep } from '@/utils/auth/authUtils';
import { flushSync } from 'react-dom';

export const NameCheckModal = () => {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);

  // useEffect(() => {
  //   const firstName = session?.user?.firstName;
  //   const lastName = session?.user?.lastName;
  //   console.log('session?.user', session?.user);
  //   console.log('firstName?.user', lastName);
  //   console.log('firstName?.user', firstName);

  //   if (!firstName || !lastName) {
  //     storePartialStep(AuthSteps.birthdate);
  //     setShowModal(true);
  //   }
  // }, [session?.user?.firstName, session?.user?.lastName]); 

  // useEffect(() => {
  //   if (!session || !session.user) return;

  //   const firstName = session.user.firstName;
  //   const lastName = session.user.lastName;

  //   console.log('session.user:', session.user);
  //   console.log('firstName:', firstName);
  //   console.log('lastName:', lastName);

  //   if (firstName || lastName) {
  //     flushSync(() => {
  //       storePartialStep(AuthSteps.birthdate);
  //     });
  //     setShowModal(true);
  //   }
  // }, [session]);


  // useEffect(() => {
  //   if (!session?.user) {
  //     return
  //   }
  //   const firstName = session?.user?.firstName;
  //   const lastName = session?.user?.lastName;

  //   // Check if either firstName or lastName is missing
  //   if (!firstName || !lastName) {
  //     // Ensure step is saved to localStorage first
  //     storePartialStep(AuthSteps.birthdate); // save the step

  //     // Use flushSync to immediately apply the changes before rendering
  //     flushSync(() => {
  //       setShowModal(true); // open the modal after the step is saved
  //     });
  //   }
  // }, [session?.user?.firstName, session?.user?.lastName]);

  useEffect(() => {
    if (!session?.user) return;
  
    const { firstName, lastName } = session.user;
  
    if (!firstName || !lastName) {
      // Save step first
      storePartialStep(AuthSteps.birthdate);
  
      // Then update modal state after step is stored
      flushSync(() => {
        storePartialStep(AuthSteps.birthdate); // این مهمه که مودال مربوط به همین مرحله نمایش داده بشه
        setShowModal(true);
      });
    }
  }, [session]);
  
  

  return (
    showModal && <AuthModal
      showLoginModal={showModal}
      onClose={() => setShowModal(false)}
      manualStep={AuthSteps.birthdate}
      forceLogin={false} />
  );
};
