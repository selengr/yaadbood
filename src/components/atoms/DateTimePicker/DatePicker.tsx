'use client'
import { isValidJalaaliDate, toJalaali } from 'jalaali-js';
import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import useScrollPicker from '@/hooks/util/useScrollPicker';

import * as S from './Styles';

const DatePicker = ({
  isPersian,
  onChange,
  onError,
  initialValue
}: {
  isPersian?: boolean;
  onError?: (error: string) => void;
  onChange?: (data: string) => void;
  initialValue?: string; // New prop for initial value
}) => {
  const parseInitialDate = (value?: string) => {
    if (!value) return null;
    const parsed = moment(value, 'YYYY-MM-DD', true); // Strict parsing
    return parsed.isValid() ? parsed : null;
  };

  const initialDate = useMemo(() => parseInitialDate(initialValue), [initialValue]);

  const days = [null, null, ...Array.from({ length: 31 }, (_, i) => i + 1), null, null];
  const monthsList = useMemo(() => {
    return isPersian
      ? [
          null,
          null,
          'فروردین',
          'اردیبهشت',
          'خرداد',
          'تیر',
          'مرداد',
          'شهریور',
          'مهر',
          'آبان',
          'آذر',
          'دی',
          'بهمن',
          'اسفند',
          null,
          null
        ]
      : [
          null,
          null,
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
          null,
          null
        ];
  }, [isPersian]);
  const months = useMemo(() => [null, null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, null, null], []);
  const years = [
    null,
    null,
    ...(isPersian
      ? Array.from({ length: 100 }, (_, i) => toJalaali(new Date()).jy - i)
      : Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)
    ).reverse(),
    null,
    null
  ];

  const [selectedDay, setSelectedDay] = useState(() => (initialDate ? initialDate.date() : 1));
  const [selectedMonth, setSelectedMonth] = useState(() => (initialDate ? initialDate.month() : 1));
  const [selectedYear, setSelectedYear] = useState(() =>
    initialDate ? initialDate.year() : Number(years[2])
  );
  const dayRefs = useRef<HTMLDivElement[]>([]);
  const monthRefs = useRef<HTMLDivElement[]>([]);
  const yearRefs = useRef<HTMLDivElement[]>([]);
  const isDateValid = (day: number, month: number, year: number, isPersian: boolean): boolean => {
    if (isPersian) {
      return isValidJalaaliDate(year, month, day);
    } else {
      const date = new Date(year, month - 1, day);
      return date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;
    }
  };

  const handleValidateDate = useCallback(() => {
    const day = selectedDay;
    const month = months.indexOf(selectedMonth);
    const year = selectedYear;

    const isValid = isDateValid(day, month, year, isPersian || false);

    if (onChange)
      onChange(
        `${year.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
      );

    if (!isValid) {
      const errorMessage = isPersian ? 'تاریخ معتبر نیست' : 'Date is not valid';
      if (onError) onError(errorMessage);
    } else {
      if (onError) onError('');
    }
  }, [selectedDay, months, selectedMonth, selectedYear, isPersian, onChange, onError]);

  const {
    dragging,
    handleKeyDown,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchStart,
    getClassForItem,
    handleWheel
  } = useScrollPicker<number>();

  useEffect(() => {
    handleValidateDate();
  }, [handleValidateDate]);

  return (
    <S.DatePicker onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} className='date-picker'>
      <S.ScrollColumn
        className='scroll-column'
        onMouseDown={() => handleMouseDown()}
        onMouseUp={handleMouseUp}
        onMouseMove={(e) => handleMouseMove(e, selectedYear, setSelectedYear, years, yearRefs)}
        onKeyDown={(e) => handleKeyDown(e, selectedYear, setSelectedYear, years, yearRefs)}
        tabIndex={0}
        onWheel={(e) => handleWheel(e.deltaY, selectedYear, setSelectedYear, years, yearRefs)}
        onTouchStart={handleTouchStart}
        onTouchMove={(e) => handleTouchMove(e, selectedYear, setSelectedYear, years, yearRefs)}>
        {years.map((year, index) => (
          <div
            key={index}
            className={`${dragging ? 'no-select' : 'default-cursor'} item ${getClassForItem(index, years.indexOf(selectedYear))}`}
            ref={(el: any) => (yearRefs.current[index] = el!)}>
            {year || ''}
          </div>
        ))}
      </S.ScrollColumn>
      <S.ScrollColumn
        onMouseDown={() => handleMouseDown()}
        onMouseUp={handleMouseUp}
        onMouseMove={(e) => handleMouseMove(e, selectedMonth, setSelectedMonth, months, monthRefs)}
        onKeyDown={(e) => handleKeyDown(e, selectedMonth, setSelectedMonth, months, monthRefs)}
        tabIndex={0}
        className='scroll-column'
        onWheel={(e) => handleWheel(e.deltaY, selectedMonth, setSelectedMonth, months, monthRefs)}
        onTouchStart={handleTouchStart}
        onTouchMove={(e) => handleTouchMove(e, selectedMonth, setSelectedMonth, months, monthRefs)}>
        {months.map((month, index) => (
          <div
            key={index}
            className={`${dragging ? 'no-select' : 'default-cursor'} item ${getClassForItem(index, months.indexOf(selectedMonth))}`}
            ref={(el: any) => (monthRefs.current[index] = el!)}>
            {monthsList[(month || 0) + 1]
              ? isPersian
                ? `${monthsList[(month || 0) + 1]}`
                : `${monthsList[(month || 0) + 1]}`
              : ''}
          </div>
        ))}
      </S.ScrollColumn>
      <S.ScrollColumn
        onMouseDown={() => handleMouseDown()}
        onMouseUp={handleMouseUp}
        onMouseMove={(e) => handleMouseMove(e, selectedDay, setSelectedDay, days, dayRefs)}
        onKeyDown={(e) => handleKeyDown(e, selectedDay, setSelectedDay, days, dayRefs)}
        tabIndex={0}
        className='scroll-column'
        onWheel={(e) => handleWheel(e.deltaY, selectedDay, setSelectedDay, days, dayRefs)}
        onTouchStart={handleTouchStart}
        onTouchMove={(e) => handleTouchMove(e, selectedDay, setSelectedDay, days, dayRefs)}>
        {days.map((day, index) => (
          <div
            key={index}
            className={`${dragging ? 'no-select' : 'default-cursor'} item ${getClassForItem(index, days.indexOf(selectedDay))}`}
            ref={(el: any) => (dayRefs.current[index] = el!)}>
            {day || ''}
          </div>
        ))}
      </S.ScrollColumn>
      <S.SelectedContainer />
    </S.DatePicker>
  );
};

export default DatePicker;
