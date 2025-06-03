'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';
// hooks
import { useReportUser } from '@/hooks/user';
// constants
import { GENERAL } from '@/constants';
// components
import { DotPulse, Modal } from '@/components/atoms';

// style
import {
  ModalContent,
  PolicyTitle,
  CategoriesContainer,
  CategoryButton,
  ActionsContainer,
  CancelButton,
  SubmitButton,
  LoadingContainer
} from './reportModal.style';

const CAT_OPTIONS = [
  'Harassment',
  'Fraud or scam',
  'Spam',
  'Misinformation',
  'Hateful speech',
  'Threats or violence',
  'Self-harm',
  'Graphic content',
  'Dangerous or extremist organization',
  'Sexual content',
  'Fake account',
  'Hacked account',
  'Child exploiting',
  'Illegal goods and services',
  'Infringement'
];

interface IProps {
  open: boolean;
  title: string;
  username: string;
  onClose: () => void;
  catOptions?: string[];
}

const ReportModal = ({ username, title, onClose, open, catOptions = CAT_OPTIONS }: IProps) => {
  const { POLICY, CANCEL, SUBMIT_REPORT, SUCCESS_REPORT_TEXT } = GENERAL.REPORT;
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const { mutate, isPending } = useReportUser({
    onSuccess: () => {
      toast.success(SUCCESS_REPORT_TEXT);
      setSelectedCategory('');
      onClose();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    }
  });

  const handleSubmit = () => {
    if (selectedCategory) {
      mutate({ username, cat : selectedCategory });
    }
  };

  return (
    <>
      <Modal open={open} onClose={onClose} title={title}>
        <ModalContent>
          <PolicyTitle>{POLICY}</PolicyTitle>
          <CategoriesContainer>
            {catOptions?.map((catOption) => (
              <CategoryButton
                onClick={() => setSelectedCategory(catOption)}
                variant={selectedCategory === catOption ? 'contained' : 'outlined'}
                key={catOption}
                pill>
                {catOption}
              </CategoryButton>
            ))}
          </CategoriesContainer>
          <ActionsContainer>
            <CancelButton onClick={onClose} pill variant='outlined'>
              {CANCEL}
            </CancelButton>
            <SubmitButton pill onClick={handleSubmit} disabled={isPending || !selectedCategory}>
              {isPending && (
                <LoadingContainer>
                  <DotPulse />
                </LoadingContainer>
              )}

              {!isPending && SUBMIT_REPORT}
            </SubmitButton>
          </ActionsContainer>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReportModal;
