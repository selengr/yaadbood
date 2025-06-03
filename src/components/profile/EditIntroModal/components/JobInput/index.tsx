import React from 'react';
import { Control, Controller, ControllerRenderProps } from 'react-hook-form';
//constants
import { EDIT_INTRO_MODAL } from '@/constants';
//components
import { JobTitleSelect } from '../';
//types
import { EditIntroForm } from '@/types/profile';

interface IProps {
  control: Control<EditIntroForm>;
}

const JobInput = ({ control }: IProps) => {
  const renderJobInput = ({ field }: { field: ControllerRenderProps<EditIntroForm, 'job'> }) => {
    const { value, onChange } = field;
    return <JobTitleSelect value={value || ''} setValue={onChange} />;
  };

  return <Controller control={control} name={EDIT_INTRO_MODAL.JOB.NAME} render={renderJobInput} />;
};

export default JobInput;
