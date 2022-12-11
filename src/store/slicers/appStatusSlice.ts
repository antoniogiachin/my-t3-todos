import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Error {
  show: boolean;
  message: string;
}

interface Notification {
  show: boolean;
  message: string;
  severity: string;
}

interface ThemeState {
  showNavbar: boolean;
  visitorCounter: number;
  error: Error;
  notification: Notification;
}

const initialState: ThemeState = {
  showNavbar: false,
  visitorCounter: 0,
  error: { show: false, message: "" },
  notification: { show: false, message: "", severity: "" },
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
    SET_ERROR: (state, action: PayloadAction<Error>) => {
      state.error.show = action.payload.show;
      state.error.message = action.payload.message;
    },
    RESET_ERROR: (state) => {
      state.error = initialState.error;
    },
    SET_NOTIFICATION: (state, action: PayloadAction<Notification>) => {
      state.notification.show = action.payload.show;
      state.notification.message = action.payload.message;
      state.notification.severity = action.payload.severity ?? "success";
    },
    RESET_NOTIFICATION: (state) => {
      state.notification = initialState.notification;
    },
  },
});

// selectors
export const getShowNavbar = (state: RootState) => state.appStatus.showNavbar;
export const getVisitorCounter = (state: RootState) =>
  state.appStatus.visitorCounter;

export const getHasError = (state: RootState) => state.appStatus.error.show;
export const getError = (state: RootState) => state.appStatus.error;

export const getHasNotification = (state: RootState) =>
  state.appStatus.notification.show;
export const getNotification = (state: RootState) =>
  state.appStatus.notification;

export const {
  SET_SHOW_NAVBAR,
  INCREMENT_VISIT_COUNTER,
  SET_ERROR,
  RESET_ERROR,
  SET_NOTIFICATION,
  RESET_NOTIFICATION,
} = appStatusSlice.actions;

export default appStatusSlice.reducer;
