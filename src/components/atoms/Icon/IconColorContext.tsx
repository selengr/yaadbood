'use client'
import { RootState } from '@/redux/store';
import React, { createContext, useState, useContext } from 'react';
import { useSelector } from 'react-redux';

interface IconColorContextType {
  iconColor: string;
  setIconColor: (color: string) => void;
}

const IconColorContext = createContext<IconColorContextType | undefined>(undefined);

export const useIconColor = () => {
  const context = useContext(IconColorContext);
  if (!context) {
    throw new Error('useIconColor must be used within an IconColorProvider');
  }
  return context;
};

export const IconColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const reduxIconColor = useSelector((state: RootState) => state.iconColor.color);
  const [iconColor, setIconColor] = useState(reduxIconColor);

  return (
    <IconColorContext.Provider value={{ iconColor, setIconColor }}>
      {children}
    </IconColorContext.Provider>
  );
};