import { configureStore, combineReducers } from '@reduxjs/toolkit';
// store.ts
import { persistReducer,persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import profilePhotoReducer from './slices/profilePhotoSlice';
import counterReducer from './slices/counterSlice';
import { locationsReducer } from './slices/locationsSlice';
import progressReducer from './slices/progressSlice';
import themeReducer from './slices/themeSlice';
import tweetCreationReducer from './slices/tweetCreationSlice';
import iconColorReducer from './slices/iconColorSlice'; // Import the new slice

// Combine all reducers including the tweet creation slice
const rootReducer = combineReducers({
  counter: counterReducer,
  profilePhoto: profilePhotoReducer,
  theme: themeReducer,
  locations: locationsReducer,
  progress: progressReducer,
  tweetCreation: tweetCreationReducer,
  iconColor: iconColorReducer // Add the icon color slice
});

// Configure Redux Persist to persist only the tweetCreation and theme slices
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['tweetCreation', 'theme']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export const store = makeStore();
export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];