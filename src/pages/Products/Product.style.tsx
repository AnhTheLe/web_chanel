import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => {
  return {
    payment: {
      padding: '12px 16px'
    },
    action: {
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      justifyContent: 'space-between'
    },
    actionPayment: {
      backgroundColor: theme.palette.customColors.background.white,
      borderRadius: 8,
      margin: '8px 0',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minWidth: 400
    },

    paymentMethod: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      justifyContent: 'flex-start'
    },
    lineItem: {
      width: '100%',
      marginBottom: 10,
      display: 'flex',
      justifyContent: 'space-between'
    },

    suggest: {
      display: 'grid !important',
      maxWidth: '100%',
      width: '100%',
      gridTemplateColumns: 'auto auto auto',
      gridTemplateRows: '38px 38px',
      rowGap: 10,
      columnGap: 5
    },
    suggestItem: {
      height: '36px',
      background: theme.palette.customColors.ink[5],
      borderRadius: '24px !important',
      border: `1px solid ${theme.palette.customColors.ink[5]} !important`,
      paddingTop: '8px !important',
      paddingBottom: '8px !important',
      minWidth: 120,
      marginBottom: 10
    },
    suggestLabel: {
      color: theme.palette.customColors.text[90],
      fontWeight: 400
    },
    suggestSelected: {
      border: `1px solid ${theme.palette.customColors.primary[40]} !important`,
      backgroundColor: `${theme.palette.customColors.primary[10]} !important`
    },

    cardItem: {
      borderRadius: '88px !important',
      border: `none !important`,
      width: '100%',
      backgroundColor: theme.palette.customColors.ink[5],
      display: 'flex ',
      justifyContent: 'space-between',
      padding: '0 20px',
      marginBottom: 10,
      alignItems: 'center'
      // position: "relative",
    },

    cardInfo: {
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: 12,
      // maxWidth: 201,
      width: '100%',
      '& span': {
        textAlign: 'left'
      }
    },
    accountName: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      textTransform: 'capitalize'
    },
    dropdownBank: {
      position: 'absolute',
      top: 55,
      // left: 0,
      right: '-20px',
      bottom: 0,
      zIndex: 1,
      width: 368,
      height: 200,
      backgroundColor: theme.palette.customColors.background.white,
      borderRadius: 8,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
      alignItems: 'flex-start',
      border: ' 1px solid #DBDDDF'
    },
    popupbankItem: {
      cursor: 'pointer',
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-start',
      padding: '12px 16px',
      gap: 8,
      alignItems: 'center',
      '&:hover': {
        background: theme.palette.customColors.ink[5]
      }
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
        borderColor: 'transparent',
        borderRadius: '8px'
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderWidth: '1px',
        borderColor: 'transparent'
      },
      '& .MuiFormControl-root': {
        padding: '8px 0'
      }
    },
    selectOutlined: {
      padding: '4px 14px !important',
      fontSize: '14px',
      lineHeight: '20px',
      paddingRight: '0 !important',
      width: '100%'
    },
    menuList: {
      borderRadius: 8,
      width: 150,
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
      maxWidth: 150,
      // overflow: "auto",
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    },
    customIcon: {
      position: 'absolute',
      right: '0 !important',
      pointerEvents: 'none'
    }
  };
});

export default useStyles;
