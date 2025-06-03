import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IconColorState {
  color: string;
}

const initialState: IconColorState = {
  color: '#64748b' // Default icon color
};

const iconColorSlice = createSlice({
  name: 'iconColor',
  initialState,
  reducers: {
    setIconColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    }
  }
});

export const { setIconColor } = iconColorSlice.actions;
export default iconColorSlice.reducer;