import { configureStore } from '@reduxjs/toolkit';
import { dialogReducer } from './slices';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['dialog/openDialog'],
        ignoredPaths: ['dialog.component'],
      },
    }),
  reducer: {
    dialog: dialogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
