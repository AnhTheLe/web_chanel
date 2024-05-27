import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      width: '100%'
    },
    '& .MuiTableCell-root': {
      padding: 8
    },
    link: {
      color: '#2F80ED',
      '&:hover': {
        color: '#333',
        textDecoration: 'underline'
      }
    }
  };
});

export default useStyles;
