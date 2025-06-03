import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProgressState {
  status: boolean;
}

const initialState: ProgressState = {
  status: false
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setProgressStatus: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload;
    }
  }
});

export const { setProgressStatus } = progressSlice.actions;

export default progressSlice.reducer;
