import { Box, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from 'src/assets/svg/CloseIcon';
import SuccessIcon from 'src/assets/svg/SuccessIcon';
import TypographyCus, { TEXTSIZE } from 'src/components/PosTypography/TypographyCus';
import { useStyles } from './AddressDialog.style';
import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface AddressDialogProps {
  title?: string;
  message?: ReactNode;
  isDelete?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  deleteButtonText?: string;
  isOpenModal: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AddressDialog = (props: AddressDialogProps) => {
  const { title, message, isDelete, confirmButtonText, cancelButtonText, deleteButtonText, isOpenModal, setOpen } =
    props;
  const classes = useStyles();

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={isOpenModal}
      onClose={closeModal}
      fullWidth
      maxWidth='md'
      classes={{
        paper: classes.paper
      }}
    >
      <DialogTitle
        className={classes.dialogTitle}
        sx={{
          padding: '8px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#ffb9a4',
          marginBottom: '8px'
        }}
      >
        <Box>
          <TypographyCus size={TEXTSIZE.size16} fontWeight='regular' textColor={'#fff'} style={{ paddingLeft: '6px' }}>
            Thêm địa chỉ mới
          </TypographyCus>
        </Box>
        <IconButton aria-label='close' className={classes.closeButton} onClick={closeModal}>
          <CloseIcon htmlColor={'#fff'} />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.contentWrap}>
        
      </DialogContent>
    </Dialog>
  );
};

export default AddressDialog;
