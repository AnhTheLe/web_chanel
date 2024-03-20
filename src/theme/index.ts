import { createTheme, ThemeOptions } from '@mui/material/styles';

import { ThemeState } from './types';
import typography from './typography';

export const createAppTheme = (themeState: ThemeState) => {
  const theme: ThemeOptions = createTheme({
    palette: {
      customColors: themeState.current.color
    },
    typography
    // overrides: {
    //   MuiButton: {
    //     root: {
    //       borderRadius: 8,
    //       minWidth: 85,
    //       fontWeight: 500
    //     },
    //     label: {
    //       textTransform: 'none',
    //       fontSize: '1rem'
    //     },
    //     outlined: {
    //       borderWidth: '2px',
    //       padding: '5px 18px 4px',
    //       borderColor: '#ebedf1',
    //       fontWeight: 'bold'
    //     }
    //   }
    // }
  });

  return theme;
};
