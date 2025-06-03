import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ThemeState {
  mode: 'light' | 'dark';
}

// Helper function to safely access localStorage on the client side
const getInitialThemeMode = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    return (localStorage.getItem('themeMode') as 'light' | 'dark') || 'light';
  }
  return 'light'; // Default to 'light' if on the server
};

const initialState: ThemeState = {
  mode: getInitialThemeMode() // Use the helper function to initialize the state
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('themeMode', state.mode); // Only update localStorage on the client side
      }
    },
    setMode: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.mode = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('themeMode', state.mode); // Only update localStorage on the client side
      }
    }
  }
});

// Export the actions
export const { toggleMode, setMode } = themeSlice.actions;
// Export the reducer as default
export default themeSlice.reducer;