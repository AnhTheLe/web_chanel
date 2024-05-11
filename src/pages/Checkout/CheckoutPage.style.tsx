import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import colors from 'src/theme/statics/colors';

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      width: '100%',
      // marginRight: '15%',
      // marginLeft: '15%',
      display: 'flex',
      flexDirection: 'row'
    },
    addressForm: {
      width: 'calc(100%*2/3)',
      padding: '28px 28px 0 0',
      display: 'flex',
      flexDirection: 'row',
      // justifyContent: 'space-between',
      alignItems: 'flex-start'
    },
    variantsInfo: {
      width: 'calc(100%*1/3)',
      padding: '28px 0 0 28px',
      borderLeft: '1px solid #DBDDDF'
    },
    popupVisible: {
      display: 'flex',
      transition: 'height 0.3s'
    },
    popupHidden: {
      height: 0,
      opacity: 0,
      transition: 'height 0.3s, opacity 0.3s'
    },
    formControl: {
      backgroundColor: theme.palette.customColors.background.white,

      '& .MuiInputLabel-outlined': {
        transform: 'none',
        fontSize: '14px',
        position: 'unset',
        color: '#636C77',
        lineHeight: '20px'
        // marginBottom: "4px",
      },
      '& .MuiOutlinedInput-notchedOutline, & .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        // borderColor: '#636C77',
        borderRadius: '4px'
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderWidth: '1px'
        // borderColor: 'transparent'
      },
      '& .MuiFormControl-root': {
        padding: '4px 0'
      }
    },
    selectOutlined: {
      // padding: '10px 14px !important',
      fontSize: '14px',
      lineHeight: '20px',
      paddingRight: '0 !important',
      width: '100%'
    },
    menuList: {
      borderRadius: 8,
      padding: 0,
      bottom: 0,
      maxHeight: 200,
      overflow: 'auto',
      wordBreak: 'break-word',
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
      },
      // "& .MuiListItem-root, "
      '& .MuiListItem-root:first-child': {
        display: 'none'
      },
      '& .MuiListItem-root.Mui-selected, .MuiListItem-root.Mui-selected:hover': {
        backgroundColor: '#E4EFFD'
      }
    },
    select: {
      '&.MuiSelect-root.MuiSelect-select:focus': {
        backgroundColor: 'transparent'
      }
    },
    menuItem: {
      display: 'flex',
      alignItems: 'flex-start',
      padding: '12px 16px',
      lineHeight: '20px',
      whiteSpace: 'normal',
      gap: 8,
      '&:not(:last-child)': {
        borderBottom: '1px solid #DBDDDF'
      },
      '& .MuiCheckbox-root': {
        padding: 0,
        marginRight: '5px'
      },
      '& svg': {
        width: 24,
        height: 24
      }
    },
    menuItemText: {
      // overflow: "auto",
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    },
    customIcon: {
      position: 'absolute',
      right: '0 !important',
      pointerEvents: 'none'
    },
    groupItem: {
      flex: '1 1 430px',
      marginBottom: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 4,

      '& .popper': {
        width: '100% !important'
      }
    },
    label: {
      '&:after': {
        content: "' *'",
        color: colors.red[100]
      }
    },
    shipmentFee: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      padding: '8px 8px 8px 0',
      marginTop: 20,
      marginBottom: 54,
      borderRadius: 6,
      border: '1px solid #DBDDDF'
    },
    paymentMethod: {
      marginTop: 32,
      // padding: '0 16px',
      borderRadius: 6,
      border: '1px solid #DBDDDF'
    }
  };
});

export default useStyles;
