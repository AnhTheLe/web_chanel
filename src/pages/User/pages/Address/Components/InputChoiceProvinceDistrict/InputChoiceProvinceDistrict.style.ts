import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {},
    title: {
      marginBottom: 4
    },
    listOption: {
      borderRadius: 8
    },
    popper: {
      position: 'absolute',
      background: '#FFF',
      width: '100%',
      zIndex: 100000,
      border: `1px solid ${theme.palette.customColors.ink[10]}`,
      marginTop: 4,
      borderRadius: 8
    },
    selectWrap: {
      position: 'relative'
    },
    noOptions: {
      padding: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    boxDetail: {
      '&.item-selected': {
        background: '#F2F9FF',
        color: theme.palette.primary.main
      },
      '&:focus-visible': {
        outline: 'none'
      },
      '&::-webkit-scrollbar': {
        width: 4,
        height: 4
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: `${theme.palette.customColors.ink[10]}`,
        borderRadius: 12,
        '&:hover': {
          backgroundColor: `${theme.palette.customColors.ink[20]}`
        }
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
        borderRadius: 12
      },
      '& .ps__rail-y, ps__rail-x': {
        opacity: 0.6
      }
    },
    itemWrap: {
      '& .items': {
        padding: '12px 16px',
        cursor: 'pointer',
        position: 'relative',
        '&:hover, &.focus-key-event, &.item-selected': {
          background: theme.palette.grey[100],
          color: theme.palette.primary.main
        }
        // "& ::after": {
        //   content: '""',
        //   position: "absolute",
        //   bottom: 0,
        //   height: 1,
        //   left: "6%",
        //   width: "88%",
        //   backgroundColor: `${theme.palette.customColors.ink[10]}`,
        // },
        // padding: "12px 0",
        // borderBottom: `1px solid ${theme.palette.customColors.ink[10]}`,
      }
    },
    searchBox: {
      padding: 12,
      width: '100%'
    },
    searchInput: {
      border: 'none',
      '& .MuiOutlinedInput-notchedOutline': {
        borderRadius: 36,
        borderColor: theme.palette.customColors.background.main,
        background: theme.palette.customColors.background.main
      },
      '& .MuiOutlinedInput-input': {
        padding: '10px 10px 10px 0 !important',
        zIndex: 1
      },
      '& .MuiInputAdornment-positionStart': {
        zIndex: 1
      }
    },
    selectBoxOutline: {
      display: 'flex',
      alignItems: 'center',
      padding: 12,
      justifyContent: 'space-between',
      borderRadius: 8,
      width: '100%',
      height: 40,
      backgroundColor: `${theme.palette.customColors.background.white}`,
      border: `1px solid ${theme.palette.customColors.ink[10]}`,
      '&:focus': {
        border: `1px solid ${theme.palette.customColors.primary[100]}`
      },
      '&:focus-visible': {
        outline: 'none'
      },
      '&:hover': {
        backgroundColor: `${theme.palette.customColors.background.white}`
      }
    },
    menuItems: {}
  };
});
export default useStyles;
