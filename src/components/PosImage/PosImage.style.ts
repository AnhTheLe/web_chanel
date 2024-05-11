import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      borderRadius: 8,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.palette.customColors.background.white,
      border: `1px solid ${theme.palette.customColors.ink[10]}`,
      overflow: "hidden",
      // "& svg": {
      //   maxWidth: 46,
      //   maxHeight: 46,
      // },
    },
    popup: {
      zIndex: 2000,
    },
    popImage: {
      width: "216px",
      height: "216px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };
});
export default useStyles;
