import { configureStore } from '@reduxjs/toolkit';
import { callReducer, dialogReducer } from './slices';

export const store = configureStore({
  reducer: {
    call: callReducer,
    dialog: dialogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
