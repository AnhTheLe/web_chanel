import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => {
  return {
    dialogTitle: {
      padding: '16px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: `1px solid ${theme.palette.customColors.ink[10]}`
    },
    closeButton: {
      padding: 0
    },
    contentWrap: {
      padding: '4px 8px',
      '&.MuiDialogContent-root': {
        overflowY: 'visible'
      }
    },
    title: {
      marginBottom: 4
    },
    inputItem: {
      border: '1px solid #ccc',
      background: '#dac'
    },
    paper: {
      position: 'absolute',
      top: 16,
      overflowY: 'visible',
      borderRadius: '8px'
    },
    contentItem: {
      padding: '12px 12px 0px 12px'
    },
    dialogFooter: {
      padding: '28px 20px 24px 20px'
    }
  };
});
export default useStyles;
