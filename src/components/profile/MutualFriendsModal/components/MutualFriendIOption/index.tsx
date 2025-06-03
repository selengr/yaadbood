"use client"
import { useState } from 'react';
// constants
import { PROFILE } from '@/constants';
import { toast } from 'react-toastify';
// hooks
import { useNotInterestedUser } from '@/hooks/user';
// components
import ReportModal from '../ReportModal';
import { DropdownMenu } from '@/components/molecules';

  interface IProps {
    username: string;
  }
  
  const MutualFriendIOption = ({ username }: IProps) => {
  const { NOT_INTERESTED, REPORT, SUCCESS, REPORT_TITLE } = PROFILE.MUTUAL_FRIENDS;
  const [isOpenReport, setOpenReport] = useState<boolean>(false);

  const { mutateAsync, isPending } = useNotInterestedUser({
    onSuccess: () => {
      toast.success(SUCCESS);
    },
    onError: (error) => {
      toast.error(error?.message);
    }
  });

  const handleNotInterested = async () => {
    await mutateAsync({ username });
  };

  const toggleReport = () => {
    setOpenReport((prev)=> !prev)
  }

  return (
    <>
      <DropdownMenu
        items={[
          { label: REPORT, icon: '', onClick: toggleReport },
          { label: NOT_INTERESTED, icon: '', onClick: handleNotInterested, isLoading: isPending }
        ]}
      />

      <ReportModal
          username={username}
          open={isOpenReport}
          title={REPORT_TITLE}
          onClose={toggleReport}
      />
    </>
  );
};

export default MutualFriendIOption;
