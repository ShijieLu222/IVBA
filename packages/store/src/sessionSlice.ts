import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type SessionView = {
  profileId: string | null;
  displayName: string | null;
  email: string | null;
};

const initialState: SessionView = {
  profileId: null,
  displayName: null,
  email: null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSessionView(_state, action: PayloadAction<SessionView>) {
      return action.payload;
    },
    clearSession() {
      return initialState;
    },
  },
});

export const { setSessionView, clearSession } = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;
