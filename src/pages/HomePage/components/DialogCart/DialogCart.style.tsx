import { Dialog, styled } from '@mui/material';

const PREFIX = 'MyCard';
export const classes = {
  paper: `${PREFIX}-paper`,
  dialogTitle: `${PREFIX}-dialogTitle`,
  closeButton: `${PREFIX}-CloseButton`,
  contentWrap: `${PREFIX}-contentWrap`,
  dialogFooter: `${PREFIX}-dialogFooter`
};

export const DialogCart = styled(Dialog)(({ theme }) => ({
  [`&.${classes.paper}`]: {
    position: 'absolute',
    overflowY: 'visible',
    maxWidth: 450,
    top: '10%',
    borderRadius: '8px'
  },
  [`&.${classes.dialogTitle}`]: {
    padding: '16px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#ffb9a4',
    borderBottom: `1px solid ${theme.palette.customColors.ink[10]}`
  },
  [`&.${classes.closeButton}`]: {
    padding: 0
  },
  [`&.${classes.contentWrap}`]: {
    padding: '10px 20px',
    '&.MuiDialogContent-root': {
      overflowY: 'auto',
      maxHeight: 200,
      lineHeight: 1.4
    },
    textAlign: 'left'
  },
  [`&.${classes.dialogFooter}`]: {
    padding: '12px 20px'
  }
}));
