import colors from "./statics/colors";
import { ThemeModel } from "./types";

export const defaultTheme: ThemeModel = {
  color: {
    brand: colors.brand,
    background: {
      main: colors.background.main,
      white: colors.background.white,
      blur: colors.background.blur,
    },
    // đống này có tgian sửa lại hết
    textInput: {
      primary: colors.primary[100],
      border: colors.ink[10],
      bgrDisable: colors.ink[5],
    },
    checkbox: {
      checked: colors.primary[100],
      unChecked: colors.ink[30],
      disable: colors.ink[5],
    },
    toggle: {
      thumb: colors.ink[0],
      checkedTrack: colors.primary[100],
      unCheckedTrack: colors.ink[20],
      disableTrack: colors.ink[10],
    },
    radio: {
      checked: colors.primary[100],
      unChecked: colors.ink[50],
      disable: colors.ink[10],
    },
    primary: colors.primary,
    secondary: colors.secondary,
    destruction: colors.red,
    red: colors.red,
    ink: colors.ink,
    icon: colors.icon,
    text: colors.text,
  },
};
