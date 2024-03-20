import { PaletteOptions } from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  export interface PaletteOptions {
    customColors: ThemeColorsModel;
  }

  export interface Palette {
    customColors: ThemeColorsModel;
  }

  export type ThemeColorsModel = {
    brand: string;
    background: {
      main: string;
      white: string;
      blur: string;
    };
    text: TextColorModel;
    textInput: {
      primary: string;
      border: string;
      bgrDisable: string;
    };
    primary: ColorVariantModel;
    secondary: ColorVariantModel;
    destruction: ColorVariantModel;
    ink: InkColorModel;
    red: ColorVariantModel;
    icon: {
      primary: string;
      secondary: string;
    };
    checkbox: {
      checked: string;
      unChecked: string;
      disable: string;
    };
    toggle: {
      thumb: string;
      checkedTrack: string;
      unCheckedTrack: string;
      disableTrack: string;
    };
    radio: {
      checked: string;
      unChecked: string;
      disable: string;
    };
  };

  export type ColorVariantModel = {
    110: string;
    100: string;
    80: string;
    60: string;
    50: string;
    40: string;
    20: string;
    10: string;
    5: string;
    gradient: {
      from: string;
      to: string;
    };
  };

  export type InkColorModel = {
    100: string;
    90: string;
    80: string;
    70: string;
    60: string;
    50: string;
    40: string;
    30: string;
    20: string;
    10: string;
    5: string;
    0: string;
  };

  export type TextColorModel = {
    100: string;
    90: string;
    70: string;
    50: string;
    0: string;
  };
}
