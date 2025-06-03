import React from 'react';
import { ControllerRenderProps, FieldErrors } from 'react-hook-form';
//components
import { DatePicker } from '@/components/atoms';
//types
import { EditIntroForm } from '@/types/profile';
import { EDIT_INTRO_MODAL } from '@/constants';
import moment from 'moment';

interface IProps {
  field: ControllerRenderProps<EditIntroForm, 'dateOfBirth'>;
  errors: FieldErrors<EditIntroForm>;
}

const RenderDatePicker = ({ field, errors }: IProps) => {
  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = moment(dateStr, 'YYYY-MM-DD');
    return date.isValid() ? date.format('DD/MM/YYYY') : '';
  };

  const { value, onChange } = field;
  return (
    <DatePicker
      error={errors.dateOfBirth?.message}
      onChange={onChange}
      value={formatDisplayDate(value)}
      initialValue={formatDisplayDate(value)}
      placeholder={EDIT_INTRO_MODAL.DATE_OF_BIRTH.PLACEHOLDER}
    />
  );
};

export default RenderDatePicker;
