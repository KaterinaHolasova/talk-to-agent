import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type ActiveResponse = Blob | null;

export interface CallState {
  activeResponse: ActiveResponse;
}

const initialState: CallState = {
  activeResponse: null,
};

export const callSlice = createSlice({
  name: 'call',
  initialState,
  reducers: {
    updateActiveResponse: (state, action: PayloadAction<ActiveResponse>) => {
      state.activeResponse = action.payload;
    },
  },
});

export const { updateActiveResponse } = callSlice.actions;

export default callSlice.reducer;
