import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type DialogComponent = 'callJessica';

export interface DialogState {
  component: DialogComponent | null;
}

const initialState: DialogState = {
  component: null,
};

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    closeCurrentDialog: (state) => {
      state.component = null;
    },
    openDialog: (state, action: PayloadAction<DialogComponent>) => {
      state.component = action.payload;
    },
  },
});

export const { closeCurrentDialog, openDialog } = dialogSlice.actions;

export default dialogSlice.reducer;
