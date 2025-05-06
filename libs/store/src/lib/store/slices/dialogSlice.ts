import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DIALOG_COMPONENT } from '../../Dialog';

type Component = keyof typeof DIALOG_COMPONENT;

export interface DialogState {
  component: Component | null;
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
    openDialog: (state, action: PayloadAction<Component>) => {
      state.component = action.payload;
    },
  },
});

export const { closeCurrentDialog, openDialog } = dialogSlice.actions;

export default dialogSlice.reducer;
