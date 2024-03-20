import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { defaultTheme } from "./themes";
import { ThemeModel, ThemeState } from "./types";

const initialState: ThemeState = {
  current: defaultTheme,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    updateTheme: (state, action: PayloadAction<ThemeModel>) => {
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = themeSlice;
export const { updateTheme } = actions;
const themeReducer = reducer;
export default themeReducer;
