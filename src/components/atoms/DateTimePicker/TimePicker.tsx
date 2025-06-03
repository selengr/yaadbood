'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react';

import useScrollPicker from '@/hooks/util/useScrollPicker';

import * as S from './Styles';

const TimePicker = ({
  onChange,
  initialValue,
  is24Hour = true
}: {
  onChange?: (time: string) => void;
  initialValue?: string;
  is24Hour?: boolean;
}) => {
  const hours = [
    null,
    null,
    ...(is24Hour
      ? Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))
      : Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'))),
    null,
    null
  ];

  const minutes = [
    null,
    null,
    ...Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')),
    null,
    null
  ];

  const [selectedHour, setSelectedHour] = useState(String(hours[2]));
  const [selectedMinute, setSelectedMinute] = useState(String(minutes[2]));
  const hourRefs = useRef<HTMLDivElement[]>([]);
  const minuteRefs = useRef<HTMLDivElement[]>([]);
  const handleTimeChange = useCallback(() => {
    if (onChange) {
      const hour = selectedHour;
      const minute = selectedMinute;

      onChange(`${hour}:${minute}`);
    }
  }, [selectedHour, selectedMinute, onChange, is24Hour]);
  useEffect(() => {
    handleTimeChange();
  }, [handleTimeChange]);

  const {
    handleKeyDown,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchStart,
    getClassForItem,
    handleWheel
  } = useScrollPicker<string>();

  return (
    <S.DatePicker className='time-picker'>
      <S.ScrollColumn
        className='scroll-column'
        onMouseDown={() => handleMouseDown()}
        onMouseUp={handleMouseUp}
        onMouseMove={(e) => handleMouseMove(e, selectedHour, setSelectedHour, hours, hourRefs)}
        onKeyDown={(e) => handleKeyDown(e, selectedHour, setSelectedHour, hours, hourRefs)}
        tabIndex={0}
        onWheel={(e) => handleWheel(e.deltaY, selectedHour, setSelectedHour, hours, hourRefs)}
        onTouchStart={handleTouchStart}
        onTouchMove={(e) => handleTouchMove(e, selectedHour, setSelectedHour, hours, hourRefs)}>
        {hours.map((hour, index) => (
          <div
            key={index}
            className={`item ${hour === selectedHour ? 'selected' : ''}`}
            ref={(el: HTMLDivElement | null) => {
              if (el) hourRefs.current[index] = el!;
            }}>
            {hour || ''}
          </div>
        ))}
      </S.ScrollColumn>

      <S.ScrollColumn
        className='scroll-column'
        onMouseDown={() => handleMouseDown()}
        onMouseUp={handleMouseUp}
        onMouseMove={(e) => handleMouseMove(e, selectedMinute, setSelectedMinute, minutes, minuteRefs)}
        onKeyDown={(e) => handleKeyDown(e, selectedMinute, setSelectedMinute, minutes, minuteRefs)}
        tabIndex={0}
        onWheel={(e) => handleWheel(e.deltaY, selectedMinute, setSelectedMinute, minutes, minuteRefs)}
        onTouchStart={handleTouchStart}
        onTouchMove={(e) => handleTouchMove(e, selectedMinute, setSelectedMinute, minutes, minuteRefs)}>
        {minutes.map((minute, index) => (
          <div
            key={index}
            className={`item ${minute === selectedMinute ? 'selected' : ''}`}
            ref={(el: HTMLDivElement | null) => {
              if (el) minuteRefs.current[index] = el;
            }}>
            {minute || ''}
          </div>
        ))}
      </S.ScrollColumn>
      <S.SelectedContainer />
    </S.DatePicker>
  );
};

export default TimePicker;
