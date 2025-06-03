'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography } from '@mui/material';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
//constants
import { EDIT_INTRO_MODAL } from '@/constants';
//components
import { Dropdown, Modal } from '@/components/atoms';
import {
  UsernameField,
  WebsiteInput,
  LastNameInput,
  FirstNameInput,
  JobInput,
  DateOfBirthInput,
  SaveButton
} from './components';
//types
import { EditIntroForm, EditIntroSchema } from '@/types/profile';
//style
import { EditIntroStackStyled } from './EditIntorModal.style';
import { useEffect } from 'react';
import { UserState } from '@/types/auth';
interface EditIntroModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: (data: EditIntroForm) => void;
  title: string;
  fullScreenOnMobile?: boolean;
  isPending?: boolean;
  countriesListOptions: { label: string; value: string }[];
  languagesListOptions: { label: string; value: string }[];
  citiesListOptions: { label: string; value: string }[];
  onCountryChange: (country: string) => void;
  userData: UserState | undefined;
}

const EditIntroModal = ({
  open,
  setOpen,
  onSave,
  title,
  fullScreenOnMobile = false,
  isPending = false,
  countriesListOptions,
  languagesListOptions,
  citiesListOptions,
  onCountryChange,
  userData
}: EditIntroModalProps) => {
  const { firstName, lastName, username, job, dateOfBirth, gender, country, city, language, website } =
    userData || {};
  const form = useForm<EditIntroForm>({
    resolver: yupResolver(EditIntroSchema),
    mode: 'onChange',

    defaultValues: {
      firstName: firstName || '',
      lastName: lastName || '',
      username: username || '',
      job: job || '',
      dateOfBirth: dateOfBirth ? moment(dateOfBirth).format('YYYY-MM-DD') : '',
      gender: gender || 'Other',
      country: country || '',
      city: city || '',
      language: language || '',
      website: website || ''
    }
  });

  const onSubmit = (data: EditIntroForm) => {
    onSave(data);
  };
  const onGenderChange = (gender: string) => {
    form.setValue(EDIT_INTRO_MODAL.GENDER.NAME, gender);
  };
  const onCountryChangeHandler = (country: string) => {
    form.setValue(EDIT_INTRO_MODAL.LOCATION.NAME, country);
    onCountryChange(country);
  };

  const onLanguageChange = (language: string) => {
    form.setValue(EDIT_INTRO_MODAL.LANGUAGE.NAME, language);
  };
  const onCityChange = (city: string) => {
    form.setValue(EDIT_INTRO_MODAL.CITY.NAME, city);
  };

  useEffect(() => {
    if (userData?.country && form.watch('country')) {
      onCountryChange(userData.country);
    }
  }, [userData]);

  const onSaveIsDisabled = !form.formState.isValid || isPending;
  return (
    <Modal open={open} onClose={() => setOpen(false)} title={title} fullScreenOnMobile={fullScreenOnMobile}>
      <EditIntroStackStyled component='form' spacing='12px' onSubmit={form.handleSubmit(onSubmit)}>
        <FirstNameInput form={form} />
        <LastNameInput form={form} />
        <UsernameField form={form} />
        <JobInput control={form.control} />
        <DateOfBirthInput control={form.control} errors={form.formState.errors} />
        <Dropdown
          labelsx={{ color: 'gray.700', fontSize: '14px' }}
          selectedValues={form.getValues(EDIT_INTRO_MODAL.GENDER.NAME)}
          errorMessage={form.formState.errors?.gender?.message}
          label={EDIT_INTRO_MODAL.GENDER.LABEL}
          onSelect={onGenderChange}
          options={EDIT_INTRO_MODAL.GENDER.OPTIONS as any}
        />
        <Box>
          <Typography variant='body2' color='gray.700'>
            {EDIT_INTRO_MODAL.LOCATION.LABEL}
          </Typography>
          <Dropdown
            labelsx={{ color: 'gray.400', fontSize: '14px' }}
            selectedValues={form.getValues(EDIT_INTRO_MODAL.LOCATION.NAME)}
            errorMessage={form.formState.errors?.country?.message}
            label={EDIT_INTRO_MODAL.LOCATION.SUB_LABEL}
            onSelect={onCountryChangeHandler}
            options={countriesListOptions}
            placeholder={EDIT_INTRO_MODAL.LOCATION.PLACEHOLDER}
          />
        </Box>

        <Dropdown
          labelsx={{ color: 'gray.400', fontSize: '14px' }}
          selectedValues={form.getValues(EDIT_INTRO_MODAL.CITY.NAME)}
          errorMessage={form.formState.errors?.city?.message}
          label={EDIT_INTRO_MODAL.CITY.LABEL}
          onSelect={onCityChange}
          options={citiesListOptions}
          placeholder={EDIT_INTRO_MODAL.CITY.PLACEHOLDER}
        />
        <Dropdown
          labelsx={{ color: 'gray.700', fontSize: '14px' }}
          selectedValues={form.getValues(EDIT_INTRO_MODAL.LANGUAGE.NAME)}
          errorMessage={form.formState.errors?.language?.message}
          label={EDIT_INTRO_MODAL.LANGUAGE.LABEL}
          onSelect={onLanguageChange}
          options={languagesListOptions}
          placeholder={EDIT_INTRO_MODAL.LANGUAGE.PLACEHOLDER}
        />
        <WebsiteInput control={form.control} errors={form.formState.errors} />
      </EditIntroStackStyled>
      <SaveButton isPending={isPending} onSaveIsDisabled={onSaveIsDisabled} onSubmit={onSubmit} form={form} />
    </Modal>
  );
};

export default EditIntroModal;
