import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import colors from 'src/theme/statics/colors';

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      width: '100%',
      '& .selectWrap': {
        position: 'relative'
      },
      '& .popper': {
        position: 'absolute',
        background: '#FFF',
        width: '180%',
        zIndex: 10000000,
        border: `1px solid ${colors.ink[10]}`,
        marginTop: 4,
        borderRadius: 8
      }
    },
    title: {
      marginBottom: 4
    },
    // selectWrap: {
    //   position: "relative",
    // },
    // popper: {
    //   position: "absolute",
    //   background: "#FFF",
    //   width: "180%",
    //   zIndex: 10000000,
    //   border: `1px solid ${colors.ink[10]}`,
    //   marginTop: 4,
    //   borderRadius: 8,
    // },
    searchBox: {
      padding: 12,
      width: '100%'
    },
    searchInput: {
      border: 'none',
      '& .MuiOutlinedInput-notchedOutline': {
        borderRadius: 36,
        borderColor: colors.background.main,
        background: colors.background.main
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
      backgroundColor: `${colors.background.white}`,
      border: `1px solid ${colors.ink[10]}`,
      '&:focus': {
        border: `1px solid ${colors.primary[100]}`
      },
      '&:focus-visible': {
        outline: 'none'
      },
      '&:hover': {
        backgroundColor: `${colors.background.white}`
      }
    },
    selectBoxStandard: {
      ouline: 'none',
      display: 'flex',
      alignItems: 'center',
      padding: 12,
      justifyContent: 'space-between',
      borderRadius: 0,
      width: '100%',
      height: 40,
      backgroundColor: `${colors.background.white}`,
      border: 'none',
      borderBottom: `1px solid ${colors.ink[10]}`,
      '&:focus': {
        borderBottom: `1px solid ${colors.primary[100]}`,
        backgroundColor: `${colors.ink[5]}`
      },
      '&:focus-visible': {
        outline: 'none',
        backgroundColor: `${colors.ink[5]}`
      },
      '&:hover(not:focus)': {
        backgroundColor: `${colors.background.white}`

        // backgroundColor: `${colors.ink[5]}`,
      }
    },
    listOption: {
      borderRadius: 8
    },
    menuItems: {
      borderRadius: 8,
      width: '100%',
      wordBreak: 'break-word',
      '&::-webkit-scrollbar': {
        width: 4,
        height: 4
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: `${colors.ink[10]}`,
        borderRadius: 12,
        '&:hover': {
          backgroundColor: `${colors.ink[20]}`
        }
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
        borderRadius: 12
      },
      '& .ps__rail-y, ps__rail-x': {
        opacity: 0.6
      },
      '& .optionAll': {
        backgroundColor: '#fff',
        borderBottom: '1px solid #E8EAEB'
      },
      '& .menuItem:not(.custom-item)': {
        minHeight: 40,
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        fontSize: 14,
        '& .checkBox': {
          margin: '-6px 3px -9px -6px'
        }
      },
      '& .menuItem': {
        // position: "relative",
        '&:hover': {
          backgroundColor: '#0000000a'
        },
        '&.focus-key-event,&.selected-item': {
          background: '#F2F9FF',
          color: theme.palette.primary.main
        }
      },
      '& .menuItem:not(:last-child)::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        height: 1,
        left: '6%',
        width: '88%',
        backgroundColor: `${colors.ink[10]}`
      },
      '& :first-child': {
        borderRadius: '8px 8px 0 0'
      }
    },
    noOptions: {
      padding: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  };
});
export default useStyles;
