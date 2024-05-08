import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => {
  return {
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
        borderColor: '#E0E0E0',
        borderRadius: '4px'
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderWidth: '1px',
        borderColor: '#E0E0E0'
      },
      '& .MuiFormControl-root': {
        padding: '4px 0'
      }
    },
    selectOutlined: {
      padding: '8px 14px !important',
      fontSize: '14px',
      lineHeight: '20px',
      // paddingY: '16 !important',
      width: '100%'
    },
    menuList: {
      borderRadius: 8,
      width: 200,
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
      padding: '12px 0',
      lineHeight: '20px',
      whiteSpace: 'normal',
      gap: 8,
      '&:not(:last-child)': {
        borderBottom: '1px solid #DBDDDF'
      },
      '& svg': {
        width: 24,
        height: 24,
        paddingRight: 8
      }
    },
    menuItemText: {
      // maxWidth: 150,
    },
    customIcon: {
      position: 'absolute',
      right: '0 !important',
      pointerEvents: 'none'
    }
  };
});

export default useStyles;
