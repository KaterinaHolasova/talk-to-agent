import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type ActiveResponse = Blob;
type StartTime = string;

export interface CallState {
  activeResponse: ActiveResponse | null;
  startTime: StartTime | null;
}

const initialState: CallState = {
  activeResponse: null,
  startTime: null,
};

export const callSlice = createSlice({
  name: 'call',
  initialState,
  reducers: {
    startCall: (state, action: PayloadAction<StartTime>) => {
      state.startTime = action.payload;
    },
    updateActiveResponse: (
      state,
      action: PayloadAction<ActiveResponse | null>
    ) => {
      state.activeResponse = action.payload;
    },
  },
});

export const { startCall, updateActiveResponse } = callSlice.actions;

export default callSlice.reducer;
