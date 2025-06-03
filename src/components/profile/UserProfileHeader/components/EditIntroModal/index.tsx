'use client';
// React & Libs
import { useState } from 'react';
import dynamic from 'next/dynamic';
// types
import { EditIntroForm } from '@/types/profile';
// hooks
import { useGetUserData } from '@/hooks/user';
import { useUpdateProfile } from '@/hooks/auth';
import { useCities, useContries } from '@/hooks/constants';
// constants
import { EDIT_INTRO_MODAL } from '@/constants/profile/editIntroModal';
// components
import { Button, Icon } from '@/components/atoms';
const EditIntroModal = dynamic(() => import('@/components/profile/EditIntroModal'), { ssr: false });

const EditIntro = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { data } = useGetUserData();
  const updateUserInfo = useUpdateProfile({
    onSuccess: async () => {
      toggleModal();
    }
  });
  const [country, setCountry] = useState('');
  const { data: countries } = useContries();
  const { data: statesData } = useCities(country);

  const convertToLabelValue = <T extends Record<string, any>>(
    items: T[],
    labelKey: keyof T,
    valueKey: keyof T
  ) => {
    return items.map((item) => ({
      label: String(item[labelKey]),
      value: String(item[valueKey])
    }));
  };

  const citiesListOptions = convertToLabelValue(statesData || [], 'name', 'name');
  const countriesListOptions = convertToLabelValue(countries?.countries || [], 'name', 'name');
  const languagesListOptions = convertToLabelValue(countries?.languages || [], 'native_en', 'native_en');

  const onSave = (data: EditIntroForm) => {
    updateUserInfo.mutate({
      ...data,
      gender: data.gender as 'Male' | 'Female' | 'Other'
    });
  };

  const toggleModal = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Button onClick={toggleModal} type='button' icon variant='text'>
        <Icon name='edit' w={24} h={24} />
      </Button>
      <EditIntroModal
        open={open}
        onSave={onSave}
        setOpen={setOpen}
        fullScreenOnMobile
        userData={data?.user}
        onCountryChange={setCountry}
        title={EDIT_INTRO_MODAL.TITLE}
        isPending={updateUserInfo.isPending}
        citiesListOptions={citiesListOptions}
        countriesListOptions={countriesListOptions}
        languagesListOptions={languagesListOptions}
      />
    </>
  );
};

export default EditIntro;
