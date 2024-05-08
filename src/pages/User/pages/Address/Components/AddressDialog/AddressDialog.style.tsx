import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    position: 'absolute',
    overflowY: 'visible',
    top: '10%',
    borderRadius: '8px'
  },
  dialogTitle: {
    padding: '12px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    background: '#ffb9a4',
    borderBottom: `1px solid ${theme.palette.customColors.ink[10]}`
  },
  closeButton: {
    padding: 0
  },
  contentWrap: {
    padding: '10px 20px',
    '&.MuiDialogContent-root': {
      overflowY: 'auto',
      maxHeight: '400px',
      lineHeight: 1.4
    },
    textAlign: 'left'
  },
  dialogFooter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    padding: '0 20px 12px 20px'
  }
}));
