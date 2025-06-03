'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Button, Icon } from '@/components/atoms';
import { useUpdateProfile } from '@/hooks/auth';
import { EditIntroForm } from '@/types/profile';
import { useCities, useContries } from '@/hooks/constants/useContriesCities';
import { EDIT_INTRO_MODAL } from '@/constants/profile/editIntroModal';
import { useGetUserData } from '@/hooks/user/useGetUserData';

const EditIntroModal = dynamic(() => import('./EditIntroModal/index'), { ssr: false });
const EditIntro = () => {
  const [open, setOpen] = useState(false);
  const { data } = useGetUserData();
  const updateUserInfo = useUpdateProfile({
    onSuccess: async () => {
      setOpen(false);
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

  const countriesListOptions = convertToLabelValue(countries?.countries || [], 'name', 'name');
  const languagesListOptions = convertToLabelValue(countries?.languages || [], 'native_en', 'native_en');
  const citiesListOptions = convertToLabelValue(statesData || [], 'name', 'name');

  const onSave = (data: EditIntroForm) => {
    updateUserInfo.mutate({
      ...data,
      gender: data.gender as 'Male' | 'Female' | 'Other'
    });
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} type='button' icon variant='text'>
        <Icon name='edit' w={24} h={24} />
      </Button>
      <EditIntroModal
        title={EDIT_INTRO_MODAL.TITLE}
        open={open}
        setOpen={setOpen}
        onSave={onSave}
        fullScreenOnMobile
        isPending={updateUserInfo.isPending}
        countriesListOptions={countriesListOptions}
        languagesListOptions={languagesListOptions}
        citiesListOptions={citiesListOptions}
        onCountryChange={setCountry}
        userData={data?.user}
      />
    </>
  );
};

export default EditIntro;
