import { createReducer } from "@reduxjs/toolkit";
import { setDarkMode } from "./actions";

export type ThemeState = {
  isDarkMode: boolean;
};

const initialState: ThemeState = {
  isDarkMode: true,
};

export default createReducer<ThemeState>(initialState, (builder) =>
  builder.addCase(setDarkMode, (state, { payload: isDarkMode }) => {
    state.isDarkMode = isDarkMode;
  })
);
