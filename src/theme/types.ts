import { ThemeColorsModel } from '@mui/material/styles/createPalette';

export type ThemeModel = {
  color: ThemeColorsModel;
};

export type ThemeState = {
  current: ThemeModel;
};
