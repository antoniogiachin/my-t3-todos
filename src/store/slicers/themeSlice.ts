import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ThemeState {
  avThemes: string[];
  actualTheme: string;
  isLightMode: boolean;
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
  isLightMode: false,
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
export const getIsLightMode = (state: RootState) =>
  state.theme.actualTheme.includes(
    "light" || "garden" || "retro" || "cyberpunk"
  );

export const { SET_THEME } = themeSlice.actions;

export default themeSlice.reducer;
