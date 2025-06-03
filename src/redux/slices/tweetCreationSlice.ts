// slices/tweetCreationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Picture {
  alt: string;
  order: number;
  tags: string[];
  url: string;
}

export interface Poll {
  question: string;
  answers: string[];
  expiredAt: string;
}

export interface TweetCreationState {
  title: string;
  description: string;
  market: string;
  tags: string[];
  visibility: 'PUBLIC' | 'PRIVATE' | 'VIP';
  commentOption: string;
  publish_date: string; // ISO string
  timezone: string;
  coverImage: string;
  pictures: Picture[];
  pole: Poll | null;
}

const initialState: TweetCreationState = {
  title: '',
  description: '',
  market: '',
  tags: [],
  visibility: 'PRIVATE',
  commentOption: 'EVERY_ONE',
  publish_date: new Date().toISOString(),
  timezone: 'UTC+03:30',
  coverImage: '',
  pictures: [],
  pole: null
};

const tweetCreationSlice = createSlice({
  name: 'tweetCreation',
  initialState,
  reducers: {
    setTweetData(state, action: PayloadAction<Partial<TweetCreationState>>) {
      // Merge in the new partial data
      return { ...state, ...action.payload };
    },
    clearTweetData() {
      return initialState;
    }
  }
});

export const { setTweetData, clearTweetData } = tweetCreationSlice.actions;
export default tweetCreationSlice.reducer;
