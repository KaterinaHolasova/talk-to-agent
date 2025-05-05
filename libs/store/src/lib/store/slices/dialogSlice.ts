import { ReactElement } from 'react';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface DialogState {
  component: ReactElement | undefined;
}

const initialState: DialogState = {
  component: undefined,
};

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    closeCurrentDialog: (state) => {
      state.component = undefined;
    },
    openDialog: (state, action: PayloadAction<ReactElement>) => {
      state.component = action.payload;
    },
  },
});

export const { closeCurrentDialog, openDialog } = dialogSlice.actions;

export default dialogSlice.reducer;
