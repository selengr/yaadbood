import { AuthSteps } from "@/types/auth";
import { CUMULATIVE_USAGE_KEY } from "@/utils/auth";
import { storePartialStep } from "@/utils/auth/authUtils";
import { useEffect } from "react";

interface UserSession {
  firstName?: string | null;
  lastName?: string | null;
  gender?: string | null;
  country?: string | null;
  city?: string | null;
}

export const useUsageLimitModal = (
  status: string,
  accessToken?: string | null,
  isModalVisible?: boolean,
  setIsModalVisible: (visible: boolean) => void = () => { },
  session?: any,
  onChangeStep?: any
) => {
  useEffect(() => {
    const checkUsage = () => {
      const usage = Number(localStorage.getItem(CUMULATIVE_USAGE_KEY)) || 0;
      const isLoginPage = typeof window !== 'undefined' && window.location.pathname === '/login';

      if (usage >= 2 * 60 * 1000 && status !== "loading" && !accessToken && !isLoginPage) {
     if (!isModalVisible) {
      setIsModalVisible(true);
     }
      }
    };

    const checkProfileCompletion = () => {
      if (session?.user) {
        const { firstName, lastName, gender, city, country } = session.user as UserSession;
        const isIncomplete = !firstName || !lastName || !gender || !city || !country;
        if (!isIncomplete) {
          setIsModalVisible(false);
        }
        if (isIncomplete && status !== "loading") {
          // setIsModalVisible(false);
          if (!gender) {
            storePartialStep(AuthSteps.gender);
            onChangeStep(AuthSteps.gender);
          } else if (!firstName || !lastName) {
            onChangeStep(AuthSteps.birthdate);
            storePartialStep(AuthSteps.birthdate);
          } else if (!city || !country) {
            onChangeStep(AuthSteps.location);
            storePartialStep(AuthSteps.location);
          }
          if (window.location.pathname !== '/login') {
            setIsModalVisible(true);
          }
        }
      }
    };

    if (status !== "loading") {
      // فقط یکبار چک کامل بودن پروفایل
      checkProfileCompletion();

      // چک محدودیت مصرف
      checkUsage();
      const interval = setInterval(checkUsage, 60_000);

      return () => clearInterval(interval);
    }
  }, [status, accessToken, session]);

  return {
    isModalVisible,
    setIsModalVisible,
  };
};


// import { CUMULATIVE_USAGE_KEY } from "@/utils/auth";
// import { useEffect } from "react";

// export const useUsageLimitModal = (
//   status: string,
//   accessToken?: string | null,
//   isModalVisible?: boolean,
//   setIsModalVisible: (visible: boolean) => void = () => {}
// ) => {

//   useEffect(() => {
//     const checkUsage = () => {
//       const usage = Number(localStorage.getItem(CUMULATIVE_USAGE_KEY)) || 0;

//       if (
//         usage >= 2 * 60 * 1000 &&
//         status !== "loading" &&
//         !accessToken
//       ) {
//         const isLoginPage = typeof window !== 'undefined' &&
//         window.location.pathname === '/login';
//       if (!isLoginPage) {
//         setIsModalVisible(true);
//       }
//       }
//     };

//     if (status !== "loading") {
//       checkUsage(); // Only check after session is loaded
//       const interval = setInterval(checkUsage, 60_000);
//       return () => clearInterval(interval);
//     }
//   }, [status, accessToken]);

//   return {
//     isModalVisible,
//     setIsModalVisible,
//   };
// };
