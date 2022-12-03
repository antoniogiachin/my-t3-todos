import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ThemeState {
  showNavbar: boolean;
  visitorCounter: number;
}

const initialState: ThemeState = {
  showNavbar: false,
  visitorCounter: 0,
};

export const appStatusSlice = createSlice({
  name: "appStatus",
  initialState,
  reducers: {
    SET_SHOW_NAVBAR: (state, action: PayloadAction<boolean>) => {
      state.showNavbar = action.payload;
    },
    INCREMENT_VISIT_COUNTER: (state) => {
      state.visitorCounter++;
    },
  },
});

// selectors
export const getShowNavbar = (state: RootState) => state.appStatus.showNavbar;
export const getVisitorCounter = (state: RootState) =>
  state.appStatus.visitorCounter;

export const { SET_SHOW_NAVBAR, INCREMENT_VISIT_COUNTER } =
  appStatusSlice.actions;

export default appStatusSlice.reducer;
