import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ThemeState {
  avThemes: string[];
  actualTheme: string;
}

const initialState: ThemeState = {
  avThemes: [
    "light",
    "dark",
    "synthwave",
    "retro",
    "cyberpunk",
    "garden",
    "forest",
    "business",
  ],
  actualTheme: "dark",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    SET_THEME: (state, action: PayloadAction<string>) => {
      state.actualTheme = action.payload;
    },
  },
});

// selectors
export const getAvThemes = (state: RootState) => state.theme.avThemes;
export const getActualTheme = (state: RootState) => state.theme.actualTheme;

export const { SET_THEME } = themeSlice.actions;

export default themeSlice.reducer;
