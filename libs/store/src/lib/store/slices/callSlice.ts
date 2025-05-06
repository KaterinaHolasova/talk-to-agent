import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Dayjs } from 'dayjs';

type ActiveResponse = Blob | null;
type StartTime = Dayjs | null;

export interface CallState {
  activeResponse: ActiveResponse;
  startTime?: StartTime;
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
    updateActiveResponse: (state, action: PayloadAction<ActiveResponse>) => {
      state.activeResponse = action.payload;
    },
  },
});

export const { updateActiveResponse, startCall } = callSlice.actions;

export default callSlice.reducer;
