import { Box, Button, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import useModal from '../../hocs/modal/useModal';
import TypographyCus, { TEXTSIZE } from 'src/components/PosTypography/TypographyCus';
import CloseIcon from 'src/assets/svg/CloseIcon';
import colors from 'src/theme/statics/colors';
import { DialogCart, classes } from './DialogCart.style';
import SuccessIcon from 'src/assets/svg/SuccessIcon';

export interface ConfirmDialogProps {
  title?: string;
  message?: ReactNode;
  isDelete?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  deleteButtonText?: string;
  isOpenModal: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CartDialog = (props: ConfirmDialogProps) => {
  const { title, message, isDelete, confirmButtonText, cancelButtonText, deleteButtonText, isOpenModal, setOpen } =
    props;
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <DialogCart
      open={isOpenModal}
      onClose={closeModal}
      fullWidth
      maxWidth='sm'
      classes={{
        paper: classes.paper
      }}
    >
      <DialogTitle component='div' className={classes.dialogTitle}>
        <SuccessIcon></SuccessIcon>
        <TypographyCus size={TEXTSIZE.size20} fontWeight='medium'>
          {title}
        </TypographyCus>
        <IconButton aria-label='close' className={classes.closeButton} onClick={closeModal}>
          <CloseIcon htmlColor={colors.icon.secondary} />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.contentWrap}>{message}</DialogContent>

      <Button
        component='button' // Add the component prop with the value of 'button'
        style={{ backgroundColor: '#EB4444', border: '1px solid #F5A2A2' }}
      >
        {confirmButtonText ?? 'Xác nhận '}
      </Button>
    </DialogCart>
  );
};

export default CartDialog;
