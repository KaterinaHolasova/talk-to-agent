import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Dayjs } from 'dayjs';

type ActiveResponse = Blob | null;
type StartTime = Dayjs | null;

export interface CallState {
  activeResponse: ActiveResponse;
  paused: boolean;
  startTime?: StartTime;
}

const initialState: CallState = {
  activeResponse: null,
  paused: false,
  startTime: null,
};

export const callSlice = createSlice({
  name: 'call',
  initialState,
  reducers: {
    pauseCall: (state) => {
      state.paused = true;
    },
    resumeCall: (state) => {
      state.paused = false;
    },
    startCall: (state, action: PayloadAction<StartTime>) => {
      state.startTime = action.payload;
    },
    updateActiveResponse: (state, action: PayloadAction<ActiveResponse>) => {
      state.activeResponse = action.payload;
    },
  },
});

export const { pauseCall, resumeCall, startCall, updateActiveResponse } =
  callSlice.actions;

export default callSlice.reducer;
