import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import missionReducer from './missionSlice';

export const store = configureStore({
  reducer: {
    missions: missionReducer,
    counter: counterReducer,
  },
});

// סוגי הנתונים עבור TypeScript (חשוב מאוד ל-App.tsx)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;